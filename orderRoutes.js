const router=require('express').Router();
const db=require('../config/db');
const auth=require('../middleware/auth');
router.use(auth);
const view=o=>({...o,_id:String(o.id),total:Number(o.total)});
router.get('/my',async(req,res)=>{try{const [rows]=await db.execute('SELECT id,address,total,status,created_at FROM orders WHERE user_id=? ORDER BY created_at DESC,id DESC',[req.user.id]);res.json(rows.map(view))}catch{res.status(500).json({message:'Unable to fetch orders'})}});
router.get('/:id',async(req,res)=>{try{const [rows]=await db.execute('SELECT id,address,total,status,created_at FROM orders WHERE id=? AND user_id=?',[req.params.id,req.user.id]);if(!rows.length)return res.status(404).json({message:'Not found'});res.json(view(rows[0]))}catch{res.status(400).json({message:'Invalid order id'})}});
router.post('/',async(req,res)=>{
 const {items,address}=req.body;
 if(typeof address!=='string'||!address.trim()||!Array.isArray(items)||!items.length)return res.status(400).json({message:'Address and items required'});
 if(items.some(i=>!Number.isSafeInteger(Number(i.product))||Number(i.product)<1||!Number.isInteger(i.quantity)||i.quantity<1))return res.status(400).json({message:'Invalid product or quantity'});
 const ids=items.map(i=>Number(i.product));
 if(new Set(ids).size!==ids.length)return res.status(400).json({message:'Duplicate items'});
 const connection=await db.getConnection();
 try{
  await connection.beginTransaction();
  let total=0;const snapshots=[];
  for(const item of items){
   const [rows]=await connection.execute('SELECT id,name,price,stock FROM products WHERE id=? FOR UPDATE',[item.product]);
   const p=rows[0];if(!p||p.stock<item.quantity){const err=new Error('Product unavailable or insufficient stock');err.status=400;throw err}
   snapshots.push({...p,quantity:item.quantity});total+=p.price*item.quantity;
  }
  const [result]=await connection.execute('INSERT INTO orders (user_id,address,total) VALUES (?,?,?)',[req.user.id,address.trim(),total.toFixed(2)]);
  for(const p of snapshots){
   await connection.execute('INSERT INTO order_items (order_id,product_id,name,price,quantity) VALUES (?,?,?,?,?)',[result.insertId,p.id,p.name,p.price,p.quantity]);
   await connection.execute('UPDATE products SET stock=stock-? WHERE id=?',[p.quantity,p.id]);
  }
  await connection.commit();res.status(201).json({_id:String(result.insertId),total,status:'Placed'});
 }catch(e){await connection.rollback();res.status(e.status||500).json({message:e.status?e.message:'Unable to place order'})}finally{connection.release()}
});
module.exports=router;

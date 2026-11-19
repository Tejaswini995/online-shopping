const router=require('express').Router();
const db=require('./db');
const auth=require('./auth');
const cols='id AS _id,name,description,category,price,stock,image';
router.get('/',async(req,res)=>{try{const [rows]=await db.query(`SELECT ${cols} FROM products ORDER BY id DESC`);res.json(rows)}catch{res.status(500).json({message:'Unable to fetch products'})}});
router.get('/:id',async(req,res)=>{try{const [rows]=await db.execute(`SELECT ${cols} FROM products WHERE id=?`,[req.params.id]);if(!rows.length)return res.status(404).json({message:'Not found'});res.json(rows[0])}catch{res.status(400).json({message:'Invalid product id'})}});
router.post('/',auth,async(req,res)=>{if(req.user.role!=='admin')return res.status(403).json({message:'Admin only'});try{
 const {name,description='',category='',price,stock=0,image=''}=req.body;
 if(!name||!Number.isFinite(Number(price))||Number(price)<0||!Number.isInteger(Number(stock))||Number(stock)<0)return res.status(400).json({message:'Invalid product'});
 const [r]=await db.execute('INSERT INTO products (name,description,category,price,stock,image) VALUES (?,?,?,?,?,?)',[name,description,category,price,stock,image]);
 const [rows]=await db.execute(`SELECT ${cols} FROM products WHERE id=?`,[r.insertId]);res.status(201).json(rows[0]);
}catch{res.status(400).json({message:'Invalid product'})}});
module.exports=router;

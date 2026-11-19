const router=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const db=require('./db');
router.post('/register',async(req,res)=>{try{
 const {name,email,password}=req.body;
 if(typeof name!=='string'||!name.trim()||typeof email!=='string'||!/^\S+@\S+\.\S+$/.test(email)||typeof password!=='string'||password.length<8)return res.status(400).json({message:'Valid name, email and 8+ character password required'});
 const normalized=email.trim().toLowerCase();
 const [existing]=await db.execute('SELECT id FROM users WHERE email=?',[normalized]);
 if(existing.length)return res.status(409).json({message:'Email already registered'});
 const hash=await bcrypt.hash(password,12);
 const [result]=await db.execute('INSERT INTO users (name,email,password) VALUES (?,?,?)',[name.trim(),normalized,hash]);
 res.status(201).json({id:result.insertId,message:'Registered'});
}catch(e){res.status(e.code==='ER_DUP_ENTRY'?409:500).json({message:e.code==='ER_DUP_ENTRY'?'Email already registered':'Registration failed'})}});
router.post('/login',async(req,res)=>{try{
 const {email,password}=req.body;
 const [rows]=await db.execute('SELECT * FROM users WHERE email=?',[String(email||'').trim().toLowerCase()]);
 const user=rows[0];
 if(!user||!(await bcrypt.compare(String(password||''),user.password)))return res.status(401).json({message:'Invalid credentials'});
 res.json({token:jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'})});
}catch{res.status(500).json({message:'Login failed'})}});
module.exports=router;

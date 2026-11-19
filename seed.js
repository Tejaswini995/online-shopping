require('dotenv').config();
const db=require('./db');
const products=[
 ['Wireless Headphones','Comfortable wireless headphones','Electronics',1499,20,'https://placehold.co/600x400?text=Headphones'],
 ['Backpack','Everyday backpack','Fashion',899,15,'https://placehold.co/600x400?text=Backpack'],
 ['Water Bottle','Reusable steel bottle','Home',499,30,'https://placehold.co/600x400?text=Bottle'],
 ['Smart Watch','Fitness tracking watch','Electronics',2499,10,'https://placehold.co/600x400?text=Watch']
];
(async()=>{for(const p of products){const [rows]=await db.execute('SELECT id FROM products WHERE name=? LIMIT 1',[p[0]]);if(!rows.length)await db.execute('INSERT INTO products (name,description,category,price,stock,image) VALUES (?,?,?,?,?,?)',p)}console.log('Sample products ready');await db.end()})().catch(e=>{console.error(e);process.exit(1)});

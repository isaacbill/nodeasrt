const express=require("express")
const app=express();
const mysql=require("mysql")
 const dotenv=require('dotenv');
 const path =require('path')

 dotenv.config ({path:'./.env'});
const db=mysql.createConnection({
	host:process.env.DATABASE_HOST,
	user:process.env.DATABASE_USER,
	password:process.env.DATABASE_PASSWORD,
	database:process.env.DATABASE,
	port:3307,
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory))
app.set('view engine','hbs');

db.connect((error)=>{
	if(error){
		console.log(error)
	}else{
		console.log("MYSQL connected ---");
	}
});
app.get("/",(req,res)=>{
//	res.send("<h1>Home page</h1")
res.render("index")
});
app.listen(5000,()=>{
	console.log("server started at port 5000");
})
const express=require("express")
const app=express();
const mysql=require("mysql2")

const db=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'Isaacokeyo@12',
	database:'asrt2',
});
db.connect((error)=>{
	if(error){
		console.log(error)
	}else{
		console.log("MYSQL connected ---");
	}
});
app.get("/",(req,res)=>{
	res.send("<h1>Home page</h1")
});
app.listen(5000,()=>{
	console.log("server started at port 5000");
})
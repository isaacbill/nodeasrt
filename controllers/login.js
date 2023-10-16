const jwt = require("jsonwebtoken");
const bcrypt= require('bcryptjs');
const mysql=  require('mysql');

const db=mysql.createConnection({
	host:process.env.DATABASE_HOST,
	user:process.env.DATABASE_USER,
	password:process.env.DATABASE_PASSWORD,
	database:process.env.DATABASE,
	port:3307,
});

 const login = async (req,res)=>{
    const {staff_id, password}=req.body;
    if (!staff_id ||!password) return res.json({status:"error", error:"please enter your username and password"}); 
        
     else {
        db.query('SELECT staff_id FROM employee WHERE staff_id=?',[staff_id], async(Err,result)=>{
            if(Err)throw Err;
            if(!result[0]||! await bcrypt.compare(password, result[0].password)) return res.json({status:"error", error:"Incorrect username or password"});
            else{
                const token = jwt.sign({staff_id:result[0].staff_id},process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES,
                httpOnly: true
            })
            const cookieOptions ={
                expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES *24*60*60*1000),
                httpOnly: true
            }
            res.cookie("user registered", token,cookieOptions);
            return res.json({status: "success", success:"welcome"});
            
        }
        
    })
}
}
module.exports= login;
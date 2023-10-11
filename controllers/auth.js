const mysql=  require('mysql');
const jwt =require('jsonwebtoken');
const bcrypt= require('bcryptjs');

const db=mysql.createConnection({
	host:process.env.DATABASE_HOST,
	user:process.env.DATABASE_USER,
	password:process.env.DATABASE_PASSWORD,
	database:process.env.DATABASE,
	port:3307,
});

exports.register = async (req,res)=>{
    console.log(req.body);
    
const { staff_id,staff_name, email, phone,address, job_position,department_id,password, passwordconfirm}=req.body;

db.query('SELECT email FROM employee WHERE email = ?', [email], async (error, results) => {
    if (error) {
    console.log(error);
}
if(results.length>0){
    return res.render('register',{
        message: 'email already in use'
    })
}else if( password !== passwordconfirm){
    return res.render('register',{
        message: 'passwords do not match'
    });
}

let hashedPassword = await bcrypt.hash(password, 8);

 console.log(hashedPassword);
 db.query('INSERT INTO employee SET ?', { staff_id:staff_id,staff_name:staff_name,email:email,phone:phone,address:address,job_position:job_position,department_id:department_id,password:hashedPassword},(error,results)=>{
    if (error) {
       console.log(error); 
    }else{
        console.log(results);
        return res.render('register',{
            message:'user registered'
        });
    }
 })
});
}

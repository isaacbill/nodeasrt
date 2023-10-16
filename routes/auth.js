const express= require("express");
const authController= require('../controllers/auth');
const loginController= require('../controllers/login');

const router=express.Router();

router.post('/register',authController.register)
// router.post('/login',(req, res) => {
//     // This is the callback function that handles the POST request
//     // You can access request data using req.body and send a response using res.send() or other methods
//     res.send('POST request received');
//   });
 router.post('/login',(req, res) => {
    res.send(loginController.login);
    console.log("login suucessful");
 });
module.exports = router;
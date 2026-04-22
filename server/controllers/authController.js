const User = require('../models/User');
const otp=require('../models/otp');
const bcrypt=require('bcryptjs');
const { sendOTPEmail } = require('../utils/email');


//register user controller  : req.body → validate → check user → hash password → generate OTP → save in DB → send email → response
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt=await bcrypt.genSalt(10);    // salting 
    const hashedPassword=await bcrypt.hash(password,salt);      //hashing the pass

    try{
        const user=new Usercreate({name,email,password:hashedPassword,role:'user',isVerified:false});
        await user.save();
       
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        console.log(` OTP for ${email}: ${otp}`); 
         await otp.create({ email, otp, action: 'account_verification' }); // Store OTP in DB 
        await sendOTPEmail(email, otp, 'account_verification'); // Send OTP . messge of account verification from email.js will be used to ssend here to user

       
        res.status(201).json({ 
            message: 'User registered successfully. Please check your email for OTP to verify your account.' ,
            email:user.email
        });
        

    }catch(err){
        res.status(500).json({message:'Error registering user',error:err.message})
    }
} 

exports.loginUser=async(req,res)=>{ 
    
}
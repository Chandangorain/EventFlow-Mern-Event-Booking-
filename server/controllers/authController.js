const User = require('../models/User');
const otp=require('../models/otp');
const bcrypt=require('bcryptjs');
const { sendOTPEmail } = require('../utils/email');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const generateToken = (id, role) => {
    return jwt.sign(
        { id, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    );
};

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
       
        const otp=generateOTP(); // Generate a 6-digit OTP
        console.log(` OTP for ${email}: ${otp}`); 
         await OTP.create({ email, otp, action: 'account_verification' }); // Store OTP in DB 
        await sendOTPEmail(email, otp, 'account_verification'); // Send OTP . messge of account verification from email.js will be used to ssend here to user

       
        res.status(201).json({ 
            message: 'User registered successfully. Please check your email for OTP to verify your account.' ,
            email:user.email
        });
        

    }catch(err){
        res.status(500).json({message:'Error registering user',error:err.message})
    }
} ;

//loginUser controller : req.body → validate → check user → compare password → generate token → response
exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)return res.status(400).json({message:'Invalid credentials'});

       if (!user.isVerified && user.role !== 'admin') {
            const otp = generateOTP();
            await OTP.findOneAndDelete({ email: user.email, action: 'account_verification' });
            await OTP.create({ email: user.email, otp, action: 'account_verification' });
            await sendOTPEmail(user.email, otp, 'account_verification');
            return res.status(403).json({ message: 'Account not verified', needsVerification: true, email: user.email });
        }

        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token: generateToken(user._id,user.role)
        });
    } catch(err){
        res.status(500).json({message:'Error logging in',error:err.message});
    }
};
const User = require('../models/User');


//register user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt=await bcrypt.genSalt(10);    // salting 
    const hashedPassword=await bcrypt.hash(password,salt);      //hashing the pass

    try{
        const user=new User({name,email,password:hashedPassword});
        await user.save();
        res.status(201).json({message:'User registered successfully'})

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        console.log(` OTP for ${email}: ${otp}`); 
        await sendOTPEmail(email, otp, 'account_verification'); // Send OTP . messge of account verification from email.js will be used to ssend here to user

        

    }catch(err){
        res.status(500).json({message:'Error registering user',error:err.message})
    }
}    
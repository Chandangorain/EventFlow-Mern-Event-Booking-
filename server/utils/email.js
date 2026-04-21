const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}); 

exports.SendOtpEmail=async(Email,otp,type)=>{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: Email,
        subject: 'Your OTP for EventFlow',
        text: `Your OTP for ${type} is: ${otp}. It will expire in 5 minutes.`
    };
    
    await transporter.sendMail(mailOptions);
}
    

const booking=require('../models/bookings');
const event=require('../models/Event');
const OTP=require('../models/otp');
const {sendEmail,sendBookingEmail} = require('../utils/emailService');  

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();   


exports.sendBookingOTP=async(req,res)=>{  // generate otp->if previous otp exisist , delete -> generate and send otp
    try {
        const otp = generateOTP();
        await OTP.findOneAndDelete({ email: req.user.email, action: 'event_booking' });
        await OTP.create({ email: req.user.email, otp, action: 'event_booking' });
        await sendOTPEmail(req.user.email, otp, 'event_booking');
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
}

exports.bookEvent=async(req,res)=>{
    const otpRecord=await OTP.findOne({email:req.user.email, action:'event_booking'});
    if(!otpRecord ){
        return res.status(400).json({message:'Invalid or expired OTP'});
    }
}
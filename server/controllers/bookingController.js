const booking=require('../models/bookings');
const event = require('../models/Event');
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

//book event and seat availbility check and otp verification
exports.bookEvent=async(req,res)=>{
    const otpRecord=await OTP.findOne({email:req.user.email, action:'event_booking'});
    if(!otpRecord ){
        return res.status(400).json({message:'Invalid or expired OTP'});
    }

    const event=await Event.findbyId(eventId);
    if(!event){
        return res.status(404).json({message:'Event not found'});
    }
    if(event.availableSeats<=0){
        return res.status(400).json({message:'No seats available'});
    }

   const existingBooking = await Booking.findOne({ userId: req.user.id, eventId });
        if (existingBooking && existingBooking.status !== 'cancelled') {
            return res.status(400).json({ message: 'Already booked or pending' });
        }
}

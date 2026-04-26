const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    action: { 
        type: String, 
        enum: ['account_verification', 'event_booking'], 
        required: true 
    },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

// TTL index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// fast lookup
otpSchema.index({ email: 1, action: 1 });

module.exports = mongoose.models.Otp || mongoose.model('Otp', otpSchema);
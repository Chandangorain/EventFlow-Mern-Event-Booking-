const express = require('express');
const router = express.Router();
const {registerUser,loginUser,verifyotp, verifyOTP} = require('../controllers/authController');
//register route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);

module.exports = router;


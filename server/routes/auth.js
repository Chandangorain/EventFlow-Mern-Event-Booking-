const express = require('express');
const router = express.Router();
const { register, login, verifyOTP } = require('../controllers/authController');
//register route
router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);

module.exports = router;


const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, admin } = require('../middleware/auth');

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();  
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const Event = require('../models/Event');

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const filters={};       // applying filter for category and location
        if(req.query.category){
            filters.category=req.query.category;
        }
        if(re.query.location){
            filters.location=req.query.location;    
        }
        const events = await Event.find();  
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
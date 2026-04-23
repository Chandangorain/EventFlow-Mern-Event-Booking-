
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
        if(req.query.ticketPrice){
            filters.ticketPrice=req.query.ticketPrice;
        }
        const events = await Event.find(filters);  
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
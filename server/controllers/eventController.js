
const Event = require('../models/Event');

// Get all events
exports.getAllEvents = async (req, res) => {
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

// get event
exports.getEventById = async (req, res) => {
    try{
        const event=await Event.findbyId(req.params.id);
        if(!event){
            return res.status(404).json({message:'Event not found'});
        } 
        res.json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// create new event only admin can create event
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, category, totalSeats, ticketPrice, image } = req.body;
        const event = await Event.create({
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            availableSeats: totalSeats,
            ticketPrice: ticketPrice || 0,
            image: image || '',
            createdBy: req.user.id
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
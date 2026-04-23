const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/auth');
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

// for event all can see events
router.get('/',getAllEvents);

//get event by id all can see event details
router.get('/:id',getEventById);

// only admin can create, update and delete events
router.post('/',protect,admin,createEvent);

router.put('/:id',protect,admin,updateEvent);

router.delete('/:id',protect,admin,deleteEvent);

module.exports = router;
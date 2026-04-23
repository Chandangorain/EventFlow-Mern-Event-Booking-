const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/auth');

// for event all can see events
router.get('/',getAllEvents);

router.get('/:id',getEventById);

router.post('/',protect,admin,createEvent);

router.put('/:id',protect,admin,updateEvent);

router.delete('/:id',protect,admin,deleteEvent);
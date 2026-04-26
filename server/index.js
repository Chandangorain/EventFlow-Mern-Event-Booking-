const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
//import the routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/booking');
dotenv.config();
const connectToDB = require('./config/db');

const app = express();
connectToDB();
app.use(cors()); 
app.use(express.json()); // Middleware to parse JSON bodies

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventflow')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
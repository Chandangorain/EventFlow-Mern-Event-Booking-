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
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    console.log("Connected DB:", mongoose.connection.name);
console.log("DB URL:", process.env.MONGO_URI);
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
}
);

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
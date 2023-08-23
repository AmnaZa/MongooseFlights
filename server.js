// Load environment variables from a .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Flight = require('./models/FlightModel');
const app = express();
const PORT = process.env.PORT || 3000;

// Configure the JSX view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Event listener for successful MongoDB connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes

// Route to display all flights
app.get('/', async (req, res) => {
    try {
        // Retrieve flights from the database and sort by departure date
        const flights = await Flight.find().sort({ departs: 1 });
        // Render the 'all' view and pass the flights data to it
        res.render('flights/all', { flights });
    } catch (error) {
        // Handle MongoDB error: unable to retrieve flights
        console.error('Error displaying flights:', error);
        res.status(500).send('Server Error');
    }
});

// Route to display the add flight form
app.get('/add', (req, res) => {
    // Render the 'add' view
    res.render('flights/add');
});

// Route to handle adding a new flight
app.post('/flights', async (req, res) => {
    try {
        const { airline, flightNo } = req.body;
        // Create a new flight record in the database
        const newFlight = await Flight.create({ airline, flightNo });
        console.log('New flight created:', newFlight);
        // Redirect to the main page
        res.redirect('/');
    } catch (error) {
        // Handle error when creating a new flight
        console.error('Error creating flight:', error);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

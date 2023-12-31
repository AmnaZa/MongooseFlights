require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Flight = require('./models/FlightModel'); // Import the Flight model
const app = express();
const PORT = process.env.PORT || 3000;
const reactViews = require('express-react-views');

// Configure the JSX view engine
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Display all flights
app.get('/', async (req, res) => {
  try {
    const flights = await Flight.find().sort({ departs: 1 });
    res.render('flights/all', { flights });
  } catch (error) {
    console.error('Error displaying flights:', error);
    res.status(500).send('Server Error');
  }
});

// Display add flight form
app.get('/add', (req, res) => {
  res.render('flights/add');
});

// Create a new flight
app.post('/flights', async (req, res) => {
  try {
    const { airline, flightNo } = req.body;
    const newFlight = await Flight.create({ airline, flightNo });
    console.log('New flight created:', newFlight);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).send('Server Error');
  }
});

// Display flight details
app.get('/flights/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/details', { flight });
  } catch (error) {
    console.error('Error displaying flight details:', error);
    res.status(500).send('Server Error');
  }
});

// Add a destination to a flight
app.post('/flights/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    const { newAirport, newArrival } = req.body;
    flight.destinations.push({ airport: newAirport, arrival: new Date(newArrival) });
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.error('Error adding destination:', error);
    res.status(500).send('Server Error');
  }
});

// Listen to the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

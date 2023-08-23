require('dotenv').config();

const express = require('express');
const Flight = require('./models/FlightModel');
const mongoose = require('mongoose');
const app = express();

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: "));
db.on("close", () => console.log("mongo disconnected"));

// Use middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/flights', async (req, res) => {
  try {
    const flights = await Flight.find().sort({ departs: 1 }); // Sorting by departure date in ascending order
    console.log('All Flights:');
    flights.forEach((flight) => {
      const formattedDeparture = flight.departs.toISOString().slice(0, 16);
      console.log(`Airline: ${flight.airline}, Flight No.: ${flight.flightNo}, Departure: ${formattedDeparture}`);
    });
    res.send('Check the console for flight details.');
  } catch (error) {
    console.error('Error displaying flights:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/flights', async (req, res) => {
  try {
    const { airline, flightNo } = req.body;
    const newFlight = await Flight.create({ airline, flightNo });
    console.log('New flight created:');
    console.log(newFlight);
    res.send('New flight created.');
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA'],
    required: true
  },
  arrival: {
    type: Date,
    required: true
  }
});

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNo: String,
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA'],
    default: 'SAN'
  },
  destinations: [destinationSchema] // Use the destinationSchema here
});

module.exports = mongoose.model('Flight', flightSchema);



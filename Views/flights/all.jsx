const React = require('react');
const MainLayout = require('../layouts/main');

const AllFlights = ({ flights }) => {
  return (
    <MainLayout>
      <div>
        <h1>All Flights</h1>
        <ul>
          {flights.map((flight) => (
            <li key={flight._id}>
              Airline: {flight.airline}, Flight No.: {flight.flightNo}, Departure: {flight.departs}
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

module.exports = AllFlights;

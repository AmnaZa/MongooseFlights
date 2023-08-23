const React = require('react');
import MainLayout from '../layouts/main';


const AllFlights = ({ flights }) => {
  return (
    <MainLayout>
      <div>
        <h1>All Flights</h1>
        <ul>
          {flights.map((flight) => (
            <li key={flight._id}>
              Airline: {flight.airline}, Flight No.: {flight.flightNo}
              <a href={`/flights/${flight._id}`}> View Details</a>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

module.exports = AllFlights;

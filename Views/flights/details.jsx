import React from 'react';
import MainLayout from '../layouts/main';


const Details = ({ flight }) => {
  return (
    <MainLayout>
      <div className="container">
        <div className="header">
          <h1>Flight Details</h1>
        </div>
        <div className="details">
          <p>Airline: {flight.airline}</p>
          <p>Flight No.: {flight.flightNo}</p>
          <p>Airport: {flight.airport}</p>
          <p>
            Destinations:
            <ul>
              {flight.destinations.map((destination, index) => (
                <li key={index}>
                  Airport: {destination.airport}, Arrival: {new Date(destination.arrival).toLocaleString()}
                </li>

              ))}
            </ul>
          </p>
        </div>
        <div className="actions">
          <a className="link" href="/">
            Back to All Flights
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default Details;

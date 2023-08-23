const React = require('react');
import MainLayout from '../layouts/main';

const AddFlight = () => {
  return (
    <MainLayout>
      <div>
        <h1>Add Flight</h1>
        <form action="/flights" method="POST">
          <label>Airline:</label>
          <input type="text" name="airline" required />
          <label>Flight No.:</label>
          <input type="text" name="flightNo" required />
          <button type="submit">Add Flight</button>
        </form>
      </div>
    </MainLayout>
  );
};

module.exports = AddFlight;

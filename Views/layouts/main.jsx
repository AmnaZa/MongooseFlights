const React = require('react');

const MainLayout = ({ children }) => {
  return (
    <html>
      <head>
        <title>Flight App</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" /> {/* Update the path */}
      </head>
      <body>
        <header>
          <h1>Flight App</h1>
          <nav>
            <ul>
              <li><a href="/">All Flights</a></li>
              <li><a href="/add">Add Flight</a></li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
};

module.exports = MainLayout;

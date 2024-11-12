// Importing express framework for creating the server and managing routes
const express = require('express');

// Importing body-parser middleware to parse JSON data in requests
const bodyParser = require('body-parser');

// Importing database configuration file to connect to MySQL
const db = require('./config/db');

// Creating an instance of the express app
const app = express();

// Defining the port on which the server will run
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Middleware to serve static files (e.g., HTML, CSS) from the "public" folder
app.use(express.static('public'));

// Route to serve the booking page from the public folder
app.get('/booking', (req, res) => {
  res.sendFile(__dirname + '/public/booking.html');
});

// Route to serve the tickets management page from the public folder
app.get('/tickets', (req, res) => {
  res.sendFile(__dirname + '/public/tickets.html');
});

// API endpoint to create a new ticket
app.post('/api/tickets', (req, res) => {
  // Extracting ticket details from the request body
  const { train_name, route, travel_date, departure_time, seats, passenger_name, mobile_number, travel_class } = req.body;

  // SQL query to insert new ticket data into the database
  const query = `INSERT INTO tickets (train_name, route, travel_date, departure_time, seats, passenger_name, mobile_number, travel_class)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Executing the query with provided values
  db.query(query, [train_name, route, travel_date, departure_time, seats, passenger_name, mobile_number, travel_class], (err, result) => {
    if (err) throw err; // Handle errors in query execution
    // Send success response with the new ticket ID
    res.status(201).send({ message: 'Ticket booked successfully', ticketId: result.insertId });
  });
});

// API endpoint to retrieve all tickets
app.get('/api/tickets', (req, res) => {
  // SQL query to select all tickets
  db.query('SELECT * FROM tickets', (err, results) => {
    if (err) throw err; // Handle errors in query execution
    // Send all ticket records as JSON response
    res.status(200).json(results);
  });
});

// API endpoint to retrieve a single ticket by ID
app.get('/api/tickets/:id', (req, res) => {
  // Extracting ticket ID from the request parameters
  const { id } = req.params;

  // SQL query to select ticket by ID
  db.query('SELECT * FROM tickets WHERE id = ?', [id], (err, result) => {
    if (err) throw err; // Handle errors in query execution
    // Send the requested ticket as JSON response
    res.status(200).json(result[0]);
  });
});

// API endpoint to update a ticket by ID
app.put('/api/tickets/:id', (req, res) => {
  // Extracting ticket ID from the request parameters
  const { id } = req.params;

  // Extracting updated ticket details from the request body
  const { train_name, route, travel_date, departure_time, seats, passenger_name, mobile_number, travel_class } = req.body;

  // SQL query to update ticket data by ID
  const query = `UPDATE tickets SET train_name = ?, route = ?, travel_date = ?, departure_time = ?, seats = ?, 
                 passenger_name = ?, mobile_number = ?, travel_class = ? WHERE id = ?`;

  // Executing the query with updated values
  db.query(query, [train_name, route, travel_date, departure_time, seats, passenger_name, mobile_number, travel_class, id], (err) => {
    if (err) throw err; // Handle errors in query execution
    // Send success response for the update action
    res.status(200).send({ message: 'Ticket updated successfully' });
  });
});

// API endpoint to delete a ticket by ID
app.delete('/api/tickets/:id', (req, res) => {
  // Extracting ticket ID from the request parameters
  const { id } = req.params;

  // SQL query to delete ticket by ID
  db.query('DELETE FROM tickets WHERE id = ?', [id], (err) => {
    if (err) throw err; // Handle errors in query execution
    // Send success response for the delete action
    res.status(200).send({ message: 'Ticket deleted successfully' });
  });
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

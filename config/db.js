// Importing the mysql2 library to enable connection with the MySQL database
const mysql = require('mysql2');

// Creating a MySQL database connection with the specified configuration
const db = mysql.createConnection({
  host: 'localhost', // Database host, here it's set to the local machine
  user: 'root', // Username for database authentication
  password: 'cdac123', // Password for database authentication; replace with actual secure password
  database: 'train_booking', // Name of the database being used
  port: 3307 // Specify the port number for MySQL, here it is set to 3307
});

// Establishing the database connection and handling any connection errors
db.connect((err) => {
  if (err) throw err; // If there's an error, throw it for debugging
  console.log('Connected to MySQL Database.'); // Confirm successful connection
});

// Exporting the database connection object so it can be used in other files
module.exports = db;

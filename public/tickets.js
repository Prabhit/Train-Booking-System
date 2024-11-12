// Asynchronous function to fetch all tickets and display them in the tickets table
async function fetchTickets() {
  // Fetch ticket data from the server
  const response = await fetch('/api/tickets');
  // Parse the response JSON to get an array of tickets
  const tickets = await response.json();
  // Find the table element in which tickets will be displayed
  const ticketsTable = document.getElementById('ticketsTable');

  // Loop through each ticket and create a new row for it in the table
  tickets.forEach(ticket => {
      // Format travel date to DD/MM/YYYY format for better readability
      const travelDate = new Date(ticket.travel_date).toLocaleDateString('en-GB');
      // Extract only hours and minutes from the departure time
      const departureTime = ticket.departure_time.slice(0, 5);

      // Create a new table row for each ticket
      const row = document.createElement('tr');
      // Populate the row with ticket details
      row.innerHTML = `
        <td>${ticket.train_name}</td>
        <td>${ticket.route}</td>
        <td>${travelDate}</td>
        <td>${departureTime}</td>
        <td>${ticket.seats}</td>
        <td>${ticket.passenger_name}</td>
        <td>${ticket.mobile_number}</td>
        <td>${ticket.travel_class}</td>
        <td>
          <button onclick="editTicket(${ticket.id})" class="btn btn-warning">Edit</button>
          <button onclick="deleteTicket(${ticket.id})" class="btn btn-danger">Delete</button>
        </td>
      `;
      // Append the new row to the table
      ticketsTable.appendChild(row);
  });
}

// Asynchronous function to delete a ticket by ID
async function deleteTicket(id) {
  // Confirm deletion with the user
  if (confirm('Are you sure you want to delete this ticket?')) {
      // Send a DELETE request to the server
      await fetch(`/api/tickets/${id}`, { method: 'DELETE' });
      alert('Ticket deleted successfully');
      // Reload the page to update the table
      location.reload();
  }
}

// Function to edit a ticket by ID
function editTicket(id) {
  // Prompt the user to enter new details for the ticket
  const newTrainName = prompt("Enter new train name:");
  const newRoute = prompt("Enter new route:");
  const newTravelDate = prompt("Enter new travel date (DD/MM/YYYY):");
  const newDepartureTime = prompt("Enter new departure time (HH:MM):");
  const newSeats = prompt("Enter new number of seats:");
  const newPassengerName = prompt("Enter new passenger name:");
  const newMobileNumber = prompt("Enter new mobile number:");
  const newTravelClass = prompt("Enter travel class (First Class or Second Class):");

  // Ensure that all fields are filled
  if (!newTrainName || !newRoute || !newTravelDate || !newDepartureTime || !newSeats || !newPassengerName || !newMobileNumber || !newTravelClass) {
      alert("All fields are required. Please fill out every field.");
      return;
  }

  // Validate the travel date format and ensure it is in the future
  const [day, month, year] = newTravelDate.split('/');
  if (!day || !month || !year) {
      alert("Please enter a valid travel date in DD/MM/YYYY format.");
      return;
  }

  // Convert the travel date to YYYY-MM-DD format
  const formattedTravelDate = `${year}-${month}-${day}`;
  // Combine date and time to check if it is in the future
  const travelDateTime = new Date(`${formattedTravelDate}T${newDepartureTime}:00`);
  const currentDateTime = new Date();

  if (travelDateTime < currentDateTime) {
      alert("Please enter a future date and time.");
      return;
  }

  // Validate that the travel class is either "First Class" or "Second Class"
  if (newTravelClass !== "First Class" && newTravelClass !== "Second Class") {
      alert("Please enter a valid type of class");
      return;
  }

  // Validate mobile number to ensure it is a 10-digit number
  if (typeof(newMobileNumber) === "string" && !/^\d{10}$/.test(newMobileNumber)) {
      alert("Please enter a valid mobile number");
      return;
  }

  // Create an object with the updated ticket data
  const updatedTicket = {
      train_name: newTrainName,
      route: newRoute,
      travel_date: formattedTravelDate,
      departure_time: newDepartureTime,
      seats: parseInt(newSeats, 10),
      passenger_name: newPassengerName,
      mobile_number: newMobileNumber,
      travel_class: newTravelClass
  };

  // Send an update request (PUT) with the updated ticket data
  fetch(`/api/tickets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTicket)
  })
  .then(response => response.json())
  .then(data => {
      alert('Ticket updated successfully');
      // Reload the page to display updated ticket information
      location.reload();
  })
  .catch(error => console.error('Error updating ticket:', error));
}

// Fetch and display tickets when the page loads
fetchTickets();

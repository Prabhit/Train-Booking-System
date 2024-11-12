// Add a submit event listener to the form with ID 'bookingForm'
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form from submitting normally to allow custom handling

  // Collect form data and convert it to an object with key-value pairs
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Check if all fields are filled; if any field is empty, prompt the user and stop submission
  for (const [key, value] of Object.entries(data)) {
      if (!value) {
          alert(`Please fill out the ${key.replace('_', ' ')} field.`);
          return;
      }
  }

  // Validate travel date format and ensure it is in the future or present
  const [day, month, year] = data.travel_date.split('/');
  if (!day || !month || !year) {
      alert("Please enter a valid travel date in DD/MM/YYYY format.");
      return;
  }

  // Format the travel date to YYYY-MM-DD for consistency with database storage
  const formattedTravelDate = `${year}-${month}-${day}`;
  const travelDateTime = new Date(`${formattedTravelDate}T${data.departure_time}:00`);
  const currentDateTime = new Date();

  // Ensure that the travel date and time are in the future
  if (travelDateTime < currentDateTime) {
      alert("Please enter a future date and time.");
      return;
  }

  // Parse the 'seats' field to an integer for proper data handling
  data.seats = parseInt(data.seats, 10);
  data.travel_date = formattedTravelDate; // Store the formatted date in the data object

  // Validate the mobile number format to ensure it is a 10-digit number
  if (!/^\d{10}$/.test(data.mobile_number)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
  }

  // Submit the validated data to the server using an asynchronous POST request
  try {
      const response = await fetch('/api/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data) // Convert data object to JSON format for sending
      });

      // Handle the server's response
      if (response.ok) {
          const result = await response.json();
          alert(result.message); // Show success message to user
          e.target.reset(); // Reset form fields after successful submission
      } else {
          alert('Failed to book ticket. Please try again.');
      }
  } catch (error) {
      console.error('Error:', error); // Log any errors for debugging
      alert('An error occurred while booking the ticket.');
  }
});

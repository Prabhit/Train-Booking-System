const trains = [
    {
        name: "Rajdhani Express",
        departure: "08:00 AM",
        duration: "3 hours",
        seats: "120",
        date: "2024-11-12",
        route: "Mumbai to Pune",
        classes: {
            firstClass: "Available",
            secondClass: "Not Available"
        }
    },
    {
        name: "Duronto Express",
        departure: "10:00 AM",
        duration: "2 hours",
        seats: "90",
        date: "2024-11-12",
        route: "Nagpur to Solapur",
        classes: {
            firstClass: "Not Available",
            secondClass: "Available"
        }
    },
    {
        name: "Tejas Express",
        departure: "01:00 PM",
        duration: "5 hours",
        seats: "150",
        date: "2024-11-12",
        route: "Pune to Mumbai",
        classes: {
            firstClass: "Available",
            secondClass: "Available"
        }
    },
    {
        name: "Sampark Kranti Express",
        departure: "11:00 AM",
        duration: "2 hours",
        seats: "60",
        date: "2024-11-12",
        route: "Jalgaon to Akola",
        classes: {
            firstClass: "Not Available",
            secondClass: "Available"
        }
    },
    {
        name: "Humsafar Express",
        departure: "4:00 AM",
        duration: "5 hours",
        seats: "70",
        date: "2024-11-12",
        route: "Mumbai to Kolhapur",
        classes: {
            firstClass: "Available",
            secondClass: "Not Available"
        }
    },
    {
        name: "Maharajas Express",
        departure: "3:00 PM",
        duration: "3 hours",
        seats: "100",
        date: "2024-11-12",
        route: "Malegaon to Amravati",
        classes: {
            firstClass: "Available",
            secondClass: "Available"
        }
    },
    {
        name: "Deccan Odyssey",
        departure: "6:00 PM",
        duration: "2 hours",
        seats: "80",
        date: "2024-11-12",
        route: "Ratnagiri to Pandharpur",
        classes: {
            firstClass: "Not Available",
            secondClass: "Available"
        }
    },
    {
        name: "Golden Chariot",
        departure: "9:00 AM",
        duration: "5 hours",
        seats: "130",
        date: "2024-11-12",
        route: "Sangli to Gondia",
        classes: {
            firstClass: "Available",
            secondClass: "Available"
        }
    }
];

function searchTrains() {
    const travelDate = document.getElementById('travel-date').value;
    const route = document.getElementById('route').value.toLowerCase();
    const selectedClass = document.getElementById('class').value;

    const results = trains.filter(train => 
        train.date === travelDate &&
        train.route.toLowerCase() === route &&
        train.classes[selectedClass] === "Available"
    );

    displayResults(results);
}

function displayResults(trains) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (trains.length > 0) {
        const list = document.createElement('ul');
        trains.forEach(train => {
            const item = document.createElement('li');
            item.textContent = `${train.name} - Departs at ${train.departure}, ${train.duration} duration, ${train.classes.firstClass} First Class, ${train.classes.secondClass} Second Class`;
            list.appendChild(item);
        });
        resultsDiv.appendChild(list);
    } else {
        resultsDiv.textContent = 'No trains found matching your criteria.';
    }
}

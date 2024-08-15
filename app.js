document.addEventListener('DOMContentLoaded', function () {
    loadEvents();

    if (window.location.pathname.includes('event-details.html')) {
        loadEventDetails();
    } else if (window.location.pathname.includes('booking-confirmation.html')) {
        loadBookingConfirmation();
    }
});

function loadEvents() {
    fetch('data/events.json')
        .then(response => response.json())
        .then(events => {
            const eventsList = document.getElementById('events-list');
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event-item');
                eventElement.innerHTML = `
                    <h2>${event.name}</h2>
                    <p>${event.date}</p>
                    <p>${event.description}</p>
                    <a href="event-details.html?id=${event.id}">More Details</a>
                `;
                eventsList.appendChild(eventElement);
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

function loadEventDetails() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');

    fetch('data/events.json')
        .then(response => response.json())
        .then(events => {
            const event = events.find(e => e.id == eventId);
            if (event) {
                const eventDetails = document.getElementById('event-details');
                eventDetails.innerHTML = `
                    <h2>${event.name}</h2>
                    <p>${event.date}</p>
                    <p>${event.fullDescription}</p>
                    <p id="ticketTypePrice">Select a ticket type</p>
                `;

                const ticketTypeSelect = document.getElementById('ticketType');
                event.ticketOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.type;
                    optionElement.textContent = `${option.type} - $${option.price} (${option.guests} guests)`;
                    ticketTypeSelect.appendChild(optionElement);
                });

                ticketTypeSelect.addEventListener('change', function() {
                    const selectedType = this.value;
                    const selectedOption = event.ticketOptions.find(option => option.type === selectedType);
                    document.getElementById('ticketTypePrice').textContent = `$${selectedOption.price}`;
                });

                document.getElementById('bookingForm').addEventListener('submit', function (e) {
                    e.preventDefault();

                    const selectedType = document.getElementById('ticketType').value;
                    const selectedOption = event.ticketOptions.find(option => option.type === selectedType);
                    const ticketQuantity = document.getElementById('ticketQuantity').value;

                    const booking = {
                        eventId: eventId,
                        eventName: event.name,
                        ticketType: selectedOption.type,
                        ticketPrice: selectedOption.price,
                        ticketGuests: selectedOption.guests,
                        ticketQuantity: ticketQuantity,
                        totalCost: selectedOption.price * ticketQuantity
                    };

                    localStorage.setItem('booking', JSON.stringify(booking));
                    window.location.href = 'booking-confirmation.html';
                });
            } else {
                document.getElementById('event-details').innerHTML = '<p>Event not found.</p>';
            }
        })
        .catch(error => console.error('Error loading event details:', error));
}

function loadBookingConfirmation() {
    const booking = JSON.parse(localStorage.getItem('booking'));
    if (!booking) {
        document.getElementById('confirmation-details').innerHTML = '<p>No booking found.</p>';
        return;
    }

    const confirmationDetails = document.getElementById('confirmation-details');
    confirmationDetails.innerHTML = `
        <h2>Thank you for your booking!</h2>
        <p>Event: ${booking.eventName}</p>
        <p>Package: ${booking.ticketType} - $${booking.ticketPrice}</p>
        <p>Guests: ${booking.ticketGuests}</p>
        <p>Quantity: ${booking.ticketQuantity}</p>
        <p>Total Cost: $${booking.totalCost}</p>
        <button id="printButton">Print Slip</button>
    `;

    // Add print functionality
    document.getElementById('printButton').addEventListener('click', function () {
        window.print();
    });
}

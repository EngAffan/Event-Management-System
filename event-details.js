document.addEventListener('DOMContentLoaded', function () {
    loadEventDetails();
});

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
                    
                    const booking = {
                        eventId: eventId,
                        eventName: event.name,
                        ticketType: selectedOption.type,
                        ticketPrice: selectedOption.price,
                        ticketGuests: selectedOption.guests,
                        totalCost: selectedOption.price
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

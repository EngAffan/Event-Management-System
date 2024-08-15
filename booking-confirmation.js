document.addEventListener('DOMContentLoaded', function () {
    loadBookingConfirmation();
});

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
        <p>Total Cost: $${booking.totalCost}</p>
    `;

    // Add print functionality
    document.getElementById('printButton').addEventListener('click', function () {
        window.print();
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const myNavbar = document.getElementById('myNavbar');
    const icon = menuToggle.querySelector('i'); // Select the <i> element inside the toggle button

    menuToggle.addEventListener('click', function() {
        // Toggle the 'show' class to display or hide the navbar menu
        myNavbar.classList.toggle('show');

        // Toggle the icon between hamburger (fa-bars) and cross (fa-times)
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

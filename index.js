document.addEventListener('DOMContentLoaded', function () {
    loadEvents();
});

function loadEvents() {
    fetch('data/events.json')
        .then(response => response.json())
        .then(events => {
            const eventButtons = document.querySelectorAll('.event-detail-btn');
            eventButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const eventId = this.getAttribute('data-id');
                    window.location.href = `event-details.html?id=${eventId}`;
                });
            });
        })
        .catch(error => console.error('Error loading events:', error));
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

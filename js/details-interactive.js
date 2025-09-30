// Details Section Interactive Elements

document.addEventListener('DOMContentLoaded', function() {

    // 3D Card Flip Functionality
    const flipButtons = document.querySelectorAll('.flip-btn');
    flipButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.venue-card');
            if (card) {
                card.classList.toggle('flipped');
            }
        });
    });

    // Timeline Interactive
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            // Add active to clicked item
            this.classList.add('active');

            // Update progress bar
            const progress = document.getElementById('timeline-progress');
            if (progress) {
                const percentage = ((index + 1) / timelineItems.length) * 100;
                progress.style.width = percentage + '%';
            }
        });
    });

    // Guest Info Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding pane
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // RSVP Countdown Timer
    function updateCountdown() {
        const deadline = new Date('November 15, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');

            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        }
    }

    // Update countdown every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // Color Option Hover Effects
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            // Create a ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.background = color;
            ripple.style.borderRadius = '50%';
            ripple.style.opacity = '0.3';
            ripple.style.pointerEvents = 'none';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'rippleEffect 1s ease-out';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add ripple animation CSS if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes rippleEffect {
                from {
                    width: 0;
                    height: 0;
                    opacity: 0.5;
                }
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animate timeline on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timeline = entry.target.querySelector('.timeline-progress');
                if (timeline && !timeline.classList.contains('animated')) {
                    timeline.classList.add('animated');
                    timeline.style.animation = 'fillTimeline 3s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        observer.observe(timelineContainer);
    }
});
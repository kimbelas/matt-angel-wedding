// Wedding Countdown Timer
(function() {
  // Wedding date: December 5, 2025 at 1:30 PM (ceremony time)
  const weddingDate = new Date('December 5, 2025 13:30:00').getTime();

  // Get countdown elements
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    console.error('Countdown elements not found');
    return;
  }

  // Update countdown
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Add animation class when value changes
    function updateValue(element, newValue) {
      const currentValue = element.textContent;
      if (currentValue !== String(newValue)) {
        element.classList.add('updating');
        element.textContent = newValue;
        setTimeout(() => {
          element.classList.remove('updating');
        }, 300);
      }
    }

    // Update display with animation
    if (distance > 0) {
      updateValue(daysEl, days);
      updateValue(hoursEl, hours.toString().padStart(2, '0'));
      updateValue(minutesEl, minutes.toString().padStart(2, '0'));
      updateValue(secondsEl, seconds.toString().padStart(2, '0'));
    } else {
      // Wedding day has arrived!
      daysEl.textContent = '0';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';

      // Optional: Show a message
      const countdownContainer = document.querySelector('.countdown-container');
      if (countdownContainer && !countdownContainer.querySelector('.wedding-day-message')) {
        const message = document.createElement('div');
        message.className = 'wedding-day-message';
        message.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(212, 175, 55, 0.95);
          padding: 20px 40px;
          border-radius: 10px;
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: white;
          text-align: center;
          z-index: 10;
        `;
        message.textContent = "It's Our Wedding Day! 🎉";
        countdownContainer.style.position = 'relative';
        countdownContainer.appendChild(message);
      }
    }
  }

  // Initial call
  updateCountdown();

  // Update every second
  const countdownInterval = setInterval(updateCountdown, 1000);

  console.log('Wedding countdown timer initialized');
  console.log('Wedding Date:', new Date(weddingDate).toLocaleString());

  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    clearInterval(countdownInterval);
  });
})();
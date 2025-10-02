// Parking Info Scroll and Auto-open
document.addEventListener('DOMContentLoaded', function() {
  // Handle parking info links
  const parkingLinks = document.querySelectorAll('a[href="#faq-parking"]');

  parkingLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const parkingFAQ = document.getElementById('faq-parking');
      if (!parkingFAQ) return;

      // Smooth scroll to FAQ section
      parkingFAQ.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      // Wait for scroll to complete, then open the FAQ
      setTimeout(() => {
        const question = parkingFAQ.querySelector('.faq-question');
        if (question && !parkingFAQ.classList.contains('active')) {
          question.click();

          // Add highlight effect
          parkingFAQ.style.transition = 'background-color 0.3s ease';
          parkingFAQ.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';

          setTimeout(() => {
            parkingFAQ.style.backgroundColor = '';
          }, 2000);
        }
      }, 800);
    });
  });

  console.log('Parking scroll handler initialized');
});
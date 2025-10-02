// Timeline GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    // Fallback - just show all cards
    document.querySelectorAll('.timeline-event-card').forEach(card => {
      card.classList.add('timeline-visible');
    });
    return;
  }

  // Register ScrollTrigger plugin if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Timeline entrance animation
  gsap.from('.story-title', {
    y: -30,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.love-story',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from('.story-subtitle', {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.love-story',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // Animate timeline line drawing
  gsap.from('.timeline-line-vertical', {
    scaleY: 0,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.timeline-container',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });

  // Animate each timeline card with stagger
  const timelineCards = gsap.utils.toArray('.timeline-event-card');

  timelineCards.forEach((card, index) => {
    // Determine animation direction based on card position
    const isOdd = (index + 1) % 2 !== 0;
    const xStart = isOdd ? -50 : 50;

    // Card animation
    gsap.from(card, {
      x: xStart,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        onEnter: () => card.classList.add('timeline-visible'),
        onLeaveBack: () => card.classList.remove('timeline-visible')
      }
    });

    // Dot animation
    const dot = card.querySelector('.timeline-dot');
    if (dot) {
      gsap.from(dot, {
        scale: 0,
        duration: 0.5,
        delay: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Date badge animation
    const date = card.querySelector('.timeline-date');
    if (date) {
      gsap.from(date, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Title and description stagger animation
    const title = card.querySelector('.timeline-event-title');
    const description = card.querySelector('.timeline-event-description');

    if (title && description) {
      gsap.from([title, description], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });

  // Special animation for the last card (wedding day)
  const lastCard = timelineCards[timelineCards.length - 1];
  if (lastCard) {
    // Add a pulsing glow effect to the wedding day card
    gsap.to(lastCard, {
      boxShadow: '0 5px 30px rgba(212, 175, 55, 0.3)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: lastCard,
        start: 'top 85%',
        toggleActions: 'play pause resume pause'
      }
    });

    // Sparkle effect on the wedding day dot
    const weddingDot = lastCard.querySelector('.timeline-dot');
    if (weddingDot) {
      gsap.to(weddingDot, {
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: lastCard,
          start: 'top 85%',
          toggleActions: 'play pause resume pause'
        }
      });
    }
  }

  // Hover animations for cards
  timelineCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
});
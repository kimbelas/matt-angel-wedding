// Timeline GSAP Animations - Smooth Sliding Effect
document.addEventListener('DOMContentLoaded', function() {
  // Wait for GSAP and ScrollTrigger to be available
  function initTimelineAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      // Fallback - just show all cards
      document.querySelectorAll('.timeline-event-card').forEach(card => {
        card.classList.add('timeline-visible');
      });
      return;
    }

    // Wait for ScrollTrigger to be available
    if (typeof ScrollTrigger === 'undefined') {
      setTimeout(initTimelineAnimations, 50);
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    runTimelineAnimations();
  }

  function runTimelineAnimations() {
    // Smooth fade in for story title
    gsap.to('.story-title', {
      opacity: 1,
      y: 0,
      duration: 1.8,
      ease: 'sine.out',
      scrollTrigger: {
        trigger: '.love-story',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Create a timeline for the formal names sequence
    const formalNamesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.love-story',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Sequence the animations
    formalNamesTimeline
      .to('.story-formal-names', {
        opacity: 1,
        duration: 0.5,
        ease: 'sine.out'
      })
      .to('.groom-column', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'sine.out'
      }, '+=0.2')
      .to('.infinity-column', {
        opacity: 1,
        duration: 0.5,
        ease: 'sine.out'
      }, '-=0.6')
      .to('.formal-infinity', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      .to('.bride-column', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'sine.out'
      }, '-=0.8');

    // Smooth fade in for subtitle
    gsap.to('.story-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1.8,
      delay: 0.9,
      ease: 'sine.out',
      scrollTrigger: {
        trigger: '.love-story',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Smooth timeline line drawing
    gsap.to('.timeline-line-vertical', {
      scaleY: 1,
      opacity: 1,
      duration: 2,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate each timeline card with smooth sliding
    const timelineCards = gsap.utils.toArray('.timeline-event-card');

    timelineCards.forEach((card, index) => {
      // Determine slide direction based on card position
      const isOdd = (index + 1) % 2 !== 0;
      const xStart = isOdd ? -60 : 60;

      // Create timeline for card animation
      const cardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          onEnter: () => card.classList.add('timeline-visible'),
          onLeaveBack: () => card.classList.remove('timeline-visible')
        }
      });

      // Card smooth slide and fade
      cardTimeline.to(card, {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'sine.out'
      }, 0);

      // Dot smooth pop in
      const dot = card.querySelector('.timeline-dot');
      if (dot) {
        cardTimeline.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)'
        }, 0.3);
      }

      // Date smooth fade
      const date = card.querySelector('.timeline-date');
      if (date) {
        cardTimeline.to(date, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'sine.out'
        }, 0.4);
      }

      // Title smooth slide up
      const title = card.querySelector('.timeline-event-title');
      if (title) {
        cardTimeline.to(title, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'sine.out'
        }, 0.5);
      }

      // Description smooth fade
      const description = card.querySelector('.timeline-event-description');
      if (description) {
        cardTimeline.to(description, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'sine.out'
        }, 0.6);
      }
    });

    // Special animation for the last card (wedding day)
    const lastCard = timelineCards[timelineCards.length - 1];
    if (lastCard) {
      // Calculate where to stop the timeline line
      function clipTimelineLine() {
        const timelineLine = document.querySelector('.timeline-line-vertical');
        const timelineContainer = document.querySelector('.timeline-container');

        if (timelineLine && timelineContainer && lastCard) {
          const containerTop = timelineContainer.offsetTop;
          const cardTop = lastCard.offsetTop;
          const stopPoint = cardTop - containerTop - 80;
          const stopPixels = Math.max(0, stopPoint);

          timelineLine.style.height = `${stopPixels}px`;
          timelineLine.style.bottom = 'auto';
        }
      }

      setTimeout(clipTimelineLine, 100);
      window.addEventListener('resize', clipTimelineLine);
      window.addEventListener('load', clipTimelineLine);

      // Gentle pulsing glow effect
      gsap.to(lastCard, {
        boxShadow: '0 5px 30px rgba(212, 175, 55, 0.3)',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: lastCard,
          start: 'top 85%',
          toggleActions: 'play pause resume pause'
        }
      });

      // Gentle sparkle on wedding day dot
      const weddingDot = lastCard.querySelector('.timeline-dot');
      if (weddingDot) {
        gsap.to(weddingDot, {
          scale: 1.15,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: lastCard,
            start: 'top 85%',
            toggleActions: 'play pause resume pause'
          }
        });
      }
    }

    // Smooth hover animations
    timelineCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          duration: 0.6,
          ease: 'sine.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.6,
          ease: 'sine.out'
        });
      });
    });
  }

  // Start initialization
  initTimelineAnimations();
});

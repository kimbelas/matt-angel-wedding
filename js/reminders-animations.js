/**
 * Reminders Section - Lightweight GSAP Animations
 * Optimized for performance with minimal file size
 */

(function() {
  'use strict';

  // Wait for GSAP to be loaded
  function initRemindersAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initRemindersAnimations, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Animate reminder cards with stagger
    const reminderCards = gsap.utils.toArray('.reminder-card');

    if (reminderCards.length > 0) {
      gsap.from(reminderCards, {
        scrollTrigger: {
          trigger: '.reminders-container',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Animate icons with a slight delay and rotation
      const reminderIcons = gsap.utils.toArray('.reminder-icon');
      gsap.from(reminderIcons, {
        scrollTrigger: {
          trigger: '.reminders-container',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        scale: 0,
        rotation: -10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.2,
        ease: 'back.out(1.7)'
      });

      // Animate hashtag display with shimmer
      const hashtagDisplay = document.querySelector('.hashtag-display');
      if (hashtagDisplay) {
        gsap.from(hashtagDisplay, {
          scrollTrigger: {
            trigger: hashtagDisplay,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          x: -30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            // Add a subtle pulse animation after it appears
            gsap.to(hashtagDisplay, {
              scale: 1.02,
              duration: 0.8,
              repeat: 2,
              yoyo: true,
              ease: 'power1.inOut'
            });
          }
        });
      }

      // Subtle hover effects with GSAP (replaces CSS hover)
      reminderCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -3,
            boxShadow: '0 8px 25px rgba(77, 0, 19, 0.12)',
            duration: 0.3,
            ease: 'power2.out'
          });

          const icon = card.querySelector('.reminder-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1.05,
              rotation: 5,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
            duration: 0.3,
            ease: 'power2.out'
          });

          const icon = card.querySelector('.reminder-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      });
    }

    // Animate section header elements
    const remindersTitle = document.querySelector('.reminders-title');
    const remindersSubtitle = document.querySelector('.reminders-subtitle');

    if (remindersTitle) {
      gsap.from(remindersTitle, {
        scrollTrigger: {
          trigger: '.reminders-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    if (remindersSubtitle) {
      gsap.from(remindersSubtitle, {
        scrollTrigger: {
          trigger: '.reminders-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out'
      });
    }

    // Animate logo with a gentle float
    const sectionLogo = document.querySelector('.reminders-header .section-logo-image');
    if (sectionLogo) {
      gsap.from(sectionLogo, {
        scrollTrigger: {
          trigger: '.reminders-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: -20,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });

      // Continuous subtle float animation
      gsap.to(sectionLogo, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRemindersAnimations);
  } else {
    initRemindersAnimations();
  }
})();

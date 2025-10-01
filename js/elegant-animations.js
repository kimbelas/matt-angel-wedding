/* ================================================
   ELEGANT WEDDING ANIMATIONS - GSAP IMPLEMENTATION
   Lightweight, performance-optimized, mobile-first
   ================================================ */

// GSAP Configuration and Initialization
class ElegantAnimations {
  constructor() {
    this.isMobile = window.innerWidth < 768;
    this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    this.isDesktop = window.innerWidth >= 1024;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Performance settings
    this.animationSettings = {
      duration: this.isMobile ? 0.5 : 0.7,
      stagger: this.isMobile ? 0.08 : 0.12,
      ease: 'power2.out',
      smoothEase: 'power3.inOut'
    };

    this.init();
  }

  init() {
    // Skip animations if reduced motion is preferred
    if (this.reducedMotion) {
      this.removeAnimationClasses();
      return;
    }

    // Load GSAP if not already loaded
    if (typeof gsap === 'undefined') {
      this.loadGSAP();
    } else {
      this.initializeAnimations();
    }
  }

  loadGSAP() {
    // Load GSAP core
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js';
    gsapScript.async = true;
    gsapScript.onload = () => this.loadScrollTrigger();
    document.head.appendChild(gsapScript);
  }

  loadScrollTrigger() {
    // Load ScrollTrigger plugin
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js';
    scrollTriggerScript.async = true;
    scrollTriggerScript.onload = () => this.initializeAnimations();
    document.head.appendChild(scrollTriggerScript);
  }

  initializeAnimations() {
    // Wait for ScrollTrigger to be available
    if (typeof ScrollTrigger === 'undefined') {
      setTimeout(() => this.initializeAnimations(), 100);
      return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Configure ScrollTrigger for performance
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      syncInterval: 40
    });

    // Initialize all animations
    this.setupHeaderAnimations();
    this.setupDressCodeAnimations();
    this.setupWeddingPartyAnimations();
    this.setupTimelineAnimations();
    this.setupAccommodationsAnimations();
    this.setupGiftRegistryAnimations();
    this.setupFAQAnimations();
    this.setupParallaxEffects();
    this.setupHoverEffects();
    this.setupScrollIndicators();

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
  }

  // Header and Title Animations
  setupHeaderAnimations() {
    // Elegant fade in for main titles
    gsap.from('.elegant-title', {
      opacity: 0,
      y: 30,
      duration: this.animationSettings.duration,
      stagger: 0.2,
      ease: this.animationSettings.ease
    });

    // Subtitle animations
    gsap.from('.elegant-subtitle', {
      opacity: 0,
      y: 20,
      duration: this.animationSettings.duration,
      delay: 0.3,
      ease: this.animationSettings.ease
    });

    // Hand-drawn underline effect
    gsap.from('.hand-drawn-underline', {
      backgroundSize: '0px 10px',
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    });
  }

  // Dress Code Section Animations
  setupDressCodeAnimations() {
    // Dress code title with circle decoration
    const dressTitle = document.querySelector('.dress-code-title');
    if (dressTitle) {
      gsap.from(dressTitle, {
        opacity: 0,
        scale: 0.9,
        duration: this.animationSettings.duration,
        scrollTrigger: {
          trigger: dressTitle,
          start: 'top 85%',
          once: true
        }
      });

      // Animate the circle decoration
      gsap.from('.dress-code-title::after', {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'back.out(1.7)'
      });
    }

    // Dress cards stagger animation
    gsap.from('.dress-card', {
      opacity: 0,
      y: 40,
      duration: this.animationSettings.duration,
      stagger: this.animationSettings.stagger,
      scrollTrigger: {
        trigger: '.dress-code-grid',
        start: 'top 80%',
        once: true
      }
    });

    // Color swatches animation
    gsap.from('.color-swatch', {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.color-palette',
        start: 'top 85%',
        once: true
      }
    });

    // Dress icons drawing effect
    this.animateSVGIcons('.dress-icon-ladies, .dress-icon-gentlemen');
  }

  // Wedding Party Section Animations
  setupWeddingPartyAnimations() {
    // Party title with decorative flourishes
    const partyTitle = document.querySelector('.party-title');
    if (partyTitle) {
      gsap.from(partyTitle, {
        opacity: 0,
        y: 30,
        duration: this.animationSettings.duration,
        scrollTrigger: {
          trigger: partyTitle,
          start: 'top 85%',
          once: true
        }
      });

      // Animate flourishes
      gsap.from('.party-title::before, .party-title::after', {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'back.out(1.7)'
      });
    }

    // Party cards with elegant reveal
    gsap.from('.party-card', {
      opacity: 0,
      y: 50,
      rotateY: this.isMobile ? 0 : 10,
      duration: this.animationSettings.duration,
      stagger: {
        amount: 0.6,
        from: 'start'
      },
      scrollTrigger: {
        trigger: '.party-grid',
        start: 'top 80%',
        once: true
      }
    });
  }

  // Love Story Timeline Animations
  setupTimelineAnimations() {
    // Animate timeline line drawing
    const timelineLine = document.querySelector('.timeline-line-vertical');
    if (timelineLine) {
      gsap.from(timelineLine, {
        height: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
          once: true
        }
      });
    }

    // Timeline events with alternating animations
    const timelineEvents = gsap.utils.toArray('.timeline-event-card');
    timelineEvents.forEach((event, index) => {
      const isEven = index % 2 === 0;

      gsap.from(event, {
        opacity: 0,
        x: isEven ? -50 : 50,
        duration: this.animationSettings.duration,
        scrollTrigger: {
          trigger: event,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            // Add visible class for CSS animations
            event.classList.add('visible');
          }
        }
      });

      // Animate timeline dots
      const dot = event.querySelector('.timeline-dot');
      if (dot) {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          delay: 0.3,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: event,
            start: 'top 85%',
            once: true
          }
        });
      }
    });
  }

  // Accommodations Section Animations
  setupAccommodationsAnimations() {
    // Hotel cards with elegant reveal
    gsap.from('.hotel-card', {
      opacity: 0,
      y: 40,
      duration: this.animationSettings.duration,
      stagger: this.animationSettings.stagger,
      scrollTrigger: {
        trigger: '.hotel-grid',
        start: 'top 80%',
        once: true
      }
    });

    // Amenity tags animation
    gsap.from('.amenity-tag', {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      stagger: 0.03,
      scrollTrigger: {
        trigger: '.hotel-amenities',
        start: 'top 85%',
        once: true
      }
    });
  }

  // Gift Registry Animations
  setupGiftRegistryAnimations() {
    // Gift cards with floating effect
    const giftCards = gsap.utils.toArray('.gift-card');
    giftCards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        rotation: index % 2 === 0 ? -3 : 3,
        duration: this.animationSettings.duration,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      });

      // Floating animation on idle
      if (!this.isMobile) {
        gsap.to(card, {
          y: -10,
          duration: 2 + (index * 0.2),
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.1
        });
      }
    });

    // Gift icon drawing effect
    this.animateSVGIcons('.gift-icon');
  }

  // FAQ Section Animations
  setupFAQAnimations() {
    const faqItems = document.querySelectorAll('.faq-item');

    // Initial reveal animation
    gsap.from(faqItems, {
      opacity: 0,
      y: 30,
      duration: this.animationSettings.duration,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.faq-container',
        start: 'top 80%',
        once: true
      }
    });

    // Accordion functionality with GSAP
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');

      let isOpen = false;

      question.addEventListener('click', () => {
        isOpen = !isOpen;

        // Toggle active class
        item.classList.toggle('active');

        // Animate answer height
        if (isOpen) {
          gsap.to(answer, {
            maxHeight: answer.scrollHeight,
            duration: 0.4,
            ease: 'power2.inOut'
          });
        } else {
          gsap.to(answer, {
            maxHeight: 0,
            duration: 0.4,
            ease: 'power2.inOut'
          });

          // Reset icon rotation
          gsap.to(icon, {
            rotation: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          });
        }

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.faq-icon');

            gsap.to(otherAnswer, {
              maxHeight: 0,
              duration: 0.4,
              ease: 'power2.inOut'
            });

            gsap.to(otherIcon, {
              rotation: 0,
              duration: 0.3,
              ease: 'power2.inOut'
            });
          }
        });
      });
    });
  }

  // Parallax Effects
  setupParallaxEffects() {
    if (this.isMobile) return; // Skip parallax on mobile for performance

    // Parallax for decorative elements
    gsap.utils.toArray('.gsap-parallax-element').forEach(element => {
      const speed = element.dataset.speed || 0.5;

      gsap.to(element, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element.closest('.gsap-parallax-wrapper'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Subtle parallax for section backgrounds
    gsap.utils.toArray('.elegant-details::before').forEach(bg => {
      gsap.to(bg, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.elegant-details',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }

  // Interactive Hover Effects
  setupHoverEffects() {
    // Magnetic button effect
    const buttons = document.querySelectorAll('.hotel-btn, .royal-btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', (e) => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      // Magnetic follow effect on desktop
      if (this.isDesktop) {
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    // Card tilt effect on hover
    const cards = document.querySelectorAll('.dress-card, .party-card, .hotel-card, .gift-card');
    cards.forEach(card => {
      if (this.isDesktop) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            rotateY: 5,
            rotateX: -5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });
  }

  // Scroll Progress Indicators
  setupScrollIndicators() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--accent), var(--primary));
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressBar.style.width = `${self.progress * 100}%`;
      }
    });
  }

  // Animate SVG icons with drawing effect
  animateSVGIcons(selector) {
    const icons = document.querySelectorAll(selector);
    icons.forEach(icon => {
      // Create drawing effect for SVG paths
      const paths = icon.querySelectorAll('path, circle, rect, ellipse');
      paths.forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 100;

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: icon,
            start: 'top 85%',
            once: true
          }
        });
      });
    });
  }

  // Make elements visible (fallback for when animations don't load)
  makeElementsVisible() {
    const animatedElements = document.querySelectorAll([
      '.gsap-elegant-fade',
      '.gsap-elegant-fade-up',
      '.gsap-elegant-fade-left',
      '.gsap-elegant-fade-right',
      '.gsap-elegant-scale',
      '.gsap-elegant-rotate',
      '.gsap-elegant-stagger'
    ].join(','));

    animatedElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
  }

  // Remove animation classes for reduced motion
  removeAnimationClasses() {
    this.makeElementsVisible();
  }
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ElegantAnimations();
  });
} else {
  new ElegantAnimations();
}

// Reinitialize on window resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Refresh ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 250);
});
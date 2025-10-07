/**
 * Hero Section GSAP Animations - Domino Effect
 * Triggered after loader completes
 */

(function() {
  'use strict';

  let animationsTriggered = false;

  function initHeroAnimations() {
    // Wait for GSAP to be available
    if (typeof gsap === 'undefined') {
      setTimeout(initHeroAnimations, 100);
      return;
    }

    // Listen for loader hide event
    const loader = document.getElementById('loader');
    if (loader) {
      // Create a MutationObserver to watch for loader visibility changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (loader.classList.contains('hidden') && !animationsTriggered) {
              setTimeout(triggerHeroAnimations, 600);
            }
          }
        });
      });

      observer.observe(loader, {
        attributes: true,
        attributeFilter: ['class']
      });

      // Also check if loader is already hidden (in case we load late)
      if (loader.classList.contains('hidden') && !animationsTriggered) {
        setTimeout(triggerHeroAnimations, 600);
      }
    } else {
      // No loader found, trigger immediately
      setTimeout(triggerHeroAnimations, 600);
    }
  }

  function triggerHeroAnimations() {
    if (animationsTriggered) return;

    animationsTriggered = true;

    const coupleName = document.querySelector('.couple-names');
    const weddingDate = document.querySelector('.wedding-date');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    // Verify elements exist
    if (!coupleName || !weddingDate || !heroSubtitle) return;

    // Set initial state - hidden with dramatic starting position
    gsap.set([coupleName, weddingDate, heroSubtitle], {
      opacity: 0,
      y: 150,
      scale: 0.85,
      clearProps: 'none'
    });

    // Create timeline for sequential animations (dramatic domino effect)
    const timeline = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'power4.out'
      }
    });

    // DOMINO EFFECT: Each element falls into place one after another
    timeline.to(coupleName, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.8,
      ease: 'back.out(1.4)'
    });

    timeline.to(weddingDate, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.6,
      ease: 'back.out(1.3)'
    }, '+=1.0');

    timeline.to(heroSubtitle, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: 'back.out(1.2)'
    }, '+=0.8');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroAnimations);
  } else {
    initHeroAnimations();
  }

  // Also expose function globally for manual triggering if needed
  window.triggerHeroAnimations = triggerHeroAnimations;
})();

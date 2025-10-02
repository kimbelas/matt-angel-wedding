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
      console.log('⏳ Waiting for GSAP...');
      setTimeout(initHeroAnimations, 100);
      return;
    }

    console.log('✅ GSAP loaded, hero animations ready');

    // Listen for loader hide event
    const loader = document.getElementById('loader');
    if (loader) {
      // Create a MutationObserver to watch for loader visibility changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (loader.classList.contains('hidden') && !animationsTriggered) {
              console.log('🚀 Loader hidden, triggering hero animations with delay...');
              setTimeout(triggerHeroAnimations, 600); // Longer delay for dramatic entrance
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
        console.log('🚀 Loader already hidden, triggering hero animations with delay');
        setTimeout(triggerHeroAnimations, 600); // Longer delay for dramatic effect
      }
    } else {
      // No loader found, trigger immediately
      console.log('⚠️ No loader found, triggering animations with delay');
      setTimeout(triggerHeroAnimations, 600);
    }
  }

  function triggerHeroAnimations() {
    if (animationsTriggered) {
      console.log('⚠️ Animations already triggered, skipping');
      return;
    }

    animationsTriggered = true;
    console.log('🎬 Starting hero domino animations');

    const coupleName = document.querySelector('.couple-names');
    const weddingDate = document.querySelector('.wedding-date');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    // Verify elements exist
    if (!coupleName || !weddingDate || !heroSubtitle) {
      console.error('❌ Hero elements not found:', {
        coupleName: !!coupleName,
        weddingDate: !!weddingDate,
        heroSubtitle: !!heroSubtitle
      });
      return;
    }

    console.log('✅ All hero elements found');

    // Set initial state - hidden with dramatic starting position
    gsap.set([coupleName, weddingDate, heroSubtitle], {
      opacity: 0,
      y: 150, // Start further down for more dramatic effect
      scale: 0.85, // Start smaller for better scale-up effect
      clearProps: 'none'
    });

    // Create timeline for sequential animations (dramatic domino effect)
    const timeline = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'power4.out'
      },
      onStart: () => console.log('▶️ Timeline started - DOMINO EFFECT!'),
      onComplete: () => console.log('✅ All hero animations complete!')
    });

    // DOMINO EFFECT: Each element falls into place one after another
    // Element 1: Couple name - dramatic entrance
    timeline.to(coupleName, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.8,
      ease: 'back.out(1.4)',
      onStart: () => console.log('📝 [1/3] Animating couple names...')
    });

    // Wait 1 second, then start wedding date
    timeline.to(weddingDate, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.6,
      ease: 'back.out(1.3)',
      onStart: () => console.log('📅 [2/3] Animating wedding date...')
    }, '+=1.0'); // Full 1 second gap for dramatic effect

    // Wait another 0.8 seconds, then start subtitle
    timeline.to(heroSubtitle, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: 'back.out(1.2)',
      onStart: () => console.log('💬 [3/3] Animating hero subtitle...')
    }, '+=0.8'); // Another gap for domino effect

    // Add a gentle continuous float to the couple names
    gsap.to(coupleName, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2
    });
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

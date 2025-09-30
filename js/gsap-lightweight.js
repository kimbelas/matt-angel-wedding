// Lightweight GSAP Animations for Details Section
// Mobile-first, performance-optimized

// Only load GSAP if not already loaded
if (typeof gsap === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = initGSAPAnimations;
    document.head.appendChild(script);

    // Load ScrollTrigger plugin
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    scrollTriggerScript.async = true;
    document.head.appendChild(scrollTriggerScript);
} else {
    // GSAP already loaded, init animations
    document.addEventListener('DOMContentLoaded', initGSAPAnimations);
}

function initGSAPAnimations() {
    // Wait for ScrollTrigger to load
    if (typeof ScrollTrigger === 'undefined') {
        setTimeout(initGSAPAnimations, 100);
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Performance: Use will-change sparingly
    ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true
    });

    // Reduce animations on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const animationDuration = isMobile ? 0.6 : 0.8;
    const staggerAmount = isMobile ? 0.1 : 0.15;

    // Simple fade animations for header
    gsap.to('.gsap-fade', {
        opacity: 1,
        duration: animationDuration,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Timeline events animation
    gsap.to('.gsap-timeline', {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        stagger: staggerAmount,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.timeline-simple',
            start: 'top 80%',
            once: true
        }
    });

    // Parallax effect for venue images (desktop only)
    if (!isMobile) {
        gsap.utils.toArray('.venue-image-full img').forEach(img => {
            gsap.to(img, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }

    // Fade up animations for overlay text
    gsap.utils.toArray('.gsap-fade-up').forEach(element => {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: animationDuration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Slide animations for venue info
    gsap.utils.toArray('.gsap-slide-left').forEach(element => {
        gsap.to(element, {
            opacity: 1,
            x: 0,
            duration: animationDuration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                once: true
            }
        });
    });

    gsap.utils.toArray('.gsap-slide-right').forEach(element => {
        gsap.to(element, {
            opacity: 1,
            x: 0,
            duration: animationDuration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                once: true
            }
        });
    });

    // Scale animations for info cards
    gsap.utils.toArray('.gsap-scale').forEach((element, i) => {
        gsap.to(element, {
            opacity: 1,
            scale: 1,
            duration: animationDuration,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                once: true
            }
        });
    });

    // Clean up on page unload to prevent memory leaks
    window.addEventListener('beforeunload', () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    });
}

// Optimize for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Skip animations for users who prefer reduced motion
    document.querySelectorAll('.gsap-fade, .gsap-fade-up, .gsap-slide-left, .gsap-slide-right, .gsap-scale, .gsap-timeline').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
} else {
    // Initialize animations
    if (typeof gsap !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initGSAPAnimations);
        } else {
            initGSAPAnimations();
        }
    }
}
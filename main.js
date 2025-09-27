// Main JavaScript - Royal Wedding Website
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const rsvpForm = document.getElementById('rsvp-form');
const successMessage = document.getElementById('success-message');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Global variables
let currentImageIndex = 0;
let galleryImages = [];
let isLoading = true;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Show loading screen first
    showLoader();

    // Initialize core features
    setTimeout(() => {
        hideLoader();
        initializeNavigation();
        initializeScrollEffects();
        initializeAnimations();
        initializeParallax();
        initializeLazyLoading();
        initializeGallery();
        initializeForm();
        initializeSaveDateSection();
        initializeScrollToTop();

        // Mark loading as complete
        isLoading = false;

        // Trigger initial animations
        triggerInitialAnimations();
    }, 2000);
}

// Loading screen functions
function showLoader() {
    if (loader) {
        loader.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideLoader() {
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16));

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
}

function handleNavbarScroll() {
    if (!navbar) return;

    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        gsap.to(window, {
            duration: 1,
            scrollTo: { y: offsetTop, autoKill: false },
            ease: "power2.inOut"
        });

        // Close mobile menu if open
        if (navMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Parallax backgrounds
    gsap.utils.toArray('.hero').forEach(section => {
        gsap.to(section, {
            backgroundPosition: '50% 100%',
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Initialize GSAP animations
function initializeAnimations() {
    // Timeline items animation
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const isEven = index % 2 === 0;
        const xDirection = isEven ? -100 : 100;

        gsap.from(item, {
            x: xDirection,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Detail cards animation
    gsap.utils.toArray('.detail-card').forEach((card, index) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Gallery items animation
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // RSVP form animation
    gsap.from('.rsvp-form', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.rsvp-form',
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
}

// Parallax effects
function initializeParallax() {
    gsap.utils.toArray('[data-parallax]').forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;

        gsap.to(element, {
            yPercent: -50 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Lazy loading implementation
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
            }
        });
    }
}

// Gallery functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryImages = Array.from(galleryItems);

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    // Lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // Close lightbox on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);
}

function openLightbox(index) {
    currentImageIndex = index;
    const img = galleryImages[index];

    if (lightboxImg && img) {
        lightboxImg.src = img.src || img.getAttribute('data-src');
        lightboxImg.alt = img.alt;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Animate lightbox entrance
        gsap.from(lightbox, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });

        gsap.from(lightboxImg, {
            scale: 0.8,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    }
}

function closeLightbox() {
    if (lightbox) {
        gsap.to(lightbox, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = galleryImages[currentImageIndex];
    if (lightboxImg && img) {
        gsap.to(lightboxImg, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                lightboxImg.src = img.src || img.getAttribute('data-src');
                lightboxImg.alt = img.alt;
                gsap.to(lightboxImg, {
                    opacity: 1,
                    duration: 0.2
                });
            }
        });
    }
}

function handleLightboxKeyboard(e) {
    if (!lightbox.classList.contains('show')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
}

// Form functionality
function initializeForm() {
    if (!rsvpForm) return;

    // Form input animations
    const formGroups = rsvpForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            input.addEventListener('focus', () => animateLabel(label, true));
            input.addEventListener('blur', () => {
                if (!input.value) {
                    animateLabel(label, false);
                }
            });
        }
    });

    // Form submission
    rsvpForm.addEventListener('submit', handleFormSubmission);

    // Real-time validation
    const inputs = rsvpForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function animateLabel(label, isFocused) {
    gsap.to(label, {
        y: isFocused ? -25 : 0,
        scale: isFocused ? 0.85 : 1,
        color: isFocused ? '#D4AF37' : '#2c3e50',
        duration: 0.3,
        ease: "power2.out"
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isValid = field.checkValidity();

    if (!isValid) {
        showFieldError(field, getErrorMessage(field));
        return false;
    }

    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);

    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';

    field.parentNode.appendChild(errorElement);
    field.style.borderBottomColor = '#e74c3c';

    // Animate error appearance
    gsap.from(errorElement, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.out"
    });
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderBottomColor = '#ddd';
}

function getErrorMessage(field) {
    const fieldType = field.type || field.tagName.toLowerCase();

    if (field.validity.valueMissing) {
        return `${field.labels[0]?.textContent || 'This field'} is required.`;
    }

    if (field.validity.typeMismatch) {
        if (fieldType === 'email') {
            return 'Please enter a valid email address.';
        }
    }

    if (field.validity.rangeOverflow || field.validity.rangeUnderflow) {
        return 'Please enter a valid number of guests.';
    }

    return 'Please enter a valid value.';
}

async function handleFormSubmission(e) {
    e.preventDefault();

    // Validate all fields
    const inputs = rsvpForm.querySelectorAll('input[required], select[required]');
    let isFormValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        // Shake form to indicate errors
        gsap.to(rsvpForm, {
            x: [-10, 10, -10, 10, 0],
            duration: 0.5,
            ease: "power2.out"
        });
        return;
    }

    // Show loading state
    const submitBtn = rsvpForm.querySelector('.rsvp-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate form submission (replace with actual submission logic)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        showSuccessMessage();
        rsvpForm.reset();

    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('Something went wrong. Please try again.');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function showSuccessMessage() {
    if (successMessage) {
        successMessage.classList.add('show');

        // Animate success message
        gsap.from(successMessage, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });

        // Scroll to success message
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: successMessage, offsetY: 100 },
            ease: "power2.inOut"
        });
    }
}

function showErrorMessage(message) {
    // Create temporary error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #e74c3c;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        text-align: center;
    `;

    rsvpForm.appendChild(errorDiv);

    // Animate and auto-remove
    gsap.from(errorDiv, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.out"
    });

    setTimeout(() => {
        gsap.to(errorDiv, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => errorDiv.remove()
        });
    }, 5000);
}

// Save the Date section
function initializeSaveDateSection() {
    const saveDateSection = document.querySelector('.save-date-section');
    const saveDateImage = document.querySelector('.save-date-bg');

    if (!saveDateSection || !saveDateImage) return;

    // Add parallax effect to the save date image
    gsap.to(saveDateImage, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: saveDateSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Add fade-in animation when section comes into view
    gsap.from('.save-date-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: saveDateSection,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Add hover effect enhancement
    saveDateImage.addEventListener('mouseenter', () => {
        gsap.to(saveDateImage, {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    saveDateImage.addEventListener('mouseleave', () => {
        gsap.to(saveDateImage, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    if (!backToTop) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        const shouldShow = window.scrollY > 500;

        if (shouldShow && !backToTop.classList.contains('visible')) {
            backToTop.classList.add('visible');
            gsap.from(backToTop, {
                scale: 0,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        } else if (!shouldShow && backToTop.classList.contains('visible')) {
            backToTop.classList.remove('visible');
        }
    }, 100));

    // Smooth scroll to top
    backToTop.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: "power2.inOut"
        });
    });
}

// Trigger initial animations after page load
function triggerInitialAnimations() {
    // Hero content animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.timeline()
            .from('.couple-names', {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            })
            .from('.wedding-date', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=0.8")
            .from('.hero-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5")
            .from('.scroll-indicator', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.3");
    }
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Map functionality (placeholder)
window.openMap = function(location) {
    const locations = {
        ceremony: 'St. Michael\'s Cathedral, 123 Royal Avenue, City Center',
        reception: 'Grand Royal Ballroom, 456 Palace Gardens, Royal District'
    };

    const address = locations[location];
    if (address) {
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
    }
};

// Ripple effect for buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('rsvp-btn') || e.target.closest('.rsvp-btn')) {
        createRipple(e);
    }
});

function createRipple(event) {
    const button = event.target.closest('.rsvp-btn');
    if (!button) return;

    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;

    button.appendChild(ripple);

    gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

// Performance optimization: Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadCriticalImages();

// Export functions for global access
window.weddingApp = {
    openLightbox,
    closeLightbox,
    openMap: window.openMap
};
// Main JavaScript - Royal Wedding Website
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const rsvpForm = document.getElementById('rsvp-form');
const successMessage = document.getElementById('success-message');

// Global variables
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
        initializeForm();

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

    // Mobile menu toggle - using button element for better mobile support
    if (hamburger && navMenu) {
        console.log('Hamburger button and navMenu found');

        // Primary click event
        hamburger.addEventListener('click', (e) => {
            console.log('Hamburger clicked');
            e.preventDefault();
            toggleMobileMenu();
        });

        // Touch support for mobile
        hamburger.addEventListener('touchstart', (e) => {
            console.log('Hamburger touched');
            e.preventDefault();
            toggleMobileMenu();
        });
    } else {
        console.log('Hamburger or navMenu not found');
    }

    // Instant navigation for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Found nav links:', navLinks.length);

    navLinks.forEach((link, index) => {
        console.log(`Link ${index}:`, link.getAttribute('href'));
        link.addEventListener('click', handleInstantNavigation);
    });
}

// Global variable for scroll direction
let lastScrollY = 0;
let isScrollingDown = false;

function handleNavbarScroll() {
    if (!navbar) return;

    const currentScrollY = window.scrollY;
    const scrolled = currentScrollY > 50;

    // Toggle scrolled state
    navbar.classList.toggle('scrolled', scrolled);

    // Determine scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past hero section
        if (!isScrollingDown) {
            isScrollingDown = true;
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-visible');
        }
    } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        if (isScrollingDown || currentScrollY <= 100) {
            isScrollingDown = false;
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        }
    }

    // Always show navbar at the top
    if (currentScrollY <= 100) {
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-visible');
        isScrollingDown = false;
    }

    lastScrollY = currentScrollY;
}

function toggleMobileMenu(forceClose = false) {
    const isOpen = navMenu.classList.contains('open');

    if (forceClose || isOpen) {
        // Close menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');

        // Remove event listeners
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', handleEscapeKey);
    } else {
        // Open menu
        hamburger.classList.add('active');
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');

        // Add event listeners for closing menu
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscapeKey);
        }, 100); // Small delay to prevent immediate closing
    }
}

// Close menu when clicking outside
function handleOutsideClick(e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMobileMenu(true);
    }
}

// Close menu when pressing Escape key
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        toggleMobileMenu(true);
    }
}

function handleInstantNavigation(e) {
    e.preventDefault();

    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    console.log('Instant navigation clicked:', targetId, targetElement);

    if (targetElement && targetId) {
        // Close mobile menu immediately for better UX
        if (navMenu && navMenu.classList.contains('open')) {
            toggleMobileMenu(true);
        }

        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        console.log('Jumping to position:', offsetTop);

        // Instant navigation - no animation
        window.scrollTo({
            top: offsetTop,
            left: 0,
            behavior: 'instant'
        });

        console.log('Instant navigation executed');
    } else {
        console.error('Target element not found for:', targetId);
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

}

// Initialize GSAP animations
function initializeAnimations() {
    // Add any remaining animations for hero section here if needed
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
            }, "-=0.5");
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
        color: isFocused ? '#D4AF37' : 'rgba(77, 0, 19, 0.7)',
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
    field.style.borderBottomColor = 'rgba(77, 0, 19, 0.2)';
}

function getErrorMessage(field) {
    const fieldType = field.type || field.tagName.toLowerCase();

    if (field.validity.valueMissing) {
        return `${field.labels[0]?.textContent || 'This field'} is required.`;
    }

    if (field.validity.typeMismatch) {
        if (fieldType === 'tel') {
            return 'Please enter a valid phone number.';
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
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate form submission (replace with actual submission logic)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        showSuccessMessage();
        rsvpForm.reset();

        // Reset all labels
        const labels = rsvpForm.querySelectorAll('label');
        labels.forEach(label => {
            gsap.to(label, {
                y: 0,
                scale: 1,
                color: 'rgba(77, 0, 19, 0.7)',
                duration: 0.3,
                ease: "power2.out"
            });
        });

    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('Something went wrong. Please try again.');
    } finally {
        // Reset button
        submitBtn.querySelector('.btn-text').textContent = originalText;
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
            duration: 0.6,
            ease: "back.out(1.7)"
        });

        // Scroll to success message
        const successTop = successMessage.offsetTop - 100;
        window.scrollTo({
            top: successTop,
            left: 0,
            behavior: 'smooth'
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
        border-radius: 15px;
        margin-top: 1rem;
        text-align: center;
        box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
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

// Ripple effect for RSVP button
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

// Export functions for global access
window.weddingApp = {
    showSuccessMessage,
    validateField
};
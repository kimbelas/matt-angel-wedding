// RSVP Page JavaScript - Royal Wedding Website

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
        initializeForm();
        isLoading = false;
    }, 1500);
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
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    }
}

// Navigation functionality
function initializeNavigation() {
    // Navbar scroll effect with passive listener for better performance
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16), { passive: true });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
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
        if (!isScrollingDown) {
            isScrollingDown = true;
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-visible');
        }
    } else if (currentScrollY < lastScrollY) {
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
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');

        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', handleEscapeKey);
    } else {
        hamburger.classList.add('active');
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');

        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscapeKey);
        }, 100);
    }
}

function handleOutsideClick(e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMobileMenu(true);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        toggleMobileMenu(true);
    }
}

function handleInstantNavigation(e) {
    const targetId = e.target.getAttribute('href') || e.currentTarget.getAttribute('href');

    const isMobileMenuOpen = navMenu && navMenu.classList.contains('open');
    if (isMobileMenuOpen) {
        toggleMobileMenu(true);
    }

    // Allow default navigation for non-hash links
    if (!targetId || !targetId.startsWith('#')) {
        return;
    }

    e.preventDefault();
    const targetElement = document.querySelector(targetId);

    if (targetElement && targetId) {
        const offsetTop = targetElement.offsetTop - 80;
        const scrollDelay = isMobileMenuOpen ? 300 : 0;

        setTimeout(() => {
            window.scrollTo({
                top: offsetTop,
                left: 0,
                behavior: 'smooth'
            });
        }, scrollDelay);
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
        input.addEventListener('blur', () => {
            input.classList.add('touched');
            validateField(input);
        });
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function animateLabel(label, isFocused) {
    label.style.transform = isFocused ? 'translateY(-25px) scale(0.85)' : 'translateY(0) scale(1)';
    label.style.color = isFocused ? '#D4AF37' : 'rgba(77, 0, 19, 0.7)';
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
    errorElement.style.opacity = '0';
    errorElement.style.transform = 'translateY(-10px)';
    errorElement.style.transition = 'all 0.3s ease';

    field.parentNode.appendChild(errorElement);

    setTimeout(() => {
        errorElement.style.opacity = '1';
        errorElement.style.transform = 'translateY(0)';
    }, 10);
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderBottomColor = '';
    field.style.borderColor = '';
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
        rsvpForm.style.animation = 'shake 0.5s ease';
        setTimeout(() => rsvpForm.style.animation = '', 500);
        return;
    }

    // Show loading state
    const submitBtn = rsvpForm.querySelector('.rsvp-btn');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Get form data
        const formData = {
            name: rsvpForm.querySelector('#name').value,
            phone: rsvpForm.querySelector('#phone').value,
            attendance: rsvpForm.querySelector('#attendance').value,
            guests: rsvpForm.querySelector('#guests').value,
            message: rsvpForm.querySelector('#message').value || '',
            timestamp: new Date().toISOString()
        };

        // Google Apps Script URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwL7lqBussIR33kNRZMx5vPIJTGJ-DLP5e-Vjt58LAGOrudTElrU9pdyYA2dRQLMoM/exec';

        // Use FormData for Google Apps Script compatibility
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('attendance', formData.attendance);
        formDataToSend.append('guests', formData.guests);
        formDataToSend.append('message', formData.message);
        formDataToSend.append('timestamp', formData.timestamp);

        await fetch(scriptURL, {
            method: 'POST',
            body: formDataToSend,
            mode: 'no-cors'
        });

        // Show success message
        showSuccessMessage();
        rsvpForm.reset();

        // Reset all labels
        const labels = rsvpForm.querySelectorAll('label');
        labels.forEach(label => {
            label.style.transform = 'translateY(0) scale(1)';
            label.style.color = 'rgba(77, 0, 19, 0.7)';
        });

    } catch (error) {
        showErrorMessage('Something went wrong. Please try again.');
    } finally {
        // Reset button
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.disabled = false;
    }
}

function showSuccessMessage() {
    if (successMessage) {
        // Hide form
        rsvpForm.style.display = 'none';

        // Show success message
        successMessage.classList.add('show');

        // Scroll to RSVP section
        const rsvpSection = document.getElementById('rsvp');
        if (rsvpSection) {
            setTimeout(() => {
                rsvpSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }
}

function showErrorMessage(message) {
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

    errorDiv.style.opacity = '0';
    errorDiv.style.transform = 'translateY(-20px)';
    errorDiv.style.transition = 'all 0.3s ease';

    rsvpForm.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => errorDiv.remove(), 300);
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
        transition: all 0.6s ease;
        opacity: 1;
    `;

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.style.transform = 'scale(2)';
        ripple.style.opacity = '0';
        setTimeout(() => ripple.remove(), 600);
    }, 10);
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

// Export functions for global access
window.rsvpApp = {
    showSuccessMessage,
    validateField
};

// Main JavaScript - Royal Wedding Website - Optimized

// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const rsvpForm = document.getElementById('rsvp-form');
const successMessage = document.getElementById('success-message');
const threeColumnGallery = document.getElementById('three-column-gallery');
const galleryOverlay = document.getElementById('gallery-overlay');
const slideshowModal = document.getElementById('slideshow-modal');
const modalCloseSlideshow = document.getElementById('modal-close-slideshow');
const prevSlideBtn = document.getElementById('prev-slide-btn');
const nextSlideBtn = document.getElementById('next-slide-btn');
const currentSlideIndexSpan = document.getElementById('current-slide-index');
const totalSlidesSpan = document.getElementById('total-slides');


// Global variables
let isLoading = true;
let currentSlideIndex = 0;
let slideshowInterval = null;
let isModalOpen = false;

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
        initializeSlideshow();

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
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    }
}

// DEPRECATED: Hero animations now handled by hero-gsap.js
function triggerHeroAnimations() {
    // No-op for backwards compatibility
}

// Navigation functionality
function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16));

    // Mobile menu toggle - using button element for better mobile support
    if (hamburger && navMenu) {
        // Primary click event
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        });

        // Touch support for mobile
        hamburger.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        });
    }

    // Instant navigation for navigation links
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

    if (targetElement && targetId) {
        // Close mobile menu immediately for better UX
        if (navMenu && navMenu.classList.contains('open')) {
            toggleMobileMenu(true);
        }

        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        // Instant navigation - no animation
        window.scrollTo({
            top: offsetTop,
            left: 0,
            behavior: 'instant'
        });
    }
}

// Scroll effects - Simplified
function initializeScrollEffects() {
    // Removed heavy parallax effects for performance
}

// Simplified animations
function initializeAnimations() {
    // Removed GSAP for better performance
}

// Parallax effects - Removed for performance
function initializeParallax() {
    // Removed heavy parallax effects
}






// Simplified animations - CSS only
function triggerInitialAnimations() {
    // Using CSS animations instead of GSAP for better performance
    const elements = document.querySelectorAll('.hero-content > *, .section-logo, .gallery-title, .gallery-description, .video-container-large, .view-gallery-btn, .rsvp-header *, .rsvp-form *, .rsvp-btn');
    elements.forEach(el => el.classList.add('animate-in'));
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
        input.addEventListener('blur', () => {
            input.classList.add('touched');
            validateField(input);
        });
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function animateLabel(label, isFocused) {
    // Using CSS transitions instead of GSAP
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

    // Trigger animation
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
    // Remove any inline border styles to let CSS handle it
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
        // Shake form to indicate errors
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
        // Simulate form submission (replace with actual submission logic)
        await new Promise(resolve => setTimeout(resolve, 2000));

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
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(50px)';
        successMessage.style.transition = 'all 0.6s ease';
        successMessage.classList.add('show');

        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 10);

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

// Three-Column Gallery functionality
function initializeSlideshow() {
    if (!threeColumnGallery) return;

    const allColumnImages = document.querySelectorAll('.column-image');
    const modalSlideImages = document.querySelectorAll('.modal-slide-image');

    // Set total slides count (total images across all columns)
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = allColumnImages.length;
    }

    // Start automatic three-column slideshow
    startThreeColumnSlideshow();

    // Add click event to gallery overlay
    if (galleryOverlay) {
        galleryOverlay.addEventListener('click', openSlideshowModal);
    }

    // Modal close event
    if (modalCloseSlideshow) {
        modalCloseSlideshow.addEventListener('click', closeSlideshowModal);
    }

    // Navigation buttons
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', showPreviousSlide);
    }

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', showNextSlide);
    }

    // Keyboard navigation for modal
    document.addEventListener('keydown', handleSlideshowKeyboard);

    // Click outside modal to close
    if (slideshowModal) {
        slideshowModal.addEventListener('click', (e) => {
            if (e.target === slideshowModal || e.target.classList.contains('modal-backdrop')) {
                closeSlideshowModal();
            }
        });
    }
}

function startThreeColumnSlideshow() {
    const columnContainers = document.querySelectorAll('.column-image-container');
    if (columnContainers.length === 0 || isModalOpen) return;

    // Get images per column (assume each column has same number of images)
    const firstColumnImages = columnContainers[0].querySelectorAll('.column-image');
    const imagesPerColumn = firstColumnImages.length;

    slideshowInterval = setInterval(() => {
        if (isModalOpen) return;

        // Change images in all columns simultaneously
        columnContainers.forEach(container => {
            const images = container.querySelectorAll('.column-image');

            // Remove active class from current image
            images[currentSlideIndex].classList.remove('active');

            // Add active class to next image
            const nextIndex = (currentSlideIndex + 1) % imagesPerColumn;
            images[nextIndex].classList.add('active');
        });

        // Update current slide index
        currentSlideIndex = (currentSlideIndex + 1) % imagesPerColumn;
    }, 3000); // 3 seconds for better viewing of multiple images
}

function stopThreeColumnSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

function openSlideshowModal() {
    if (!slideshowModal) return;

    isModalOpen = true;
    stopThreeColumnSlideshow();

    // Set modal to first image
    currentSlideIndex = 0;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Show modal
    slideshowModal.classList.add('active');

    // Initialize modal slideshow
    initializeModalSlideshow();

    // Focus management
    if (modalCloseSlideshow) {
        modalCloseSlideshow.focus();
    }

    // Animate modal opening
    gsap.fromTo(slideshowModal, {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
    });

    gsap.fromTo('.modal-content', {
        scale: 0.8,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 0.1,
        ease: "back.out(1.7)"
    });
}

function closeSlideshowModal() {
    if (!slideshowModal) return;

    // Animate modal closing
    gsap.to(slideshowModal, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
            slideshowModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            isModalOpen = false;
            // Restart three-column slideshow
            startThreeColumnSlideshow();
        }
    });

    gsap.to('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
    });
}

function showPreviousSlide() {
    const modalSlideImages = document.querySelectorAll('.modal-slide-image');
    modalSlideImages[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex - 1 + modalSlideImages.length) % modalSlideImages.length;
    updateModalSlideshow();
    animateSlideChange();
}

function showNextSlide() {
    const modalSlideImages = document.querySelectorAll('.modal-slide-image');
    modalSlideImages[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % modalSlideImages.length;
    updateModalSlideshow();
    animateSlideChange();
}

function initializeModalSlideshow() {
    const modalSlideImages = document.querySelectorAll('.modal-slide-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Set total slides count
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = modalSlideImages.length;
    }

    // Initialize first image and thumbnail as active
    updateModalSlideshow();

    // Add click event listeners to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}

function updateModalSlideshow() {
    const modalSlideImages = document.querySelectorAll('.modal-slide-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Remove active class from all modal images and thumbnails
    modalSlideImages.forEach(img => img.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    // Add active class to current image and thumbnail
    if (modalSlideImages[currentSlideIndex]) {
        modalSlideImages[currentSlideIndex].classList.add('active');
    }

    if (thumbnails[currentSlideIndex]) {
        thumbnails[currentSlideIndex].classList.add('active');
        // Scroll thumbnail into view
        thumbnails[currentSlideIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    // Update counter
    if (currentSlideIndexSpan) {
        currentSlideIndexSpan.textContent = currentSlideIndex + 1;
    }
}

function goToSlide(slideIndex) {
    const modalSlideImages = document.querySelectorAll('.modal-slide-image');
    if (slideIndex >= 0 && slideIndex < modalSlideImages.length) {
        currentSlideIndex = slideIndex;
        updateModalSlideshow();
        animateSlideChange();
    }
}

function animateSlideChange() {
    const activeImage = document.querySelector('.modal-slide-image.active');
    if (!activeImage) return;

    // Smooth transition animation
    gsap.fromTo(activeImage, {
        opacity: 0.7,
        scale: 0.95
    }, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
    });
}

function handleSlideshowKeyboard(e) {
    if (!slideshowModal?.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeSlideshowModal();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            showPreviousSlide();
            break;
        case 'ArrowRight':
            e.preventDefault();
            showNextSlide();
            break;
    }
}

// Export functions for global access
window.weddingApp = {
    showSuccessMessage,
    validateField,
    openSlideshowModal,
    closeSlideshowModal
};
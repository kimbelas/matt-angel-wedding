// Gallery Module - Royal Wedding Website
// Advanced gallery functionality with performance optimizations

class WeddingGallery {
    constructor(options = {}) {
        this.options = {
            selector: '.gallery-grid',
            itemSelector: '.gallery-item',
            imageSelector: 'img',
            lightboxSelector: '#lightbox',
            preloadCount: 3,
            transitionDuration: 0.3,
            swipeThreshold: 50,
            ...options
        };

        this.currentIndex = 0;
        this.images = [];
        this.isLightboxOpen = false;
        this.startX = 0;
        this.startY = 0;
        this.isSwipe = false;

        this.init();
    }

    init() {
        this.setupElements();
        this.bindEvents();
        this.setupLazyLoading();
        this.setupPreloading();
        this.setupKeyboardNavigation();
        this.setupTouchGestures();
    }

    setupElements() {
        this.gallery = document.querySelector(this.options.selector);
        this.lightbox = document.querySelector(this.options.lightboxSelector);
        this.lightboxImg = this.lightbox?.querySelector('img');
        this.lightboxClose = this.lightbox?.querySelector('.lightbox-close');
        this.lightboxPrev = this.lightbox?.querySelector('.lightbox-prev');
        this.lightboxNext = this.lightbox?.querySelector('.lightbox-next');

        if (!this.gallery) {
            console.warn('Gallery container not found');
            return;
        }

        // Get all gallery images
        this.images = Array.from(this.gallery.querySelectorAll(this.options.imageSelector));
        this.setupImageData();
    }

    setupImageData() {
        this.images.forEach((img, index) => {
            img.dataset.galleryIndex = index;

            // Store original data for lightbox
            const imageData = {
                src: img.src || img.dataset.src,
                alt: img.alt,
                caption: img.dataset.caption || '',
                element: img
            };

            img._galleryData = imageData;
        });
    }

    bindEvents() {
        if (!this.gallery) return;

        // Gallery item clicks
        this.gallery.addEventListener('click', this.handleGalleryClick.bind(this));

        // Lightbox controls
        this.lightboxClose?.addEventListener('click', this.closeLightbox.bind(this));
        this.lightboxPrev?.addEventListener('click', this.showPrevious.bind(this));
        this.lightboxNext?.addEventListener('click', this.showNext.bind(this));

        // Click outside to close
        this.lightbox?.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Window resize optimization
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    }

    handleGalleryClick(e) {
        const img = e.target.closest(this.options.imageSelector);
        if (!img) return;

        e.preventDefault();
        const index = parseInt(img.dataset.galleryIndex, 10);
        this.openLightbox(index);
    }

    openLightbox(index) {
        if (this.isLightboxOpen || !this.lightbox) return;

        this.currentIndex = index;
        this.isLightboxOpen = true;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Show lightbox
        this.lightbox.classList.add('show');
        this.lightbox.setAttribute('aria-hidden', 'false');

        // Load image
        this.loadLightboxImage(index);

        // Preload adjacent images
        this.preloadAdjacentImages(index);

        // Animate entrance
        this.animateLightboxOpen();

        // Announce to screen readers
        this.announceToScreenReader(`Image ${index + 1} of ${this.images.length} opened`);
    }

    closeLightbox() {
        if (!this.isLightboxOpen || !this.lightbox) return;

        this.isLightboxOpen = false;

        // Animate exit
        gsap.to(this.lightbox, {
            opacity: 0,
            duration: this.options.transitionDuration,
            ease: "power2.out",
            onComplete: () => {
                this.lightbox.classList.remove('show');
                this.lightbox.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
            }
        });

        // Return focus to original image
        const originalImg = this.images[this.currentIndex];
        if (originalImg) {
            originalImg.focus();
        }
    }

    loadLightboxImage(index) {
        const imageData = this.images[index]._galleryData;
        if (!imageData || !this.lightboxImg) return;

        // Show loading state
        this.showLoadingState();

        // Create new image for preloading
        const img = new Image();

        img.onload = () => {
            this.lightboxImg.src = img.src;
            this.lightboxImg.alt = imageData.alt;
            this.hideLoadingState();
            this.updateLightboxUI(index);
        };

        img.onerror = () => {
            this.showErrorState();
        };

        img.src = imageData.src;
    }

    showLoadingState() {
        if (!this.lightboxImg) return;

        this.lightboxImg.style.opacity = '0.5';

        // Add loading indicator if not exists
        if (!this.lightbox.querySelector('.loading-indicator')) {
            const loader = document.createElement('div');
            loader.className = 'loading-indicator';
            loader.innerHTML = '<div class="loading-spinner"></div>';
            loader.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
            `;
            this.lightbox.appendChild(loader);
        }
    }

    hideLoadingState() {
        if (!this.lightboxImg) return;

        this.lightboxImg.style.opacity = '1';
        const loader = this.lightbox.querySelector('.loading-indicator');
        if (loader) {
            loader.remove();
        }
    }

    showErrorState() {
        if (!this.lightboxImg) return;

        this.lightboxImg.alt = 'Failed to load image';
        this.hideLoadingState();

        // Show error message
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'Failed to load image';
        error.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            background: rgba(0, 0, 0, 0.7);
            padding: 1rem;
            border-radius: 5px;
        `;
        this.lightbox.appendChild(error);

        setTimeout(() => error.remove(), 3000);
    }

    updateLightboxUI(index) {
        // Update counter if exists
        const counter = this.lightbox.querySelector('.image-counter');
        if (counter) {
            counter.textContent = `${index + 1} / ${this.images.length}`;
        }

        // Update navigation button states
        if (this.lightboxPrev) {
            this.lightboxPrev.disabled = index === 0;
            this.lightboxPrev.setAttribute('aria-label',
                index === 0 ? 'No previous image' : 'Previous image');
        }

        if (this.lightboxNext) {
            this.lightboxNext.disabled = index === this.images.length - 1;
            this.lightboxNext.setAttribute('aria-label',
                index === this.images.length - 1 ? 'No next image' : 'Next image');
        }
    }

    showPrevious() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.loadLightboxImage(this.currentIndex);
            this.preloadAdjacentImages(this.currentIndex);
        }
    }

    showNext() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.loadLightboxImage(this.currentIndex);
            this.preloadAdjacentImages(this.currentIndex);
        }
    }

    preloadAdjacentImages(index) {
        const preloadIndexes = [
            index - 1,
            index + 1
        ].filter(i => i >= 0 && i < this.images.length);

        preloadIndexes.forEach(i => {
            const imageData = this.images[i]._galleryData;
            if (imageData && !imageData.preloaded) {
                const img = new Image();
                img.src = imageData.src;
                img.onload = () => {
                    imageData.preloaded = true;
                };
            }
        });
    }

    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            this.images.forEach(img => this.loadImage(img));
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });

        this.images.forEach(img => {
            if (img.dataset.src && !img.src) {
                imageObserver.observe(img);
            }
        });
    }

    loadImage(img) {
        if (img.dataset.src && !img.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');

            img.onload = () => {
                img.classList.add('loaded');
                this.animateImageLoad(img);
            };
        }
    }

    animateImageLoad(img) {
        gsap.from(img, {
            opacity: 0,
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    setupPreloading() {
        // Preload first few images for better initial experience
        const preloadCount = Math.min(this.options.preloadCount, this.images.length);

        for (let i = 0; i < preloadCount; i++) {
            const img = this.images[i];
            if (img && img.dataset.src) {
                setTimeout(() => this.loadImage(img), i * 100);
            }
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.isLightboxOpen) return;

            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.showNext();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToImage(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToImage(this.images.length - 1);
                    break;
            }
        });
    }

    setupTouchGestures() {
        if (!this.lightbox) return;

        this.lightbox.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.lightbox.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        this.lightbox.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }

    handleTouchStart(e) {
        if (!this.isLightboxOpen) return;

        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.isSwipe = false;
    }

    handleTouchMove(e) {
        if (!this.isLightboxOpen || !this.startX || !this.startY) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - this.startX);
        const diffY = Math.abs(currentY - this.startY);

        // Determine if this is a horizontal swipe
        if (diffX > diffY && diffX > 10) {
            this.isSwipe = true;
        }
    }

    handleTouchEnd(e) {
        if (!this.isLightboxOpen || !this.startX || !this.startY || !this.isSwipe) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = this.startX - endX;

        if (Math.abs(diffX) > this.options.swipeThreshold) {
            if (diffX > 0) {
                // Swipe left - next image
                this.showNext();
            } else {
                // Swipe right - previous image
                this.showPrevious();
            }
        }

        // Reset
        this.startX = 0;
        this.startY = 0;
        this.isSwipe = false;
    }

    goToImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentIndex = index;
            this.loadLightboxImage(index);
            this.preloadAdjacentImages(index);
        }
    }

    animateLightboxOpen() {
        if (!this.lightbox) return;

        // Reset styles
        gsap.set(this.lightbox, { opacity: 0 });
        gsap.set(this.lightboxImg, { scale: 0.8, opacity: 0 });

        // Animate entrance
        const tl = gsap.timeline();

        tl.to(this.lightbox, {
            opacity: 1,
            duration: this.options.transitionDuration,
            ease: "power2.out"
        })
        .to(this.lightboxImg, {
            scale: 1,
            opacity: 1,
            duration: this.options.transitionDuration,
            ease: "back.out(1.7)"
        }, "-=0.2");
    }

    handleResize() {
        // Recalculate positions if needed
        if (this.isLightboxOpen) {
            this.updateLightboxUI(this.currentIndex);
        }
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API methods
    destroy() {
        // Clean up event listeners
        this.gallery?.removeEventListener('click', this.handleGalleryClick);
        this.lightboxClose?.removeEventListener('click', this.closeLightbox);
        this.lightboxPrev?.removeEventListener('click', this.showPrevious);
        this.lightboxNext?.removeEventListener('click', this.showNext);

        // Reset state
        this.isLightboxOpen = false;
        this.images = [];
        document.body.style.overflow = 'auto';
    }

    refresh() {
        // Re-initialize gallery with current state
        this.setupElements();
        this.setupLazyLoading();
        this.setupPreloading();
    }

    getImageCount() {
        return this.images.length;
    }

    getCurrentIndex() {
        return this.currentIndex;
    }
}

// Auto-initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.gallery-grid')) {
        window.weddingGallery = new WeddingGallery();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeddingGallery;
}

// Add to global namespace
window.WeddingGallery = WeddingGallery;
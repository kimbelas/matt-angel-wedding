// Form Module - Royal Wedding Website
// Advanced form handling with validation and accessibility

class WeddingForm {
    constructor(options = {}) {
        this.options = {
            formSelector: '#rsvp-form',
            successSelector: '#success-message',
            submitUrl: '/api/rsvp', // Replace with actual endpoint
            validationRules: {
                name: { required: true, minLength: 2 },
                email: { required: true, type: 'email' },
                attendance: { required: true },
                guests: { type: 'number', min: 1, max: 2 }
            },
            messages: {
                required: 'This field is required',
                email: 'Please enter a valid email address',
                minLength: 'Must be at least {min} characters',
                maxLength: 'Must be no more than {max} characters',
                min: 'Must be at least {min}',
                max: 'Must be no more than {max}',
                pattern: 'Please enter a valid value'
            },
            ...options
        };

        this.form = null;
        this.fields = new Map();
        this.isSubmitting = false;
        this.validationTimeout = null;

        this.init();
    }

    init() {
        this.setupForm();
        this.setupFields();
        this.bindEvents();
        this.setupA11y();
    }

    setupForm() {
        this.form = document.querySelector(this.options.formSelector);
        this.successMessage = document.querySelector(this.options.successSelector);

        if (!this.form) {
            console.warn('RSVP form not found');
            return;
        }

        // Add form attributes for accessibility
        this.form.setAttribute('novalidate', '');
        this.form.setAttribute('role', 'form');
        this.form.setAttribute('aria-label', 'Wedding RSVP Form');
    }

    setupFields() {
        if (!this.form) return;

        const formElements = this.form.querySelectorAll('input, select, textarea');

        formElements.forEach(field => {
            const fieldData = {
                element: field,
                name: field.name,
                type: field.type || field.tagName.toLowerCase(),
                label: this.getFieldLabel(field),
                errorElement: null,
                isValid: false,
                rules: this.options.validationRules[field.name] || {}
            };

            this.fields.set(field.name, fieldData);
            this.setupField(fieldData);
        });
    }

    setupField(fieldData) {
        const { element, name } = fieldData;

        // Add ARIA attributes
        element.setAttribute('aria-describedby', `${name}-error ${name}-help`);
        element.setAttribute('aria-invalid', 'false');

        // Add required attribute if needed
        if (fieldData.rules.required) {
            element.setAttribute('required', '');
            element.setAttribute('aria-required', 'true');
        }

        // Setup custom styling classes
        element.classList.add('form-field');

        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.id = `${name}-error`;
        errorContainer.className = 'field-error';
        errorContainer.setAttribute('role', 'alert');
        errorContainer.setAttribute('aria-live', 'polite');
        errorContainer.style.display = 'none';

        element.parentNode.appendChild(errorContainer);
        fieldData.errorElement = errorContainer;
    }

    getFieldLabel(field) {
        // Try to find label by for attribute
        let label = document.querySelector(`label[for="${field.id}"]`);

        // Try to find label by proximity
        if (!label) {
            label = field.closest('.form-group')?.querySelector('label');
        }

        return label?.textContent?.trim() || field.name;
    }

    bindEvents() {
        if (!this.form) return;

        // Form submission
        this.form.addEventListener('submit', this.handleSubmit.bind(this));

        // Field events
        this.fields.forEach(fieldData => {
            const { element } = fieldData;

            element.addEventListener('input', this.handleFieldInput.bind(this, fieldData));
            element.addEventListener('blur', this.handleFieldBlur.bind(this, fieldData));
            element.addEventListener('focus', this.handleFieldFocus.bind(this, fieldData));

            // Special handling for select elements
            if (element.tagName === 'SELECT') {
                element.addEventListener('change', this.handleFieldChange.bind(this, fieldData));
            }
        });

        // Real-time validation with debouncing
        this.form.addEventListener('input', this.debounce(this.validateForm.bind(this), 300));
    }

    handleFieldInput(fieldData, event) {
        // Clear previous error state on input
        this.clearFieldError(fieldData);

        // Update field state
        fieldData.element.classList.add('has-input');

        // Animate label if needed
        this.animateLabel(fieldData, true);

        // Special handling for different field types
        if (fieldData.type === 'email') {
            this.validateEmailFormat(fieldData);
        }
    }

    handleFieldBlur(fieldData, event) {
        // Validate field on blur
        this.validateField(fieldData);

        // Animate label back if field is empty
        if (!fieldData.element.value.trim()) {
            this.animateLabel(fieldData, false);
            fieldData.element.classList.remove('has-input');
        }
    }

    handleFieldFocus(fieldData, event) {
        // Animate label on focus
        this.animateLabel(fieldData, true);
        fieldData.element.classList.add('focused');

        // Clear any existing errors
        this.clearFieldError(fieldData);
    }

    handleFieldChange(fieldData, event) {
        // Immediate validation for select elements
        this.validateField(fieldData);

        // Special logic for attendance field
        if (fieldData.name === 'attendance') {
            this.handleAttendanceChange(fieldData.element.value);
        }
    }

    handleAttendanceChange(value) {
        const guestsField = this.fields.get('guests');
        if (!guestsField) return;

        if (value === 'no') {
            // Hide guests field if not attending
            guestsField.element.closest('.form-group').style.display = 'none';
            guestsField.element.value = '';
            guestsField.element.removeAttribute('required');
        } else if (value === 'yes') {
            // Show guests field if attending
            guestsField.element.closest('.form-group').style.display = 'block';
            guestsField.element.setAttribute('required', '');

            // Animate field appearance
            gsap.from(guestsField.element.closest('.form-group'), {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }

    validateField(fieldData) {
        const { element, rules } = fieldData;
        const value = element.value.trim();

        // Reset validation state
        fieldData.isValid = true;
        element.setAttribute('aria-invalid', 'false');

        // Required field validation
        if (rules.required && !value) {
            this.showFieldError(fieldData, this.options.messages.required);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!value && !rules.required) {
            return true;
        }

        // Type-specific validation
        if (rules.type === 'email' && !this.isValidEmail(value)) {
            this.showFieldError(fieldData, this.options.messages.email);
            return false;
        }

        if (rules.type === 'number') {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                this.showFieldError(fieldData, 'Please enter a valid number');
                return false;
            }

            if (rules.min !== undefined && numValue < rules.min) {
                this.showFieldError(fieldData,
                    this.options.messages.min.replace('{min}', rules.min));
                return false;
            }

            if (rules.max !== undefined && numValue > rules.max) {
                this.showFieldError(fieldData,
                    this.options.messages.max.replace('{max}', rules.max));
                return false;
            }
        }

        // Length validation
        if (rules.minLength && value.length < rules.minLength) {
            this.showFieldError(fieldData,
                this.options.messages.minLength.replace('{min}', rules.minLength));
            return false;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            this.showFieldError(fieldData,
                this.options.messages.maxLength.replace('{max}', rules.maxLength));
            return false;
        }

        // Pattern validation
        if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
            this.showFieldError(fieldData, this.options.messages.pattern);
            return false;
        }

        // Field is valid
        this.clearFieldError(fieldData);
        return true;
    }

    validateForm() {
        let isFormValid = true;

        this.fields.forEach(fieldData => {
            if (!this.validateField(fieldData)) {
                isFormValid = false;
            }
        });

        // Update submit button state
        this.updateSubmitButton(isFormValid);

        return isFormValid;
    }

    validateEmailFormat(fieldData) {
        const value = fieldData.element.value.trim();
        if (value && !this.isValidEmail(value)) {
            fieldData.element.classList.add('email-invalid');
        } else {
            fieldData.element.classList.remove('email-invalid');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(fieldData, message) {
        const { element, errorElement } = fieldData;

        fieldData.isValid = false;
        element.setAttribute('aria-invalid', 'true');
        element.classList.add('field-error-state');

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';

            // Animate error appearance
            gsap.fromTo(errorElement,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }

        // Shake field for visual feedback
        gsap.fromTo(element,
            { x: 0 },
            { x: [-5, 5, -5, 5, 0], duration: 0.4, ease: "power2.out" }
        );
    }

    clearFieldError(fieldData) {
        const { element, errorElement } = fieldData;

        fieldData.isValid = true;
        element.setAttribute('aria-invalid', 'false');
        element.classList.remove('field-error-state');

        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    }

    animateLabel(fieldData, isFocused) {
        const label = fieldData.element.parentNode.querySelector('label');
        if (!label) return;

        gsap.to(label, {
            y: isFocused || fieldData.element.value ? -25 : 0,
            scale: isFocused || fieldData.element.value ? 0.85 : 1,
            color: isFocused ? '#D4AF37' : '#2c3e50',
            duration: 0.3,
            ease: "power2.out"
        });
    }

    updateSubmitButton(isValid) {
        const submitButton = this.form.querySelector('.rsvp-btn');
        if (!submitButton) return;

        submitButton.classList.toggle('form-valid', isValid);
        submitButton.disabled = !isValid || this.isSubmitting;
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.isSubmitting) return;

        // Final form validation
        if (!this.validateForm()) {
            this.focusFirstInvalidField();
            this.announceFormErrors();
            return;
        }

        this.isSubmitting = true;
        const submitButton = this.form.querySelector('.rsvp-btn');
        const originalText = submitButton.textContent;

        try {
            // Update button state
            this.updateSubmitButtonLoading(submitButton, true);

            // Collect form data
            const formData = this.collectFormData();

            // Submit form
            const response = await this.submitForm(formData);

            if (response.success) {
                this.showSuccess();
                this.resetForm();
                this.trackFormSuccess();
            } else {
                this.showError(response.message || 'Submission failed. Please try again.');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Something went wrong. Please check your connection and try again.');
        } finally {
            this.isSubmitting = false;
            this.updateSubmitButtonLoading(submitButton, false, originalText);
        }
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add timestamp
        data.timestamp = new Date().toISOString();

        return data;
    }

    async submitForm(data) {
        // Simulate API call - replace with actual implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                const success = Math.random() > 0.1; // 90% success rate
                resolve({
                    success,
                    message: success ? 'RSVP submitted successfully!' : 'Server error occurred'
                });
            }, 2000);
        });

        // Actual implementation would be:
        /*
        const response = await fetch(this.options.submitUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return await response.json();
        */
    }

    updateSubmitButtonLoading(button, isLoading, originalText = '') {
        if (isLoading) {
            button.innerHTML = `
                <span class="loading-spinner"></span>
                <span>Sending...</span>
            `;
            button.disabled = true;
            button.classList.add('loading');
        } else {
            button.innerHTML = originalText || 'Send RSVP';
            button.disabled = false;
            button.classList.remove('loading');
        }
    }

    showSuccess() {
        if (this.successMessage) {
            this.successMessage.classList.add('show');

            // Animate success message
            gsap.fromTo(this.successMessage,
                { opacity: 0, y: 50, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
            );

            // Scroll to success message
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: this.successMessage, offsetY: 100 },
                ease: "power2.inOut"
            });

            // Hide form
            gsap.to(this.form, {
                opacity: 0.5,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        // Announce success to screen readers
        this.announceToScreenReader('RSVP submitted successfully! Thank you for your response.');
    }

    showError(message) {
        // Create or update error message
        let errorDiv = this.form.querySelector('.form-error-message');

        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-message';
            errorDiv.setAttribute('role', 'alert');
            errorDiv.setAttribute('aria-live', 'assertive');
            this.form.insertBefore(errorDiv, this.form.firstChild);
        }

        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: #e74c3c;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            text-align: center;
        `;

        // Animate error appearance
        gsap.fromTo(errorDiv,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );

        // Auto-remove after 5 seconds
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

    resetForm() {
        this.form.reset();

        // Reset field states
        this.fields.forEach(fieldData => {
            const { element } = fieldData;
            element.classList.remove('has-input', 'focused', 'field-error-state');
            this.animateLabel(fieldData, false);
            this.clearFieldError(fieldData);
        });

        // Reset form validation state
        this.updateSubmitButton(false);
    }

    focusFirstInvalidField() {
        for (const [name, fieldData] of this.fields) {
            if (!fieldData.isValid) {
                fieldData.element.focus();
                break;
            }
        }
    }

    announceFormErrors() {
        const errorCount = Array.from(this.fields.values())
            .filter(field => !field.isValid).length;

        if (errorCount > 0) {
            this.announceToScreenReader(
                `Form has ${errorCount} error${errorCount > 1 ? 's' : ''}. Please review and correct.`
            );
        }
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    setupA11y() {
        // Add screen reader only instructions
        const instructions = document.createElement('div');
        instructions.className = 'sr-only';
        instructions.textContent = 'Fill out this form to RSVP for our wedding. All required fields are marked.';
        this.form.insertBefore(instructions, this.form.firstChild);
    }

    trackFormSuccess() {
        // Analytics tracking - replace with your preferred analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: 'rsvp_form'
            });
        }
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
        // Clean up event listeners and reset state
        this.form?.removeEventListener('submit', this.handleSubmit);
        this.fields.clear();
        this.isSubmitting = false;
    }

    getFormData() {
        return this.collectFormData();
    }

    setFieldValue(fieldName, value) {
        const fieldData = this.fields.get(fieldName);
        if (fieldData) {
            fieldData.element.value = value;
            this.handleFieldInput(fieldData, { target: fieldData.element });
        }
    }

    isFormValid() {
        return this.validateForm();
    }
}

// Auto-initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#rsvp-form')) {
        window.weddingForm = new WeddingForm();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeddingForm;
}

// Add to global namespace
window.WeddingForm = WeddingForm;
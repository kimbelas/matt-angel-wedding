# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Royal Wedding Website for Matthew & Angel - A high-performance, mobile-first wedding website built with vanilla JavaScript and Vite, featuring GSAP animations, Google Sheets RSVP integration, and a photo gallery.

**Wedding Details:**
- Date: December 5, 2025
- RSVP Deadline: November 15, 2025
- Venue 1: Holy Rosary Parish Church (Ceremony)
- Venue 2: Grand Palazzo Royale (Reception)

## Commands

### Development
```bash
npm run dev      # Start dev server on http://localhost:5173
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
```

### Deployment
The site is configured for Vercel deployment with `vercel.json`. The build outputs to `dist/` directory.

## Architecture & Design Patterns

### Pages & Entry Points
- **index.html** - Main wedding page (hero, timeline, details, RSVP form, gallery preview)
- **gallery.html** - Full photo gallery page with lightbox
- **main.js** - Main page initialization and interactions (loaded at root)
- **js/gallery.js** - Gallery page specific functionality

### Modular JavaScript Architecture
Each feature has its own isolated JavaScript module loaded from `index.html`:

**Animation Modules:**
- `js/hero-gsap.js` - Hero section domino animations (triggered after loader)
- `js/timeline-animations.js` - Love story timeline animations
- `js/elegant-animations.js` - General GSAP scroll animations
- `js/reminders-animations.js` - Gentle reminders section animations

**Feature Modules:**
- `js/countdown.js` - RSVP countdown timer
- `js/faq-simple.js` - FAQ accordion functionality
- `js/parking-scroll.js` - Parking section scroll effects
- `js/gsap-lightweight.js` - Core GSAP setup and configuration

**Key Pattern:** All animation modules listen for the loader to complete (via MutationObserver watching for `#loader.hidden` class) before triggering animations. This ensures smooth initial page load.

### CSS Organization
CSS is split into focused, layered files:

**Core:**
- `css/main.css` - Base styles, CSS variables, typography (mobile-first)
- `css/responsive.css` - Breakpoint-specific responsive adjustments
- `css/animations.css` - Reusable animation definitions

**Feature-Specific:**
- `css/hero-animations.css` - Hero section specific styles
- `css/timeline-enhanced.css` - Love story timeline styles
- `css/gallery.css` - Gallery grid and lightbox styles
- `css/countdown.css` - Countdown timer styles
- `css/venue-royal.css` - Venue cards with 3D flip effect
- `css/reminders.css` - Gentle reminders section
- `css/save-the-date.css` - Save the date section
- `css/details-elegant.css`, `css/details-simple.css` - Event details variations
- `css/love-story-redesign.css` - Love story section redesign
- `css/elegant-redesign.css` - Overall elegant theme
- `css/layout-fixes.css` - Layout and z-index fixes
- `css/sections-visible.css` - Section visibility utilities
- `css/white-backgrounds.css` - White background sections
- `css/fonts.css` - Font loading and definitions
- `css/section-titles.css` - Section title styling

**Loading Strategy:** Critical CSS is inlined in HTML `<head>`, non-critical CSS loaded via `<link>` tags.

### GSAP Animation System
- GSAP is the primary animation library (loaded via CDN)
- `gsap-lightweight.js` registers GSAP plugins (ScrollTrigger)
- Animation modules use GSAP's timeline and ScrollTrigger features
- All animations use `transform` and `opacity` for 60fps performance
- Animations are triggered after loader completes to avoid FOUC

### Form & RSVP Integration
- RSVP form in `index.html` submits to Google Apps Script
- `google-apps-script.js` contains the backend code (deployed separately to Google Apps Script)
- Form data is posted as FormData to the Apps Script Web App URL
- Responses are stored in Google Sheets with automatic formatting

### Performance Optimizations
1. **Lazy Loading:** Images use Intersection Observer API
2. **Code Splitting:** Vite bundles GSAP separately as vendor chunk
3. **Critical CSS:** Inlined in HTML head for instant rendering
4. **Asset Optimization:** Vite minifies and compresses all assets
5. **Cache Headers:** Configured in `vercel.json` for optimal caching
6. **Font Loading:** Google Fonts with preconnect and font-display: swap
7. **Bundle Size:** Terser removes console.log in production builds

### Mobile-First Approach
- Base styles target 320px viewport
- Progressive enhancement via media queries in `css/responsive.css`
- Touch-friendly 44px minimum tap targets
- Simplified animations on mobile for better performance
- Hamburger menu for mobile navigation

### Design System
**Colors (CSS Variables in :root):**
- `--primary: #4d0013` (Deep Burgundy)
- `--accent: #D4AF37` (Royal Gold)
- `--white: #FFFFFF`

**Typography:**
- Body: Cormorant Garamond
- Headings: Bergstana Script, Allura, Great Vibes (cursive)
- Formal: Cinzel
- Script: Alex Brush
- All use responsive `clamp()` sizing via CSS variables

**Spacing Scale:**
- `--spacing-xs` through `--spacing-2xl` (0.5rem to 4rem)

## Key Technical Decisions

### Why Vanilla JS?
- Minimal bundle size for fast load times
- Direct DOM manipulation for predictable performance
- No framework overhead for a single-page site
- Easier to optimize for Core Web Vitals

### Why Modular CSS?
- Each section's styles are isolated and cacheable
- Easy to add/remove features without affecting others
- Progressive loading: critical first, then feature-specific
- Better debugging (clear source of styles)

### Why Google Sheets for RSVP?
- No backend server required
- Free and reliable
- Easy for non-technical users to manage responses
- Real-time updates

### Why GSAP?
- Hardware-accelerated animations (60fps on mobile)
- Advanced scroll-triggered animations
- Better cross-browser consistency than CSS animations
- Timeline-based animation orchestration

## Common Development Tasks

### Adding a New Section
1. Add HTML to `index.html`
2. Create feature-specific CSS file in `css/`
3. Link CSS in `index.html` `<head>`
4. Create feature-specific JS module if needed
5. Load JS module at end of `<body>`
6. Ensure mobile-first responsive styles

### Modifying Animations
1. Locate the specific animation module in `js/`
2. Modify GSAP timeline or ScrollTrigger configuration
3. Test across devices (especially mobile performance)
4. Ensure animations respect `prefers-reduced-motion`

### Updating RSVP Form
1. Modify form fields in `index.html` (#rsvp-form)
2. Update `main.js` form handling if needed
3. Update `google-apps-script.js` to match new fields
4. Re-deploy Apps Script after changes

### Optimizing Images
1. Convert to WebP format
2. Keep file size under 200KB
3. Use appropriate dimensions (hero: 2070px, gallery: 800px)
4. Add lazy loading class if not already present
5. Include proper alt text for accessibility

## Testing Priorities
1. **Mobile Performance:** Test on iPhone SE and low-end Android
2. **Network Conditions:** Throttle to 3G in DevTools
3. **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
4. **Cross-browser:** Chrome, Safari, Firefox, Edge
5. **Accessibility:** Keyboard navigation, screen reader support

## Build Configuration (vite.config.js)
- **Manual Chunks:** GSAP bundled separately as vendor chunk
- **Terser:** Removes console.log in production
- **Asset Inlining:** Files < 4KB inlined as base64
- **CSS Code Splitting:** Enabled for better caching
- **Dev Server:** Port 5173, auto-opens browser

## Deployment Configuration (vercel.json)
- **Clean URLs:** Enabled (no .html extensions)
- **Cache Strategy:**
  - HTML: no-cache (max-age=0)
  - Static assets: 1 year cache (immutable)
- **Trailing Slash:** Disabled

## Important Patterns to Follow

### Performance-First Development
1. Always consider mobile and 3G network speeds
2. Lazy load images and non-critical resources
3. Keep JavaScript bundle under 100KB (gzipped)
4. Keep CSS under 50KB (gzipped)
5. Use `transform` and `opacity` for animations
6. Avoid layout-triggering CSS properties in animations

### Mobile-First CSS
1. Write base styles for mobile (320px+)
2. Add desktop enhancements in media queries
3. Use responsive units (`clamp()`, `vw`, `rem`)
4. Test touch interactions on real devices

### Animation Best Practices
1. Wait for loader to complete before animating
2. Use GSAP for complex animations
3. Keep animations under 500ms on mobile
4. Respect `prefers-reduced-motion`
5. Avoid animating `width`, `height`, `top`, `left`

### Accessibility Requirements
1. WCAG 2.1 AA compliance
2. Keyboard navigation for all interactive elements
3. ARIA labels for screen readers
4. Sufficient color contrast ratios
5. Focus indicators on all focusable elements

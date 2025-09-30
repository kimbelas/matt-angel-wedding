# Claude Project Configuration

## Project Overview
Royal Wedding Website for Matthew & Angel - A luxurious, elegant wedding website with interactive features and modern design.

## Development Principles

### 🚀 Performance First
- **Lightning-fast performance is our TOP PRIORITY** in all development decisions
- Optimize all assets (images, scripts, styles) for minimal load times
- Implement lazy loading for images and components
- Use critical CSS inlining for above-the-fold content
- Minimize JavaScript bundle sizes and use code splitting
- Leverage browser caching and CDN strategies
- Target Core Web Vitals metrics:
  - Largest Contentful Paint (LCP): < 2.5s
  - First Input Delay (FID): < 100ms
  - Cumulative Layout Shift (CLS): < 0.1

### 📱 Mobile-First Development
- **ALWAYS design and develop mobile-first**, then scale up to larger screens
- Start with mobile viewport (320px) and progressively enhance
- Touch-friendly interfaces with minimum 44px tap targets
- Optimized for mobile network speeds (3G baseline)
- Responsive images with appropriate srcset and sizes
- Mobile-optimized animations (reduced motion for better performance)
- Test on real devices, not just browser emulation

## Technical Stack
- **Frontend Framework**: Vanilla JavaScript with Vite for build optimization
- **Styling**: CSS3 with mobile-first media queries
- **Fonts**: Google Fonts with font-display: swap for performance
- **Images**: WebP format with fallbacks, lazy loading, responsive sizing
- **Animation Library**: AOS (Animate On Scroll) with performance optimizations

## Key Features
- Interactive wedding timeline with smooth animations
- 3D flip venue cards for engagement
- Live RSVP countdown timer
- Photo gallery with optimized image loading
- Responsive navigation with mobile hamburger menu
- Wedding ceremony and reception details
- Guest information and dress code

## Design System
- **Primary Color**: #4d0013 (Deep Burgundy)
- **Accent Color**: #d4af37 (Royal Gold)
- **Typography**:
  - Headlines: Playfair Display (loaded selectively)
  - Body: Cormorant Garamond
  - Script: Great Vibes, Allura (loaded only where needed)

## Performance Optimizations Implemented
- Critical CSS inlined in HTML head
- Async loading for non-critical styles
- Deferred JavaScript loading
- Image lazy loading with Intersection Observer
- Webfont optimization with preconnect and font-display
- Minified CSS and JavaScript in production
- Gzip/Brotli compression ready

## Mobile Optimizations
- Viewport meta tag properly configured
- Touch gestures for gallery and interactive elements
- Simplified animations on mobile for better performance
- Responsive images serving appropriate sizes
- Mobile-specific navigation patterns
- Reduced font sizes and spacing for mobile readability

## Development Guidelines
1. **Before any new feature**: Consider mobile experience and performance impact first
2. **Test on real devices**: iPhone SE (smallest), standard Android, and tablets
3. **Network throttling**: Always test on slow 3G to ensure acceptable performance
4. **Bundle size budget**: Keep JS under 100KB, CSS under 50KB (gzipped)
5. **Image optimization**: No image over 200KB, use WebP, implement lazy loading
6. **Animation performance**: Use CSS transforms only, avoid layout triggers
7. **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support

## File Structure
```
wedding-website/
├── assets/
│   └── images/         # Optimized images (WebP + fallbacks)
├── css/
│   ├── main.css        # Core styles (mobile-first)
│   ├── responsive.css  # Media queries and breakpoints
│   ├── animations.css  # Performance-optimized animations
│   └── details-redesign.css # Feature-specific styles
├── js/
│   ├── main.js         # Core functionality (minimized)
│   └── details-interactive.js # Interactive components
├── index.html          # Main page with critical CSS
└── gallery.html        # Photo gallery with lazy loading
```

## Build & Deployment
- Use Vite for development and production builds
- Enable compression (gzip/brotli) on server
- Implement browser caching headers
- Use CDN for static assets
- Progressive Web App capabilities for offline access

## Testing Checklist
- [ ] Mobile devices (iOS Safari, Chrome Android)
- [ ] Slow network conditions (3G throttling)
- [ ] Lighthouse score > 90 for all metrics
- [ ] Touch interactions work smoothly
- [ ] Images load progressively without layout shift
- [ ] Fonts load without FOIT/FOUT issues
- [ ] Animations run at 60fps on mobile

## Notes
- Wedding date: December 5, 2025
- RSVP deadline: November 15, 2025
- Venue 1: Holy Rosary Parish Church (Ceremony)
- Venue 2: Grand Palazzo Royale (Reception)
- Target audience: Primarily mobile users (70%+ expected mobile traffic)
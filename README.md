# Royal Wedding Website 👑

An elegant, high-performance single-page wedding website featuring royal aesthetics, sophisticated animations, and mobile-first design.

## ✨ Features

- **Royal Elegance**: Deep burgundy (#4d0013) and royal gold (#D4AF37) color palette
- **Smooth Animations**: GSAP-powered parallax scrolling and scroll-triggered animations
- **Mobile-First**: Responsive design optimized for all devices
- **Performance Optimized**: Lazy loading, WebP images, and efficient animations
- **Accessibility**: WCAG AA compliant with screen reader support
- **Interactive Gallery**: Lightbox with keyboard/touch navigation
- **Advanced Form**: Real-time validation and elegant animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd wedding-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
wedding-website/
├── index.html              # Main HTML file
├── main.js                 # Main JavaScript entry point
├── css/
│   ├── main.css            # Core styles and layout
│   ├── animations.css      # Animation definitions
│   └── responsive.css      # Mobile-first responsive styles
├── js/
│   ├── gallery.js          # Advanced gallery functionality
│   └── form.js             # Form validation and handling
├── assets/
│   ├── images/             # Image assets
│   ├── videos/             # Video assets
│   └── fonts/              # Font files
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

### Colors

Update the CSS custom properties in `css/main.css`:

```css
:root {
    --primary: #4d0013;     /* Deep Burgundy */
    --accent: #D4AF37;      /* Royal Gold */
    --white: #FFFFFF;       /* White */
}
```

### Typography

The website uses Google Fonts for a royal typography hierarchy:
- **Body Text**: Cormorant Garamond (elegant, readable serif with royal heritage)
- **Headers**: Playfair Display (sophisticated serif for titles and headings)
- **Formal Text**: Cinzel (classical Roman capitals for dates and navigation)
- **Royal Scripts**:
  - **Allura** (main couple names - ultra elegant flowing script)
  - **Great Vibes** (navigation and subtitles - classic cursive elegance)
  - **Alex Brush** (monogram - artistic hand-lettered style)

### Content

1. **Hero Section**: Update couple names and date in `index.html`
2. **Love Story**: Modify timeline items in the story section
3. **Event Details**: Update ceremony and reception information
4. **Gallery**: Replace image URLs with your photos
5. **Contact**: Update footer contact information

### Images

Replace the Unsplash placeholder images with your own:
- Use WebP format for better performance
- Optimize images (recommended: 800px width for gallery, 2070px for hero)
- Add proper alt text for accessibility

## 🔧 Technical Details

### Performance Features

- **Lazy Loading**: Images load as they come into view
- **GSAP Animations**: Hardware-accelerated, smooth animations
- **Critical CSS**: Inlined for faster initial render
- **Preloading**: Critical resources loaded first
- **Responsive Images**: Optimized for different screen sizes

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Accessibility Features

- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader announcements
- High contrast mode compatibility
- Reduced motion support

## 📱 Mobile Features

- Touch-friendly navigation (44px minimum tap targets)
- Swipe gestures for gallery
- Optimized animations for mobile performance
- Responsive typography with `clamp()`
- Safe area support for devices with notches

## 🎭 Animation Details

### Scroll Animations

- **Parallax Backgrounds**: Different scroll speeds for depth
- **Fade-in Sections**: Content appears as you scroll
- **Stagger Effects**: Elements animate in sequence
- **Timeline Items**: Alternate left/right animations

### Interaction Animations

- **Hover Effects**: Subtle scale and shadow changes
- **Button Ripples**: Material Design-inspired feedback
- **Form Validation**: Real-time visual feedback
- **Loading States**: Smooth transitions and indicators

### Performance Considerations

- `will-change` property used sparingly
- Animations optimized for 60fps
- `transform` and `opacity` preferred over layout properties
- Reduced animations on low-end devices

## 📋 Form Configuration

The RSVP form includes:

- **Real-time Validation**: Immediate feedback as users type
- **Accessibility**: Screen reader announcements and ARIA attributes
- **Custom Styling**: Floating labels and smooth animations
- **Error Handling**: Clear, helpful error messages

### Form Submission

Currently configured for demo purposes. To connect to a real backend:

1. Update the `submitUrl` in `js/form.js`
2. Implement server-side validation
3. Add CSRF protection if needed
4. Configure email notifications

## 🔍 SEO & Analytics

### Meta Tags

- Open Graph tags for social sharing
- Structured data for events
- Optimized title and description

### Analytics Setup

Add your analytics code to track:
- Page views
- Form submissions
- User interactions
- Performance metrics

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linting (if configured)

### Code Style

- Use modern ES6+ features
- Follow semantic HTML structure
- Maintain consistent CSS naming (BEM-like)
- Add comments for complex functionality

## 🚀 Deployment

### Static Hosting

Perfect for platforms like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Build Optimization

The production build includes:
- Minified CSS and JavaScript
- Optimized images
- Compressed assets
- Cache-friendly file names

## 🎉 Credits

- **Fonts**: Google Fonts (Playfair Display, Cormorant Garamond, Cinzel, Allura, Great Vibes, Alex Brush)
- **Images**: Unsplash (placeholder images)
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Custom SVG icons

## 📝 License

This project is available for personal use. Please ensure you have proper licenses for any images, fonts, or assets you use in your own implementation.

## 🤝 Support

For questions or issues:
1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Verify image URLs are accessible
4. Test on multiple devices and browsers

---

**Made with ❤️ for your special day**
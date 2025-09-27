import { defineConfig } from 'vite';

export default defineConfig({
  // Build optimization
  build: {
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ['gsap'],
        }
      }
    },
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },

  // Development server configuration
  server: {
    port: 5173,
    open: true, // Automatically open browser
    cors: true
  },

  // CSS optimization
  css: {
    devSourcemap: true
  },

  // Plugin configuration for future extensibility
  plugins: [],

  // Asset handling
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],

  // Public directory
  publicDir: 'public',

  // Base URL (adjust for subdirectory deployments)
  base: '/',

  // Environment variables
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
});
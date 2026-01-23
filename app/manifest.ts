
import { MetadataRoute } from 'next';

/**
 * Web App Manifest Configuration for AMP Vending
 * 
 * This file generates the web app manifest that enables Progressive Web App (PWA) features
 * for the AMP Vending website. The manifest provides metadata about the web application
 * and defines how it should behave when installed on a user's device.
 * 
 * Features:
 * - PWA installation support
 * - Custom app icons for different platforms
 * - Branded theme colors matching AMP Vending design
 * - Standalone app display mode
 * - Optimized for mobile and desktop installation
 */

/**
 * Default export function that returns the web app manifest
 * Next.js automatically serves this at /manifest.webmanifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    // Basic App Information
    name: 'AMP Vending - Premium Workplace Vending Solutions',
    short_name: 'AMP Vending',
    description: 'Zero-cost installation, maintenance-free vending machines with touchscreen technology for enhanced workplace satisfaction.',
    
    // PWA Configuration
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    
    // Theme and Color Configuration
    // Using AMP Vending's brand colors for consistent experience
    theme_color: '#000000',        // Primary black background
    background_color: '#000000',   // Black background for app loading
    
    // App Icons for Different Platforms and Sizes
    // Using existing logo as fallback until proper PWA icons are created
    icons: [
      {
        src: '/images/logo/AMP_logo.webp',
        sizes: '192x192',
        type: 'image/webp',
        purpose: 'any',
      },
      {
        src: '/images/logo/AMP_logo.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'any',
      },
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
        purpose: 'any',
      },
    ],
    
    // App Scope and Navigation
    scope: '/',
    
    // App Categories
    categories: ['business', 'productivity', 'food'],
    
    // Language and Internationalization
    lang: 'en-US',
    dir: 'ltr',
    
    // Platform-specific Features
    prefer_related_applications: false,
    
    // Shortcuts for Quick Actions (appears in app launcher context menu)
    // Note: Remove shortcut icons until proper icons are created
    shortcuts: [
      {
        name: 'Contact Us',
        short_name: 'Contact',
        description: 'Get in touch for zero-cost vending machine installation',
        url: '/contact',
      },
      {
        name: 'View Machines',
        short_name: 'Machines',
        description: 'Browse our premium vending machine collection',
        url: '/vending-machines',
      },
      {
        name: 'Share Feedback',
        short_name: 'Feedback',
        description: 'Share your experience with our vending solutions',
        url: '/feedback',
      },
    ],
    
    // Protocol Handlers (if needed for future features)
    protocol_handlers: [
      {
        protocol: 'mailto',
        url: '/contact?email=%s',
      },
    ],
  };
}
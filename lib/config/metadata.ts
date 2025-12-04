/**
 * Metadata Configuration - Centralized SEO Settings
 *
 * This file provides all metadata configuration for the application,
 * using centralized business data for consistency and maintainability.
 */

import type { Metadata } from "next";
import { AMP_VENDING_BUSINESS_INFO } from '@/lib/data/businessData';

/**
 * Root Layout Metadata Configuration
 */
export const rootMetadata: Metadata = {
  // Basic SEO metadata
  title: {
    default: "AMP Vending | Premium Commercial Vending Machines | Central California",
    template: "%s | AMP Vending - Commercial Vending Solutions"
  },

  // Optimized description for Google search results (under 160 characters)
  description: `Professional commercial vending machines with 21.5" touchscreen technology. Free installation & maintenance in Central California. Call ${AMP_VENDING_BUSINESS_INFO.contact.phone}.`,

  // Enhanced keywords targeting local and commercial searches
  keywords: [
    "commercial vending machines Central California",
    "office vending machines Modesto CA",
    "free vending machines Modesto CA",
    "touchscreen vending machines",
    "workplace vending solutions",
    "refrigerated vending machines",
    "professional vending installation",
    "business vending service",
    "employee break room solutions",
    "AMP Vending Modesto",
    "AMP Vending Modesto ca",
    "AMP Vending Machines",
    "vending machines",
    "vending machines Stockton Fresno",
    "vending machines near me",
    "vending machine supplier",
    "vending machine provider",
    "vending machine vendor",
    "contactless payment vending",
    "maintenance-free vending machines"
  ].join(", "),

  // Author and publisher information
  authors: [{
    name: AMP_VENDING_BUSINESS_INFO.name,
    url: AMP_VENDING_BUSINESS_INFO.contact.website
  }],
  creator: AMP_VENDING_BUSINESS_INFO.name,
  publisher: AMP_VENDING_BUSINESS_INFO.name,

  // Application metadata
  applicationName: AMP_VENDING_BUSINESS_INFO.name,
  generator: "Next.js",

  // Enhanced robots directive for maximum indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Language and locale settings
  alternates: {
    canonical: AMP_VENDING_BUSINESS_INFO.contact.website,
    languages: {
      'en-US': AMP_VENDING_BUSINESS_INFO.contact.website,
    },
  },

  // Enhanced Open Graph metadata for social sharing and Google discovery
  openGraph: {
    type: "website",
    locale: "en_US",
    url: AMP_VENDING_BUSINESS_INFO.contact.website,
    siteName: AMP_VENDING_BUSINESS_INFO.name,
    title: "Premium Commercial Vending Machines | AMP Vending | Central California",
    description: "Professional vending machines with touchscreen technology for enhanced workplace satisfaction. Free installation & maintenance throughout Central California.",
    images: [
      {
        url: `${AMP_VENDING_BUSINESS_INFO.contact.website}/images/og/amp-vending-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "AMP Vending premium workplace vending machines with touchscreen technology",
        type: "image/jpeg",
      },
      {
        url: `${AMP_VENDING_BUSINESS_INFO.contact.website}/images/machines/amp-premium-touchscreen-vending-machine.png`,
        width: 800,
        height: 600,
        alt: "Premium touchscreen vending machine by AMP Vending",
        type: "image/png",
      },
    ],
  },

  // Enhanced Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@ampvending",
    creator: "@ampvending",
    title: `Premium Commercial Vending Machines | ${AMP_VENDING_BUSINESS_INFO.name}`,
    description: "Professional vending machines with touchscreen technology for enhanced workplace satisfaction in Central California.",
    images: {
      url: `${AMP_VENDING_BUSINESS_INFO.contact.website}/images/og/amp-vending-hero.jpg`,
      alt: "AMP Vending premium workplace vending machines",
    },
  },

  // App links for mobile optimization
  appLinks: {
    web: {
      url: AMP_VENDING_BUSINESS_INFO.contact.website,
      should_fallback: true,
    },
  },

  // Additional metadata for indexing optimization
  other: {
    // Referrer policy for security and analytics
    'referrer': 'same-origin',

    // Geographic targeting
    'geo.region': 'US-CA',
    'geo.placename': `${AMP_VENDING_BUSINESS_INFO.address.city}, California`,
    'geo.position': `${AMP_VENDING_BUSINESS_INFO.address.coordinates.latitude};${AMP_VENDING_BUSINESS_INFO.address.coordinates.longitude}`,
    'ICBM': `${AMP_VENDING_BUSINESS_INFO.address.coordinates.latitude}, ${AMP_VENDING_BUSINESS_INFO.address.coordinates.longitude}`,

    // Business information
    'coverage': 'Northern California',
    'distribution': 'global',
    'rating': 'general',
    'revisit-after': '7 days',

    // Contact information
    'contact': AMP_VENDING_BUSINESS_INFO.contact.email,
    'reply-to': AMP_VENDING_BUSINESS_INFO.contact.email,

    // Copyright and ownership
    'copyright': `© ${new Date().getFullYear()} ${AMP_VENDING_BUSINESS_INFO.name}. All rights reserved.`,
    'owner': AMP_VENDING_BUSINESS_INFO.name,

    // Mobile optimization
    'format-detection': 'telephone=yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': AMP_VENDING_BUSINESS_INFO.name,

    // Theme colors for browser integration
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'msapplication-navbutton-color': '#000000',

    // Structured data markup indicators
    'structured-data': 'LocalBusiness, WebSite, Organization',

    // Content categorization
    'category': 'Business, Commercial Equipment, Vending Machines',
    'classification': 'Commercial Vending Solutions',

    // Performance and caching hints
    'cache-control': 'public, max-age=3600',
    'expires': new Date(Date.now() + 3600000).toUTCString(),
  },

  // Icons and manifest
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#FD5A1E',
      },
    ],
  },

  // Web app manifest
  manifest: '/manifest.webmanifest',
};

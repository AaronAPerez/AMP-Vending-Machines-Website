/**
 * Metadata Configuration - Centralized SEO Settings
 *
 * This file provides Next.js metadata configuration for the application.
 * All SEO constants are imported from seoData.ts (single source of truth).
 */

import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/lib/data/seoData";

/**
 * Root Layout Metadata Configuration
 * Imports SEO data from seoData.ts to avoid duplication
 */
export const rootMetadata: Metadata = {
  // Title configuration - uses SEO_CONSTANTS
  title: {
    default: SEO_CONSTANTS.SITE_TITLE,
    template: `%s | ${SEO_CONSTANTS.SITE_NAME} - Central Valley, CA`,
  },

  // Description from single source of truth
  description: SEO_CONSTANTS.SITE_DESCRIPTION,

  // Keywords from PRIMARY_KEYWORDS array in seoData.ts
  keywords: SEO_CONSTANTS.PRIMARY_KEYWORDS.join(", "),

  // Author and publisher information
  authors: [
    {
      name: SEO_CONSTANTS.BUSINESS_NAME,
      url: SEO_CONSTANTS.BASE_URL,
    },
  ],
  creator: SEO_CONSTANTS.BUSINESS_NAME,
  publisher: SEO_CONSTANTS.BUSINESS_NAME,

  // Application metadata
  applicationName: SEO_CONSTANTS.SITE_NAME,
  generator: "Next.js",

  // Enhanced robots directive for maximum indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Language and locale settings
  alternates: {
    canonical: SEO_CONSTANTS.BASE_URL,
    languages: {
      "en-US": SEO_CONSTANTS.BASE_URL,
    },
  },

  // Enhanced Open Graph metadata for social sharing and Google discovery
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SEO_CONSTANTS.BASE_URL,
    siteName: SEO_CONSTANTS.SITE_NAME,
    title: SEO_CONSTANTS.SITE_TITLE,
    description: SEO_CONSTANTS.SITE_DESCRIPTION,
    images: [
      {
        url: `${SEO_CONSTANTS.BASE_URL}/images/promos/amp-vending-promo-modesto.webp`,
        width: 1200,
        height: 630,
        alt: "Free vending machine placement for businesses in Modesto and Central California",
        type: "image/webp",
      },
      {
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/amp-vending-logo-og.webp`,
        width: 1200,
        height: 630,
        alt: "AMP Vending - snack and drink vending machines with cashless payment",
        type: "image/webp",
      },
      {
        url: `${SEO_CONSTANTS.BASE_URL}/images/machines/amp-premium-touchscreen-vending-machine.webp`,
        width: 800,
        height: 600,
        alt: "Premium touchscreen vending machine with tap-to-pay technology",
        type: "image/webp",
      },
    ],
  },

  // Enhanced Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@ampvending",
    creator: "@ampvending",
    title: SEO_CONSTANTS.SITE_TITLE,
    description: SEO_CONSTANTS.SITE_DESCRIPTION,
    images: {
      url: `${SEO_CONSTANTS.BASE_URL}/images/promos/amp-vending-promo-modesto.webp`,
      alt: "Free vending machine placement for offices and workplaces in Central California",
    },
  },

  // App links for mobile optimization
  appLinks: {
    web: {
      url: SEO_CONSTANTS.BASE_URL,
      should_fallback: true,
    },
  },

  // Additional metadata for indexing optimization
  other: {
    // Referrer policy for security and analytics
    referrer: "same-origin",

    // Geographic targeting - uses SEO_CONSTANTS.ADDRESS
    "geo.region": `US-${SEO_CONSTANTS.ADDRESS.STATE}`,
    "geo.placename": `${SEO_CONSTANTS.ADDRESS.CITY}, ${SEO_CONSTANTS.ADDRESS.COUNTY}, ${SEO_CONSTANTS.ADDRESS.STATE_FULL}`,
    "geo.position": `${SEO_CONSTANTS.ADDRESS.COORDINATES.LAT};${SEO_CONSTANTS.ADDRESS.COORDINATES.LNG}`,
    ICBM: `${SEO_CONSTANTS.ADDRESS.COORDINATES.LAT}, ${SEO_CONSTANTS.ADDRESS.COORDINATES.LNG}`,

    // Business information
    coverage: SEO_CONSTANTS.SERVICE_AREA,
    distribution: "global",
    rating: "general",
    "revisit-after": "7 days",

    // Contact information
    contact: SEO_CONSTANTS.EMAIL,
    "reply-to": SEO_CONSTANTS.EMAIL,

    // Copyright and ownership
    copyright: `© ${new Date().getFullYear()} ${SEO_CONSTANTS.BUSINESS_LEGAL_NAME}. All rights reserved.`,
    owner: SEO_CONSTANTS.BUSINESS_NAME,

    // Mobile optimization
    "format-detection": "telephone=yes",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": SEO_CONSTANTS.SITE_NAME,

    // Theme colors for browser integration
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
    "msapplication-navbutton-color": "#000000",

    // Structured data markup indicators
    "structured-data": "LocalBusiness, WebSite, Organization",

    // Content categorization
    category: "Business, Commercial Equipment, Vending Machines",
    classification: "Commercial Vending Solutions",

    // Performance and caching hints
    "cache-control": "public, max-age=3600",
    expires: new Date(Date.now() + 3600000).toUTCString(),
  },

  // Icons and manifest - optimized for Google Search Results
  icons: {
    icon: [
      // SVG favicon - preferred by Google for search results
      { url: "/icon.svg", type: "image/svg+xml" },
      // PNG fallbacks for browsers that don't support SVG favicons
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      // ICO fallback for legacy browsers
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#FD5A1E",
      },
    ],
  },

  // Web app manifest for PWA capabilities
  manifest: "/manifest.webmanifest",
};

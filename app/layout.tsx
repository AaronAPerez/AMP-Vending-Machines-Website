/**
 * Enhanced Root Layout with Google Indexing Optimization
 * 
 * Build Process Documentation:
 * 1. Implements comprehensive SEO metadata for maximum Google visibility
 * 2. Addresses Google Search Console indexing requirements
 * 3. Includes proper structured data for business information
 * 4. Implements OpenGraph and Twitter Card optimization
 * 5. Adds technical SEO enhancements for crawling efficiency
 * 6. Includes performance optimizations for Core Web Vitals
 * 7. Supports multi-search engine optimization beyond Google
 */

import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Toaster } from "sonner";


// Optimized font loading for performance with adjustFontFallback
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true, // Reduces CLS by matching fallback font metrics
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

/**
 * Enhanced metadata configuration optimized for Google indexing
 * Addresses common Google Search Console issues and indexing requirements
 */
export const metadata: Metadata = {
  // Basic SEO metadata
  title: {
    default: "AMP Vending | Premium Commercial Vending Machines | Central California",
    template: "%s | AMP Vending - Commercial Vending Solutions"
  },

  // Optimized description for Google search results (under 160 characters)
  description: "Professional commercial vending machines with 21.5\" touchscreen technology. Free installation & maintenance in Central California. Call (209) 403-5450.",

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
  authors: [{ name: "AMP Vending", url: "https://www.ampvendingmachines.com" }],
  creator: "AMP Vending",
  publisher: "AMP Vending",

  // Application metadata
  applicationName: "AMP Vending",
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
    canonical: "https://www.ampvendingmachines.com",
    languages: {
      'en-US': 'https://www.ampvendingmachines.com',
    },
  },

  // Enhanced Open Graph metadata for social sharing and Google discovery
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ampvendingmachines.com",
    siteName: "AMP Vending",
    title: "Premium Commercial Vending Machines | AMP Vending | Central California",
    description: "Professional vending machines with touchscreen technology for enhanced workplace satisfaction. Free installation & maintenance throughout Central California.",
    images: [
      {
        url: "https://www.ampvendingmachines.com/images/og/amp-vending-hero.jpg",
        width: 1200,
        height: 630,
        alt: "AMP Vending premium workplace vending machines with touchscreen technology",
        type: "image/jpeg",
      },
      {
        url: "https://www.ampvendingmachines.com/images/machines/amp-premium-touchscreen-vending-machine.png",
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
    site: "@ampvending", // Add when Twitter account is created
    creator: "@ampvending",
    title: "Premium Commercial Vending Machines | AMP Vending",
    description: "Professional vending machines with touchscreen technology for enhanced workplace satisfaction in Central California.",
    images: {
      url: "https://www.ampvendingmachines.com/images/og/amp-vending-hero.jpg",
      alt: "AMP Vending premium workplace vending machines",
    },
  },

  // App links for mobile optimization
  appLinks: {
    web: {
      url: "https://www.ampvendingmachines.com",
      should_fallback: true,
    },
  },

  // Additional metadata for indexing optimization
  other: {
    // Referrer policy for security and analytics
    'referrer': 'same-origin',

    // Geographic targeting
    'geo.region': 'US-CA',
    'geo.placename': 'Modesto, California',
    'geo.position': '37.6390972;-120.9968782',
    'ICBM': '37.6390972, -120.9968782',

    // Business information
    'coverage': 'Northern California',
    'distribution': 'global',
    'rating': 'general',
    'revisit-after': '7 days',

    // Contact information
    'contact': 'ampdesignandconsulting@gmail.com',
    'reply-to': 'ampdesignandconsulting@gmail.com',

    // Copyright and ownership
    'copyright': `© ${new Date().getFullYear()} AMP Vending. All rights reserved.`,
    'owner': 'AMP Vending',

    // Mobile optimization
    'format-detection': 'telephone=yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'AMP Vending',

    // Theme colors for browser integration
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'msapplication-navbutton-color': '#000000',

    // Search engine verification codes (add when available)
    'google-site-verification': 'GOOGLE_VERIFICATION_CODE',
    // 'google-site-verification': 'GOOGLE_VERIFICATION_CODE',
    // 'msvalidate.01': 'BING_VERIFICATION_CODE',
    // 'yandex-verification': 'YANDEX_VERIFICATION_CODE',

    // Structured data markup indicators
    'structured-data': 'LocalBusiness, WebSite, Organization',

    // Content categorization
    'category': 'Business, Commercial Equipment, Vending Machines',
    'classification': 'Commercial Vending Solutions',

    // Performance and caching hints
    'cache-control': 'public, max-age=3600',
    'expires': new Date(Date.now() + 3600000).toUTCString(),
  },

  // Verification codes for search engines (add when configured)
  verification: {
    // google: 'GOOGLE_VERIFICATION_CODE',
    // yandex: 'YANDEX_VERIFICATION_CODE',
    // yahoo: 'YAHOO_VERIFICATION_CODE',
    // other: 'OTHER_VERIFICATION_CODE',
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

/**
 * Enhanced RootLayout component with comprehensive SEO optimization
 * Implements Google indexing best practices and technical SEO enhancements
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        {/* Inline critical CSS for immediate render */}
        <style dangerouslySetInnerHTML={{__html: `
          body{background:#000;color:#fff;font-family:var(--font-inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          *{box-sizing:border-box;margin:0;padding:0}
          #hero-heading{font-display:swap;text-rendering:optimizeSpeed}
        `}} />

        {/* Critical resource preloading for performance */}
        <link
          rel="preload"
          href="/_next/static/media/e4af272ccee01ff0-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preconnect to critical external domains for faster resource loading */}
        <link rel="preconnect" href="https://vercel-analytics.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Enhanced mobile optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="AMP Vending" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=yes" />

        {/* Theme colors for browser integration */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />

        {/* Structured data for organization (critical for Google Business Profile) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.ampvendingmachines.com/#organization",
              name: "AMP Vending",
              alternateName: "AMP Design and Consulting",
              url: "https://www.ampvendingmachines.com",
              logo: "https://www.ampvendingmachines.com/images/logo/AMP-Vending-Logo.jpg",
              image: [
                "https://www.ampvendingmachines.com/images/machines/amp-premium-touchscreen-vending-machine.png",
                "https://www.ampvendingmachines.com/images/machines/amp-refrigerated-vending-machine.png"
              ],
              description: "Professional commercial vending machines with touchscreen technology and comprehensive maintenance service for businesses throughout Central California.",
              telephone: "+12094035450",
              email: "ampdesignandconsulting@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "4120 Dale Rd ste j8 1005",
                addressLocality: "Modesto",
                addressRegion: "CA",
                postalCode: "95354",
                addressCountry: "US"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.6390972,
                longitude: -120.9968782
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "20:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday", "Sunday"],
                  opens: "08:00",
                  closes: "20:00"
                }
              ],
              areaServed: [
                {
                  "@type": "City",
                  name: "Modesto, CA"
                },
                {
                  "@type": "City",
                  name: "Manteca, CA"
                },
                {
                  "@type": "City",
                  name: "Lathrop, CA"
                },
                {
                  "@type": "City",
                  name: "Stockton, CA"
                },
                {
                  "@type": "City",
                  name: "Lodi, CA"
                },
                {
                  "@type": "City",
                  name: "Fresno, CA"
                },
                {
                  "@type": "City",
                  name: "Merced, CA"
                },
                {
                  "@type": "City",
                  name: "Turlock, CA"
                }
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 37.6390972,
                  longitude: -120.9968782
                },
                geoRadius: "80000"
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Commercial Vending Machine Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Commercial Vending Machine Installation",
                      description: "Professional installation of touchscreen vending machines"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Vending Machine Maintenance",
                      description: "Comprehensive maintenance and restocking service"
                    }
                  }
                ]
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "47",
                bestRating: "5",
                worstRating: "1"
              },
              priceRange: "$",
              paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Mobile Payment"],
              currenciesAccepted: "USD",
              keywords: "commercial vending machines, office vending, touchscreen vending, Central California, Modesto, workplace solutions",
              slogan: "Premium Vending Solutions for Modern Workplaces",
              foundingDate: "2019",
              numberOfEmployees: "5-10",
              knowsAbout: [
                "Commercial Vending Machines",
                "Office Break Room Solutions",
                "Touchscreen Vending Technology",
                "Workplace Refreshment Services",
                "Professional Installation",
                "Maintenance Services"
              ],
              memberOf: {
                "@type": "Organization",
                name: "National Automatic Merchandising Association"
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+12094035450",
                  contactType: "customer service",
                  email: "ampdesignandconsulting@gmail.com",
                  areaServed: "US-CA",
                  availableLanguage: "English",
                },
                {
                  "@type": "ContactPoint",
                  email: "ampdesignandconsulting@gmail.com",
                  areaServed: "US-CA",
                  availableLanguage: "English"
                }
              ],
              sameAs: [
                "https://www.ampvendingmachines.com"
                // Add social media profiles when available
              ]
            })
          }}
        />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.ampvendingmachines.com/#website",
              url: "https://www.ampvendingmachines.com",
              name: "AMP Vending",
              description: "Professional commercial vending machines with touchscreen technology for Central California businesses",
              publisher: {
                "@id": "https://www.ampvendingmachines.com/#organization"
              },
              inLanguage: "en-US",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.ampvendingmachines.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Performance optimization hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* Additional SEO enhancements */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />

        {/* Canonical URL (will be overridden by page-specific canonical) */}
        <link rel="canonical" href="https://www.ampvendingmachines.com" />

        {/* Alternate language versions (add when implementing i18n) */}
        <link rel="alternate" hrefLang="en-US" href="https://www.ampvendingmachines.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.ampvendingmachines.com" />
      </head>



      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`}>

        {/* Google Analytics*/}
        <GoogleAnalytics />

        {/* Toast notifications with proper z-index */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              zIndex: 9999,
            },
            className: 'z-[9999]',
          }}
        />

        {/* Enhanced skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-orange-600 focus:text-white focus:top-4 focus:left-4 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          tabIndex={0}
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <div className="relative z-40">
          <ResizableNavbar />
        </div>

        {/* Main content area */}
        <main
          id="main-content"
          className="relative z-10 bg-gradient-to-b from-black via-black to-gray-900 min-h-screen mt-8 md:mt-4"
          role="main"
          aria-label="Main content"
        >
          <StyledComponentsRegistry>
            {children}
            <SpeedInsights />
            <Analytics />
            <WebVitalsReporter/>
          </StyledComponentsRegistry>
        </main>

        {/* Feedback widget */}
        <aside aria-label="Feedback widget">
          <FeedbackWidget />
        </aside>

        {/* Footer */}
        <footer role="contentinfo" aria-label="Site footer">
          <Footer />
        </footer>

        {/* Schema.org breadcrumb structure (will be populated by pages) */}
        <script
          type="application/ld+json"
          id="breadcrumb-schema"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.ampvendingmachines.com"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}

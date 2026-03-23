/**
 * Service Areas Index Page
 *
 * Main landing page for all service areas with SEO optimization.
 * Displays counties served, featured cities, and interactive map.
 *
 * Build Process:
 * 1. Server component for SEO metadata and structured data
 * 2. Imports client component for interactivity
 * 3. Optimized for local SEO targeting Central Valley, CA
 */

import { Metadata } from 'next';
import ServiceAreasPageClient from '@/components/service-areas/ServiceAreasPageClient';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';

/**
 * SEO Metadata for Service Areas page
 */
export const metadata: Metadata = {
  title: 'Service Areas | Vending Machines in Central Valley CA | AMP Vending',
  description: 'AMP Vending serves Stanislaus County, San Joaquin County, and the Central Valley. Free vending machine installation in Modesto, Stockton, Turlock, Tracy, Manteca, and 25+ cities.',
  keywords: [
    'vending machines Central Valley',
    'vending service Stanislaus County',
    'vending machines San Joaquin County',
    'Modesto vending machines',
    'Stockton vending service',
    'free vending machine installation',
    'commercial vending California',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/service-areas`,
  },
  openGraph: {
    title: 'Service Areas | AMP Vending - Central Valley CA',
    description: 'Free vending machine services throughout the Central Valley. Serving Modesto, Stockton, Turlock, and 25+ cities in Stanislaus & San Joaquin Counties.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/service-areas`,
    siteName: 'AMP Vending',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/central-california-map.webp',
        width: 1200,
        height: 630,
        alt: 'AMP Vending Service Area Map - Central Valley California',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Areas | AMP Vending',
    description: 'Free vending machine services in Modesto, Stockton, and the Central Valley.',
  },
};

/**
 * Generate structured data for service area coverage
 */
function generateStructuredData() {
  const business = AMP_VENDING_BUSINESS_INFO;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description,
    "url": `${business.contact.website}/service-areas`,
    "telephone": business.contact.phone,
    "email": business.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${business.address.streetAddress} ${business.address.suite || ''}`,
      "addressLocality": business.address.city,
      "addressRegion": business.address.state,
      "postalCode": business.address.zipCode,
      "addressCountry": business.address.country,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": business.address.coordinates.latitude,
      "longitude": business.address.coordinates.longitude,
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Stanislaus County",
        "containedInPlace": {
          "@type": "State",
          "name": "California"
        }
      },
      {
        "@type": "AdministrativeArea",
        "name": "San Joaquin County",
        "containedInPlace": {
          "@type": "State",
          "name": "California"
        }
      },
      // Featured cities
      { "@type": "City", "name": "Modesto", "containedInPlace": { "@type": "State", "name": "California" } },
      { "@type": "City", "name": "Stockton", "containedInPlace": { "@type": "State", "name": "California" } },
      { "@type": "City", "name": "Turlock", "containedInPlace": { "@type": "State", "name": "California" } },
      { "@type": "City", "name": "Tracy", "containedInPlace": { "@type": "State", "name": "California" } },
      { "@type": "City", "name": "Manteca", "containedInPlace": { "@type": "State", "name": "California" } },
      { "@type": "City", "name": "Lodi", "containedInPlace": { "@type": "State", "name": "California" } },
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Vending Machine Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Vending Machine Installation",
            "description": "Professional installation at no cost to your business"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Regular Maintenance & Restocking",
            "description": "Weekly service to keep machines fully stocked and operational"
          }
        }
      ]
    },
    "priceRange": "Free",
  };
}

/**
 * Service Areas Page Component
 * Server component that renders SEO metadata and client-side interactive content
 */
export default function ServiceAreasPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      {/* Main Content */}
      <ServiceAreasPageClient />
    </>
  );
}

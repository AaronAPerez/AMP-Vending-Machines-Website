/**
 * Central Valley Regional Service Area Page
 *
 * Landing page for Central Valley California service area.
 * Optimized for local SEO targeting "vending machines Central Valley CA".
 *
 * Build Process:
 * 1. Server component for SEO metadata
 * 2. Comprehensive structured data for local business
 * 3. Featured cities and coverage overview
 */

import { Metadata } from 'next';
import CentralValleyPageClient from '@/components/service-areas/CentralValleyPageClient';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';

/**
 * SEO Metadata for Central Valley page
 */
export const metadata: Metadata = {
  title: 'Vending Machines Central Valley CA | Professional Installation | AMP Vending',
  description: 'Professional vending machine installation throughout the Central Valley. Serving Modesto, Stockton, Turlock, Tracy, Manteca, and all of Stanislaus & San Joaquin Counties. Full service solutions.',
  keywords: [
    'vending machines Central Valley CA',
    'professional vending machine installation Central California',
    'commercial vending Central Valley',
    'office vending machines Modesto',
    'workplace vending Stockton',
    'vending service Stanislaus County',
    'vending service San Joaquin County',
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/service-areas/central-valley`,
  },
  openGraph: {
    title: 'Vending Machines Central Valley CA | AMP Vending',
    description: 'Professional vending machine services for businesses throughout the Central Valley. Installation, maintenance, and restocking included.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/service-areas/central-valley`,
    siteName: 'AMP Vending',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/central-california-map.webp',
        width: 1200,
        height: 630,
        alt: 'AMP Vending - Central Valley California Service Area',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vending Machines Central Valley CA',
    description: 'Professional vending machine installation for Central Valley businesses.',
  },
};

/**
 * Generate comprehensive structured data for Central Valley region
 */
function generateStructuredData() {
  const business = AMP_VENDING_BUSINESS_INFO;

  return [
    // Local Business Schema
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${business.contact.website}/#organization`,
      "name": business.name,
      "description": "Professional commercial vending machine services for the Central Valley. Installation, maintenance, and restocking for offices, warehouses, schools, and businesses.",
      "url": `${business.contact.website}/service-areas/central-valley`,
      "telephone": business.contact.phone,
      "email": business.contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": `${business.address.streetAddress} ${business.address.suite || ''}`,
        "addressLocality": business.address.city,
        "addressRegion": business.address.state,
        "postalCode": business.address.zipCode,
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": business.address.coordinates.latitude,
        "longitude": business.address.coordinates.longitude,
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": business.address.coordinates.latitude,
          "longitude": business.address.coordinates.longitude,
        },
        "geoRadius": "96560" // 60 miles in meters
      },
      "priceRange": "Full-Service",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      },
    },
    // Service Schema
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Central Valley Vending Machine Services",
      "serviceType": "Commercial Vending Machine Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": business.name,
        "telephone": business.contact.phone,
      },
      "areaServed": [
        { "@type": "State", "name": "California" },
        { "@type": "AdministrativeArea", "name": "Central Valley" },
        { "@type": "AdministrativeArea", "name": "Stanislaus County" },
        { "@type": "AdministrativeArea", "name": "San Joaquin County" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Vending Machine Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Professional Vending Machine Installation",
              "description": "Professional installation of touchscreen vending machines"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Maintenance & Restocking",
              "description": "Weekly restocking and maintenance included with our service"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "24/7 Support",
              "description": "Round-the-clock customer support for all service needs"
            }
          }
        ]
      },
      "description": "Complete vending machine solutions for Central Valley businesses including professional installation, regular maintenance, product restocking, and 24/7 support."
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does your vending machine installation work in the Central Valley?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AMP Vending provides professional installation for qualifying locations throughout the Central Valley. We also handle all maintenance, repairs, and restocking as part of our full-service solution."
          }
        },
        {
          "@type": "Question",
          "name": "What cities in the Central Valley do you serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve all cities in Stanislaus and San Joaquin Counties, including Modesto, Stockton, Turlock, Tracy, Manteca, Lodi, Ceres, Riverbank, Oakdale, Patterson, Ripon, Lathrop, Escalon, and many more communities."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can you install a vending machine at my Central Valley business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For most locations in our primary service area, we can complete installation within 1-2 weeks of approval. Our headquarters in Modesto allows us to provide fast response times throughout the Central Valley."
          }
        }
      ]
    }
  ];
}

/**
 * Central Valley Page Component
 */
export default function CentralValleyPage() {
  const structuredData = generateStructuredData();

  return (
    <>
      {/* Multiple structured data schemas */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      {/* Main Content */}
      <CentralValleyPageClient />
    </>
  );
}

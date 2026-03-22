import { Metadata } from 'next';
import ServicesPageClient from '@/components/services/ServicesPageClient';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';

/**
 * Services Page
 *
 * Main services landing page optimized for Google Ads and SEO.
 * Showcases free vending machine services for businesses in Central Valley, CA.
 *
 * Target Keywords:
 * - Free vending machine service Central Valley
 * - Vending machine installation Modesto CA
 * - Office vending machines Stockton
 * - Commercial vending services Central California
 *
 * Page Structure:
 * 1. Hero - Free service value proposition
 * 2. How It Works - 3-step process
 * 3. Types of Service - Service offerings
 * 4. Ideal Locations - Target businesses
 * 5. Why Choose AMP - Differentiators
 * 6. Service Area - Coverage map
 * 7. Final CTA - Request a machine
 */

// SEO Metadata for the services page
export const metadata: Metadata = {
  title: 'Free Vending Machine Services | Central Valley CA | AMP Vending',
  description:
    'Get a free vending machine for your business in Central Valley, CA. AMP Vending provides installation, stocking, and maintenance at no cost. Serving Modesto, Stockton, Turlock & more.',
  keywords: [
    'free vending machine service',
    'vending machine installation Central Valley',
    'office vending machines Modesto',
    'commercial vending Stockton CA',
    'free snack machines for businesses',
    'vending machine company Central California',
    'workplace vending solutions',
    'no cost vending machines',
    'AMP Vending services'
  ],
  openGraph: {
    title: 'Free Vending Machine Services for Businesses | AMP Vending',
    description:
      'Premium vending machines installed, stocked, and maintained at no cost. Serving businesses throughout Central Valley, CA.',
    url: `${AMP_VENDING_BUSINESS_INFO.contact.website}/services`,
    siteName: AMP_VENDING_BUSINESS_INFO.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og/services-page.jpg',
        width: 1200,
        height: 630,
        alt: 'AMP Vending - Free Vending Machine Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Vending Machine Services | AMP Vending',
    description:
      'Get a free vending machine for your Central Valley business. No cost installation, stocking, or maintenance.',
    images: ['/images/og/services-page.jpg']
  },
  alternates: {
    canonical: `${AMP_VENDING_BUSINESS_INFO.contact.website}/services`
  },
  robots: {
    index: true,
    follow: true
  }
};

/**
 * Generate JSON-LD structured data for the services page
 * Helps search engines understand the page content
 */
function generateServicesStructuredData() {
  const business = AMP_VENDING_BUSINESS_INFO;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Service page schema
      {
        '@type': 'WebPage',
        '@id': `${business.contact.website}/services#webpage`,
        url: `${business.contact.website}/services`,
        name: 'Free Vending Machine Services | AMP Vending',
        description:
          'Professional vending machine services including free installation, stocking, and maintenance for businesses in Central Valley, CA.',
        isPartOf: {
          '@id': `${business.contact.website}/#website`
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': business.contact.website,
                name: 'Home'
              }
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': `${business.contact.website}/services`,
                name: 'Services'
              }
            }
          ]
        }
      },
      // Service offerings schema
      {
        '@type': 'Service',
        serviceType: 'Vending Machine Services',
        provider: {
          '@type': 'LocalBusiness',
          name: business.name,
          telephone: business.contact.phone,
          email: business.contact.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: business.address.streetAddress,
            addressLocality: business.address.city,
            addressRegion: business.address.state,
            postalCode: business.address.zipCode,
            addressCountry: business.address.country
          }
        },
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: business.address.coordinates.latitude,
            longitude: business.address.coordinates.longitude
          },
          geoRadius: `${business.serviceArea.radius} miles`
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Vending Machine Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Snack Vending Machines',
                description:
                  'Wide variety of snacks from healthy options to classic favorites with 50+ product selections.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Drink Vending Machines',
                description:
                  'Cold beverages including sodas, energy drinks, water, and juices with temperature control.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Combo Vending Machines',
                description:
                  'Combined snack and drink machines perfect for locations with limited space.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Free Installation',
                description:
                  'Professional installation at no cost to your business.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Free Maintenance',
                description:
                  'Regular maintenance and repairs included at no additional charge.'
              }
            }
          ]
        }
      },
      // FAQ schema for common questions
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is the vending machine service really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! AMP Vending provides vending machines, installation, stocking, and maintenance completely free of charge to qualifying businesses. We earn revenue from product sales.'
            }
          },
          {
            '@type': 'Question',
            name: 'What types of businesses qualify for free vending machines?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We serve offices, warehouses, schools, gyms, hotels, government buildings, and many other business types throughout Central Valley, CA. Contact us to check if your location qualifies.'
            }
          },
          {
            '@type': 'Question',
            name: 'What areas do you serve?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We serve businesses throughout Central Valley, California including Modesto, Stockton, Turlock, Manteca, Tracy, Merced, and surrounding communities in Stanislaus, San Joaquin, and Merced counties.'
            }
          }
        ]
      }
    ]
  };
}

export default function ServicesPage() {
  const structuredData = generateServicesStructuredData();

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main page content */}
      <ServicesPageClient />
    </>
  );
}

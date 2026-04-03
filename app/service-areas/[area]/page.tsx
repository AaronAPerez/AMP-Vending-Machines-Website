/**
 * Dynamic Service Area Page
 *
 * Individual city/area landing page for local SEO.
 * Uses comprehensive service areas data for accurate city information.
 *
 * Build Process:
 * 1. Static generation for all known service areas
 * 2. SEO optimized metadata per city
 * 3. Structured data for local business schema
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceAreaPageClient from './ServiceAreaPageClient';
import {
  ALL_SERVICE_CITIES,
  type ServiceCity,
} from '@/lib/data/comprehensiveServiceAreas';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';

/**
 * Extended city data with additional SEO information
 */
interface CityDetails extends ServiceCity {
  description: string;
  businesses: string;
  landmarks: string[];
}

/**
 * City-specific details for SEO and content
 */
const CITY_DETAILS: Record<string, Omit<CityDetails, keyof ServiceCity>> = {
  modesto: {
    description: 'Professional commercial vending machine services in Modesto, CA. Our headquarters location ensures fast response times and premium service for offices, schools, and businesses.',
    businesses: '5,000+',
    landmarks: ['Gallo Center for the Arts', 'Modesto Junior College', 'Vintage Faire Mall', 'Downtown Modesto'],
  },
  stockton: {
    description: 'Expert vending machine installation and maintenance in Stockton, CA. Providing workplace vending solutions with 24/7 support for the largest city in San Joaquin County.',
    businesses: '7,500+',
    landmarks: ['University of the Pacific', 'San Joaquin Delta College', 'Weberstown Mall', 'Stockton Arena'],
  },
  turlock: {
    description: 'Commercial vending machines for Turlock businesses. Professional consultation and installation with touchscreen technology and modern payment options.',
    businesses: '2,000+',
    landmarks: ['California State University Stanislaus', 'Downtown Turlock', 'Turlock Regional Sports Complex'],
  },
  tracy: {
    description: 'Workplace vending solutions in Tracy, CA. Modern touchscreen machines with contactless payment options for offices, warehouses, and businesses.',
    businesses: '2,800+',
    landmarks: ['Tracy Transit Center', 'West Valley Mall', 'Tracy Community Center', 'Tracy Historical Museum'],
  },
  manteca: {
    description: 'Commercial vending services in Manteca, CA. Reliable vending machine solutions for businesses of all sizes with professional installation and maintenance.',
    businesses: '2,300+',
    landmarks: ['Manteca Transit Center', 'Bass Pro Shops', 'Tidewater Bikeway', 'Big League Dreams'],
  },
  lodi: {
    description: 'Office vending machines in Lodi, CA. Complete installation, maintenance, and restocking services for local businesses in wine country.',
    businesses: '2,000+',
    landmarks: ['Lodi Wine & Visitor Center', 'Downtown Lodi', 'Lodi Lake Park', 'World of Wonders Science Museum'],
  },
  ceres: {
    description: 'Vending machine services in Ceres, CA. Providing local businesses with modern touchscreen vending solutions and professional maintenance.',
    businesses: '1,200+',
    landmarks: ['Ceres River Bluff Regional Park', 'Downtown Ceres', 'Whitmore Park'],
  },
  riverbank: {
    description: 'Professional vending machine installation in Riverbank, CA. Serving local offices and businesses with reliable vending solutions.',
    businesses: '600+',
    landmarks: ['Jacob Myers Park', 'Downtown Riverbank', 'Riverbank Community Center'],
  },
  oakdale: {
    description: 'Commercial vending machines for Oakdale, CA businesses. Expert installation and maintenance with modern payment technology.',
    businesses: '650+',
    landmarks: ['Oakdale Cowboy Museum', 'Woodward Reservoir', 'Downtown Oakdale'],
  },
  patterson: {
    description: 'Vending machine services in Patterson, CA. Complete workplace vending solutions with touchscreen technology and 24/7 support.',
    businesses: '550+',
    landmarks: ['Patterson Apricot Fiesta Grounds', 'Hammon Senior Center', 'Ward Park'],
  },
  ripon: {
    description: 'Commercial vending solutions for Ripon, CA. Modern machines with cashless payment for offices and local businesses.',
    businesses: '450+',
    landmarks: ['Ripon Almond Blossom Festival Grounds', 'Downtown Ripon', 'Mistlin Sports Park'],
  },
  lathrop: {
    description: 'Workplace vending machines in Lathrop, CA. Professional service for warehouses, distribution centers, and offices.',
    businesses: '800+',
    landmarks: ['Lathrop Marketplace', 'Dell\'Osso Family Farm', 'Lathrop Community Center'],
  },
  escalon: {
    description: 'Office vending machines in Escalon, CA. Full-service vending solutions with modern machines and regular maintenance.',
    businesses: '250+',
    landmarks: ['Downtown Escalon', 'Escalon Community Park', 'Escalon Charter Academy'],
  },
  waterford: {
    description: 'Office vending machines in Waterford, CA. Professional installation and restocking services for local businesses.',
    businesses: '250+',
    landmarks: ['Waterford Plaza', 'Reinway Park', 'Hickman Community Center'],
  },
  hughson: {
    description: 'Commercial vending solutions for Hughson, CA. Modern touchscreen machines with contactless payment options for local businesses.',
    businesses: '200+',
    landmarks: ['Hughson Community Center', 'Downtown Hughson', 'Hughson High School'],
  },
  newman: {
    description: 'Vending machine services in Newman, CA. Reliable machines with modern features for offices and businesses.',
    businesses: '300+',
    landmarks: ['Newman Community Center', 'Downtown Newman', 'Miller Park'],
  },
  merced: {
    description: 'Office vending machines in Merced, CA. Complete installation, maintenance, and restocking services extending our coverage.',
    businesses: '2,500+',
    landmarks: ['UC Merced', 'Merced College', 'Downtown Merced', 'Applegate Park Zoo'],
  },
  salida: {
    description: 'Commercial vending services in Salida, CA. Convenient workplace vending solutions near Highway 99.',
    businesses: '400+',
    landmarks: ['Salida Shopping District', 'Laird Park', 'Highway 99 Business Corridor'],
  },
  'mountain-house': {
    description: 'Vending machine services in Mountain House, CA. Modern machines for this growing community.',
    businesses: '200+',
    landmarks: ['Mountain House Community Center', 'Central Park', 'Bethany Reservoir'],
  },
};

/**
 * Get complete city data by merging base data with details
 */
function getCityData(slug: string): CityDetails | null {
  const baseCity = ALL_SERVICE_CITIES.find((c) => c.slug === slug);
  if (!baseCity) return null;

  const details = CITY_DETAILS[slug] || {
    description: `Professional vending machine services in ${baseCity.name}, CA. Serving local businesses with modern touchscreen vending solutions and full maintenance service.`,
    businesses: '100+',
    landmarks: [`Downtown ${baseCity.name}`, `${baseCity.name} Community Center`],
  };

  return {
    ...baseCity,
    ...details,
  };
}

/**
 * Generate static params for all service areas
 */
export async function generateStaticParams() {
  return ALL_SERVICE_CITIES.map((city) => ({
    area: city.slug,
  }));
}

/**
 * Generate metadata for each service area
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const cityData = getCityData(area);

  if (!cityData) {
    return {
      title: 'Service Area Not Found | AMP Vending',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';

  return {
    title: `Vending Machines ${cityData.name}, CA | Professional Installation | AMP Vending`,
    description: cityData.description,
    keywords: [
      `vending machines ${cityData.name}`,
      `${cityData.name} vending service`,
      `professional vending machine ${cityData.name}`,
      `commercial vending ${cityData.county} County`,
      `office vending ${cityData.name} CA`,
    ],
    alternates: {
      canonical: `${baseUrl}/service-areas/${area}`,
    },
    openGraph: {
      title: `Commercial Vending Machines in ${cityData.name}, CA`,
      description: cityData.description,
      url: `${baseUrl}/service-areas/${area}`,
      siteName: 'AMP Vending',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: `Vending Machines ${cityData.name}, CA`,
      description: cityData.description,
    },
  };
}

/**
 * Generate structured data for the service area
 */
function generateStructuredData(cityData: CityDetails) {
  const business = AMP_VENDING_BUSINESS_INFO;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Commercial Vending Machine Services",
    "name": `Vending Machine Services in ${cityData.name}, CA`,
    "description": cityData.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": business.name,
      "telephone": business.contact.phone,
      "email": business.contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address.streetAddress,
        "addressLocality": business.address.city,
        "addressRegion": business.address.state,
        "postalCode": business.address.zipCode,
        "addressCountry": "US",
      },
    },
    "areaServed": {
      "@type": "City",
      "name": cityData.name,
      "containedInPlace": [
        {
          "@type": "AdministrativeArea",
          "name": `${cityData.county} County`
        },
        {
          "@type": "State",
          "name": "California"
        }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.coordinates.lat,
        "longitude": cityData.coordinates.lng,
      },
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Vending Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Vending Machine Installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Regular Maintenance & Restocking"
          }
        }
      ]
    },
    "priceRange": "Full-Service",
  };
}

/**
 * Service Area Page Component
 */
export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const cityData = getCityData(area);

  if (!cityData) {
    notFound();
  }

  // Get nearby cities for cross-linking
  const nearbyCities = ALL_SERVICE_CITIES
    .filter((c) => c.county === cityData.county && c.slug !== cityData.slug)
    .slice(0, 6);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(cityData)),
        }}
      />

      {/* Main Content */}
      <ServiceAreaPageClient
        cityData={cityData}
        nearbyCities={nearbyCities}
      />
    </>
  );
}

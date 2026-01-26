import { MachineData } from "@/hooks/useVendingMachines";
import { Metadata } from "next";


// lib/data/seoData.ts
export const SEO_CONSTANTS = {
  // Website Identity
  SITE_NAME: 'AMP Vending Machines',
  SITE_TITLE: 'AMP Vending Machines | Modesto, Stockton, Stanislaus & San Joaquin County | Premium Commercial Vending',
  SITE_DESCRIPTION: 'ampvendingmachines.com - Leading vending machine provider in Modesto, Stockton, Stanislaus County, San Joaquin County & Central California. Professional touchscreen vending machines with 50+ products. Free installation. Call (209) 403-5450',
  
  // URLs and Domains
  BASE_URL: 'https://www.ampvendingmachines.com',
  DOMAIN: 'ampvendingmachines.com',
  
  // Business Information
  BUSINESS_NAME: 'AMP Vending Machines',
  BUSINESS_LEGAL_NAME: 'AMP Design and Consulting LLC',
  BRAND_KEYWORDS: ['ampvendingmachines', 'amp vending machines', 'amp vending', 'ampvending'],
  
  // Contact Information
  PHONE: '+12094035450',
  PHONE_DISPLAY: '(209) 403-5450',
  EMAIL: 'ampdesignandconsulting@gmail.com',
  CONTACT_PERSON: 'Andrew Perez',
  
  // Location Information
  ADDRESS: {
    STREET: '4120 Dale Rd ste j8 1005',
    CITY: 'Modesto',
    COUNTY: 'Stanislaus County',
    STATE: 'CA',
    STATE_FULL: 'California',
    ZIP: '95354',
    COUNTRY: 'US',
    COORDINATES: {
      LAT: 37.6390972,
      LNG: -120.9968782,
    },
  },
  
  // Service Area
  SERVICE_AREA: 'Modesto, Stockton, Stanislaus County, San Joaquin County & Central California',
  SERVICE_COUNTY: 'Stanislaus County, San Joaquin County',
  PRIMARY_CITIES: [
    // Stanislaus County (Top Priority)
    'Modesto', 'Turlock', 'Ceres', 'Riverbank', 'Oakdale', 'Patterson', 'Waterford', 'Hughson', 'Newman', 'Salida',
    // San Joaquin County (High Priority)
    'Stockton', 'Tracy', 'Manteca', 'Lodi', 'Ripon', 'Lathrop', 'Escalon',
    // Adjacent Counties
    'Merced'
  ],
  // Complete list of ALL cities in Stanislaus County for comprehensive SEO
  STANISLAUS_COUNTY_CITIES: [
    // Incorporated cities
    'Modesto', 'Turlock', 'Ceres', 'Riverbank', 'Oakdale', 'Patterson', 'Waterford', 'Hughson', 'Newman',
    // Major unincorporated communities
    'Salida', 'Denair', 'Empire', 'Keyes', 'Del Rio', 'Hickman'
  ],

  // Complete list of ALL cities in San Joaquin County for comprehensive SEO
  SAN_JOAQUIN_COUNTY_CITIES: [
    // Incorporated cities
    'Stockton', 'Tracy', 'Manteca', 'Lodi', 'Ripon', 'Lathrop', 'Escalon',
    // Major unincorporated communities
    'Mountain House', 'French Camp', 'Country Club', 'Woodbridge', 'Lockeford'
  ],
  
  // Industry Keywords
  PRIMARY_KEYWORDS: [
    // Brand Keywords
    'ampvendingmachines',
    'ampvendingmachines.com',
    'amp vending machines',
    'amp vending',
    'ampvending',

    // Location + Service Keywords (Highest Priority)
    'vending machines Modesto',
    'vending machines Modesto CA',
    'Modesto vending machines',
    'vending machines Stanislaus County',
    'Stanislaus County vending machines',
    'vending machines near me Modesto',
    'Modesto CA vending machines',
    'vending machines Stockton',
    'vending machines Stockton CA',
    'Stockton vending machines',
    'vending machines San Joaquin County',
    'San Joaquin County vending machines',
    'vending machines near me Stockton',
    'Stockton CA vending machines',

    // Stanislaus County Cities (Complete Coverage)
    'vending machines Turlock CA',
    'vending machines Ceres CA',
    'vending machines Riverbank CA',
    'vending machines Oakdale CA',
    'vending machines Patterson CA',
    'vending machines Waterford CA',
    'vending machines Hughson CA',
    'vending machines Newman CA',
    'vending machines Salida CA',

    // San Joaquin County Cities (Complete Coverage)
    'vending machines Tracy CA',
    'vending machines Manteca CA',
    'vending machines Lodi CA',
    'vending machines Ripon CA',
    'vending machines Lathrop CA',
    'vending machines Escalon CA',

    // Regional Terms
    'Central California vending machines',
    'Central Valley vending machines',
    'vending machine supplier Stanislaus County',
    'vending machine supplier San Joaquin County',

    // Service Type Keywords
    'commercial vending machines',
    'office vending machines',
    'workplace vending machines',
    'business vending machines',
    'company vending machines',
    'employee vending machines',

    // Feature Keywords
    'touchscreen vending machines',
    'modern vending machines',
    'smart vending machines',
    'contactless vending machines',
    'cashless vending machines',
    'refrigerated vending machines',

    // Service Keywords
    'vending machine supplier',
    'vending machine provider',
    'vending machine vendor',
    'vending machine installation',
    'vending machine rental',
    'vending machine service',
    'vending machine maintenance',
    'free vending machines',

    // Industry Terms
    'premium vending machines',
    'professional vending',
    'maintenance-free vending',
    'full service vending',
    'custom vending solutions',
    'vending machines for businesses',
  ],

  // Open Graph Image Defaults
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
  DEFAULT_OG_IMAGE_FULL: 'https://www.ampvendingmachines.com/images/og/amp-vending-logo-og.webp',
  LOGO_FULL_URL: 'https://www.ampvendingmachines.com/images/logo-full.webp',
  
  // Business Hours
  BUSINESS_HOURS: {
    WEEKDAYS: 'Monday - Friday: 8AM - 8PM',
    WEEKENDS: 'Saturday - Sunday: 8AM - 8PM',
    TIMEZONE: 'PST',
  },
  
  // Service Features
  KEY_FEATURES: [
    'Professional installation and maintenance',
    '21.5" HD touchscreen interfaces',
    'Tap-to-pay technology',
    '50+ customizable product options',
    'Real-time inventory monitoring',
    '24/7 customer support',
    'Employee and customer satisfaction boost',
    'Comprehensive maintenance service',
  ],
} as const;

export const PAGE_METADATA = {
  HOME: {
    title: SEO_CONSTANTS.SITE_TITLE,
    description: SEO_CONSTANTS.SITE_DESCRIPTION,
    keywords: SEO_CONSTANTS.PRIMARY_KEYWORDS.join(', '),
    alternates: {
      canonical: SEO_CONSTANTS.BASE_URL,
    },
    openGraph: {
      title: 'AMP Vending Machines | Modesto, Stockton, Stanislaus & San Joaquin County Vending Solutions',
      description: 'Leading vending machine provider in Modesto, Stockton, Stanislaus County, San Joaquin County & Central California. Premium touchscreen vending machines with free installation.',
      url: SEO_CONSTANTS.BASE_URL,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'AMP Vending premium workplace vending machines',
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AMP Vending Machines | Modesto, Stockton, Stanislaus & San Joaquin County',
      description: 'ampvendingmachines.com - Premium vending machine provider in Modesto, Stockton, Stanislaus County, San Joaquin County & Central California with touchscreen technology.',
      images: [SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL],
    },
  } satisfies Metadata,

  VENDING_MACHINES: {
    title: 'Vending Machines Modesto, Stockton | Stanislaus & San Joaquin County | Commercial & Office Solutions',
    description: 'ampvendingmachines.com offers premium commercial vending machines in Modesto, Stockton, Stanislaus County, San Joaquin County & Central California. Free installation, 21.5" touchscreen, 50+ products. Call (209) 403-5450',
    keywords: 'vending machines Modesto, vending machines Stockton, vending machines Stanislaus County, vending machines San Joaquin County, Modesto vending machines, Stockton vending machines, ampvendingmachines, commercial vending machines, office vending machines Modesto CA, office vending machines Stockton CA, touchscreen vending, workplace vending solutions',
    alternates: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/vending-machines`,
    },
    openGraph: {
      title: 'Premium Vending Machines | AMP Vending',
      description: 'Professional vending Machines with touchscreen technology and 50+ customizable product options.',
      url: `${SEO_CONSTANTS.BASE_URL}/vending-machines`,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/amp-vending-logo-og.webp`,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'AMP Premium Vending Machines Collection',
      }],
      locale: 'en_US',
      type: 'website',
    },
  } satisfies Metadata,


  
// ABOUT: {
//   title: 'About AMP Vending | Professional Vending Machines in Central California',
//   description: 'Learn about AMP Vending\'s commitment to providing premium workplace vending Machines. Serving Central California with professional installation, maintenance, and 24/7 support.',
//   keywords: 'about AMP Vending, vending machine company, Central California vending, professional vending services, workplace Machines, Modesto vending, Andrew Perez founder',
//   alternates: {
//     canonical: `${SEO_CONSTANTS.BASE_URL}/about`,
//   },
//   openGraph: {
//     title: 'About AMP Vending - Your Trusted Vending Partner',
//     description: 'Professional vending Machines with a commitment to excellence. Serving workplaces across Central California with premium machines and comprehensive service.',
//     url: `${SEO_CONSTANTS.BASE_URL}/about`,
//     siteName: SEO_CONSTANTS.SITE_NAME,
//     images: [{
//       url: `${SEO_CONSTANTS.BASE_URL}/images/about/amp-vending-about.jpg`,
//       width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
//       height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
//       alt: 'AMP Vending professional team and premium vending Machines',
//     }],
//     locale: 'en_US',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'About AMP Vending - Professional Vending Machines',
//     description: 'Learn about our commitment to excellence in workplace vending Machines across Central California.',
//     images: [`${SEO_CONSTANTS.BASE_URL}/images/about/amp-vending-about.jpg`],
//   },
// } satisfies Metadata,

  CONTACT: {
    title: 'Contact AMP Vending Machines | Modesto, Stockton, Stanislaus & San Joaquin County | (209) 403-5450',
    description: 'Contact ampvendingmachines.com for free vending machine consultation in Modesto, Stockton, Stanislaus County, San Joaquin County & Central California. Professional installation & service. Call (209) 403-5450 today!',
    keywords: 'contact AMP vending machines, vending machines Modesto, vending machines Stockton, Modesto vending company, Stockton vending company, Stanislaus County vending, San Joaquin County vending, ampvendingmachines contact, vending machine consultation',
    alternates: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/contact`,
    },
    openGraph: {
      title: 'Contact AMP Vending - Professional Consultation',
      description: 'Get in touch for professional vending machine consultation and premium workplace Machines.',
      url: `${SEO_CONSTANTS.BASE_URL}/contact`,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/contact.jpg`,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'Contact AMP Vending for workplace Machines',
      }],
      locale: 'en_US',
      type: 'website',
    },
  } satisfies Metadata,
} as const;

export function generateMachineMetadata(machine: MachineData): Metadata {
  const machineTitle = `${machine.name} | Professional Installation | AMP Vending`;
  const machineDescription = `${machine.shortDescription} Features 21.5" touchscreen, tap-to-pay technology, and maintenance-free operation for enhanced workplace satisfaction.`;
  const machineUrl = `${SEO_CONSTANTS.BASE_URL}/vending-machines/${machine.id}`;
  const machineImageUrl = machine.images && machine.images[0]
    ? `${SEO_CONSTANTS.BASE_URL}${machine.images[0].src}`
    : SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL;

  return {
    title: machineTitle,
    description: machineDescription,
    keywords: [
      machine.name.toLowerCase(),
      'professional vending machine',
      'touchscreen vending',
      'workplace vending solution',
      'maintenance-free vending',
      ...SEO_CONSTANTS.PRIMARY_KEYWORDS,
    ].join(', '),
    alternates: {
      canonical: machineUrl,
    },
    openGraph: {
      title: `${machine.name} - Premium Vending Solution`,
      description: `Professional ${machine.name} with advanced technology. ${machine.shortDescription}`,
      url: machineUrl,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: machineImageUrl,
        width: 800,
        height: 600,
        alt: `${machine.name} vending machine`,
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: machineTitle,
      description: machineDescription,
      images: [machineImageUrl],
    },
    robots: ENHANCED_ROBOTS_CONFIG.PRODUCT_PAGE,

  };
}

export function generateMachineStructuredData(machine: MachineData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${machine.name} Vending Machine`,
    description: machine.description,
    image: machine.images?.[0]
      ? `${SEO_CONSTANTS.BASE_URL}${machine.images[0].src}`
      : undefined,
    brand: {
      '@type': 'Brand',
      name: SEO_CONSTANTS.SITE_NAME,
      logo: SEO_CONSTANTS.LOGO_FULL_URL,
    },
    manufacturer: {
      '@type': 'Organization',
      name: SEO_CONSTANTS.BUSINESS_NAME,
      url: SEO_CONSTANTS.BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      description: 'Professional installation and maintenance-free operation',
      seller: {
        '@type': 'Organization',
        name: SEO_CONSTANTS.BUSINESS_NAME,
      },
      availability: 'https://schema.org/InStock',
    },
    features: machine.features.map(feature => feature.title),
    category: machine.category === 'refrigerated' ? 'Refrigerated Vending Machine' : 'Snack Vending Machine',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Installation',
        value: 'Professional Installation Available',
      },
      {
        '@type': 'PropertyValue',
        name: 'Maintenance',
        value: 'Maintenance-Free Operation',
      },
      {
        '@type': 'PropertyValue',
        name: 'Screen Size',
        value: '21.5 inches',
      },
      {
        '@type': 'PropertyValue',
        name: 'Payment Options',
        value: 'Touchscreen, Tap-to-Pay, Cash, Credit Cards',
      },
    ],
  };
}

/**
 * Schema.org structured data types for different business contexts
 */
export const SCHEMA_TYPES = {
  ORGANIZATION: 'Organization',
  LOCAL_BUSINESS: 'LocalBusiness',
  PRODUCT: 'Product',
  SERVICE: 'Service',
  CONTACT_POINT: 'ContactPoint',
  POSTAL_ADDRESS: 'PostalAddress',
  PLACE: 'Place',
  BREADCRUMB_LIST: 'BreadcrumbList',
  WEBPAGE: 'WebPage',
  WEBSITE: 'WebSite',
  COLLECTION_PAGE: 'CollectionPage',
} as const;

/**
 * Base structured data for AMP Vending organization
 * Used across multiple pages for consistent business information
 */
export const BASE_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': SCHEMA_TYPES.LOCAL_BUSINESS,
  name: SEO_CONSTANTS.BUSINESS_NAME,
  legalName: SEO_CONSTANTS.BUSINESS_LEGAL_NAME,
  url: SEO_CONSTANTS.BASE_URL,
  logo: SEO_CONSTANTS.LOGO_FULL_URL,
  image: SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL,
  description: 'ampvendingmachines.com - Premier vending machine provider serving Modesto, Stockton, Stanislaus County, San Joaquin County & Central California with professional touchscreen vending solutions.',
  telephone: SEO_CONSTANTS.PHONE,
  email: SEO_CONSTANTS.EMAIL,
  priceRange: 'Free installation and maintenance',
  areaServed: [
    {
      '@type': SCHEMA_TYPES.PLACE,
      name: 'Stanislaus County, California',
      geo: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LAT,
          longitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LNG,
        },
        geoRadius: '50 miles',
      },
    },
    {
      '@type': SCHEMA_TYPES.PLACE,
      name: 'San Joaquin County, California',
    },
    {
      '@type': 'City',
      name: 'Modesto, CA',
    },
    {
      '@type': 'City',
      name: 'Stockton, CA',
    },
    {
      '@type': 'City',
      name: 'Turlock, CA',
    },
    {
      '@type': 'City',
      name: 'Ceres, CA',
    },
    {
      '@type': 'City',
      name: 'Manteca, CA',
    },
    {
      '@type': 'City',
      name: 'Tracy, CA',
    },
  ],
  address: {
    '@type': SCHEMA_TYPES.POSTAL_ADDRESS,
    streetAddress: SEO_CONSTANTS.ADDRESS.STREET,
    addressLocality: SEO_CONSTANTS.ADDRESS.CITY,
    addressRegion: SEO_CONSTANTS.ADDRESS.STATE,
    postalCode: SEO_CONSTANTS.ADDRESS.ZIP,
    addressCountry: SEO_CONSTANTS.ADDRESS.COUNTRY,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LAT,
    longitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LNG,
  },
  contactPoint: {
    '@type': SCHEMA_TYPES.CONTACT_POINT,
    telephone: SEO_CONSTANTS.PHONE,
    contactType: 'customer service',
    email: SEO_CONSTANTS.EMAIL,
    areaServed: SEO_CONSTANTS.ADDRESS.COUNTRY,
    availableLanguage: 'English',
  },
  openingHours: [
    'Mo-Fr 08:00-20:00',
    'Sa-Su 08:00-20:00',
  ],
  paymentAccepted: 'Free consultation and installation',
  currenciesAccepted: 'USD',
} as const;



/**
 * Generate breadcrumb structured data for any page
 * Helps search engines understand site hierarchy
 * 
 * @param breadcrumbs - Array of breadcrumb items with name and url
 * @returns JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': SCHEMA_TYPES.BREADCRUMB_LIST,
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url.startsWith('http') 
        ? breadcrumb.url 
        : `${SEO_CONSTANTS.BASE_URL}${breadcrumb.url}`,
    })),
  };
}


/**
 * Generate About page structured data
 * Includes organization, founder, and service area information
 */
export function generateAboutPageStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About AMP Vending',
    description: 'Learn about AMP Vending\'s commitment to providing premium workplace vending Machines in Central California.',
    url: `${SEO_CONSTANTS.BASE_URL}/about`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO_CONSTANTS.BASE_URL}/about`
    },
    about: {
      '@type': 'Organization',
      '@id': `${SEO_CONSTANTS.BASE_URL}/#organization`,
      name: SEO_CONSTANTS.BUSINESS_NAME,
      legalName: SEO_CONSTANTS.BUSINESS_LEGAL_NAME,
      description: 'Professional vending machine Machines for workplaces across Central California',
      foundingDate: '2019',
      founders: [
        {
          '@type': 'Person',
          name: 'Andrew Perez',
          jobTitle: 'Founder & CEO',
          worksFor: {
            '@type': 'Organization',
            name: SEO_CONSTANTS.BUSINESS_NAME
          }
        }
      ],
      areaServed: {
        '@type': 'Place',
        name: SEO_CONSTANTS.SERVICE_AREA,
        geo: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LAT,
            longitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LNG,
          },
          geoRadius: '50 miles',
        },
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: SEO_CONSTANTS.ADDRESS.STREET,
        addressLocality: SEO_CONSTANTS.ADDRESS.CITY,
        addressRegion: SEO_CONSTANTS.ADDRESS.STATE,
        postalCode: SEO_CONSTANTS.ADDRESS.ZIP,
        addressCountry: SEO_CONSTANTS.ADDRESS.COUNTRY,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SEO_CONSTANTS.PHONE,
        contactType: 'customer service',
        email: SEO_CONSTANTS.EMAIL,
        areaServed: SEO_CONSTANTS.ADDRESS.COUNTRY,
        availableLanguage: 'English',
      },
      specialty: [
        'Workplace vending Machines',
        'Touchscreen vending machines',
        'Professional installation',
        'Maintenance services',
        '24/7 customer support'
      ],
      slogan: 'Premium Vending Machines for Modern Workplaces',
      url: SEO_CONSTANTS.BASE_URL,
      logo: SEO_CONSTANTS.LOGO_FULL_URL,
      image: `${SEO_CONSTANTS.BASE_URL}/images/about/amp-vending-about.jpg`,
      sameAs: [
        // Add social media URLs when available
        // 'https://www.facebook.com/ampvending',
        // 'https://www.linkedin.com/company/amp-vending',
      ]
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SEO_CONSTANTS.BASE_URL
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: `${SEO_CONSTANTS.BASE_URL}/about`
        }
      ]
    }
  };
}

/**
 * Generate website search action structured data
 * Enables search box in Google search results
 */
export const WEBSITE_SEARCH_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': SCHEMA_TYPES.WEBSITE,
  name: SEO_CONSTANTS.SITE_NAME,
  url: SEO_CONSTANTS.BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SEO_CONSTANTS.BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as const;

/**
 * Local business operating hours in schema.org format
 */
export const OPERATING_HOURS_SCHEMA = [
  'Mo-Fr 08:00-20:00',
  'Sa-Su 08:00-20:00',
] as const;

/**
 * Service area geographic coverage
 */
export const SERVICE_AREA_SCHEMA = {
  '@type': SCHEMA_TYPES.PLACE,
  name: SEO_CONSTANTS.SERVICE_AREA,
  geo: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LAT,
      longitude: SEO_CONSTANTS.ADDRESS.COORDINATES.LNG,
    },
    geoRadius: '50 miles',
  },
  containedInPlace: {
    '@type': SCHEMA_TYPES.PLACE,
    name: 'California, United States',
  },
} as const;

export const STATIC_PAGES = [
  {
    url: SEO_CONSTANTS.BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  },
  {
    url: `${SEO_CONSTANTS.BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: `${SEO_CONSTANTS.BASE_URL}/vending-machines`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    url: `${SEO_CONSTANTS.BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: `${SEO_CONSTANTS.BASE_URL}/feedback`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  },
  // ... other static pages
] as const;

/**
 * Default robots meta content for different page types
 */
export const ROBOTS_CONFIG = {
  INDEX_FOLLOW: 'index, follow',
  NOINDEX_NOFOLLOW: 'noindex, nofollow',
  INDEX_NOFOLLOW: 'index, nofollow',
  NOINDEX_FOLLOW: 'noindex, follow',
} as const;

export const ENHANCED_ROBOTS_CONFIG = {
  PRODUCT_PAGE: 'index, follow, max-image-preview:large, max-snippet:-1',
};



/**
 * Export all SEO-related utilities and configurations
 * This ensures consistent SEO implementation across the application
 */
// export {
//   generateMachineMetadata,
//   generateMachineStructuredData,
//   generateBreadcrumbStructuredData,
// };

/**
 * Type definitions for SEO-related data structures
 */
export type SEOMetadata = Metadata;
export type StructuredData = Record<string, unknown>;
export type BreadcrumbItem = { name: string; url: string };

/**
 * Default export containing all SEO constants and utilities
 * Use this for importing all SEO-related functionality
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  SEO_CONSTANTS,
  SCHEMA_TYPES,
  BASE_ORGANIZATION_SCHEMA,
  PAGE_METADATA,
  WEBSITE_SEARCH_SCHEMA,
  SERVICE_AREA_SCHEMA,
  OPERATING_HOURS_SCHEMA,
  ROBOTS_CONFIG,
  STATIC_PAGES,
  generateMachineMetadata,
  generateMachineStructuredData,
  generateBreadcrumbStructuredData,
  generateAboutPageStructuredData,
};
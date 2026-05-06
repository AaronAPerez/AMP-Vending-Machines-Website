import { MachineData } from "@/hooks/useVendingMachines";
import { Metadata } from "next";


// lib/data/seoData.ts
export const SEO_CONSTANTS = {
  // Website Identity
  SITE_NAME: 'AMP Vending Machines',
  SITE_TITLE: 'AMP Vending Machines | Modesto, Stockton, Stanislaus & San Joaquin County | Professional Vending Machine Placement | Snack & Drink Machines | ',
  SITE_DESCRIPTION: 'Get a vending machine for your business. Snack, drink & combo vending machines with cashless payment, touchscreen technology. Professional installation in Modesto, Stockton, & Central Valley, CA. Call (209) 403-5450',
  
  // URLs and Domains
  BASE_URL: 'https://www.ampvendingmachines.com',
  DOMAIN: 'ampvendingmachines.com',
  
  // Business Information
  BUSINESS_NAME: 'AMP Vending',
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
  SERVICE_AREA: 'Modesto to Stockton Corridor, Stanislaus County, San Joaquin County & Central Valley, CA',
  SERVICE_COUNTY: 'Stanislaus County, San Joaquin County',
  PRIMARY_CITIES: [
    // Modesto-Stockton Corridor (Primary Service Area)
    'Modesto', 'Stockton', 'Manteca', 'Lathrop', 'Ripon', 'Escalon',
    // Stanislaus County (Secondary)
    'Ceres', 'Riverbank', 'Salida', 'Turlock', 'Oakdale',
    // San Joaquin County (Secondary)
    'Tracy', 'Lodi', 'French Camp',
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
  
  // Industry Keywords - Optimized for High Search Volume (2026)
  PRIMARY_KEYWORDS: [
    // Brand Keywords
    'ampvendingmachines',
    'ampvendingmachines.com',
    'amp vending machines',
    'amp vending',
    'ampvending',

    // HIGH VOLUME: "Near Me" Keywords (Most Searched)
    'vending machine near me',
    'vending machines near me',
    'vending machine company near me',
    'vending services near me',
    'vending machine service near me',
    'snack machine near me',
    'drink machine near me',

    // HIGH VOLUME: Business Vending / Placement (High Intent)
    'vending machine placement',
    'vending machine for my business',
    'get a vending machine',
    'commercial vending machine',
    'professional vending machine installation',
    'vending services for business',
    'vending machine for businesses',
    'how to get a vending machine for my business',
    'vending machine placement',
    'put vending machine in my business',

    // HIGH VOLUME: Business Location Types (High Intent)
    'vending machine for office',
    'vending machines for workplaces',
    'vending machine for warehouse',
    'vending machine for school',
    'vending machine for hotel',
    'vending machine for gym',
    'vending machine for factory',
    'vending machine for hospital',
    'break room vending machine',
    'employee vending solutions',
    'corporate vending services',
    'industrial vending machines',

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
    'Central Valley, CA vending machines',
    'Central Valley vending machines',
    'Northern California vending machines',
    'vending machine supplier Stanislaus County',
    'vending machine supplier San Joaquin County',

    // HIGH VOLUME: Machine Types (Product Keywords)
    'snack vending machine',
    'drink vending machine',
    'beverage vending machine',
    'combo vending machine',
    'combination vending machine',
    'healthy vending machine',
    'cold drink vending machine',
    'food vending machine',

    // Service Type Keywords
    'commercial vending machines',
    'office vending machines',
    'workplace vending machines',
    'business vending machines',
    'company vending machines',
    'employee vending machines',

    // HIGH VOLUME: Payment/Technology Features
    'cashless vending machines',
    'credit card vending machines',
    'tap to pay vending machine',
    'card reader vending machine',
    'apple pay vending machine',
    'contactless payment vending machine',
    'touchscreen vending machines',
    'modern vending machines',
    'smart vending machines',
    'contactless vending machines',
    'refrigerated vending machines',

    // Service Keywords
    'vending machine supplier',
    'vending machine provider',
    'vending machine vendor',
    'vending machine installation',
    'vending machine rental',
    'vending machine leasing',
    'vending machine service',
    'vending machine maintenance',
    'vending machine restocking',
    'commercial vending machines',
    'full service vending',
    'vending machine management',

    // Industry Terms
    'premium vending machines',
    'professional vending',
    'maintenance-free vending',
    'custom vending solutions',
    'vending machines for businesses',
    'vending solutions',
    'automated retail',
    'unattended retail',
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
      title: 'AMP Vending Machines | Modesto, Stockton, Stanislaus & San Joaquin County Vending Solutions | Professional Vending Machine Placement | Snack & Drink Machines for Your Business | Central Valley, CA',
      description: 'Get a vending machine for your office, warehouse, or workplace. Snack, drink & combo machines with cashless payment. Professional installation in Modesto, Stockton & Central Valley, California.',
      url: SEO_CONSTANTS.BASE_URL,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'Professional vending machine placement - snack and drink machines for businesses',
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AMP Vending Machines | Modesto, Stockton, Stanislaus & San Joaquin County Vending Solutions | Professional Vending Machine Placement | Snack & Drink Machines for Your Business | Central Valley, CA',
      description: 'Get a vending machine for your office, warehouse, or workplace. Snack, drink & combo machines with cashless payment. Professional installation in Modesto, Stockton & Central Valley, California.',
      images: [SEO_CONSTANTS.DEFAULT_OG_IMAGE_FULL],
    },
  } satisfies Metadata,

  VENDING_MACHINES: {
    title: 'Snack & Drink Vending Machines | Professional Placement for Offices & Businesses |  Modesto, Stockton | Stanislaus & San Joaquin County | Central Valley, CA',
    description: 'Browse our snack, drink & combo vending machines. Professional vending machine placement for offices, warehouses & workplaces in Modesto, Stockton & Central CA. Cashless payment, touchscreen. Call (209) 403-5450',
    keywords: 'snack vending machine, drink vending machine, combo vending machine, beverage vending machine, professional vending machine placement, vending machine for office, vending machine for warehouse, cashless vending machines, credit card vending machine, vending machines Modesto, vending machines Stockton, Stanislaus County, San Joaquin County & Central Valley, California.  commercial vending machines, office vending machines, workplace vending solutions, break room vending machine',
    alternates: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/vending-machines`,
    },
    openGraph: {
      title: 'Professional Snack & Drink Vending Machines for Your Business | AMP Vending',
      description: 'Snack, drink & combo vending machines with cashless payment. Professional placement for offices, warehouses & workplaces. Full-service installation & maintenance.',
      url: `${SEO_CONSTANTS.BASE_URL}/vending-machines`,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/amp-vending-logo-og.webp`,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'Snack and drink vending machines - professional placement for businesses',
      }],
      locale: 'en_US',
      type: 'website',
    },
  } satisfies Metadata,


  
// ABOUT: {
//   title: 'About AMP Vending | Professional Vending Machines in Central Valley, CA',
//   description: 'Learn about AMP Vending\'s commitment to providing premium workplace vending Machines. Serving Central Valley, CA with professional installation, maintenance, and 24/7 support.',
//   keywords: 'about AMP Vending, vending machine company, Central Valley, CA vending, professional vending services, workplace Machines, Modesto vending, Andrew Perez founder',
//   alternates: {
//     canonical: `${SEO_CONSTANTS.BASE_URL}/about`,
//   },
//   openGraph: {
//     title: 'About AMP Vending - Your Trusted Vending Partner',
//     description: 'Professional vending Machines with a commitment to excellence. Serving workplaces across Central Valley, CA with premium machines and comprehensive service.',
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
//     description: 'Learn about our commitment to excellence in workplace vending Machines across Central Valley, CA.',
//     images: [`${SEO_CONSTANTS.BASE_URL}/images/about/amp-vending-about.jpg`],
//   },
// } satisfies Metadata,

  CONTACT: {
    title: 'Get a Vending Machine for Your Business | Contact AMP Vending | Modesto, Stockton, Stanislaus & San Joaquin County | (209) 403-5450',
    description: 'Request a vending machine placement for your office, warehouse, or workplace. Professional installation. Snack & drink machines with cashless payment. Serving Modesto, Stockton & Central Valley, CA. Call (209) 403-5450',
    keywords: 'get a vending machine, professional vending machine placement, vending machine for my business, vending machine consultation, contact vending company, vending machines near me, vending machine supplier, office vending machine, workplace vending machine, Modesto vending, Stockton vending',
    alternates: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/contact`,
    },
    openGraph: {
      title: 'Get a Vending Machine for Your Business | AMP Vending',
      description: 'Request professional vending machine placement for your office, warehouse, or workplace. Full-service installation & maintenance. Serving Central Valley, California.',
      url: `${SEO_CONSTANTS.BASE_URL}/contact`,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [{
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/contact.jpg`,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'Get a vending machine for your business',
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
  description: 'AMP Vending - Premier vending machine provider serving Modesto, Stockton, Stanislaus County, San Joaquin County & Central Valley, CA with professional touchscreen vending solutions.',
  telephone: SEO_CONSTANTS.PHONE,
  email: SEO_CONSTANTS.EMAIL,
  priceRange: 'Full-service installation and maintenance',
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
  paymentAccepted: 'Professional consultation and installation',
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
 * Type definitions for SEO-related data structures
 */
export type SEOMetadata = Metadata;
export type StructuredData = Record<string, unknown>;
export type BreadcrumbItem = { name: string; url: string };

/**
 * Default export containing all SEO constants and utilities
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
  generateMachineMetadata,
  generateMachineStructuredData,
  generateBreadcrumbStructuredData,
};
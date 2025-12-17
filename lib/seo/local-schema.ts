import { LocalBusiness, Place } from 'schema-dts';

/**
 * Enhanced local business schema for Central California presence
 * Helps Google understand service area and locations
 */
export function generateEnhancedLocalBusinessSchema(): LocalBusiness {
  return {
    '@type': 'LocalBusiness',
    '@id': 'https://www.ampvendingmachines.com/#localbusiness',
    name: 'AMP Vending Machines',
    alternateName: ['ampvendingmachines', 'AMP Vending', 'AMP Design and Consulting'],
    description: 'ampvendingmachines.com - Premier vending machine provider serving Modesto, Stanislaus County & Central California with state-of-the-art touchscreen technology and full-service maintenance packages.',
    
    // Contact information
    telephone: '+12094035450',
    email: 'ampdesignandconsulting@gmail.com',
    url: 'https://www.ampvendingmachines.com',
    
    // Primary location
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Modesto',
      addressRegion: 'CA',
      postalCode: '95354',
      addressCountry: 'US',
      streetAddress: '4120 Dale Rd ste j8 1005',
    },
    
    // Geographic coordinates
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.6391,
      longitude: -120.9969,
    },
    
    // Service area (all cities served)
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Stanislaus County, California',
        '@id': 'https://en.wikipedia.org/wiki/Stanislaus_County,_California',
      },
      {
        '@type': 'City',
        name: 'Modesto, CA',
        '@id': 'https://en.wikipedia.org/wiki/Modesto,_California',
      },
      {
        '@type': 'City',
        name: 'Turlock, CA',
        '@id': 'https://en.wikipedia.org/wiki/Turlock,_California',
      },
      {
        '@type': 'City',
        name: 'Ceres, CA',
        '@id': 'https://en.wikipedia.org/wiki/Ceres,_California',
      },
      {
        '@type': 'City',
        name: 'Riverbank, CA',
        '@id': 'https://en.wikipedia.org/wiki/Riverbank,_California',
      },
      {
        '@type': 'City',
        name: 'Oakdale, CA',
        '@id': 'https://en.wikipedia.org/wiki/Oakdale,_California',
      },
      {
        '@type': 'City',
        name: 'Patterson, CA',
        '@id': 'https://en.wikipedia.org/wiki/Patterson,_California',
      },
      {
        '@type': 'City',
        name: 'Stockton, CA',
        '@id': 'https://en.wikipedia.org/wiki/Stockton,_California',
      },
      {
        '@type': 'City',
        name: 'Manteca, CA',
        '@id': 'https://en.wikipedia.org/wiki/Manteca,_California',
      },
      {
        '@type': 'City',
        name: 'Tracy, CA',
        '@id': 'https://en.wikipedia.org/wiki/Tracy,_California',
      },
      {
        '@type': 'City',
        name: 'Merced, CA',
        '@id': 'https://en.wikipedia.org/wiki/Merced,_California',
      },
      {
        '@type': 'City',
        name: 'Fresno, CA',
        '@id': 'https://en.wikipedia.org/wiki/Fresno,_California',
      },
    ],
    
    // Business hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    
    // Price range
    priceRange: '$$',
    
    // Payment methods accepted
    paymentAccepted: 'Cash, Credit Card, Check, Invoice',
    
    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vending Machine Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Commercial Vending Machines',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Touchscreen Vending Machine Installation',
                description: '21.5" HD touchscreen vending machines with contactless payment',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Full-Service Maintenance',
                description: 'Regular maintenance, restocking, and technical support',
              },
            },
          ],
        },
      ],
    },
    
    // Logo and images
    logo: {
      '@type': 'ImageObject' as const,
      url: 'https://www.ampvendingmachines.com/images/logo.png',
      width: '250',
      height: '60',
    },
    image: [
      'https://www.ampvendingmachines.com/images/machines/touchscreen-combo.jpg',
      'https://www.ampvendingmachines.com/images/machines/beverage-center.jpg',
    ],
    
    // Same as (social profiles)
    sameAs: [
      // Add when available
      // 'https://www.facebook.com/ampvending',
      // 'https://www.linkedin.com/company/ampvending',
      // 'https://twitter.com/ampvending',
    ],
    
    // Aggregate rating (add when you have reviews)
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '4.9',
    //   reviewCount: '27',
    // },
  };
}

/**
 * Service area schema for geographic targeting
 */
export function generateServiceAreaSchema(): Place {
  return {
    '@type': 'Place',
    '@id': 'https://www.ampvendingmachines.com/#servicearea',
    name: 'AMP Vending Machines Service Area - Modesto & Stanislaus County',
    description: 'ampvendingmachines.com serves businesses throughout Modesto, Stanislaus County, and Central California',
    geo: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 37.6391,
        longitude: -120.9969,
      },
      geoRadius: '50000', // 50km radius
    },
    containedInPlace: {
      '@type': 'State',
      name: 'California',
    },
  };
}
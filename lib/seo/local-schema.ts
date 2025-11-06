import { LocalBusiness, Place } from 'schema-dts';

/**
 * Enhanced local business schema for Central California presence
 * Helps Google understand service area and locations
 */
export function generateEnhancedLocalBusinessSchema(): LocalBusiness {
  return {
    '@type': 'LocalBusiness',
    '@id': 'https://www.ampvendingmachines.com/#localbusiness',
    name: 'AMP Vending',
    alternateName: 'AMP Design and Consulting',
    description: 'Professional vending machine services in Central California with state-of-the-art touchscreen technology and full-service maintenance packages.',
    
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
      streetAddress: 'Modesto',
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
        '@type': 'City',
        name: 'Modesto',
        '@id': 'https://en.wikipedia.org/wiki/Modesto,_California',
      },
      {
        '@type': 'City',
        name: 'Stockton',
        '@id': 'https://en.wikipedia.org/wiki/Stockton,_California',
      },
      {
        '@type': 'City',
        name: 'Turlock',
        '@id': 'https://en.wikipedia.org/wiki/Turlock,_California',
      },
      {
        '@type': 'City',
        name: 'Manteca',
        '@id': 'https://en.wikipedia.org/wiki/Manteca,_California',
      },
      {
        '@type': 'City',
        name: 'Tracy',
        '@id': 'https://en.wikipedia.org/wiki/Tracy,_California',
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
    name: 'AMP Vending Service Area',
    description: 'We serve businesses throughout Central California',
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
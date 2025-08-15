/**
 * Structured data generation for enhanced SEO
 * Implements JSON-LD markup for rich snippets
 */

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
    availableLanguage: string;
  };
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AMP Vending',
    description: 'Professional vending machine solutions for workplaces with maintenance-free service and premium touchscreen technology.',
    url: 'https://ampvending.com',
    logo: 'https://ampvending.com/images/amp-vending-logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'Customer Service',
      availableLanguage: 'English'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      postalCode: 'Your ZIP',
      addressCountry: 'US'
    }
  };
}

interface ProductSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image: string[];
  brand: {
    '@type': string;
    name: string;
  };
  offers: {
    '@type': string;
    priceCurrency: string;
    price: string;
    availability: string;
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  images: string[];
  price: string;
}): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'AMP Vending'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock'
    }
  };
}
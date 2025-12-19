import type { VendingMachineData } from './types';

/**
 * Generate JSON-LD Structured Data for Vending Machine Product
 *
 * This helps search engines understand the product and can enable
 * rich snippets in search results.
 *
 * @see https://schema.org/Product
 * @see https://developers.google.com/search/docs/appearance/structured-data/product
 */
export function generateProductStructuredData(data: VendingMachineData) {
  const {
    model,
    manufacturer,
    images,
    specifications,
    features,
    pricing,
  } = data;

  // Extract key specifications for structured data
  const dimensions = specifications.find(s => s.name === 'Dimensions')?.value || '';
  const weight = specifications.find(s => s.name === 'Weight')?.value || '';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${manufacturer} ${model} Commercial Vending Machine`,
    description: `State-of-the-art refrigerated vending machine with ${features.length} advanced features including touchscreen interface, multi-payment system, and cloud-based monitoring.`,
    brand: {
      '@type': 'Brand',
      name: manufacturer,
    },
    model: model,
    image: images.map(img => img.src),
    offers: {
      '@type': 'Offer',
      price: pricing?.upfrontCost || 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split('T')[0],
      seller: {
        '@type': 'Organization',
        name: 'AMP Vending Machines',
        url: 'https://ampvendingmachines.com',
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Revenue Share',
          value: `${pricing?.revenueShare}%`,
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Dimensions',
        value: dimensions,
      },
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: weight,
      },
      ...specifications.slice(0, 8).map(spec => ({
        '@type': 'PropertyValue',
        name: spec.name,
        value: spec.value,
      })),
    ],
    category: 'Commercial Vending Machines',
    itemCondition: 'https://schema.org/NewCondition',
  };
}

/**
 * Generate Breadcrumb Structured Data
 *
 * Helps search engines understand the page hierarchy
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ Structured Data
 *
 * Can display rich snippets in search results
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Organization Structured Data
 *
 * Helps establish brand identity in search results
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AMP Vending Machines',
    url: 'https://ampvendingmachines.com',
    logo: 'https://ampvendingmachines.com/images/logo/AMP_logo.webp',
    description: 'Premium vending machine solutions for workplaces in Central California',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Spanish'],
    },
    sameAs: [
      // Add social media links here
    ],
  };
}

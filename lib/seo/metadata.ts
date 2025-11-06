import { Metadata } from 'next';

/**
 * Base metadata configuration for the entire application
 * Provides default SEO values that can be overridden per page
 */
export const baseMetadata = {
  metadataBase: new URL('https://www.ampvendingmachines.com'),
  title: {
    default: 'Premium Vending Machines for Modern Workplaces | AMP Vending',
    template: '%s | AMP Vending Machines'
  },
  description: 'Transform your workplace with state-of-the-art vending machines featuring 21.5" touchscreen technology, contactless payments, and 50+ customizable product options in Central California.',
  keywords: [
    'vending machines California',
    'commercial vending solutions',
    'touchscreen vending machines',
    'workplace vending services',
    'Modesto vending machines',
    'Stockton vending machines',
    'contactless payment vending',
    'smart vending machines',
    'office vending services',
    'California vending company'
  ],
  authors: [{ name: 'AMP Vending' }],
  creator: 'AMP Vending',
  publisher: 'AMP Vending',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ampvendingmachines.com',
    siteName: 'AMP Vending Machines',
    title: 'Premium Vending Machines for Modern Workplaces',
    description: 'Transform your workplace with state-of-the-art vending machines featuring 21.5" touchscreen technology, contactless payments, and 50+ customizable product options.',
    images: [
      {
        url: '/images/preview/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AMP Vending Machines - Modern Touchscreen Vending Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Vending Machines for Modern Workplaces',
    description: 'State-of-the-art vending machines with touchscreen technology and contactless payments.',
    images: ['/images/preview/twitter-image.jpg'],
    creator: '@AMPVending',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
} satisfies Metadata;

/**
 * Generates page-specific metadata with proper SEO optimization
 * @param title - Page title
 * @param description - Page description
 * @param path - Page path for canonical URL
 * @param additionalKeywords - Additional keywords specific to the page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  additionalKeywords = [],
  image,
}: {
  title: string;
  description: string;
  path?: string;
  additionalKeywords?: string[];
  image?: string;
}): Metadata {
  const url = `https://www.ampvendingmachines.com${path}`;
  const imageUrl = image || '/images/preview/og-image.jpg';

  return {
    title,
    description,
    keywords: [...baseMetadata.keywords, ...additionalKeywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: [imageUrl],
    },
  };
}
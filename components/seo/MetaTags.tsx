'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

/**
 * Core meta tag configuration interface
 */
interface BaseMetaData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Open Graph specific meta data
 */
interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  locale?: string;
}

/**
 * Twitter Card specific meta data
 */
interface TwitterCardData {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player' | undefined;
  title?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
  creator?: string | undefined;
  site?: string | undefined;
}

/**
 * Business/Organization specific structured data
 */
interface BusinessData {
  name?: string;
  type?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  telephone?: string;
  email?: string;
  url?: string;
  logo?: string;
  priceRange?: string;
  areaServed?: string;
}

/**
 * JSON-LD structured data type
 */
interface JsonLdData {
  '@context': string;
  '@type': string;
  [key: string]: string | number | boolean | JsonLdData | JsonLdData[] | undefined;
}

/**
 * Complete meta tags configuration
 */
interface MetaTagsProps {
  meta: BaseMetaData;
  openGraph?: OpenGraphData;
  twitter?: TwitterCardData;
  business?: BusinessData;
  jsonLd?: JsonLdData; // Replaced any with proper type
}

/**
 * SEO Constants for AMP Vending
 */
const SEO_CONSTANTS = {
  SITE_NAME: 'AMP Vending Machines',
  BASE_URL: 'https://www.ampvendingmachines.com',
  DEFAULT_IMAGE: '/images/logo/AMP_logo.png',
  DEFAULT_LOCALE: 'en_US',
  TWITTER_HANDLE: '@ampvending', // Update with actual handle
  BUSINESS_INFO: {
    name: 'AMP Vending',
    alternateName: 'ampvendingmachines',
    type: 'LocalBusiness',
    address: {
      streetAddress: '4120 Dale Rd ste j8 1005',
      addressLocality: 'Modesto',
      addressRegion: 'CA',
      addressCounty: 'Stanislaus County, San Joaquin County',
      postalCode: '95354',
      addressCountry: 'US',
    },
    telephone: '+12094035450',
    email: 'ampdesignandconsulting@gmail.com',
    url: 'https://www.ampvendingmachines.com',
    logo: 'https://www.ampvendingmachines.com/images/logo/AMP_logo.png',
    priceRange: 'Professional vending solutions',
    areaServed: 'Modesto, Stockton, Stanislaus County, San Joaquin County, Central California',
  },
} as const;


export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
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
 * MetaTags Component
 * 
 * Comprehensive SEO meta tags component that handles:
 * - Basic HTML meta tags
 * - Open Graph meta tags for social sharing
 * - Twitter Card meta tags
 * - JSON-LD structured data
 * - Canonical URLs and robots directives
 * 
 * @param props - Meta tag configuration
 */
export default function MetaTags({
  meta,
  openGraph,
  twitter,
  business,
  jsonLd,
}: MetaTagsProps) {
  const pathname = usePathname();
  
  // Generate canonical URL from current pathname
  const canonicalUrl = `${SEO_CONSTANTS.BASE_URL}${pathname}`;
  const finalCanonical = meta.canonical || canonicalUrl;
  
  // Merge with default Open Graph data
  const ogData: OpenGraphData = {
    type: 'website',
    siteName: SEO_CONSTANTS.SITE_NAME,
    locale: SEO_CONSTANTS.DEFAULT_LOCALE,
    title: meta.title,
    description: meta.description,
    image: SEO_CONSTANTS.DEFAULT_IMAGE,
    imageWidth: 1200,
    imageHeight: 630,
    ...openGraph,
  };

  // Merge with default Twitter Card data
  const twitterData: TwitterCardData = {
    card: 'summary_large_image',
    site: SEO_CONSTANTS.TWITTER_HANDLE,
    title: meta.title,
    description: meta.description,
    image: ogData.image,
    imageAlt: ogData.imageAlt || meta.title,
    ...twitter,
  };

  // Merge with default business data
  const businessData: BusinessData = {
    ...SEO_CONSTANTS.BUSINESS_INFO,
    ...business,
  };

  // Generate robots directive
  const robotsContent = [
    meta.noindex ? 'noindex' : 'index',
    meta.nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  // Generate JSON-LD structured data
  const generateJsonLd = (): JsonLdData => {
    const baseStructuredData: JsonLdData = {
      '@context': 'https://schema.org',
      '@type': businessData.type || 'LocalBusiness',
      name: businessData.name || '',
      url: businessData.url || '',
      logo: businessData.logo || '',
      description: meta.description,
      telephone: businessData.telephone || '',
      email: businessData.email || '',
      priceRange: businessData.priceRange || '',
      areaServed: businessData.areaServed || '',
      address: {
        '@type': 'PostalAddress',
        ...businessData.address,
      } as JsonLdData,
    };

    // Merge with custom JSON-LD if provided
    return jsonLd ? { ...baseStructuredData, ...jsonLd } : baseStructuredData;
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogData.type} />
      <meta property="og:title" content={ogData.title} />
      <meta property="og:description" content={ogData.description} />
      <meta property="og:image" content={ogData.image} />
      {ogData.imageAlt && <meta property="og:image:alt" content={ogData.imageAlt} />}
      {ogData.imageWidth && <meta property="og:image:width" content={ogData.imageWidth.toString()} />}
      {ogData.imageHeight && <meta property="og:image:height" content={ogData.imageHeight.toString()} />}
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content={ogData.siteName} />
      <meta property="og:locale" content={ogData.locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterData.card} />
      {twitterData.site && <meta name="twitter:site" content={twitterData.site} />}
      {twitterData.creator && <meta name="twitter:creator" content={twitterData.creator} />}
      <meta name="twitter:title" content={twitterData.title} />
      <meta name="twitter:description" content={twitterData.description} />
      <meta name="twitter:image" content={twitterData.image} />
      {twitterData.imageAlt && <meta name="twitter:image:alt" content={twitterData.imageAlt} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content={SEO_CONSTANTS.SITE_NAME} />
      <meta name="publisher" content={SEO_CONSTANTS.SITE_NAME} />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Modesto, Stockton, Stanislaus County, San Joaquin County, California" />
      <meta name="geo.county" content="Stanislaus County, San Joaquin County" />
      <meta name="geo.position" content="37.6390972;-120.9968782" />
      <meta name="ICBM" content="37.6390972, -120.9968782" />

      
      
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd()),
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify(generateFAQSchema)}
      </script>

    </Head>
  );
}
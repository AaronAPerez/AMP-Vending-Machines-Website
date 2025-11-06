import { MetadataRoute } from 'next';

/**
 * Generates robots.txt for search engine crawler instructions
 * Allows all crawlers and points to sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: 'https://www.ampvendingmachines.com/sitemap.xml',
  };
}
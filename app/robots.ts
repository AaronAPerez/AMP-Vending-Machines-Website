/**
 * Enhanced Dynamic Robots.txt for Google Indexing
 *
 * Build Process Documentation:
 * 1. Optimized robots.txt for maximum Google indexing coverage
 * 2. Environment-aware configuration with production focus
 * 3. Proper sitemap references for crawler discovery
 * 4. AI crawler management for content protection
 * 5. Comprehensive path blocking for security
 * 6. Search engine specific optimizations
 */

import { MetadataRoute } from 'next';

/**
 * Default export for robots.txt generation
 */
export default function robots(): MetadataRoute.Robots {
  // Remove trailing slash to prevent double slashes in URLs
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com').replace(/\/$/, '');
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: ['Googlebot-Image', 'Googlebot-News', 'Googlebot-Video'],
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: ['DuckDuckBot', 'YandexBot'],
        allow: '/',
      },
      {
        userAgent: ['facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'WhatsApp', 'TelegramBot', 'SkypeUriPreview', 'SlackBot', 'DiscordBot'],
        allow: '/',
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'Screaming Frog SEO Spider'],
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'Bard', 'PaLM', 'PerplexityBot', 'YouBot'],
        disallow: '/',
      },
      {
        userAgent: ['SiteAuditBot', 'SeekportBot', 'BLEXBot', 'MegaIndex', 'JobboerseBot', 'SpiderBot', 'VoilaBot'],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/.next/',
          '/admin/',
          '/dashboard/',
          '/backend/',
          '/.env*',
          '/.git/',
          '/node_modules/',
          '/dist/',
          '/build/',
          '/out/',
          '/temp/',
          '/tmp/',
          '/cache/',
          '/logs/',
          '/backup/',
          '/private/',
          '/internal/',
          '/.well-known/',
          '/test/',
          '/testing/',
          '/dev/',
          '/development/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl.replace(/^https?:\/\//, ''),
  };
}
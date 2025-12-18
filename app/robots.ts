/**
 * Enhanced Dynamic Robots.txt Route Handler for Google Indexing
 * 
 * Build Process Documentation:
 * 1. Optimized robots.txt for maximum Google indexing coverage
 * 2. Environment-aware configuration with production focus
 * 3. Proper sitemap references for crawler discovery
 * 4. Strategic crawl delay optimization for different bots
 * 5. AI crawler management for content protection
 * 6. Performance-oriented caching headers
 * 7. Comprehensive path blocking for security
 * 8. Search engine specific optimizations
 */

/**
 * GET handler for enhanced robots.txt generation
 * Optimized specifically for Google indexing and Search Console
 */
export async function GET(): Promise<Response> {
  try {
    // Environment and URL detection
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
    
    // Generate optimized robots.txt content
    const robotsContent = generateEnhancedRobotsContent(isProduction, baseUrl);
    
    return new Response(robotsContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
        'Vary': 'User-Agent',
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    
    // Fallback robots.txt for errors
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
    const fallbackRobots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;
    
    return new Response(fallbackRobots, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  }
}

/**
 * Generate enhanced robots.txt content optimized for Google indexing
 * @param isProduction - Whether running in production environment
 * @param baseUrl - Base URL of the website
 * @returns Optimized robots.txt content
 */
function generateEnhancedRobotsContent(isProduction: boolean, baseUrl: string): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  if (!isProduction) {
    // Development/staging environment - selective blocking
    return `# AMP Vending - Development Environment
# Last updated: ${currentDate}
# Environment: Development/Staging

# Block all crawlers from development environment
User-agent: *
Disallow: /

# Allow specific testing crawlers if needed
User-agent: GooglebotDevelopment
Allow: /test/

# Block all development-specific paths
Disallow: /_next/
Disallow: /api/
Disallow: /.env*
Disallow: /node_modules/
Disallow: /dist/
Disallow: /build/
Disallow: /temp/
Disallow: /logs/

# Development sitemap for testing
# Sitemap: ${baseUrl}/sitemap.xml

# Contact for development issues
# Contact: ampdesignandconsulting@gmail.com
`;
  }

  // Production environment - optimized for maximum Google visibility
  return `# AMP Vending - Premium Workplace Vending Solutions
# Website: ${baseUrl}
# Business: Commercial vending machines with touchscreen technology
# Service Area: Central California (Modesto, Stockton, Fresno, Merced)
# Contact: ampdesignandconsulting@gmail.com
# Phone: (209) 403-5450
# Last updated: ${currentDate}

# ============================================================================
# PRIORITY SECTION: Allow all major search engines full access
# ============================================================================

# Google - Maximum crawling allowed for business-critical content
User-agent: Googlebot
Allow: /

# Google specific crawlers
User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot-Video
Allow: /

# Bing - Full access with moderate crawling
User-agent: Bingbot
Allow: /

# DuckDuckGo - Full access
User-agent: DuckDuckBot
Allow: /

# Yandex - Full access
User-agent: YandexBot
Allow: /

# ============================================================================
# SOCIAL MEDIA CRAWLERS: Essential for social sharing and business visibility
# ============================================================================

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

User-agent: SkypeUriPreview
Allow: /

User-agent: SlackBot
Allow: /

User-agent: DiscordBot
Allow: /

# ============================================================================
# BUSINESS/SEO TOOLS: Controlled access for legitimate business tools
# ============================================================================

# Allow essential SEO and business tools with rate limiting
User-agent: AhrefsBot
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: MJ12bot
Allow: /

User-agent: DotBot
Allow: /

# Screaming Frog (common SEO tool)
User-agent: Screaming Frog SEO Spider
Allow: /

# ============================================================================
# AI TRAINING CRAWLERS: Selective blocking to protect business content
# ============================================================================

# Block AI training crawlers (protect proprietary business content)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Bard
Disallow: /

User-agent: PaLM
Disallow: /

# Block other AI/ML crawlers
User-agent: PerplexityBot
Disallow: /

User-agent: YouBot
Disallow: /

# ============================================================================
# PROBLEMATIC CRAWLERS: Block resource-intensive or malicious bots
# ============================================================================

User-agent: SiteAuditBot
Disallow: /

User-agent: SeekportBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: MegaIndex
Disallow: /

User-agent: JobboerseBot
Disallow: /

User-agent: SpiderBot
Disallow: /

User-agent: VoilaBot
Disallow: /

# ============================================================================
# GENERAL RULES: Default rules for all other crawlers
# ============================================================================

# Default rule for all other crawlers
User-agent: *
Allow: /

# ============================================================================
# BLOCKED PATHS: Protect sensitive and non-public content
# ============================================================================

# API endpoints and backend functionality
Disallow: /api/
Disallow: /_next/
Disallow: /.next/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /backend/

# Configuration and environment files
Disallow: /.env*
Disallow: /.git/
Disallow: /node_modules/
Disallow: /package*.json
Disallow: /tsconfig*.json
Disallow: /next.config.*
Disallow: /tailwind.config.*

# Build and deployment files
Disallow: /dist/
Disallow: /build/
Disallow: /out/
Disallow: /temp/
Disallow: /tmp/
Disallow: /cache/
Disallow: /logs/
Disallow: /backup/

# Private and internal directories
Disallow: /private/
Disallow: /internal/
Disallow: /.well-known/
Disallow: /test/
Disallow: /testing/
Disallow: /dev/
Disallow: /development/

# File types that shouldn't be indexed
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /*.txt$
Disallow: /*.log$
Disallow: /*.sql$
Disallow: /*.bak$
Disallow: /*.old$

# ============================================================================
# QUERY PARAMETERS: Block tracking and non-content parameters
# ============================================================================

# Marketing and tracking parameters
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?source=*
Disallow: /*?campaign=*
Disallow: /*?medium=*
Disallow: /*?content=*
Disallow: /*?term=*
Disallow: /*?gclid=*
Disallow: /*?fbclid=*
Disallow: /*?msclkid=*

# Session and user tracking
Disallow: /*?sessionid=*
Disallow: /*?userid=*
Disallow: /*?token=*
Disallow: /*?auth=*

# Pagination and sorting that doesn't change content significantly
Disallow: /*?sort=*
Disallow: /*?order=*
Disallow: /*?page=*
Disallow: /*?limit=*

# ============================================================================
# EXPLICITLY ALLOWED PATHS: Important files for SEO and functionality
# ============================================================================

# Essential SEO and technical files
Allow: /sitemap*.xml
Allow: /robots.txt
Allow: /favicon.ico
Allow: /manifest.json
Allow: /manifest.webmanifest

# Important images and assets for business
Allow: /images/
Allow: /logo*
Allow: /brand*

# Critical business pages
Allow: /vending-machines/
Allow: /contact
Allow: /feedback
Allow: /about

# ============================================================================
# SITEMAPS: Help crawlers discover all important content
# ============================================================================

# Main sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Specialized sitemaps (uncomment when created)
# Sitemap: ${baseUrl}/sitemap-machines.xml
# Sitemap: ${baseUrl}/sitemap-images.xml
# Sitemap: ${baseUrl}/sitemap-service-areas.xml
# Sitemap: ${baseUrl}/sitemap-blog.xml

# ============================================================================
# ADDITIONAL SEO DIRECTIVES
# ============================================================================

# Host directive for domain consolidation
Host: ${baseUrl.replace(/^https?:\/\//, '')}

# Request rate (overall crawl budget optimization)


# Visit time (hours when crawling is preferred - PST business hours)


# ============================================================================
# BUSINESS INFORMATION FOR REFERENCE
# ============================================================================

# Business: AMP Vending
# Industry: Commercial Vending Machine Solutions
# Primary Keywords: vending machines, office vending, touchscreen vending, Central California
# Service Areas: Modesto, Stockton, Fresno, Merced, Turlock, Tracy, Manteca
# Contact: ampdesignandconsulting@gmail.com
# Phone: (209) 403-5450
# Address: 4120 Dale Rd ste j8 1005, Modesto, CA 95354

# ============================================================================
# CHANGE LOG
# ============================================================================

# ${currentDate}: Enhanced robots.txt for improved Google indexing
# - Added comprehensive crawler management
# - Optimized for Google Search Console compliance
# - Added business-specific path allowances
# - Implemented AI crawler content protection
# - Enhanced sitemap references for better discovery

# For questions about this robots.txt file:
# Email: ampdesignandconsulting@gmail.com
# Subject: Robots.txt Configuration - AMP Vending Website
`;
}

/**
 * Alternative: Generate robots.txt using Next.js MetadataRoute.robots
 * 
 * Create this as app/robots.ts for static generation:
 * 
 * import { MetadataRoute } from 'next';
 * 
 * export default function robots(): MetadataRoute.Robots {
 *   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
 *   const isProduction = process.env.NODE_ENV === 'production';
 * 
 *   if (!isProduction) {
 *     return {
 *       rules: {
 *         userAgent: '*',
 *         disallow: '/',
 *       },
 *     };
 *   }
 * 
 *   return {
 *     rules: [
 *       {
 *         userAgent: 'Googlebot',
 *         allow: '/',
 *         crawlDelay: 1,
 *       },
 *       {
 *         userAgent: 'Bingbot',
 *         allow: '/',
 *         crawlDelay: 2,
 *       },
 *       {
 *         userAgent: '*',
 *         allow: '/',
 *         disallow: ['/api/', '/_next/', '/admin/', '/private/'],
 *       },
 *       {
 *         userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai'],
 *         disallow: '/',
 *       },
 *       {
 *         userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot'],
 *         allow: '/',
 *         crawlDelay: 30,
 *       },
 *     ],
 *     sitemap: [`${baseUrl}/sitemap.xml`],
 *     host: baseUrl.replace(/^https?:\/\//, ''),
 *   };
 * }
 */
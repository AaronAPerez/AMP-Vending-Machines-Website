/**
 * Dynamic Sitemap Generation for Google Indexing
 * Week 1 Technical Foundation Enhancement
 */

import { getAllVendingMachines } from '@/lib/data/vendingMachineData';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    caption?: string;
    title?: string;
    geoLocation?: string;
  }>;
}

/**
 * Service areas for local SEO
 */
const SERVICE_AREAS = [
  'modesto',
  'stockton',
  'turlock',
  'fresno',
  'merced',
  'tracy',
  'manteca'
];

/**
 * GET handler for sitemap generation
 */
export async function GET(): Promise<Response> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com';
    const currentDate = new Date().toISOString();
    
    // Generate all sitemap URLs
    const urls: SitemapUrl[] = [];
    
    // 1. Homepage (highest priority)
    urls.push({
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0,
      images: [{
        loc: `${baseUrl}/images/hero/amp-vending-hero.jpg`,
        caption: 'AMP Vending - Premium Commercial Vending Machines',
        title: 'Modern Touchscreen Vending Solutions'
      }]
    });
    
    // 2. Main vending machines page
    urls.push({
      loc: `${baseUrl}/vending-machines`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    });
    
    // 3. Individual machine pages with images
    const machines = getAllVendingMachines();
    machines.forEach(machine => {
      urls.push({
        loc: `${baseUrl}/vending-machines/${machine.id}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8,
        images: [{
          loc: `${baseUrl}${machine.image}`,
          caption: machine.shortDescription || machine.description,
          title: machine.name,
          geoLocation: 'Modesto, CA'
        }]
      });
    });
    
    // 4. Service area pages for local SEO
    SERVICE_AREAS.forEach(area => {
      urls.push({
        loc: `${baseUrl}/service-areas/${area}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.7
      });
    });
    
    // 5. Contact and feedback pages
    urls.push(
      {
        loc: `${baseUrl}/contact`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/feedback`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.6
      }
    );
    
    // 6. About page (if it exists)
    urls.push({
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    });
    
    // 7. Accessibility statement
    urls.push({
      loc: `${baseUrl}/accessibility`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.5
    });
    
    // 8. Terms of Service and Privacy Policy
    urls.push(
      {
        loc: `${baseUrl}/terms-of-service`,
        lastmod: currentDate,
        changefreq: 'yearly',
        priority: 0.4
      },
      {
        loc: `${baseUrl}/privacy-policy`,
        lastmod: currentDate,
        changefreq: 'yearly',
        priority: 0.4
      }
    );
    
    // Generate XML
    const sitemapXml = generateSitemapXml(urls);
    
    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}

/**
 * Generate XML sitemap content
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls.map(url => {
    const imageEntries = url.images?.map(image => `
    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      ${image.caption ? `<image:caption><![CDATA[${image.caption}]]></image:caption>` : ''}
      ${image.title ? `<image:title><![CDATA[${image.title}]]></image:title>` : ''}
      ${image.geoLocation ? `<image:geo_location>${escapeXml(image.geoLocation)}</image:geo_location>` : ''}
    </image:image>`).join('') || '';
    
    return `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority.toFixed(1)}</priority>` : ''}${imageEntries}
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

/**
 * Escape special XML characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
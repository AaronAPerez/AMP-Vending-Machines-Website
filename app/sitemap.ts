/**
 * Dynamic Sitemap Generation for Google Indexing
 */

import { MetadataRoute } from 'next';
import { getAllVendingMachines } from '@/lib/data/vendingMachineData';

/**
 * Service areas for local SEO
 * Complete coverage of ALL cities in Stanislaus County and San Joaquin County
 * Optimized for local search rankings and comprehensive geographic targeting
 *
 * Coverage: 9 incorporated + 5 unincorporated Stanislaus County cities
 *           7 incorporated + 5 unincorporated San Joaquin County cities
 *           Total: 26 cities across 2 primary counties
 */
const SERVICE_AREAS = [
  // STANISLAUS COUNTY - All Incorporated Cities (9)
  { slug: 'modesto', name: 'Modesto', county: 'Stanislaus', priority: 1.0 },
  { slug: 'turlock', name: 'Turlock', county: 'Stanislaus', priority: 0.9 },
  { slug: 'ceres', name: 'Ceres', county: 'Stanislaus', priority: 0.9 },
  { slug: 'riverbank', name: 'Riverbank', county: 'Stanislaus', priority: 0.85 },
  { slug: 'oakdale', name: 'Oakdale', county: 'Stanislaus', priority: 0.85 },
  { slug: 'patterson', name: 'Patterson', county: 'Stanislaus', priority: 0.85 },
  { slug: 'waterford', name: 'Waterford', county: 'Stanislaus', priority: 0.8 },
  { slug: 'hughson', name: 'Hughson', county: 'Stanislaus', priority: 0.8 },
  { slug: 'newman', name: 'Newman', county: 'Stanislaus', priority: 0.8 },

  // STANISLAUS COUNTY - Major Unincorporated Communities (5)
  { slug: 'salida', name: 'Salida', county: 'Stanislaus', priority: 0.75 },
  { slug: 'denair', name: 'Denair', county: 'Stanislaus', priority: 0.7 },
  { slug: 'empire', name: 'Empire', county: 'Stanislaus', priority: 0.7 },
  { slug: 'keyes', name: 'Keyes', county: 'Stanislaus', priority: 0.7 },
  { slug: 'del-rio', name: 'Del Rio', county: 'Stanislaus', priority: 0.65 },

  // SAN JOAQUIN COUNTY - All Incorporated Cities (7)
  { slug: 'stockton', name: 'Stockton', county: 'San Joaquin', priority: 0.95 },
  { slug: 'tracy', name: 'Tracy', county: 'San Joaquin', priority: 0.9 },
  { slug: 'manteca', name: 'Manteca', county: 'San Joaquin', priority: 0.9 },
  { slug: 'lodi', name: 'Lodi', county: 'San Joaquin', priority: 0.9 },
  { slug: 'ripon', name: 'Ripon', county: 'San Joaquin', priority: 0.85 },
  { slug: 'lathrop', name: 'Lathrop', county: 'San Joaquin', priority: 0.85 },
  { slug: 'escalon', name: 'Escalon', county: 'San Joaquin', priority: 0.8 },

  // SAN JOAQUIN COUNTY - Major Unincorporated Communities (5)
  { slug: 'mountain-house', name: 'Mountain House', county: 'San Joaquin', priority: 0.75 },
  { slug: 'french-camp', name: 'French Camp', county: 'San Joaquin', priority: 0.7 },
  { slug: 'country-club', name: 'Country Club', county: 'San Joaquin', priority: 0.7 },
  { slug: 'woodbridge', name: 'Woodbridge', county: 'San Joaquin', priority: 0.65 },
  { slug: 'lockeford', name: 'Lockeford', county: 'San Joaquin', priority: 0.65 },

  // ADJACENT COUNTIES - Major Cities
  { slug: 'merced', name: 'Merced', county: 'Merced', priority: 0.8 },
];

/**
 * Default export for sitemap generation with SEO optimizations
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Remove trailing slash to prevent double slashes in URLs
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com').replace(/\/$/, '');
  const currentDate = new Date().toISOString();

  const urls: MetadataRoute.Sitemap = [];

  // 1. Homepage (highest priority) - Updated frequently
  urls.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // 2. Main vending machines page - Key conversion page
  urls.push({
    url: `${baseUrl}/vending-machines`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.95,
  });

  // 3. Individual machine pages - Product pages are high priority
  const machines = getAllVendingMachines();
  machines.forEach(machine => {
    urls.push({
      url: `${baseUrl}/vending-machines/${machine.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  });

  // 4. Service area pages for local SEO - Critical for local rankings
  SERVICE_AREAS.forEach(area => {
    urls.push({
      url: `${baseUrl}/service-areas/${area.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: area.priority,
    });
  });

  // 5. County-specific pages - High priority local SEO pages
  urls.push(
    {
      url: `${baseUrl}/stanislaus-county`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/san-joaquin-county`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    }
  );

  // 6. Contact and feedback pages - Conversion pages
  urls.push(
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  );

  // 7. Accessibility statement - Static content
  urls.push({
    url: `${baseUrl}/accessibility`,
    lastModified: '2025-01-01',
    changeFrequency: 'yearly',
    priority: 0.3,
  });

  // 8. Terms of Service and Privacy Policy - Legal pages
  urls.push(
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: '2025-01-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: '2025-01-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  );

  return urls;
}
/**
 * Dynamic Sitemap Generation for Google Indexing
 */

import { MetadataRoute } from 'next';
import { getAllVendingMachines } from '@/lib/data/vendingMachineData';

/**
 * Service areas for local SEO
 * Prioritizing Stanislaus County cities for top local rankings
 */
const SERVICE_AREAS = [
  // Stanislaus County (Highest Priority)
  { slug: 'modesto', name: 'Modesto', priority: 0.9 },
  { slug: 'turlock', name: 'Turlock', priority: 0.85 },
  { slug: 'ceres', name: 'Ceres', priority: 0.85 },
  { slug: 'riverbank', name: 'Riverbank', priority: 0.8 },
  { slug: 'oakdale', name: 'Oakdale', priority: 0.8 },
  { slug: 'patterson', name: 'Patterson', priority: 0.8 },
  { slug: 'waterford', name: 'Waterford', priority: 0.75 },
  { slug: 'hughson', name: 'Hughson', priority: 0.75 },

  // Nearby Major Cities
  { slug: 'stockton', name: 'Stockton', priority: 0.8 },
  { slug: 'manteca', name: 'Manteca', priority: 0.8 },
  { slug: 'tracy', name: 'Tracy', priority: 0.8 },
  { slug: 'merced', name: 'Merced', priority: 0.75 },
  { slug: 'fresno', name: 'Fresno', priority: 0.75 },
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

  // 5. Stanislaus County specific page - High priority local SEO page
  urls.push({
    url: `${baseUrl}/stanislaus-county`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  });

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
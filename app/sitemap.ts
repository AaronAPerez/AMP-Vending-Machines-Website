import { MetadataRoute } from 'next';

/**
 * Generates dynamic sitemap for search engine crawling
 * Automatically includes all routes and updates based on content
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.ampvendingmachines.com';
  
  // Static routes with priorities based on importance
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vending-machines`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Dynamic machine pages (fetch from your data source)
  const machineIds = ['touchscreen-combo', 'beverage-center', 'snack-master']; // Replace with actual data
  const machineRoutes = machineIds.map((id) => ({
    url: `${baseUrl}/vending-machines/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...machineRoutes];
}
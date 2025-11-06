/**
 * Internal linking strategy for SEO
 * Ensures proper link juice distribution
 */

export const internalLinks = {
  // Homepage links to all main sections
  homepage: [
    { text: 'Vending Machines', href: '/vending-machines' },
    { text: 'Service Areas', href: '/service-areas' },
    { text: 'Contact Us', href: '/contact' },
    { text: 'Get Feedback', href: '/feedback' },
  ],

  // Product pages link to related products and contact
  vendingMachines: [
    { text: 'Touchscreen Combo Machine', href: '/vending-machines/touchscreen-combo' },
    { text: 'Beverage Center', href: '/vending-machines/beverage-center' },
    { text: 'Request Quote', href: '/contact' },
  ],

  // Service area pages link to each other and main pages
  serviceAreas: [
    { text: 'Modesto', href: '/service-areas/modesto' },
    { text: 'Stockton', href: '/service-areas/stockton' },
    { text: 'Turlock', href: '/service-areas/turlock' },
    { text: 'Manteca', href: '/service-areas/manteca' },
    { text: 'Tracy', href: '/service-areas/tracy' },
  ],

  // Footer links (appear on every page)
  footer: [
    { text: 'Home', href: '/' },
    { text: 'Vending Machines', href: '/vending-machines' },
    { text: 'Service Areas', href: '/service-areas' },
    { text: 'Blog', href: '/blog' },
    { text: 'Contact', href: '/contact' },
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Terms of Service', href: '/terms' },
  ],
};

/**
 * Generate contextual internal links based on current page
 */
export function getContextualLinks(currentPath: string) {
  if (currentPath.includes('/vending-machines/')) {
    return {
      title: 'Explore More Solutions',
      links: internalLinks.vendingMachines,
    };
  }

  if (currentPath.includes('/service-areas/')) {
    return {
      title: 'Other Service Areas',
      links: internalLinks.serviceAreas,
    };
  }

  return {
    title: 'Quick Links',
    links: internalLinks.homepage,
  };
}
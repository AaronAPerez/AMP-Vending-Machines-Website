/**
 * /catalog: printable sales brochure
 *
 * Server component that provides the route's SEO metadata and renders the brochure.
 * The brochure's content is in lib/data/catalogData.ts; the print layout is in
 * ./catalog.css. The downloadable PDFs (dark and white-background versions) are
 * generated from this page with `npm run catalog:pdf`.
 */

import type { Metadata } from 'next';
import { CatalogViewer } from '@/components/catalog/CatalogViewer';
import { SEO_CONSTANTS } from '@/lib/data/seoData';
import './catalog.css';

export const metadata: Metadata = {
  title: 'Vending Machine Catalog & Brochure | AMP Vending Machines | Modesto, CA',
  description:
    'Download or print the AMP Vending catalog: Koolmore touchscreen machines, Vendo cold drink machines, XMAI AI smart coolers, plus our full snack, drink and frozen food lineup. Serving Modesto, Stockton and the Central Valley.',
  alternates: {
    canonical: `${SEO_CONSTANTS.BASE_URL}/catalog`,
  },
  openGraph: {
    title: 'AMP Vending Catalog: Machines, Snacks & Drinks',
    description:
      'Our vending machines and the snacks, drinks and frozen foods we stock, in one brochure.',
    url: `${SEO_CONSTANTS.BASE_URL}/catalog`,
    siteName: SEO_CONSTANTS.SITE_NAME,
    images: [
      {
        url: `${SEO_CONSTANTS.BASE_URL}/images/og/amp-vending-logo-og.webp`,
        width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
        height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
        alt: 'AMP Vending catalog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function CatalogPage() {
  return (
    <CatalogViewer />
  );
}

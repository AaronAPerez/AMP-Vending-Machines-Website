import { PAGE_METADATA } from '@/lib/data/seoData';
import OptimizedHomePage from '@/components/landing/OptimizedHomePage';


export const metadata = PAGE_METADATA.HOME;

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AMP Vending Machines",
    "image": "https://www.ampvendingmachines.com/images/promos/amp-vending-promo-modesto.jpg",
    "url": "https://www.ampvendingmachines.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Modesto",
      "addressRegion": "CA"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <OptimizedHomePage />
    </>
  );
}
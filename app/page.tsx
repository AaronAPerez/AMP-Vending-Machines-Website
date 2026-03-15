import { PAGE_METADATA } from '@/lib/data/seoData';
import OptimizedHomePage from '@/components/landing/OptimizedHomePage';


export const metadata = PAGE_METADATA.HOME;

export default function HomePage() {
  // SEO-optimized structured data targeting high-volume keywords
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AMP Vending Machines",
    "alternateName": "AMP Vending - Free Vending Machine Placement",
    "description": "Free vending machine placement for offices, warehouses, and workplaces. Snack, drink & combo vending machines with cashless payment. No cost installation in Modesto, Stockton & Central California.",
    "image": "https://www.ampvendingmachines.com/images/promos/amp-vending-promo-modesto.webp",
    "url": "https://www.ampvendingmachines.com",
    "telephone": "+12094035450",
    "priceRange": "Free Installation",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4120 Dale Rd ste j8 1005",
      "addressLocality": "Modesto",
      "addressRegion": "CA",
      "postalCode": "95354",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.6390972,
      "longitude": -120.9968782
    },
    "areaServed": [
      "Modesto", "Stockton", "Turlock", "Ceres", "Riverbank", "Tracy", "Manteca", "Lodi",
      "Stanislaus County", "San Joaquin County", "Central California"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Vending Machine Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Vending Machine Placement",
            "description": "Free snack and drink vending machine placement for businesses with no cost installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cashless Vending Machines",
            "description": "Vending machines with credit card, Apple Pay, and tap-to-pay contactless payment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Office Vending Solutions",
            "description": "Full-service vending machines for offices, warehouses, and workplaces"
          }
        }
      ]
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ]
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
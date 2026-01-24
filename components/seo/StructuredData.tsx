/**
 * Structured Data Component - Centralized Schema.org Markup
 *
 * This component provides all structured data (schema.org) markup for SEO,
 * using centralized business data for consistency and maintainability.
 */

import { AMP_VENDING_BUSINESS_INFO, getServiceAreaList } from '@/lib/data/businessData';

export function StructuredData() {
  const serviceAreas = getServiceAreaList();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${AMP_VENDING_BUSINESS_INFO.contact.website}/#organization`,
    "name": "AMP Vending Machines",
    "alternateName": ["ampvendingmachines", "AMP Vending", AMP_VENDING_BUSINESS_INFO.legalName],
    "url": AMP_VENDING_BUSINESS_INFO.contact.website,
    "logo": `${AMP_VENDING_BUSINESS_INFO.contact.website}/images/logo/AMP-Vending-Logo.jpg`,
    "image": [
      `${AMP_VENDING_BUSINESS_INFO.contact.website}/images/machines/amp-premium-touchscreen-vending-machine.png`,
      `${AMP_VENDING_BUSINESS_INFO.contact.website}/images/machines/amp-refrigerated-vending-machine.png`
    ],
    "description": AMP_VENDING_BUSINESS_INFO.description,
    "slogan": AMP_VENDING_BUSINESS_INFO.slogan,
    "telephone": AMP_VENDING_BUSINESS_INFO.contact.phone,
    "email": AMP_VENDING_BUSINESS_INFO.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${AMP_VENDING_BUSINESS_INFO.address.streetAddress} ${AMP_VENDING_BUSINESS_INFO.address.suite}`,
      "addressLocality": AMP_VENDING_BUSINESS_INFO.address.city,
      "addressRegion": AMP_VENDING_BUSINESS_INFO.address.state,
      "addressCounty": "Stanislaus County",
      "postalCode": AMP_VENDING_BUSINESS_INFO.address.zipCode,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": AMP_VENDING_BUSINESS_INFO.address.coordinates.latitude,
      "longitude": AMP_VENDING_BUSINESS_INFO.address.coordinates.longitude
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
    ],
    "areaServed": serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": AMP_VENDING_BUSINESS_INFO.address.coordinates.latitude,
        "longitude": AMP_VENDING_BUSINESS_INFO.address.coordinates.longitude
      },
      "geoRadius": "80000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Vending Machine Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Vending Machine Installation",
            "description": "Professional installation of touchscreen vending machines"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vending Machine Maintenance",
            "description": "Comprehensive maintenance and restocking service"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Mobile Payment"],
    "currenciesAccepted": "USD",
    "keywords": "ampvendingmachines, vending machines Modesto, vending machines Stanislaus County, Modesto vending machines, vending machines Stockton, vending machines San Joaquin County, Stockton vending machines, commercial vending machines, office vending Modesto CA, office vending Stockton CA, touchscreen vending, Central California, workplace solutions, snack vending machines, beverage vending machines, combo vending machines, healthy vending machines, cashless vending machines, card reader vending, smart vending machines, modern vending machines, vending machine service, vending machine rental, vending machine leasing, free vending machine placement, vending machine installation, break room services, employee break room, workplace amenities, office snacks, school vending machines, gym vending machines, warehouse vending, factory vending machines, Northern California vending, California vending machines, vending solutions, micro market, fresh food vending, cold drinks vending, full service vending, vending machine maintenance, 24/7 vending service, Turlock vending machines, Ceres vending machines, Riverbank vending machines, Oakdale vending machines, Manteca vending machines, Tracy vending machines, Lodi vending machines, Lathrop vending machines, Central Valley vending, San Joaquin Valley vending",
    "foundingDate": "2019",
    "numberOfEmployees": "5-10",
    "knowsAbout": [
      "Commercial Vending Machines",
      "Office Break Room Solutions",
      "Touchscreen Vending Technology",
      "Workplace Refreshment Services",
      "Professional Installation",
      "Maintenance Services"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "National Automatic Merchandising Association"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": AMP_VENDING_BUSINESS_INFO.contact.phone,
        "contactType": "customer service",
        "email": AMP_VENDING_BUSINESS_INFO.contact.email,
        "areaServed": "US-CA",
        "availableLanguage": "English"
      }
    ],
    "sameAs": [
      AMP_VENDING_BUSINESS_INFO.contact.website
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${AMP_VENDING_BUSINESS_INFO.contact.website}/#website`,
    "url": AMP_VENDING_BUSINESS_INFO.contact.website,
    "name": "AMP Vending Machines",
    "description": "ampvendingmachines.com - Premier vending machine provider in Modesto, Stockton, Stanislaus County, San Joaquin County & Central California with professional touchscreen technology",
    "publisher": {
      "@id": `${AMP_VENDING_BUSINESS_INFO.contact.website}/#organization`
    },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${AMP_VENDING_BUSINESS_INFO.contact.website}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": AMP_VENDING_BUSINESS_INFO.contact.website
      }
    ]
  };

  return (
    <>
      {/* LocalBusiness Schema - Critical for Google Business Profile */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

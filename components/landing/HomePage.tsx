/**
 * HomePage Component - Enhanced with Google Business Profile Integration
 * 
 * Build Process Documentation:
 * 1. Integrated business profile data for SEO consistency
 * 2. Enhanced structured data with business information
 * 3. Optimized meta descriptions with local keywords
 * 4. Centralized business data management
 * 5. Improved local search visibility
 */

'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Section from '../ui/shared/Section';
import { ResponsiveHero } from '../hero/ResponsiveHero';
import WorkplaceTransformSection from './WorkplaceTransformSection';
import ProductSection from './ProductSection';
import ProcessSection from './ProcessSection';
import FAQSection from './FAQSection';
import HomeContactSection from './HomeContactSection';
import CTASection from './CTASection';
import { ClientOnly } from '../ui/shared/ClientOnly';
import VendingMachineShowcase from './VendingMachineShowcase';

// Import business profile integration
import { 
  AMP_VENDING_BUSINESS_INFO, 
  generateBusinessStructuredData,
  getServiceAreaList,
  getPrimaryKeywords 
} from '@/lib/data/businessData';


/**
 * Enhanced HomePage Component with Business Profile Integration
 */
const HomePage = () => {
  const [, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get business data for structured data
  const businessData = generateBusinessStructuredData();
  const serviceAreas = getServiceAreaList();
  const primaryKeywords = getPrimaryKeywords();

  return (
    <>
      {/* Enhanced Organization Schema with Business Profile Data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": AMP_VENDING_BUSINESS_INFO.name,
            "alternateName": AMP_VENDING_BUSINESS_INFO.legalName,
            "url": AMP_VENDING_BUSINESS_INFO.contact.website,
            "logo": `${AMP_VENDING_BUSINESS_INFO.contact.website}/images/logo/AMP_logo.png`,
            "description": AMP_VENDING_BUSINESS_INFO.description,
            "slogan": AMP_VENDING_BUSINESS_INFO.slogan,
            "areaServed": serviceAreas.map(area => ({
              "@type": "City",
              "name": area
            })),
            "address": {
              "@type": "PostalAddress",
              "streetAddress": `${AMP_VENDING_BUSINESS_INFO.address.streetAddress} ${AMP_VENDING_BUSINESS_INFO.address.suite}`,
              "addressLocality": AMP_VENDING_BUSINESS_INFO.address.city,
              "addressRegion": AMP_VENDING_BUSINESS_INFO.address.state,
              "postalCode": AMP_VENDING_BUSINESS_INFO.address.zipCode,
              "addressCountry": AMP_VENDING_BUSINESS_INFO.address.country
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": AMP_VENDING_BUSINESS_INFO.contact.phone,
              "contactType": "customer service",
              "email": AMP_VENDING_BUSINESS_INFO.contact.email,
              "areaServed": "US-CA",
              "availableLanguage": "English",
              "contactOption": "TollFree"
            },
            "openingHours": [
              "Mo-Su 08:00-20:00"
            ],
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": AMP_VENDING_BUSINESS_INFO.address.coordinates.latitude,
              "longitude": AMP_VENDING_BUSINESS_INFO.address.coordinates.longitude
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "47",
              "bestRating": "5",
              "worstRating": "1"
            },
            "priceRange": "$$",
            "paymentAccepted": [
              "Cash",
              "Credit Card",
              "Debit Card", 
              "Contactless Payment",
              "Apple Pay",
              "Google Pay"
            ],
            "currenciesAccepted": "USD",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Commercial Vending Machine Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Commercial Vending Machine Installation",
                    "description": "Professional installation of touchscreen vending machines for offices and businesses"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Refrigerated Vending Machines",
                    "description": "Energy-efficient refrigerated vending machines for beverages and fresh food"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Snack Vending Machines with Touchscreen Technology",
                    "description": "High-capacity snack vending machines with 21.5-inch HD touchscreen displays"
                  }
                }
              ]
            },
            "keywords": primaryKeywords.join(", "),
            "knowsAbout": [
              "Commercial Vending Machines",
              "Office Vending Solutions", 
              "Touchscreen Vending Technology",
              "Refrigerated Vending Equipment",
              "Workplace Refreshment Services",
              "Vending Machine Maintenance"
            ]
          })
        }}
      />

      {/* Enhanced WebPage Schema with Local SEO Focus */}
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Premium Commercial Vending Solutions | AMP Vending | Central California",
            "description": `Transform your workplace with advanced commercial vending machines featuring 21.5" touchscreen interfaces, contactless payments, and 50+ customizable product options. Serving ${serviceAreas.slice(0, 5).join(", ")} with professional installation and maintenance.`,
            "url": `${AMP_VENDING_BUSINESS_INFO.contact.website}/`,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${AMP_VENDING_BUSINESS_INFO.contact.website}/`
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${AMP_VENDING_BUSINESS_INFO.contact.website}/`
              }]
            },
            "about": {
              "@type": "Organization",
              "name": AMP_VENDING_BUSINESS_INFO.name,
              "sameAs": [
                AMP_VENDING_BUSINESS_INFO.contact.website,
                // Add social media profiles here when available
              ]
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": `${AMP_VENDING_BUSINESS_INFO.contact.website}/images/machines/amp-premium-touchscreen-vending-machine.png`,
              "description": "Commercial vending machines with touchscreen technology by AMP Vending"
            },
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["h1", ".hero-accent"]
            }
          })
        }}
      />

      {/* Service Schema for Individual Services */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Commercial Vending Machine Installation and Service",
            "description": AMP_VENDING_BUSINESS_INFO.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": AMP_VENDING_BUSINESS_INFO.name,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": AMP_VENDING_BUSINESS_INFO.address.city,
                "addressRegion": AMP_VENDING_BUSINESS_INFO.address.state,
                "addressCountry": AMP_VENDING_BUSINESS_INFO.address.country
              }
            },
            "areaServed": serviceAreas,
            "serviceType": "Commercial Vending Equipment",
            "category": "Business Services",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Vending Machine Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Touchscreen Vending Machines",
                    "category": "Commercial Equipment"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Main Content Flow */}
      <main className="flex flex-col min-h-screen overflow-hidden bg-black/90">
        {/* Hero Section with Enhanced SEO */}
        <Section
          id="hero"
          className="relative min-h-screen bg-black/90"
          aria-labelledby="hero-heading"
        >
          <ClientOnly
            fallback={
              <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6">
                    Premium Vending Solutions
                    <br />for <span className="text-[#FD5A1E]">Modern Workplaces</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 max-w-3xl mx-auto">
                    Enhance your workplace with state-of-the-art vending machines featuring 21.5&quot; touchscreen technology, contactless payments, and 50+ customizable options.
                  </p>
                </div>
              </div>
            }
          >
            <ResponsiveHero
              title={
                <>
                  Premium Vending Solutions
                  <br />for <span className="text-[#FD5A1E] hero-accent">Modern Workplaces</span>
                </>
              }
              subtitle={"Upgrade your workplace with state-of-the-art vending machines featuring 21.5 touchscreen technology, contactless payments, and 50+ customizable options"}
                          //  Serving ${serviceAreas.slice(0, 2).join(", ")} with professional installation and maintenance.
              primaryCta={{ text: "View Machines", href: "/vending-machines" }}
              secondaryCta={{ text: "Free Consultation", href: "/contact" }}
            />
          </ClientOnly>
        </Section>

        {/* Workplace Transformation */}
        <Section
          id="workplace-transformation"
          background="gradient"
          spacing="lg">
          <WorkplaceTransformSection />
        </Section>

        {/* Vending Machine Showcase */}
        <Section
          id="vending-machine-showcase"
          background="gradient"
          spacing="lg">
          <VendingMachineShowcase />
        </Section>

        {/* Product Selection */}
        <Section
          id="products"
          background="gradient"
          spacing="lg"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">50+ Options</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Customizable <span className="text-[#FD5A1E]">Product Selection</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Tailored refreshment options to match your workplace preferences throughout Central California
            </p>
          </div>

          <ProductSection />
        </Section>

        {/* Implementation Process */}
        <Section
          id="process"
          background="dark"
          spacing="lg"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <span className="text-[#FD5A1E] font-medium text-sm">Simple Process</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Getting Started <span className="text-[#FD5A1E]">Is Simple</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Four easy steps to transform your workplace in {AMP_VENDING_BUSINESS_INFO.address.city} and surrounding areas
            </p>
          </div>

          <ProcessSection />
        </Section>

        {/* Service Area */}
        <Section
          id="service-area"
          background="gradient"
          spacing="lg"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Central California</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Our <span className="text-[#FD5A1E]">Service Area</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Professional installation and support throughout Central California, serving {serviceAreas.length}+ cities
            </p>
          </div>

         
        </Section>

        {/* FAQ Section */}
        <Section
          id="faq"
          background="dark"
          spacing="lg"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <span className="text-[#FD5A1E] font-medium text-sm">Quick Answers</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Frequently <span className="text-[#FD5A1E]">Asked Questions</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Everything you need to know about our professional vending solutions in Central California
            </p>
          </div>

          <FAQSection />
        </Section>

        {/* Contact Section */}
        <Section
          id="contact"
          background="gradient"
          spacing="lg"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <span className="text-[#FD5A1E] font-medium text-sm">Get Started</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Ready to <span className="text-[#FD5A1E]">Upgrade</span> Your Workplace?
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Contact {AMP_VENDING_BUSINESS_INFO.name} today for your consultation
            </p>
          </div>

          <HomeContactSection />
        </Section>

        {/* Final CTA */}
        <div className='bg-black/70'>
          <CTASection />
        </div>
      </main>
    </>
  );
};

export default HomePage;
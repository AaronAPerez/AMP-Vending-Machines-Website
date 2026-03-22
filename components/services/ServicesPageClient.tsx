'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import hero directly (critical for LCP)
import ServicesHero from './ServicesHero';

/**
 * ServicesPageClient Component
 *
 * Client-side wrapper that assembles all sections of the Services page.
 * Uses dynamic imports for below-the-fold sections to optimize initial load.
 *
 * Section Order:
 * 1. Hero - "Free Vending Machine Service"
 * 2. How It Works - 3-step process
 * 3. Types of Service - Service offerings
 * 4. Ideal Locations - Target business types
 * 5. Why Choose AMP - Differentiators
 * 6. Service Area Map - Coverage information
 * 7. Final CTA - Request a machine
 */

// Dynamic imports for below-the-fold sections
// This improves initial page load performance
const HowItWorksSection = dynamic(() => import('./HowItWorksSection'), {
  loading: () => <SectionSkeleton />
});

const TypesOfServiceSection = dynamic(() => import('./TypesOfServiceSection'), {
  loading: () => <SectionSkeleton />
});

const IdealLocationsSection = dynamic(() => import('./IdealLocationsSection'), {
  loading: () => <SectionSkeleton />
});

const WhyChooseSection = dynamic(() => import('./WhyChooseSection'), {
  loading: () => <SectionSkeleton />
});

const ServiceAreaMapSection = dynamic(() => import('./ServiceAreaMapSection'), {
  loading: () => <SectionSkeleton />
});

const ServicesCTASection = dynamic(() => import('./ServicesCTASection'), {
  loading: () => <SectionSkeleton />
});

/**
 * Loading skeleton for sections
 * Provides visual feedback while sections are loading
 */
const SectionSkeleton: React.FC = () => (
  <div className="py-16 sm:py-24 bg-black">
    <div className="max-w-6xl mx-auto px-4">
      <div className="animate-pulse">
        {/* Title skeleton */}
        <div className="flex justify-center mb-8">
          <div className="h-8 bg-[#333333] rounded-full w-32" />
        </div>
        <div className="h-12 bg-[#333333] rounded-lg w-3/4 mx-auto mb-4" />
        <div className="h-6 bg-[#333333] rounded-lg w-1/2 mx-auto mb-12" />

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-[#111111] rounded-xl border border-[#333333]"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Props interface for ServicesPageClient
 */
interface ServicesPageClientProps {
  /** Optional custom headline for A/B testing */
  heroHeadline?: string;
  /** Optional custom subheadline */
  heroSubheadline?: string;
}

const ServicesPageClient: React.FC<ServicesPageClientProps> = ({
  heroHeadline,
  heroSubheadline
}) => {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section - Always loaded immediately for LCP */}
      <ServicesHero
        headline={heroHeadline}
        subheadline={heroSubheadline}
        location="Central Valley, CA"
      />

      {/* How It Works - 3-step process */}
      <HowItWorksSection />

      {/* Types of Service - What we offer */}
      <TypesOfServiceSection />

      {/* Ideal Locations - Who we serve */}
      <IdealLocationsSection />

      {/* Why Choose AMP - Our differentiators */}
      <WhyChooseSection />

      {/* Service Area Map - Coverage */}
      <ServiceAreaMapSection />

      {/* Final CTA - Request a machine */}
      <ServicesCTASection />
    </main>
  );
};

export default ServicesPageClient;

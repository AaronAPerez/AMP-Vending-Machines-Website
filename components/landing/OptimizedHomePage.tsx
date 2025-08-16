'use client';

import React, { Suspense } from 'react';
import { ViewportLazy, Deferred } from '../ui/loading/LazyLoading';
import { SectionLoadingFallback } from '@/components/ui/loading/LoadingFallbacks';
import Section from '@/components/ui/shared/Section';

// Import lazy components
import {
  ResponsiveHero,
  WorkplaceTransformSection,
  VendingMachineShowcase,
  ProductSection,
  ProcessSection,
  ServiceAreaSection,
  FAQSection,
  HomeContactSection,
  CTASection,
  Analytics,
  SpeedInsights
} from '../ui/loading/LazyComponents';


/**
 * Performance-optimized HomePage with progressive loading
 */
export default function OptimizedHomePage() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden bg-black/90">
      
      {/* CRITICAL: Hero Section - Load immediately for LCP */}
      <Section id="hero" className="relative min-h-screen bg-black/90">
        <Suspense fallback={<HeroLoadingFallback />}>
          <ResponsiveHero
            title={
              <>
                Premium Commercial Vending Solutions
                <br />for <span className="text-[#FD5A1E]">Modern Workplaces</span>
              </>
            }
            subtitle="Enhance your workplace with state-of-the-art vending machines featuring 21.5&quot; touchscreen technology."
            primaryCta={{ text: "View Machines", href: "/vending-machines" }}
            secondaryCta={{ text: "Free Consultation", href: "/contact" }}
          />
        </Suspense>
      </Section>

      {/* VIEWPORT LAZY: Below-the-fold sections */}
      
      <ViewportLazy 
        threshold={0.1} 
        rootMargin="150px"
        fallback={<SectionLoadingFallback />}
      >
        <Section id="workplace" background="gradient" spacing="lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <WorkplaceTransformSection />
          </Suspense>
        </Section>
      </ViewportLazy>

      <ViewportLazy 
        threshold={0.1} 
        rootMargin="150px"
        fallback={<SectionLoadingFallback />}
      >
        <Section id="showcase" background="gradient" spacing="lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <VendingMachineShowcase />
          </Suspense>
        </Section>
      </ViewportLazy>

      <ViewportLazy 
        threshold={0.1} 
        rootMargin="150px"
        fallback={<SectionLoadingFallback />}
      >
        <Section id="products" background="gradient" spacing="lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <ProductSection />
          </Suspense>
        </Section>
      </ViewportLazy>

      <ViewportLazy 
        threshold={0.1} 
        rootMargin="150px"
        fallback={<SectionLoadingFallback />}
      >
        <Section id="process" background="dark" spacing="lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <ProcessSection />
          </Suspense>
        </Section>
      </ViewportLazy>

      <ViewportLazy 
        threshold={0.1} 
        rootMargin="150px"
        fallback={<SectionLoadingFallback />}
      >
        <Section id="service-area" background="gradient" spacing="lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <ServiceAreaSection />
          </Suspense>
        </Section>
      </ViewportLazy>

      <ViewportLazy 
        threshold={0.1} 
        rootMargin="150px"
        fallback={<SectionLoadingFallback />}
      >
        <Section id="faq" background="dark" spacing="lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <FAQSection />
          </Suspense>
        </Section>
      </ViewportLazy>

      <ViewportLazy 
        threshold={0.1} 
        rootMargin="150px"
        fallback={<SectionLoadingFallback />}
      >
        <Section id="contact" background="gradient" spacing="lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <HomeContactSection />
          </Suspense>
        </Section>
      </ViewportLazy>

      <ViewportLazy 
        threshold={0.1} 
        rootMargin="150px"
        fallback={<SectionLoadingFallback />}
      >
        <Section id="cta" background="dark" spacing="lg">
          <Suspense fallback={<SectionLoadingFallback />}>
            <CTASection />
          </Suspense>
        </Section>
      </ViewportLazy>

      {/* DEFERRED: Analytics - Load after critical content */}
      <Deferred delay={2000}>
        <Analytics />
        <SpeedInsights />
      </Deferred>
    </main>
  );
}

// Hero loading fallback for critical path
const HeroLoadingFallback = React.memo(() => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 animate-pulse">
        Premium Commercial Vending Solutions
        <br />for <span className="text-[#FD5A1E]">Modern Workplaces</span>
      </h1>
      <p className="text-xl md:text-2xl text-[#F5F5F5] mb-8 max-w-3xl mx-auto opacity-75">
        Loading amazing vending solutions...
      </p>
    </div>
  </div>
));

HeroLoadingFallback.displayName = 'HeroLoadingFallback';

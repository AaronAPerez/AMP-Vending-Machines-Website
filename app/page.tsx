import React from 'react';
import { Suspense } from 'react';
import { PAGE_METADATA } from '@/lib/data/seoData';
import OptimizedHomePage from '@/components/landing/OptimizedHomePage';
import { SectionLoadingFallback } from '@/components/ui/loading/LoadingFallbacks';

// Metadata for SEO (generated at build time)
// export const metadata = {
//   title: "AMP Vending | Premium Vending Machines for Workplaces",
//   description: "Professional vending machines with 21.5\" touchscreen technology and 50+ product options for Central California workplaces. Installation included.",
//   keywords: "vending machines Central California, office vending machines Modesto, touchscreen vending machines",
// };

export const metadata = PAGE_METADATA.HOME;

export default function HomePage() {
  return (
    <Suspense fallback={<SectionLoadingFallback />}>
      <OptimizedHomePage />
    </Suspense>
  );
}
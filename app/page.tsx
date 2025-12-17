import React from 'react';
import { Suspense } from 'react';
import { PAGE_METADATA } from '@/lib/data/seoData';
import OptimizedHomePage from '@/components/landing/OptimizedHomePage';
import { SectionLoadingFallback } from '@/components/ui/loading/LoadingFallbacks';


export const metadata = PAGE_METADATA.HOME;

export default function HomePage() {
  return (
    <Suspense fallback={<SectionLoadingFallback />}>
      <OptimizedHomePage />
    </Suspense>
  );
}
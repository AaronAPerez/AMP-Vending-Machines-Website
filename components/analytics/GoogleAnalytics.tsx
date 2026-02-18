'use client';

import { GoogleTagManager, GoogleAnalytics as GA4 } from '@next/third-parties/google';

/**
 * Google Analytics 4 (GA4) & Google Ads Implementation
 *
 * Uses @next/third-parties for optimized loading:
 * - Deferred script loading
 * - Better Core Web Vitals impact
 * - Reduced unused JavaScript
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = 'AW-17642612517';

  // Don't render in development
  if (process.env.NODE_ENV !== 'production' || !measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - optimized loading via @next/third-parties */}
      <GoogleTagManager gtmId={googleAdsId} />

      {/* Google Analytics 4 - optimized loading */}
      <GA4 gaId={measurementId} />
    </>
  );
}

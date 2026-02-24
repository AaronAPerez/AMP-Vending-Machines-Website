'use client';

import { GoogleTagManager, GoogleAnalytics as GA4 } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

/**
 * Google Analytics 4 (GA4) & Google Ads Implementation
 *
 * Performance Optimized:
 * - Defers loading until user interaction or 3s delay
 * - Reduces impact on LCP and FCP
 * - Uses @next/third-parties for optimized script loading
 */
export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = 'AW-17642612517';

  useEffect(() => {
    // Don't load in development
    if (process.env.NODE_ENV !== 'production' || !measurementId) {
      return;
    }

    // Load on user interaction (scroll, click, touch)
    const handleInteraction = () => {
      setShouldLoad(true);
      // Remove listeners after first interaction
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    // Also load after 3 seconds if no interaction
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 3000);

    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [measurementId]);

  // Don't render anything until ready
  if (!shouldLoad || process.env.NODE_ENV !== 'production' || !measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - loads after interaction */}
      <GoogleTagManager gtmId={googleAdsId} />

      {/* Google Analytics 4 - loads after interaction */}
      <GA4 gaId={measurementId} />
    </>
  );
}

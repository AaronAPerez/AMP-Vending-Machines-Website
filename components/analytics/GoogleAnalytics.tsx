'use client';

import { GoogleTagManager, GoogleAnalytics as GA4 } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

/**
 * Google Analytics 4 (GA4) & Google Ads Implementation
 *
 * Performance Optimized:
 * - Defers loading until user interaction (scroll/click/touch)
 * - Uses requestIdleCallback for smart loading during browser idle time
 * - Falls back to 5s timeout if no interaction or idle callback support
 * - Reduces impact on LCP, FCP, and main thread blocking
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

    // Load during browser idle time, with 5s fallback timeout
    // requestIdleCallback loads when browser is not busy, improving LCP
    let idleCallbackId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const loadAnalytics = () => {
      setShouldLoad(true);
      if (idleCallbackId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timer) clearTimeout(timer);
    };

    if ('requestIdleCallback' in window) {
      // Use requestIdleCallback for smarter loading during browser idle
      idleCallbackId = window.requestIdleCallback(loadAnalytics, { timeout: 5000 });
    } else {
      // Fallback for browsers without requestIdleCallback (Safari)
      timer = setTimeout(loadAnalytics, 5000);
    }

    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });

    return () => {
      if (timer) clearTimeout(timer);
      if (idleCallbackId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
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

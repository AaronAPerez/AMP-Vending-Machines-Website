'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 (GA4) & Google Ads Implementation
 *
 * Tracks page views, events, user interactions, and ad conversions
 * Must be placed in the root layout for site-wide tracking
 *
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
      {/* Google Tag (gtag.js) - Lazy loading for better LCP performance */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="lazyOnload"
        async
      />

      {/* Initialize Google Analytics & Google Ads */}
      <Script
        id="google-analytics"
        strategy="lazyOnload"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Google Ads Configuration
          gtag('config', '${googleAdsId}');

          // Google Analytics Configuration
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}


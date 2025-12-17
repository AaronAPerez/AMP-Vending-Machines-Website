'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 (GA4) Implementation
 * 
 * Tracks page views, events, and user interactions
 * Must be placed in the root layout for site-wide tracking
 * 
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't render in development
  if (process.env.NODE_ENV !== 'production' || !measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Tag (gtag.js) - Async loading for performance */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        async
      />
      
      {/* Initialize Google Analytics */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}


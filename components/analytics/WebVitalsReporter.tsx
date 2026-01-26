// components/analytics/WebVitalsReporter.tsx 

'use client';

import { useState } from 'react';
import { useReportWebVitals } from 'next/web-vitals';
import { getMetricRating, type WebVitalsMetric } from '@/lib/performance/core-web-vitals';

/**
 * Web Vitals Reporter Component
 * Handles Core Web Vitals tracking and reporting using Next.js built-in hook
 */

interface WebVitalsReporterProps {
  enableDebugMode?: boolean;
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(metric);
    }

    // Send to Google Analytics (if available)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Development-only Web Vitals Dashboard
 */
export function WebVitalsDashboard() {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Web Vitals Monitor</div>
      <div id="web-vitals-display">
        Collecting metrics...
      </div>
    </div>
  );
}

/**
 * Hook for accessing web vitals data in components
 */
export function useWebVitals() {
  const [vitals, setVitals] = useState<Record<string, WebVitalsMetric>>({});

  useReportWebVitals((metric) => {
    setVitals(prev => ({
      ...prev,
      [metric.name]: {
        ...metric,
        rating: getMetricRating(metric.name, metric.value),
      } as WebVitalsMetric
    }));
  });

  return vitals;
}

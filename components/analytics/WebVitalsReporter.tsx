// components/analytics/WebVitalsReporter.tsx - Consolidated web vitals reporting

'use client';

import { useState } from 'react';
import { useReportWebVitals } from 'next/web-vitals';
import { sendToAnalytics, getMetricRating, type WebVitalsMetric } from '@/lib/performance/core-web-vitals';

/**
 * Web Vitals Reporter Component
 * Handles Core Web Vitals tracking and reporting using Next.js built-in hook
 */

interface WebVitalsReporterProps {
  enableDebugMode?: boolean;
}

export function WebVitalsReporter({
  enableDebugMode = process.env.NODE_ENV === 'development',
}: WebVitalsReporterProps) {

  // Use Next.js built-in web vitals reporting
  useReportWebVitals((metric) => {
    // Log in development mode
    if (enableDebugMode) {
      console.log('📊 Next.js Web Vital:', metric);
    }

    // Send to analytics services using consolidated function
    sendToAnalytics(metric as WebVitalsMetric);
  });

  return null;
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
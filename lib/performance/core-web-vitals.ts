/**
 * Core Web Vitals monitoring and optimization utilities
 * Tracks FCP, LCP, FID, CLS metrics for performance insights
 */

import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Send metrics to analytics service
 */
function sendToAnalytics(metric: WebVitalsMetric): void {
  // Send to your preferred analytics service
  if (typeof window !== 'undefined') {
    // Example: Google Analytics 4
    window.gtag?.('event', metric.name, {
      custom_parameter_1: metric.value,
      custom_parameter_2: metric.rating,
    });

    // Example: Vercel Analytics
    window.va?.track(metric.name, {
      value: metric.value,
      rating: metric.rating,
    });
  }
}

/**
 * Initialize Core Web Vitals tracking
 */
export function initializeWebVitals(): void {
  getCLS(sendToAnalytics);
  getFCP(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}

/**
 * Performance budgets for monitoring
 */
export const PERFORMANCE_BUDGETS = {
  FCP: 1800, // First Contentful Paint (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  TTFB: 600, // Time to First Byte (ms)
} as const;
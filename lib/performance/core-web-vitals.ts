// lib/performance/core-web-vitals.ts - Fixed TypeScript errors

import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Define analytics window interface without extending Window to avoid conflicts
interface AnalyticsGlobals {
  gtag?: (
    command: 'config' | 'event' | 'js',
    targetId: string,
    config?: Record<string, any>
  ) => void;
  va?: (
    event: 'event' | 'beforeSend' | 'pageview',
    properties?: unknown
  ) => void;
}

function sendToAnalytics(metric: WebVitalsMetric): void {
  if (typeof window === 'undefined') return;

  const analytics = window as Window & AnalyticsGlobals;

  console.log(`Core Web Vital: ${metric.name}`, {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  });

  // Send to Google Analytics 4
  if (analytics.gtag) {
    analytics.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta,
      },
    });
  }

  // Send to Vercel Analytics
  if (analytics.va) {
    analytics.va('event', {
      name: `web_vital_${metric.name.toLowerCase()}`,
      data: {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        metric_id: metric.id,
      },
    });
  }

  sendToCustomAnalytics(metric);
}

async function sendToCustomAnalytics(metric: WebVitalsMetric): Promise<void> {
  try {
    if (process.env.NODE_ENV !== 'production') return;

    await fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: Date.now(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      }),
    });
  } catch (error) {
    console.warn('Failed to send web vitals to custom analytics:', error);
  }
}

export function initializeWebVitals(): void {
  try {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  } catch (error) {
    console.warn('Failed to initialize Web Vitals tracking:', error);
  }
}

export const PERFORMANCE_BUDGETS = {
  FCP: 1800,
  LCP: 2500,
  INP: 200,
  CLS: 0.1,
  TTFB: 800,
} as const;

// lib/performance/core-web-vitals.ts - Consolidated web vitals tracking

'use client';

import type { Metric } from 'web-vitals';

export interface WebVitalsMetric {
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
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

export const PERFORMANCE_BUDGETS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
} as const;

/**
 * Get performance rating for a metric
 */
export function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = PERFORMANCE_BUDGETS[name as keyof typeof PERFORMANCE_BUDGETS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export function sendToAnalytics(metric: WebVitalsMetric): void {
  if (typeof window === 'undefined') return;

  const analytics = window as Window & AnalyticsGlobals;
  const rating = metric.rating || getMetricRating(metric.name, metric.value);
  const delta = metric.delta || 0;

  if (process.env.NODE_ENV === 'development') {
    console.log(`Core Web Vital: ${metric.name}`, {
      value: metric.value,
      rating,
      delta,
      id: metric.id,
    });
  }

  // Send to Google Analytics 4
  if (analytics.gtag) {
    analytics.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Send to Vercel Analytics
  if (analytics.va) {
    analytics.va('event', {
      name: `web_vital_${metric.name.toLowerCase()}`,
      data: {
        value: metric.value,
        rating,
        delta,
        metric_id: metric.id,
      },
    });
  }
}

export async function initializeWebVitals(): Promise<void> {
  try {
    // Dynamic import to ensure client-side only loading
    if (typeof window === 'undefined') return;

    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');

    onCLS(sendToAnalytics as (metric: Metric) => void);
    onFCP(sendToAnalytics as (metric: Metric) => void);
    onINP(sendToAnalytics as (metric: Metric) => void);
    onLCP(sendToAnalytics as (metric: Metric) => void);
    onTTFB(sendToAnalytics as (metric: Metric) => void);
  } catch (error) {
    console.warn('Failed to initialize Web Vitals tracking:', error);
  }
}

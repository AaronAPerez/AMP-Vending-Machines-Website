import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

/**
 * Core Web Vitals monitoring and optimization utilities
 * Tracks FCP, LCP, INP, CLS, TTFB metrics for performance insights
 */

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Extended window interface for analytics
 */
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    va?: (
      event: 'event' | 'beforeSend' | 'pageview',
      properties?: unknown
    ) => void;
    // Alternative Vercel Analytics method
    vaEvent?: (name: string, data?: Record<string, any>) => void;
  }
}

/**
 * Send metrics to multiple analytics services
 */
function sendToAnalytics(metric: WebVitalsMetric): void {
  // Ensure we're in browser environment
  if (typeof window === 'undefined') return;

  console.log(`Core Web Vital: ${metric.name}`, {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  });

  // Send to Google Analytics 4
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_map: {
        metric_rating: metric.rating,
        metric_delta: metric.delta,
      },
    });
  }

  // Send to Vercel Analytics (correct method)
  if (window.va) {
    // Use the correct Vercel Analytics event method
    window.va('event', {
      name: `web_vital_${metric.name.toLowerCase()}`,
      data: {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        metric_id: metric.id,
      },
    });
  }

  // Alternative Vercel Analytics method if available
  if (window.vaEvent) {
    window.vaEvent(`web_vital_${metric.name.toLowerCase()}`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      metric_id: metric.id,
    });
  }

  // Send to custom analytics endpoint
  sendToCustomAnalytics(metric);
}

/**
 * Send metrics to custom analytics service
 */
async function sendToCustomAnalytics(metric: WebVitalsMetric): Promise<void> {
  try {
    // Only send in production
    if (process.env.NODE_ENV !== 'production') return;

    await fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    // Fail silently to avoid affecting user experience
    console.warn('Failed to send web vitals to custom analytics:', error);
  }
}

/**
 * Initialize Core Web Vitals tracking
 */
export function initializeWebVitals(): void {
  // Track Core Web Vitals with proper error handling
  try {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics); // INP replaces FID as of March 2024
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  } catch (error) {
    console.warn('Failed to initialize Web Vitals tracking:', error);
  }
}

/**
 * Performance budgets for monitoring (updated thresholds)
 */
export const PERFORMANCE_BUDGETS = {
  FCP: 1800, // First Contentful Paint (ms) - Good: <1.8s
  LCP: 2500, // Largest Contentful Paint (ms) - Good: <2.5s
  INP: 200,  // Interaction to Next Paint (ms) - Good: <200ms
  CLS: 0.1,  // Cumulative Layout Shift - Good: <0.1
  TTFB: 800, // Time to First Byte (ms) - Good: <800ms
} as const;

/**
 * Performance rating thresholds
 */
export const PERFORMANCE_THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
} as const;

/**
 * Get performance rating based on metric value
 */
export function getPerformanceRating(
  metricName: keyof typeof PERFORMANCE_THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = PERFORMANCE_THRESHOLDS[metricName];
  
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Format metric value for display
 */
export function formatMetricValue(name: string, value: number): string {
  switch (name) {
    case 'CLS':
      return value.toFixed(3);
    case 'FCP':
    case 'LCP':
    case 'INP':
    case 'TTFB':
      return `${Math.round(value)}ms`;
    default:
      return value.toString();
  }
}

/**
 * Initialize web vitals with configuration options
 */
export function initializeWebVitalsWithConfig(options: {
  enableConsoleLogging?: boolean;
  enableCustomAnalytics?: boolean;
  reportAllChanges?: boolean;
} = {}): void {
  const {
    enableConsoleLogging = process.env.NODE_ENV === 'development',
    enableCustomAnalytics = true,
    reportAllChanges = false,
  } = options;

  const reportWebVital = (metric: WebVitalsMetric) => {
    if (enableConsoleLogging) {
      console.log(`📊 ${metric.name}: ${formatMetricValue(metric.name, metric.value)} (${metric.rating})`);
    }
    
    sendToAnalytics(metric);
  };

  try {
    onCLS(reportWebVital, { reportAllChanges });
    onFCP(reportWebVital, { reportAllChanges });
    onINP(reportWebVital, { reportAllChanges });
    onLCP(reportWebVital, { reportAllChanges });
    onTTFB(reportWebVital, { reportAllChanges });
  } catch (error) {
    console.warn('Failed to initialize Web Vitals tracking:', error);
  }
}
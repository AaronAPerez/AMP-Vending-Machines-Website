// components/analytics/WebVitalsReporter.tsx - Fixed import

'use client';

import { useEffect, useState } from 'react';
import { useReportWebVitals } from 'next/web-vitals';
import { initializeWebVitals } from '@/lib/performance/core-web-vitals';

/**
 * Web Vitals Reporter Component
 * Handles Core Web Vitals tracking and reporting
 * 
 * Build Process Documentation:
 * 1. Uses Next.js built-in web vitals hook for compatibility
 * 2. Integrates with custom analytics and Vercel Analytics
 * 3. Provides development logging for debugging
 * 4. Implements error boundaries for graceful failure
 */

interface WebVitalsReporterProps {
  enableDebugMode?: boolean;
  reportAllChanges?: boolean;
}

export function WebVitalsReporter({ 
  enableDebugMode = process.env.NODE_ENV === 'development',
  reportAllChanges = false 
}: WebVitalsReporterProps) {
  
  // Use Next.js built-in web vitals reporting
  useReportWebVitals((metric) => {
    // Log in development mode
    if (enableDebugMode) {
      console.log('📊 Next.js Web Vital:', metric);
    }

    // Send to analytics services
    sendMetricToAnalytics(metric);
  });

  // Initialize custom web vitals tracking
  useEffect(() => {
    try {
      // Use the basic initialize function instead of the config version
      initializeWebVitals();
      
      if (enableDebugMode) {
        console.log('📊 Web Vitals tracking initialized');
      }
    } catch (error) {
      console.warn('Failed to initialize custom web vitals:', error);
    }
  }, [enableDebugMode]);

  return null; // This component doesn't render anything
}

/**
 * Send metric to various analytics services
 */
function sendMetricToAnalytics(metric: any) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Send to Vercel Analytics (correct method)
  if (typeof window !== 'undefined') {
    // Check if Vercel Analytics is loaded
    const vercelAnalytics = (window as any).va;
    if (vercelAnalytics) {
      // Use the correct Vercel Analytics API
      vercelAnalytics('event', {
        name: `web_vital_${metric.name.toLowerCase()}`,
        data: {
          value: metric.value,
          rating: getMetricRating(metric.name, metric.value),
          metric_id: metric.id,
        },
      });
    }
  }

  // Send to custom analytics API
  sendToCustomAPI(metric);
}

/**
 * Get performance rating for a metric
 */
function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; poor: number }> = {
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    INP: { good: 200, poor: 500 },
    CLS: { good: 0.1, poor: 0.25 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[name];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Send metric to custom analytics API
 */
async function sendToCustomAPI(metric: any) {
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
        rating: getMetricRating(metric.name, metric.value),
        delta: metric.delta || 0,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    // Fail silently to avoid affecting user experience
    if (process.env.NODE_ENV === 'development') {
      console.warn('Failed to send web vitals to API:', error);
    }
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
  const [vitals, setVitals] = useState<Record<string, any>>({});

  useReportWebVitals((metric) => {
    setVitals(prev => ({
      ...prev,
      [metric.name]: {
        value: metric.value,
        rating: getMetricRating(metric.name, metric.value),
        id: metric.id,
      }
    }));
  });

  return vitals;
}
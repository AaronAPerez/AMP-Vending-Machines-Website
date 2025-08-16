import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Web Vitals API endpoint for custom analytics
 * Receives and processes Core Web Vitals metrics
 */

const webVitalSchema = z.object({
  name: z.enum(['FCP', 'LCP', 'CLS', 'INP', 'TTFB']),
  value: z.number(),
  rating: z.enum(['good', 'needs-improvement', 'poor']),
  delta: z.number(),
  id: z.string(),
  url: z.string().url(),
  timestamp: z.number(),
  userAgent: z.string(),
});

type WebVitalData = z.infer<typeof webVitalSchema>;

/**
 * POST /api/analytics/web-vitals
 * Store web vitals metrics for analysis
 */
export async function POST(request: NextRequest) {
  try {
    // Only accept requests in production
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json(
        { message: 'Web vitals tracking is only enabled in production' },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = webVitalSchema.parse(body);

    // Log metrics for debugging (remove in production)
    console.log('📊 Web Vital received:', {
      name: validatedData.name,
      value: validatedData.value,
      rating: validatedData.rating,
      url: validatedData.url,
    });

    // Store metrics in your preferred database/service
    await storeWebVital(validatedData);

    // Send to external analytics if configured
    await sendToExternalAnalytics(validatedData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing web vitals:', error);
    
    // Return success to avoid affecting user experience
    return NextResponse.json({ success: true });
  }
}

/**
 * Store web vital in database
 */
async function storeWebVital(data: WebVitalData): Promise<void> {
  // Example: Store in Supabase
  // const { supabase } = await import('@/lib/supabase');
  // await supabase.from('web_vitals').insert(data);

  // Example: Store in Prisma
  // const { prisma } = await import('@/lib/prisma');
  // await prisma.webVital.create({ data });

  // For now, just log (implement your storage solution)
  console.log('Storing web vital:', data.name, data.value);
}

/**
 * Send to external analytics services
 */
async function sendToExternalAnalytics(data: WebVitalData): Promise<void> {
  const promises: Promise<void>[] = [];

  // Send to PostHog
  if (process.env.POSTHOG_API_KEY) {
    promises.push(sendToPostHog(data));
  }

  // Send to Mixpanel
  if (process.env.MIXPANEL_TOKEN) {
    promises.push(sendToMixpanel(data));
  }

  // Send to custom webhook
  if (process.env.ANALYTICS_WEBHOOK_URL) {
    promises.push(sendToWebhook(data));
  }

  await Promise.allSettled(promises);
}

/**
 * Send to PostHog
 */
async function sendToPostHog(data: WebVitalData): Promise<void> {
  try {
    await fetch('https://app.posthog.com/capture/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.POSTHOG_API_KEY,
        event: 'web_vital',
        properties: {
          metric_name: data.name,
          metric_value: data.value,
          metric_rating: data.rating,
          page_url: data.url,
          user_agent: data.userAgent,
          timestamp: data.timestamp,
        },
        timestamp: new Date(data.timestamp).toISOString(),
      }),
    });
  } catch (error) {
    console.warn('Failed to send to PostHog:', error);
  }
}

/**
 * Send to Mixpanel
 */
async function sendToMixpanel(data: WebVitalData): Promise<void> {
  try {
    const payload = Buffer.from(JSON.stringify({
      event: 'Web Vital',
      properties: {
        token: process.env.MIXPANEL_TOKEN,
        metric_name: data.name,
        metric_value: data.value,
        metric_rating: data.rating,
        page_url: data.url,
        time: Math.floor(data.timestamp / 1000),
      },
    })).toString('base64');

    await fetch(`https://api.mixpanel.com/track/?data=${payload}`, {
      method: 'GET',
    });
  } catch (error) {
    console.warn('Failed to send to Mixpanel:', error);
  }
}

/**
 * Send to custom webhook
 */
async function sendToWebhook(data: WebVitalData): Promise<void> {
  try {
    await fetch(process.env.ANALYTICS_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANALYTICS_WEBHOOK_TOKEN || ''}`,
      },
      body: JSON.stringify({
        type: 'web_vital',
        data,
        metadata: {
          source: 'amp-vending-website',
          environment: process.env.NODE_ENV,
          timestamp: new Date().toISOString(),
        },
      }),
    });
  } catch (error) {
    console.warn('Failed to send to webhook:', error);
  }
}
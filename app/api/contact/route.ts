import { emailService } from '@/lib/services/emailService';
import { databaseService } from '@/lib/services/databaseService';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Contact Form API Route
 * Uses existing professional email templates from emailBranding.ts
 */

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name is too long'),
   message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  // UTM Attribution fields for tracking lead sources
  attribution: z.string().optional().default('direct'),
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
  utmTerm: z.string().nullable().optional(),
  utmContent: z.string().nullable().optional(),
  landingPage: z.string().nullable().optional(),
  referrer: z.string().nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📧 Contact form submission received:', {
      email: body.email,
      company: body.companyName,
      timestamp: new Date().toISOString()
    });

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);

    const customerData = {
      ...validatedData,
      submittedAt: new Date().toISOString(),
      source: 'website_contact_form',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Log UTM attribution data for marketing analytics
    if (validatedData.utmSource || validatedData.attribution !== 'direct') {
      console.log('📊 Lead Attribution:', {
        attribution: validatedData.attribution,
        utm_source: validatedData.utmSource,
        utm_medium: validatedData.utmMedium,
        utm_campaign: validatedData.utmCampaign,
        landing_page: validatedData.landingPage,
        referrer: validatedData.referrer,
      });
    }

    // Respond immediately — DB save and email sending run in the background.
    // Using a fire-and-forget IIFE (not awaited) so the response returns in ~ms
    // regardless of third-party service latency (Resend, Supabase).
    // In Node.js the event loop keeps running after the response is sent.
    const submissionId = `contact_${Date.now()}`;

    void (async () => {
      try {
        // Save submission to Supabase database for admin dashboard viewing
        const dbSaveResult = await databaseService.saveContactSubmission(validatedData);
        if (!dbSaveResult) {
          console.warn('⚠️ Failed to save contact submission to database');
        } else {
          console.log('✅ Contact submission saved to database');
        }

        // Send emails using professional templates
        const { customerResult, businessResult } = await emailService.sendContactFormEmails(customerData);

        if (customerResult.success) {
          console.log('✅ Customer confirmation email sent successfully');
        } else {
          console.error('❌ Customer confirmation email failed:', customerResult.error);
        }

        if (businessResult.success) {
          console.log('✅ Business notification email sent successfully');
        } else {
          console.error('❌ Business notification email failed:', businessResult.error);
        }

        // Log the submission for analytics
        await logContactSubmission(customerData, {
          customerEmailSuccess: customerResult.success,
          businessEmailSuccess: businessResult.success
        });
      } catch (bgError) {
        console.error('❌ Background task error:', bgError);
      }
    })();

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We\'ve received your submission and will respond within 24 hours.',
      submissionId,
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Contact form submission error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please check your form data.',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing your request. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    }, { status: 500 });
  }
}

/**
 * Log contact submission for analytics
 * Includes UTM attribution data for marketing ROI tracking
 */
async function logContactSubmission(
  data: any,
  emailStatus: { customerEmailSuccess: boolean; businessEmailSuccess: boolean }
): Promise<void> {
  try {
    console.log('📊 Contact submission logged:', {
      company: data.companyName,
      email: data.email,
      timestamp: data.submittedAt,
      emailStatus,
      // UTM Attribution data for tracking marketing effectiveness
      attribution: {
        source: data.attribution || 'direct',
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        landing_page: data.landingPage || null,
        referrer: data.referrer || null,
      }
    });

    // In production, send to your analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to analytics endpoint
      // await fetch('/api/analytics/contact-submission', { ... });
    }
  } catch (error) {
    console.warn('⚠️ Failed to log contact submission:', error);
  }
}

/**
 * Health check endpoint - Verifies all contact form dependencies
 *
 * Use this endpoint with uptime monitoring services (UptimeRobot, Better Uptime, etc.)
 * to get notified when any service goes down.
 *
 * @returns JSON with status of all services (email, database)
 */
export async function GET() {
  const healthCheck = {
    status: 'healthy' as 'healthy' | 'degraded' | 'unhealthy',
    timestamp: new Date().toISOString(),
    services: {
      email: { status: 'unknown' as string, message: '' },
      database: { status: 'unknown' as string, message: '' }
    }
  };

  let hasFailure = false;
  let hasDegradation = false;

  // Check Email Service (Resend)
  try {
    const emailServiceReady = await emailService.verifyConnection();
    if (emailServiceReady) {
      healthCheck.services.email = { status: 'ready', message: 'Resend API connected' };
    } else {
      healthCheck.services.email = { status: 'not_configured', message: 'RESEND_API_KEY not set' };
      hasDegradation = true;
    }
  } catch (error) {
    healthCheck.services.email = {
      status: 'error',
      message: error instanceof Error ? error.message : 'Email service check failed'
    };
    hasFailure = true;
  }

  // Check Database (Supabase)
  try {
    const { supabaseServer } = await import('@/lib/supabase');
    if (!supabaseServer) {
      healthCheck.services.database = { status: 'not_configured', message: 'Supabase credentials not set' };
      hasDegradation = true;
    } else {
      // Test actual database connectivity with a simple query
      const { error } = await supabaseServer
        .from('contact_submissions')
        .select('id')
        .limit(1);

      if (error) {
        healthCheck.services.database = { status: 'error', message: error.message };
        hasFailure = true;
      } else {
        healthCheck.services.database = { status: 'ready', message: 'Supabase connected' };
      }
    }
  } catch (error) {
    healthCheck.services.database = {
      status: 'error',
      message: error instanceof Error ? error.message : 'Database check failed'
    };
    hasFailure = true;
  }

  // Determine overall status
  if (hasFailure) {
    healthCheck.status = 'unhealthy';
  } else if (hasDegradation) {
    healthCheck.status = 'degraded';
  }

  // Return appropriate HTTP status code for monitoring services
  const httpStatus = hasFailure ? 500 : hasDegradation ? 200 : 200;

  return NextResponse.json(healthCheck, { status: httpStatus });
}
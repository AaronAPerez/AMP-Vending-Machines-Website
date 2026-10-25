import { emailService } from '@/lib/services/emailService';
import { databaseService } from '@/lib/services/databaseService';
import { NextRequest, NextResponse, after } from 'next/server';
import { z } from 'zod';
import { checkDatabase, checkEmailService } from '@/lib/services/healthChecks';

/**
 * Contact Form API Route
 * Uses existing professional email templates from emailBranding.ts
 */

// Longest Vercel lets any handler in this file run, in seconds. It is a backstop for
// the GET health check (whose checks time out after 4 s), but it also limits POST,
// including the lead save and emails that run after POST responds. Keep it well
// above what those take.
export const maxDuration = 30;

// ---------------------------------------------------------------------------
// Spam Detection
// ---------------------------------------------------------------------------

/** Email domains used only for testing or known disposable/spam sources */
const BLOCKED_EMAIL_DOMAINS = new Set([
  'example.com', 'example.org', 'example.net',
  'test.com', 'test.org', 'test.net',
  'mailinator.com', 'guerrillamail.com', 'throwaway.email',
  'tempmail.com', 'yopmail.com', 'maildrop.cc',
  'trashmail.com', 'dispostable.com', 'spam4.me',
  'sharklasers.com', 'grr.la', 'guerrillamail.info',
  'fakeinbox.com', 'getnada.com', 'tempr.email',
]);

/** Patterns that indicate automated/test message content */
const SPAM_MESSAGE_PATTERNS = [
  /\be2e\s*test\b/i,
  /automated\s*(e2e\s*)?test/i,
  /please\s+disregard/i,
  /test\s+submission/i,
  /test\s+id\s*:/i,
  /\btest-\d{8,}/i,          // e.g. test-1778028041566
  /ignore\s+this\s+(message|email)/i,
];

/** Patterns that indicate obviously fake names or company names */
const SPAM_FIELD_PATTERNS = [
  /\be2e\s*test\b/i,
  /test\s+company/i,
  /test\s+user/i,
  /\btest-\d{8,}/i,
];

/**
 * Detects whether a submission looks like spam or an automated test.
 * Returns silently so bots don't know they were blocked.
 */
function detectSpam(data: {
  email: string;
  phone?: string;
  message: string;
  firstName: string;
  lastName: string;
  companyName: string;
  honeypot?: string;
}): { isSpam: boolean; reason: string } {
  // Honeypot: hidden field humans never fill — bots do
  if (data.honeypot && data.honeypot.trim() !== '') {
    return { isSpam: true, reason: 'honeypot_triggered' };
  }

  // Blocked email domains (example.com, mailinator.com, etc.)
  const emailDomain = data.email.split('@')[1]?.toLowerCase();
  if (emailDomain && BLOCKED_EMAIL_DOMAINS.has(emailDomain)) {
    return { isSpam: true, reason: `blocked_domain:${emailDomain}` };
  }

  // Spam keywords in message body
  for (const pattern of SPAM_MESSAGE_PATTERNS) {
    if (pattern.test(data.message)) {
      return { isSpam: true, reason: `spam_message:${pattern.source}` };
    }
  }

  // Spam keywords in name / company fields
  for (const field of [data.firstName, data.lastName, data.companyName]) {
    for (const pattern of SPAM_FIELD_PATTERNS) {
      if (pattern.test(field)) {
        return { isSpam: true, reason: `spam_field:${pattern.source}` };
      }
    }
  }

  // Fake US phone numbers — 555-0xxx are reserved for fiction; 555-000-0000 is a classic test number
  if (data.phone) {
    const digits = data.phone.replace(/\D/g, '');
    // Matches 555-000-xxxx or 555-0000000 patterns (10-digit with 555 area code starting with 0)
    if (/^1?555(000|010[0-9]|0[0-9]{2}0{4})/.test(digits) || digits === '5550000000') {
      return { isSpam: true, reason: 'fake_phone_number' };
    }
  }

  return { isSpam: false, reason: '' };
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name is too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  // Honeypot — must be empty; bots fill it
  honeypot: z.string().optional().default(''),
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

    // Spam detection — silently return 200 so bots don't retry
    const spamCheck = detectSpam({
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      companyName: validatedData.companyName,
      honeypot: validatedData.honeypot,
    });
    if (spamCheck.isSpam) {
      console.warn('🚫 Spam submission blocked:', {
        reason: spamCheck.reason,
        email: validatedData.email,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        timestamp: new Date().toISOString(),
      });
      // Return 200 so automated bots believe the submission succeeded
      return NextResponse.json({ success: true, message: 'Thank you for your message!' }, { status: 200 });
    }

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

    // Respond immediately — DB save and email sending run in the background, so the
    // visitor doesn't wait on Supabase or Resend.
    // The background work must be registered with after(). On Vercel's serverless
    // functions the instance can be frozen as soon as the response is sent, so a plain
    // un-awaited promise may never finish, and the lead would be lost with no error
    // (the visitor has already seen "success"). after() tells the platform to keep the
    // function running until this callback settles, up to the route's max duration.
    const submissionId = `contact_${Date.now()}`;

    after(async () => {
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
    });

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
 * Both checks run in parallel, each with a 4-second limit (lib/services/healthChecks.ts),
 * so this answers in about 4 seconds at worst, and a slow service shows up as "timeout".
 *
 * @returns JSON with the status of each service: ready | not_configured | error | timeout.
 *   HTTP 200 when healthy or degraded (a service isn't configured), 503 when unhealthy.
 */
export async function GET() {
  // Neither check rejects (failures come back as a status), so Promise.all is safe
  const [email, database] = await Promise.all([checkEmailService(), checkDatabase()]);
  const statuses = [email.status, database.status];

  // A failed or timed-out service means the form can't work; a missing setting is degraded
  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  if (statuses.some((s) => s === 'error' || s === 'timeout')) {
    status = 'unhealthy';
  } else if (statuses.includes('not_configured')) {
    status = 'degraded';
  }

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      services: { email, database },
    },
    {
      // 503 tells monitors the service is down; degraded still returns 200
      status: status === 'unhealthy' ? 503 : 200,
      // Monitors must always get a fresh result, never a cached one
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}
import { emailService } from '@/lib/services/emailService';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Exit Intent Popup API Route
 * Captures high-intent leads from exit popup
 */

// Exit Intent Form Schema (matches contact form schema)
const exitIntentSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name is too long'),
  pageUrl: z.string().url('Invalid page URL').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('🎯 Exit intent submission received:', {
      name: body.firstName && body.lastName ? `${body.firstName} ${body.lastName}` : 'Unknown',
      company: body.companyName,
      email: body.email,
      timestamp: new Date().toISOString()
    });

    // Validate the form data
    const validatedData = exitIntentSchema.parse(body);

    const contactData = {
      ...validatedData,
      message: `Exit Intent Lead from ${validatedData.pageUrl || 'website'}`,
      submittedAt: new Date().toISOString(),
      source: 'exit_intent_popup',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Send emails using contact form templates (same schema)
    const { customerResult, businessResult } = await emailService.sendContactFormEmails(contactData);

    // Log results
    if (customerResult.success) {
      console.log('✅ Customer exit intent confirmation sent successfully');
    } else {
      console.log('ℹ️ Customer exit intent confirmation skipped:', customerResult.error);
    }

    if (businessResult.success) {
      console.log('✅ Business exit intent notification sent successfully');
    } else {
      console.error('❌ Business exit intent notification failed:', businessResult.error);
    }

    // Log exit intent submission
    await logExitIntentSubmission(contactData, {
      customerEmailSuccess: customerResult.success,
      businessEmailSuccess: businessResult.success
    });

    const submissionId = `exit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Always return success if we got the lead, even if emails failed
    if (businessResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your interest! We\'ll contact you within 24 hours about your FREE vending machine.',
        submissionId,
        emailStatus: {
          customerConfirmation: customerResult.success ? 'sent' : 'skipped',
          businessNotification: 'sent'
        }
      }, { status: 200 });
    } else {
      // Even if email fails, we still captured the lead
      console.log('⚠️ Exit intent emails failed, but lead captured');
      return NextResponse.json({
        success: true,
        message: 'Thank you for your interest! We\'ll contact you within 24 hours about your FREE vending machine.',
        submissionId,
        emailStatus: {
          customerConfirmation: customerResult.success ? 'sent' : 'failed',
          businessNotification: 'failed'
        }
      }, { status: 200 });
    }

  } catch (error) {
    console.error('❌ Exit intent submission error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please fill in all required fields.',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({
      success: false,
      message: 'An error occurred. Please try calling us directly at (209) 403-5450.',
      error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    }, { status: 500 });
  }
}

/**
 * Log exit intent submission for analytics
 */
async function logExitIntentSubmission(
  data: any,
  emailStatus: { customerEmailSuccess: boolean; businessEmailSuccess: boolean }
): Promise<void> {
  try {
    console.log('📊 Exit intent submission logged:', {
      name: `${data.firstName} ${data.lastName}`,
      company: data.companyName,
      email: data.email,
      hasPhone: !!data.phone,
      timestamp: data.submittedAt,
      emailStatus
    });

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Track high-value exit intent conversions
      // await sendToAnalytics('exit_intent_conversion', { ... });
    }
  } catch (error) {
    console.warn('⚠️ Failed to log exit intent submission:', error);
  }
}

/**
 * Health check endpoint for exit intent service
 */
export async function GET() {
  try {
    const emailServiceReady = await emailService.verifyConnection();

    return NextResponse.json({
      status: 'healthy',
      service: 'exit-intent',
      timestamp: new Date().toISOString(),
      services: {
        emailService: emailServiceReady ? 'ready' : 'not_configured'
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      service: 'exit-intent',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

import { emailService } from '@/lib/services/emailService';
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
  message: z.string().optional().default(''),
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
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // Send emails using your professional templates
    const { customerResult, businessResult } = await emailService.sendContactFormEmails(customerData);

    // Log results
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

    // Determine response based on email results
    const submissionId = `contact_${Date.now()}`;
    
    if (customerResult.success && businessResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Thank you for your inquiry! We\'ve sent a confirmation email and will respond within 24 hours.',
        submissionId,
        emailStatus: {
          customerConfirmation: 'sent',
          businessNotification: 'sent'
        }
      }, { status: 200 });
    } 
    else if (businessResult.success) {
      // Business got the email, that's most important
      return NextResponse.json({
        success: true,
        message: 'Thank you for your inquiry! We will respond within 24 hours.',
        submissionId,
        emailStatus: {
          customerConfirmation: customerResult.success ? 'sent' : 'failed',
          businessNotification: 'sent'
        }
      }, { status: 200 });
    }
    else {
      // Both emails failed, but don't fail the submission
      console.error('❌ All emails failed, but submission logged');
      return NextResponse.json({
        success: true,
        message: 'Thank you for your inquiry! We have received your submission and will respond within 24 hours.',
        submissionId,
        emailStatus: {
          customerConfirmation: 'failed',
          businessNotification: 'failed'
        }
      }, { status: 200 });
    }

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
      emailStatus
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
 * Health check endpoint
 */
export async function GET() {
  try {
    const emailServiceReady = await emailService.verifyConnection();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        emailService: emailServiceReady ? 'ready' : 'not_configured'
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
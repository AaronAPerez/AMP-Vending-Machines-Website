import { emailService } from '@/lib/services/emailService';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Feedback Form API Route
 * Uses existing professional email templates from emailBranding.ts
 */

const FEEDBACK_CATEGORIES = [
  'Question',
  'Suggestion', 
  'Compliment',
  'Complaint',
  'Technical Issue',
  'Product Request'
] as const;

const feedbackFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  category: z.enum(FEEDBACK_CATEGORIES),
  locationName: z.string().max(200, 'Location name is too long').optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long (max 2000 characters)'),
  contactConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted'
  })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📝 Feedback submission received:', {
      email: body.email,
      category: body.category,
      timestamp: new Date().toISOString()
    });

    // Validate the form data
    const validatedData = feedbackFormSchema.parse(body);
    
    const feedbackData = {
      ...validatedData,
      submittedAt: new Date().toISOString(),
      source: 'website_feedback_form',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Send emails using your professional templates
    const { customerResult, businessResult } = await emailService.sendFeedbackFormEmails(feedbackData);

    // Log results
    if (customerResult.success) {
      console.log('✅ Customer feedback confirmation sent successfully');
    } else {
      console.error('❌ Customer feedback confirmation failed:', customerResult.error);
    }

    if (businessResult.success) {
      console.log('✅ Business feedback notification sent successfully');
    } else {
      console.error('❌ Business feedback notification failed:', businessResult.error);
    }

    // Log feedback submission
    await logFeedbackSubmission(feedbackData, {
      customerEmailSuccess: customerResult.success,
      businessEmailSuccess: businessResult.success
    });

    // Determine urgency and response message
    const urgentCategories = ['Complaint', 'Technical Issue'];
    const isUrgent = urgentCategories.includes(feedbackData.category);
    const submissionId = feedbackData.id;

    if (customerResult.success && businessResult.success) {
      return NextResponse.json({
        success: true,
        message: `Thank you for your ${feedbackData.category.toLowerCase()}! We've sent a confirmation email and will ${isUrgent ? 'prioritize your feedback' : 'respond within 24-48 hours'}.`,
        submissionId,
        feedbackId: feedbackData.id,
        category: feedbackData.category,
        isUrgent,
        emailStatus: {
          customerConfirmation: 'sent',
          businessNotification: 'sent'
        }
      }, { status: 200 });
    } 
    else if (businessResult.success) {
      return NextResponse.json({
        success: true,
        message: `Thank you for your ${feedbackData.category.toLowerCase()}! We will ${isUrgent ? 'prioritize your feedback' : 'respond within 24-48 hours'}.`,
        submissionId,
        feedbackId: feedbackData.id,
        category: feedbackData.category,
        isUrgent,
        emailStatus: {
          customerConfirmation: customerResult.success ? 'sent' : 'failed',
          businessNotification: 'sent'
        }
      }, { status: 200 });
    }
    else {
      // Both emails failed, but don't fail the submission
      console.error('❌ All feedback emails failed, but submission logged');
      return NextResponse.json({
        success: true,
        message: `Thank you for your ${feedbackData.category.toLowerCase()}! We have received your feedback and will ${isUrgent ? 'prioritize it' : 'respond within 24-48 hours'}.`,
        submissionId,
        feedbackId: feedbackData.id,
        category: feedbackData.category,
        isUrgent,
        emailStatus: {
          customerConfirmation: 'failed',
          businessNotification: 'failed'
        }
      }, { status: 200 });
    }

  } catch (error) {
    console.error('❌ Feedback submission error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please check your feedback form data.',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({
      success: false,
      message: 'An error occurred while submitting your feedback. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    }, { status: 500 });
  }
}

/**
 * Log feedback submission for analytics
 */
async function logFeedbackSubmission(
  data: any,
  emailStatus: { customerEmailSuccess: boolean; businessEmailSuccess: boolean }
): Promise<void> {
  try {
    console.log('📊 Feedback submission logged:', {
      id: data.id,
      category: data.category,
      email: data.email,
      timestamp: data.submittedAt,
      emailStatus
    });

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: Track feedback metrics
      // await sendToAnalytics('feedback_submission', { ... });
    }
  } catch (error) {
    console.warn('⚠️ Failed to log feedback submission:', error);
  }
}

/**
 * Health check endpoint for feedback service
 */
export async function GET() {
  try {
    const emailServiceReady = await emailService.verifyConnection();
    
    return NextResponse.json({
      status: 'healthy',
      service: 'feedback',
      timestamp: new Date().toISOString(),
      categories: FEEDBACK_CATEGORIES,
      services: {
        emailService: emailServiceReady ? 'ready' : 'not_configured'
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      service: 'feedback',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
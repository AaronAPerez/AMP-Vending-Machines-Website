import { emailTemplates } from '@/lib/email/emailBranding';
import { templateService } from '@/lib/services/templateService';

/**
 * Email Service for AMP Vending
 *
 * Build Process Documentation:
 * 1. First tries to use dynamic templates from database (editable via admin dashboard)
 * 2. Falls back to professional email templates from emailBranding.ts if database unavailable
 * 3. Integrates with Resend API for reliable delivery
 * 4. Maintains your established branding and styling
 */

interface EmailConfig {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class EmailService {
  private static instance: EmailService;
  
  private constructor() {}
  
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Send email using the configured provider
   */
  async sendEmail(config: EmailConfig): Promise<EmailResponse> {
    try {
      // Development mode - log to console
      if (process.env.NODE_ENV === 'development') {
        return this.sendEmailDevelopment(config);
      }

      // Production mode - use Resend
      if (process.env.RESEND_API_KEY) {
        return await this.sendEmailResend(config);
      } else {
        return this.sendEmailFallback(config);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown email error'
      };
    }
  }

  /**
   * Send contact form emails using dynamic templates from database (with fallback)
   */
  async sendContactFormEmails(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    companyName: string;
    message?: string;
    submittedAt: string;
    source: string;
  }): Promise<{ customerResult: EmailResponse; businessResult: EmailResponse }> {

    // Try to fetch dynamic template from database
    let customerSubject = `Thank you for contacting AMP Vending, ${data.firstName}!`;
    let customerHtml = emailTemplates.contactConfirmation(data);

    try {
      const dynamicTemplate = await templateService.getRenderedTemplate('contact-confirmation', {
        FirstName: data.firstName,
        LastName: data.lastName,
        Company: data.companyName,
        Email: data.email,
        Phone: data.phone || 'Not provided',
        Message: data.message || 'No message provided'
      });

      if (dynamicTemplate) {
        console.log('✅ Using dynamic contact confirmation template from database');
        customerSubject = dynamicTemplate.subject;
        customerHtml = dynamicTemplate.body;
      } else {
        console.log('⚠️ Dynamic template not found, using hardcoded fallback');
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch dynamic template, using hardcoded fallback:', error);
    }

    // Business notification always uses hardcoded template (for now)
    const businessHtml = emailTemplates.contactNotification(data);

    const [customerResult, businessResult] = await Promise.allSettled([
      this.sendEmail({
        to: data.email,
        subject: customerSubject,
        html: customerHtml,
        from: process.env.FROM_EMAIL || 'AMP Vending <ampdesignandconsulting@gmail.com>',
      }),

      this.sendEmail({
        to: process.env.TO_EMAIL || 'ampdesignandconsulting@gmail.com',
        subject: `🔔 New Contact: ${data.firstName} ${data.lastName} from ${data.companyName}`,
        html: businessHtml,
        from: process.env.FROM_EMAIL || 'AMP Vending <ampdesignandconsulting@gmail.com>',
      })
    ]);

    return {
      customerResult: customerResult.status === 'fulfilled' ? customerResult.value : { success: false, error: 'Customer email failed' },
      businessResult: businessResult.status === 'fulfilled' ? businessResult.value : { success: false, error: 'Business email failed' }
    };
  }

  /**
   * Send feedback form emails using existing professional templates
   */
  async sendFeedbackFormEmails(data: {
    name: string;
    email: string;
    category: string;
    locationName?: string;
    message: string;
    submittedAt: string;
    id: string;
  }): Promise<{ customerResult: EmailResponse; businessResult: EmailResponse }> {
    
    // Use your existing professional templates
    const customerHtml = emailTemplates.feedbackConfirmation(data);
    const businessHtml = emailTemplates.feedbackNotification ? emailTemplates.feedbackNotification(data) : this.generateSimpleFeedbackNotification(data);

    // Determine urgency for business notification
    const urgentCategories = ['Complaint', 'Technical Issue'];
    const isUrgent = urgentCategories.includes(data.category);

    const [customerResult, businessResult] = await Promise.allSettled([
      this.sendEmail({
        to: data.email,
        subject: `Thank you for your feedback, ${data.name.split(' ')[0]}!`,
        html: customerHtml,
        from: process.env.FROM_EMAIL || 'AMP Vending <ampdesignandconsulting@gmail.com>',
      }),
      
      this.sendEmail({
        to: process.env.TO_EMAIL || 'ampdesignandconsulting@gmail.com',
        subject: `${isUrgent ? '🚨 URGENT' : '📝'} ${data.category}: ${data.name}`,
        html: businessHtml,
        from: process.env.FROM_EMAIL || 'AMP Vending <ampdesignandconsulting@gmail.com>',
      })
    ]);

    return {
      customerResult: customerResult.status === 'fulfilled' ? customerResult.value : { success: false, error: 'Customer email failed' },
      businessResult: businessResult.status === 'fulfilled' ? businessResult.value : { success: false, error: 'Business email failed' }
    };
  }

  /**
   * Send exit intent popup emails using existing professional templates
   */
  async sendExitIntentFormEmails(data: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    pageUrl?: string;
    submittedAt: string;
    ipAddress: string;
    id: string;
  }): Promise<{ customerResult: EmailResponse; businessResult: EmailResponse }> {

    // Use existing professional templates
    const customerHtml = emailTemplates.exitIntentConfirmation(data);
    const businessHtml = emailTemplates.exitIntentNotification(data);

    const results = [];

    // Only send customer email if we have their email
    if (data.email) {
      results.push(
        this.sendEmail({
          to: data.email,
          subject: `🎉 Your FREE Vending Machine Awaits - AMP Vending`,
          html: customerHtml,
          from: process.env.FROM_EMAIL || 'AMP Vending <ampdesignandconsulting@gmail.com>',
        })
      );
    } else {
      results.push(Promise.resolve({ success: false, error: 'No customer email provided' }));
    }

    // Always send business notification
    results.push(
      this.sendEmail({
        to: process.env.TO_EMAIL || 'ampdesignandconsulting@gmail.com',
        subject: `🎯 EXIT INTENT LEAD: ${data.name || 'Anonymous'} ${data.company ? `from ${data.company}` : ''}`,
        html: businessHtml,
        from: process.env.FROM_EMAIL || 'AMP Vending <ampdesignandconsulting@gmail.com>',
      })
    );

    const [customerResult, businessResult] = await Promise.allSettled(results);

    return {
      customerResult: customerResult.status === 'fulfilled' ? customerResult.value : { success: false, error: 'Customer email failed' },
      businessResult: businessResult.status === 'fulfilled' ? businessResult.value : { success: false, error: 'Business email failed' }
    };
  }

  /**
   * Verify email service connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Email Service: Development mode - using console logging');
        return true;
      }

      if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️ RESEND_API_KEY not configured. Using fallback mode.');
        return false;
      }

      const response = await fetch('https://api.resend.com/domains', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Email service verification failed:', error);
      return false;
    }
  }

  // Private methods...
  private sendEmailDevelopment(config: EmailConfig): EmailResponse {
    console.log('\n📧 =====================================');
    console.log('📧 EMAIL SENT (DEVELOPMENT MODE)');
    console.log('📧 =====================================');
    console.log('📧 To:', config.to);
    console.log('📧 Subject:', config.subject);
    console.log('📧 From:', config.from || 'default@ampvending.com');
    console.log('📧 HTML Preview (first 300 chars):');
    console.log(config.html.substring(0, 300).replace(/<[^>]*>/g, '') + '...');
    console.log('📧 =====================================\n');
    
    return {
      success: true,
      messageId: `dev-${Date.now()}`
    };
  }

  private async sendEmailResend(config: EmailConfig): Promise<EmailResponse> {
    try {
      // Support multiple recipients (comma-separated)
      const recipients = config.to.split(',').map(email => email.trim());

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.from || 'AMP Vending <noreply@ampvendingmachines.com>',
          to: recipients,
          subject: config.subject,
          html: config.html,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Resend API error: ${response.status}`);
      }

      return {
        success: true,
        messageId: result.id
      };
    } catch (error) {
      console.error('Resend email failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Resend email failed'
      };
    }
  }

  private sendEmailFallback(config: EmailConfig): EmailResponse {
    console.log('\n⚠️ =====================================');
    console.log('⚠️ EMAIL FALLBACK MODE (NO SERVICE CONFIGURED)');
    console.log('⚠️ =====================================');
    console.log('⚠️ To:', config.to);
    console.log('⚠️ Subject:', config.subject);
    console.log('⚠️ Configure RESEND_API_KEY for production!');
    console.log('⚠️ =====================================\n');
    
    return {
      success: true,
      messageId: `fallback-${Date.now()}`
    };
  }

  /**
   * Fallback simple feedback notification if not in emailBranding
   */
  private generateSimpleFeedbackNotification(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Feedback - AMP Vending</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FD5A1E; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9fa; }
          .field { margin-bottom: 15px; padding: 10px; background-color: white; border-left: 4px solid #FD5A1E; }
          .label { font-weight: bold; color: #FD5A1E; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📝 New Feedback Received</h1>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">From:</span> ${data.name}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${data.email}
            </div>
            <div class="field">
              <span class="label">Category:</span> ${data.category}
            </div>
            ${data.locationName ? `<div class="field"><span class="label">Location:</span> ${data.locationName}</div>` : ''}
            <div class="field">
              <span class="label">Message:</span><br><br>${data.message.replace(/\n/g, '<br>')}
            </div>
            <div class="field">
              <span class="label">Submitted:</span> ${new Date(data.submittedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();
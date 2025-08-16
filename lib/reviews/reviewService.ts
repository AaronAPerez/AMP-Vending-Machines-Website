// lib/reviews/reviewService.ts - Fixed TypeScript errors

import { emailService } from '../services/emailService';

export type ServiceType = 'installation' | 'maintenance' | 'consultation' | 'repair' | 'restocking';
export type TimeFrame = 'day' | 'week' | 'month' | 'quarter' | 'year';

interface ReviewMetrics {
  timeFrame: TimeFrame;
  totalRequests: number;
  reviewsReceived: number;
  averageRating: number;
  responseRate: number;
}

interface ReviewRequestData {
  customer: {
    name: string;
    email: string;
  };
  serviceType: ServiceType;
  serviceDate: string;
  machineModel?: string;
}

export class ReviewService {
  verifyWebhookSignature(arg0: string, signature: string) {
    throw new Error("Method not implemented.");
  }
  handleNewReview(review: any) {
    throw new Error("Method not implemented.");
  }
  handleUpdatedReview(review: any) {
    throw new Error("Method not implemented.");
  }
  async sendReviewRequest(data: ReviewRequestData): Promise<{ success: boolean; error?: string }> {
    try {
      // Create email data
      const emailData = {
        customerName: data.customer.name,
        serviceType: data.serviceType,
        serviceDate: data.serviceDate,
        machineModel: data.machineModel,
        reviewUrl: process.env.GOOGLE_REVIEW_URL || '#'
      };

      // Use a basic email template since reviewRequest doesn't exist in emailTemplates
      const emailContent = this.generateReviewRequestEmail(emailData);

      const result = await emailService.sendEmail({
        to: data.customer.email,
        subject: `How was your ${data.serviceType} experience with AMP Vending?`,
        html: emailContent,
        from: process.env.FROM_EMAIL || 'AMP Vending <noreply@ampvendingmachines.com>'
      });

      return result;
    } catch (error) {
      console.error('Failed to send review request:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  async getReviewMetrics(options: { timeFrame?: TimeFrame } = {}): Promise<ReviewMetrics> {
    const timeFrame: TimeFrame = options.timeFrame || 'month';
    
    // Placeholder implementation
    return {
      timeFrame,
      totalRequests: 0,
      reviewsReceived: 0,
      averageRating: 0,
      responseRate: 0
    };
  }

  async sendThankYou(request: { customer: { name: string; email: string } }, reviewData: { rating: number }): Promise<{ success: boolean; error?: string }> {
    try {
      const emailContent = this.generateThankYouEmail(request.customer, reviewData.rating);

      const result = await emailService.sendEmail({
        to: request.customer.email,
        subject: `Thank you for your review, ${request.customer.name}!`,
        html: emailContent,
        from: process.env.FROM_EMAIL || 'AMP Vending <noreply@ampvendingmachines.com>'
      });

      return result;
    } catch (error) {
      console.error('Failed to send thank you email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  getServiceMessage(serviceType: ServiceType): string {
    const serviceMessages: Record<ServiceType, string> = {
      installation: 'Thank you for choosing AMP Vending for your installation needs.',
      maintenance: 'We appreciate your business and hope our maintenance service exceeded your expectations.',
      consultation: 'Thank you for allowing us to consult with you on your vending needs.',
      repair: 'We hope our repair service resolved your issue completely.',
      restocking: 'Thank you for using our restocking service.'
    };

    return serviceMessages[serviceType] || serviceMessages.consultation;
  }

  private generateReviewRequestEmail(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>How was your experience with AMP Vending?</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FD5A1E; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9fa; }
          .cta-button { 
            display: inline-block; 
            background-color: #FD5A1E; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⭐ How was your experience?</h1>
          </div>
          <div class="content">
            <p>Dear ${data.customerName},</p>
            <p>${this.getServiceMessage(data.serviceType as ServiceType)}</p>
            <p>We would greatly appreciate it if you could take a moment to share your experience by leaving us a review.</p>
            <div style="text-align: center;">
              <a href="${data.reviewUrl}" class="cta-button">⭐ Leave a Review</a>
            </div>
            <p>Thank you for choosing AMP Vending!</p>
            <p>Best regards,<br>The AMP Vending Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateThankYouEmail(customer: { name: string }, rating: number): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for your review!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FD5A1E; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9fa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🙏 Thank You!</h1>
          </div>
          <div class="content">
            <p>Dear ${customer.name},</p>
            <p>Thank you for taking the time to leave us a ${rating}-star review! Your feedback is invaluable to us.</p>
            <p>We appreciate your business and look forward to serving you again in the future.</p>
            <p>Best regards,<br>The AMP Vending Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const reviewService = new ReviewService();

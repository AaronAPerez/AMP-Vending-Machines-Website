/**
 * Updated Professional Email Templates for AMP Vending
 * Consistent branding and professional appearance across all communications
 */

// Create types locally instead of importing from missing file
interface BusinessInfo {
  name: string;
  legalName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  website: string;
  logo: string;
  socialMedia?: {
    facebook?: string;
    linkedin?: string;
  };
}
// Create types locally instead of importing from missing file
interface BusinessInfo {
  name: string;
  legalName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  website: string;
  logo: string;
  socialMedia?: {
    facebook?: string;
    linkedin?: string;
  };
}

// Brand Constants
export const BRAND_COLORS = {
  primary: '#FD5A1E',      // AMP Orange
  secondary: '#F5F5F5',    // Light Gray
  dark: '#000000',         // Black
  accent: '#4d4d4d',       // Dark Gray
  success: '#22c55e',      // Green
  warning: '#eab308',      // Yellow
  error: '#ef4444'         // Red
} as const;

export const BUSINESS_INFO: BusinessInfo = {
  name: 'AMP Vending',
  legalName: 'AMP Design and Consulting LLC',
  address: {
    street: '4120 Dale Rd Ste J8 1005',
    city: 'Modesto',
    state: 'CA',
    zipCode: '95354'
  },
  phone: '(209) 403-5450',
  email: 'ampdesignandconsulting@gmail.com',
  website: 'https://www.ampvendingmachines.com',
  logo: 'https://www.ampvendingmachines.com/images/logo/AMP_logo.png',
  socialMedia: {
    // Add when available
    // facebook: 'https://facebook.com/ampvending',
    // linkedin: 'https://linkedin.com/company/amp-vending'
  }
};

// Define category types
type FeedbackCategory = 'Question' | 'Suggestion' | 'Compliment' | 'Complaint' | 'Technical Issue' | 'Product Request';
type ServiceType = 'installation' | 'maintenance' | 'consultation' | 'repair' | 'restocking' | 'upgrade' | 'training';

// Category emojis with proper typing
const categoryEmojis: Record<FeedbackCategory, string> = {
  'Question': '❓',
  'Suggestion': '💡',
  'Compliment': '👏',
  'Complaint': '⚠️',
  'Technical Issue': '🔧',
  'Product Request': '📦'
};

// Service type templates with proper typing
const serviceTemplates: Record<ServiceType, string> = {
  installation: 'Thank you for choosing AMP Vending for your installation needs.',
  maintenance: 'We appreciate your business and hope our maintenance service exceeded your expectations.',
  consultation: 'Thank you for allowing us to consult with you on your vending needs.',
  repair: 'We hope our repair service resolved your issue completely.',
  restocking: 'Thank you for using our restocking service.',
  upgrade: 'We hope you enjoy your upgraded vending solution.',
  training: 'Thank you for participating in our training program.'
};

// Color mapping with proper typing
const categoryColors: Record<FeedbackCategory, string> = {
  'Complaint': '#ef4444',
  'Technical Issue': '#eab308',
  'Question': '#FD5A1E',
  'Suggestion': '#22c55e',
  'Compliment': '#22c55e',
  'Product Request': '#FD5A1E'
};

/**
 * Base Email Template with Professional Branding
 */
export const generateEmailHTML = (
  content: string,
  preheader?: string,
  ctaButton?: { text: string; url: string; color?: string }
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>${BUSINESS_INFO.name}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, #e54d1a 100%);
            color: #ffffff;
            padding: 40px 20px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        
        .content {
            padding: 40px 20px;
        }
        
        .content h1 {
            color: ${BRAND_COLORS.dark};
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 20px 0;
            line-height: 1.2;
        }
        
        .content h2 {
            color: ${BRAND_COLORS.primary};
            font-size: 22px;
            font-weight: 600;
            margin: 30px 0 15px 0;
        }
        
        .content p {
            margin: 0 0 16px 0;
            font-size: 16px;
            color: #555555;
        }
        
        .cta-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .cta-button {
            display: inline-block;
            padding: 16px 32px;
            background-color: ${BRAND_COLORS.primary};
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid ${BRAND_COLORS.primary};
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .footer {
            background-color: ${BRAND_COLORS.dark};
            color: ${BRAND_COLORS.secondary};
            padding: 30px 20px;
            text-align: center;
        }
        
        .footer p {
            margin: 8px 0;
            font-size: 14px;
            color: #cccccc;
        }
        
        .footer a {
            color: ${BRAND_COLORS.primary};
            text-decoration: none;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            
            .content {
                padding: 30px 20px !important;
            }
            
            .content h1 {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body>
    ${preheader ? `
    <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #ffffff;">
        ${preheader}
    </div>
    ` : ''}
    
    <div class="email-container">
        <div class="header">
            <img src="${BUSINESS_INFO.logo}" alt="${BUSINESS_INFO.name}" style="max-height: 60px;">
        </div>
        
        <div class="content">
            ${content}
            
            ${ctaButton ? `
            <div class="cta-container">
                <a href="${ctaButton.url}" class="cta-button" style="background-color: ${ctaButton.color || BRAND_COLORS.primary};">
                    ${ctaButton.text}
                </a>
            </div>
            ` : ''}
        </div>
        
        <div class="footer">
            <div class="contact-info">
                <p><strong>${BUSINESS_INFO.name}</strong></p>
                <p>${BUSINESS_INFO.address.street}<br>
                ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.zipCode}</p>
                
                <p>📞 <a href="tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}">${BUSINESS_INFO.phone}</a></p>
                <p>✉️ <a href="mailto:${BUSINESS_INFO.email}">${BUSINESS_INFO.email}</a></p>
                <p>🌐 <a href="${BUSINESS_INFO.website}">${BUSINESS_INFO.website}</a></p>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #999999;">
                © ${new Date().getFullYear()} ${BUSINESS_INFO.legalName}. All rights reserved.<br>
                Premium Vending Solutions for Modern Workplaces
            </p>
        </div>
    </div>
</body>
</html>`;
};

/**
 * Contact Form Confirmation Email
 */
export const generateContactConfirmationEmail = (customerData: any): string => {
  const content = `
    <h1>Thank You for Contacting AMP Vending!</h1>
    
    <p>Dear ${customerData.firstName} ${customerData.lastName},</p>
    
    <p>Thank you for your interest in our premium vending solutions! We've received your inquiry and one of our vending specialists will contact you within <strong>24 hours</strong>.</p>
    
    <div class="info-box">
        <h2>📋 Your Inquiry Details</h2>
        <p><strong>Name:</strong> ${customerData.firstName} ${customerData.lastName}</p>
        <p><strong>Company:</strong> ${customerData.companyName}</p>
        <p><strong>Email:</strong> ${customerData.email}</p>
        ${customerData.phone ? `<p><strong>Phone:</strong> ${customerData.phone}</p>` : ''}
        ${customerData.message ? `<p><strong>Message:</strong> ${customerData.message}</p>` : ''}
    </div>
    
    <p>In the meantime, feel free to explore our vending machine solutions on our website.</p>
    
    <p>Best regards,<br>
    The AMP Vending Team</p>
  `;

  return generateEmailHTML(
    content,
    `Thank you for contacting AMP Vending, ${customerData.firstName}!`,
    {
      text: 'View Our Vending Machines',
      url: `${BUSINESS_INFO.website}/vending-machines`
    }
  );
};

/**
 * Feedback Form Confirmation Email
 */
export const generateFeedbackConfirmationEmail = (feedbackData: any): string => {
  const category = feedbackData.category as FeedbackCategory;
  const emoji = categoryEmojis[category] || '📝';
  const priorityColors = categoryColors as Record<string, string>;
  const categoryColor = priorityColors[category] || BRAND_COLORS.primary;

  const content = `
    <h1>${emoji} Thank You for Your Feedback!</h1>
    
    <p>Dear ${feedbackData.name},</p>
    
    <p>Thank you for taking the time to share your ${category.toLowerCase()} with us. Your feedback is valuable and helps us improve our services.</p>
    
    <div class="info-box" style="border-left-color: ${categoryColor};">
        <h2>📋 Your Feedback Summary</h2>
        <p><strong>Category:</strong> ${category}</p>
        ${feedbackData.locationName ? `<p><strong>Location:</strong> ${feedbackData.locationName}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date(feedbackData.submittedAt).toLocaleDateString()}</p>
    </div>
    
    <p>We will review your ${category.toLowerCase()} and respond within <strong>24-48 hours</strong>.</p>
    
    <p>Best regards,<br>
    The AMP Vending Team</p>
  `;

  return generateEmailHTML(
    content,
    `Thank you for your ${category.toLowerCase()}, ${feedbackData.name}!`
  );
};

/**
 * Contact Form Notification Email (for business)
 */
export const generateContactNotificationEmail = (customerData: any): string => {
  const content = `
    <h1>🔔 New Contact Form Submission</h1>
    
    <div class="info-box">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ${customerData.firstName} ${customerData.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${customerData.email}">${customerData.email}</a></p>
        ${customerData.phone ? `<p><strong>Phone:</strong> <a href="tel:${customerData.phone.replace(/[^0-9]/g, '')}">${customerData.phone}</a></p>` : ''}
        <p><strong>Company:</strong> ${customerData.companyName}</p>
        ${customerData.message ? `<p><strong>Message:</strong><br>${customerData.message.replace(/\n/g, '<br>')}</p>` : ''}
    </div>
    
    <div class="info-box">
        <h2>Submission Details</h2>
        <p><strong>Submitted:</strong> ${new Date(customerData.submittedAt).toLocaleString()}</p>
        <p><strong>Source:</strong> ${customerData.source}</p>
        <p><strong>IP Address:</strong> ${customerData.ipAddress}</p>
    </div>
    
    <p><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
  `;

  return generateEmailHTML(content);
};

/**
 * Feedback Form Notification Email (for business)
 */
export const generateFeedbackNotificationEmail = (feedbackData: any): string => {
  const category = feedbackData.category as FeedbackCategory;
  const emoji = categoryEmojis[category] || '📝';
  const priorityColors = categoryColors as Record<string, string>;
  const categoryColor = priorityColors[category] || BRAND_COLORS.primary;
  const isUrgent = ['Complaint', 'Technical Issue'].includes(category);

  const content = `
    <h1>${emoji} ${isUrgent ? '🚨 URGENT - ' : ''}New ${category}</h1>
    
    <div class="info-box" style="border-left-color: ${categoryColor};">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ${feedbackData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${feedbackData.email}">${feedbackData.email}</a></p>
        <p><strong>Category:</strong> ${category}</p>
        ${feedbackData.locationName ? `<p><strong>Location:</strong> ${feedbackData.locationName}</p>` : ''}
    </div>
    
    <div class="info-box">
        <h2>Feedback Message</h2>
        <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${feedbackData.message}</p>
    </div>
    
    <div class="info-box">
        <h2>Submission Details</h2>
        <p><strong>Feedback ID:</strong> ${feedbackData.id}</p>
        <p><strong>Submitted:</strong> ${new Date(feedbackData.submittedAt).toLocaleString()}</p>
        <p><strong>Source:</strong> ${feedbackData.source}</p>
    </div>
    
    <p><strong>Priority:</strong> ${isUrgent ? '🚨 HIGH - Respond within 4 hours' : '📝 Normal - Respond within 24-48 hours'}</p>
  `;

  return generateEmailHTML(content);
};

/**
 * Review Request Email
 */
export const generateReviewRequestEmail = (data: any): string => {
  const serviceType = data.serviceType as ServiceType;
  const serviceMessage = serviceTemplates[serviceType] || serviceTemplates.consultation;

  const content = `
    <h1>⭐ How was your experience with AMP Vending?</h1>
    
    <p>Dear ${data.customerName},</p>
    
    <p>${serviceMessage}</p>
    
    <p>We would greatly appreciate it if you could take a moment to share your experience by leaving us a review. Your feedback helps us continue to provide excellent service and helps other businesses make informed decisions.</p>
    
    <div class="info-box">
        <h2>📋 Service Summary</h2>
        <p><strong>Service Type:</strong> ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
        <p><strong>Date:</strong> ${new Date(data.serviceDate).toLocaleDateString()}</p>
        ${data.machineModel ? `<p><strong>Machine:</strong> ${data.machineModel}</p>` : ''}
    </div>
    
    <p>Leaving a review only takes a minute and would mean the world to us!</p>
    
    <p>Thank you for choosing AMP Vending!</p>
    
    <p>Best regards,<br>
    The AMP Vending Team</p>
  `;

  return generateEmailHTML(
    content,
    `How was your ${serviceType} experience with AMP Vending?`,
    {
      text: '⭐ Leave a Review',
      url: data.reviewUrl || process.env.GOOGLE_REVIEW_URL || '#'
    }
  );
};

/**
 * Export all template generators
 */
export const emailTemplates = {
  contactConfirmation: generateContactConfirmationEmail,
  feedbackConfirmation: generateFeedbackConfirmationEmail,
  contactNotification: generateContactNotificationEmail,
  feedbackNotification: generateFeedbackNotificationEmail,
  reviewRequest: generateReviewRequestEmail
};

/**
 * Email utility functions
 */
export const emailUtils = {
  generateEmailHTML,
  BRAND_COLORS,
  BUSINESS_INFO
};
/**
 * Review Generation System Types
 * Comprehensive type definitions for the review system
 */

// Core Review System Types
export interface ReviewCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceType: ServiceType;
  serviceDate: Date;
  satisfactionLevel: number; // 1-5 stars
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewRequest {
  id: string;
  customerId: string;
  customer: ReviewCustomer;
  templateId: string;
  emailSubject: string;
  emailContent: string;
  scheduledDate?: Date;
  sentDate?: Date;
  status: ReviewRequestStatus;
  responseDate?: Date;
  reviewUrl?: string;
  reviewRating?: number;
  reviewContent?: string;
  followUpCount: number;
  lastFollowUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceType = 
  | 'installation'
  | 'maintenance' 
  | 'consultation'
  | 'repair'
  | 'restocking'
  | 'upgrade'
  | 'training';

export type ReviewRequestStatus = 
  | 'draft'
  | 'scheduled'
  | 'sent'
  | 'opened'
  | 'clicked'
  | 'reviewed'
  | 'declined'
  | 'bounced'
  | 'expired';

export interface ReviewTemplate {
  id: string;
  name: string;
  serviceType: ServiceType;
  subject: string;
  htmlContent: string;
  textContent: string;
  isActive: boolean;
  variables: TemplateVariable[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateVariable {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'boolean';
  required: boolean;
  defaultValue?: string;
}

// Analytics and Metrics
export interface ReviewMetrics {
  totalRequests: number;
  sentRequests: number;
  openedRequests: number;
  clickedRequests: number;
  reviewsReceived: number;
  averageRating: number;
  responseRate: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  timeFrame: 'day' | 'week' | 'month' | 'quarter' | 'year';
  periodStart: Date;
  periodEnd: Date;
}

export interface ReviewAnalytics {
  metrics: ReviewMetrics;
  trendData: TrendDataPoint[];
  serviceTypeBreakdown: ServiceTypeMetrics[];
  satisfactionLevelBreakdown: SatisfactionMetrics[];
  recentActivity: ReviewActivity[];
}

export interface TrendDataPoint {
  date: Date;
  requests: number;
  reviews: number;
  averageRating: number;
}

export interface ServiceTypeMetrics {
  serviceType: ServiceType;
  totalRequests: number;
  reviewsReceived: number;
  averageRating: number;
  responseRate: number;
}

export interface SatisfactionMetrics {
  satisfactionLevel: number;
  customerCount: number;
  requestsSent: number;
  reviewsReceived: number;
  responseRate: number;
}

export interface ReviewActivity {
  id: string;
  type: 'request_sent' | 'email_opened' | 'link_clicked' | 'review_received' | 'follow_up_sent';
  customerName: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Configuration and Settings
export interface ReviewSystemConfig {
  enabled: boolean;
  autoSendEnabled: boolean;
  autoSendDelay: number; // days after service
  minSatisfactionLevel: number; // minimum stars to send request
  maxFollowUps: number;
  followUpInterval: number; // days between follow-ups
  reviewLinkExpiration: number; // days
  googleReviewUrl: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  emailSignature: string;
}

// Email System Integration
export interface ReviewEmailData {
  customer: ReviewCustomer;
  businessInfo: BusinessInfo;
  reviewLink: string;
  unsubscribeLink: string;
  customVariables?: Record<string, string>;
}

export interface BusinessInfo {
  name: string;
  legalName?: string;
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
    instagram?: string;
  };
}

// API Response Types
export interface ReviewAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Form Data Types
export interface ReviewRequestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceType: ServiceType;
  serviceDate: Date;
  satisfactionLevel: number;
  notes?: string;
  sendImmediately: boolean;
  scheduledDate?: Date;
}

export interface ReviewTemplateFormData {
  name: string;
  serviceType: ServiceType;
  subject: string;
  htmlContent: string;
  textContent: string;
  isActive: boolean;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Google Business Profile Integration
export interface GoogleReviewData {
  reviewId: string;
  authorName: string;
  rating: number;
  text: string;
  publishTime: Date;
  relativePublishTimeDescription: string;
  authorPhotoUrl?: string;
  isLocalGuide?: boolean;
  reviewerNumberOfReviews?: number;
}

export interface GoogleBusinessMetrics {
  averageRating: number;
  totalReviews: number;
  ratingsBreakdown: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
  recentReviews: GoogleReviewData[];
  insights?: {
    searchViews: number;
    mapViews: number;
    photoViews: number;
    callClicks: number;
    websiteClicks: number;
  };
}

// Compliance and Ethics
export interface ComplianceCheck {
  customerId: string;
  checks: {
    satisfactionThreshold: boolean;
    recentRequest: boolean;
    maxFollowUps: boolean;
    emailValidity: boolean;
    unsubscribeStatus: boolean;
  };
  canSendRequest: boolean;
  reasons: string[];
  recommendations: string[];
}

export interface EthicsGuidelines {
  title: string;
  description: string;
  requirements: string[];
  violations: string[];
  examples: {
    good: string[];
    bad: string[];
  };
}

// System Health and Monitoring
export interface SystemHealth {
  status: 'healthy' | 'warning' | 'error';
  uptime: number;
  emailServiceStatus: 'operational' | 'degraded' | 'down';
  databaseStatus: 'connected' | 'connecting' | 'disconnected';
  lastEmailSent: Date;
  pendingRequests: number;
  errorRate: number;
  averageResponseTime: number;
}

// Export utility type helpers
export type ReviewRequestWithCustomer = ReviewRequest & {
  customer: ReviewCustomer;
};

export type ReviewMetricsWithTrends = ReviewMetrics & {
  trends: TrendDataPoint[];
};

// Constants
export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  installation: 'Vending Machine Installation',
  maintenance: 'Maintenance Service',
  consultation: 'Free Consultation',
  repair: 'Equipment Repair',
  restocking: 'Product Restocking',
  upgrade: 'System Upgrade',
  training: 'Staff Training'
};

export const REVIEW_STATUS_LABELS: Record<ReviewRequestStatus, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  sent: 'Sent',
  opened: 'Opened',
  clicked: 'Clicked',
  reviewed: 'Reviewed',
  declined: 'Declined',
  bounced: 'Bounced',
  expired: 'Expired'
};

export const SATISFACTION_LEVELS = [
  { value: 1, label: 'Very Dissatisfied', color: '#ef4444' },
  { value: 2, label: 'Dissatisfied', color: '#f97316' },
  { value: 3, label: 'Neutral', color: '#eab308' },
  { value: 4, label: 'Satisfied', color: '#22c55e' },
  { value: 5, label: 'Very Satisfied', color: '#16a34a' }
] as const;


export interface ReviewMetrics {
  timeFrame: TimeFrame;
  totalRequests: number;
  reviewsReceived: number;
  averageRating: number;
  responseRate: number;
}

export interface ReviewRequestData {
  customer: ReviewCustomer;
  serviceType: ServiceType;
  serviceDate: string;
  machineModel?: string;
}

// Additional types for review system
export type TimeFrame = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface ReviewMetrics {
  timeFrame: TimeFrame;
  totalRequests: number;
  reviewsReceived: number;
  averageRating: number;
  responseRate: number;
}

export interface ReviewRequestData {
  customer: ReviewCustomer;
  serviceType: ServiceType;
  serviceDate: string;
  machineModel?: string;
}

/**
 * Google Analytics Event Tracking Utilities
 * Use these functions throughout your app to track user interactions
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Track page views
 */
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID as string, {
      page_path: url,
    });
  }
};

/**
 * Track custom events
 * 
 * @example
 * event({
 *   action: 'contact_form_submit',
 *   category: 'engagement',
 *   label: 'Contact Page',
 *   value: 1,
 * });
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track phone calls
 */
export const trackPhoneCall = () => {
  event({
    action: 'phone_call',
    category: 'engagement',
    label: 'Phone Number Click',
    value: 1,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string) => {
  event({
    action: 'form_submission',
    category: 'conversion',
    label: formName,
    value: 1,
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'button_click',
    category: 'engagement',
    label: `${buttonName} - ${location}`,
  });
};

/**
 * Track quote requests
 */
export const trackQuoteRequest = (source: string) => {
  event({
    action: 'quote_request',
    category: 'conversion',
    label: source,
    value: 1,
  });
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
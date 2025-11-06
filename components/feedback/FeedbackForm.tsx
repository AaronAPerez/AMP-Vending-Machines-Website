'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { trackFormSubmission, trackPhoneCall } from '@/lib/analytics/gtag';

/**
 * Feedback Categories - Centralized for consistency
 */
const FEEDBACK_CATEGORIES = [
  'Question',
  'Suggestion', 
  'Compliment',
  'Complaint',
  'Technical Issue',
  'Product Request'
] as const;

/**
 * Feedback Form Schema - Client-side validation
 */
const feedbackFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  category: z.enum(FEEDBACK_CATEGORIES),
  locationName: z.string().max(200, 'Location name is too long').optional(),
  // machineId: z.string().max(50, 'Machine ID is too long').optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long (max 2000 characters)'),
  contactConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted'
  })
});

/**
 * TypeScript type for form data
 */
type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

/**
 * Props for the FeedbackForm component
 */
interface FeedbackFormProps {
  className?: string;
  onSubmitSuccess?: () => void;
}

/**
 * Enhanced FeedbackForm Component
 * 
 * Features:
 * - Robust form validation with real-time feedback
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Progressive enhancement
 * - Error handling with fallback options
 * - Loading states and user feedback
 * - Character counting for text areas
 */
export default function FeedbackForm({ className = '', onSubmitSuccess }: FeedbackFormProps) {
  // Form state management
  const [formData, setFormData] = useState<Partial<FeedbackFormData>>({
    category: 'Question',
    contactConsent: false
  });
  
  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Character count for message field
  const messageLength = formData.message?.length || 0;
  const maxMessageLength = 2000;

  /**
   * Handle input field changes with real-time validation
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Real-time validation for specific fields
    if (name === 'email' && value) {
      const emailValidation = z.string().email().safeParse(value);
      if (!emailValidation.success) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }
  };

  /**
   * Handle checkbox changes
   */
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear error when checkbox is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Validate entire form before submission
   */
  const validateForm = (): boolean => {
    try {
      feedbackFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path && err.path.length > 0 && err.path[0] !== undefined) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        
        // Focus on first error field for accessibility
        const firstErrorField = Object.keys(newErrors)[0];
        if (firstErrorField) {
          const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
          element?.focus();
        }
      }
      return false;
    }
  };

  /**
   * Fallback submission method for development/testing
   */
  const submitFallback = async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log feedback data for development
    console.log('📝 Feedback Submission (Fallback Mode):', formData);
    
    // Show success message
    toast.success('Thank you for your feedback! (Development Mode - No email sent)');
    
    return Promise.resolve();
  };

  /**
   * Handle form submission with comprehensive error handling
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!validateForm()) {
      toast.error('Please fix the errors below before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    const loadingToast = toast.loading('Submitting your feedback...');
    
    try {
      // Attempt API submission
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // Add timeout for better UX
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      const result = await response.json();
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`);
      }
      
      // Success handling
      toast.success('Thank you! Your feedback has been submitted successfully.');
      setSubmissionStatus('success');
      trackFormSubmission('Feedback Form');

      // Reset form
      setFormData({
        category: 'Question',
        contactConsent: false
      });
      setErrors({});

      // Call success callback
      onSubmitSuccess?.();
      
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.dismiss(loadingToast);
      
      // Handle different error types
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          toast.error('Request timed out. Please try again.');
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          // Network error - offer fallback or direct contact
          toast.error(
            <div>
              <p>Unable to submit online. Please contact us directly:</p>
              <p><strong>Email:</strong> ampdesignandconsulting@gmail.com</p>
              <p><strong>Phone:</strong> (209) 403-5450</p>
            </div>,
            { duration: 8000 }
          );
        } else {
          toast.error('Failed to submit feedback. Please try again or contact us directly.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset submission status after delay
      setTimeout(() => {
        setSubmissionStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className={`bg-[#000000] text-[#F5F5F5] ${className}`}>
      <div className="max-w-3xl mx-auto p-6 rounded-lg border border-[#a4acac] bg-[#4d4d4d]/30">
        {/* Form Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[#F5F5F5]" id="feedback-form-heading">
            Share Your Feedback
          </h2>
          <p className="text-[#A5ACAF] mt-2">
            We value your input about our vending machines and service
          </p>
        </div>
        
        {/* Success/Error Status Messages */}
        {submissionStatus === 'success' && (
          <div 
            className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400"
            role="alert"
            aria-live="polite"
          >
            <p className="font-medium">✅ Thank you for your feedback!</p>
            <p className="text-sm mt-1">We appreciate your input and will use it to improve our services.</p>
          </div>
        )}
        
        {submissionStatus === 'error' && (
          <div 
            className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400"
            role="alert"
            aria-live="polite"
          >
            <p className="font-medium">❌ Submission Failed</p>
            <p className="text-sm mt-1">
              Please try again or contact us directly at{' '}
              <a 
                href="mailto:ampdesignandconsulting@gmail.com" 
                className="underline hover:text-red-300"
              >
                ampdesignandconsulting@gmail.com
              </a>
            </p>
          </div>
        )}
        
        {/* Main Feedback Form */}
        <form 
          onSubmit={handleSubmit}
          aria-labelledby="feedback-form-heading"
          className="space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-[#F5F5F5] mb-1 font-medium">
                Your Name <span className="text-[#FD5A1E]" aria-label="required">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={handleChange}
                className={`w-full rounded-md bg-[#000000] border ${
                  errors.name ? 'border-red-500' : 'border-[#a4acac]'
                } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] transition-colors`}
                placeholder="Enter your full name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                maxLength={100}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-red-500 text-sm" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[#F5F5F5] mb-1 font-medium">
                Email Address <span className="text-[#FD5A1E]" aria-label="required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                className={`w-full rounded-md bg-[#000000] border ${
                  errors.email ? 'border-red-500' : 'border-[#a4acac]'
                } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] transition-colors`}
                placeholder="your.email@example.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-500 text-sm" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            
            {/* Feedback Category */}
            <div>
              <label htmlFor="category" className="block text-[#F5F5F5] mb-1 font-medium">
                Feedback Type <span className="text-[#FD5A1E]" aria-label="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || 'Question'}
                onChange={handleChange}
                className="w-full rounded-md bg-[#000000] border border-[#a4acac] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] transition-colors"
                aria-required="true"
              >
                {FEEDBACK_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Machine Location (Optional) */}
            <div>
              <label htmlFor="locationName" className="block text-[#F5F5F5] mb-1 font-medium">
                Vending Machine Location
                <span className="text-[#A5ACAF] text-sm ml-1">(Optional)</span>
              </label>
              <input
                id="locationName"
                name="locationName"
                type="text"
                value={formData.locationName || ''}
                onChange={handleChange}
                placeholder="e.g., Company name or building"
                className="w-full rounded-md bg-[#000000] border border-[#a4acac] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] transition-colors"
                maxLength={200}
              />
              <p className="mt-1 text-[#A5ACAF] text-xs">
                Help us identify the location of the machine
              </p>
            </div>
          </div>
          
          {/* Machine ID (Optional) */}
          {/* <div>
            <label htmlFor="machineId" className="block text-[#F5F5F5] mb-1 font-medium">
              Machine ID Number
              <span className="text-[#A5ACAF] text-sm ml-1">(Optional)</span>
            </label>
            <input
              id="machineId"
              name="machineId"
              type="text"
              value={formData.machineId || ''}
              onChange={handleChange}
              placeholder="e.g., AMP-123 (found on the front of the machine)"
              className="w-full rounded-md bg-[#000000] border border-[#a4acac] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] transition-colors"
              maxLength={50}
            />
            <p className="mt-1 text-[#A5ACAF] text-xs">
              The ID number helps us identify the specific machine
            </p>
          </div> */}
          
          {/* Feedback Message */}
          <div>
            <label htmlFor="message" className="block text-[#F5F5F5] mb-1 font-medium">
              Your Feedback <span className="text-[#FD5A1E]" aria-label="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message || ''}
              onChange={handleChange}
              className={`w-full rounded-md bg-[#000000] border ${
                errors.message ? 'border-red-500' : 'border-[#a4acac]'
              } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E] transition-colors resize-vertical`}
              placeholder="Please share your experience, suggestion, or question..."
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : "message-help"}
              maxLength={maxMessageLength}
            />
            <div className="mt-1 flex justify-between items-center">
              {errors.message ? (
                <p id="message-error" className="text-red-500 text-sm" role="alert">
                  {errors.message}
                </p>
              ) : (
                <p id="message-help" className="text-[#A5ACAF] text-xs">
                  Minimum 10 characters required
                </p>
              )}
              <span 
                className={`text-xs ${
                  messageLength > maxMessageLength * 0.9 ? 'text-yellow-400' : 'text-[#A5ACAF]'
                }`}
                aria-live="polite"
              >
                {messageLength}/{maxMessageLength}
              </span>
            </div>
          </div>
          
          {/* Consent Checkbox */}
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                id="contactConsent"
                name="contactConsent"
                type="checkbox"
                checked={formData.contactConsent || false}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#FD5A1E] bg-[#000000] border-[#a4acac] rounded focus:ring-[#FD5A1E] focus:ring-2"
                aria-required="true"
                aria-invalid={!!errors.contactConsent}
                aria-describedby={errors.contactConsent ? "consent-error" : "consent-help"}
              />
            </div>
            <div className="text-sm">
              <label htmlFor="contactConsent" className="text-[#F5F5F5] cursor-pointer">
                I consent to being contacted regarding my feedback{' '}
                <span className="text-[#FD5A1E]" aria-label="required">*</span>
              </label>
              <p id="consent-help" className="text-[#A5ACAF] text-xs mt-1">
                We&apos;ll only use your contact information to respond to your feedback
              </p>
              {errors.contactConsent && (
                <p id="consent-error" className="text-red-500 text-xs mt-1" role="alert">
                  {errors.contactConsent}
                </p>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#000000] disabled:opacity-70 disabled:cursor-not-allowed"
              aria-disabled={isSubmitting}
              aria-describedby="submit-help"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Feedback'
              )}
            </button>
            <p id="submit-help" className="mt-2 text-[#A5ACAF] text-xs text-center">
              We&apos;ll respond within 24-48 hours
            </p>
          </div>
          
          {/* Privacy Note */}
          <div className="text-center text-[#A5ACAF] text-sm bg-[#111111] rounded-lg p-4 border border-[#333333]">
            <p>
              🔒 Your feedback helps us improve. We&apos;ll only use your contact information 
              to respond to your feedback and will never share it with third parties.
            </p>
          </div>
        </form>
      </div>
      
      {/* Alternative Contact Methods */}
      <div className="mt-8 text-center">
        <p className="text-[#A5ACAF] text-sm mb-4">
          Having trouble submitting? Contact us directly:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:ampdesignandconsulting@gmail.com?subject=Feedback%20from%20Website"
            className="inline-flex items-center px-4 py-2 bg-[#111111] text-[#F5F5F5] rounded-full hover:bg-[#222222] transition-colors border border-[#333333] text-sm"
            aria-label="Email us your feedback"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
            Email Your Feedback
          </a>
          
          <a
            href="tel:+12094035450"
            onClick={() => trackPhoneCall()}
            className="inline-flex items-center px-4 py-2 bg-[#111111] text-[#F5F5F5] rounded-full hover:bg-[#222222] transition-colors border border-[#333333] text-sm"
            aria-label="Call us at (209) 403-5450"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
            Call (209) 403-5450
          </a>
        </div>
      </div>
    </div>
  );
}

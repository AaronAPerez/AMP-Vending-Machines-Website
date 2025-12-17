"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import Card from '../ui/core/Card';
import Text from '../ui/Text';
import { trackFormSubmission, trackPhoneCall } from '@/lib/analytics/gtag';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { Send } from 'lucide-react';

interface ContactFormProps {
  className?: string;
}
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
}









export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');



  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors below before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    const loadingToast = toast.loading('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();

      toast.dismiss(loadingToast);

      if (result.success) {
        setSubmitStatus('success');
        toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
        trackFormSubmission('Contact Form');
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          message: '',
        });

        // Reset status after delay
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.dismiss(loadingToast);
      setSubmitStatus('error');

      // Handle different error types
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          toast.error('Request timed out. Please try again or call us at (209) 403-5450.');
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          toast.error(
            'Unable to submit online. Please contact us directly at ampdesignandconsulting@gmail.com or (209) 403-5450.',
            { duration: 8000 }
          );
        } else {
          toast.error('Failed to submit. Please try again or contact us directly.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }

      // Reset status after delay
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      variant="default"
      className={`overflow-hidden shadow-2xl bg-black ${className}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Form Column */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
          <Text variant="h3" className="mb-4 text-left">
            Contact Us
          </Text>
          <Text variant="body" color="muted" className="mb-6 text-left">
            Fill out the form and our team will get back to you within 24 hours to discuss your premium vending needs.
          </Text>

          {/* FIXED: Added role="form" and proper ARIA labeling */}
          <form
            role="form"
            aria-labelledby="contact-form-heading"
            className="space-y-4"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div
                role="alert"
                className="p-4 bg-green-900/50 border border-green-600 rounded-lg text-green-200"
              >
                Thank you! Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div
                role="alert"
                className="p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-200"
              >
                Sorry, there was an error sending your message. Please try again or contact us directly.
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-white text-sm font-medium mb-1 text-left"
                  htmlFor="firstName"
                >
                  First Name <span className="text-[#FD5A1E]">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  placeholder="Your first name"
                  className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none"
                />
                {errors.firstName && (
                  <p id="firstName-error" role="alert" className="mt-1 text-red-400 text-sm">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-white text-sm font-medium mb-1 text-left"
                  htmlFor="lastName"
                >
                  Last Name <span className="text-[#FD5A1E]">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  placeholder="Your last name"
                  className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none"
                />
                {errors.lastName && (
                  <p id="lastName-error" role="alert" className="mt-1 text-red-400 text-sm">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-white text-sm font-medium mb-1 text-left"
                htmlFor="email"
              >
                Email Address <span className="text-[#FD5A1E]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="you@company.com"
                className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1 text-red-400 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label
                className="block text-white text-sm font-medium mb-1 text-left"
                htmlFor="phone"
              >
                Phone Number <span className="text-[#A5ACAF]">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                aria-describedby="phone-help"
                placeholder="(123) 456-7890"
                className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none"
              />
              <p id="phone-help" className="mt-1 text-[#A5ACAF] text-xs">
                Optional: For faster response times
              </p>
            </div>

            {/* Company Name Field */}
            <div>
              <label
                className="block text-white text-sm font-medium mb-1 text-left"
                htmlFor="companyName"
              >
                Company Name <span className="text-[#FD5A1E]">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.companyName}
                aria-describedby={errors.companyName ? "companyName-error" : undefined}
                placeholder="Your company"
                className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none"
              />
              {errors.companyName && (
                <p id="companyName-error" role="alert" className="mt-1 text-red-400 text-sm">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                className="block text-white text-sm font-medium mb-1 text-left"
                htmlFor="message"
              >
                Message <span className="text-[#A5ACAF]">(Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                aria-describedby="message-help"
                placeholder="Tell us about your location and vending needs"
                className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none resize-vertical"
              />
              <p id="message-help" className="mt-1 text-[#A5ACAF] text-xs">
                Tell us about your location and vending needs
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <AccessibleButton
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                loadingText="Sending..."
                disabled={isSubmitting}
                rightIcon={<Send size={18} />}
                animate
                aria-describedby="submit-help"
                className="w-full sm:w-auto"
              >
                Request Information
              </AccessibleButton>
              <p id="submit-help" className="mt-2 text-[#A5ACAF] text-xs">
                We&apos;ll respond within 24 hours
              </p>
            </div>
          </form>
        </div>

        {/* Contact Info Column */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#FD5A1E]/20 to-black relative p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center text-left">
          <Text variant="h3" className="mb-8 text-left">
            Contact Information
          </Text>

          <div className="space-y-6">
            {/* Contact items */}
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-[#FD5A1E]/10 rounded-full text-[#FD5A1E] mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <Text variant="body-sm" color="default" className="font-medium">Phone</Text>

                <a href="tel:+12094035450"
                  onClick={() => trackPhoneCall()}
                  className="text-[#A5ACAF] hover:text-[#FD5A1E] text-sm sm:text-base transition-colors focus:outline-none focus:text-[#FD5A1E]"
                  aria-label="Call us at (209) 403-5450"
                >
                  (209) 403-5450
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-[#FD5A1E]/10 rounded-full text-[#FD5A1E] mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <Text variant="body-sm" color="default" className="font-medium">Email</Text>
                {/* Email with overflow-wrap for better breaking */}
                <a
                  href="mailto:ampdesignandconsulting@gmail.com"
                  className="block hover:text-[#FD5A1E] transition-colors text-[#A5ACAF]"
                  style={{
                    wordBreak: 'break-all',      // CSS property for aggressive breaking
                    overflowWrap: 'break-word',  // More intelligent word breaking
                    hyphens: 'auto'              // Add hyphens where appropriate
                  }}
                >
                  ampdesignandconsulting@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-[#FD5A1E]/10 rounded-full text-[#FD5A1E] mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <Text variant="body-sm" color="default" className="font-medium">Location</Text>
                <p className="text-[#A5ACAF] text-sm sm:text-base">Modesto, CA 95354</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            {/* Left-aligned heading */}
            <h3 className="text-xl font-bold text-white mb-4 text-left">Business Hours</h3>
            <p className="text-[#A5ACAF]">
              Monday - Friday: 8AM - 8PM<br />
              Saturday - Sunday: 8AM - 8PM
            </p>
            <p className="text-[#FD5A1E] mt-2 font-medium">Professional Support Available</p>
          </div>

          {/* Value Proposition */}
          <div className="mt-8 p-4 bg-[#000000]/50 rounded-lg border border-[#FD5A1E]/20">
            <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2">Why Choose AMP Vending?</h4>
            <ul className="text-[#A5ACAF] text-sm space-y-1">
              <li>• 21.5&quot; HD touchscreen technology</li>
              <li>• Contactless payment systems</li>
              <li>• 50+ customizable product options</li>
              <li>• Professional installation & maintenance</li>
              <li>• Enhanced employee satisfaction</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}




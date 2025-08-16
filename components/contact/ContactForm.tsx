"use client";

import { useState } from 'react';

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

export default function ContactForm() {
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
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          message: '',
        });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#111111] border border-[#333333] p-4 sm:p-6 overflow-hidden shadow-2xl bg-black">
      <div className="flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
          <h3
            id="contact-form-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#F5F5F5] mb-4 text-left"
          >
            Ready to Enhance Your Workplace?
          </h3>
          
          <p className="text-base sm:text-lg leading-relaxed text-[#A5ACAF] mb-6 text-left">
            Fill out the form and our team will get back to you within 24 hours to discuss your premium vending needs.
          </p>

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
                Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
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
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                aria-describedby="submit-help"
                className="w-full sm:w-auto px-6 py-3 bg-[#FD5A1E] text-[#000000] font-medium rounded-xl shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
              >
                {isSubmitting ? 'Sending...' : 'Request Information'}
              </button>
              <p id="submit-help" className="mt-2 text-[#A5ACAF] text-xs">
                We'll respond within 24 hours
              </p>
            </div>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12 bg-[#1a1a1a] border-l border-[#333333]">
          <h3
            id="contact-info-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#F5F5F5] mb-8 text-left"
          >
            Contact Information
          </h3>

          {/* Phone */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2">Call Us</h4>
            <a
              href="tel:+12094035450"
              aria-label="Call us at (209) 403-5450"
              className="text-[#A5ACAF] hover:text-[#FD5A1E] text-sm sm:text-base transition-colors focus:outline-none focus:text-[#FD5A1E]"
            >
              (209) 403-5450
            </a>
          </div>

          {/* Email */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2">Email</h4>
            <a
              href="mailto:ampdesignandconsulting@gmail.com"
              className="block hover:text-[#FD5A1E] transition-colors text-[#A5ACAF]"
              style={{ wordBreak: 'break-all', overflowWrap: 'break-word', hyphens: 'auto' }}
            >
              ampdesignandconsulting@gmail.com
            </a>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2">Location</h4>
            <p className="text-[#A5ACAF] text-sm sm:text-base">
              Serving Modesto, CA and surrounding areas
            </p>
          </div>

          {/* Business Hours */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 text-left">
              Business Hours
            </h3>
            <ul className="text-[#A5ACAF] text-sm space-y-1">
              <li>
                <p className="text-sm leading-relaxed text-[#F5F5F5] font-medium">
                  Monday - Friday: 8:00 AM - 6:00 PM
                </p>
              </li>
              <li>
                <p className="text-sm leading-relaxed text-[#F5F5F5] font-medium">
                  Saturday: 9:00 AM - 4:00 PM
                </p>
              </li>
              <li>
                <p className="text-sm leading-relaxed text-[#F5F5F5] font-medium">
                  Sunday: Closed
                </p>
              </li>
              <li>
                <p className="text-[#A5ACAF] text-sm sm:text-base">
                  Emergency service available 24/7
                </p>
              </li>
              <li>
                <p className="text-[#A5ACAF]">
                  Response time: Within 24 hours
                </p>
              </li>
            </ul>
          </div>

          {/* Why Choose AMP */}
          <div>
            <h4 className="text-lg font-semibold text-[#F5F5F5] mb-2">
              Why Choose AMP Vending?
            </h4>
            <p className="text-[#A5ACAF] text-sm sm:text-base">
              Premium vending solutions with 24/7 support, fresh products, and customizable options for your workplace.
            </p>
            
            {submitStatus === 'error' && (
              <p className="text-[#FD5A1E] mt-2 font-medium">
                Having trouble with the form? Call us directly at (209) 403-5450
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



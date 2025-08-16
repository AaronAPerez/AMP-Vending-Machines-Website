'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import Card from '../ui/core/Card';
import Text from '../ui/Text';

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = '' }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form data using the validateForm function
    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || '',
        companyName: formData.companyName,
        message: formData.message || '',
      };

      const loadingToast = toast.loading('Sending your message...');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(result.error || 'Failed to send message. Please try again.');

        if (result.details) {
          const serverErrors = parseServerErrors(result.details);
          setErrors(serverErrors);
        }
      } else {
        toast.success('Thank you! Your message has been sent. Check your email for confirmation.');

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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
            Ready to Enhance Your Workplace?
          </Text>
          <Text variant="body" color="muted" className="mb-6 text-left">
            Fill out the form and our team will get back to you within 24 hours to discuss your premium vending needs.
          </Text>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Form fields remain the same */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-white text-sm font-medium mb-1 text-left">
                  First Name <span className="text-[#FD5A1E]">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.firstName ? 'border-red-500' : 'border-[#a4acac]'
                    } rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none`}
                  placeholder="Your first name"
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  required
                />
                {errors.firstName && (
                  <p id="firstName-error" className="mt-1 text-red-500 text-sm text-left" role="alert">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-white text-sm font-medium mb-1 text-left">
                  Last Name <span className="text-[#FD5A1E]">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.lastName ? 'border-red-500' : 'border-[#a4acac]'
                    } rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none`}
                  placeholder="Your last name"
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  required
                />
                {errors.lastName && (
                  <p id="lastName-error" className="mt-1 text-red-500 text-sm text-left" role="alert">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-1 text-left">
                Email Address <span className="text-[#FD5A1E]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.email ? 'border-red-500' : 'border-[#a4acac]'
                  } rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none`}
                placeholder="you@company.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-500 text-sm text-left" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-white text-sm font-medium mb-1 text-left">
                Phone Number <span className="text-[#A5ACAF]">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none"
                placeholder="(123) 456-7890"
                aria-describedby="phone-help"
              />
              <p id="phone-help" className="mt-1 text-[#A5ACAF] text-xs">
                Optional: For faster response times
              </p>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-white text-sm font-medium mb-1 text-left">
                Company Name <span className="text-[#FD5A1E]">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[#4d4d4d] border ${errors.companyName ? 'border-red-500' : 'border-[#a4acac]'
                  } rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none`}
                placeholder="Your company"
                aria-required="true"
                aria-invalid={!!errors.companyName}
                aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                required
              />
              {errors.companyName && (
                <p id="companyName-error" className="mt-1 text-red-500 text-sm text-left" role="alert">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-1 text-left">
                Message <span className="text-[#A5ACAF]">(Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-[#4d4d4d] border border-[#a4acac] rounded-lg focus:ring-[#FD5A1E] focus:border-[#FD5A1E] text-white focus:outline-none resize-vertical"
                placeholder="Tell us about your location and vending needs"
                aria-describedby="message-help"
              />
              <p id="message-help" className="mt-1 text-[#A5ACAF] text-xs">
                Optional: Share your specific requirements
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-left">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-[#FD5A1E] text-[#000000] font-medium rounded-xl shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                aria-busy={isSubmitting}
                aria-describedby="submit-help"
              >
                {isSubmitting ? 'Sending...' : 'Request Information'}
              </button>
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
};

// Define the ZodFieldError type for server-side validation error parsing
type ZodFieldError = {
  _errors: string[];
};

// Parse server-side validation errors into a flat object for the form
function parseServerErrors(details: Record<string, ZodFieldError>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const key in details) {
    if (details[key]?._errors?.length) {
      errors[key] = details[key]._errors[0] ?? '';
    }
  }
  return errors;
}

// Validate form fields
function validateForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
}) {
  const errors: Record<string, string> = {};
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  }
  if (!formData.companyName.trim()) {
    errors.companyName = 'Company name is required';
  }
  // Phone and message are optional
  return errors;
}

export default ContactForm;


import type { Metadata } from "next";
import Link from "next/link";
import { FeedbackBreadcrumbs } from "@/components/seo/BreadcrumbSchema";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { PhoneButton } from "@/components/ui/PhoneButton";

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Share Your Feedback | AMP Vending',
  description: 'Share your questions, suggestions, compliments, or concerns about AMP Vending machines and services.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/feedback`,
  },
  openGraph: {
    title: 'Share Your Feedback with AMP Vending',
    description: 'Your feedback helps us improve our services. Let us know about your vending machine experience.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/feedback`,
    siteName: 'AMP Vending',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/images/feedback-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'AMP Vending Feedback',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

/**
 * FeedbackPage Component
 * 
 * A dedicated page for customers to submit feedback about vending machines and service
 */
export default function FeedbackPage() {
  return (
    <div className="bg-[#000000] min-h-screen">
      {/* Hero Section */}
      <div className="relative py-10 mt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FD5A1E]/10 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FeedbackBreadcrumbs />
          <span className="inline-block px-3 py-1 bg-[#FD5A1E] text-[#F5F5F5] text-sm font-medium rounded-full mb-4">
            Customer Feedback
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4">
            Share Your Experience
          </h1>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
            Your feedback helps us improve our vending machines and service.
            Tell us what you love or how we can do better.
          </p>
        </div>
      </div>

      {/* Feedback Form Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FeedbackForm />
      </div>

      {/* Additional Resources Section */}
      <div className="bg-[#4d4d4d]/20 py-16 border-t border-[#a4acac]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8 text-center">
            Additional Ways to Contact Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#4d4d4d]/30 p-6 rounded-lg border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="bg-[#FD5A1E]/10 p-3 rounded-full text-[#FD5A1E]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#F5F5F5] ml-4">Email Us</h3>
              </div>
              <p className="text-[#A5ACAF] text-center md:text-left">
                For direct assistance, email our customer support team at:
                <br/>
                <a
                  href="mailto:ampdesignandconsulting@gmail.com"
                  className="text-[#FD5A1E] hover:underline"
                  style={{
                    wordBreak: 'break-all',      // CSS property for aggressive breaking
                    overflowWrap: 'break-word',  // More intelligent word breaking
                    hyphens: 'auto'              // Add hyphens where appropriate
                  }}
                >
                  ampdesignandconsulting@gmail.com
                </a>
              </p>
            </div>

            <div className="bg-[#4d4d4d]/30 p-6 rounded-lg border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="bg-[#FD5A1E]/10 p-3 rounded-full text-[#FD5A1E]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#F5F5F5] ml-4">Call Us</h3>
              </div>
              <p className="text-[#A5ACAF] text-center md:text-left">
                For immediate assistance, please call our support team at:
                <PhoneButton
                  phoneNumber="+12094035450"
                  className="block text-[#FD5A1E] hover:underline mt-2"
                >
                  (209) 403-5450
                </PhoneButton>
              </p>
            </div>

            <div className="bg-[#4d4d4d]/30 p-6 rounded-lg border border-[#a4acac] hover:border-[#FD5A1E] transition-all">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="bg-[#FD5A1E]/10 p-3 rounded-full text-[#FD5A1E]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#F5F5F5] ml-4">Contact Form</h3>
              </div>
              <p className="text-[#A5ACAF] text-center md:text-left">
                For general inquiries, visit our contact page to reach our team.
                <Link
                  href="/contact"
                  className="block text-[#FD5A1E] hover:underline mt-2"
                >
                  Go to Contact Page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
            <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">How do I report a malfunctioning machine?</h3>
            <p className="text-[#A5ACAF]">
              Use the feedback form above and select &quot;Technical Issue&quot; as the category.
              Include the machine ID (if available) and location. For urgent issues, please call us directly.
            </p>
          </div>

          <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
            <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">What happens after I submit feedback?</h3>
            <p className="text-[#A5ACAF]">
              Our team reviews all feedback within 24 hours. If you&apos;ve consented to be contacted,
              we&apos;ll reach out to address your concerns or answer questions as soon as possible.
            </p>
          </div>

          <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
            <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">How can I suggest new products?</h3>
            <p className="text-[#A5ACAF]">
              We welcome product suggestions! Use the feedback form and select &quot;Product Request&quot;
              as the category. Be specific about the products you&apos;d like to see in our machines.
            </p>
          </div>

          <div className="bg-[#4d4d4d] rounded-lg p-6 border border-[#a4acac]">
            <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">How quickly are issues resolved?</h3>
            <p className="text-[#A5ACAF]">
              Most technical issues are resolved within 24-48 hours. For product restocking or other
              non-urgent matters, please allow 2-3 business days for resolution.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#000000] to-[#4d4d4d] py-16 border-t border-[#a4acac]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">Ready to improve your workplace?</h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto mb-8">
            Join businesses enhancing employee satisfaction with our premium vending solutions.
          </p>
          <div className="inline-flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#FD5A1E] text-white rounded-full font-medium shadow-md hover:bg-[#FD5A1E]/90 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/vending-machines"
              className="px-6 py-3 bg-transparent border border-[#A5ACAF] text-[#F5F5F5] rounded-full font-medium hover:bg-[#4d4d4d] transition-colors"
            >
              View Vending Machines
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

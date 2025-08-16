import { Metadata } from 'next';
import Container from '@/components/ui/core/Container';
import Text from '@/components/ui/Text';
import Link from 'next/link';

/**
 * Metadata for Terms of Service page
 * Provides proper SEO information and canonical URL
 */
export const metadata: Metadata = {
  title: 'Terms of Service | AMP Vending',
  description: 'AMP Vending Terms of Service - Review our terms and conditions for using our website and vending machine services.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/terms-of-service`,
  },
  openGraph: {
    title: 'Terms of Service | AMP Vending',
    description: 'Review our terms and conditions for using our website and vending machine services.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/terms-of-service`,
    siteName: 'AMP Vending',
    type: 'website',
  },
};

/**
 * Terms of Service Page Component
 * 
 * Displays the terms and conditions for using AMP Vending's
 * website and services. Includes proper accessibility features
 * and responsive design.
 * 
 * Features:
 * - Comprehensive terms coverage
 * - Accessible heading hierarchy
 * - Mobile-responsive design
 * - Contact information for questions
 * - Professional legal formatting
 */
export default function TermsOfServicePage() {
  return (
    <div className="bg-[#000000] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#000000]/50 border-b border-[#4d4d4d]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-[#A5ACAF]">
          <Link 
            href="/" 
            className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
          >
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-[#F5F5F5]">Terms of Service</span>
        </div>
      </div>

      <div className="py-16">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <header className="text-center mb-12">
              <Text variant="h1" className="text-[#F5F5F5] mb-4">
                Terms of Service
              </Text>
              <Text variant="body" color="muted">
                Effective Date: January 1, 2025 | Last Updated: January 1, 2025
              </Text>
            </header>

            {/* Main Content */}
            <main className="bg-[#111111] rounded-xl p-8 border border-[#333333]">
              {/* Agreement Notice - Highlighted Section */}
              <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-lg p-6 mb-8">
                <Text variant="h2" className="text-[#FD5A1E] mb-3">
                  Agreement to Terms
                </Text>
                <Text variant="body" color="muted">
                  By accessing or using our website (ampvendingmachines.com) and services, 
                  you agree to be bound by these Terms of Service. If you do not agree to 
                  these Terms, please do not use our website or services.
                </Text>
              </div>

              {/* Company Information */}
              <section className="mb-8" aria-labelledby="company-info" id="company-info">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Company Information
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  These Terms of Service govern your use of the website and services provided by:
                </Text>
                <div className="bg-[#000000] rounded-lg p-6 border border-[#333333]">
                  <Text variant="body" color="muted">
                    <strong className="text-[#FD5A1E]">AMP Design and Consulting LLC</strong><br />
                    Doing business as: AMP Vending<br />
                    Address: 4120 Dale Rd ste j8 1005, Modesto, CA 95354<br />
                    Phone: (209) 403-5450<br />
                    Email: ampdesignandconsulting@gmail.com
                  </Text>
                </div>
              </section>

              {/* Service Description */}
              <section className="mb-8" aria-labelledby="services" id="services">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Description of Services
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  AMP Vending provides the following services:
                </Text>
                <ul className="text-[#A5ACAF] space-y-3 ml-6 list-disc">
                  <li>
                    <strong className="text-[#FD5A1E]">Vending Machine Placement:</strong> 
                    Installation of premium vending machines with zero upfront cost to qualified locations
                  </li>
                  <li>
                    <strong className="text-[#FD5A1E]">Maintenance Services:</strong> 
                    Regular maintenance, repairs, and technical support for all installed machines
                  </li>
                  <li>
                    <strong className="text-[#FD5A1E]">Product Management:</strong> 
                    Inventory restocking, product selection customization, and quality control
                  </li>
                  <li>
                    <strong className="text-[#FD5A1E]">Customer Support:</strong> 
                    24/7 customer service and technical assistance
                  </li>
                  <li>
                    <strong className="text-[#FD5A1E]">Consulting Services:</strong> 
                    Workplace refreshment consulting and optimization services
                  </li>
                </ul>
              </section>

              {/* User Responsibilities */}
              <section className="mb-8" aria-labelledby="responsibilities" id="responsibilities">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  User Responsibilities
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  By using our services, you agree to:
                </Text>
                <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                  <li>Provide accurate and complete information when requesting services</li>
                  <li>Use our website and services for lawful purposes only</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not interfere with the proper functioning of our services</li>
                  <li>Notify us promptly of any issues with installed equipment</li>
                </ul>
              </section>

              {/* Service Terms */}
              <section className="mb-8" aria-labelledby="service-terms" id="service-terms">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Service Terms and Conditions
                </Text>
                
                <div className="space-y-6">
                  <div>
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      Equipment Installation
                    </Text>
                    <Text variant="body" color="muted">
                      Vending machine placement is subject to location qualification and approval. 
                      We reserve the right to decline service or remove equipment at our discretion. 
                      Installation scheduling is subject to availability and location accessibility.
                    </Text>
                  </div>

                  <div>
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      Service Area
                    </Text>
                    <Text variant="body" color="muted">
                      Our services are currently available in Central California. Service availability 
                      may vary by location and is subject to our operational capacity.
                    </Text>
                  </div>

                  <div>
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      Payment and Pricing
                    </Text>
                    <Text variant="body" color="muted">
                      Our zero-cost installation model applies to qualified locations meeting minimum 
                      traffic requirements. All pricing and service terms will be clearly communicated 
                      before any agreement is finalized.
                    </Text>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8" aria-labelledby="liability" id="liability">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Limitation of Liability
                </Text>
                <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-lg p-6">
                  <Text variant="body" color="muted">
                    To the fullest extent permitted by law, AMP Vending shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages arising from 
                    your use of our services. Our total liability shall not exceed the amount paid 
                    by you for our services in the 12 months preceding the claim.
                  </Text>
                </div>
              </section>

              {/* Privacy and Data */}
              <section className="mb-8" aria-labelledby="privacy" id="privacy">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Privacy and Data Protection
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  Your privacy is important to us. Our collection and use of personal information 
                  is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </Text>
                <a 
                  href="/privacy-policy" 
                  className="inline-flex items-center text-[#FD5A1E] hover:text-[#FD5A1E]/80 transition-colors focus:outline-none focus:underline"
                >
                  View Privacy Policy →
                </a>
              </section>

              {/* Modifications to Terms */}
              <section className="mb-8" aria-labelledby="modifications" id="modifications">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Modifications to Terms
                </Text>
                <Text variant="body" color="muted">
                  We reserve the right to modify these Terms at any time. Changes will be effective 
                  immediately upon posting on our website. Your continued use of our services after 
                  any changes constitutes acceptance of the new Terms.
                </Text>
              </section>

              {/* Governing Law */}
              <section className="mb-8" aria-labelledby="governing-law" id="governing-law">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Governing Law
                </Text>
                <Text variant="body" color="muted">
                  These Terms shall be governed by and construed in accordance with the laws of 
                  the State of California, without regard to its conflict of law provisions.
                </Text>
              </section>

              {/* Contact Section */}
              <section className="text-center border-t border-[#333333] pt-8">
                <Text variant="h3" className="text-[#F5F5F5] mb-4">
                  Questions About These Terms?
                </Text>
                <Text variant="body" color="muted" className="mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </Text>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <a
                    href="mailto:ampdesignandconsulting@gmail.com"
                    className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Email us about terms of service"
                  >
                    <svg 
                      className="w-5 h-5 mr-2" 
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
                    Email Us
                  </a>
                  
                  <a
                    href="tel:+12094035450"
                    className="inline-flex items-center px-6 py-3 border border-[#A5ACAF] text-[#F5F5F5] rounded-full hover:bg-[#4d4d4d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A5ACAF] focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Call us at (209) 403-5450"
                  >
                    <svg 
                      className="w-5 h-5 mr-2" 
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

                {/* Footer Note */}
                <div className="text-center text-[#A5ACAF] text-sm">
                  <em>
                    These Terms of Service are effective as of January 1, 2025. 
                    We recommend reviewing these terms periodically for any updates.
                  </em>
                </div>
              </section>
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
}
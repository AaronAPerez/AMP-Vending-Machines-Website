import { Metadata } from 'next';
import Container from '@/components/ui/core/Container';
import Text from '@/components/ui/Text';
import Link from 'next/link';

/**
 * Metadata for Accessibility Statement page
 * Includes proper SEO information and accessibility compliance indicators
 */
export const metadata: Metadata = {
  title: 'Accessibility Statement | AMP Vending',
  description: 'AMP Vending Accessibility Statement - Learn about our commitment to digital accessibility and web accessibility standards compliance (WCAG 2.1 AA).',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/accessibility`,
  },
  openGraph: {
    title: 'Accessibility Statement | AMP Vending',
    description: 'Learn about our commitment to digital accessibility and web accessibility standards compliance.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/accessibility`,
    siteName: 'AMP Vending',
    type: 'website',
  },
};

/**
 * Accessibility Statement Page Component
 * 
 * Comprehensive accessibility statement that demonstrates our commitment
 * to digital accessibility and compliance with WCAG guidelines.
 * 
 * Features:
 * - WCAG 2.1 AA compliance statement
 * - Detailed accessibility features
 * - Contact information for accessibility issues
 * - Feedback mechanism for improvements
 * - Accessible design with proper ARIA labels
 */
export default function AccessibilityPage() {
  return (
    <div className="bg-[#000000] min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="bg-[#000000]/50 border-b border-[#4d4d4d]" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-[#A5ACAF]">
          <Link 
            href="/" 
            className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
            aria-label="Navigate to homepage"
          >
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-[#F5F5F5]" aria-current="page">Accessibility Statement</span>
        </div>
      </nav>

      <div className="py-16">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <header className="text-center mb-12">
              <Text variant="h1" className="text-[#F5F5F5] mb-4">
                Accessibility Statement
              </Text>
              <Text variant="body" color="muted">
                Our Commitment to Digital Accessibility | Last Updated: January 1, 2025
              </Text>
            </header>

            {/* Main Content */}
            <main className="bg-[#111111] rounded-xl p-8 border border-[#333333]">
              {/* Commitment Statement */}
              <section className="mb-8" aria-labelledby="commitment">
                <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-lg p-6">
                  <h2 className="text-[#FD5A1E] mb-3" id="commitment">
                    Our Accessibility Commitment
                  </h2>
                  <Text variant="body" color="muted" className="mb-4">
                    AMP Vending is committed to ensuring digital accessibility for all users, including 
                    people with disabilities. We strive to make our website and services accessible to 
                    everyone, regardless of ability or technology.
                  </Text>
                  <Text variant="body" color="muted">
                    We are continuously working to improve the accessibility of our website and ensure 
                    compliance with the <strong className="text-[#FD5A1E]">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards.
                  </Text>
                </div>
              </section>

              {/* Standards Compliance */}
              <section className="mb-8" aria-labelledby="standards">
                <h2 className="text-[#F5F5F5] mb-4" id="standards">
                  Accessibility Standards
                </h2>
                <Text variant="body" color="muted" className="mb-4">
                  Our website aims to conform to the following accessibility standards and guidelines:
                </Text>
                <ul className="text-[#A5ACAF] space-y-3 ml-6 list-disc">
                  <li>
                    <strong className="text-[#FD5A1E]">
                        WCAG 2.1 Level AA:
                    </strong> Web Content Accessibility Guidelines established by the W3C
                  </li>
                  <li>
                    <strong className="text-[#FD5A1E]">
                        Section 508:
                    </strong> US Federal accessibility requirements for electronic content
                  </li>
                  <li>
                    <strong className="text-[#FD5A1E]">
                        ADA Compliance:
                    </strong> Americans with Disabilities Act digital accessibility requirements
                  </li>
                  <li>
                    <strong className="text-[#FD5A1E]">
                        AODA:
                    </strong> Accessibility for Ontarians with Disabilities Act standards
                  </li>
                </ul>
              </section>

              {/* Accessibility Features */}
              <section className="mb-8" aria-labelledby="features" id="features">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Accessibility Features
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  Our website includes the following accessibility features:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#000000] rounded-lg p-6 border border-[#333333]">
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      <span className="text-[#FD5A1E]" aria-hidden="true">⌨️</span> Keyboard Navigation
                    </Text>
                    <ul className="text-[#A5ACAF] space-y-2 text-sm">
                      <li>Full keyboard navigation support</li>
                      <li>Logical tab order throughout the site</li>
                      <li>Visible focus indicators</li>
                      <li>Skip navigation links</li>
                    </ul>
                  </div>

                  <div className="bg-[#000000] rounded-lg p-6 border border-[#333333]">
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      <span className="text-[#FD5A1E]" aria-hidden="true">🔍</span> Screen Reader Support
                    </Text>
                    <ul className="text-[#A5ACAF] space-y-2 text-sm">
                      <li>Semantic HTML structure</li>
                      <li>Descriptive ARIA labels</li>
                      <li>Alt text for all images</li>
                      <li>Proper heading hierarchy</li>
                    </ul>
                  </div>

                  <div className="bg-[#000000] rounded-lg p-6 border border-[#333333]">
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      <span className="text-[#FD5A1E]" aria-hidden="true">🎨</span> Visual Accessibility
                    </Text>
                    <ul className="text-[#A5ACAF] space-y-2 text-sm">
                      <li>High contrast color ratios</li>
                      <li>Scalable text up to 200%</li>
                      <li>Clear visual indicators</li>
                      <li>Reduced motion options</li>
                    </ul>
                  </div>

                  <div className="bg-[#000000] rounded-lg p-6 border border-[#333333]">
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      <span className="text-[#FD5A1E]" aria-hidden="true">📱</span> Responsive Design
                    </Text>
                    <ul className="text-[#A5ACAF] space-y-2 text-sm">
                      <li>Mobile-friendly interface</li>
                      <li>Touch-friendly controls</li>
                      <li>Flexible layouts</li>
                      <li>Zoom compatibility</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Testing and Validation */}
              <section className="mb-8" aria-labelledby="testing" id="testing">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Testing and Validation
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  We regularly test our website using various methods to ensure accessibility:
                </Text>
                <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                  <li>Regular accessibility audits and testing</li>
                  <li>Staff training on accessibility best practices</li>
                  <li>User feedback integration into development cycles</li>
                  <li>Staying current with accessibility standards and guidelines</li>
                  <li>Collaboration with accessibility experts and consultants</li>
                  <li>Implementation of new assistive technologies as they become available</li>
                </ul>

                <div className="mt-6 text-center">
                  <Text variant="body" color="muted">
                    <strong className="text-[#FD5A1E]">Last Updated:</strong> January 1, 2025<br />
                    <strong className="text-[#FD5A1E]">Next Review:</strong> July 1, 2025
                  </Text>
                </div>
              </section>
            </main>

            {/* Additional Resources */}
            <aside className="mt-8 bg-[#111111] rounded-xl p-6 border border-[#333333]" aria-labelledby="resources">
              <div id="resources">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Accessibility Resources
                </Text>
              </div>
              <Text variant="body" color="muted" className="mb-4">
                Learn more about web accessibility and assistive technologies:
              </Text>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Text variant="h3" className="text-[#F5F5F5] mb-2">
                    Standards & Guidelines
                  </Text>
                  <ul className="text-[#A5ACAF] space-y-1 text-sm">
                    <li>
                      <a 
                        href="https://www.w3.org/WAI/WCAG21/quickref/" 
                        className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WCAG 2.1 Quick Reference (opens in new tab)"
                      >
                        WCAG 2.1 Quick Reference ↗
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.ada.gov/" 
                        className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="ADA Information (opens in new tab)"
                      >
                        ADA Information ↗
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.section508.gov/" 
                        className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Section 508 Guidelines (opens in new tab)"
                      >
                        Section 508 Guidelines ↗
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <Text variant="h3" className="text-[#F5F5F5] mb-2">
                    Assistive Technology
                  </Text>
                  <ul className="text-[#A5ACAF] space-y-1 text-sm">
                    <li>
                      <a 
                        href="https://www.nvaccess.org/" 
                        className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="NVDA Screen Reader (opens in new tab)"
                      >
                        NVDA Screen Reader ↗
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.apple.com/accessibility/" 
                        className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Apple Accessibility (opens in new tab)"
                      >
                        Apple Accessibility ↗
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.microsoft.com/en-us/accessibility" 
                        className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Microsoft Accessibility (opens in new tab)"
                      >
                        Microsoft Accessibility ↗
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
};
import { Metadata } from 'next';
import Container from '@/components/ui/core/Container';
import Text from '@/components/ui/Text';
import Link from 'next/link';

/**
 * Metadata for Privacy Policy page
 * Includes proper SEO information and GDPR/CCPA compliance indicators
 */
export const metadata: Metadata = {
  title: 'Privacy Policy | AMP Vending',
  description: 'AMP Vending Privacy Policy - Learn how we collect, use, and protect your personal information in accordance with GDPR, CCPA, and other privacy regulations.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy | AMP Vending',
    description: 'Learn how we collect, use, and protect your personal information in accordance with privacy regulations.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com'}/privacy-policy`,
    siteName: 'AMP Vending',
    type: 'website',
  },
};

/**
 * Privacy Policy Page Component
 * 
 * Comprehensive privacy policy page that covers GDPR, CCPA, and other
 * privacy regulations. Includes detailed information about data collection,
 * usage, and user rights.
 * 
 * Features:
 * - GDPR and CCPA compliance information
 * - Clear data collection disclosure
 * - User rights explanation
 * - Contact information for privacy inquiries
 * - Accessible design with proper heading hierarchy
 */
export default function PrivacyPolicyPage() {
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
          <span className="text-[#F5F5F5]">Privacy Policy</span>
        </div>
      </div>

      <div className="py-16">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <header className="text-center mb-12">
              <Text variant="h1" className="text-[#F5F5F5] mb-4">
                Privacy Policy
              </Text>
              <Text variant="body" color="muted">
                Effective Date: January 1, 2025 | Last Updated: January 1, 2025
              </Text>
            </header>

            {/* Main Content */}
            <main className="bg-[#111111] rounded-xl p-8 border border-[#333333]">
              {/* Introduction */}
              <section className="mb-8" aria-labelledby="introduction" id="introduction">
                  <Text variant="h2" className="text-[#F5F5F5] mb-4">
                    Introduction
                  </Text>
                <Text variant="body" color="muted" className="mb-4">
                  AMP Design and Consulting LLC, doing business as AMP Vending (&quot;we,&quot;us,&quot; or &quot;our&quot;), 
                  is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website 
                  <strong className="text-[#FD5A1E]"> ampvendingmachines.com</strong> or use our services.
                </Text>
                <Text variant="body" color="muted">
                  We are committed to compliance with applicable privacy laws including the 
                  General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), 
                  and other relevant privacy regulations.
                </Text>
              </section>

              {/* Information We Collect */}
              <section className="mb-8" aria-labelledby="information-collect" id="information-collected">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Information We Collect
                </Text>
                <div className="space-y-6">
                  <div>
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      Personal Information You Provide
                    </Text>
                    <Text variant="body" color="muted" className="mb-3">
                      When you contact us or request our services, we may collect:
                    </Text>
                    <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                      <li>
                        <strong className="text-[#FD5A1E]">Contact Information:</strong> 
                        Name, email address, phone number, company name, job title
                      </li>
                      <li>
                        <strong className="text-[#FD5A1E]">Business Information:</strong> 
                        Company size, location preferences, employee count, vending machine requirements
                      </li>
                      <li>
                        <strong className="text-[#FD5A1E]">Communication Records:</strong> 
                        Messages, inquiries, feedback, and correspondence with our team
                      </li>
                      <li>
                        <strong className="text-[#FD5A1E]">Service Preferences:</strong> 
                        Product preferences, accessibility needs, installation requirements
                      </li>
                    </ul>
                  </div>

                  <div>
                    <Text variant="h3" className="text-[#F5F5F5] mb-3">
                      Information Collected Automatically
                    </Text>
                    <Text variant="body" color="muted" className="mb-3">
                      When you visit our website, we automatically collect certain information:
                    </Text>
                    <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                      <li>
                        <strong className="text-[#FD5A1E]">Device Information:</strong> 
                        IP address, browser type and version, device type, operating system
                      </li>
                      <li>
                        <strong className="text-[#FD5A1E]">Usage Data:</strong> 
                        Pages visited, time spent on site, referring websites, click patterns
                      </li>
                      <li>
                        <strong className="text-[#FD5A1E]">Location Data:</strong> 
                        General geographic location (city/state level) based on IP address
                      </li>
                      <li>
                        <strong className="text-[#FD5A1E]">Technical Data:</strong> 
                        Screen resolution, browser settings, accessibility preferences
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="mb-8" aria-labelledby="information-use" id="information-use">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  How We Use Your Information
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  We use the information we collect for the following purposes:
                </Text>
                <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                  <li>To respond to your inquiries and provide customer service</li>
                  <li>To assess location suitability for our vending machine services</li>
                  <li>To schedule installations and provide ongoing maintenance</li>
                  <li>To customize product offerings based on your preferences</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations and protect our rights</li>
                  <li>To send service-related communications (with your consent)</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section className="mb-8" aria-labelledby="information-sharing" id="information-sharing">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Information Sharing and Disclosure
                </Text>
                <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-lg p-6 mb-4">
                  <Text variant="h3" className="text-[#FD5A1E] mb-3">
                    We Do Not Sell Personal Information
                  </Text>
                  <Text variant="body" color="muted">
                    AMP Vending does not sell, rent, or trade your personal information to third parties for monetary consideration.
                  </Text>
                </div>
                <Text variant="body" color="muted" className="mb-4">
                  We may share your information in the following limited circumstances:
                </Text>
                <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                  <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In connection with a business transaction (merger, acquisition, etc.)</li>
                  <li>With your explicit consent for specific purposes</li>
                </ul>
              </section>

              {/* Your Privacy Rights - GDPR & CCPA */}
              <section className="mb-8" aria-labelledby="privacy-rights" id="privacy-rights">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Your Privacy Rights
                </Text>
                
                {/* CCPA Rights Section */}
                <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-lg p-6 mb-6">
                  <Text variant="h3" className="text-[#FD5A1E] mb-3">
                    California Residents (CCPA Rights)
                  </Text>
                  <Text variant="body" color="muted" className="mb-3">
                    If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):
                  </Text>
                  <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                    <li>
                      <strong>Right to Know:</strong> Request information about the categories and specific pieces of personal information we collect
                    </li>
                    <li>
                      <strong>Right to Delete:</strong> Request deletion of your personal information (subject to certain exceptions)
                    </li>
                    <li>
                      <strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell personal information)
                    </li>
                    <li>
                      <strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your rights
                    </li>
                  </ul>
                </div>

                {/* GDPR Rights Section */}
                <div className="bg-[#000000] border border-[#333333] rounded-lg p-6 mb-6">
                  <Text variant="h3" className="text-[#F5F5F5] mb-3">
                    European Union Residents (GDPR Rights)
                  </Text>
                  <Text variant="body" color="muted" className="mb-3">
                    If you are located in the European Union, you have the following rights under GDPR:
                  </Text>
                  <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                    <li><strong>Right of Access:</strong> Request access to your personal data</li>
                    <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                    <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                    <li><strong>Right to Object:</strong> Object to certain types of data processing</li>
                  </ul>
                </div>

                {/* How to Exercise Rights */}
                <div className="text-center">
                  <Text variant="h3" className="text-[#F5F5F5] mb-4">
                    How to Exercise Your Rights
                  </Text>
                  <Text variant="body" color="muted" className="mb-6">
                    To exercise any of these rights, please contact us using the information below. 
                    We will respond to your request within the timeframes required by applicable law.
                  </Text>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:ampdesignandconsulting@gmail.com?subject=Privacy%20Rights%20Request"
                      className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#FD5A1E]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                      aria-label="Email us about privacy rights"
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
                      Email Privacy Request
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
                </div>
              </section>

              {/* Data Security */}
              <section className="mb-8" aria-labelledby="data-security" id="data-security">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Data Security
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against:
                </Text>
                <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                  <li>Unauthorized access, use, or disclosure</li>
                  <li>Accidental loss, destruction, or damage</li>
                  <li>Unlawful processing or alteration</li>
                </ul>
                <Text variant="body" color="muted" className="mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. 
                  While we strive to protect your personal information, we cannot guarantee absolute security.
                </Text>
              </section>

              {/* Data Retention */}
              <section className="mb-8" aria-labelledby="data-retention" id="data-retention" >
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Data Retention
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  We retain your personal information only as long as necessary to:
                </Text>
                <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                  <li>Provide our services and maintain our business relationship</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our services and customer experience</li>
                </ul>
                <Text variant="body" color="muted" className="mt-4">
                  When we no longer need your personal information, we will securely delete or anonymize it 
                  in accordance with our data retention policies and applicable law.
                </Text>
              </section>

              {/* Cookies and Tracking */}
              <section className="mb-8" aria-labelledby="cookies" id="cookies" >
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Cookies and Tracking Technologies
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  Our website uses cookies and similar tracking technologies to:
                </Text>
                <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                  <li>Ensure proper website functionality</li>
                  <li>Analyze website usage and performance</li>
                  <li>Remember your preferences and settings</li>
                  <li>Provide personalized content and services</li>
                </ul>
                <div className="bg-[#000000] border border-[#333333] rounded-lg p-6 mt-4">
                  <Text variant="h3" className="text-[#F5F5F5] mb-3">
                    Managing Cookies
                  </Text>
                  <Text variant="body" color="muted">
                    You can control cookies through your browser settings. However, disabling certain cookies 
                    may affect website functionality. Most browsers allow you to refuse cookies or alert you 
                    when cookies are being sent.
                  </Text>
                </div>
              </section>

              {/* Third-Party Services */}
              <section className="mb-8" aria-labelledby="third-party" id="third-party" >
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Third-Party Services
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  Our website may contain links to third-party websites or services. We are not responsible 
                  for the privacy practices of these third parties. We encourage you to review their privacy 
                  policies before providing any personal information.
                </Text>
                <Text variant="body" color="muted">
                  We may use third-party service providers to help us operate our website and services. 
                  These providers have access to personal information only as needed to perform their functions 
                  and are required to maintain confidentiality.
                </Text>
              </section>

              {/* Children's Privacy */}
              <section className="mb-8" aria-labelledby="childrens-privacy" id="childrens-privacy">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Children&apos;s Privacy
                </Text>
                <Text variant="body" color="muted">
                  Our services are not directed to children under 18 years of age. We do not knowingly 
                  collect personal information from children under 18. If we become aware that we have 
                  collected personal information from a child under 18, we will take steps to delete 
                  such information promptly.
                </Text>
              </section>

              {/* Changes to Privacy Policy */}
              <section className="mb-8" aria-labelledby="policy-changes" id="policy-changes">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Changes to This Privacy Policy
                </Text>
                <Text variant="body" color="muted" className="mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or applicable law. We will notify you of any material changes by:
                </Text>
                <ul className="text-[#A5ACAF] space-y-2 ml-6 list-disc">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the &quot;Last Updated&quot; date at the top of this policy</li>
                  <li>Sending email notification for significant changes (if you have provided your email)</li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="mb-8" aria-labelledby="contact-info" id="contact-info">
                <Text variant="h2" className="text-[#F5F5F5] mb-4">
                  Contact Information
                </Text>
                <div className="bg-[#000000] rounded-lg p-6 border border-[#333333]">
                  <Text variant="body" color="muted" className="mb-4">
                    <strong className="text-[#FD5A1E]">AMP Design and Consulting LLC (AMP Vending)</strong><br />
                    4120 Dale Rd ste j8 1005<br />
                    Modesto, CA 95354<br />
                    Phone: (209) 403-5450<br />
                    Email: ampdesignandconsulting@gmail.com
                  </Text>
                  <Text variant="body-sm" color="muted">
                    <strong>Privacy Officer:</strong> For privacy-related inquiries, please contact us using the information above 
                    with &quot;Privacy Inquiry&quot; in the subject line.
                  </Text>
                </div>
              </section>

              {/* Disclaimer and Legal Notice */}
              <footer className="text-center text-[#A5ACAF] text-sm border-t border-[#333333] pt-6">
                <div className="bg-[#FD5A1E]/5 border border-[#FD5A1E]/20 rounded-lg p-4">
                  <Text variant="body-sm" color="muted">
                    <strong className="text-[#FD5A1E]">Legal Compliance Notice:</strong><br />
                    This Privacy Policy is designed to comply with applicable privacy laws including 
                    GDPR, CCPA, and other relevant regulations. If you have questions about your 
                    specific rights under local privacy laws, please contact us using the information provided above.
                  </Text>
                </div>
              </footer>
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
}
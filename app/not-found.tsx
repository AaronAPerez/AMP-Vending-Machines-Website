/**
 * Custom 404 Not Found page for AMP Vending
 * 
 * This page appears when users navigate to a non-existent page
 * Provides helpful navigation options and maintains brand styling
 */

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo/AMP_logo.png"
            alt="AMP Vending Logo"
            width={200}
            height={100}
            className="mx-auto"
            priority
          />
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-[#FD5A1E] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
            Page Not Found
          </h2>
          <p className="text-[#A5ACAF] text-lg">
            The vending machine location you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors font-medium"
          >
            Return Home
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>

          <div className="text-[#A5ACAF]">
            Or try these helpful links:
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/vending-machines" className="text-[#FD5A1E] hover:underline">
              View Vending Machines
            </Link>
            <span className="text-[#4d4d4d]">•</span>
            <Link href="/contact" className="text-[#FD5A1E] hover:underline">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-[#A5ACAF] text-sm mb-2">
            Need immediate assistance?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href="tel:+12094035450"
              className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 transition-colors focus:outline-none focus:underline"
              aria-label="Call us at (209) 403-5450"
            >
              Call: (209) 403-5450
            </a>
            <span className="hidden sm:inline text-[#A5ACAF]">•</span>
            <a
              href="mailto:ampdesignandconsulting@gmail.com"
              className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 transition-colors focus:outline-none focus:underline"
              aria-label="Email us at ampdesignandconsulting@gmail.com"
            >
              Email: ampdesignandconsulting@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
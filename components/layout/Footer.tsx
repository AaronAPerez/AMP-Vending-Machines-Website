/**
 * Enhanced Footer Component - Fixed Email Alignment and Logo Sizing
 * 
 * Build Process Documentation:
 * 1. Fixed email link alignment to match other footer links
 * 2. Standardized logo sizing for consistent branding
 * 3. Improved mobile responsiveness and text wrapping
 * 4. Enhanced accessibility with proper ARIA labels
 * 5. Optimized spacing and typography hierarchy
 * 6. Added proper semantic HTML structure
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FooterEmailLink from '../contact/FooterEmailLink';
import { trackPhoneCall } from '@/lib/analytics/gtag';


/**
 * Main Footer Component
 * 
 * Features:
 * - Consistent left alignment for all content
 * - Proper logo sizing and positioning
 * - Mobile-first responsive design
 * - Semantic HTML structure for accessibility
 * - Professional typography and spacing
 */
const Footer = () => {
  return (
    <footer
      className="bg-[#111111] border-t border-[#333333] py-12 sm:py-16"
      role="contentinfo"
      aria-label="Site footer with company information and links"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Company Info Section - Fixed Logo Sizing */}
          <div className="space-y-4">
            {/* Logo with Fixed Sizing */}
            <div className="flex items-start">
              <Link
                href="/"
                className="inline-block focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#111111] rounded"
                aria-label="AMP Vending homepage"
              >
                <Image
                  src="/images/logo/AMP_logo.png"
                  alt="AMP Vending Logo"
                  width={80}  // Fixed consistent width
                  height={48} // Fixed consistent height
                  className="h-auto w-auto" // Constrain height, auto width
                  priority
                />
              </Link>
            </div>

            {/* Company Description */}
            <p className="text-[#A5ACAF] text-sm leading-relaxed max-w-xs">
              Premium vending solutions with zero-cost installation and maintenance-free operation for modern workplaces.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <div className="text-[#F5F5F5] font-semibold text-lg">
              Quick Links
            </div>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Vending Machines', href: '/vending-machines' },
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'Feedback', href: '/feedback' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors duration-300 focus:outline-none focus:text-[#FD5A1E] focus:underline"
                      aria-label={`Navigate to ${link.name}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Our Services Section */}
          <div className="space-y-4">
            <div className="text-[#F5F5F5] font-semibold text-lg">
              Our Services
            </div>
            <ul className="space-y-3">
              {[
                'Zero-Cost Installation',
                'Maintenance-Free Operation',
                'Product Restocking',
                '24/7 Customer Support',
              ].map((service) => (
                <li key={service}>
                  <span className="text-[#A5ACAF] text-sm leading-relaxed">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section - Fixed Email Alignment */}
          <div className="space-y-4">
          <div className="text-[#F5F5F5] font-semibold text-lg">
              Contact Info
            </div>

            <div className="space-y-3">
              {/* Address */}
              <div>
                <address className="text-[#A5ACAF] text-sm not-italic leading-relaxed">
                  4120 Dale Rd ste j8 1005<br />
                  Modesto, CA 95354
                </address>
              </div>

              {/* Phone */}
              <div>
                <a
                  href="tel:+12094035450"
                  onClick={() => trackPhoneCall()}
                  className="text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors duration-300 focus:outline-none focus:text-[#FD5A1E] focus:underline"
                  aria-label="Call us at (209) 403-5450"
                >
                  (209) 403-5450
                </a>
              </div>

              {/* Email - Fixed Alignment */}
              <div className="text-left"> {/* Explicit left alignment container */}
                <FooterEmailLink />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-[#333333]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            {/* Copyright */}
            <div className="text-[#A5ACAF] text-sm">
              © 2025 AMP Design and Consulting LLC. All rights reserved.
            </div>

            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm">
              <a
                href="/privacy-policy"
                className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
              >
                Terms of Service
              </a>
              <a
                href="/accessibility"
                className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
              >
                Accessibility
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

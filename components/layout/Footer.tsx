import Image from 'next/image';
import React from 'react';
import ContactEmailLink from '../contact/ContactEmailLink';
import FooterEmailLink from '../contact/FooterEmailLink';

/**
 * Complete Footer Component with Text Wrapping Fixes
 */
const Footer = () => {
  return (
    <footer className="bg-[#111111] border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/images/logo/AMP_logo.png"
                alt="AMP Vending Logo"
                width={100}
                height={100}
                className="h-14 w-20"
              />
            </div>
            <p className="text-[#A5ACAF] text-sm leading-relaxed max-w-xs">
              Premium vending solutions with zero-cost installation
              and maintenance-free operation for modern workplaces.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F5F5]">
              Quick Links
            </h3>
            <nav className="space-y-2">
              <a href="/" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                Home
              </a>
              <a href="/vending-machines" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                Vending Machines
              </a>
              <a href="/contact" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                Contact Us
              </a>
              <a href="/feedback" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                Feedback
              </a>
            </nav>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F5F5]">
              Our Services
            </h3>
            <nav className="space-y-2">
              <span className="block text-[#A5ACAF] text-sm">Zero-Cost Installation</span>
              <span className="block text-[#A5ACAF] text-sm">Maintenance-Free Operation</span>
              <span className="block text-[#A5ACAF] text-sm">Product Restocking</span>
              <span className="block text-[#A5ACAF] text-sm">24/7 Customer Support</span>
            </nav>
          </div>

          {/* Contact Info - FIXED VERSION */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F5F5F5]">
              Contact Info
            </h3>

            <div className="text-[#A5ACAF] text-sm space-y-3">
              {/* Address */}
              <div>
                <p>4120 Dale Rd ste j8 1005</p>
                <p>Modesto, CA 95354</p>
              </div>

              {/* Phone */}
              <div>
                <a
                  href="tel:+12094035450"
                  className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                  aria-label="Call us at (209) 403-5450"
                >
                  (209) 403-5450
                </a>
              </div>
              {/* Email */}
              <div className="min-w-0"> {/* Prevents flex item from growing beyond container */}
                {/* Email with overflow-wrap for better breaking */}
                <FooterEmailLink />
              </div>
              {/* <nav className="space-y-2">
                <a href="/business-card" className="block text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors">
                  Buisness Card
                </a>
              </nav> */}
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
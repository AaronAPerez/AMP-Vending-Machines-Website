/**
 * FooterEmailLink Component - Left Aligned Version
 * 
 * Build Process Documentation:
 * 1. Fixed text alignment to match other footer links
 * 2. Improved text wrapping for long email addresses
 * 3. Enhanced accessibility with proper ARIA labels
 * 4. Consistent styling with other footer elements
 * 5. Proper focus states for keyboard navigation
 */

'use client';

import React from 'react';
import EmailLink from './EmailLink';
import { SEO_CONSTANTS } from '@/lib/data/seoData';

/**
 * Footer Email Link Component
 * 
 * Features:
 * - Left-aligned text to match other footer links
 * - Proper text wrapping for mobile devices
 * - Consistent hover and focus states
 * - Accessible email interaction
 */
const FooterEmailLink = () => (
  <div className="text-left"> {/* Explicit left alignment */}
    <EmailLink
      email={SEO_CONSTANTS.EMAIL}
      subject="Inquiry from AMP Vending Website"
      className="text-[#A5ACAF] text-sm hover:text-[#FD5A1E] transition-colors duration-300
                 focus:outline-none focus:text-[#FD5A1E] focus:underline
                 break-words leading-relaxed inline-block text-left"
      aria-label={`Email us at ${SEO_CONSTANTS.EMAIL}`}
    >
      {SEO_CONSTANTS.EMAIL}
    </EmailLink>
  </div>
);

export default FooterEmailLink;
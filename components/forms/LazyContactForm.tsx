'use client';

import React from 'react';
import { FormLoadingFallback } from '@/components/ui/loading/LoadingFallbacks';
import { InteractionLazy } from '../ui/loading/LazyLoading';


interface LazyContactFormProps {
  className?: string;
  triggerText?: string;
}

/**
 * Lazy-loaded contact form that only loads when user shows intent
 */
export default function ContactForm({ 
  className = '', 
  triggerText = "Load Contact Form" 
}: LazyContactFormProps) {
  const triggerButton = (
    <div className={`text-center ${className}`}>
      <button
        className="px-8 py-4 bg-[#FD5A1E] text-[#000000] font-medium rounded-full hover:bg-[#F5F5F5] transition-colors"
        aria-label="Load contact form"
      >
        {triggerText}
      </button>
    </div>
  );

  return (
    <InteractionLazy
      triggerComponent={triggerButton}
      fallback={<FormLoadingFallback />}
    >
      <ContactForm className={className} />
    </InteractionLazy>
  );
}
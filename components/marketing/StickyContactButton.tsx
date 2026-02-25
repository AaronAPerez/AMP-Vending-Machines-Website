/**
 * @fileoverview Sticky Contact Button with Quick Message Modal
 * Always visible call-to-action button that stays fixed on screen
 * Improves conversion by making contact easy at any time
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { trackGoogleAdsConversion } from '@/lib/analytics/gtag';
import { X } from 'lucide-react';

export const StickyContactButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = window.gtag as (command: string, eventName: string, params: Record<string, unknown>) => void;
      gtag('event', 'click_to_call', {
        event_category: 'Contact',
        event_label: 'Sticky Button Call',
      });
    }
  };

  // WhatsApp handler - commented out, can be re-enabled when WhatsApp option is needed
  // const handleWhatsApp = () => {
  //   if (typeof window !== 'undefined' && 'gtag' in window) {
  //     const gtag = window.gtag as (command: string, eventName: string, params: Record<string, unknown>) => void;
  //     gtag('event', 'whatsapp_click', {
  //       event_category: 'Contact',
  //       event_label: 'Sticky Button WhatsApp',
  //     });
  //   }
  // };

  const handleMessageClick = () => {
    setShowOptions(false);
    setShowMessageModal(true);
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = window.gtag as (command: string, eventName: string, params: Record<string, unknown>) => void;
      gtag('event', 'sticky_contact_message', {
        event_category: 'Contact',
        event_label: 'Sticky Button Message',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.companyName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success('Thank you! Your message has been sent successfully.');
        trackGoogleAdsConversion();

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          message: ''
        });

        // Close modal after delay
        setTimeout(() => {
          setShowMessageModal(false);
        }, 2000);
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('An error occurred. Please try again or call us at (209) 403-5450.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Contact Options Menu */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="fixed bottom-24 right-4 sm:right-8 z-[60] flex flex-col gap-3"
              >
                {/* Call Button */}
                {/* <a
                  href="tel:+12094035450"
                  onClick={handleCall}
                  className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all group"
                >
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-600 font-medium">Call Now</div>
                    <div className="font-bold">(209) 403-5450</div>
                  </div>
                </a> */}

                {/* WhatsApp Button - Commented out for now, can be re-enabled later
                <a
                  href="https://wa.me/12094035450?text=Hi%2C%20I%27m%20interested%20in%20AMP%20Vending%20Machines"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsApp}
                  className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all group"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs font-medium">Chat on</div>
                    <div className="font-bold">WhatsApp</div>
                  </div>
                </a>
                */}

                {/* Quick Message Button */}
                <button
                  onClick={handleMessageClick}
                  className="flex items-center gap-3 bg-[#FD5A1E] text-black px-6 py-4 rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all group"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs font-medium">Send</div>
                    <div className="font-bold">Message</div>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setShowOptions(!showOptions)}
            className={`fixed bottom-6 right-4 sm:right-8 z-[70] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${
              showOptions
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#FD5A1E] hover:bg-[#ff7040]'
            }`}
            aria-label={showOptions ? 'Close contact options' : 'Open contact options'}
          >
            {showOptions ? (
              /* Close X icon when menu is open */
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Chat bubble icon - represents contact options (call + message) */
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </motion.button>

          {/* Pulse animation ring */}
          {!showOptions && (
            <motion.div
              className="fixed bottom-6 right-4 sm:right-8 z-[65] w-16 h-16 rounded-full bg-[#FD5A1E] pointer-events-none"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Quick Message Modal */}
          <AnimatePresence>
            {showMessageModal && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={() => setShowMessageModal(false)}
                />

                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-6 max-w-md w-full border-2 border-[#FD5A1E] shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#333333] hover:bg-[#FD5A1E] transition-colors z-10"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Header */}
                  <h3 className="text-2xl font-bold text-white mb-2">Quick Message</h3>
                  <p className="text-[#A5ACAF] text-sm mb-6">
                    Send us a message and we'll respond within 24 hours
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-[#FD5A1E] transition-colors"
                        required
                        disabled={isSubmitting}
                      />
                      <input
                        type="text"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-[#FD5A1E] transition-colors"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-[#FD5A1E] transition-colors"
                      required
                      disabled={isSubmitting}
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-[#FD5A1E] transition-colors"
                      disabled={isSubmitting}
                    />

                    <input
                      type="text"
                      placeholder="Company Name *"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-[#FD5A1E] transition-colors"
                      required
                      disabled={isSubmitting}
                    />

                    <textarea
                      placeholder="Your Message (Optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-[#FD5A1E] transition-colors resize-none"
                      disabled={isSubmitting}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-[#FD5A1E] text-black font-bold rounded-full hover:bg-[#ff7040] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-3 mt-4 text-xs text-[#A5ACAF]">
                    <span>✓ Secure</span>
                    <span>✓ 24hr Response</span>
                    <span>✓ No Spam</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

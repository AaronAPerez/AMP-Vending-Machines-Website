// components/ExitIntentPopup.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Phone, ArrowRight, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import Card from '@/components/ui/core/Card';
import { trackGoogleAdsConversion } from '@/lib/analytics/gtag';
import { z } from 'zod';

// Exit Intent Form Schema (matches contact form schema requirements)
const exitIntentSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  companyName: z.string().min(1, 'Company name is required').max(100, 'Company name is too long'),
});

interface ExitIntentPopupProps {
  delay?: number; // Minimum time on page before showing (ms)
}

export function ExitIntentPopup({ delay = 5000 }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('exitIntentShown');
    if (hasSeenPopup) {
      setHasShown(true);
      return;
    }

    // Make user eligible after delay
    const timer = setTimeout(() => {
      setIsEligible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isEligible || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves viewport from top (typical exit behavior)
      if (e.clientY <= 0) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Mobile: trigger on rapid scroll to top or back button intent
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolls up rapidly from lower on page
      if (currentScrollY < lastScrollY - 100 && currentScrollY < 300) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isEligible, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', companyName: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    // Validate form data with Zod schema
    try {
      const validatedData = exitIntentSchema.parse(formData);
      setIsSubmitting(true);

      const response = await fetch('/api/exit-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validatedData,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Track conversion
        trackGoogleAdsConversion();

        // Show success state
        setSubmitSuccess(true);

        // Close popup after showing success message
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        setSubmitError(result.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Exit intent submission failed:', error);
        setSubmitError('An error occurred. Please try again or call us at (209) 403-5450.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      ></div>

      {/* Popup - Responsive container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card className="relative bg-gradient-to-br from-black via-[#1a1a1a] to-black shadow-2xl border-2 border-[#FD5A1E] overflow-hidden">
          {/* Close Button - Touch-friendly size */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 md:top-3 md:right-3 z-10 p-3 rounded-lg bg-[#4d4d4d] hover:bg-[#FD5A1E] transition-colors touch-manipulation"
            aria-label="Close popup"
            style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target
          >
            <X className="h-5 w-5 text-[#F5F5F5]" />
          </button>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

    
              {/* Left Column - Image & Stats */}
              <div className="relative hidden lg:flex lg:flex-col  bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20 p-8">
                {/* Logo */}
                <div className="mb-2">
                  <Image
                    src="/images/logo/AMP_logo.webp"
                    alt="AMP Vending Machines"
                    width={150}
                    height={80}
                    className="object-contain mx-auto"
                  />
                </div>

                {/* Vending Machine Image */}
                <div className="relative flex-1 min-h-[200px]">
                  <Image
                    src="/images/machines/amp-refrigerated-vending-machine-tap-to-pay.webp"
                    alt="Premium Touchscreen Vending Machine"
                    fill
                    className="object-cover drop-shadow-2xl p-4"
                    sizes="(max-width: 768px) 0vw, 50vw"
                  />
                </div>

                {/* Stats Grid - Moved from right column */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                    <div className="text-xl font-bold text-[#FD5A1E] mb-1">
                      100%
                    </div>
                    <div className="text-xs text-[#A5ACAF]">
                      Free Setup
                    </div>
                  </div>
                  <div className="text-center p-2 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                    <div className="text-xl font-bold text-[#FD5A1E] mb-1">
                      24/7
                    </div>
                    <div className="text-xs text-[#A5ACAF]">
                      Service
                    </div>
                  </div>
                  <div className="text-center p-2 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                    <div className="text-xl font-bold text-[#FD5A1E] mb-1">
                      50+
                    </div>
                    <div className="text-xs text-[#A5ACAF]">
                      Products
                    </div>
                  </div>
                </div>

                {/* Special Offer Badge - Also moved here for balance */}
                <div className="flex items-center justify-center gap-2 px-3 py-2 mt-4 rounded-lg bg-gradient-to-r from-[#FD5A1E]/20 to-orange-600/20 border-2 border-[#FD5A1E]">
                  <Sparkles className="h-4 w-4 text-[#FD5A1E] animate-pulse flex-shrink-0" />
                  <span className="font-bold text-[#FD5A1E] text-xs text-center">
                    FREE Premium Touchscreen Machines!
                  </span>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="p-6 lg:p-8">
                {/* Mobile Logo */}
                <div className="lg:hidden mb-4 flex justify-center">
                  <Image
                    src="/images/logo/AMP_logo.webp"
                    alt="AMP Vending Machines"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Header */}
                <div className="text-center mb-4">
                  <h2 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-red-600 to-orange-600 text-white border-2 border-yellow-400 shadow-lg animate-pulse mb-2">
                  {/* <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2"> */}
                    Wait! Don&apos;t Miss Out...
                  </h2>
                  <p className="text-sm md:text-base text-[#FD5A1E] font-semibold">
                    Get a FREE Vending Machine!
                  </p>
                </div>

                {/* Value Prop */}
                <p className="text-sm text-[#F5F5F5] leading-relaxed text-center mb-4">
                  Join <span className="font-bold text-[#FD5A1E]">the many businesses</span> in Modesto Stanislaus County, and Stockton San Joaquin County
                  providing premium vending at{' '}
                  <span className="font-bold text-[#FD5A1E]">zero cost</span>!
                </p>

                {/* Stats Grid - Mobile Only (hidden on desktop, shown on left column) */}
                <div className="grid grid-cols-3 gap-3 mb-6 lg:hidden">
                  <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                    <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">
                      100%
                    </div>
                    <div className="text-xs text-[#A5ACAF]">
                      Free Setup
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                    <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">
                      24/7
                    </div>
                    <div className="text-xs text-[#A5ACAF]">
                      Service
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                    <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">
                      50+
                    </div>
                    <div className="text-xs text-[#A5ACAF]">
                      Products
                    </div>
                  </div>
                </div>

                {/* Special Offer Badge - Mobile Only */}
                <div className="flex items-center justify-center gap-2 px-4 py-2.5 mb-6 rounded-lg bg-gradient-to-r from-[#FD5A1E]/20 to-orange-600/20 border-2 border-[#FD5A1E] lg:hidden">
                  <Sparkles className="h-4 w-4 text-[#FD5A1E] animate-pulse flex-shrink-0" />
                  <span className="font-bold text-[#FD5A1E] text-xs md:text-sm text-center">
                    FREE Premium Touchscreen Machines!
                  </span>
                </div>

                {/* Benefits List */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
                    <span className="text-[#F5F5F5] text-xs">21.5&quot; HD touchscreen</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
                    <span className="text-[#F5F5F5] text-xs">Contactless payments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
                    <span className="text-[#F5F5F5] text-xs">Weekly restocking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
                    <span className="text-[#F5F5F5] text-xs">Zero upfront costs</span>
                  </div>
                </div>

                {/* Quick Lead Capture Form */}
                <form onSubmit={handleQuickSubmit} className="space-y-2.5">
                  {/* Success Message */}
                  {submitSuccess && (
                    <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-500">
                        <p className="font-semibold">Success!</p>
                        <p className="text-xs">We&apos;ll contact you within 24 hours about your FREE vending machine.</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitError && (
                    <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-red-500">
                        <p className="font-semibold">Error</p>
                        <p className="text-xs">{submitError}</p>
                      </div>
                    </div>
                  )}

                  {/* Form Validation Error */}
                  {errors.root && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-500">{errors.root}</p>
                    </div>
                  )}

                  {!submitSuccess && (
                    <>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <input
                              type="text"
                              placeholder="First Name *"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              className={`w-full px-3 py-1.5 bg-[#1a1a1a] border rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:ring-1 ${
                                errors.firstName
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-[#333333] focus:border-[#FD5A1E] focus:ring-[#FD5A1E]'
                              }`}
                              disabled={isSubmitting}
                              required
                            />
                            {errors.firstName && (
                              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                            )}
                          </div>

                          <div>
                            <input
                              type="text"
                              placeholder="Last Name *"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              className={`w-full px-3 py-1.5 bg-[#1a1a1a] border rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:ring-1 ${
                                errors.lastName
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-[#333333] focus:border-[#FD5A1E] focus:ring-[#FD5A1E]'
                              }`}
                              disabled={isSubmitting}
                              required
                            />
                            {errors.lastName && (
                              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <input
                            type="email"
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full px-3 py-1.5 bg-[#1a1a1a] border rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:ring-1 ${
                              errors.email
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-[#333333] focus:border-[#FD5A1E] focus:ring-[#FD5A1E]'
                            }`}
                            disabled={isSubmitting}
                            required
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <input
                            type="tel"
                            placeholder="Phone Number (Optional)"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full px-3 py-1.5 bg-[#1a1a1a] border rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:ring-1 ${
                              errors.phone
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-[#333333] focus:border-[#FD5A1E] focus:ring-[#FD5A1E]'
                            }`}
                            disabled={isSubmitting}
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Company Name *"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className={`w-full px-3 py-1.5 bg-[#1a1a1a] border rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:ring-1 ${
                              errors.companyName
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-[#333333] focus:border-[#FD5A1E] focus:ring-[#FD5A1E]'
                            }`}
                            disabled={isSubmitting}
                            required
                          />
                          {errors.companyName && (
                            <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>
                          )}
                        </div>
                      </div>

                      {/* CTA Buttons - Touch-friendly with proper spacing */}
                      <div className="space-y-2">
                        <AccessibleButton
                          type="submit"
                          variant="cta"
                          size="lg"
                          loading={isSubmitting}
                          loadingText="Submitting..."
                          rightIcon={<ArrowRight className="h-5 w-5" />}
                          fullWidth
                          className="touch-manipulation"
                          style={{ minHeight: '48px' }} // WCAG touch target
                          disabled={isSubmitting}
                        >
                          Get Your Free Machine
                        </AccessibleButton>
                        <AccessibleButton
                          variant="outline"
                          size="md"
                          href="tel:+12094035450"
                          leftIcon={<Phone className="h-4 w-4" />}
                          onClick={handleClose}
                          fullWidth
                          className="touch-manipulation"
                          style={{ minHeight: '44px' }} // WCAG touch target
                        >
                          Call (209) 403-5450
                        </AccessibleButton>
                      </div>
                    </>
                  )}
                </form>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 pt-3 text-xs text-[#A5ACAF]">
                  <span>✓ No contracts</span>
                  <span>✓ Cancel anytime</span>
                  <span className="hidden sm:inline">✓ Local service</span>
                </div>
              </div>
            </div>
        </Card>
      </div>
    </div>
  );
}

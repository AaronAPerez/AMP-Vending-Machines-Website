// components/ExitIntentPopup.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Phone, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import Card from '@/components/ui/core/Card';
import { trackGoogleAdsConversion } from '@/lib/analytics/gtag';

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

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one field is filled
    if (!formData.name && !formData.email && !formData.phone) {
      return; // Don't submit if all fields are empty
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/exit-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Track conversion
        trackGoogleAdsConversion();
        // Close popup and show success
        setIsVisible(false);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error('Exit intent submission failed:', error);
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
            className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-3 rounded-lg bg-[#4d4d4d] hover:bg-[#FD5A1E] transition-colors touch-manipulation"
            aria-label="Close popup"
            style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target
          >
            <X className="h-5 w-5 text-[#F5F5F5]" />
          </button>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

    
              {/* Left Column - Image & Stats */}
              <div className="relative hidden lg:flex lg:flex-col bg-gradient-to-br from-[#FD5A1E]/15 via-[#FD5A1E]/10 to-transparent p-8">
                {/* Logo */}
                <div className="mb-6">
                  <Image
                    src="/images/logo/AMP_logo.webp"
                    alt="AMP Vending Machines"
                    width={150}
                    height={50}
                    className="object-contain mx-auto"
                  />
                </div>

                {/* Vending Machine Image */}
                <div className="relative flex-1 min-h-[280px] mb-6">
                  <Image
                    src="/images/machines/amp-refrigerated-vending-machine-tap-to-pay.webp"
                    alt="Premium Touchscreen Vending Machine"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 0vw, 50vw"
                  />
                </div>

                {/* Stats Grid - Moved from right column */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                    <div className="text-xl font-bold text-[#FD5A1E] mb-1">
                      100%
                    </div>
                    <div className="text-xs text-[#A5ACAF]">
                      Free Setup
                    </div>
                  </div>
                  <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                    <div className="text-xl font-bold text-[#FD5A1E] mb-1">
                      24/7
                    </div>
                    <div className="text-xs text-[#A5ACAF]">
                      Service
                    </div>
                  </div>
                  <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
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
              <div className="p-6 md:p-8 lg:p-8">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FD5A1E]/20 mb-3 animate-pulse">
                    <Sparkles className="h-6 w-6 text-[#FD5A1E]" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                    Wait! Don&apos;t Miss Out...
                  </h2>
                  <p className="text-sm md:text-base text-[#FD5A1E] font-semibold">
                    Get a FREE Vending Machine!
                  </p>
                </div>

                {/* Value Prop */}
                <p className="text-sm text-[#F5F5F5] leading-relaxed text-center mb-4">
                  Join <span className="font-bold text-[#FD5A1E]">hundreds of businesses</span> in Modesto & Stanislaus County
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
                  <div className="grid grid-cols-1 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name (Optional)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]"
                    />
                    <input
                      type="email"
                      placeholder="Your Email (Optional)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]"
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone (Optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]"
                    />
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

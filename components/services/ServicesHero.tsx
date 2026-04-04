'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { AccessibleButton } from '@/components/ui/AccessibleButton';

/**
 * ServicesHero Component
 *
 * Hero section for the Services page optimized for Google Ads conversions.
 * Features a clear value proposition, trust indicators, and prominent CTA.
 *
 * SEO Focus: "Professional Vending Machine Service Central Valley CA"
 */

interface ServicesHeroProps {
  /** Primary headline - can be customized for A/B testing */
  headline?: string;
  /** Subheadline for supporting copy */
  subheadline?: string;
  /** Service area location */
  location?: string;
}

const ServicesHero: React.FC<ServicesHeroProps> = ({
  headline = "Professional Vending Machine Service for Businesses",
  subheadline = "Premium vending machines installed, stocked, and maintained professionally. Serving offices, warehouses, and facilities throughout the Central Valley.",
  location = "Central Valley, CA"
}) => {
  // Trust indicators displayed below headline
  const trustIndicators = [
    "Professional Installation",
    "Full-Service Maintenance",
    "Weekly Restocking"
  ];

  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-16 flex items-center overflow-hidden bg-black"
      aria-labelledby="services-hero-heading"
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-[#FD5A1E]/10"
        aria-hidden="true"
      />

      {/* Animated background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #FD5A1E 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #FD5A1E 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
        aria-hidden="true"
      />

      {/* Content container - Two column layout on desktop */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-full"
            >
              <span className="w-2 h-2 bg-[#FD5A1E] rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-[#FD5A1E] font-medium text-sm sm:text-base">
                Serving {location}
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              id="services-hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-[#F5F5F5] mb-6 leading-tight"
            >
              {headline.split(' ').map((word, index) => {
                // Highlight "Professional" with orange color
                if (word.toLowerCase() === 'professional') {
                  return (
                    <span key={index} className="text-[#FD5A1E]">
                      {word}{' '}
                    </span>
                  );
                }
                return <span key={index}>{word} </span>;
              })}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#A5ACAF] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mb-8"
              aria-label="Service benefits"
            >
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-[#F5F5F5]"
                >
                  <CheckCircle
                    className="w-5 h-5 text-[#FD5A1E]"
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-base font-medium">
                    {indicator}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <AccessibleButton
                href="/contact"
                variant="cta"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                aria-label="Request a vending machine for your business"
              >
                Request a Quote
              </AccessibleButton>

              <AccessibleButton
                href="tel:+12094035450"
                variant="secondary"
                size="lg"
                aria-label="Call us at (209) 403-5450"
              >
                Call (209) 403-5450
              </AccessibleButton>
            </motion.div>

            {/* Social proof indicator */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-sm text-[#A5ACAF]"
            >
              Trusted by businesses across Modesto, Stockton, Turlock & more
            </motion.p>
          </div>

          {/* Right column - Vending machine image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Glow effect behind image */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#FD5A1E]/20 to-transparent rounded-3xl blur-3xl"
                aria-hidden="true"
              />

              {/* Main vending machine image */}
              <Image
                src="/images/machines/amp-vending-machines-touchscreen.webp"
                alt="AMP Vending premium refrigerated vending machine with touchscreen display"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 0vw, 400px"
                priority
              />

              {/* Feature callouts */}
              <div className="absolute right-2 top-1/4 bg-[#111111]/90 border border-[#FD5A1E] backdrop-blur-lg px-4 py-2 rounded-lg shadow-xl">
                <span className="text-[#FD5A1E] text-sm font-semibold">Touchscreen</span>
              </div>
              <div className="absolute right-12 top-1/2 bg-[#111111]/90 backdrop-blur-lg border border-[#FD5A1E] px-4 py-2 rounded-lg shadow-xl">
                <span className="text-[#FD5A1E] text-sm font-semibold">Cashless Pay</span>
              </div>
              <div className="absolute -left-4 bottom-1/4 bg-[#111111]/90 border border-[#FD5A1E] backdrop-blur-lg px-4 py-2 rounded-lg shadow-xl">
                <span className="text-[#FD5A1E] text-sm font-semibold">Energy Efficient</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

export default ServicesHero;

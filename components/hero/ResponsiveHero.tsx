'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import BackgroundImages from './BackgroundImages';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  className?: string;
}

/**
 * Optimized Hero Component for LCP Performance
 *
 * - BackgroundImages loads AFTER mount to protect LCP
 * - Hero text is the LCP element (static, no JS)
 * - CSS-only animations for zero hydration cost
 * - Clean layering: background → gradient → content
 */
export const ResponsiveHero = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className = '',
}: HeroProps) => {
  return (
    <div
      className={cn(
        'relative min-h-screen md:min-h-[120vh] flex items-center justify-center overflow-hidden',
        'pt-0',
        className
      )}
      aria-labelledby="hero-heading"
    >
      {/* Background product grid (loads after mount) */}
      <BackgroundImages />

      {/* Main gradient overlay - Enhanced for better text readability */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.95) 100%)'
        }}
        aria-hidden="true"
      />

      {/* Vignette effect for edges */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)'
        }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 max-w-5xl -mt-8 md:-mt-4 mb-6">
        {/* LCP Element */}
        <h1
          id="hero-heading"
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F5F5F5] mb-6 sm:mb-8',
            'animate-in fade-in duration-700 fill-mode-forwards'
          )}
          style={{
            opacity: 1,
            transform: 'translateY(0)',
            textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
          }}
        >
          {title}
        </h1>

        <p
          className={cn(
            'text-lg md:text-xl lg:text-2xl text-[#F5F5F5]/95 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed',
            'animate-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-forwards'
          )}
          style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards">
          {primaryCta && (
            <AccessibleButton
              variant="gradient"
              size="lg"
              href={primaryCta.href}
              aria-label={primaryCta.text}
              animate
            >
              {primaryCta.text}
            </AccessibleButton>
          )}

          {secondaryCta && (
            <AccessibleButton
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight />}
              href={secondaryCta.href}
              aria-label={secondaryCta.text}
              animate
            >
              {secondaryCta.text}
            </AccessibleButton>
          )}
        </div>
      </div>
    </div>
  );
};
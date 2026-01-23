'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import BackgroundImages from './BackgroundImages';

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

      {/* Main gradient overlay (single source of truth) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/75 to-black z-20"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 max-w-5xl -mt-8 md:-mt-4 mb-6">
        {/* LCP Element */}
        <div
          id="hero-heading"
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 sm:mb-8 drop-shadow-xl',
            'animate-in fade-in duration-700 fill-mode-forwards'
          )}
          style={{
            opacity: 1,
            transform: 'translateY(0)',
          }}
        >
          {title}
        </div>

        <p
          className={cn(
            'text-xl md:text-2xl text-[#F5F5F5] mb-8 md:mb-10 drop-shadow-lg max-w-3xl mx-auto',
            'animate-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-forwards'
          )}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards">
          {primaryCta && (
            <AccessibleButton
              variant="cta"
              size="lg"
              href={primaryCta.href}
              animate
              aria-label={primaryCta.text}
            >
              {primaryCta.text}
            </AccessibleButton>
          )}

          {secondaryCta && (
            <AccessibleButton
              variant="outline"
              size="md"
              className="rounded-full px-7 py-4"
              href={secondaryCta.href}
              animate
              aria-label={secondaryCta.text}
            >
              {secondaryCta.text}
            </AccessibleButton>
          )}
        </div>
      </div>
    </div>
  );
};
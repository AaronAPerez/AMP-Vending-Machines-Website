import React, { Suspense } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
 * Build Process Documentation:
 * - Removes heavy animations during initial render
 * - Uses CSS-only animations for critical elements
 * - Defers JavaScript interactions until after LCP
 * - Implements progressive enhancement pattern
 */
export const ResponsiveHero = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className = ''
}: HeroProps) => {
  return (
    <div 
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
      aria-labelledby="hero-heading"
    >
      {/* Critical Path: Static Background (CSS Only) */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black z-10"
        aria-hidden="true"
      />

      {/* Critical Path: Hero Content (No JS dependencies) */}
      <div className="relative z-30 text-center px-4 sm:px-6 mb-12 max-w-5xl">
        {/* LCP Element - Optimized with CSS-only animations */}
        <h1
          id="hero-heading"
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 sm:mb-4 drop-shadow-xl",
            // CSS-only fade-in animation (no JS blocking)
            "animate-in fade-in duration-700 fill-mode-forwards"
          )}
          style={{
            // Ensure text is immediately visible (no flash)
            opacity: 1,
            transform: 'translateY(0)',
          }}
        >
          {title}
        </h1>
        
        <p 
          className={cn(
            "text-xl md:text-2xl text-[#F5F5F5] mb-8 drop-shadow-lg max-w-3xl mx-auto",
            "animate-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-forwards"
          )}
        >
          {subtitle}
        </p>
        
        {/* CTA Buttons - Deferred loading */}
        <div className="flex flex-wrap justify-center gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="px-8 py-4 bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
              aria-label={primaryCta.text}
            >
              {primaryCta.text}
            </Link>
          )}
          
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="px-8 py-4 border-2 border-[#F5F5F5] text-[#F5F5F5] font-medium rounded-full hover:bg-[#FD5A1E] hover:border-[#FD5A1E] transition-colors"
              aria-label={secondaryCta.text}
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>

      {/* Non-Critical: Background Images (Lazy Loaded) */}
      <Suspense fallback={null}>
        <LazyBackgroundImages />
      </Suspense>
    </div>
  );
};

// Separate component for heavy background images
const LazyBackgroundImages = React.lazy(() => 
  import('./BackgroundImages').then(module => ({ default: module.BackgroundImages }))
);

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { trackPhoneCall } from '@/lib/analytics/gtag';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta' | 'outline' | 'gradient' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  animate?: boolean;
  fullWidth?: boolean;
}

/**
 * Enhanced Accessible Button Component with Gradient CTA Variant
 * 
 * Features:
 * - Loading state with aria-busy
 * - Disabled state management
 * - Keyboard navigation support
 * - Screen reader friendly loading text
 * - Proper contrast ratios (WCAG AA)
 * - NEW: Gradient CTA variant with pulse animation
 * - NEW: Link support (renders as <a> when href provided)
 * 
 * Variants:
 * - primary: Orange solid background with shadow
 * - secondary: Orange border with transparent background
 * - ghost: Transparent with subtle hover
 * - cta: Eye-catching gradient with pulse animation (perfect for CTAs!)
 * - outline: Clean outlined style
 * - gradient: Modern gradient background
 * - danger: Red warning/destructive actions
 * 
 * @example
 * // As a button
 * <AccessibleButton
 *   variant="cta"
 *   leftIcon={<Phone />}
 *   onClick={handleClick}
 * >
 *   Call Now!
 * </AccessibleButton>
 * 
 * @example
 * // As a link
 * <AccessibleButton
 *   variant="cta"
 *   href="/contact"
 *   rightIcon={<ArrowRight />}
 * >
 *   Get Started
 * </AccessibleButton>
 * 
 * @example
 * // External link with proper security
 * <AccessibleButton
 *   variant="cta"
 *   href="https://example.com"
 *   target="_blank"
 *   rel="noopener noreferrer"
 * >
 *   Learn More
 * </AccessibleButton>
 */
export function AccessibleButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Loading...',
  leftIcon,
  rightIcon,
  disabled,
  children,
  className,
  href,
  target,
  rel,
  animate = false,
  fullWidth = false,
  ...props
}: AccessibleButtonProps) {
  const baseStyles = cn(
    // Base button/link styles
    'inline-flex items-center justify-center gap-2 font-medium',
    'transition-all duration-300 ease-in-out',
    // Focus styles for keyboard navigation (WCAG 2.1 AA compliant)
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black',
    // Disabled styles
    'disabled:cursor-not-allowed disabled:opacity-50',
    // CTA/Gradient variants have rounded-full, others have rounded-lg
    (variant === 'cta' || variant === 'gradient') ? 'rounded-full' : 'rounded-lg',
    // Full width option
    fullWidth && 'w-full',
    // Animation on hover
    animate && 'transform hover:-translate-y-0.5 active:translate-y-0'
  );

  const variantStyles = {
    primary: cn(
      'bg-orange text-[#000000] hover:bg-orange/90',
      'focus:ring-orange',
      'shadow-lg shadow-orange/20 hover:shadow-xl hover:shadow-orange/30',
      'hover:scale-[1.02] active:scale-[0.98]'
    ),
    secondary: cn(
      'border-2 border-orange bg-transparent text-orange',
      'hover:bg-orange hover:text-[#000000]',
      'focus:ring-orange',
      'hover:shadow-lg hover:shadow-orange/20'
    ),
    ghost: cn(
      'bg-transparent text-[#F5F5F5] hover:bg-silver/10',
      'focus:ring-silver',
      'hover:text-orange'
    ),
    outline: cn(
      'border-2 border-[#F5F5F5] bg-transparent text-[#F5F5F5]',
      'hover:bg-[#F5F5F5] hover:text-[#000000]',
      'focus:ring-[#F5F5F5]',
      'transition-all duration-300'
    ),
    gradient: cn(
      'bg-gradient-to-r from-orange via-[#FD5A1E] to-red-600',
      'text-[#F5F5F5] font-semibold',
      'shadow-lg shadow-orange/30 hover:shadow-xl hover:shadow-orange/40',
      'focus:ring-orange',
      'hover:scale-105 active:scale-95',
      'relative overflow-hidden',
      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
      'before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700'
    ),
    cta: cn(
      'bg-gradient-to-r from-red-600 to-orange-600 text-[#F5F5F5] font-semibold',
      'shadow-lg border-2 border-[#F5F5F5]',
      'hover:bg-[#F5F5F5] hover:border-[#FD5A1E] hover:text-[#000000]',
      'focus:ring-yellow-400',
      'hover:scale-105 active:scale-95',
      'relative overflow-hidden group',
      'before:absolute before:inset-0 before:bg-[#F5F5F5] before:translate-y-full',
      'before:transition-transform before:duration-300 hover:before:translate-y-0'
    ),
    danger: cn(
      'bg-red-600 text-[#F5F5F5] hover:bg-red-700',
      'focus:ring-red-500',
      'shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30',
      'hover:scale-[1.02] active:scale-[0.98]'
    ),
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const combinedStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  // Content that will be rendered inside button or link
  const content = (
    <>
      {/* Loading spinner */}
      {loading && (
        <svg
          className="h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Left icon */}
      {!loading && leftIcon && (
        <span aria-hidden="true">{leftIcon}</span>
      )}

      {/* Button/Link text with screen reader support */}
      <span className={cn(
        variant === 'cta' && 'relative z-10 transition-colors duration-300'
      )}>
        {loading ? (
          <>
            <span className="sr-only">{loadingText}</span>
            <span aria-hidden="true">{loadingText}</span>
          </>
        ) : (
          children
        )}
      </span>

      {/* Right icon */}
      {!loading && rightIcon && (
        <span aria-hidden="true">{rightIcon}</span>
      )}
    </>
  );

  // Render as link if href is provided
  if (href) {
    // Determine if link is external
    const isExternal = href.startsWith('http') || href.startsWith('//');

    // Set default rel for external links
    const linkRel = rel || (isExternal && target === '_blank'
      ? 'noopener noreferrer'
      : undefined);

    // Check if href is a phone link
    const isPhoneLink = href.startsWith('tel:');

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      if (isPhoneLink) {
        trackPhoneCall();
      }

      if (props.onClick) {
        props.onClick(e as any);
      }
    };

    return (
      <a
        href={href}
        target={target}
        rel={linkRel}
        onClick={handleClick}
        className={cn(
          combinedStyles,
          // Disable pointer events if disabled
          disabled && 'pointer-events-none'
        )}
        aria-busy={loading}
        aria-disabled={disabled || loading}
      >
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button
      className={combinedStyles}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}

// Export type for use in other components
export type { AccessibleButtonProps };
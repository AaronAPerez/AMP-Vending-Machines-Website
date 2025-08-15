/**
 * Accessible component primitives
 * Pre-built components with accessibility best practices
 */

import { forwardRef, ReactNode } from 'react';
import { clsx } from 'clsx';

interface SkipLinkProps {
  href: string;
  children: ReactNode;
}

export const SkipLink = ({ href, children }: SkipLinkProps) => (
  <a
    href={href}
    className={clsx(
      'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
      'bg-orange-500 text-white px-4 py-2 rounded-md z-50',
      'focus:outline-none focus:ring-2 focus:ring-orange-300'
    )}
  >
    {children}
  </a>
);

interface AccessibleButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, disabled, ariaLabel, children, onClick }, ref) => {
    const baseClasses = 'relative transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantClasses = {
      primary: 'bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-300',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-300',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300'
    };
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed'
        )}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        onClick={onClick}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          </span>
        )}
        <span className={isLoading ? 'invisible' : ''}>{children}</span>
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
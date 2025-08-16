/**
 * Animation Utilities
 * 
 * Provides clean utilities for handling dynamic animations without
 * triggering Tailwind CSS ambiguous class warnings.
 */

/**
 * Animation configuration interface
 */
interface AnimationConfig {
  /** Duration in milliseconds */
  duration?: number;
  /** Delay in milliseconds */
  delay?: number;
  /** CSS easing function */
  easing?: string;
  /** Whether animation is enabled */
  enabled?: boolean;
}

/**
 * Default animation values
 */
const DEFAULT_ANIMATION: Required<AnimationConfig> = {
  duration: 300,
  delay: 0,
  easing: 'ease-out',
  enabled: true,
};

/**
 * Generate inline styles for animations
 * This approach avoids Tailwind's dynamic class warnings
 * 
 * @param config - Animation configuration
 * @returns React CSSProperties object
 */
export const getAnimationStyles = (config: AnimationConfig = {}): React.CSSProperties => {
  const { duration, delay, easing, enabled } = { ...DEFAULT_ANIMATION, ...config };

  if (!enabled) {
    return {};
  }

  return {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: easing,
    transitionProperty: 'all',
  };
};

/**
 * Generate CSS custom properties for complex animations
 * Use this when you need to pass values to CSS animations
 * 
 * @param config - Animation configuration
 * @returns CSS custom properties object
 */
export const getAnimationCustomProperties = (config: AnimationConfig = {}): React.CSSProperties => {
  const { duration, delay, easing } = { ...DEFAULT_ANIMATION, ...config };

  return {
    '--animation-duration': `${duration}ms`,
    '--animation-delay': `${delay}ms`,
    '--animation-easing': easing,
  } as React.CSSProperties;
};

/**
 * Predefined animation configurations for common use cases
 */
export const ANIMATION_PRESETS = {
  /** Fast animations for micro-interactions */
  fast: { duration: 150, easing: 'ease-out' },
  
  /** Normal speed for most UI transitions */
  normal: { duration: 300, easing: 'ease-out' },
  
  /** Slower animations for emphasis */
  slow: { duration: 500, easing: 'ease-in-out' },
  
  /** Bouncy animation for playful interactions */
  bouncy: { duration: 400, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  
  /** Smooth animation for elegant transitions */
  smooth: { duration: 350, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },

  /** Staggered animation delays for sequential animations */
  stagger: {
    first: { duration: 300, delay: 0 },
    second: { duration: 300, delay: 100 },
    third: { duration: 300, delay: 200 },
    fourth: { duration: 300, delay: 300 },
    fifth: { duration: 300, delay: 400 },
  },
} as const;

/**
 * Hook for managing component animation state
 * 
 * @param config - Animation configuration
 * @returns Animation utilities and state
 */
export const useAnimation = (config: AnimationConfig = {}) => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const styles = getAnimationStyles(config);
  const customProperties = getAnimationCustomProperties(config);

  const triggerAnimation = React.useCallback(() => {
    setIsAnimating(true);
    const { duration, delay } = { ...DEFAULT_ANIMATION, ...config };
    
    setTimeout(() => {
      setIsAnimating(false);
    }, duration + delay);
  }, [config]);

  const show = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    styles,
    customProperties,
    isAnimating,
    isVisible,
    triggerAnimation,
    show,
    hide,
  };
};

/**
 * Utility function to create staggered animation delays
 * 
 * @param index - Item index in the sequence
 * @param baseDelay - Base delay in milliseconds
 * @param increment - Delay increment per item
 * @returns Animation configuration with calculated delay
 */
export const createStaggeredDelay = (
  index: number, 
  baseDelay: number = 0, 
  increment: number = 100
): AnimationConfig => ({
  delay: baseDelay + (index * increment),
  duration: 300,
  easing: 'ease-out',
});

/**
 * CSS class name utilities that work with Tailwind without warnings
 */
export const ANIMATION_CLASSES = {
  /** Basic transition classes that don't trigger warnings */
  transition: 'transition-all',
  
  /** Transform utilities */
  transform: 'transform',
  
  /** Common hover effects */
  hoverScale: 'hover:scale-105',
  hoverLift: 'hover:-translate-y-1',
  
  /** Focus states */
  focusScale: 'focus:scale-95',
  
  /** Loading states */
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  
  /** Fade effects */
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
} as const;

// Import React for the hook
import React from 'react';

export default {
  getAnimationStyles,
  getAnimationCustomProperties,
  ANIMATION_PRESETS,
  useAnimation,
  createStaggeredDelay,
  ANIMATION_CLASSES,
};
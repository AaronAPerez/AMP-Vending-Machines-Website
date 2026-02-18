'use client';

import { useViewportLazyLoad } from "@/lib/performance/lazy-loading";
import React, { Suspense } from "react";

/**
 * Viewport Lazy Wrapper Component
 * Automatically handles lazy loading for any component
 */
interface ViewportLazyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function ViewportLazy({ 
  children, 
  fallback, 
  className = '',
  threshold = 0.1,
  rootMargin = '100px'
}: ViewportLazyProps) {
  const { ref, shouldLoad } = useViewportLazyLoad(threshold, rootMargin);

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? children : fallback}
    </div>
  );
}


/**
 * Interaction-based lazy loader
 * Only loads component when user interacts
 */
interface InteractionLazyProps {
  children: React.ReactNode;
  triggerComponent: React.ReactNode;
  fallback?: React.ReactNode;
}

export function InteractionLazy({ 
  children, 
  triggerComponent, 
  fallback 
}: InteractionLazyProps) {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  const handleInteraction = () => {
    setShouldLoad(true);
  };

  if (!shouldLoad) {
    return <div onClick={handleInteraction}>{triggerComponent}</div>;
  }

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

/**
 * Deferred loader for non-critical components
 * Loads after a specified delay
 */
interface DeferredProps {
  children: React.ReactNode;
  delay?: number;
  fallback?: React.ReactNode;
}

export function Deferred({ children, delay = 2000, fallback = null }: DeferredProps) {
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldLoad) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}


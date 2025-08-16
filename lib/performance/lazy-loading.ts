'use client';

import { useInView } from 'react-intersection-observer';

/**
 * Viewport-based lazy loading hook
 * Only loads components when they enter the viewport
 */
export function useViewportLazyLoad(threshold = 0.1, rootMargin = '100px') {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true, // Only trigger once for performance
  });

  return { ref, shouldLoad: inView };
}



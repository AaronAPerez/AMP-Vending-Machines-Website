'use client';

import dynamic from 'next/dynamic';

/**
 * Client-side wrapper for non-critical components
 * These components are loaded after the main page renders
 * to reduce initial JavaScript bundle size
 */

// Dynamically import FeedbackWidget (not needed for initial render)
const FeedbackWidget = dynamic(
  () => import("@/components/feedback/FeedbackWidget"),
  { ssr: false }
);

// Dynamically import ExitIntentPopup (only shows on exit intent)
const ExitIntentPopup = dynamic(
  () => import("@/components/ExitIntentPopup").then(mod => ({ default: mod.ExitIntentPopup })),
  { ssr: false }
);

interface DeferredComponentsProps {
  exitIntentDelay?: number;
}

export function DeferredComponents({ exitIntentDelay = 5000 }: DeferredComponentsProps) {
  return (
    <>
      <ExitIntentPopup delay={exitIntentDelay} />
      <aside aria-label="Feedback widget">
        <FeedbackWidget />
      </aside>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Clarity from '@microsoft/clarity';

/**
 * Microsoft Clarity Analytics Component
 *
 * Microsoft Clarity is a FREE heatmap and session recording tool that helps
 * understand how users interact with your website. Features include:
 * - Heatmaps (click, scroll, area)
 * - Session recordings
 * - Insights dashboard
 * - GDPR compliant
 *
 * Performance Optimized:
 * - Defers loading until user interaction (scroll/click/touch)
 * - Uses requestIdleCallback for smart loading during browser idle time
 * - Falls back to 5s timeout if no interaction or idle callback support
 * - Reduces impact on LCP, FCP, and main thread blocking
 *
 * Setup Instructions:
 * 1. Go to https://clarity.microsoft.com
 * 2. Create a new project for your website
 * 3. Copy your Project ID (found in Settings > Setup)
 * 4. Add NEXT_PUBLIC_CLARITY_PROJECT_ID to your .env.local
 *
 * @see https://clarity.microsoft.com
 * @see https://www.npmjs.com/package/@microsoft/clarity
 */
export function MicrosoftClarity() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  useEffect(() => {
    // Don't load in development or if no project ID configured
    if (process.env.NODE_ENV !== 'production' || !clarityProjectId) {
      if (!clarityProjectId && process.env.NODE_ENV === 'production') {
        console.warn('[Clarity] NEXT_PUBLIC_CLARITY_PROJECT_ID not configured');
      }
      return;
    }

    // Load on user interaction (scroll, click, touch)
    const handleInteraction = () => {
      setShouldLoad(true);
      // Remove listeners after first interaction
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    // Load during browser idle time, with 5s fallback timeout
    let idleCallbackId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const loadClarity = () => {
      setShouldLoad(true);
      if (idleCallbackId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timer) clearTimeout(timer);
    };

    if ('requestIdleCallback' in window) {
      // Use requestIdleCallback for smarter loading during browser idle
      idleCallbackId = window.requestIdleCallback(loadClarity, { timeout: 5000 });
    } else {
      // Fallback for browsers without requestIdleCallback (Safari)
      timer = setTimeout(loadClarity, 5000);
    }

    // Add interaction listeners
    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });

    return () => {
      if (timer) clearTimeout(timer);
      if (idleCallbackId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [clarityProjectId]);

  // Initialize Clarity using npm package when ready
  useEffect(() => {
    if (!shouldLoad || !clarityProjectId || typeof window === 'undefined' || isInitialized) {
      return;
    }

    // Initialize Clarity using the npm package
    Clarity.init(clarityProjectId);
    setIsInitialized(true);

  }, [shouldLoad, clarityProjectId, isInitialized]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Clarity Custom Tags API
 *
 * Use these functions to add custom data to Clarity sessions for better filtering.
 *
 * @example
 * // Tag a session with user type
 * claritySetTag('user_type', 'returning_customer');
 *
 * // Identify a user (for logged-in users)
 * clarityIdentify('user123', 'custom_session_id');
 */
export function claritySetTag(key: string, value: string | string[]): void {
  if (typeof window === 'undefined') return;

  // Guard: Clarity may not be initialized (e.g. no project ID, test env)
  try {
    Clarity.setTag(key, value);
  } catch {
    // Silently ignore — Clarity not loaded or not initialized
  }
}

/**
 * Identify a user in Clarity for tracking across sessions.
 * Only use for logged-in users with their consent.
 *
 * @param userId - Unique identifier for the user
 * @param sessionId - Optional custom session ID
 * @param pageId - Optional custom page ID
 * @param friendlyName - Optional friendly name for the user
 */
export function clarityIdentify(
  userId: string,
  sessionId?: string,
  pageId?: string,
  friendlyName?: string
): void {
  if (typeof window === 'undefined') return;

  // Use the npm package's identify method
  Clarity.identify(userId, sessionId, pageId, friendlyName);
}

/**
 * Upgrade a session to ensure it's recorded.
 * Useful for high-value interactions like form submissions.
 *
 * @param reason - Reason for upgrading the session
 */
export function clarityUpgrade(reason: string): void {
  if (typeof window === 'undefined') return;

  // Guard: Clarity may not be initialized (e.g. no project ID, test env)
  try {
    Clarity.upgrade(reason);
  } catch {
    // Silently ignore — Clarity not loaded or not initialized
  }
}

/**
 * Set consent for Clarity tracking.
 * Call this when user gives/revokes consent.
 *
 * @param consent - Whether user has given consent
 */
export function clarityConsent(consent: boolean = true): void {
  if (typeof window === 'undefined') return;

  Clarity.consent(consent);
}

/**
 * Track a custom event in Clarity.
 *
 * @param eventName - Name of the event to track
 */
export function clarityEvent(eventName: string): void {
  if (typeof window === 'undefined') return;

  Clarity.event(eventName);
}

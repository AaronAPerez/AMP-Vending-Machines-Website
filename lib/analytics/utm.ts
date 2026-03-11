/**
 * UTM Parameter Tracking Utility
 *
 * Captures, stores, and retrieves UTM parameters from URL to track
 * which marketing campaigns, ads, and sources are driving leads.
 *
 * UTM Parameters:
 * - utm_source: Where the traffic comes from (google, facebook, newsletter)
 * - utm_medium: Marketing medium (cpc, email, social, organic)
 * - utm_campaign: Specific campaign name (spring_sale, brand_awareness)
 * - utm_term: Paid search keywords
 * - utm_content: Differentiates ads/links pointing to same URL (banner_ad, text_link)
 */

// Storage key for sessionStorage
const UTM_STORAGE_KEY = 'amp_utm_data';
const UTM_FIRST_TOUCH_KEY = 'amp_utm_first_touch';

// Interface for UTM data structure
export interface UTMData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  landing_page: string | null;
  referrer: string | null;
  captured_at: string;
}

/**
 * Captures UTM parameters from the current URL and stores them in sessionStorage.
 * Should be called on initial page load.
 *
 * @returns The captured UTM data, or null if no UTM params present
 */
export function captureUTMParams(): UTMData | null {
  // Only run in browser environment
  if (typeof window === 'undefined') return null;

  try {
    const params = new URLSearchParams(window.location.search);

    // Check if any UTM parameter exists
    const hasUTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      .some(param => params.has(param));

    if (!hasUTM) {
      // No UTM params in URL, but check if we already have stored data
      return getUTMData();
    }

    const utmData: UTMData = {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content'),
      landing_page: window.location.pathname,
      referrer: document.referrer || null,
      captured_at: new Date().toISOString(),
    };

    // Store as last-touch attribution (overwrites previous)
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));

    // Store first-touch attribution (only set once per user session)
    if (!sessionStorage.getItem(UTM_FIRST_TOUCH_KEY)) {
      sessionStorage.setItem(UTM_FIRST_TOUCH_KEY, JSON.stringify(utmData));
    }

    // Also send UTM data to Google Analytics as custom dimensions
    trackUTMInGA(utmData);

    return utmData;
  } catch (error) {
    console.warn('[UTM] Error capturing UTM parameters:', error);
    return null;
  }
}

/**
 * Retrieves the stored UTM data (last-touch attribution).
 *
 * @returns The stored UTM data, or null if none exists
 */
export function getUTMData(): UTMData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('[UTM] Error retrieving UTM data:', error);
    return null;
  }
}

/**
 * Retrieves the first-touch UTM data (original source that brought the user).
 *
 * @returns The first-touch UTM data, or null if none exists
 */
export function getFirstTouchUTM(): UTMData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(UTM_FIRST_TOUCH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('[UTM] Error retrieving first-touch UTM data:', error);
    return null;
  }
}

/**
 * Gets UTM data formatted for form submissions.
 * Includes both first-touch and last-touch attribution.
 *
 * @returns Object with UTM data ready for API submission
 */
export function getUTMForSubmission(): {
  firstTouch: UTMData | null;
  lastTouch: UTMData | null;
  attribution: string;
} {
  const firstTouch = getFirstTouchUTM();
  const lastTouch = getUTMData();

  // Determine primary attribution source
  let attribution = 'direct';
  if (lastTouch?.utm_source) {
    attribution = lastTouch.utm_source;
  } else if (lastTouch?.referrer) {
    // Extract domain from referrer for organic traffic
    try {
      const referrerDomain = new URL(lastTouch.referrer).hostname;
      attribution = `organic_${referrerDomain}`;
    } catch {
      attribution = 'referral';
    }
  }

  return {
    firstTouch,
    lastTouch,
    attribution,
  };
}

/**
 * Clears all stored UTM data.
 * Useful for testing or when user completes a conversion.
 */
export function clearUTMData(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(UTM_STORAGE_KEY);
    sessionStorage.removeItem(UTM_FIRST_TOUCH_KEY);
  } catch (error) {
    console.warn('[UTM] Error clearing UTM data:', error);
  }
}

/**
 * Sends UTM data to Google Analytics as custom event.
 * This allows you to see UTM attribution in GA4 reports.
 */
function trackUTMInGA(utmData: UTMData): void {
  if (typeof window === 'undefined' || typeof window.gtag === 'undefined') return;

  try {
    // Send UTM capture event to GA4
    window.gtag('event', 'utm_captured', {
      event_category: 'attribution',
      utm_source: utmData.utm_source || '(not set)',
      utm_medium: utmData.utm_medium || '(not set)',
      utm_campaign: utmData.utm_campaign || '(not set)',
      utm_term: utmData.utm_term || '(not set)',
      utm_content: utmData.utm_content || '(not set)',
      landing_page: utmData.landing_page,
    });
  } catch (error) {
    console.warn('[UTM] Error tracking UTM in GA:', error);
  }
}

/**
 * Checks if the current session has UTM data.
 *
 * @returns true if UTM data exists
 */
export function hasUTMData(): boolean {
  return getUTMData() !== null;
}

/**
 * Gets a summary string of the UTM source for display/logging.
 *
 * @returns Human-readable attribution string
 */
export function getAttributionSummary(): string {
  const utm = getUTMData();

  if (!utm) {
    return 'Direct / Unknown';
  }

  const parts: string[] = [];

  if (utm.utm_source) {
    parts.push(utm.utm_source);
  }

  if (utm.utm_medium) {
    parts.push(utm.utm_medium);
  }

  if (utm.utm_campaign) {
    parts.push(utm.utm_campaign);
  }

  return parts.length > 0 ? parts.join(' / ') : 'Direct / Unknown';
}

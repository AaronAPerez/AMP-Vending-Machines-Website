'use client';

import { useEffect } from 'react';
import { captureUTMParams } from '@/lib/analytics/utm';

/**
 * UTM Provider Component
 *
 * Initializes UTM parameter tracking on page load.
 * Place this component in your root layout to capture UTM parameters
 * from any entry point into your site.
 *
 * How it works:
 * 1. When a user lands on your site with UTM parameters in the URL
 *    (e.g., ?utm_source=google&utm_medium=cpc&utm_campaign=spring_sale)
 * 2. This component captures and stores those parameters in sessionStorage
 * 3. The UTM data persists across page navigations within the session
 * 4. Form submissions can include UTM data for attribution tracking
 *
 * Usage in layout.tsx:
 * ```tsx
 * import { UTMProvider } from '@/components/analytics/UTMProvider';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <UTMProvider />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function UTMProvider() {
  useEffect(() => {
    // Capture UTM parameters on initial page load
    captureUTMParams();

    // Also capture on route changes (for SPA navigation)
    // This ensures we catch UTM params even when users navigate to
    // internal pages with UTM parameters
    const handleRouteChange = () => {
      captureUTMParams();
    };

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}

/**
 * Root Layout - Clean and Maintainable
 *
 * Uses centralized configuration for:
 * - Metadata (from lib/config/metadata.ts)
 * - Structured data (from components/seo/StructuredData.tsx)
 * - Business information (from lib/data/businessData.ts)
 */

import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Toaster } from "sonner"; // Temporarily disabled for build
import { StructuredData } from "@/components/seo/StructuredData";
import { rootMetadata } from "@/lib/config/metadata";

// Optimized font loading for performance
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

// Export metadata from centralized config
export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        {/* Structured Data - SEO Schema Markup */}
        <StructuredData />

        {/* Inline critical CSS for immediate render */}
        <style dangerouslySetInnerHTML={{__html: `
          body{background:#000;color:#fff;font-family:var(--font-inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          *{box-sizing:border-box;margin:0;padding:0}
          #hero-heading{font-display:swap;text-rendering:optimizeSpeed}
        `}} />

        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        <meta name="google-site-verification" content="rQUz_b0dTF5gHNCSHXdNfzEI6LDoPxg54ZppJQjiFFg" />

        {/* Mobile optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="AMP Vending" />
        <meta name="format-detection" content="telephone=yes" />

        {/* Theme colors */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

             {/* Performance optimization hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* Additional SEO enhancements */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />

        {/* Canonical URL (will be overridden by page-specific canonical) */}
        <link rel="canonical" href="https://www.ampvendingmachines.com" />

        {/* Alternate language versions (add when implementing i18n) */}
        <link rel="alternate" hrefLang="en-US" href="https://www.ampvendingmachines.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.ampvendingmachines.com" />
      </head>



      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`} suppressHydrationWarning>
        {/* Analytics */}
        <GoogleAnalytics />

        {/* Toast notifications - temporarily disabled for build */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: { zIndex: 9999 },
            className: 'z-[9999]',
          }}
        />

        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-orange-600 focus:text-white focus:top-4 focus:left-4 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          tabIndex={0}
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <div className="relative z-40">
          <ResizableNavbar />
        </div>

        {/* Main content */}
        <main
          id="main-content"
          className="relative z-10 bg-gradient-to-b from-black via-black to-gray-900 min-h-screen mt-8 md:mt-4"
          role="main"
          aria-label="Main content"
          suppressHydrationWarning
        >
          <StyledComponentsRegistry>
            {children}
            <SpeedInsights />
            <Analytics />
            <WebVitalsReporter />
          </StyledComponentsRegistry>
        </main>

        {/* Feedback widget */}
        <aside aria-label="Feedback widget">
          <FeedbackWidget />
        </aside>

        {/* Footer */}
        <footer role="contentinfo" aria-label="Site footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

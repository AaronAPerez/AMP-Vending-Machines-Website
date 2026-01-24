/**
 * Root Layout - Clean and Maintainable
 *
 * Uses centralized configuration for:
 * - Metadata (from lib/config/metadata.ts)
 * - Structured data (from components/seo/StructuredData.tsx)
 * - Business information (from lib/data/businessData.ts)
 */

import { rootMetadata } from "@/lib/config/metadata";
import { Inter } from 'next/font/google';
import "./globals.css";
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ToasterProvider } from "@/components/ui/ToasterProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import Footer from "@/components/layout/Footer";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";


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
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#000;color:#fff;font-family:var(--font-inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;min-height:100vh}
          #hero-heading{font-display:swap;text-rendering:optimizeSpeed;text-shadow:0 4px 12px rgba(0,0,0,0.8),0 2px 4px rgba(0,0,0,0.6)}
          #hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#000}
          #hero h1{font-size:2.25rem;line-height:1.2;font-weight:700;color:#F5F5F5;margin-bottom:1.5rem;text-align:center;padding:0 1rem}
          @media(min-width:768px){#hero h1{font-size:3rem}}
          @media(min-width:1024px){#hero h1{font-size:3.75rem}}
          @media(min-width:1280px){#hero h1{font-size:4.5rem}}
          #hero p{font-size:1.125rem;line-height:1.8;color:rgba(245,245,245,0.95);margin-bottom:2rem;text-align:center;padding:0 1rem;max-width:48rem;margin-left:auto;margin-right:auto;text-shadow:0 2px 8px rgba(0,0,0,0.8)}
          @media(min-width:768px){#hero p{font-size:1.25rem}}
          @media(min-width:1024px){#hero p{font-size:1.5rem}}
          .hero-cta{display:inline-flex;align-items:center;justify-content:center;padding:1rem 1.75rem;font-size:1rem;font-weight:600;border-radius:9999px;transition:all 0.2s;text-decoration:none}
          .hero-cta-primary{background:#FD5A1E;color:#fff;border:2px solid #FD5A1E}
          .hero-cta-primary:hover{background:#E74A10;border-color:#E74A10}
          .hero-cta-secondary{background:transparent;color:#F5F5F5;border:2px solid #A5ACAF}
          .hero-cta-secondary:hover{background:#A5ACAF;color:#000}
        `}</style>

        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://googleads.g.doubleclick.net;" />



        {/* Open Graph (OG) Tags  */}
        <meta property="og:image" content="https://www.ampvendingmachines.com/images/promos/amp-vending-promo-modesto.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content="AMP Vending Machines – Free Vending for Modesto, Stockton, Stanislaus & San Joaquin County" />
        <meta property="og:description" content="We provide high‑quality vending machines at no cost to your business." />

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
        {/* Google Analytics & Google Ads Tracking */}
        <GoogleAnalytics />

        {/* Toast notifications */}
        <ToasterProvider />

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
          {children}
          <WebVitalsReporter />
        </main>

        <ExitIntentPopup delay={5000} />

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

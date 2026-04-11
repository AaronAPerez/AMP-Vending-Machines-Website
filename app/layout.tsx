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
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { UTMProvider } from "@/components/analytics/UTMProvider";
import { ToasterProvider } from "@/components/ui/ToasterProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";

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

        {/* Content Security Policy */}
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://googleads.g.doubleclick.net https://www.clarity.ms https://scripts.clarity.ms;" />

        {/* Search engine verification — not part of Next.js metadata API */}
        <meta name="google-site-verification" content="rQUz_b0dTF5gHNCSHXdNfzEI6LDoPxg54ZppJQjiFFg" />
        <meta name="msvalidate.01" content="C0E2AE6FB973A8364053560636CE6EA8" />

        {/* Performance optimization */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Resource hints for analytics and tag manager */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://scripts.clarity.ms" />
        
      </head>

      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`} suppressHydrationWarning>
        {/* Analytics & Tracking - deferred until interaction for performance */}
        <GoogleAnalytics />
        <MicrosoftClarity />
        <UTMProvider />

        {/* Toast notifications */}
        <ToasterProvider />

        {/* Public Layout Wrapper - conditionally renders navbar/footer for non-admin pages */}
        <PublicLayoutWrapper>
          {children}
          <WebVitalsReporter />
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}

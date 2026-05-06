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

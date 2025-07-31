import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from '../lib/registry';
import { Analytics } from "@vercel/analytics/react";
import { Inter } from 'next/font/google';
import Footer from "@/components/layout/Footer";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import { SpeedInsights } from '@vercel/speed-insights/next';
import WebVitalsReporter from "@/components/analytics/WebVitalsReporter";

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap', // Performance optimization
});

export const metadata: Metadata = {
  title: "AMP Vending | Premium Vending Machines for Workplaces",
  // FIXED: Reduced from 177 to 159 characters
  description: "Professional vending machines with 21.5\" touchscreen technology and 50+ product options for Central California workplaces. Installation included.",
  keywords: "vending machines Central California, office vending machines Modesto, touchscreen vending machines, workplace refreshment solutions, commercial vending service",
  authors: [{ name: "AMP Vending" }],
  robots: "index, follow",
 
  other: {
    'referrer': 'same-origin',
  },
  // Enhanced Open Graph with proper image dimensions
  openGraph: {
    title: "Premium Vending Machines for Modern Workplaces | AMP Vending",
    description: "Professional vending machines with touchscreen technology for enhanced workplace satisfaction in Central California.",
    url: "https://www.ampvendingmachines.com",
    siteName: "AMP Vending",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.ampvendingmachines.com/images/og/default-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AMP Vending premium workplace vending machines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Vending Machines for Modern Workplaces | AMP Vending",
    description: "Professional vending machines with touchscreen technology for enhanced workplace satisfaction.",
    images: ["https://www.ampvendingmachines.com/images/og/default-og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical font for performance */}
        <link
          rel="preload"
          href="/_next/static/media/e4af272ccee01ff0-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Mobile optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="AMP Vending" />
        <meta name="theme-color" content="#FD5A1E" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Enhanced skip link for accessibility */}
        <a 
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-orange-600 focus:text-white focus:top-4 focus:left-4 focus:rounded-md"
        >
          Skip to main content
        </a>

        <div className="">
          <ResizableNavbar />
        </div>
        
        <main id="main" className="bg-black/90 mt-4">
          <StyledComponentsRegistry>

            {children}
            <SpeedInsights />
            <Analytics />
            <WebVitalsReporter />
          </StyledComponentsRegistry>
        </main>

        <FeedbackWidget />
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
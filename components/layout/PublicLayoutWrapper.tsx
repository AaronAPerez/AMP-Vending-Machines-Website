'use client';

import { usePathname } from 'next/navigation';
import ResizableNavbar from "@/components/layout/ResizableNavbar";
import Footer from "@/components/layout/Footer";
import { StickyContactButton } from "@/components/marketing/StickyContactButton";
import { DeferredComponents } from "@/components/layout/DeferredComponents";

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * PublicLayoutWrapper
 *
 * Conditionally renders public site elements (navbar, footer, sticky button)
 * only on non-admin pages. Admin pages have their own layout.
 */
export function PublicLayoutWrapper({ children }: PublicLayoutWrapperProps) {
  const pathname = usePathname();

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    // Admin pages - render children without public layout elements
    return (
      <main
        id="main-content"
        role="main"
        aria-label="Admin content"
        suppressHydrationWarning
      >
        {children}
      </main>
    );
  }

  // Public pages - render with full layout
  return (
    <>
      {/* Skip navigation for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[70] focus:p-4 focus:bg-orange-600 focus:text-white focus:top-4 focus:left-4 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        tabIndex={0}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <div className="relative z-50">
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
      </main>

      {/* Deferred non-critical components */}
      <DeferredComponents exitIntentDelay={5000} />

      {/* Sticky Contact Button */}
      <StickyContactButton />

      {/* Footer */}
      <footer role="contentinfo" aria-label="Site footer">
        <Footer />
      </footer>
    </>
  );
}

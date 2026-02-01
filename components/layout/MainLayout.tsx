'use client';

import { useEffect, useState } from 'react';
import ResizableNavbar from './ResizableNavbar';
import Footer from './Footer';
import { ExitIntentPopup } from '../ExitIntentPopup';


interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [pathname, setPathname] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  // Don't render layout logic until mounted to avoid SSR issues
  if (!isMounted) {
    return <>{children}</>;
  }

  // Check if we're in the admin area or on a login page
  const isAdminRoute = pathname?.startsWith('/admin') || false;
  const isLoginPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/reset-password';
  const hideNavigation = isAdminRoute || isLoginPage;

  if (hideNavigation) {
    // Admin Layout - No public navigation components
    return <>{children}</>;
  }

  // Public Layout - Full navigation and footer
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4
                   bg-gold-400 text-white px-4 py-2 rounded-lg z-60"
      >
        Skip to main content
      </a>

      {/* Top contact bar - fixed width */}


  
        {/* Navigation - z-50, below banner, pushes down when banner is visible */}
        <div className="relative z-50">
          <ResizableNavbar />
        </div>

          {/* Main content */}
          <div
            className="relative z-10 bg-gradient-to-b from-black via-black to-gray-900 min-h-screen mt-8 md:mt-4 w-full max-w-full">
          {children}
         
        </div>
        <div className='mt-8'>
     <ExitIntentPopup delay={5000} />
     </div>

        {/* Footer */}
        <footer role="contentinfo" aria-label="Site footer">
          <Footer />
        </footer>

      {/* Scroll to top button */}
    
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

/**
 * Props for GlobalError component
 */
interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary
 * 
 * Catches and handles unhandled errors at the application level.
 * Provides a user-friendly error page with recovery options.
 * 
 * Features:
 * - Error logging for debugging
 * - User-friendly error messaging
 * - Recovery options (retry, go home)
 * - Consistent branding
 * - Accessibility considerations
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry, LogRocket)
    console.error('Global error occurred:', error);
    
    // You can add error reporting here
    // Example: errorReportingService.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-[#F5F5F5] min-h-screen">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <pattern id="error-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="#A5ACAF" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#error-grid)" />
            </svg>
          </div>

          {/* Gradient Accents */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-red-500/10 to-transparent rounded-full blur-3xl"></div>

          {/* Main Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={48} className="text-red-500" />
              </div>
              <div className="w-24 h-1 bg-red-500 mx-auto"></div>
            </div>

            {/* Error Message */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
                Something went wrong
              </h1>
              <p className="text-lg text-[#A5ACAF] mb-6 leading-relaxed">
                We apologize for the inconvenience. An unexpected error has occurred. 
                Our team has been notified and is working to resolve the issue.
              </p>
              
              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <details className="text-left bg-[#111111] p-4 rounded-lg border border-[#333333] mb-6">
                  <summary className="cursor-pointer text-[#FD5A1E] font-medium mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="text-xs text-[#A5ACAF] overflow-auto whitespace-pre-wrap">
                    {error.message}
                    {error.stack && (
                      <>
                        {'\n\nStack Trace:\n'}
                        {error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={reset}
                className="group inline-flex items-center justify-center px-6 py-3 bg-[#FD5A1E] text-white font-medium rounded-lg hover:bg-[#FD5A1E]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Try again"
              >
                <RefreshCw size={20} className="mr-2" />
                Try Again
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-[#A5ACAF] text-[#F5F5F5] font-medium rounded-lg hover:bg-[#4d4d4d] hover:border-[#FD5A1E] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A5ACAF] focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Return to homepage"
              >
                <Home size={20} className="mr-2" />
                Go to Homepage
              </Link>
            </div>

            {/* Support Information */}
            <div className="bg-[#111111] rounded-xl p-6 border border-[#333333]">
              <h2 className="text-lg font-semibold text-[#F5F5F5] mb-4">
                Need Immediate Help?
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <a
                  href="tel:+12094035450"
                  className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 transition-colors focus:outline-none focus:underline"
                  aria-label="Call us at (209) 403-5450"
                >
                  Call: (209) 403-5450
                </a>
                <span className="hidden sm:inline text-[#A5ACAF]">•</span>
                <a
                  href="mailto:ampdesignandconsulting@gmail.com"
                  className="text-[#FD5A1E] hover:text-[#FD5A1E]/80 transition-colors focus:outline-none focus:underline"
                  aria-label="Email us at ampdesignandconsulting@gmail.com"
                >
                  Email: ampdesignandconsulting@gmail.com
                </a>
              </div>
              
              <p className="text-[#A5ACAF] text-xs mt-4">
                Error ID: {error.digest || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
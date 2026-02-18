'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { X, Menu } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
}

/**
 * ResizableNavbar Component - Optimized without framer-motion
 *
 * A modern, accessible navbar that adapts on scroll with CSS transitions
 * Performance optimized: Removed framer-motion to reduce main-thread blocking
 */
const ResizableNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Get pathname on client side only
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll events for navbar resize (replaced framer-motion)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Vending Machines', path: '/vending-machines' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-0 z-50 w-full">
      <header
        className={`
          text-[#F5F5F5] border-b border-[#4d4d4d] mx-auto bg-black shadow-lg
          transition-all duration-300 ease-out
          ${isScrolled ? 'w-[96%] backdrop-blur-md' : 'w-full'}
        `}
        style={{
          transitionProperty: 'width, backdrop-filter',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
              <Link href="/"
                aria-label="AMP Vending Machines Homepage"
                aria-current={pathname === '/' ? 'page' : undefined}>
                <Image
                  src="/images/logo/AMP_logo.webp"
                  alt="AMP Vending Logo"
                  width={120}
                  height={73}
                  style={{ height: "auto" }}
                  className={`object-contain transition-all duration-300 ${
                    isScrolled ? 'w-[80px] sm:w-[90px]' : 'w-[100px] sm:w-[120px]'
                  }`}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1"
              aria-label="Main navigation">
              <Link href="/"
                aria-label="Navigate to homepage"
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathname === '/'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:text-[#FD5A1E] hover:bg-[#4d4d4d]/20'
                  }`}>
                Home
              </Link>
              <Link
                href="/vending-machines"
                aria-label="View our vending machines catalog"
                aria-current={pathname === '/vending-machines' ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathname === '/vending-machines'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:text-[#FD5A1E] hover:bg-[#4d4d4d]/20'
                  }`}
              >
                Vending Machines
              </Link>
              <Link
                href="/feedback"
                aria-label="give us your feedback"
                aria-current={pathname === '/feedback' ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathname === '/feedback'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:text-[#FD5A1E] hover:bg-[#4d4d4d]/20'
                  }`}
              >
                Feedback
              </Link>
              <Link
                href="/contact"
                aria-label="Contact us for a quote"
                aria-current={pathname === '/contact' ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathname === '/contact'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:text-[#FD5A1E] hover:bg-[#4d4d4d]/20'
                  }`}
              >
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
              <AccessibleButton
                href="/contact"
                variant="cta"
                size="sm"
                animate
              >
                Free Consultation
              </AccessibleButton>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              {/* // Mobile menu button: */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-[#F5F5F5] hover:text-[#FD5A1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <nav
          id="mobile-menu"
          ref={menuRef}
          className={`
            md:hidden bg-black border-t border-[#4d4d4d]/30
            transition-all duration-300 ease-out overflow-hidden
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
          aria-label="Mobile navigation"
          aria-hidden={!isOpen}
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile CTA Button */}
            <div className="pb-2">
              <AccessibleButton
                href="/contact"
                variant="cta"
                size="md"
                fullWidth
                animate
              >
                Free Consultation
              </AccessibleButton>
            </div>

            {/* Mobile nav items */}
            <div className="space-y-2">
              <Link
                href="/"
                aria-label="Navigate to homepage"
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathname === '/'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:bg-[#4d4d4d]/20 hover:text-[#FD5A1E]'
                  }`}
              >
                Home
              </Link>
              <Link
                href="/vending-machines"
                aria-label="View our vending machines catalog"
                aria-current={pathname === '/vending-machines' ? 'page' : undefined}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathname === '/vending-machines'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:bg-[#4d4d4d]/20 hover:text-[#FD5A1E]'
                  }`}
              >
                Vending Machines
              </Link>
              <Link
                href="/feedback"
                aria-label="give us your feedback"
                aria-current={pathname === '/feedback' ? 'page' : undefined}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathname === '/feedback'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:bg-[#4d4d4d]/20 hover:text-[#FD5A1E]'
                  }`}
              >
                Feedback
              </Link>
              <Link
                href="/contact"
                aria-label="Contact us for a quote"
                aria-current={pathname === '/contact' ? 'page' : undefined}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${pathname === '/contact'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:bg-[#4d4d4d]/20 hover:text-[#FD5A1E]'
                  }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default ResizableNavbar;
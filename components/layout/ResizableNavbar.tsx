'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { AccessibleButton } from '@/components/ui/AccessibleButton';

interface NavItem {
  name: string;
  path: string;
}

/**
 * ResizableNavbar Component
 *
 * A modern, accessible navbar that adapts on scroll with smooth animations
 */
const ResizableNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle scroll events for navbar resize
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Vending Machines', path: '/vending-machines' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-0 z-50 w-full">
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: 0,
          width: isScrolled ? '96%' : '100%',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{
          duration: 0.3,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="text-[#F5F5F5] border-b border-[#4d4d4d] mx-auto bg-black shadow-lg backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link href="/" aria-label="AMP Vending home page">
                <Image
                  src="/images/logo/AMP_logo.png"
                  alt="AMP Vending Logo"
                  width={100}
                  height={100}
                  className="w-22 h-16 transition-all duration-300"
                  style={{ height: 'auto' }}
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-3 py-2 rounded-lg text-[#F5F5F5] hover:text-[#FD5A1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black text-md font-medium transition-colors"
                  aria-current={pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <AccessibleButton
                href="/contact"
                variant="cta"
                size="sm"
                animate
              >
                Free Consultation
              </AccessibleButton>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-[#F5F5F5] hover:text-[#FD5A1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              id="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black border-t border-[#4d4d4d]/30 overflow-hidden"
              aria-label="Mobile navigation"
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
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-[#F5F5F5] hover:bg-[#4d4d4d]/20 hover:text-[#FD5A1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors"
                    aria-current={pathname === item.path ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default ResizableNavbar;
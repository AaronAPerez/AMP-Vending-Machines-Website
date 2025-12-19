'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { X, Menu } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

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
              <Link href="/"
                aria-label="AMP Vending Machines Homepage"
                aria-current={pathname === '/' ? 'page' : undefined}>
                <Image
                  src="/images/logo/AMP_logo.webp"
                  alt="AMP Vending Logo"
                  width={100}
                  height={100}
                  className="transition-all duration-300 h-16 w-22 object-contain"
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1"
              aria-label="Main navigation">
              <Link href="/"
                aria-label="Navigate to homepage"
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  pathname === '/'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:text-[#FD5A1E] hover:bg-[#4d4d4d]/20'
                }`}>
                Home
              </Link>
              <Link
                href="/vending-machines"
                aria-label="View our vending machines catalog"
                aria-current={pathname === '/vending-machines' ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  pathname === '/vending-machines'
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
                className={`px-4 py-2 rounded-lg text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  pathname === '/feedback'
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
                className={`px-4 py-2 rounded-lg text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  pathname === '/contact'
                    ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                    : 'text-[#F5F5F5] hover:text-[#FD5A1E] hover:bg-[#4d4d4d]/20'
                }`}
              >
                Contact
              </Link>
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
        <AnimatePresence>
          {isOpen && (
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
                <div className="space-y-2">
                  <Link
                    href="/"
                    aria-label="Navigate to homepage"
                    aria-current={pathname === '/' ? 'page' : undefined}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      pathname === '/'
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
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      pathname === '/vending-machines'
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
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      pathname === '/feedback'
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
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FD5A1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      pathname === '/contact'
                        ? 'text-[#FD5A1E] bg-[#FD5A1E]/10'
                        : 'text-[#F5F5F5] hover:bg-[#4d4d4d]/20 hover:text-[#FD5A1E]'
                    }`}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default ResizableNavbar;
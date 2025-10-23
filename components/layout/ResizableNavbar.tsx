'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'

// Define types for nav items
interface NavItem {
  name: string;
  path: string;
  children?: NavItemChild[];
}

interface NavItemChild {
  name: string;
  path: string;
}

/**
 * ResizableNavbar Component
 * 
 * A modern navbar that changes width on scroll and provides smooth animations
 * Based on concepts from Aceternity UI
 */
const ResizableNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Also close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]); // pathname from useRouter


  // Handle scroll to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll events
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    // { name: 'About', path: '/about' },
    { name: 'Vending Machines', path: '/vending-machines' },
      //,
      // children: [
      //   { name: 'All Machines', path: '/vending-machines' },
      //   { name: 'Compact Refrigerated', path: '/vending-machines/km-vmr-30-b' },
      //   { name: 'Standard Refrigerated', path: '/vending-machines/km-vmr-40-b' },
      //   { name: 'Non-Refrigerated Snack', path: '/vending-machines/km-vmnt-50-b' },
      //   { name: 'Premium Refrigerated', path: '/vending-machines/km-vmrt-50-b' },
      // ]

    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact', path: '/contact' },
  ];

  // Toggle submenu function
  const toggleSubmenu = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <>
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
          className={`text-[#F5F5F5] border-b border-[#4d4d4d] mx-auto ${isScrolled ? 'bg-black shadow-lg backdrop-blur-md' : 'bg-black shadow-lg backdrop-blur-md'
            }`}
          role="banner"
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
                <Link href="/" className="flex items-center" aria-label="AMP Vending home page">
                  <Image
                    src="/images/logo/AMP_logo.png"
                    alt="AMP Vending Logo"
                    width={100}
                    height={100}
                    className={`transition-all duration-300 bg-transparent z-0 ${isScrolled ? 'w-20 h-12' : 'w-20 h-12'}`}
                    priority
                  />
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    {item.children ? (
                      // Item with dropdown
                      <div>
                        <button
                          className={`px-3 py-2 rounded-lg text-[#F5F5F5] hover:text-[#FD5A1E] flex items-center text-sm font-medium transition-colors`}
                          onClick={(e) => toggleSubmenu(item.name, e)}
                          aria-expanded={activeSubmenu === item.name}
                          aria-controls={`submenu-${item.name}`}
                        >
                          {item.name}
                          <svg
                            className={`ml-1 w-4 h-4 transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-1 w-56 rounded-lg bg-[#4d4d4d] shadow-lg border border-[#a4acac]/20 overflow-hidden z-20"
                            id={`submenu-${item.name}`}
                          >
                            <div className="py-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.path}
                                  className="block px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#FD5A1E]/10 hover:text-[#FD5A1E]"
                                  onClick={() => setActiveSubmenu(null)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      // Regular nav item
                      <Link
                        href={item.path}
                        className="px-3 py-2 rounded-lg text-[#F5F5F5] hover:text-[#FD5A1E] text-md font-medium transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/contact"
                  className={`hidden md:inline-block ${isScrolled ?
                    'px-4 py-2 text-sm' :
                    'px-5 py-2.5 text-base'
                    } bg-[#FD5A1E] text-[#000000] rounded-full hover:bg-[#F5F5F5] hover:text-[#000000] transition-all duration-300 font-medium`}
                >
                  Free Consultation
                </Link>
              </motion.div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-[#F5F5F5] hover:text-[#FD5A1E] focus:outline-none"
                  aria-expanded={isMenuOpen}
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

          {/* Mobile menu with proper animation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-black border-t border-[#4d4d4d]/30 overflow-hidden"
              >
                {/* Improved mobile menu layout */}
                <div className="px-4 py-4 space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name} className="py-1">
                      {item.children ? (
                        <div>
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-[#F5F5F5] hover:bg-[#4d4d4d]/20 hover:text-[#FD5A1E] transition-colors"
                            onClick={(e) => toggleSubmenu(item.name, e)}
                          >
                            {item.name}
                            <svg
                              className={`ml-2 w-5 h-5 transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Mobile dropdown with improved animation */}
                          <AnimatePresence>
                            {activeSubmenu === item.name && (
                              <motion.div
                                initial={{ opacity: 0, y: -5, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -5, height: 0 }}
                                className="ml-4 mt-2 overflow-hidden"
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.path}
                                    className="block px-4 py-3 rounded-lg text-base font-medium text-[#A5ACAF] hover:text-[#FD5A1E] hover:bg-[#4d4d4d]/20 transition-colors"
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setActiveSubmenu(null);
                                    }}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.path}
                          className="block px-4 py-3 rounded-lg text-base font-medium text-[#F5F5F5] hover:bg-[#4d4d4d]/20 hover:text-[#FD5A1E] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </>  
   );
};

export default ResizableNavbar;
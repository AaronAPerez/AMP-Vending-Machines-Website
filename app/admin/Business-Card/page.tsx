'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';
import BusinessCard from '@/components/BusinessCard';




/**
 * Business Card Page Component
 *
 * Displays Andrew Perez's business card in multiple variations
 */
const BusinessCardPage: React.FC = () => {
  return (
    <>
      {/* SEO and Structured Data */}
      <Script
        id="business-card-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AMP Vending Business Card - Andrew Perez",
            "description": "Professional business card for Andrew Perez, President of AMP Design and Consulting LLC. Available in multiple themes and formats.",
            "url": "https://www.ampvendingmachines.com/business-card",
            "mainEntity": {
              "@type": "Person",
              "name": "Andrew Perez",
              "jobTitle": "President",
              "affiliation": {
                "@type": "Organization",
                "name": "AMP Design and Consulting LLC",
                "url": "https://www.ampvendingmachines.com"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+12094035450",
                "email": "ampdesignandconsulting@gmail.com",
                "contactType": "customer service"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4120 Dale Rd Ste J8 1005",
                "addressLocality": "Modesto",
                "addressRegion": "CA",
                "postalCode": "95354",
                "addressCountry": "US"
              }
            }
          })
        }}
      />

      <div className="min-h-screen">
        {/* Page Header */}
        <header className="bg-black/90 py-8 border-b border-[#FD5A1E]/20 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb Navigation */}
              <nav className="mb-4" aria-label="Breadcrumb">
                <ol className="flex items-center justify-center text-sm text-[#A5ACAF] space-x-2">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                      aria-label="Go to homepage"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-[#F5F5F5] font-medium" aria-current="page">
                    Business Card
                  </li>
                </ol>
              </nav>

              <h1 className="text-3xl md:text-4xl font-black text-[#F5F5F5] mb-3">
                AMP Vending <span className="text-[#FD5A1E]">Business Card</span>
              </h1>
              <p className="text-base text-[#A5ACAF] max-w-2xl mx-auto">
                Professional business cards for Andrew Perez, President of AMP Design and Consulting LLC.
              </p>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-16 px-4">
          <div className="max-w-7xl mx-auto space-y-16">

            {/* Compact Cards Section */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Compact <span className="text-[#FD5A1E]">Business Cards</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="dark" variant="compact" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="light" variant="compact" />
                </motion.div>
              </div>
            </section>

            {/* Modern Cards Section */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Modern <span className="text-[#FD5A1E]">Design</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="dark" variant="modern" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="light" variant="modern" />
                </motion.div>
              </div>
            </section>

            {/* Classic Cards Section */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Classic <span className="text-[#FD5A1E]">Professional</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="dark" variant="classic" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="light" variant="classic" />
                </motion.div>
              </div>
            </section>

            {/* Minimal Cards Section */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Minimal <span className="text-[#FD5A1E]">Elegant</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="dark" variant="minimal" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="light" variant="minimal" />
                </motion.div>
              </div>
            </section>

            {/* Vertical Cards Section */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Vertical <span className="text-[#FD5A1E]">Format</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="dark" variant="vertical" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="light" variant="vertical" />
                </motion.div>
              </div>
            </section>

            {/* Horizontal Cards Section */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Horizontal <span className="text-[#FD5A1E]">Layout</span>
              </h2>
              <div className="grid grid-cols-1 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="dark" variant="horizontal" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="matte-black" variant="horizontal" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex justify-center"
                >
                  <BusinessCard theme="light" variant="horizontal" />
                </motion.div>
              </div>
            </section>

          </div>
        </main>

        {/* Footer Note */}
        <footer className="bg-black/90 py-8 border-t border-[#FD5A1E]/20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-300 text-sm mb-2">
              Professional business cards for AMP Vending.
              For vending machine services and consultations, contact Andrew directly.
            </p>
            <p className="text-gray-400 text-xs">
              Last updated: {new Date().toLocaleDateString()} •
              Optimized for print and digital use
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BusinessCardPage;
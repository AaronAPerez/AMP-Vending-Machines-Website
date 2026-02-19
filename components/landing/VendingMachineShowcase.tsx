'use client';

import { getAllVendingMachines, normalizeMachineData } from '@/lib/data/vendingMachineData';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';
import { MachineGrid } from '../vending-machines/listing/MachineGrid';




/**
 * VendingMachineShowcase Component
 * Displays premium vending machines using the reusable MachineCard component
 * Features an interactive image gallery showcasing machine details
 */
const VendingMachineShowcase = ({
  renderHeading = true,
  className = ''
}: {
  renderHeading?: boolean;
  className?: string;
}) => {
  // Track active image in the gallery preview
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Get machine data and normalize for the card component with error handling
  const vendingMachines = getAllVendingMachines()
    .map(normalizeMachineData)
    .filter((machine): machine is NonNullable<typeof machine> => machine !== null);

  // Collect all images from machine data for the showcase gallery
  // Uses useMemo to prevent recalculation on every render
  const showcaseImages = useMemo(() => {
    const allImages: Array<{ src: string; alt: string; machineName: string; machineId: string }> = [];

    vendingMachines.forEach(machine => {
      if (machine.images && Array.isArray(machine.images)) {
        // Take up to 3 images per machine for variety
        machine.images.slice(0, 3).forEach((img: { src: string; alt: string }) => {
          allImages.push({
            src: img.src,
            alt: img.alt,
            machineName: machine.name,
            machineId: machine.id
          });
        });
      }
    });

    // Return a selection of images (limit to 8 for performance)
    return allImages.slice(0, 8);
  }, [vendingMachines]);

  // Navigate to next/previous image in gallery
  const nextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % showcaseImages.length);
  }, [showcaseImages.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);
  }, [showcaseImages.length]);

  return (
    <section
      className={`relative ${className}`}
      itemScope
      itemType="https://schema.org/ItemList"
      aria-labelledby="vending-machines-heading"
    >
      {/* Hidden structured data for SEO */}
      <meta itemProp="numberOfItems" content={vendingMachines.length.toString()} />
      <meta itemProp="itemListOrder" content="https://schema.org/ItemListOrderAscending" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header - Enhanced with SEO keywords */}
        {renderHeading && (
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Commercial Vending Machine Collection</span>
            </motion.div>

            <h2
              id="vending-machines-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#F5F5F5] leading-tight"
              itemProp="name"
            >
              Choose Your <span className="text-[#FD5A1E]">Perfect Vending Machine</span>
            </h2>

            <p className="text-lg sm:text-xl text-[#A5ACAF] max-w-3xl mx-auto leading-relaxed" itemProp="description">
              Professional commercial vending machines with advanced touchscreen technology, contactless payment systems,
              and complete installation & maintenance service packages for offices, schools, and businesses throughout Central California.
            </p>
          </motion.div>
        )}

        {/* Machine Cards using reusable component */}
        {vendingMachines.length > 0 ? (
          <>
            <MachineGrid
              machines={vendingMachines}
              // variant="showcase"
              // className="mb-12"
              // ariaLabel="Featured vending machines collection"
            />

            {/* Custom Request CTA Card - Enhanced for SEO */}
            <motion.div
              className="mt-12 sm:mt-16 mb-16 sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              itemScope
              itemType="https://schema.org/Service"
            >
              <Link href="/contact" itemProp="url">
                <div className="group relative bg-gradient-to-br from-[#FD5A1E]/15 via-[#FD5A1E]/10 to-transparent border-2 border-[#FD5A1E]/40 rounded-2xl p-8 sm:p-10 overflow-hidden hover:border-[#FD5A1E]/60 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-[#FD5A1E]/20">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5" aria-hidden="true">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, #FD5A1E 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                  </div>

                  {/* Hidden SEO metadata */}
                  <meta itemProp="serviceType" content="Custom Commercial Vending Machine Procurement" />
                  <meta itemProp="provider" content="AMP Vending Machines" />
                  <meta itemProp="areaServed" content="Central California, Modesto, Stockton, Fresno, Turlock" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex-1 text-center lg:text-left">
                      {/* Badge */}
                      <motion.div
                        className="inline-flex items-center px-4 py-1.5 bg-[#FD5A1E] text-[#000000] rounded-full text-xs font-bold mb-4 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        CUSTOM VENDING SOLUTIONS AVAILABLE
                      </motion.div>

                      {/* Heading */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F5] mb-3 group-hover:text-[#FD5A1E] transition-colors" itemProp="name">
                        Need a Custom Vending Machine?
                      </h3>

                      {/* Description - Enhanced with SEO keywords */}
                      <p className="text-base sm:text-lg text-[#A5ACAF] mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed" itemProp="description">
                        We&apos;ll source and order a <span className="text-[#F5F5F5] font-semibold">brand new commercial vending machine</span> customized to your exact specifications -
                        including capacity, touchscreen features, refrigeration options, payment systems, or any special business requirements for your Central California location.
                      </p>

                      {/* Feature List - Enhanced with SEO keywords */}
                      <div className="grid sm:grid-cols-2 gap-3 mb-6 text-sm" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <meta itemProp="availability" content="https://schema.org/InStock" />
                        {[
                          'Custom capacity & dimensions for any space',
                          'Latest touchscreen & payment technology',
                          'Factory-direct from premium manufacturers',
                          'Free expert consultation & site assessment'
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center justify-center lg:justify-start gap-2 text-[#A5ACAF]"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                          >
                            <svg className="w-5 h-5 text-[#FD5A1E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="inline-flex items-center px-8 py-4 bg-[#FD5A1E] text-[#000000] rounded-full font-bold text-lg shadow-xl group-hover:shadow-2xl group-hover:shadow-[#FD5A1E]/30 transition-all whitespace-nowrap">
                        Request Custom Machine
                        <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center mb-16 sm:mb-20">
            <div className="bg-[#0a0a0a] rounded-xl p-8 border border-[#333333] max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">
                Machines Loading...
              </h3>
              <p className="text-[#A5ACAF] mb-6">
                Our premium vending machines are being prepared for display.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#000000] font-medium rounded-full hover:bg-[#F5F5F5] transition-colors"
              >
                Contact Us for Information
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action - Enhanced for SEO */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Link
            href="/vending-machines"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors hover:shadow-xl hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
            aria-label="View complete commercial vending machine collection with detailed specifications and pricing"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
            View All Vending Machines & Specifications
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Additional SEO text */}
          <p className="text-[#A5ACAF] text-sm mt-4 max-w-2xl mx-auto">
            Explore our full range of refrigerated and non-refrigerated commercial vending machines for offices, schools, and businesses
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VendingMachineShowcase;

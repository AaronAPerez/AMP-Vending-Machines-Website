/**
 * @fileoverview Unified Machine Card Component with Inline Carousel, Analytics, and SEO
 * @module components/vending-machines/listing/MachineCard
 *
 * Features:
 * - Inline image carousel with prev/next navigation
 * - Analytics tracking (Google Analytics)
 * - Image loading states and error handling
 * - Schema.org structured data for SEO
 * - Proper accessibility (ARIA labels, keyboard navigation, touch targets)
 * - Responsive design with variants
 */

'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

interface MachineCardProps {
  machine: {
    id: string;
    name: string;
    shortDescription?: string;
    description?: string;
    category: 'refrigerated' | 'non-refrigerated';
    images: Array<{ id?: number; src: string; alt: string }>;
    image?: string; // Fallback for single image
    dimensions?: string | Array<{ label: string; value: string }>;
    highlights?: string[];
    features?: Array<{ title: string; description?: string }>;
    bestFor?: string | string[];
  };
  index: number;
  variant?: 'grid' | 'showcase' | 'list';
  onClick?: (machine: any) => void;
}

/**
 * Unified machine card with all features
 */
export const MachineCard: React.FC<MachineCardProps> = ({
  machine,
  index,
  onClick
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  // Track selected image index for this machine's carousel
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Determine capacity for specs
  const capacity = machine.dimensions?.toString().includes('40+') ? '40+ Selections' :
                   machine.dimensions?.toString().includes('50+') ? '50+ Selections' :
                   machine.dimensions?.toString().includes('800') ? '800 Cans' : '30-50 Selections';

  // Get this machine's images (limit to 5 for thumbnail display)
  const machineImages = machine.images?.slice(0, 5) || [];
  const totalImages = machineImages.length;

  // Carousel navigation handlers with useCallback for performance
  const goToPrevious = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const goToNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  // Get currently selected image for this machine
  const currentImage = machineImages[selectedImageIndex] || machineImages[0];
  const primaryImage = currentImage?.src || machine.image || '/images/placeholder.svg';
  const primaryImageAlt = currentImage?.alt || machine.name;

  // Handle image load/error
  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Analytics tracking
  const handleCardClick = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = window.gtag as (command: string, eventName: string, params: Record<string, unknown>) => void;
      gtag('event', 'machine_card_click', {
        event_category: 'Machine Interaction',
        event_label: machine.id,
        machine_name: machine.name,
        machine_category: machine.category,
        value: 1
      });
    }

    if (onClick) {
      onClick(machine);
    }
  };

  return (
    <>
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative z-30"
        style={{ pointerEvents: 'auto' }}
        itemScope
        itemType="https://schema.org/Product"
      >
        {/* Hidden structured data for SEO */}
        <meta itemProp="category" content={machine.category === 'refrigerated' ? 'Refrigerated Vending Machine' : 'Non-Refrigerated Vending Machine'} />
        <meta itemProp="sku" content={machine.id} />
        <meta itemProp="name" content={machine.name} />
        {machine.shortDescription && <meta itemProp="description" content={machine.shortDescription} />}

        <Link
          href={`/vending-machines/${machine.id}`}
          onClick={handleCardClick}
          className="block bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FD5A1E]/20 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] cursor-pointer"
          aria-label={`View details for ${machine.name}`}
          style={{ pointerEvents: 'auto' }}
          itemProp="url"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 p-6 lg:p-8">
            {/* Image Section */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#000000] group/image">
                {/* Loading skeleton */}
                {imageLoading && (
                  <div className="absolute inset-0 bg-[#333333] animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-[#FD5A1E]/20 border-t-[#FD5A1E] rounded-full animate-spin" />
                  </div>
                )}

                {/* Machine Image */}
                {!imageError ? (
                  <Image
                    src={primaryImage}
                    alt={primaryImageAlt}
                    fill
                    className={`object-contain group-hover:scale-110 transition-transform duration-700 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    priority={index < 3}
                    itemProp="image"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#333333] to-[#1a1a1a] flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-[#FD5A1E] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span className="text-[#A5ACAF] text-sm">Machine Image</span>
                  </div>
                )}

                {/* Category Badge */}
                <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold ${
                  machine.category === 'refrigerated'
                    ? 'bg-black/80 text-blue-400 border border-blue-500/30'
                    : 'bg-black/80 text-orange-400 border border-orange-500/30'
                }`}>
                  {machine.category === 'refrigerated' ? '❄️ Refrigerated' : '📦 Non-Refrigerated'}
                </span>

                {/* Carousel Navigation Arrows - Only show if multiple images */}
                {totalImages > 1 && (
                  <>
                    {/* Previous Arrow - Left side with 44x44px touch target for accessibility */}
                    <button
                      onClick={goToPrevious}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#FD5A1E] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black z-40"
                      style={{ pointerEvents: 'auto' }}
                      type="button"
                      aria-label={`Previous image of ${machine.name} (${selectedImageIndex + 1} of ${totalImages})`}
                    >
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Next Arrow - Right side with 44x44px touch target for accessibility */}
                    <button
                      onClick={goToNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#FD5A1E] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black z-40"
                      style={{ pointerEvents: 'auto' }}
                      type="button"
                      aria-label={`Next image of ${machine.name} (${selectedImageIndex + 1} of ${totalImages})`}
                    >
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Image Counter Badge */}
                    <div
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {selectedImageIndex + 1} / {totalImages}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip - Shows only this machine's images */}
              {machineImages.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {machineImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedImageIndex(idx);
                      }}
                      className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all ${
                        selectedImageIndex === idx
                          ? 'ring-2 ring-[#FD5A1E] opacity-100 scale-105'
                          : 'opacity-60 hover:opacity-100 border border-[#333333]'
                      }`}
                      aria-label={`View image ${idx + 1} of ${machine.name}`}
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Best For Section - Moved under image */}
              {machine.bestFor && (
                <div className="mt-4 px-4">
                  <p className="text-[#A5ACAF] text-sm">
                    <span className="font-semibold text-[#F5F5F5]">Ideal For:</span>{' '}
                    {typeof machine.bestFor === 'string'
                      ? machine.bestFor.split(',').slice(0, 2).join(', ')
                      : Array.isArray(machine.bestFor)
                        ? machine.bestFor.slice(0, 2).join(', ')
                        : 'Offices & Commercial Spaces'}
                  </p>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-3 group-hover:text-[#FD5A1E] transition-colors">
                  {machine.name}
                </h3>
                <p className="text-[#A5ACAF] mb-4 leading-relaxed">
                  {machine.shortDescription || machine.description}
                </p>

                {/* Key Specifications */}
                <div className="bg-[#4d4d4d]/20 rounded-xl p-4 mb-4">
                  <h4 className="text-sm font-bold text-[#FD5A1E] mb-3 uppercase tracking-wide">
                    Key Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" />
                      </svg>
                      <div>
                        <div className="text-[#A5ACAF] text-xs">Capacity</div>
                        <div className="text-[#F5F5F5] font-semibold">{capacity}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <div>
                        <div className="text-[#A5ACAF] text-xs">Payment</div>
                        <div className="text-[#F5F5F5] font-semibold">Card & Mobile</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                {machine.highlights && machine.highlights.length > 0 && (
                  <div className="space-y-2">
                    {machine.highlights.slice(0, 3).map((highlight: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#A5ACAF]">
                        <svg className="w-5 h-5 text-[#FD5A1E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-4 mt-6 border-t border-[#333333]">
                <div className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#000000] rounded-full font-semibold group-hover:bg-[#FD5A1E]/90 transition-all">
                  View Details
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    </>
  );
};

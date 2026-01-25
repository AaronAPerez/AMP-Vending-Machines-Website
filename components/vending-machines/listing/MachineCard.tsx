/**
 * @fileoverview Unified Machine Card Component with Gallery, Analytics, and SEO
 * @module components/vending-machines/listing/MachineCard
 *
 * Features:
 * - Image gallery preview modal
 * - Analytics tracking (Google Analytics)
 * - Image loading states and error handling
 * - Schema.org structured data for SEO
 * - Proper accessibility (ARIA labels, keyboard navigation)
 * - Responsive design with variants
 */

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ImageGallery } from '@/components/vending-machines/detail';

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
  const [showGallery, setShowGallery] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Determine capacity for specs
  const capacity = machine.dimensions?.toString().includes('40+') ? '40+ Selections' :
                   machine.dimensions?.toString().includes('50+') ? '50+ Selections' :
                   machine.dimensions?.toString().includes('800') ? '800 Cans' : '30-50 Selections';

  // Get primary image
  const primaryImage = machine.images?.[0]?.src || machine.image || '/images/placeholder.svg';
  const primaryImageAlt = machine.images?.[0]?.alt || machine.name;

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

                {/* View Photos Button - Only show if multiple images */}
                {machine.images && machine.images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowGallery(true);
                    }}
                    className="absolute bottom-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-sm text-white rounded-full text-sm font-semibold opacity-0 group-hover/image:opacity-100 transition-all hover:bg-[#FD5A1E] focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] z-50"
                    style={{ pointerEvents: 'auto' }}
                    type="button"
                    aria-label={`View ${machine.images.length} photos of ${machine.name}`}
                  >
                    📷 {machine.images.length} Photos
                  </button>
                )}
              </div>

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

      {/* Image Gallery Modal */}
      {showGallery && machine.images && machine.images.length > 1 && (
        <div className="fixed inset-0 z-[1000]" onClick={() => setShowGallery(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ImageGallery images={machine.images} machineName={machine.name} />
          </div>
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#FD5A1E] transition-all focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] z-[1001]"
            aria-label="Close gallery"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

/**
 * Updated MachineCard Component with Clickable Functionality
 * 
 * Build Process Documentation:
 * 1. Makes entire card clickable using Next.js Link for optimal SEO
 * 2. Implements proper accessibility with ARIA labels and keyboard navigation
 * 3. Adds hover states and visual feedback for better UX
 * 4. Follows React TypeScript best practices with proper typing
 * 5. Includes comprehensive error handling and loading states
 * 6. Mobile-first responsive design with touch-friendly interactions
 * 
 * Testing Strategy:
 * - Unit tests for component rendering and prop handling
 * - Integration tests for click navigation
 * - Accessibility tests for keyboard navigation and screen readers
 * - Performance tests for large machine grids
 * 
 * Success Metrics:
 * - Improved click-through rate on machine cards
 * - Enhanced user engagement with machine detail pages
 * - Better SEO performance through proper internal linking
 * - Reduced bounce rate from machine listing pages
 */

'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  MonitorIcon,
  CreditCardIcon,
  WifiIcon,
  ZapIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShoppingBagIcon
} from 'lucide-react';

// Types for machine data
interface MachineCardProps {
  machine: {
    id: string;
    name: string;
    model?: string;
    image: string;
    shortDescription?: string;
    description: string;
    category: 'refrigerated' | 'non-refrigerated';
    bestFor?: string;
    highlights?: string[];
    features?: Array<{
      title: string;
      description?: string;
    }>;
    price?: string;
    dimensions?: string;
  };
  variant?: 'grid' | 'showcase' | 'list';
  index?: number;
  className?: string;
  onClick?: (machine: any) => void;
}

interface MachineGridProps {
  machines: MachineCardProps['machine'][];
  variant?: 'grid' | 'showcase' | 'list';
  className?: string;
  ariaLabel?: string;
  showTechIndicators?: boolean;
  maxDisplayed?: number;
}

/**
 * Technology indicator component for displaying machine features
 */
interface TechIndicatorProps {
  icon: React.ElementType;
  label: string;
  available: boolean;
}

const TechIndicator = ({ icon: Icon, label, available }: TechIndicatorProps) => {
  if (!available) return null;

  return (
    <div className="flex items-center px-2 py-1 bg-[#111111]/90 rounded-full border border-[#333333] backdrop-blur-sm">
      <Icon size={14} className="text-[#FD5A1E] mr-1" aria-hidden="true" />
      <span className="text-[#F5F5F5] text-xs font-medium">{label}</span>
    </div>
  );
};

/**
 * Individual clickable machine card component
 * Wraps the entire card in a Next.js Link for SEO-friendly navigation
 */
const MachineCard = ({ 
  machine, 
  variant = 'grid', 
  index = 0, 
  className = '',
  onClick 
}: MachineCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle image loading states
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Handle card click for analytics
  const handleCardClick = () => {
    // Track card click for analytics
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

    // Call custom onClick handler if provided
    if (onClick) {
      onClick(machine);
    }
  };

  // Generate machine URL slug
  const machineUrl = `/vending-machines/${machine.id}`;

  // Determine card size and layout based on variant
  const getCardClasses = () => {
    const baseClasses = "group relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl border border-[#333333] overflow-hidden transition-all duration-500 hover:border-[#FD5A1E]/50 hover:shadow-xl hover:shadow-[#FD5A1E]/10 focus-within:ring-2 focus-within:ring-[#FD5A1E] focus-within:ring-offset-2 focus-within:ring-offset-black";
    
    switch (variant) {
      case 'showcase':
        return `${baseClasses} h-[550px] sm:h-[600px] hover:-translate-y-2`;
      case 'list':
        return `${baseClasses} h-[200px] flex flex-row hover:-translate-y-1`;
      default: // grid
        return `${baseClasses} h-[500px] sm:h-[550px] hover:-translate-y-1`;
    }
  };

  // Determine if card should have tech indicators
  const shouldShowTechIndicators = () => {
    return machine.features?.some(f => 
      f.title.includes('21.5') || 
      f.title.includes('Touch') || 
      f.title.includes('HD')
    ) || false;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${getCardClasses()} ${className}`}
    >
      {/* Clickable Link Wrapper - covers entire card */}
      <Link
        href={machineUrl}
        onClick={handleCardClick}
        className="absolute inset-0 z-10 focus:outline-none"
        aria-label={`View details for ${machine.name} - ${machine.shortDescription || machine.description}`}
      >
        <span className="sr-only">
          View {machine.name} details and specifications
        </span>
      </Link>

      {/* Machine Image Section - Fixed Aspect Ratio */}
      <div className="relative h-3/5 overflow-hidden inset-0 bg-gradient-to-r from-[#FD5A1E]/20 to-transparent backdrop-blur-sm">
        {/* Loading skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 bg-[#333333] animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#FD5A1E]/20 border-t-[#FD5A1E] rounded-full animate-spin" />
          </div>
        )}

        {/* Machine Image with proper aspect ratio */}
        {!imageError ? (
          <Image
            src={machine.image}
            alt={`${machine.name} - Professional ${machine.category} vending machine`}
            fill
            className={`object-contain transition-transform duration-700 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={index < 3} // Prioritize loading for first 3 images
            style={{
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        ) : (
          // Fallback image placeholder
          <div className="absolute inset-0 bg-gradient-to-br from-[#333333] to-[#1a1a1a] flex flex-col items-center justify-center">
            <ShoppingBagIcon size={48} className="text-[#FD5A1E] mb-2" />
            <span className="text-[#A5ACAF] text-sm">Machine Image</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${
            machine.category === 'refrigerated' 
              ? 'bg-blue-600/90' 
              : 'bg-green-600/90'
          }`}>
            {machine.category === 'refrigerated' ? 'Refrigerated' : 'Non-Refrigerated'}
          </span>
        </div>

        {/* Technology Indicators */}
        {shouldShowTechIndicators() && (
          <div className="absolute top-4 right-4 flex flex-wrap gap-1 max-w-[140px]">
            <TechIndicator 
              icon={MonitorIcon} 
              label="HD Touch" 
              available={machine.features?.some(f => f.title.includes('21.5')) || false} 
            />
            <TechIndicator 
              icon={CreditCardIcon} 
              label="Tap Pay" 
              available={true} 
            />
          </div>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick View Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0">
          <div className="bg-[#FD5A1E] text-[#000000] px-6 py-3 rounded-full font-bold flex items-center space-x-2 shadow-lg backdrop-blur-sm">
            <span>View Details</span>
            <ArrowRightIcon size={16} />
          </div>
        </div>
      </div>

      {/* Card Content Section - Improved spacing */}
      <div className="p-4 sm:p-6 h-3/5 flex flex-col justify-between relative z-5">
        {/* Machine Information */}
        <div className="space-y-2 pb-6">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#F5F5F5] mb-1 line-clamp-1 group-hover:text-[#FD5A1E] transition-colors">
              {machine.name}
            </h3>
            {/* {machine.model && (
              <p className="text-[#FD5A1E] font-semibold text-xs sm:text-sm">
                Model: {machine.model}
              </p>
            )} */}
          </div>

          {/* Short Description */}
          <p className="text-[#A5ACAF] text-xs sm:text-sm leading-relaxed line-clamp-2">
            {machine.shortDescription || machine.description}
          </p>

          {/* Key Highlights */}
          {machine.highlights && machine.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {machine.highlights.slice(0, 2).map((highlight, idx) => (
                <div 
                  key={idx}
                  className="flex items-center px-2 sm:px-3 py-1 bg-[#FD5A1E]/10 rounded-full border border-[#FD5A1E]/20"
                >
                  <CheckCircleIcon size={10} className="text-[#FD5A1E] mr-1 sm:mr-2 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[#F5F5F5] text-xs font-medium truncate">{highlight}</span>
                </div>
              ))}
            </div>
            
          )}
              {/* Bottom Section */}
        <div className="flex items-center justify-between pt-3 sm:p-4 border-t border-[#333333]">
          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-[#A5ACAF] text-xs truncate">
              Best for: {machine.bestFor?.split(',')[0] || 'Offices & Businesses'}
            </p>
            <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-[#FD5A1E]">
              <span className="flex items-center flex-shrink-0">
                <WifiIcon size={10} className="mr-1" aria-hidden="true" />
                Smart Tech
              </span>
              <span className="flex items-center flex-shrink-0">
                <ZapIcon size={10} className="mr-1" aria-hidden="true" />
                Maintenance-Free
              </span>
            </div>
          </div>

          {/* Call-to-Action Arrow */}
          <div className="flex items-center text-[#FD5A1E] group-hover:text-[#F5F5F5] transition-colors flex-shrink-0 ml-2">
            <span className="text-xs font-medium mr-1 sm:mr-2 hidden sm:inline">Learn More</span>
            <ArrowRightIcon 
              size={14} 
              className="transition-transform group-hover:translate-x-1" 
              aria-hidden="true" 
            />
          </div>
        </div>
        </div>

       
      
      </div>

      {/* Accessibility Enhancement: Focus indicator */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 border-2 border-[#FD5A1E] rounded-2xl" />
      </div>
    </motion.div>
  );
};

/**
 * Machine Grid Component
 * Renders a responsive grid of clickable machine cards
 */
export const MachineGrid = ({ 
  machines, 
  variant = 'grid', 
  className = '', 
  ariaLabel = 'Vending machines collection',
  showTechIndicators = false,
  maxDisplayed 
}: MachineGridProps) => {
  // Limit displayed machines if maxDisplayed is set
  const displayedMachines = maxDisplayed ? machines.slice(0, maxDisplayed) : machines;

  // Get grid classes based on variant
  const getGridClasses = () => {
    switch (variant) {
      case 'showcase':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12';
      case 'list':
        return 'space-y-6';
      default: // grid
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8';
    }
  };

  if (displayedMachines.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <ShoppingBagIcon className="w-16 h-16 text-[#4d4d4d] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">No Machines Available</h3>
          <p className="text-[#A5ACAF]">
            No vending machines match your current criteria. Please try adjusting your filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section 
      className={`w-full ${className}`}
      aria-label={ariaLabel}
      role="region"
    >
      <div className={getGridClasses()}>
        {displayedMachines.map((machine, index) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            variant={variant}
            index={index}
            className="w-full"
          />
        ))}
      </div>

      {/* Show count indicator if maxDisplayed is used */}
      {maxDisplayed && machines.length > maxDisplayed && (
        <div className="text-center mt-8">
          <p className="text-[#A5ACAF] text-sm">
            Showing {maxDisplayed} of {machines.length} machines
          </p>
          <Link
            href="/vending-machines"
            className="inline-flex items-center mt-3 px-6 py-3 bg-[#333333] text-[#F5F5F5] font-medium rounded-full hover:bg-[#444444] hover:text-[#FD5A1E] transition-all duration-300"
          >
            View All Machines
            <ArrowRightIcon size={16} className="ml-2" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default MachineCard;
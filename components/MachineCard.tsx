'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  MonitorIcon,
  CreditCardIcon,
  WifiIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon
} from 'lucide-react';

/**
 * Interface for vending machine data
 * Supports both string and object feature formats for flexibility
 */
interface VendingMachine {
  id: string;
  name: string;
  // model: string;
  image: string;
  features?: Array<{ title: string; description?: string }> | string[];
  dimensions: string;
  bestFor: string | string[];
  description: string;
  category: 'refrigerated' | 'non-refrigerated';
  highlights: string[];
  shortDescription?: string;
}

/**
 * Props for MachineCard component
 * Supports multiple variants for different use cases across the site
 */
export interface MachineCardProps {
  /** Machine data to display */
  machine: VendingMachine;
  /** Index for staggered animations */
  index: number;
  /** Whether this card is currently active/hovered */
  isActive?: boolean;
  /** Hover handler for parent state management */
  onHover?: (index: number | null) => void;
  /** Layout variant for different use cases */
  variant?: 'showcase' | 'grid' | 'related' | 'compact' | 'feature';
  /** Custom className for additional styling */
  className?: string;
  /** Whether to show all highlights or limit them */
  showAllHighlights?: boolean;
  /** Whether to show technology indicators */
  showTechIndicators?: boolean;
  /** Custom animation delay */
  animationDelay?: number;
  /** Whether to show action buttons */
  showActions?: boolean;
  /** Custom aria label for accessibility */
  ariaLabel?: string;
}

/**
 * Reusable MachineCard Component
 * 
 * A comprehensive, accessible machine card component that adapts to different
 * layout needs across the application. Supports multiple variants, animations,
 * and accessibility features.
 * 
 * Features:
 * - Multiple layout variants (showcase, grid, related, compact, feature)
 * - Responsive design with mobile-first approach
 * - Full accessibility support with ARIA labels and keyboard navigation
 * - Smooth animations and hover states
 * - Customizable content display based on variant
 * - Touch-friendly interactive elements
 */
export const MachineCard = ({
  machine,
  index,
  isActive = false,
  onHover,
  variant = 'grid',
  className = '',
  showAllHighlights = false,
  showTechIndicators = true,
  animationDelay,
  showActions = true,
  ariaLabel
}: MachineCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Calculate animation delay
  const delay = animationDelay ?? index * 0.2;

  /**
   * Navigate to machine detail page
   * Handles both click and keyboard interaction
   */
  const handleNavigateToDetail = () => {
    window.location.href = `/vending-machines/${machine.id}`;
  };

  /**
   * Handle keyboard navigation for accessibility
   */
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigateToDetail();
    }
  };

  /**
   * Get responsive height classes based on variant
   */
  const getImageHeightClasses = (): string => {
    switch (variant) {
      case 'showcase':
        return 'h-80 md:h-96 lg:h-[400px]';
      case 'feature':
        return 'h-64 md:h-72 lg:h-80';
      case 'grid':
        return 'h-60 sm:h-64 md:h-72';
      case 'related':
        return 'h-48 sm:h-56 md:h-64';
      case 'compact':
        return 'h-40 sm:h-48';
      default:
        return 'h-60 sm:h-64 md:h-72';
    }
  };

  /**
   * Get card padding based on variant
   */
  const getCardSpacing = (): string => {
    switch (variant) {
      case 'showcase':
        return 'p-6 sm:p-8 lg:p-10';
      case 'feature':
        return 'p-6 sm:p-8';
      case 'compact':
        return 'p-4';
      case 'related':
        return 'p-4 sm:p-5';
      default:
        return 'p-5 sm:p-6';
    }
  };

  /**
   * Get highlights to display based on variant and settings
   */
  const getDisplayHighlights = (): string[] => {
    if (showAllHighlights) return machine.highlights;
    
    switch (variant) {
      case 'showcase':
      case 'feature':
        return machine.highlights;
      case 'compact':
        return machine.highlights.slice(0, 2);
      case 'related':
        return machine.highlights.slice(0, 2);
      default:
        return machine.highlights.slice(0, 3);
    }
  };

  /**
   * Get title size classes based on variant
   */
  const getTitleClasses = (): string => {
    switch (variant) {
      case 'showcase':
        return 'text-2xl sm:text-3xl lg:text-4xl';
      case 'feature':
        return 'text-xl sm:text-2xl lg:text-3xl';
      case 'compact':
        return 'text-lg sm:text-xl';
      case 'related':
        return 'text-lg sm:text-xl';
      default:
        return 'text-xl sm:text-2xl';
    }
  };

  /**
   * Get text size classes for descriptions
   */
  const getTextClasses = (): string => {
    switch (variant) {
      case 'showcase':
        return 'text-base sm:text-lg';
      case 'compact':
        return 'text-xs sm:text-sm';
      default:
        return 'text-sm sm:text-base';
    }
  };

  /**
   * Get button size classes
   */
  const getButtonClasses = (): string => {
    switch (variant) {
      case 'showcase':
        return 'py-4 px-6 text-base';
      case 'compact':
        return 'py-2 px-4 text-xs';
      case 'related':
        return 'py-2 px-4 text-sm';
      default:
        return 'py-3 px-5 text-sm';
    }
  };

  /**
   * Normalize bestFor to string format for display
   */
  const getBestForDisplay = (): string => {
    if (Array.isArray(machine.bestFor)) {
      return machine.bestFor.slice(0, 2).join(', ');
    }
    return machine.bestFor;
  };

  const displayHighlights = getDisplayHighlights();
  const accessibilityLabel = ariaLabel || `${machine.name} vending machine card`;

  

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 ${
        isActive
          ? 'bg-[#111111] ring-2 ring-[#FD5A1E] shadow-2xl shadow-[#FD5A1E]/20 transform scale-[1.02]'
          : 'bg-[#0d0d0d] ring-1 ring-[#333333] hover:bg-[#111111] hover:ring-[#FD5A1E]/50'
      } ${className}`}
      onMouseEnter={() => onHover?.(index)}
      onMouseLeave={() => onHover?.(null)}
      aria-label={accessibilityLabel}
    >
      {/* Interactive Machine Image Section */}
      <div
        className={`relative ${getImageHeightClasses()} overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] focus-within:scale-[1.02]`}
        onClick={handleNavigateToDetail}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${machine.name} vending machine`}
        aria-describedby={`machine-description-${machine.id}`}
      >
        {/* Category Badge */}
        <motion.div
          className="absolute top-3 left-3 z-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          <span 
            className={`px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg ${
              machine.category === 'refrigerated' ? 'bg-blue-600' : 'bg-green-600'
            }`}
            aria-label={`${machine.category} vending machine`}
          >
            {machine.category === 'refrigerated' ? 'Refrigerated' : 'Non-Refrigerated'}
          </span>
        </motion.div>

        {/* Service Badge */}
        <motion.div
          className="absolute top-3 right-3 z-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
        >
          <span 
            className="bg-[#FD5A1E] text-[#000000] px-3 py-1.5 rounded-full font-medium text-xs shadow-lg flex items-center"
            aria-label="Full service installation and maintenance included"
          >
            <CheckCircleIcon size={12} className="mr-1" aria-hidden="true" />
            Full Service
          </span>
        </motion.div>

        {/* Hover/Focus Interaction Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="bg-[#FD5A1E]/90 backdrop-blur-sm px-4 py-2 rounded-full text-[#000000] font-bold text-sm transform translate-y-4 group-hover:translate-y-0 focus-within:translate-y-0 transition-transform duration-300 flex items-center">
            <MonitorIcon size={14} className="mr-2" aria-hidden="true" />
            View Details
            <ArrowRightIcon size={14} className="ml-2" aria-hidden="true" />
          </div>
        </div>

        {/* Machine Image */}
        <div className="relative z-0 h-full w-full bg-gradient-to-r from-[#FD5A1E]/5 to-transparent">
          <Image
            src={machine.image}
            alt={`${machine.name} 
              
               vending machine`}
            fill
            sizes={
              variant === 'showcase' 
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            }
            className={`object-contain p-4 transition-all duration-700 ${
              isActive ? 'scale-105' : 'scale-100'
            } group-hover:scale-105 focus-within:scale-105`}
            priority={index === 0}
            onError={(e) => {
              console.warn(`Failed to load image for ${machine.name}:`, machine.image);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Technology Indicators */}
        {showTechIndicators && (
          <motion.div
            className="absolute bottom-3 left-3 flex space-x-2 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 0.5 }}
            aria-label="Technology features"
          >
            {[
              { Icon: MonitorIcon, label: 'Touchscreen interface' },
              { Icon: CreditCardIcon, label: 'Multiple payment options' },
              { Icon: WifiIcon, label: 'Smart connectivity' }
            ].map(({ Icon, label }, iconIndex) => (
              <div
                key={iconIndex}
                className="w-8 h-8 bg-[#000000]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#FD5A1E]/30"
                title={label}
                aria-label={label}
              >
                <Icon size={14} className="text-[#FD5A1E]" aria-hidden="true" />
              </div>
            ))}
          </motion.div>
        )}

        {/* Accessibility Focus Ring */}
        <div 
          className="absolute inset-0 ring-2 ring-[#FD5A1E] ring-offset-2 ring-offset-[#000000] opacity-0 focus-within:opacity-100 transition-opacity duration-200 rounded-2xl pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Content Section */}
      <div className={`${getCardSpacing()} flex-1 flex flex-col`}>
        {/* Machine Header */}
        <div className="mb-4">
          <Link
            href={`/vending-machines/${machine.id}`}
            className="group/title"
            aria-label={`View ${machine.name} detailed specifications`}
          >
            <h2 
              className={`${getTitleClasses()} font-bold text-[#F5F5F5] mb-2 group-hover/title:text-[#FD5A1E] transition-colors cursor-pointer line-clamp-2`}
            >
              {machine.name}
            </h2>
          </Link>
          {variant !== 'compact' && (
            <p className="text-[#FD5A1E] text-sm font-medium"></p>
          )}
        </div>

        {/* Description */}
        <div id={`machine-description-${machine.id}`} className="mb-4">
          <p className={`${getTextClasses()} text-[#A5ACAF] leading-relaxed line-clamp-3`}>
            {machine.shortDescription || machine.description}
          </p>
        </div>

        {/* Key Highlights */}
        {displayHighlights.length > 0 && (
          <div className="mb-4 flex-1">
            <h3 className={`text-[#F5F5F5] font-bold flex items-center mb-3 ${
              variant === 'compact' ? 'text-sm' : 'text-base'
            }`}>
              <StarIcon 
                size={variant === 'compact' ? 14 : 16} 
                className="text-[#fdf61e] mr-2" 
                aria-hidden="true"
              />
              Key Features
            </h3>
            <ul className={`grid gap-2 ${
              variant === 'related' || variant === 'compact' 
                ? 'grid-cols-1' 
                : 'grid-cols-1 sm:grid-cols-2'
            }`}>
              {displayHighlights.map((highlight, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: delay + 0.6 + (idx * 0.1) }}
                  className="flex items-start"
                >
                  <CheckCircleIcon 
                    size={variant === 'compact' ? 12 : 14} 
                    className="text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" 
                    aria-hidden="true"
                  />
                  <span className={`text-[#F5F5F5] ${
                    variant === 'compact' ? 'text-xs' : 'text-sm'
                  }`}>
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Specifications Grid - Hidden for compact variant */}
        {/* {variant !== 'compact' && (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mb-6">
            <div className="bg-[#000000]/50 p-3 rounded-lg border border-[#333333]">
              <div className="text-[#A5ACAF] text-xs mb-1 uppercase tracking-wide">
                Dimensions
              </div>
              <div className={`text-[#F5F5F5] font-medium ${
                variant === 'related' ? 'text-xs' : 'text-sm'
              }`}>
                {machine.dimensions}
              </div>
            </div>
            <div className="bg-[#000000]/50 p-3 rounded-lg border border-[#333333]">
              <div className="text-[#A5ACAF] text-xs mb-1 uppercase tracking-wide">
                Best For
              </div>
              <div className={`text-[#F5F5F5] leading-tight ${
                variant === 'related' ? 'text-xs' : 'text-sm'
              }`}>
                {getBestForDisplay()}
              </div>
            </div>
          </div>
        )} */}

        {/* Action Buttons */}
        {showActions && (
          <div className={`flex gap-3 mt-auto ${
            variant === 'compact' ? 'flex-col' : 'flex-col sm:flex-row'
          }`}>
            <Link
              href={`/vending-machines/${machine.id}`}
              className={`flex-1 ${getButtonClasses()} bg-[#FD5A1E] text-[#000000] font-medium rounded-full text-center hover:bg-[#FD5A1E]/90 active:bg-[#FD5A1E]/80 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black touch-manipulation`}
              aria-label={`View detailed specifications for ${machine.name} vending machine`}
            >
              <span>View Details</span>
              <ArrowRightIcon 
                size={variant === 'compact' ? 12 : 14} 
                className="ml-2 group-hover:translate-x-1 transition-transform" 
                aria-hidden="true"
              />
            </Link>
            
            {variant !== 'compact' && (
              <Link
                href="/contact"
                className={`flex-1 ${getButtonClasses()} bg-transparent text-[#F5F5F5] border border-[#333333] rounded-full text-center hover:bg-[#333333] hover:border-[#FD5A1E] active:bg-[#444444] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 focus:ring-offset-black touch-manipulation`}
                aria-label={`Request consultation for ${machine.name} installation`}
              >
                Get Consultation
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};


/**
 * MachineGrid Component
 * 
 * Displays a responsive grid of machine cards with proper spacing
 * and accessibility features. Handles hover states and animations.
 */
export interface MachineGridProps {
  machines: VendingMachine[];
  variant?: 'showcase' | 'grid' | 'related';
  className?: string;
  maxItems?: number;
  showTechIndicators?: boolean;
  ariaLabel?: string;
}

export const MachineGrid = ({ 
  machines, 
  variant = 'grid', 
  className = '',
  maxItems,
  showTechIndicators = true,
  ariaLabel = "Vending machines collection"
}: MachineGridProps) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  
  const displayMachines = maxItems ? machines.slice(0, maxItems) : machines;
  
  // Get responsive grid classes based on variant
  const getGridClasses = (): string => {
    switch (variant) {
      case 'showcase':
        return 'grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-12';
      case 'related':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8';
    }
  };

  return (
    <section 
      className={`${getGridClasses()} ${className}`}
      aria-label={ariaLabel}
    >
      {displayMachines.map((machine, index) => (
        <MachineCard
          key={machine.id}
          machine={machine}
          index={index}
          isActive={activeIndex === index}
          onHover={setActiveIndex}
          variant={variant}
          showTechIndicators={showTechIndicators}
        />
      ))}
    </section>
  );
};

export default MachineCard;
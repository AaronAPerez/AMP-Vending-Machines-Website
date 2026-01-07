'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  MonitorIcon,
  CreditCardIcon,
  WifiIcon,
  ZapIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon
} from 'lucide-react';

/**
 * Types for our vending machines
 */
interface VendingMachine {
  id: string;
  name: string;
  model: string;
  image: string;
  features: string[];
  dimensions: string;
  bestFor: string;
  description: string;
  category: 'refrigerated' | 'non-refrigerated';
  highlights: string[];
}

/**
 * Props for VendingMachineShowcase component
 */
interface VendingMachineShowcaseSectionProps {
  /**
   * Whether to render the section heading inside this component
   * @default true
   */
  renderHeading?: boolean;
  
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * MachineCard Component
 * Individual machine card with enhanced interactivity and animations
 * Features clickable images that work across all devices
 */
interface MachineCardProps {
  machine: VendingMachine;
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

const MachineCard = ({ machine, index, isActive, onHover }: MachineCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /**
   * Handle machine image click - navigate to detail page
   */
  const handleImageClick = () => {
    window.location.href = `/vending-machines/${machine.id}`;
  };

  /**
   * Handle keyboard navigation for image interaction
   */
  const handleImageKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleImageClick();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 ${
        isActive 
          ? 'bg-[#111111] ring-2 ring-[#FD5A1E] shadow-2xl shadow-[#FD5A1E]/20 transform scale-[1.02]' 
          : 'bg-[#0d0d0d] ring-1 ring-[#333333] hover:bg-[#111111] hover:ring-[#FD5A1E]/50'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      role="article"
      aria-label={`${machine.name} vending machine details`}
    >
      {/* Clickable Machine Image Section */}
      <div 
        className="relative h-80 sm:h-96 overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] focus-within:scale-[1.02]"
        onClick={handleImageClick}
        onKeyDown={handleImageKeyPress}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${machine.name} vending machine`}
      >
        {/* Category Badge */}
        <motion.div 
          className="absolute top-4 left-4 z-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
            machine.category === 'refrigerated' ? 'bg-blue-600' : 'bg-green-600'
          }`}>
            {machine.category === 'refrigerated' ? 'Refrigerated' : 'Non-Refrigerated'}
          </span>
        </motion.div>

        {/* Professional Installation Badge */}
        <motion.div 
          className="absolute top-4 right-4 z-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.4 }}
        >
          <span className="bg-[#FD5A1E] text-[#000000] px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center">
            <CheckCircleIcon size={14} className="mr-1" />
            Full Service
          </span>
        </motion.div>

        {/* Interactive Click Indicator - shows on hover/focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <div className="bg-[#FD5A1E]/90 backdrop-blur-sm px-6 py-3 rounded-full text-[#000000] font-bold text-sm transform translate-y-4 group-hover:translate-y-0 focus-within:translate-y-0 transition-transform duration-300 flex items-center">
            <MonitorIcon size={16} className="mr-2" />
            View Details
            <ArrowRightIcon size={16} className="ml-2" />
          </div>
        </div>

        {/* Machine Image with Enhanced Clickable Area */}
        <div className="relative z-0 h-full w-full bg-gradient-to-r from-[#FD5A1E]/10 to-transparent backdrop-blur-sm">
          <Image
            src={machine.image}
            alt={`${machine.name} - ${machine.model} vending machine`}
            width={380}
            height={480}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover mx-auto transition-all duration-700 ${
              isActive ? 'scale-105' : 'scale-100'
            } group-hover:scale-105 focus-within:scale-105`}
            priority={index === 0}
          />
        </div>

        {/* Technology Indicators - positioned to not interfere with clicks */}
        <motion.div 
          className="absolute bottom-4 left-4 flex space-x-2 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          {[MonitorIcon, CreditCardIcon, WifiIcon].map((Icon, iconIndex) => (
            <div
              key={iconIndex}
              className="w-8 h-8 bg-[#000000]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#FD5A1E]/30"
            >
              <Icon size={14} className="text-[#FD5A1E]" />
            </div>
          ))}
        </motion.div>

        {/* Focus indicator for accessibility */}
        <div className="absolute inset-0 ring-2 ring-[#FD5A1E] ring-offset-2 ring-offset-[#000000] opacity-0 focus-within:opacity-100 transition-opacity duration-200 rounded-2xl pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        {/* Machine Header - Also clickable */}
        <div className="mb-6">
          <Link
            href={`/vending-machines/${machine.id}`}
            className="group/title"
            aria-label={`View ${machine.name} specifications`}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-2 group-hover/title:text-[#FD5A1E] transition-colors cursor-pointer">
              {machine.name}
            </h3>
          </Link>
        </div>

        {/* Description */}
        <p className="text-[#A5ACAF] mb-6 text-sm leading-relaxed">
          {machine.description}
        </p>

        {/* Key Highlights */}
        <div className="mb-6">
          <h4 className="text-[#F5F5F5] font-bold flex items-center mb-4">
            <StarIcon size={16} className="text-[#FD5A1E] mr-2" />
            Key Highlights
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {machine.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.6 + (idx * 0.1) }}
                className="flex items-center"
              >
                <CheckCircleIcon size={14} className="text-[#FD5A1E] mr-3 flex-shrink-0" />
                <span className="text-[#F5F5F5] text-sm">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#000000]/50 p-4 rounded-lg border border-[#333333]">
            <div className="text-[#A5ACAF] text-xs mb-1 uppercase tracking-wide">Dimensions</div>
            <div className="text-[#F5F5F5] font-medium text-sm">{machine.dimensions}</div>
          </div>
          <div className="bg-[#000000]/50 p-4 rounded-lg border border-[#333333]">
            <div className="text-[#A5ACAF] text-xs mb-1 uppercase tracking-wide">Best For</div>
            <div className="text-[#F5F5F5] text-sm leading-tight">{machine.bestFor}</div>
          </div>
        </div>

        {/* Action Buttons - Enhanced touch targets */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <Link
            href={`/vending-machines/${machine.id}`}
            className="flex-1 py-4 px-6 bg-[#FD5A1E] text-[#000000] font-medium rounded-full text-center hover:bg-[#FD5A1E]/90 active:bg-[#FD5A1E]/80 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black touch-manipulation"
            aria-label={`View detailed specifications for ${machine.name}`}
          >
            View Details
            <ArrowRightIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="flex-1 py-4 px-6 bg-transparent text-[#F5F5F5] border border-[#333333] rounded-full text-center hover:bg-[#333333] hover:border-[#FD5A1E] active:bg-[#444444] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 focus:ring-offset-black touch-manipulation"
            aria-label="Request consultation for vending machine installation"
          >
            Get Consultation
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * VendingMachineShowcase Component
 * Displays premium vending machines with enhanced animations and integration
 * with the WorkplaceTransformSection for seamless user experience
 */
const VendingMachineShowcase = ({ 
  renderHeading = true, 
  className = '' 
}: VendingMachineShowcaseSectionProps) => {
  // State for active machine hover effect
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Available premium vending machines (limited to actual machines with real images)
  const vendingMachines: VendingMachine[] = [
    {
      id: 'km-vmr-40-b',
      name: 'Standard Refrigerated Machine',
      model: 'KM-VMR-40-B',
      image: '/images/machines/amp-standard-refrigerated-vending-machine.jpg',
      category: 'refrigerated',
      features: [
        'Advanced Refrigeration System',
        'Large 40-Selection Capacity',
        'Smart Inventory Management',
        'Versatile Shelf Configuration',
        'Contactless Payment Options',
        'Energy-Efficient Operation'
      ],
      highlights: [
        'Energy-Efficient Cooling',
        'Multiple Payment Options',
        '40+ Product Capacity',
        'Professional Installation'
      ],
      dimensions: '40.4"W x 31"D x 76.7"H',
      bestFor: 'Medium to high-traffic locations requiring refrigerated beverages and fresh items',
      description: 'Versatile refrigerated vending machine designed for reliability and performance, featuring intelligent cooling technology and ample capacity for varied product selections.'
    },
    {
      id: 'km-vmnt-50-b',
      name: 'Non-Refrigerated Snack Machine',
      model: 'KM-VMNT-50-B',
      image: '/images/machines/amp-premium-non-refrigerated-vending-machine.jpg',
      category: 'non-refrigerated',
      features: [
        'Premium 21.5" Touchscreen Display',
        'Credit Card & Mobile Pay Ready',
        'Bill Acceptor with Recycling',
        'High Capacity Snack Storage',
        'Advanced Remote Monitoring',
        'Optimized LED Lighting'
      ],
      highlights: [
        '21.5" HD Touchscreen Interface',
        'Tap-to-Pay Technology',
        '50+ Product Selections',
        'Smart Inventory Management'
      ],
      dimensions: '50"W x 30.2"D x 76.7"H',
      bestFor: 'Offices, waiting areas, and high-traffic locations requiring snack variety',
      description: 'Advanced snack vending solution with large HD touchscreen display, featuring versatile payment options and high-capacity storage for a wide variety of non-refrigerated products.'
    },
  ];

  return (
    <section 
      className={`relative ${className}`} 
      aria-labelledby={renderHeading ? "vending-machines-heading" : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Consistent with WorkplaceTransformSection */}
        {renderHeading && (
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Badge */}
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MonitorIcon size={16} className="text-[#FD5A1E] mr-2" />
              <span className="text-[#FD5A1E] font-medium text-sm">Our Machine Collection</span>
            </motion.div>

            {/* Section Title */}
            <h2 
              id="vending-machines-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#F5F5F5] leading-tight"
            >
              Choose Your <span className="text-[#FD5A1E]">Perfect Machine</span>
            </h2>

            {/* Section Description */}
            <p className="text-lg sm:text-xl text-[#A5ACAF] max-w-3xl mx-auto leading-relaxed">
              Professional vending machines with advanced technology, customizable options, 
              and complete service packages tailored to your workplace needs.
            </p>
          </motion.div>
        )}

        {/* Machine Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-20">
          {vendingMachines.map((machine, index) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              index={index}
              isActive={activeIndex === index}
              onHover={setActiveIndex}
            />
          ))}
        </div>
        
        {/* Enhanced Value Proposition Banner */}
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-[#FD5A1E]/30 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FD5A1E]/10 to-transparent" />
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4">
                  Complete Vending Solutions
                </h3>
                <p className="text-[#A5ACAF] mb-6 leading-relaxed text-sm sm:text-base">
                  Our machines come with professional installation, ongoing maintenance, 
                  and 24/7 support. Experience the convenience of modern vending technology 
                  with comprehensive service packages designed for your workplace success.
                </p>

                {/* Service Features */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Professional Installation',
                    'Complete Maintenance',
                    'Smart Monitoring'
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                      className="flex items-center"
                    >
                      <CheckCircleIcon size={14} className="text-[#FD5A1E] mr-2 flex-shrink-0" />
                      <span className="text-[#F5F5F5] text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center lg:text-right">
                <motion.div
                  className="inline-block p-6 sm:p-8 bg-[#000000]/70 rounded-xl border border-[#FD5A1E]/20 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-[#FD5A1E] mb-2 flex items-center justify-center">
                    <ZapIcon size={32} className="mr-2" />
                    2
                  </div>
                  <div className="text-[#F5F5F5] font-semibold mb-1">Premium Models</div>
                  <div className="text-[#A5ACAF] text-sm mb-4">Available for immediate installation</div>
                  
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#000000] font-medium rounded-full hover:bg-[#FD5A1E]/90 active:bg-[#FD5A1E]/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black touch-manipulation"
                  >
                    Start Today
                    <ArrowRightIcon size={16} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Link
            href="/vending-machines"
            className="inline-flex items-center px-8 py-4 bg-[#333333] text-[#F5F5F5] font-medium rounded-full hover:bg-[#444444] hover:text-[#FD5A1E] active:bg-[#555555] transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 focus:ring-offset-black touch-manipulation"
            aria-label="View complete vending machine collection and specifications"
          >
            <MonitorIcon size={20} className="mr-2" />
            View Complete Collection
            <ArrowRightIcon size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VendingMachineShowcase;
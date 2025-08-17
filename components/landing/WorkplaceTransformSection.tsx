'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  MonitorIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  WifiIcon,
  ZapIcon,
  SparklesIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  UsersIcon,
  ClockIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
} from 'lucide-react';
import Image from 'next/image';

// =============================================================================
// DATA CONSTANTS - Single source of truth for all features and metrics
// =============================================================================

/**
 * Premium features data structure
 * Consolidated from multiple sources to eliminate duplication
 */
const PREMIUM_FEATURES = [
  {
    id: 'touchscreen',
    icon: <MonitorIcon size={20} />,
    title: 'Interactive Touchscreen Experience',
    description: '21.5" HD display with intuitive navigation and detailed product information for enhanced user engagement',
    highlight: 'Enhanced user engagement',
    category: 'technology',
  },
  {
    id: 'payments',
    icon: <CreditCardIcon size={20} />,
    title: 'Universal Payment Acceptance',
    description: 'Credit cards, mobile payments, Apple Pay, Google Pay, and cash options for maximum convenience',
    highlight: 'Maximum convenience for all users',
    category: 'payment',
  },
  {
    id: 'products',
    icon: <ShoppingBagIcon size={20} />,
    title: 'Customized Product Selection',
    description: '50+ snack and beverage options tailored to your workplace preferences and dietary needs',
    highlight: 'Personalized to your team',
    category: 'customization',
  },
  {
    id: 'inventory',
    icon: <WifiIcon size={20} />,
    title: 'Smart Inventory Management',
    description: 'Real-time monitoring ensures products are always available when needed with predictive restocking',
    highlight: 'Never run out of favorites',
    category: 'technology',
  },
  {
    id: 'implementation',
    icon: <ZapIcon size={20} />,
    title: 'Professional Implementation',
    description: 'Complete installation, setup, and ongoing maintenance service included with 24/7 support',
    highlight: 'Hassle-free operation',
    category: 'service',
  },
] as const;

/**
 * Workplace impact metrics
 * Measurable improvements for client presentations
 */
const WORKPLACE_METRICS = [
  {
    id: 'satisfaction',
    metric: '85%',
    label: 'Employee satisfaction increase',
    icon: <UsersIcon size={24} />,
    description: 'Measured improvement in workplace satisfaction surveys',
  },
  {
    id: 'time',
    metric: '40%',
    label: 'Reduced break time',
    icon: <ClockIcon size={24} />,
    description: 'Average time saved on refreshment breaks',
  },
  {
    id: 'productivity',
    metric: '25%',
    label: 'Productivity boost',
    icon: <TrendingUpIcon size={24} />,
    description: 'Increased focus and energy levels reported',
  },
  {
    id: 'reliability',
    metric: '99.9%',
    label: 'Uptime reliability',
    icon: <ShieldCheckIcon size={24} />,
    description: 'Guaranteed operational availability',
  },
] as const;

/**
 * Machine card features for compact display
 * Streamlined feature list for visual card component
 */
const MACHINE_CARD_FEATURES = [
  { icon: MonitorIcon, text: '21.5" HD Touchscreen Interface' },
  { icon: CreditCardIcon, text: 'Tap-to-Pay & Mobile Payments' },
  { icon: ShoppingBagIcon, text: '50+ Customizable Products' },
  { icon: WifiIcon, text: 'Smart Inventory Management' },
] as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Component props interface with comprehensive configuration options
 */
interface WorkplaceTransformSectionProps {
  /** Whether to render the section heading inside this component */
  renderHeading?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Custom animation delay for staggered loading */
  animationDelay?: number;
  /** Whether to show the enhanced CTA section */
  showEnhancedCTA?: boolean;
}

/**
 * Premium feature component props with strict typing
 */
interface PremiumFeatureProps {
  feature: typeof PREMIUM_FEATURES[number];
  delay?: number;
  variant?: 'default' | 'compact';
}

/**
 * Upgrade metric component props for performance displays
 */
interface UpgradeMetricProps {
  metric: typeof WORKPLACE_METRICS[number];
  delay?: number;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Machine card props for equipment showcase
 */
interface MachineCardProps {
  title?: string;
  description?: string;
  features?: typeof MACHINE_CARD_FEATURES;
  variant?: 'default' | 'premium';
}

// =============================================================================
// REUSABLE COMPONENTS
// =============================================================================

/**
 * PremiumFeature Component
 * Displays individual premium features with visual emphasis and accessibility
 */
const PremiumFeature: React.FC<PremiumFeatureProps> = ({ 
  feature, 
  delay = 0, 
  variant = 'default' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`
        flex items-start space-x-4 p-4 rounded-lg 
        hover:bg-[#FD5A1E]/5 transition-all duration-300 group
        focus-within:bg-[#FD5A1E]/5 focus-within:ring-2 focus-within:ring-[#FD5A1E]/30
        ${variant === 'compact' ? 'p-3 space-x-3' : ''}
      `}
      role="article"
      aria-label={`Feature: ${feature.title}`}
      tabIndex={0}
    >
      {/* Icon container with hover effects */}
      <div 
        className={`
          flex-shrink-0 bg-[#FD5A1E]/10 rounded-full 
          flex items-center justify-center 
          group-hover:bg-[#FD5A1E]/20 transition-all duration-300
          ${variant === 'compact' ? 'w-10 h-10' : 'w-12 h-12'}
        `}
        aria-hidden="true"
      >
        <div className="text-[#FD5A1E] group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
      </div>

      {/* Content section */}
      <div className="flex-1 min-w-0">
        <h4 className={`
          text-[#F5F5F5] font-bold mb-1 leading-tight
          ${variant === 'compact' ? 'text-base' : 'text-lg'}
        `}>
          {feature.title}
        </h4>
        <p className="text-[#A5ACAF] text-sm mb-2 leading-relaxed">
          {feature.description}
        </p>
        <span className="text-[#FD5A1E] text-sm font-semibold">
          {feature.highlight}
        </span>
      </div>
    </motion.div>
  );
};

/**
 * UpgradeMetric Component
 * Displays quantifiable benefits with responsive sizing
 */
const UpgradeMetric: React.FC<UpgradeMetricProps> = ({ 
  metric, 
  delay = 0, 
  size = 'medium' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  const sizeClasses = {
    small: 'p-4 text-lg',
    medium: 'p-6 text-2xl sm:text-3xl',
    large: 'p-8 text-3xl sm:text-4xl',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`
        text-center bg-[#111111] rounded-xl border border-[#333333] 
        hover:border-[#FD5A1E] transition-all duration-300 group
        focus-within:border-[#FD5A1E] focus-within:ring-2 focus-within:ring-[#FD5A1E]/30
        ${sizeClasses[size]}
      `}
      role="article"
      aria-label={`Metric: ${metric.metric} ${metric.label}`}
      tabIndex={0}
    >
      <div 
        className="text-[#FD5A1E] text-3xl mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300" 
        aria-hidden="true"
      >
        {metric.icon}
      </div>
      <div className={`font-bold text-[#FD5A1E] mb-2 ${sizeClasses[size].split(' ')[1]}`}>
        {metric.metric}
      </div>
      <div className="text-[#A5ACAF] text-sm font-medium">
        {metric.label}
      </div>
      <div className="text-[#666666] text-xs mt-1 leading-tight">
        {metric.description}
      </div>
    </motion.div>
  );
};

/**
 * MachineCard Component
 * Interactive showcase card for vending machine features
 */
const MachineCard: React.FC<MachineCardProps> = ({ 
  title = "Professional Grade Vending Machine",
  description = "Advanced technology meets workplace convenience with our premium vending solution.",
  features = MACHINE_CARD_FEATURES,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`
        relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] 
        rounded-2xl border border-[#333333] overflow-hidden
        hover:border-[#FD5A1E] transition-all duration-300
        ${variant === 'premium' ? 'ring-2 ring-[#FD5A1E]/20' : ''}
      `}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="article"
      aria-label="Premium vending machine showcase"
    >
      {/* Content section */}
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-[#A5ACAF] text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features list */}
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <motion.div
              key={`${feature.text}-${index}`}
              className="flex items-center text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.2, duration: 0.4 }}
            >
              <div className="w-5 h-5 bg-[#FD5A1E]/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <feature.icon size={12} className="text-[#FD5A1E]" />
              </div>
              <span className="text-[#F5F5F5]">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Action button */}
        <Link
          href="/vending-machines"
          className="block w-full"
          aria-label="View detailed machine specifications"
        >
          <motion.div
            animate={{
              backgroundColor: isHovered ? '#FD5A1E' : 'transparent'
            }}
            className="w-full py-3 px-4 border border-[#FD5A1E] rounded-lg text-center font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
            tabIndex={0}
            role="button"
          >
            <span className={`transition-colors duration-300 ${isHovered ? 'text-[#000000]' : 'text-[#FD5A1E]'}`}>
              View Machine Details
              <ArrowRightIcon 
                size={16} 
                className="inline-block ml-2 transition-transform duration-300" 
                aria-hidden="true" 
              />  
            </span>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * WorkplaceTransformSection Component
 * Main section showcasing workplace transformation benefits with premium features
 * 
 * Accessibility Features:
 * - WCAG 2.1 AA compliant color contrast ratios
 * - Keyboard navigation support
 * - Screen reader optimized content structure
 * - Semantic HTML with proper ARIA labels
 * - Focus management for interactive elements
 */
const WorkplaceTransformSection: React.FC<WorkplaceTransformSectionProps> = ({
  renderHeading = true,
  className = "",
  animationDelay = 0,
  showEnhancedCTA = true,
}) => {
  // Responsive behavior state
  const [isMobileView, setIsMobileView] = useState(false);

  // Mobile detection effect
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  return (
    <section 
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      aria-labelledby={renderHeading ? "transform-heading" : undefined}
    >
      {/* Section Header */}
      {renderHeading && (
        <motion.header
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: animationDelay }}
        >
          <span className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4 sm:mb-6">
            <SparklesIcon size={16} className="mr-2" aria-hidden="true" />
            Advanced Workplace Solutions
          </span>
          <h2
            id="transform-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-4 sm:mb-6 leading-tight"
          >
            Transform Your Workplace with{' '}
            <span className="text-[#FD5A1E]">Latest Technology</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-[#A5ACAF] max-w-4xl mx-auto leading-relaxed">
            Discover how our advanced vending solutions enhance employee satisfaction 
            and workplace convenience with measurable results.
          </p>
        </motion.header>
      )}

      {/* Main Content Grid */}
      <motion.div
        className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: animationDelay + 0.2 }}
      >
        {/* Machine Showcase Card */}
        <div className="space-y-6">

           {/* Machine Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/images/machines/amp-vending-machines.jpg"
          alt="AMP Premium Vending Machine with 21.5 inch touchscreen interface"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 rounded-xl"
          // style={{
          //   transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          // }}
          priority
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent opacity-60" />
        
        {/* Technology badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <span className="bg-[#FD5A1E] text-[#000000] px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <MonitorIcon size={12} className="mr-1" />
            21.5&quot; HD
          </span>
          <span className="bg-[#000000]/90 text-[#FD5A1E] px-3 py-1 rounded-full text-xs font-bold border border-[#FD5A1E]/30">
            Touchscreen
          </span>
        </div>

        {/* Interactive indicators at bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {[CreditCardIcon, WifiIcon, ZapIcon].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-8 h-8 bg-[#FD5A1E]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#FD5A1E]/30"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon size={14} className="text-[#FD5A1E]" />
                </motion.div>
              ))}
            </div>
            <motion.div
              className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CheckCircleIcon size={12} className="mr-1" />
              Available Now
            </motion.div>
          </div>
        </div>
      </div>
          <MachineCard variant="premium" />
             
        </div>

        {/* Premium Features List */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-8 leading-tight">
            Premium Features for Modern Workplaces
          </h3>
          <div className="space-y-4">
            {PREMIUM_FEATURES.map((feature, index) => (
              <PremiumFeature
                key={feature.id}
                feature={feature}
                delay={animationDelay + 0.1 * (index + 1)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Workplace Impact Metrics */}
      <motion.div
        className="mb-16 sm:mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: animationDelay + 0.6 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F5F5] mb-4">
            Measurable Workplace Impact
          </h3>
          <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
            Real results from businesses that upgraded their workplace refreshment solutions
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WORKPLACE_METRICS.map((metric, index) => (
            <UpgradeMetric
              key={metric.id}
              metric={metric}
              delay={animationDelay + 0.1 * (index + 7)}
              size={isMobileView ? 'small' : 'medium'}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Call to Action */}
      {showEnhancedCTA && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: animationDelay + 1.0 }}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FD5A1E]/20 to-transparent backdrop-blur-sm" />
            <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border border-[#FD5A1E]/30 rounded-2xl bg-[#000000]/50">
              <SparklesIcon size={32} className="text-[#FD5A1E] mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F5F5] mb-4">
                Ready to Experience Advanced Vending Technology?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-[#A5ACAF] mb-8 max-w-2xl mx-auto leading-relaxed">
                Transform your workplace today with state-of-the-art vending technology.
                Enhanced employee satisfaction starts with a simple consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                <Link
                  href="/contact"
                  className="group px-8 py-4 bg-[#FD5A1E] text-[#000000] rounded-full font-medium shadow-lg hover:bg-[#FD5A1E]/90 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Schedule your workplace vending consultation"
                >
                  Start Your Upgrade Today
                  <ArrowRightIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </Link>
                <Link
                  href="/vending-machines"
                  className="px-8 py-4 bg-transparent text-[#F5F5F5] border border-[#A5ACAF] rounded-full font-medium hover:bg-[#4d4d4d] hover:border-[#FD5A1E] transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#A5ACAF] focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="View our complete vending machine collection"
                >
                  View All Machines
                  <ArrowRightIcon size={16} className="ml-2" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default WorkplaceTransformSection;
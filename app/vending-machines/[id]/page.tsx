'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { motion, useInView } from 'framer-motion';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ShoppingBagIcon,
  MonitorIcon,
  CreditCardIcon,
  WifiIcon,
  ZapIcon
} from 'lucide-react';

// Import reusable components and utilities
import { Loading } from '@/components/ui/core/Loading';
import CTASection from '@/components/landing/CTASection';
import {
  getVendingMachineById,
  getAllVendingMachines,
  normalizeMachineData,
  type MachineData
} from '@/lib/data/vendingMachineData';
import { MachineGrid } from '@/components/MachineCard';

/**
 * Props interface for the MachineDetailSection component
 */
interface MachineDetailSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Reusable section component for machine details with consistent styling and animations
 */
const MachineDetailSection = ({
  title,
  children,
  className = '',
  delay = 0
}: MachineDetailSectionProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`mb-12 ${className}`}
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
    >
      <h2
        id={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
        className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-6 flex items-center"
      >
        <span className="w-1 h-8 bg-[#FD5A1E] mr-4 rounded-full" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </motion.section>
  );
};

/**
 * Component for displaying machine specifications in a clean grid layout
 */
interface SpecificationGroupProps {
  specification: {
    category: string;
    items: Array<{
      label: string;
      value: string | string[];
    }>;
  };
  index: number;
}

const SpecificationGroup = ({ specification, index }: SpecificationGroupProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#111111] rounded-xl p-6 border border-[#333333] hover:border-[#FD5A1E]/30 transition-all duration-300"
      role="region"
      aria-labelledby={`spec-${specification.category.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <h3
        id={`spec-${specification.category.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-lg font-bold text-[#F5F5F5] mb-4 flex items-center"
      >
        <ZapIcon size={20} className="text-[#FD5A1E] mr-2" aria-hidden="true" />
        {specification.category}
      </h3>

      <dl className="space-y-3">
        {specification.items.map((item, itemIndex) => (
          <div key={itemIndex} className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-[#A5ACAF] text-sm font-medium mb-1 sm:mb-0">
              {item.label}:
            </dt>
            <dd className="text-[#F5F5F5] text-sm font-semibold sm:text-right max-w-xs">
              {Array.isArray(item.value) ? item.value.join(', ') : item.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
};

/**
 * SEO-Enhanced Dynamic Machine Detail Page Component
 * 
 * Updated to work with the new SEO-optimized vending machine data structure.
 * Features enhanced metadata, structured data, and improved search optimization.
 * 
 * Build Process Documentation:
 * 1. Uses SEO-friendly machine IDs for better URL structure
 * 2. Implements comprehensive structured data for rich search results
 * 3. Enhanced meta descriptions and titles from machine data
 * 4. Improved accessibility and performance optimizations
 * 5. Better internal linking for SEO value
 */
const DynamicMachineDetailPage = () => {
  // Get the machine ID from the URL parameters
  const params = useParams();
  const router = useRouter();
  const machineId = params?.id as string;

  // State management for machine data and loading states
  const [machineData, setMachineData] = useState<MachineData | null>(null);
  const [relatedMachines, setRelatedMachines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch the machine data when the component mounts
  useEffect(() => {
    if (!machineId) {
      setError('No machine ID provided');
      setIsLoading(false);
      return;
    }

    try {
      // Get the machine data from the SEO-optimized data structure
      const machine = getVendingMachineById(machineId);

      if (!machine) {
        setError(`Machine with ID ${machineId} not found`);
      } else {
        setMachineData(machine);

        // Get related machines using the new relatedMachines structure
        if (machine.relatedMachines && machine.relatedMachines.length > 0) {
          const related = machine.relatedMachines
            .map(relatedMachine => {
              const fullMachineData = getVendingMachineById(relatedMachine.id);
              return fullMachineData ? normalizeMachineData(fullMachineData) : null;
            })
            .filter((machine): machine is NonNullable<typeof machine> => machine !== null)
            .slice(0, 3); // Limit to 3 related machines

          setRelatedMachines(related);
        } else {
          // Fallback: get other machines from the same category
          const allMachines = getAllVendingMachines();
          const related = allMachines
            .filter(m => m.id !== machineId && m.category === machine.category)
            .slice(0, 3)
            .map(normalizeMachineData)
            .filter((machine): machine is NonNullable<typeof machine> => machine !== null);

          setRelatedMachines(related);
        }
      }
    } catch (err) {
      setError('Error fetching machine data');
      console.error('Error fetching machine data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [machineId]);

  // Handle keyboard navigation for image gallery
  const handleImageKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedImageIndex(index);
    }
  };

  // Show loading state
  if (isLoading) {
    return <Loading />;
  }

  // Show error state with helpful navigation
  if (error || !machineData) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-[#4d4d4d]/30 rounded-xl border border-[#a4acac]">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#F5F5F5] mb-4">
            {error || 'Vending Machine Not Found'}
          </h1>
          <p className="text-[#A5ACAF] mb-6">&apos;re looking for. It may have been moved or the URL may be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center px-4 py-2 bg-[#4d4d4d] text-[#F5F5F5] rounded-lg hover:bg-[#5d5d5d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4d4d4d]"
              aria-label="Go back to previous page"
            >
              <ArrowLeftIcon size={16} className="mr-2" />
              Go Back
            </button>
            <Link
              href="/vending-machines"
              className="px-4 py-2 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg hover:bg-[#FD5A1E]/90 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
            >
              View All Machines
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Enhanced SEO Structured Data */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": machineData.name,
            "description": machineData.description,
            "image": `https://www.ampvendingmachines.com${machineData.images[0]?.src ?? ''}`,
            "brand": {
              "@type": "Brand",
              "name": "AMP Vending"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "AMP Vending",
              "url": "https://www.ampvendingmachines.com"
            },
            "category": machineData.category === 'refrigerated' ? 'Refrigerated Vending Machine' : 'Snack Vending Machine',
            "offers": {
              "@type": "Offer",
              "description": "Professional installation and maintenance-free operation",
              "availability": "https://schema.org/InStock",
              "areaServed": {
                "@type": "Place",
                "name": "Central California"
              },
              "seller": {
                "@type": "Organization",
                "name": "AMP Vending"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "50"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Installation",
                "value": "Professional installation included"
              },
              {
                "@type": "PropertyValue",
                "name": "Maintenance",
                "value": "Complete maintenance service included"
              },
              {
                "@type": "PropertyValue",
                "name": "Payment Options",
                "value": "Credit/Debit cards, Mobile payments, Cash"
              }
            ]
          })
        }}
      />

      {/* Organization structured data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AMP Vending",
            "url": "https://www.ampvendingmachines.com",
            "logo": "https://www.ampvendingmachines.com/images/logo/AMP_logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+12094035450",
              "contactType": "customer service",
              "email": "ampdesignandconsulting@gmail.com"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Modesto",
              "addressRegion": "CA",
              "postalCode": "95354",
              "addressCountry": "US"
            },
            "areaServed": "Central California"
          })
        }}
      />

      {/* Breadcrumb structured data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ampvendingmachines.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Commercial Vending Machines",
                "item": "https://www.ampvendingmachines.com/vending-machines"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": machineData.name,
                "item": `https://www.ampvendingmachines.com/vending-machines/${machineData.id}`
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-[#000000]">
        {/* Enhanced Breadcrumb Navigation */}
        <nav className="bg-[#000000]/50 border-b border-[#4d4d4d]" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 pt-6 py-2 mt-16">
            <ol className="flex items-center text-sm text-[#A5ACAF] space-x-2">
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
              <li>
                <Link
                  href="/vending-machines"
                  className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                  aria-label="Go to all commercial vending machines"
                >
                  Commercial Vending Machines
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#F5F5F5] font-medium" aria-current="page">{machineData.name}</li>
            </ol>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Hero Section with Machine Overview */}
          <motion.section
            className="mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            aria-labelledby="machine-overview"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

              {/* Machine Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#333333] bg-gradient-to-r from-[#FD5A1E]/10 to-transparent backdrop-blur-sm">
                  <Image
                    src={machineData.images[selectedImageIndex]?.src ?? machineData.images[0]?.src ?? '/images/placeholder.png'}
                    alt={machineData.images[selectedImageIndex]?.alt || `${machineData.name} commercial vending machine`}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    className="object-contain"
                    priority
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${machineData.category === 'refrigerated' ? 'bg-blue-600' : 'bg-green-600'
                      }`}>
                      {machineData.category === 'refrigerated' ? 'Refrigerated' : 'Non-Refrigerated'}
                    </span>
                  </div>

                  {/* Professional Service Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#FD5A1E] text-[#000000] px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center">
                      <CheckCircleIcon size={16} className="mr-2" />
                      Professional Service
                    </span>
                  </div>
                </div>

                {/* Image Thumbnails */}
                {machineData.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {machineData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        onKeyDown={(e) => handleImageKeyPress(e, index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] ${selectedImageIndex === index
                            ? 'border-[#FD5A1E] ring-2 ring-[#FD5A1E]/30'
                            : 'border-[#333333] hover:border-[#FD5A1E]/50'
                          }`}
                        aria-label={`View image ${index + 1}: ${image.alt}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Machine Information */}
              <div className="space-y-6">
                <div>
                  <h1
                    id="machine-overview"
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-3"
                  >
                    {machineData.name}
                  </h1>

                  {/* SEO-friendly subtitle using keywords */}
                  <p className="text-xl sm:text-2xl text-[#FD5A1E] font-semibold mb-4">
                    Commercial {machineData.category === 'refrigerated' ? 'Refrigerated' : 'Snack'} Vending Machine
                  </p>

                  <p className="text-lg text-[#A5ACAF] leading-relaxed">
                    {machineData.shortDescription}
                  </p>
                </div>

                {/* Technology Indicators - Enhanced for SEO */}
                <div className="flex flex-wrap gap-4">
                  {[
                    {
                      icon: MonitorIcon,
                      label: 'HD Touchscreen',
                      available: machineData.features.some(f => f.title.toLowerCase().includes('touchscreen'))
                    },
                    {
                      icon: CreditCardIcon,
                      label: 'Mobile Payments',
                      available: machineData.features.some(f => f.title.toLowerCase().includes('payment'))
                    },
                    {
                      icon: WifiIcon,
                      label: 'Smart Monitoring',
                      available: machineData.features.some(f => f.title.toLowerCase().includes('monitoring') || f.title.toLowerCase().includes('inventory'))
                    },
                    {
                      icon: ZapIcon,
                      label: 'Energy Efficient',
                      available: machineData.features.some(f => f.title.toLowerCase().includes('energy'))
                    }
                  ].filter(tech => tech.available).map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center px-4 py-2 bg-[#111111] rounded-full border border-[#333333]"
                    >
                      <tech.icon size={16} className="text-[#FD5A1E] mr-2" aria-hidden="true" />
                      <span className="text-[#F5F5F5] text-sm font-medium">{tech.label}</span>
                    </div>
                  ))}
                </div>

                {/* Key Benefits - Using machine highlights */}
                <div className="bg-[#111111] rounded-xl p-6 border border-[#333333]">
                  <h2 className="text-lg font-bold text-[#F5F5F5] mb-4 flex items-center">
                    <StarIcon size={20} className="text-[#FD5A1E] mr-2" />
                    Key Benefits
                  </h2>
                  <ul className="space-y-3" role="list">
                    {(machineData.highlights || [
                      'Professional Installation Included',
                      'Complete Maintenance Service',
                      'Advanced Payment Technology',
                      'Smart Inventory Management'
                    ]).map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon size={16} className="text-[#FD5A1E] mr-3 flex-shrink-0" aria-hidden="true" />
                        <span className="text-[#F5F5F5]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SEO-Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pb-4">
                  <Link
                    href="/contact"
                    className="flex-1 py-4 px-6 bg-[#FD5A1E] text-[#000000] font-bold rounded-xl text-center hover:bg-[#FD5A1E]/90 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Get Free {machineData.name} Vending Consultation
                  </Link>
                  <a
                    href="tel:+12094035450"
                    className="flex-1 py-4 sm:py-6 px-6 bg-transparent border-2 border-[#FD5A1E] text-[#FD5A1E] font-bold rounded-xl text-center hover:bg-[#FD5A1E] hover:text-[#000000] transition-all focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Call (209) 403-5450
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Detailed Description */}
          <MachineDetailSection title="About This Commercial Vending Machine" delay={0.2}>
            <div className="bg-[#111111] rounded-xl p-6 sm:p-8 border border-[#333333]">
              <p className="text-[#A5ACAF] text-lg leading-relaxed">
                {machineData.description}
              </p>

              {/* SEO Keywords section */}
              {(machineData.keywords || machineData.localKeywords || machineData.businessKeywords) && (
                <div className="mt-6 pt-6 border-t border-[#333333]">
                  <p className="text-sm text-[#A5ACAF]">
                    <strong className="text-[#F5F5F5]">Perfect for:</strong> {' '}
                    {[
                      ...(machineData.businessKeywords || []),
                      ...(machineData.localKeywords || [])
                    ].slice(0, 3).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </MachineDetailSection>

          {/* Features Section */}
          <MachineDetailSection title="Advanced Commercial Features" delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {machineData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="bg-[#111111] rounded-xl p-6 border border-[#333333] hover:border-[#FD5A1E]/30 transition-all"
                >
                  <h3 className="text-lg font-bold text-[#F5F5F5] mb-3 flex items-center">
                    <div className="w-2 h-2 bg-[#FD5A1E] rounded-full mr-3" aria-hidden="true" />
                    {feature.title}
                  </h3>
                  <p className="text-[#A5ACAF] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </MachineDetailSection>

          {/* Specifications Section */}
          <MachineDetailSection title="Technical Specifications" delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {machineData.specifications.map((specification, index) => (
                <SpecificationGroup
                  key={index}
                  specification={specification}
                  index={index}
                />
              ))}
            </div>
          </MachineDetailSection>

          {/* Product Options */}
          <MachineDetailSection title="Available Product Options" delay={0.5}>
            <div className="bg-[#111111] rounded-xl p-6 sm:p-8 border border-[#333333]">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <ShoppingBagIcon size={24} className="text-[#FD5A1E] mr-3" />
                  <span className="text-lg font-semibold text-[#F5F5F5]">
                    Available Products ({machineData.productOptions.length}+ options)
                  </span>
                </div>
                <p className="text-[#A5ACAF] mb-6">
                  Customizable product selection based on your workplace preferences and employee feedback. All products are carefully selected for quality and variety.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {machineData.productOptions.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.02) }}
                    className="flex items-center p-3 bg-[#000000]/50 rounded-lg border border-[#333333]/50"
                  >
                    <CheckCircleIcon size={14} className="text-[#FD5A1E] mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-[#F5F5F5] text-sm">{product}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </MachineDetailSection>

          {/* Best For Section - SEO Enhancement */}
          <MachineDetailSection title="Ideal Business Locations" delay={0.55}>
            <div className="bg-[#111111] rounded-xl p-6 sm:p-8 border border-[#333333]">
              <p className="text-[#A5ACAF] mb-6">
                This {machineData.name.toLowerCase()} is specifically designed for the following business environments:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(Array.isArray(machineData.bestFor) ? machineData.bestFor : [machineData.bestFor]).map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.55 + (index * 0.02) }}
                    className="flex items-center p-3 bg-[#000000]/50 rounded-lg border border-[#333333]/50"
                  >
                    <CheckCircleIcon size={14} className="text-[#FD5A1E] mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-[#F5F5F5] text-sm">{location}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </MachineDetailSection>

          {/* Related Machines using Reusable Cards */}
          {relatedMachines.length > 0 && (
            <MachineDetailSection title="Related Commercial Vending Machines" delay={0.6}>
              <MachineGrid
                machines={relatedMachines}
                variant="related"
                className="mb-8"
                ariaLabel="Related commercial vending machines you might also like"
              />
              <div className="text-center mt-6">
                <Link
                  href="/vending-machines"
                  className="inline-flex items-center px-6 py-3 bg-[#4d4d4d]/30 text-[#F5F5F5] rounded-lg hover:bg-[#4d4d4d]/50 transition-colors border border-[#4d4d4d] hover:border-[#FD5A1E]/30"
                >
                  View All Commercial Vending Machines
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </MachineDetailSection>
          )}

          {/* Enhanced Contact Section */}
          <MachineDetailSection title="Get Your Commercial Vending Machine Today" delay={0.7}>
            <div className="bg-gradient-to-r from-[#FD5A1E]/10 to-transparent rounded-xl p-6 sm:p-8 border border-[#FD5A1E]/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">
                    Ready to enhance your {machineData.category === 'refrigerated' ? 'workplace refreshments' : 'snack offerings'}?
                  </h3>
                  <p className="text-[#A5ACAF] mb-6 leading-relaxed">
                    Contact us today for a free consultation and learn how the {machineData.name} can
                    improve employee satisfaction and convenience at your {machineData.category === 'refrigerated' ? 'office or facility' : 'business location'} in Central California.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <PhoneIcon size={18} className="text-[#FD5A1E] mr-3" aria-hidden="true" />
                      <a
                        href="tel:+12094035450"
                        className="text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
                      >
                        (209) 403-5450
                      </a>
                    </div>
                    <div className="flex items-center">
                      <MailIcon size={18} className="text-[#FD5A1E] mr-3" aria-hidden="true" />
                      <a
                        href="mailto:ampdesignandconsulting@gmail.com"
                        className="text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E] break-all"
                      >
                        ampdesignandconsulting@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon size={18} className="text-[#FD5A1E] mr-3" aria-hidden="true" />
                      <span className="text-[#F5F5F5]">Serving Central California from Modesto, CA</span>
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <Link
                    href="/contact"
                    className="inline-block py-4 px-8 bg-[#FD5A1E] text-[#000000] font-bold rounded-xl hover:bg-[#FD5A1E]/90 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
                  >
                    Schedule Free Consultation
                  </Link>
                  <p className="text-[#A5ACAF] text-sm mt-3">
                    Professional installation included • Complete maintenance service • Central California coverage
                  </p>
                </div>
              </div>
            </div>
          </MachineDetailSection>
        </main>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-[#000000] to-[#4d4d4d]/30 border-t border-[#4d4d4d]">
          <CTASection />
        </section>
      </div>
    </>
  );
};

export default DynamicMachineDetailPage;
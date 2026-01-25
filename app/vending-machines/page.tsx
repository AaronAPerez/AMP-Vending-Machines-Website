'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

import {
  getAllVendingMachines,
  getVendingMachinesByCategory,
  normalizeMachineData,
  type MachineData
} from '@/lib/data/vendingMachineData';
import { Loading } from '@/components/ui/core/Loading';
import CTASection from '@/components/landing/CTASection';
import { MachineCard } from '@/components/vending-machines/listing/MachineCard';
import Script from 'next/script';



type FilterType = 'all' | 'refrigerated' | 'non-refrigerated';

interface FilterOption {
  id: FilterType;
  label: string;
  count: number;
  description: string;
}

const VendingMachinesPage = () => {
  const [machines, setMachines] = useState<any[]>([]);
  const [allMachines, setAllMachines] = useState<MachineData[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    try {
      const allMachineData = getAllVendingMachines();
      setAllMachines(allMachineData);
      const normalized = allMachineData.map(normalizeMachineData).filter(Boolean);
      setMachines(normalized as any[]);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allMachines.length === 0) return;

    setIsFiltering(true);

    // Small delay for smooth transition
    const timer = setTimeout(() => {
      try {
        let filtered: MachineData[];
        if (activeFilter === 'all') {
          filtered = allMachines;
        } else {
          filtered = getVendingMachinesByCategory(activeFilter);
        }
        const normalized = filtered.map(normalizeMachineData).filter(Boolean);
        setMachines(normalized as any[]);
      } catch (err) {
        console.error('Filter error:', err);
      } finally {
        setIsFiltering(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [activeFilter, allMachines]);

  const filterOptions: FilterOption[] = useMemo(() => [
    { id: 'all', label: 'All Machines', count: allMachines.length, description: 'All' },
    { id: 'refrigerated', label: 'Refrigerated', count: allMachines.filter(m => m.category === 'refrigerated').length, description: 'Refrigerated' },
    { id: 'non-refrigerated', label: 'Non-Refrigerated', count: allMachines.filter(m => m.category === 'non-refrigerated').length, description: 'Non-Refrigerated' }
  ], [allMachines]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Enhanced SEO Structured Data */}
      <Script
        id="vending-machines-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Commercial Vending Machines | Professional Installation | AMP Vending",
            "description": "Explore our range of commercial vending machines with touchscreen technology, professional installation, and maintenance-free operation for offices, schools, and businesses in Central California.",
            "url": "https://www.ampvendingmachines.com/vending-machines/",
            "publisher": {
              "@type": "Organization",
              "name": "AMP Vending",
              "url": "https://www.ampvendingmachines.com",
              "logo": "https://www.ampvendingmachines.com/images/logo/AMP_logo.png"
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": machines.length,
              "itemListElement": machines.map((machine, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": machine.name,
                  "description": machine.shortDescription || machine.description,
                  "url": `https://www.ampvendingmachines.com/vending-machines/${machine.id}`,
                  "image": `https://www.ampvendingmachines.com${machine.image}`,
                  "brand": {
                    "@type": "Brand",
                    "name": "AMP Vending"
                  },
                  "category": machine.category === 'refrigerated' ? 'Refrigerated Vending Machine' : 'Snack Vending Machine',
                  "offers": {
                    "@type": "Offer",
                    "description": "Professional installation and maintenance-free operation",
                    "availability": "https://schema.org/InStock",
                    "areaServed": "Central California"
                  }
                }
              }))
            },
            "breadcrumb": {
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
                  "name": "Vending Machines",
                  "item": "https://www.ampvendingmachines.com/vending-machines"
                }
              ]
            }
          })
        }}
      />

      {/* Enhanced Breadcrumb Navigation */}
      {/* <div className="bg-[#000000]/50 border-b border-[#4d4d4d] pt-16">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-[#A5ACAF]">
          <Link
            href="/"
            className="hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E]"
            aria-label="Go to homepage"
          >
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-[#F5F5F5]" aria-current="page">Commercial Vending Machines</span>
        </div>
      </div> */}

      {/* SEO-Enhanced Hero Header Section */}
      {/* <section className="pt-12 pb-8 bg-gradient-to-b from-[#000000] to-[#000000]/80"> */}
         <section className="pt-24 bg-gradient-to-b from-[#000000] via-[#111111] to-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* SEO-Optimized Page Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Professional Vending Solutions</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5] mb-4">
              Premium Vending <span className="text-[#FD5A1E]">Machines</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#A5ACAF] max-w-4xl mx-auto mb-8">
              Professional vending machine solutions with touchscreen technology, complete installation,
              and maintenance-free operation for businesses throughout Central California.
            </p>

            {/* Enhanced Machine Count Display with SEO Keywords */}
            <div className="flex justify-center items-center space-x-4 text-sm text-[#A5ACAF] mb-8">
              <span>{allMachines.length} Commercial Machines</span>
              <span className="w-1 h-1 bg-[#A5ACAF] rounded-full" aria-hidden="true"></span>
              <span>Professional Installation</span>
              <span className="w-1 h-1 bg-[#A5ACAF] rounded-full" aria-hidden="true"></span>
              <span>Complete Maintenance Service</span>
            </div>
          </motion.div>
          </div>
          </section>

      {/* <section className="py-20 bg-gradient-to-b from-[#000000] via-[#111111] to-[#000000]">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#F5F5F5] mb-6">
            Premium Vending Machine Solutions
          </h1>
        </div>
      </section> */}

      <section className="pt-8 bg-[#000000] relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-center mb-12 relative z-30">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Filter clicked:', option.id);
                  setActiveFilter(option.id);
                }}
                className={`px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] cursor-pointer ${
                  activeFilter === option.id
                    ? 'bg-[#FD5A1E] text-[#000000] shadow-lg shadow-[#FD5A1E]/30'
                    : 'bg-[#111111] text-[#F5F5F5] border border-[#333333] hover:border-[#FD5A1E]/50'
                }`}
                aria-pressed={activeFilter === option.id}
                aria-label={`Filter by ${option.label}, showing ${option.count} machines`}
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#000000] relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {isFiltering ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#FD5A1E] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#A5ACAF] text-sm">Filtering machines...</p>
              </div>
            </div>
          ) : machines.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 relative z-30"
              style={{ pointerEvents: 'auto' }}
            >
              {machines.map((machine, index) => (
                <MachineCard key={machine.id} machine={machine} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#111111] border border-[#333333] mb-6">
                <svg className="w-10 h-10 text-[#A5ACAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-3">No Machines Found</h3>
              <p className="text-[#A5ACAF] mb-6">
                No machines match the selected filter. Try selecting a different category.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#000000] rounded-full font-semibold hover:bg-[#FD5A1E]/90 transition-all focus:outline-none focus:ring-2 focus:ring-[#FD5A1E]"
              >
                View All Machines
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-[#000000] to-[#4d4d4d]/30 border-t border-[#4d4d4d]">
        <CTASection />
      </section>
    </div>
  );
};

export default VendingMachinesPage;
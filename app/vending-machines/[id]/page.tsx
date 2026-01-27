/**
 * @fileoverview Machine Detail Page
 * @module app/vending-machines/[id]/page
 * 
 * Refactored with separation of concerns:
 * - Data fetching: useSingleMachine, useRelatedMachines hooks
 * - UI components: ImageGallery and other detail components
 * - Page orchestration only
 */

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loading } from '@/components/ui/core/Loading';
import CTASection from '@/components/landing/CTASection';

// Hooks
import { useSingleMachine } from '@/hooks/useMachineData';
import { useRelatedMachines } from '@/hooks/useRelatedMachines';

// Components
import { ImageGallery } from '@/components/vending-machines/detail';
import { MachineGrid } from '@/components/vending-machines/listing/MachineGrid';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';



/**
 * Machine detail page
 * Clean orchestration with delegated logic
 */
const MachineDetailPage = () => {
  const params = useParams();
  const machineId = params?.id as string;

  
  // Fetch machine data (hook handles loading/error)
  const { machine, isLoading, error } = useSingleMachine(machineId);
  
  // Fetch related machines (hook handles loading)
  const { relatedMachines } = useRelatedMachines(machine);

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error or not found
  if (error || !machine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4">Machine Not Found</h2>
          <p className="text-[#A5ACAF] mb-6">{error || 'The requested machine could not be found'}</p>
          <Link
            href="/vending-machines"
            className="inline-flex items-center px-6 py-3 bg-[#FD5A1E] text-[#000000] rounded-full font-semibold hover:bg-[#FD5A1E]/90 transition-all"
          >
            View All Machines
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Vending Machines', href: '/vending-machines' },
    { label: machine.name }
  ];

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Breadcrumb Navigation */}
      <div className="pt-20 relative z-40">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#000000] to-[#111111] py-8 sm:py-12 relative z-10">
        <div className="container-custom">
          <div className="text-center mb-6 sm:mb-8 px-4">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm md:text-base uppercase tracking-wider text-[#FD5A1E] font-semibold mb-3 sm:mb-4 py-3 sm:py-4 md:py-6"
            >
              Commercial {machine.category === 'refrigerated' ? 'Refrigerated' : 'Snack'} Vending Machine
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F5F5F5] mb-4 sm:mb-6 pb-1 sm:pb-2"
            >
              {machine.name}
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Image Gallery */}
            <ImageGallery images={machine.images} machineName={machine.name} />

            {/* Machine Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 sm:space-y-6 px-4 lg:px-0"
            >
              <p className="text-base sm:text-lg text-[#A5ACAF] leading-relaxed">
                {machine.shortDescription}
              </p>

              {/* Key Features */}
              {machine.highlights && machine.highlights.length > 0 && (
                <div className="bg-[#111111] rounded-xl p-4 sm:p-6 border border-[#333333]">
                  <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] mb-3 sm:mb-4">Key Features</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {machine.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-[#A5ACAF]">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#FD5A1E] flex-shrink-0 mt-0.5 sm:mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="pt-2 relative z-[9999]">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#FD5A1E] text-[#000000] rounded-full font-semibold text-base sm:text-lg hover:bg-[#FD5A1E]/90 transition-all hover:shadow-lg hover:shadow-[#FD5A1E]/30"
                >
                  Request Consultation
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-8 sm:py-12 bg-[#000000]">
        <div className="container-custom px-4">
          <div className="bg-[#111111] rounded-2xl p-4 sm:p-6 md:p-8 border border-[#333333]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-3 sm:mb-4">Product Description</h2>
            <p className="text-sm sm:text-base text-[#A5ACAF] leading-relaxed">
              {machine.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      {machine.features && machine.features.length > 0 && (
        <section className="py-8 sm:py-12 bg-[#111111]">
          <div className="container-custom px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-6 sm:mb-8 text-center">
              Advanced Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {machine.features.map((feature: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#000000] rounded-xl p-4 sm:p-6 border border-[#333333] hover:border-[#FD5A1E]/50 transition-all"
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#F5F5F5] mb-2 flex items-center">
                    <span className="w-2 h-2 bg-[#FD5A1E] rounded-full mr-2 sm:mr-3"></span>
                    {feature.title}
                  </h3>
                  <p className="text-[#A5ACAF] text-xs sm:text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Machines */}
      {relatedMachines.length > 0 && (
        <section className="py-8 sm:py-12 md:py-16 bg-[#000000]">
          <div className="container-custom px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-8 sm:mb-12 text-center">
              You May Also Like
            </h2>
            <MachineGrid machines={relatedMachines} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-[#000000] to-[#4d4d4d]/30 border-t border-[#4d4d4d]">
        <CTASection />
      </section>
    </div>
  );
};

export default MachineDetailPage;
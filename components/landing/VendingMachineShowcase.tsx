'use client';

import { getAllVendingMachines, normalizeMachineData } from '@/lib/data/vendingMachineData';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MachineGrid } from '../MachineCard';



/**
 * VendingMachineShowcase Component
 * Displays premium vending machines using the reusable MachineCard component
 */
const VendingMachineShowcase = ({ 
  renderHeading = true, 
  className = '' 
}: {
  renderHeading?: boolean;
  className?: string;
}) => {
  // Get machine data and normalize for the card component with error handling
  const vendingMachines = getAllVendingMachines()
    .map(normalizeMachineData)
    .filter((machine): machine is NonNullable<typeof machine> => machine !== null);

  return (
    <section className={`relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">Our Machine Collection</span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#F5F5F5] leading-tight">
              Choose Your <span className="text-[#FD5A1E]">Perfect Machine</span>
            </h2>

            <p className="text-lg sm:text-xl text-[#A5ACAF] max-w-3xl mx-auto leading-relaxed">
              Professional vending machines with advanced technology, customizable options, 
              and complete service packages tailored to your workplace needs.
            </p>
          </motion.div>
        )}

        {/* Machine Cards using reusable component */}
        {vendingMachines.length > 0 ? (
          <MachineGrid
            machines={vendingMachines}
            variant="showcase"
            className="mb-16 sm:mb-20"
            ariaLabel="Featured vending machines collection"
          />
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
        
        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Link
            href="/vending-machines"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors hover:shadow-xl hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
            aria-label="View complete vending machine collection and specifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
            View Complete Collection
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VendingMachineShowcase;

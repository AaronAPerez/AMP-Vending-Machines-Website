import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, Shield, DollarSign, ChevronRight } from 'lucide-react';
import { HydrationSafeImage } from '@/components/ui/shared/HydrationSafeImage';


/**
 * ServiceAreaSection Component
 * Displays the company's service area with visual map and location information
 * Updated styling to match site-wide visual enhancements
 */
const ServiceAreaSection = () => {
  // List of service areas - you can modify this based on your actual coverage
  const serviceCities = [
    { name: 'Modesto', isPrimary: true },
    { name: 'Stockton', isPrimary: false },
    { name: 'Turlock', isPrimary: false },
    { name: 'Manteca', isPrimary: false },
    { name: 'Tracy', isPrimary: false },
    { name: 'Merced', isPrimary: false },
    { name: 'Riverbank', isPrimary: false },
    { name: 'Oakdale', isPrimary: false },
    { name: 'Ceres', isPrimary: false },
    { name: 'Patterson', isPrimary: false },
  ];
  
  // Group cities into columns for better display
  const columnCount = 2;
  const citiesPerColumn = Math.ceil(serviceCities.length / columnCount);
  const columns: { name: string; isPrimary: boolean; }[][] = [];
  
  for (let i = 0; i < columnCount; i++) {
    columns.push(serviceCities.slice(i * citiesPerColumn, (i + 1) * citiesPerColumn));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
          Service Coverage
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
          Serving Businesses Across<span className="text-[#FD5A1E]"> Stanislaus County</span>
        </h2>
        <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto">
          AMP Vending provides premium vending solutions throughout Central California. 
          Our service area includes Modesto and surrounding communities.
        </p>
      </motion.div>
      
      {/* Map and Service Areas */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
        {/* Service Area Map Card */}
        <motion.div 
          className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] shadow-lg"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Card Header */}
          <div className="p-6 border-b border-[#333333] flex items-center">
            <div className="bg-[#FD5A1E]/10 p-2 rounded-full mr-3">
              <MapPin size={20} className="text-[#FD5A1E]" />
            </div>
            <h3 className="text-xl font-bold text-[#F5F5F5]">
              Coverage Map
            </h3>
          </div>
          
          {/* Map Container */}
          <div className="relative h-[300px]">
            {/* Static map image */}
            <HydrationSafeImage 
              src="/images/central-california-map.webp" 
              alt="Central California service area map" 
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, 
                    (max-width: 768px) 50vw, 
                    (max-width: 1024px) 33vw, 
                    25vw"
              className="object-cover w-full h-full rounded-lg"
            />
            
            {/* Map Overlay with radial gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#000000]/60"></div>
            
            {/* Modesto Location Pin */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Pulsing Pin */}
              <div className="relative">
                <div className="absolute w-6 h-6 bg-[#FD5A1E] rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-pulse"></div>
                <div className="absolute w-12 h-12 bg-[#FD5A1E]/30 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-ping"></div>
                <div className="absolute w-20 h-20 bg-[#FD5A1E]/10 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                
                {/* City Label */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-6 z-30 bg-[#000000]/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                  Modesto, CA
                </div>
              </div>
            </div>
            
            {/* Information Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#000000] to-transparent p-4">
              <p className="text-[#F5F5F5] text-sm">
                Based in Modesto, CA with service throughout Central California
              </p>
            </div>
          </div>
          
          {/* Map Legend */}
          <div className="p-4 bg-[#0a0a0a] border-t border-[#333333] flex justify-between items-center text-xs text-[#A5ACAF]">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#FD5A1E] inline-block mr-2"></span>
              <span>Headquarters</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#FD5A1E]/30 inline-block mr-2"></span>
              <span>Service Coverage</span>
            </div>
            <Link href="/contact" className="text-[#FD5A1E] hover:underline flex items-center">
              <span>Full Coverage Details</span>
              <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </motion.div>
        
        {/* Service Locations Card */}
        <motion.div 
          className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] shadow-lg flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Card Header */}
          <div className="p-6 border-b border-[#333333]">
            <h3 className="text-xl font-bold text-[#F5F5F5] flex items-center">
              <MapPin size={20} className="text-[#FD5A1E] mr-2" />
              Areas We Serve
            </h3>
            <p className="text-[#A5ACAF] mt-2">
              Our vending machines are available throughout these Central California locations:
            </p>
          </div>
          
          {/* Cities List */}
          <div className="p-6 flex-grow">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="space-y-3">
                  {column.map((city) => (
                    <div key={city.name} className="flex items-center group">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        city.isPrimary ? 'bg-[#FD5A1E]' : 'bg-[#A5ACAF]/50'
                      } group-hover:scale-125 transition-transform`}></div>
                      <span className={`${
                        city.isPrimary 
                          ? 'text-[#F5F5F5] font-medium' 
                          : 'text-[#A5ACAF]'
                      } group-hover:text-[#F5F5F5] transition-colors`}>
                        {city.name}
                      </span>
                      {city.isPrimary && (
                        <span className="ml-2 text-xs text-[#FD5A1E] px-2 py-0.5 bg-[#FD5A1E]/10 rounded-full">
                          HQ
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Card Footer */}
          <div className="mt-auto p-6 border-t border-[#333333] bg-[#0a0a0a]">
            <p className="text-[#A5ACAF] text-sm mb-4">
              Don&apos;t see your location? We&apos;re continuously expanding our service area.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center text-[#FD5A1E] hover:underline"
            >
              Check availability in your area
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Service Highlights */}
      <motion.div 
        className="bg-[#0a0a0a] rounded-xl border border-[#333333] p-8 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-[#F5F5F5] mb-6 text-center">
          Premium Service Throughout Our Coverage Area
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fast Response Card */}
          <div className="bg-[#111111] p-6 rounded-lg border border-[#333333] hover:border-[#FD5A1E] transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-[#FD5A1E]/10 p-3 rounded-full">
                <Clock size={20} className="text-[#FD5A1E]" />
              </div>
              <h4 className="text-lg font-bold text-[#F5F5F5] ml-3">Fast Response Times</h4>
            </div>
            <p className="text-[#A5ACAF]">
              We provide prompt service throughout our coverage area with technicians ready to respond quickly to maintenance needs.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FD5A1E] mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#A5ACAF] text-sm">24-hour response for urgent issues</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FD5A1E] mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#A5ACAF] text-sm">Regular maintenance visits</span>
              </li>
            </ul>
          </div>
          
          {/* Premium Service Card */}
          <div className="bg-[#111111] p-6 rounded-lg border border-[#333333] hover:border-[#FD5A1E] transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-[#FD5A1E]/10 p-3 rounded-full">
                <Shield size={20} className="text-[#FD5A1E]" />
              </div>
              <h4 className="text-lg font-bold text-[#F5F5F5] ml-3">Premium Service Guarantee</h4>
            </div>
            <p className="text-[#A5ACAF]">
              All locations receive the same high-quality service with our maintenance guarantee.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FD5A1E] mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#A5ACAF] text-sm">Guaranteed maintenance coverage</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FD5A1E] mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#A5ACAF] text-sm">Regularly scheduled quality checks</span>
              </li>
            </ul>
          </div>
          
          {/* Consistent Pricing Card */}
          <div className="bg-[#111111] p-6 rounded-lg border border-[#333333] hover:border-[#FD5A1E] transition-all">
            <div className="flex items-center mb-4">
              <div className="bg-[#FD5A1E]/10 p-3 rounded-full">
                <DollarSign size={20} className="text-[#FD5A1E]" />
              </div>
              <h4 className="text-lg font-bold text-[#F5F5F5] ml-3">Consistent Pricing</h4>
            </div>
            <p className="text-[#A5ACAF]">
              We maintain consistent product pricing across all service areas with no additional fees based on location.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FD5A1E] mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#A5ACAF] text-sm">No location surcharges</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#FD5A1E] mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#A5ACAF] text-sm">Standardized product selection</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
      
      {/* Call to Action */}
      <motion.div 
        className="bg-gradient-to-r from-[#FD5A1E]/20 to-transparent rounded-xl p-8 border border-[#FD5A1E]/30 text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">
          Interested in Premium Vending for Your Location?
        </h3>
        <p className="text-[#A5ACAF] max-w-2xl mx-auto mb-8">
          Contact us today to check availability in your area and learn how our zero-cost 
          vending solutions can enhance your workplace experience.
        </p>
        
        <Link 
          href="/contact" 
          className="inline-flex items-center px-8 py-4 bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors"
        >
          Check Service Availability
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
};

export default ServiceAreaSection;
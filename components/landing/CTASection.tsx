import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';


/**
 * CTASection Component
 * Call-to-Action section with premium visuals and engaging content
 * Updated to remove cost references and focus on technology benefits
 */
const CTASection = () => {
  return (
    <>
      {/* Background graphic elements */}
      <div className="absolute inset-0 z-0">
        {/* Abstract shapes */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#FD5A1E]/30 to-[#FD5A1E]/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-[#FD5A1E]/20 to-[#FD5A1E]/5 blur-3xl"></div>
        
        {/* Diagonal pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0M30 60L60 30M0 30L30 0' stroke='white' stroke-opacity='0.2' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced Machines, <span className="text-[#FD5A1E]">Complete Service</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Join leading workplaces enjoying state-of-the-art vending with comprehensive maintenance and support.
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <CheckCircle size={24} className="text-white mr-2" />
              <span className="text-white">Professional Installation</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CheckCircle size={24} className="text-white mr-2" />
              <span className="text-white">Full-Service Support</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <CheckCircle size={24} className="text-white mr-2" />
              <span className="text-white">Latest Technology</span>
            </motion.div>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center px-8 py-4 bg-white text-black font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Button background animation */}
                <span className="absolute inset-0 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
                
                {/* Button content */}
                <span className="relative flex items-center">
                  <span className="mr-2 transition-colors duration-300 group-hover:text-white">Get Started</span>
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-[#FD5A1E] rounded-full transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={16} className="text-white" />
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div> 
    </>
  );
};

export default CTASection;
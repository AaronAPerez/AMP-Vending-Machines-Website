'use client';

import { motion } from 'framer-motion';
import ContactForm from '../contact/ContactForm';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';
import Section from '../ui/shared/Section';

/**
 * HomeContactSection Component
 * A full-width contact section with improved visual elements and animations
 * Updated to match the enhanced styling across the site
 */
const HomeContactSection = () => {
  return (
    <>
 
        {/* Contact Section */}
        <Section
          id="contact"
          background="gradient"
          spacing="lg"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <span className="text-[#FD5A1E] font-medium text-sm">Get Started</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Ready to <span className="text-[#FD5A1E]">Upgrade</span> Your Workplace?
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
              Contact {AMP_VENDING_BUSINESS_INFO.name} today for your consultation
            </p>
          </div>


      {/* Content area */}
      <div className="relative z-10">
        {/* Section Header */}
        {/* <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FD5A1E]/10 text-[#FD5A1E] text-sm font-medium rounded-full mb-4">
            <Mail size={16} className="text-[#FD5A1E]" />
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Contact <span className="text-[#FD5A1E]">AMP Vending</span>
          </h2>
          <p className="text-xl text-[#A5ACAF] max-w-3xl mx-auto mb-6">
            Have questions about our vending solutions? We&apos;re here to help. 
            Fill out the form below and our team will get back to you soon.
          </p>
        </motion.div> */}

        {/* Quick Contact Options */}
        {/* <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a 
            href="tel:+12094035450" 
            className="flex items-center gap-2 px-4 py-3 bg-[#111111] text-[#F5F5F5] rounded-full hover:bg-[#222222] transition-colors border border-[#333333]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FD5A1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (209) 403-5450
          </a>
          
          <a 
            href="mailto:ampdesignandconsulting@gmail.com" 
            className="flex items-center gap-2 px-4 py-3 bg-[#111111] text-[#F5F5F5] rounded-full hover:bg-[#222222] transition-colors border border-[#333333]"
          >
            <Mail size={20} className="text-[#FD5A1E]" />
            ampdesignandconsulting@gmail.com
          </a>
          
          <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] text-[#F5F5F5] rounded-full border border-[#333333]">
            <MapPin size={20} className="text-[#FD5A1E]" />
            Modesto, CA
          </div>
          
          <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] text-[#F5F5F5] rounded-full border border-[#333333]">
            <Clock size={20} className="text-[#FD5A1E]" />
            Mon-Fri: 9AM-5PM
          </div>
        </motion.div> */}

        {/* Card that wraps the contact form */}
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-[#333333] shadow-2xl bg-[#0a0a0a]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#111111] to-[#0a0a0a] z-0"></div>

          {/* Enhanced contact form content */}
          <div className="relative z-10">
            <ContactForm />
          </div>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-[#FD5A1E]/10 to-transparent rounded-full blur-2xl -mr-32 -mt-32 pointer-events-none"></div>
        </motion.div>

        {/* Commitment Banner */}
        <motion.div
          className="mt-16 bg-[#111111] rounded-xl overflow-hidden border border-[#333333]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="p-8 text-center">
            <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
              Our Commitment to You
            </h3>
            <p className="text-[#A5ACAF] max-w-3xl mx-auto">
              When you reach out to AMP Vending, you can expect a prompt response within 24 hours.
              We&apos;re dedicated to providing exceptional service from the first contact through ongoing support.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="bg-[#0a0a0a] px-4 py-2 rounded-full border border-[#FD5A1E]/30 text-[#F5F5F5] text-sm">
                <span className="text-[#FD5A1E] mr-2">✓</span> 24-Hour Response Time
              </div>
              <div className="bg-[#0a0a0a] px-4 py-2 rounded-full border border-[#FD5A1E]/30 text-[#F5F5F5] text-sm">
                <span className="text-[#FD5A1E] mr-2">✓</span> Free Consultation
              </div>
              <div className="bg-[#0a0a0a] px-4 py-2 rounded-full border border-[#FD5A1E]/30 text-[#F5F5F5] text-sm">
                <span className="text-[#FD5A1E] mr-2">✓</span> Ongoing Support
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-sm text-[#A5ACAF]">
            We value your privacy. Information submitted through this form will only be used to respond to your inquiry.
          </p>
        </motion.div>
      </div>
    </Section>
    </>
  );
};

export default HomeContactSection;
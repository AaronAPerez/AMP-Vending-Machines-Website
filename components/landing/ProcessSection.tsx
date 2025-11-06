import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MapPin, Settings, HeadphonesIcon } from 'lucide-react';
import GlareCard from '@/components/ui/effects/glare-card';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';
import Section from '../ui/shared/Section';



const ProcessSection = () => {
  // Define process steps with icons, descriptions, and accessibility labels
  const processSteps = [
    {
      number: 1,
      title: "Request a Consultation",
      description: "Schedule a quick call to discuss your workplace needs and machine options.",
      icon: <Phone size={24} aria-hidden="true" />,
      color: "from-pink-500 to-orange-500",
      ariaLabel: "Step 1: Request a consultation for vending machine assessment"
    },
    {
      number: 2,
      title: "Site Assessment",
      description: "We'll visit your location to identify the optimal placement for your machines.",
      icon: <MapPin size={24} aria-hidden="true" />,
      color: "from-orange-500 to-amber-500",
      ariaLabel: "Step 2: Professional site assessment for optimal machine placement"
    },
    {
      number: 3,
      title: "Installation",
      description: "Our team handles the complete setup with minimal disruption to your workplace.",
      icon: <Settings size={24} aria-hidden="true" />,
      color: "from-amber-500 to-yellow-500",
      ariaLabel: "Step 3: Professional installation with minimal workplace disruption"
    },
    {
      number: 4,
      title: "Ongoing Support",
      description: "We handle all maintenance and restocking automatically. You simply enjoy the convenience.",
      icon: <HeadphonesIcon size={24} aria-hidden="true" />,
      color: "from-yellow-500 to-green-500",
      ariaLabel: "Step 4: Ongoing maintenance and support services"
    }
  ];

  return (
    <>
      {/* Implementation Process */}
      <Section
        id="process"
        background="dark"
        spacing="lg"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
            <span className="text-[#FD5A1E] font-medium text-sm">Simple Process</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
            Getting Started <span className="text-[#FD5A1E]">Is Simple</span>
          </h2>

          <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
            Four easy steps to transform your workplace in {AMP_VENDING_BUSINESS_INFO.address.city} and surrounding areas
          </p>
        </div>

        {/* Process Steps Grid - Fully Responsive with Fixed Heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 max-w-7xl mx-auto px-4">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="flex justify-center"
            >
              <GlareCard className="w-full max-w-[320px] min-h-[380px] sm:min-h-[350px] lg:min-h-[380px]">
                <motion.div
                  className="relative bg-[#111111] rounded-xl overflow-hidden border border-[#333333] shadow-lg w-full h-full flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                  aria-label={step.ariaLabel}
                  role="article"
                >
                  {/* Step number with gradient background - Fixed height */}
                  <div className="relative h-32 sm:h-36 lg:h-40 overflow-hidden flex-shrink-0">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-80`}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 flex items-center justify-center mb-6">
                      <span
                        className="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg"
                        aria-label={`Step ${step.number}`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Icon circle overlapping sections */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-[#111111] w-16 h-16 rounded-full border-4 border-[#111111] flex items-center justify-center shadow-lg">
                        <div
                          className={`bg-gradient-to-r ${step.color} w-full h-full rounded-full flex items-center justify-center text-white transition-transform hover:scale-105`}
                          aria-hidden="true"
                        >
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content section with proper spacing for overlapping icon */}
                  <div className="flex-1 p-4 sm:p-6 text-center flex justify-center">
                    <div className="space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#A5ACAF] leading-relaxed px-2">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connecting line for desktop - Enhanced visibility */}
                  {index < processSteps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-16 xl:top-20 -right-4 xl:-right-8 w-8 xl:w-16 h-0.5 bg-gradient-to-r from-[#FD5A1E] to-[#FD5A1E]/40 z-20"
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              </GlareCard>
            </div>
          ))}
        </div>

        {/* Mobile Process Timeline */}
        <div className="block lg:hidden relative mb-12 max-w-xs mx-auto" aria-hidden="true">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-amber-500 to-green-500 transform -translate-x-1/2 opacity-60" />
          {/* Timeline dots */}
          {processSteps.map((step, index) => (
            <div
              key={`dot-${step.number}`}
              className={`absolute left-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${step.color} transform -translate-x-1/2 shadow-lg`}
              style={{ top: `${(index * 25) + 12.5}%` }}
            />
          ))}
        </div>

        {/* Implementation Feature Section */}
        <motion.div
          className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#333333] mb-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="p-6 md:p-8 lg:p-10">
            {/* Header section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-4">
                <svg
                  className="w-5 h-5 text-[#FD5A1E] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[#FD5A1E] font-medium text-sm">Professional Implementation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4">
                Complete Implementation Service
              </h3>
              <p className="text-[#A5ACAF] max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
                Our commitment is simple - you receive premium vending machines with professional
                installation, ongoing maintenance support, and comprehensive service. We handle everything from
                initial setup to regular servicing so you can focus on enjoying the benefits.
              </p>
            </div>

            {/* Benefits Grid - Responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Professional Installation",
                  description: "Expert setup and configuration"
                },
                {
                  icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
                  title: "Ongoing Maintenance",
                  description: "Regular servicing included"
                },
                {
                  icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                  title: "Automatic Restocking",
                  description: "Smart inventory management"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex flex-col items-center text-center p-4 bg-[#000000]/40 rounded-lg border border-[#333333]/50 hover:border-[#FD5A1E]/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FD5A1E]/20 to-[#FD5A1E]/10 rounded-full flex items-center justify-center mb-3">
                    <svg
                      className="w-6 h-6 text-[#FD5A1E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                    </svg>
                  </div>
                  <h4 className="text-[#F5F5F5] font-semibold mb-2 text-sm sm:text-base">
                    {benefit.title}
                  </h4>
                  <p className="text-[#A5ACAF] text-xs sm:text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action - Enhanced accessibility */}
        <motion.div
          className="text-center mb-8 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors hover:shadow-xl hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Schedule your consultation for vending machine installation"
          >
            <span className="text-sm sm:text-base">Schedule Your Consultation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <p className="mt-4 text-[#A5ACAF] text-sm sm:text-base">
            Most installations can be completed within 5-7 business days after assessment.
          </p>
        </motion.div>
      </Section>
    </>
  );
};

export default ProcessSection;
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';
import Section from '@/components/ui/shared/Section';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';

/**
 * ServicesCTASection Component
 *
 * Final call-to-action section for the Services page.
 * Emphasizes the free service model and provides clear contact options.
 *
 * Primary CTA: "Request a Free Machine"
 */

const ServicesCTASection: React.FC = () => {
  // Benefits to highlight
  const benefits = [
    "Free installation",
    "Free maintenance",
    "Free restocking",
    "Modern machines",
    "Cashless payments"
  ];

  const phoneNumber = AMP_VENDING_BUSINESS_INFO.contact.phone;

  return (
    <Section
      id="services-cta"
      background="none"
      spacing="xl"
      className="relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#FD5A1E]/20 via-black to-black"
        aria-hidden="true"
      />

      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-[#FD5A1E]/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 bg-[#FD5A1E]/5 rounded-full blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/20 border border-[#FD5A1E]/30 rounded-full mb-6"
        >
          <span className="text-[#FD5A1E] font-semibold text-sm">
            100% Free Service
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6"
        >
          Ready to Get a{' '}
          <span className="text-[#FD5A1E]">Free Vending Machine</span>?
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-[#A5ACAF] max-w-2xl mx-auto mb-8"
        >
          Join businesses across the Central Valley enjoying premium vending services
          at absolutely no cost. Get started today!
        </motion.p>

        {/* Benefits row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-[#333333] rounded-full"
            >
              <CheckCircle
                className="w-4 h-4 text-[#FD5A1E]"
                aria-hidden="true"
              />
              <span className="text-[#F5F5F5] text-sm">{benefit}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
        >
          <AccessibleButton
            href="/contact"
            variant="cta"
            size="xl"
            rightIcon={<ArrowRight className="w-6 h-6" />}
            aria-label="Request a free vending machine"
          >
            Request a Free Machine
          </AccessibleButton>

          <AccessibleButton
            href={`tel:${phoneNumber.replace(/\D/g, '')}`}
            variant="secondary"
            size="xl"
            leftIcon={<Phone className="w-5 h-5" />}
            aria-label={`Call us at ${phoneNumber}`}
          >
            {phoneNumber}
          </AccessibleButton>
        </motion.div>

        {/* Trust statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-[#A5ACAF] text-sm"
        >
          No contracts required • Quick installation • Local service team
        </motion.p>
      </div>
    </Section>
  );
};

export default ServicesCTASection;

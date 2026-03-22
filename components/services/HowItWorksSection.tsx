'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Wrench, DollarSign } from 'lucide-react';
import Section from '@/components/ui/shared/Section';
import GlareCard from '@/components/ui/effects/glare-card';

/**
 * HowItWorksSection Component
 *
 * Displays the 3-step process for getting a free vending machine.
 * Optimized for clarity and conversion with visual step indicators.
 *
 * Steps:
 * 1. We install the machine
 * 2. We stock & maintain it
 * 3. You pay nothing
 */

// Step data type definition
interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const HowItWorksSection: React.FC = () => {
  // Define the 3-step process
  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "We Install the Machine",
      description: "Our team handles complete installation at your location. We assess your space, deliver the equipment, and set everything up professionally.",
      icon: <Package className="w-8 h-8" aria-hidden="true" />,
      gradient: "from-orange-500 to-amber-500"
    },
    {
      number: 2,
      title: "We Stock & Maintain It",
      description: "Regular restocking with popular products, routine cleaning, and preventive maintenance. We handle repairs and keep your machine running smoothly.",
      icon: <Wrench className="w-8 h-8" aria-hidden="true" />,
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      number: 3,
      title: "You Pay Nothing",
      description: "No installation fees, no maintenance costs, no hidden charges. We earn from product sales while you enjoy a valuable employee amenity.",
      icon: <DollarSign className="w-8 h-8" aria-hidden="true" />,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section
      id="how-it-works"
      background="gradient"
      spacing="xl"
    >
      {/* Section header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6"
        >
          <span className="text-[#FD5A1E] font-medium text-sm">Simple Process</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
        >
          How It <span className="text-[#FD5A1E]">Works</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-[#A5ACAF] max-w-2xl mx-auto"
        >
          Getting a free vending machine for your business is simple
        </motion.p>
      </div>

      {/* Steps grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            variants={itemVariants}
            className="relative"
          >
            {/* Connecting line between steps (desktop only) */}
            {index < steps.length - 1 && (
              <div
                className="hidden md:block absolute top-20 left-[60%] w-full h-1 bg-gradient-to-r from-[#FD5A1E]/50 to-transparent z-0"
                aria-hidden="true"
              />
            )}

            <GlareCard className="h-full">
              <div className="relative bg-[#111111] rounded-xl border border-[#333333] p-6 sm:p-8 h-full flex flex-col">
                {/* Step number badge */}
                <div
                  className={`absolute -top-8 left-6 w-12 h-12 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg`}
                  aria-label={`Step ${step.number}`}
                >
                  <span className="text-white text-xl font-bold">{step.number}</span>
                </div>

                {/* Icon container */}
                <div className="mt-6 mb-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} bg-opacity-20 flex items-center justify-center`}
                    style={{ background: `linear-gradient(135deg, rgba(253, 90, 30, 0.1), rgba(253, 90, 30, 0.05))` }}
                  >
                    <div className="text-[#FD5A1E]">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-3">
                  {step.title}
                </h3>

                <p className="text-[#A5ACAF] leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            </GlareCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile step connector (vertical timeline) */}
      <div className="block md:hidden relative mt-8" aria-hidden="true">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-yellow-500 to-green-500 opacity-30" />
      </div>
    </Section>
  );
};

export default HowItWorksSection;

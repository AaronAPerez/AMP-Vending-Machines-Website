'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin,
  Zap,
  Sparkles,
  CircleDollarSign,
  ShieldCheck
} from 'lucide-react';
import Section from '@/components/ui/shared/Section';
import GlareCard from '@/components/ui/effects/glare-card';

/**
 * WhyChooseSection Component
 *
 * Displays the key differentiators and value propositions for AMP Vending.
 * Emphasizes local presence, reliability, and zero-cost model.
 *
 * Key Points:
 * - Local business
 * - Fast restocking
 * - Modern machines
 * - No cost to you
 * - Reliable service
 */

// Differentiator type definition
interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
}

const WhyChooseSection: React.FC = () => {
  // Define key differentiators
  const differentiators: Differentiator[] = [
    {
      id: "local",
      title: "Locally Owned",
      description: "Based right here in Modesto, we're your neighbors. Quick response times and personalized service because we live and work in the same community.",
      icon: <MapPin className="w-8 h-8" aria-hidden="true" />,
      highlight: "Central Valley Based"
    },
    {
      id: "fast-restocking",
      title: "Fast Restocking",
      description: "Regular service visits ensure your machines are always fully stocked. We monitor inventory levels and respond quickly to keep products available.",
      icon: <Zap className="w-8 h-8" aria-hidden="true" />,
      highlight: "Weekly Service"
    },
    {
      id: "modern-machines",
      title: "Modern Machines",
      description: "State-of-the-art vending equipment with touchscreen displays, cashless payment, and energy-efficient operation. No outdated machines here.",
      icon: <Sparkles className="w-8 h-8" aria-hidden="true" />,
      highlight: "Latest Technology"
    },
    {
      id: "no-cost",
      title: "Zero Cost",
      description: "No installation fees, no maintenance charges, no hidden costs. We provide the machine, stock it, and maintain it - all at absolutely no cost to you.",
      icon: <CircleDollarSign className="w-8 h-8" aria-hidden="true" />,
      highlight: "$0 Investment"
    },
    {
      id: "reliable",
      title: "Reliable Service",
      description: "Dependable maintenance and prompt issue resolution. When something needs attention, we're on it quickly to minimize any downtime.",
      icon: <ShieldCheck className="w-8 h-8" aria-hidden="true" />,
      highlight: "Trusted Partner"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section
      id="why-choose-amp"
      background="dark"
      spacing="xl"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Header and intro */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6"
            >
              <span className="text-[#FD5A1E] font-medium text-sm">Why Us</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-6"
            >
              Why Choose{' '}
              <span className="text-[#FD5A1E]">AMP Vending</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#A5ACAF] mb-8 leading-relaxed"
            >
              We&apos;re not just another vending company. We&apos;re local business owners
              committed to providing exceptional service to our Central Valley neighbors.
              Here&apos;s what sets us apart:
            </motion.p>

            {/* Featured stat box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <GlareCard>
                <div className="bg-gradient-to-br from-[#FD5A1E]/20 to-[#FD5A1E]/5 rounded-xl p-6 border border-[#FD5A1E]/30">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold text-[#FD5A1E]">100%</div>
                    <div>
                      <div className="text-[#F5F5F5] font-semibold">Satisfaction Focus</div>
                      <div className="text-[#A5ACAF] text-sm">
                        We succeed when you&apos;re happy with our service
                      </div>
                    </div>
                  </div>
                </div>
              </GlareCard>
            </motion.div>

            {/* Vending machine image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 hidden lg:block"
            >
              <div className="relative rounded-xl overflow-hidden border border-[#333333]">
                <Image
                  src="/images/machines/refrigerated-combo-vending-machine-front-products-01.webp"
                  alt="AMP Vending machine front angle view showing modern design"
                  width={500}
                  height={350}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[#F5F5F5] text-sm font-medium">
                    Modern touchscreen vending with cashless payments
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column - Differentiators list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {differentiators.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group"
              >
                <div className="flex gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-[#333333] hover:border-[#FD5A1E]/30 transition-all duration-300">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#FD5A1E]/20 to-[#FD5A1E]/5 flex items-center justify-center text-[#FD5A1E] group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-[#F5F5F5]">
                        {item.title}
                      </h3>
                      {item.highlight && (
                        <span className="px-2 py-0.5 bg-[#FD5A1E]/10 text-[#FD5A1E] text-xs font-medium rounded-full">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-[#A5ACAF] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default WhyChooseSection;

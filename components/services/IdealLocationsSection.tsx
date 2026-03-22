'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Warehouse,
  GraduationCap,
  Dumbbell,
  Hotel,
  Landmark,
  CheckCircle
} from 'lucide-react';
import Section from '@/components/ui/shared/Section';

/**
 * IdealLocationsSection Component
 *
 * Displays the ideal business types and locations for vending machine placement.
 * Helps potential customers identify if their location is a good fit.
 *
 * Location Types:
 * - Offices
 * - Warehouses
 * - Schools
 * - Gyms
 * - Hotels
 * - Government buildings
 */

// Location type definition
interface LocationType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const IdealLocationsSection: React.FC = () => {
  // Define location types
  const locations: LocationType[] = [
    {
      id: "offices",
      title: "Offices",
      description: "Keep employees energized and productive with convenient break room vending.",
      icon: <Building2 className="w-8 h-8" aria-hidden="true" />,
      benefits: ["Boost productivity", "Employee perk", "Reduce offsite trips"]
    },
    {
      id: "warehouses",
      title: "Warehouses",
      description: "Provide 24/7 refreshments for shift workers and distribution center staff.",
      icon: <Warehouse className="w-8 h-8" aria-hidden="true" />,
      benefits: ["24/7 availability", "Multiple locations", "High-traffic areas"]
    },
    {
      id: "schools",
      title: "Schools",
      description: "Healthy snack options for students and staff in educational facilities.",
      icon: <GraduationCap className="w-8 h-8" aria-hidden="true" />,
      benefits: ["Healthy options", "Smart snacks compliant", "Staff lounges"]
    },
    {
      id: "gyms",
      title: "Gyms & Fitness Centers",
      description: "Protein snacks, energy drinks, and hydration options for gym members.",
      icon: <Dumbbell className="w-8 h-8" aria-hidden="true" />,
      benefits: ["Sports drinks", "Protein snacks", "Recovery products"]
    },
    {
      id: "hotels",
      title: "Hotels",
      description: "Convenient guest amenities with late-night snack and beverage access.",
      icon: <Hotel className="w-8 h-8" aria-hidden="true" />,
      benefits: ["Guest convenience", "24/7 access", "Lobby placement"]
    },
    {
      id: "government",
      title: "Government Buildings",
      description: "Reliable vending services for municipal buildings and public facilities.",
      icon: <Landmark className="w-8 h-8" aria-hidden="true" />,
      benefits: ["ADA compliant", "Secure machines", "Public access"]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section
      id="ideal-locations"
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
          <span className="text-[#FD5A1E] font-medium text-sm">Perfect Fit</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
        >
          Ideal <span className="text-[#FD5A1E]">Locations</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-[#A5ACAF] max-w-2xl mx-auto"
        >
          Our vending services work great in these types of facilities
        </motion.p>
      </div>

      {/* Locations grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {locations.map((location) => (
          <motion.div
            key={location.id}
            variants={itemVariants}
            className="group"
          >
            <div className="relative bg-[#0a0a0a] rounded-xl border border-[#333333] p-6 h-full flex flex-col hover:border-[#FD5A1E]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#FD5A1E]/5">
              {/* Icon with background */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FD5A1E]/20 to-[#FD5A1E]/5 flex items-center justify-center text-[#FD5A1E] group-hover:scale-110 transition-transform duration-300">
                  {location.icon}
                </div>
                <h3 className="text-xl font-bold text-[#F5F5F5]">
                  {location.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[#A5ACAF] text-sm leading-relaxed mb-4">
                {location.description}
              </p>

              {/* Benefits list */}
              <div className="mt-auto pt-4 border-t border-[#333333]/50">
                <ul className="flex flex-wrap gap-2">
                  {location.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FD5A1E]/10 rounded-full text-xs text-[#FD5A1E]"
                    >
                      <CheckCircle className="w-3 h-3" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <p className="text-[#A5ACAF] text-base">
          Don&apos;t see your business type?{' '}
          <a
            href="/contact"
            className="text-[#FD5A1E] hover:underline font-medium"
          >
            Contact us
          </a>
          {' '}to discuss your specific needs.
        </p>
      </motion.div>
    </Section>
  );
};

export default IdealLocationsSection;

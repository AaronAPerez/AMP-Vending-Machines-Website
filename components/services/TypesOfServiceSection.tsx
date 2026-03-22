'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Cookie,
  GlassWater,
  LayoutGrid,
  CreditCard,
  Accessibility,
  Leaf,
  ArrowRight
} from 'lucide-react';
import Section from '@/components/ui/shared/Section';
import GlareCard from '@/components/ui/effects/glare-card';

/**
 * TypesOfServiceSection Component
 *
 * Displays the different types of vending services offered.
 * Each service type has an icon, title, description, and optional image.
 *
 * Service Types:
 * - Snack vending
 * - Drink vending
 * - Combo machines
 * - Cashless payments
 * - ADA compliance
 * - Energy-efficient machines
 */

// Service type definition
interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  href?: string;
  image?: string;
  imageAlt?: string;
}

const TypesOfServiceSection: React.FC = () => {
  // Define service types with images
  const serviceTypes: ServiceType[] = [
    {
      id: "snack-vending",
      title: "Snack Vending",
      description: "Wide variety of snacks from healthy options to classic favorites. 50+ product selections to satisfy every craving.",
      icon: <Cookie className="w-7 h-7" aria-hidden="true" />,
      features: ["50+ product options", "Healthy choices available", "Customizable selection"],
      href: "/vending-machines",
      image: "/images/machines/amp-premium-touchscreen-vending-machine-bg.webp",
      imageAlt: "Vending machine with snack products display"
    },
    {
      id: "drink-vending",
      title: "Drink Vending",
      description: "Cold beverages including sodas, energy drinks, water, and juices. Temperature-controlled for optimal freshness.",
      icon: <GlassWater className="w-7 h-7" aria-hidden="true" />,
      features: ["Cold beverages", "Energy drinks", "Bottled water"],
      href: "/vending-machines",
      image: "/images/machines/refrigerated-vending-machine-blue-refresh-bg.webp",
      imageAlt: "Refrigerated vending machine with beverage selection"
    },
    {
      id: "combo-machines",
      title: "Combo Machines",
      description: "Best of both worlds - snacks and drinks in a single machine. Perfect for locations with limited space.",
      icon: <LayoutGrid className="w-7 h-7" aria-hidden="true" />,
      features: ["Space efficient", "Snacks & drinks", "Versatile placement"],
      href: "/vending-machines",
      image: "/images/machines/amp-refrigerated-vending-machine-bg.webp",
      imageAlt: "Combo vending machine with snacks and drinks"
    },
    {
      id: "cashless-payments",
      title: "Cashless Payments",
      description: "Modern payment options including credit cards, Apple Pay, Google Pay, and mobile payments for convenience.",
      icon: <CreditCard className="w-7 h-7" aria-hidden="true" />,
      features: ["Credit/Debit cards", "Apple Pay & Google Pay", "Contactless payments"],
      image: "/images/machines/refrigerated-card-reader.webp",
      imageAlt: "Contactless payment card reader on vending machine"
    },
    {
      id: "ada-compliance",
      title: "ADA Compliant",
      description: "All machines meet ADA accessibility requirements, ensuring everyone can easily access products.",
      icon: <Accessibility className="w-7 h-7" aria-hidden="true" />,
      features: ["Wheelchair accessible", "Easy-reach controls", "Clear displays"]
    },
    {
      id: "energy-efficient",
      title: "Energy Efficient",
      description: "Modern machines with energy-saving features to reduce environmental impact and lower operating costs.",
      icon: <Leaf className="w-7 h-7" aria-hidden="true" />,
      features: ["LED lighting", "Smart power management", "Eco-friendly refrigeration"]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section
      id="types-of-service"
      background="dark"
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
          <span className="text-[#FD5A1E] font-medium text-sm">Our Services</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
        >
          Types of <span className="text-[#FD5A1E]">Service</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-[#A5ACAF] max-w-2xl mx-auto"
        >
          Modern vending solutions tailored to your workplace needs
        </motion.p>
      </div>

      {/* Services grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {serviceTypes.map((service) => (
          <motion.div
            key={service.id}
            variants={cardVariants}
          >
            <GlareCard className="h-full">
              <div className="relative bg-[#111111] rounded-xl border border-[#333333] overflow-hidden h-full flex flex-col hover:border-[#FD5A1E]/30 transition-colors duration-300">
                {/* Image header if available */}
                {service.image && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt || service.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FD5A1E]/20 to-[#FD5A1E]/5 flex items-center justify-center mb-4 text-[#FD5A1E]">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#A5ACAF] text-sm leading-relaxed mb-4 flex-grow">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-[#A5ACAF]"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#FD5A1E]"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link if available */}
                  {service.href && (
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1 text-[#FD5A1E] text-sm font-medium hover:gap-2 transition-all duration-300 group"
                    >
                      View Machines
                      <ArrowRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </GlareCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default TypesOfServiceSection;

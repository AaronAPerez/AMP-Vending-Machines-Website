'use client';

/**
 * ServiceAreaPageClient Component
 *
 * Client component for individual city/area service pages.
 * Displays city-specific information, services, and CTAs.
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  CheckCircle,
  ArrowRight,
  Building2,
  Users,
  Clock,
  Wrench,
  Package,
  Headphones,
  CreditCard,
} from 'lucide-react';
import Section from '@/components/ui/shared/Section';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import CTASection from '@/components/landing/CTASection';
import type { ServiceCity } from '@/lib/data/comprehensiveServiceAreas';

/**
 * Extended city data with additional details
 */
interface CityDetails extends ServiceCity {
  description: string;
  businesses: string;
  landmarks: string[];
}

interface ServiceAreaPageClientProps {
  cityData: CityDetails;
  nearbyCities: ServiceCity[];
}

/**
 * ServiceAreaPageClient - Main component for individual city pages
 */
export default function ServiceAreaPageClient({
  cityData,
  nearbyCities,
}: ServiceAreaPageClientProps) {
  const isHeadquarters = cityData.slug === 'modesto';

  return (
    <div className="bg-black min-h-screen">
      {/* Breadcrumb */}
      <nav
        className="bg-black/50 border-b border-[#333333] pt-20"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-[#A5ACAF]">
          <Link href="/" className="hover:text-[#FD5A1E] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/service-areas" className="hover:text-[#FD5A1E] transition-colors">
            Service Areas
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#F5F5F5]">{cityData.name}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <CityHeroSection cityData={cityData} isHeadquarters={isHeadquarters} />

      {/* Statistics Section */}
      <CityStatsSection cityData={cityData} />

      {/* Services Section */}
      <CityServicesSection cityName={cityData.name} />

      {/* Landmarks Section */}
      <CityLandmarksSection cityData={cityData} />

      {/* Nearby Cities Section */}
      {nearbyCities.length > 0 && (
        <NearbyCitiesSection
          currentCity={cityData.name}
          county={cityData.county}
          nearbyCities={nearbyCities}
        />
      )}

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

/**
 * Hero section for city page
 */
function CityHeroSection({
  cityData,
  isHeadquarters,
}: {
  cityData: CityDetails;
  isHeadquarters: boolean;
}) {
  return (
    <Section background="gradient" spacing="xl">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-full mb-6"
        >
          <MapPin className="w-4 h-4 text-[#FD5A1E] mr-2" aria-hidden="true" />
          <span className="text-[#FD5A1E] font-medium text-sm">
            {isHeadquarters ? 'Headquarters Location' : `${cityData.county} County`}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-6"
        >
          Vending Machines in{' '}
          <span className="text-[#FD5A1E]">{cityData.name}, California</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#A5ACAF] mb-8 max-w-2xl mx-auto"
        >
          {cityData.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <AccessibleButton
            href="/contact"
            variant="cta"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Request Quote for {cityData.name}
          </AccessibleButton>
          <AccessibleButton href="tel:+12094035450" variant="secondary" size="lg">
            Call (209) 403-5450
          </AccessibleButton>
        </motion.div>
      </div>
    </Section>
  );
}

/**
 * Statistics section
 */
function CityStatsSection({ cityData }: { cityData: CityDetails }) {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: cityData.population?.toLocaleString() || 'N/A',
      label: 'Population',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: cityData.businesses,
      label: 'Local Businesses',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: '24/7',
      label: 'Support Available',
    },
  ];

  return (
    <Section background="dark" spacing="lg">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111111] p-6 rounded-xl border border-[#333333] text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FD5A1E]/10 text-[#FD5A1E] mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-[#FD5A1E] mb-1">{stat.value}</div>
              <div className="text-sm text-[#A5ACAF]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/**
 * Services section
 */
function CityServicesSection({ cityName }: { cityName: string }) {
  const services = [
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Professional Installation',
      description: `Professional installation of touchscreen vending machines at your ${cityName} location.`,
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Regular Maintenance',
      description: `Scheduled maintenance and cleaning to keep your machines running smoothly in ${cityName}.`,
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Product Restocking',
      description: `Regular restocking with popular snacks, beverages, and healthy options for your ${cityName} workplace.`,
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: '24/7 Support',
      description: `Round-the-clock technical support for all vending machine issues in ${cityName}.`,
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Modern Payments',
      description: 'Apple Pay, Google Pay, credit cards, debit cards, and cash accepted on all machines.',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'ADA Compliant',
      description: 'All machines meet ADA accessibility requirements for inclusive workplace vending.',
    },
  ];

  return (
    <Section background="gradient" spacing="xl">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4">
            Our Services in <span className="text-[#FD5A1E]">{cityName}</span>
          </h2>
          <p className="text-[#A5ACAF] max-w-2xl mx-auto">
            Complete vending machine solutions at zero cost to your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#111111] p-6 rounded-xl border border-[#333333] hover:border-[#FD5A1E]/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#FD5A1E]/10 text-[#FD5A1E] mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">{service.title}</h3>
              <p className="text-sm text-[#A5ACAF]">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/**
 * Landmarks section
 */
function CityLandmarksSection({ cityData }: { cityData: CityDetails }) {
  return (
    <Section background="dark" spacing="lg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">
            Serving {cityData.name} Landmarks & Businesses
          </h2>
          <p className="text-[#A5ACAF]">
            We provide vending services near these popular {cityData.name} locations.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {cityData.landmarks.map((landmark, index) => (
            <motion.div
              key={landmark}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 px-4 py-2 rounded-full"
            >
              <span className="text-[#F5F5F5] text-sm">{landmark}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/**
 * Nearby cities section for internal linking
 */
function NearbyCitiesSection({
  currentCity,
  county,
  nearbyCities,
}: {
  currentCity: string;
  county: string;
  nearbyCities: ServiceCity[];
}) {
  return (
    <Section background="gradient" spacing="lg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">
            Also Serving Nearby {county} County Cities
          </h2>
          <p className="text-[#A5ACAF]">
            We provide the same great service throughout {county} County.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
          {nearbyCities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              prefetch={true}
              className="block bg-[#111111] rounded-lg border border-[#333333] p-4 hover:border-[#FD5A1E] hover:bg-[#1a1a1a] transition-all text-center group cursor-pointer relative z-10"
            >
              <span className="text-[#F5F5F5] group-hover:text-[#FD5A1E] transition-colors font-medium pointer-events-none">
                {city.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/service-areas"
            className="text-[#FD5A1E] hover:underline inline-flex items-center gap-1 text-sm font-medium"
          >
            View All Service Areas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

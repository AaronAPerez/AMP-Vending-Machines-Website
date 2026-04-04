'use client';

/**
 * ServiceAreasPageClient Component
 *
 * Client-side component for the service areas index page.
 * Displays interactive map, county sections, and city listings.
 *
 * Features:
 * - Interactive county cards with city listings
 * - Service area map visualization
 * - CTA sections for lead generation
 * - Responsive grid layouts
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, ArrowRight, Building2, Users, Clock } from 'lucide-react';
import Section from '@/components/ui/shared/Section';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import {
  STANISLAUS_COUNTY_CITIES,
  SAN_JOAQUIN_COUNTY_CITIES,
  COVERAGE_STATS,
  type ServiceCity,
} from '@/lib/data/comprehensiveServiceAreas';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';

/**
 * ServiceAreasPageClient - Main client component for service areas
 */
export default function ServiceAreasPageClient() {
  const { serviceArea } = AMP_VENDING_BUSINESS_INFO;

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <ServiceAreasHero />

      {/* Coverage Stats */}
      <CoverageStatsSection />

      {/* County Sections */}
      <CountySection
        countyName="Stanislaus County"
        cities={STANISLAUS_COUNTY_CITIES}
        isPrimary={true}
        description="Our headquarters is in Modesto, making Stanislaus County our primary service area. We provide same-day response for all cities."
      />

      <CountySection
        countyName="San Joaquin County"
        cities={SAN_JOAQUIN_COUNTY_CITIES}
        isPrimary={false}
        description="Full service coverage throughout San Joaquin County, including Stockton, Tracy, Manteca, and all surrounding communities."
      />

      {/* Service Area Map */}
      <ServiceAreaMapFull serviceRadius={serviceArea.radius} />

      {/* CTA Section */}
      <ServiceAreasCTA />
    </div>
  );
}

/**
 * Hero section for service areas page
 */
function ServiceAreasHero() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-[#FD5A1E]/10"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-[#A5ACAF]">
            <li>
              <Link href="/" className="hover:text-[#FD5A1E] transition-colors">
                Home
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-[#F5F5F5]">Service Areas</li>
          </ol>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-full mb-6"
          >
            <MapPin className="w-4 h-4 text-[#FD5A1E] mr-2" aria-hidden="true" />
            <span className="text-[#FD5A1E] font-medium text-sm">
              Serving {COVERAGE_STATS.overall.total}+ Communities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F5F5] mb-6"
          >
            Vending Services Across the{' '}
            <span className="text-[#FD5A1E]">Central Valley</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-[#A5ACAF] mb-8 max-w-2xl mx-auto"
          >
            Professional vending machine installation, maintenance, and restocking for businesses
            throughout Stanislaus County, San Joaquin County, and surrounding areas.
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
              Check Availability
            </AccessibleButton>
            <AccessibleButton
              href="tel:+12094035450"
              variant="secondary"
              size="lg"
            >
              Call (209) 403-5450
            </AccessibleButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Coverage statistics section
 */
function CoverageStatsSection() {
  const stats = [
    {
      icon: <MapPin className="w-8 h-8" />,
      value: `${COVERAGE_STATS.overall.total}+`,
      label: 'Cities Served',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: '2',
      label: 'Counties Covered',
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: '1M+',
      label: 'Population Served',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: '24/7',
      label: 'Support Available',
    },
  ];

  return (
    <Section background="dark" spacing="lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 bg-[#111111] rounded-xl border border-[#333333]"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FD5A1E]/10 text-[#FD5A1E] mb-4">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-[#FD5A1E] mb-1">{stat.value}</div>
            <div className="text-sm text-[#A5ACAF]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/**
 * County section with city listings
 */
interface CountySectionProps {
  countyName: string;
  cities: ServiceCity[];
  isPrimary: boolean;
  description: string;
}

function CountySection({ countyName, cities, isPrimary, description }: CountySectionProps) {
  // Separate incorporated and unincorporated cities
  const incorporatedCities = cities.filter((c) => c.type === 'incorporated');
  const unincorporatedCities = cities.filter((c) => c.type === 'unincorporated');

  return (
    <Section background={isPrimary ? 'gradient' : 'dark'} spacing="xl" id={countyName.toLowerCase().replace(' ', '-')}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-4">
            <span className={`w-3 h-3 rounded-full ${isPrimary ? 'bg-[#FD5A1E]' : 'bg-[#FD5A1E]/60'} mr-2`} />
            <span className="text-[#FD5A1E] font-medium text-sm">
              {isPrimary ? 'Primary Service Area' : 'Full Coverage'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4">
            {countyName}
          </h2>
          <p className="text-lg text-[#A5ACAF] max-w-2xl mx-auto">{description}</p>
        </motion.div>

        {/* Incorporated Cities */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-[#F5F5F5] mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#FD5A1E]" aria-hidden="true" />
            Incorporated Cities ({incorporatedCities.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {incorporatedCities.map((city) => (
              <CityCard key={city.slug} city={city} isHQ={city.slug === 'modesto'} />
            ))}
          </div>
        </div>

        {/* Unincorporated Communities */}
        {unincorporatedCities.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-[#F5F5F5] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FD5A1E]" aria-hidden="true" />
              Unincorporated Communities ({unincorporatedCities.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {unincorporatedCities.map((city) => (
                <CityCard key={city.slug} city={city} isHQ={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

/**
 * Individual city card component
 */
interface CityCardProps {
  city: ServiceCity;
  isHQ: boolean;
}

function CityCard({ city, isHQ }: CityCardProps) {
  return (
    <Link
      href={`/service-areas/${city.slug}`}
      prefetch={true}
      className={`block p-3 rounded-lg border transition-all duration-300 group cursor-pointer relative z-10 ${
        isHQ
          ? 'bg-[#FD5A1E]/10 border-[#FD5A1E]/30 hover:border-[#FD5A1E]'
          : 'bg-[#111111] border-[#333333] hover:border-[#FD5A1E] hover:bg-[#1a1a1a]'
      }`}
    >
      <div className="flex items-center gap-2 pointer-events-none">
        <CheckCircle
          className={`w-4 h-4 flex-shrink-0 ${isHQ ? 'text-[#FD5A1E]' : 'text-[#A5ACAF] group-hover:text-[#FD5A1E]'}`}
          aria-hidden="true"
        />
        <span className={`text-sm ${isHQ ? 'text-[#F5F5F5] font-medium' : 'text-[#A5ACAF] group-hover:text-[#F5F5F5]'}`}>
          {city.name}
          {isHQ && <span className="text-[#FD5A1E] text-xs ml-1">HQ</span>}
        </span>
      </div>
      {city.population && city.population > 50000 && (
        <div className="text-xs text-[#666666] mt-1 ml-6 pointer-events-none">
          Pop. {city.population.toLocaleString()}
        </div>
      )}
    </Link>
  );
}

/**
 * Full service area map section
 */
interface ServiceAreaMapFullProps {
  serviceRadius: number;
}

function ServiceAreaMapFull({ serviceRadius }: ServiceAreaMapFullProps) {
  return (
    <Section background="gradient" spacing="xl" id="map">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4">
            Service Area <span className="text-[#FD5A1E]">Map</span>
          </h2>
          <p className="text-lg text-[#A5ACAF] max-w-2xl mx-auto">
            Based in Modesto, we serve businesses within a {serviceRadius}-mile radius
            throughout the Central Valley.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-[#111111] rounded-xl border border-[#333333] overflow-hidden"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/images/central-california-map.webp"
              alt="AMP Vending service area map covering Central California including Stanislaus and San Joaquin counties"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

            {/* Radial highlight */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 48% 52%, rgba(253, 90, 30, 0.25) 0%, rgba(253, 90, 30, 0.1) 25%, transparent 50%)`
              }}
              aria-hidden="true"
            />

            {/* Headquarters Pin */}
            <div className="absolute top-[52%] left-[48%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute w-32 h-32 bg-[#FD5A1E]/10 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" aria-hidden="true" />
                <div className="absolute w-20 h-20 bg-[#FD5A1E]/20 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-ping" aria-hidden="true" />
                <div className="absolute w-8 h-8 bg-[#FD5A1E] rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 shadow-lg shadow-[#FD5A1E]/50" aria-hidden="true" />

                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#111111]/95 backdrop-blur-sm border border-[#FD5A1E]/50 px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                  <span className="text-[#F5F5F5] text-sm font-semibold">Modesto, CA</span>
                  <span className="text-[#FD5A1E] text-xs ml-2 font-bold">HQ</span>
                </div>
              </div>
            </div>

            {/* Coverage Info */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-[#F5F5F5] text-sm">
                Coverage: {serviceRadius}-mile radius
              </span>
              <span className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-[#F5F5F5] text-sm">
                Central Valley, California
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 p-4 bg-[#0a0a0a]">
            <div className="flex items-center gap-2 text-sm text-[#A5ACAF]">
              <span className="w-4 h-4 rounded-full bg-[#FD5A1E] shadow-sm shadow-[#FD5A1E]/50" />
              <span>Headquarters</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#A5ACAF]">
              <span className="w-4 h-4 rounded-full bg-[#FD5A1E]/30" />
              <span>Service Coverage</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/**
 * CTA section for service areas
 */
function ServiceAreasCTA() {
  return (
    <Section background="dark" spacing="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#FD5A1E]/20 to-transparent rounded-2xl p-8 sm:p-12 border border-[#FD5A1E]/30"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-[#A5ACAF] mb-8 max-w-2xl mx-auto">
          Contact us today for a consultation. We&apos;ll assess your location,
          recommend the best vending solution, and handle everything from installation
          to ongoing maintenance.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <AccessibleButton
            href="/contact"
            variant="cta"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Request a Quote
          </AccessibleButton>
          <AccessibleButton
            href="/services"
            variant="secondary"
            size="lg"
          >
            View Our Services
          </AccessibleButton>
        </div>
      </motion.div>
    </Section>
  );
}

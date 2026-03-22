'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import Section from '@/components/ui/shared/Section';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import AMP_VENDING_BUSINESS_INFO from '@/lib/data/businessData';

/**
 * ServiceAreaMapSection Component
 *
 * Displays a condensed service area overview for the Services page.
 * Links to the full service areas page for detailed information.
 *
 * Shows key cities served and encourages users to check availability.
 */

export default function ServiceAreaMapSection() {
  // Get service areas from business data
  const { serviceArea } = AMP_VENDING_BUSINESS_INFO;

  // Stanislaus County cities (primary service area)
  const stanislausCities = [
    { name: "Modesto", isHQ: true },
    { name: "Turlock", isHQ: false },
    { name: "Ceres", isHQ: false },
    { name: "Riverbank", isHQ: false },
    { name: "Oakdale", isHQ: false },
    { name: "Patterson", isHQ: false },
    { name: "Hughson", isHQ: false },
    { name: "Newman", isHQ: false },
  ];

  // San Joaquin County cities
  const sanJoaquinCities = [
    { name: "Stockton", isHQ: false },
    { name: "Tracy", isHQ: false },
    { name: "Manteca", isHQ: false },
    { name: "Lodi", isHQ: false },
    { name: "Ripon", isHQ: false },
    { name: "Lathrop", isHQ: false },
    { name: "Escalon", isHQ: false },
  ];

  // Counties served
  const counties = [
    "Stanislaus County",
    "San Joaquin County",
  ];

  return (
    <Section
      id="service-area"
      background="gradient"
      spacing="xl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6"
          >
            <MapPin className="w-4 h-4 text-[#FD5A1E] mr-2" aria-hidden="true" />
            <span className="text-[#FD5A1E] font-medium text-sm">Service Coverage</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4"
          >
            Serving the <span className="text-[#FD5A1E]">Central Valley</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-[#A5ACAF] max-w-2xl mx-auto"
          >
            Based in Modesto, we provide premium vending services throughout
            {' '}{counties.join(', ')}
          </motion.p>
        </div>

        {/* Map and cities grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Map visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[#111111] rounded-xl border border-[#333333] overflow-hidden">
              {/* Map image with overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Actual map image */}
                <Image
                  src="/images/central-california-map.webp"
                  alt="Central California service area map showing coverage in Stanislaus and San Joaquin counties"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Dark overlay for better text visibility */}
                <div
                  className="absolute inset-0 bg-black/40"
                  aria-hidden="true"
                />

                {/* Radial gradient to highlight coverage area */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 48% 52%, rgba(253, 90, 30, 0.3) 0%, rgba(253, 90, 30, 0.1) 30%, transparent 60%)`
                  }}
                  aria-hidden="true"
                />

                {/* Center pin for Modesto */}
                <div className="absolute top-[52%] left-[48%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    {/* Pulsing rings */}
                    <div className="absolute w-24 h-24 bg-[#FD5A1E]/10 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" aria-hidden="true" />
                    <div className="absolute w-14 h-14 bg-[#FD5A1E]/25 rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-ping" aria-hidden="true" />
                    <div className="absolute w-6 h-6 bg-[#FD5A1E] rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-pulse shadow-lg shadow-[#FD5A1E]/50" aria-hidden="true" />

                    {/* Label */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#111111]/95 backdrop-blur-sm border border-[#FD5A1E]/50 px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                      <span className="text-[#F5F5F5] text-sm font-semibold">Modesto, CA</span>
                      <span className="text-[#FD5A1E] text-xs ml-2 font-bold">HQ</span>
                    </div>
                  </div>
                </div>

                {/* Coverage radius indicator */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-[#F5F5F5]">
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                    Coverage: {serviceArea.radius} mile radius
                  </span>
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                    Central Valley, CA
                  </span>
                </div>
              </div>

              {/* Map legend */}
              <div className="flex justify-center gap-6 p-4 text-sm text-[#A5ACAF] bg-[#0a0a0a]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FD5A1E] shadow-sm shadow-[#FD5A1E]/50" aria-hidden="true" />
                  <span>Headquarters</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FD5A1E]/30" aria-hidden="true" />
                  <span>Service Area</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cities list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Stanislaus County */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FD5A1E]" />
                Stanislaus County
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {stanislausCities.map((city) => (
                  <div
                    key={city.name}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                      city.isHQ
                        ? 'bg-[#FD5A1E]/10 border-[#FD5A1E]/30'
                        : 'bg-[#111111] border-[#333333] hover:border-[#FD5A1E]/30'
                    }`}
                  >
                    <CheckCircle
                      className={`w-3.5 h-3.5 ${city.isHQ ? 'text-[#FD5A1E]' : 'text-[#A5ACAF]'}`}
                      aria-hidden="true"
                    />
                    <span className={`text-sm ${city.isHQ ? 'text-[#F5F5F5] font-medium' : 'text-[#A5ACAF]'}`}>
                      {city.name}
                      {city.isHQ && <span className="text-[#FD5A1E] text-xs ml-1">HQ</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* San Joaquin County */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FD5A1E]/60" />
                San Joaquin County
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sanJoaquinCities.map((city) => (
                  <div
                    key={city.name}
                    className="flex items-center gap-2 p-2 bg-[#111111] rounded-lg border border-[#333333] hover:border-[#FD5A1E]/30 transition-colors"
                  >
                    <CheckCircle
                      className="w-3.5 h-3.5 text-[#A5ACAF]"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[#A5ACAF]">
                      {city.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[#A5ACAF] text-sm mb-4">
              Plus surrounding communities including Salida, Denair, Empire, Keyes,
              Mountain House, French Camp, and more.
            </p>

            <Link
              href="/service-areas/central-valley"
              className="inline-flex items-center gap-2 text-[#FD5A1E] font-medium hover:gap-3 transition-all duration-300 group"
            >
              View Full Service Area Map
              <ArrowRight
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#FD5A1E]/20 to-transparent rounded-xl p-6 sm:p-8 border border-[#FD5A1E]/30 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-3">
            Not Sure If We Serve Your Area?
          </h3>
          <p className="text-[#A5ACAF] mb-6 max-w-2xl mx-auto">
            Contact us to check service availability for your location.
            We&apos;re continuously expanding our coverage throughout California.
          </p>
          <AccessibleButton
            href="/contact"
            variant="cta"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Check Availability
          </AccessibleButton>
        </motion.div>
      </div>
    </Section>
  );
}

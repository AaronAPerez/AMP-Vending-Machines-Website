'use client';

/**
 * CentralValleyPageClient Component
 *
 * Client component for the Central Valley regional service area page.
 * Features hero, benefits, FAQ, and CTA sections optimized for conversions.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  CheckCircle,
  ArrowRight,
  Building2,
  Truck,
  Shield,
  Clock,
  CreditCard,
  Leaf,
  ChevronDown,
} from 'lucide-react';
import Section from '@/components/ui/shared/Section';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import {
  STANISLAUS_COUNTY_CITIES,
  SAN_JOAQUIN_COUNTY_CITIES,
  getHighPriorityCities,
} from '@/lib/data/comprehensiveServiceAreas';

/**
 * CentralValleyPageClient - Main component for Central Valley page
 */
export default function CentralValleyPageClient() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <CentralValleyHero />

      {/* Why Central Valley Businesses Choose Us */}
      <WhyChooseUsSection />

      {/* Featured Cities */}
      <FeaturedCitiesSection />

      {/* Services Overview */}
      <ServicesOverviewSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CentralValleyCTA />
    </div>
  );
}

/**
 * Hero section for Central Valley page
 */
function CentralValleyHero() {
  return (
    <section className="relative pt-24 pb-20 sm:pt-28 sm:pb-24 overflow-hidden">
      {/* Background with map */}
      <div className="absolute inset-0">
        <Image
          src="/images/central-california-map.webp"
          alt="Central Valley California map"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

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
            <li>
              <Link href="/service-areas" className="hover:text-[#FD5A1E] transition-colors">
                Service Areas
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-[#F5F5F5]">Central Valley</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-full mb-6"
            >
              <MapPin className="w-4 h-4 text-[#FD5A1E] mr-2" aria-hidden="true" />
              <span className="text-[#FD5A1E] font-medium text-sm">
                Serving All of Central California
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6"
            >
              Free Vending Machines for{' '}
              <span className="text-[#FD5A1E]">Central Valley</span> Businesses
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-[#A5ACAF] mb-8"
            >
              Professional vending machine installation, maintenance, and restocking at
              zero cost to your business. Serving Stanislaus County, San Joaquin County,
              and surrounding areas.
            </motion.p>

            {/* Benefits List */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-8"
            >
              {[
                '100% Free Installation & Maintenance',
                'Modern Touchscreen Machines',
                'Cashless Payment Options',
                'Weekly Restocking Service',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FD5A1E] flex-shrink-0" aria-hidden="true" />
                  <span className="text-[#F5F5F5]">{benefit}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <AccessibleButton
                href="/contact"
                variant="cta"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Get Free Machine
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

          {/* Right Column - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#111111] rounded-2xl border border-[#333333] p-8"
          >
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6 text-center">
              Central Valley Coverage
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                <div className="text-3xl font-bold text-[#FD5A1E]">
                  {STANISLAUS_COUNTY_CITIES.length + SAN_JOAQUIN_COUNTY_CITIES.length}+
                </div>
                <div className="text-sm text-[#A5ACAF]">Cities Served</div>
              </div>
              <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                <div className="text-3xl font-bold text-[#FD5A1E]">2</div>
                <div className="text-sm text-[#A5ACAF]">Counties</div>
              </div>
              <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                <div className="text-3xl font-bold text-[#FD5A1E]">60mi</div>
                <div className="text-sm text-[#A5ACAF]">Service Radius</div>
              </div>
              <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                <div className="text-3xl font-bold text-[#FD5A1E]">24/7</div>
                <div className="text-sm text-[#A5ACAF]">Support</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[#A5ACAF] text-sm mb-4">
                Based in Modesto, serving all of Central California
              </p>
              <Link
                href="/service-areas"
                className="text-[#FD5A1E] hover:underline text-sm font-medium inline-flex items-center gap-1"
              >
                View All Cities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Why choose us section
 */
function WhyChooseUsSection() {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Local Service',
      description: 'Headquartered in Modesto with fast response times throughout the Central Valley.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Zero Cost',
      description: 'Free installation, maintenance, repairs, and restocking. No hidden fees ever.',
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Modern Payments',
      description: 'Apple Pay, Google Pay, credit cards, and cash accepted on all machines.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for any issues or questions.',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Any Location',
      description: 'Offices, warehouses, schools, gyms, hotels, and more throughout Central Valley.',
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Energy Efficient',
      description: 'ENERGY STAR certified machines that reduce operating costs.',
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4">
            Why Central Valley Businesses <span className="text-[#FD5A1E]">Choose Us</span>
          </h2>
          <p className="text-lg text-[#A5ACAF] max-w-2xl mx-auto">
            Local expertise, professional service, and zero cost to your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111111] rounded-xl border border-[#333333] p-6 hover:border-[#FD5A1E]/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#FD5A1E]/10 text-[#FD5A1E] mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">{benefit.title}</h3>
              <p className="text-[#A5ACAF] text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/**
 * Featured cities section
 */
function FeaturedCitiesSection() {
  const featuredCities = getHighPriorityCities(0.85).slice(0, 8);

  return (
    <Section background="dark" spacing="xl">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4">
            Featured <span className="text-[#FD5A1E]">Service Areas</span>
          </h2>
          <p className="text-lg text-[#A5ACAF] max-w-2xl mx-auto">
            We serve all major cities throughout the Central Valley. Click any city to learn more.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8 relative z-10">
          {featuredCities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              prefetch={true}
              className="block bg-[#111111] rounded-xl border border-[#333333] p-5 hover:border-[#FD5A1E] hover:bg-[#1a1a1a] transition-all group text-center cursor-pointer relative z-10"
            >
              <h3 className="text-lg font-semibold text-[#F5F5F5] group-hover:text-[#FD5A1E] transition-colors mb-1 pointer-events-none">
                {city.name}
              </h3>
              <p className="text-sm text-[#A5ACAF] pointer-events-none">{city.county} County</p>
              {city.population && (
                <p className="text-xs text-[#666666] mt-2 pointer-events-none">
                  Pop. {city.population.toLocaleString()}
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <AccessibleButton
            href="/service-areas"
            variant="secondary"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            View All Service Areas
          </AccessibleButton>
        </div>
      </div>
    </Section>
  );
}

/**
 * Services overview section
 */
function ServicesOverviewSection() {
  const services = [
    {
      title: 'Snack Vending',
      description: 'Chips, candy, granola bars, nuts, and healthy options',
      image: '/images/machines/amp-premium-touchscreen-vending-machine-bg.webp',
    },
    {
      title: 'Beverage Vending',
      description: 'Sodas, water, energy drinks, juices, and cold coffee',
      image: '/images/machines/refrigerated-vending-machine-blue-refresh-bg.webp',
    },
    {
      title: 'Combo Machines',
      description: 'Snacks and beverages in one convenient machine',
      image: '/images/machines/amp-refrigerated-vending-machine-bg.webp',
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4">
            Vending Solutions for <span className="text-[#FD5A1E]">Every Need</span>
          </h2>
          <p className="text-lg text-[#A5ACAF] max-w-2xl mx-auto">
            Modern machines with touchscreen interfaces and contactless payment options.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111111] rounded-xl border border-[#333333] overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">{service.title}</h3>
                <p className="text-[#A5ACAF]">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <AccessibleButton
            href="/vending-machines"
            variant="secondary"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            View All Machines
          </AccessibleButton>
        </div>
      </div>
    </Section>
  );
}

/**
 * FAQ section with accordion
 */
function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: 'Is vending machine installation really free in the Central Valley?',
      answer: 'Yes! AMP Vending provides completely free installation for qualifying locations throughout the Central Valley. We also cover all maintenance, repairs, and restocking at no cost to your business. Our revenue comes from product sales, not service fees.',
    },
    {
      question: 'What cities in the Central Valley do you serve?',
      answer: 'We serve all cities in Stanislaus and San Joaquin Counties, including Modesto, Stockton, Turlock, Tracy, Manteca, Lodi, Ceres, Riverbank, Oakdale, Patterson, Ripon, Lathrop, Escalon, and many more communities. Our headquarters in Modesto allows us to provide fast service throughout the region.',
    },
    {
      question: 'How quickly can you install a vending machine at my business?',
      answer: 'For most locations in our primary service area, we can complete installation within 1-2 weeks of approval. The process includes a site visit, machine selection, delivery, and professional installation. We work around your schedule to minimize disruption.',
    },
    {
      question: 'What types of businesses qualify for free vending machines?',
      answer: 'We serve a wide range of locations including offices, warehouses, manufacturing facilities, schools, gyms, hotels, apartment complexes, government buildings, and more. Generally, locations with 30+ employees or regular visitors qualify for our free service.',
    },
    {
      question: 'Do your machines accept credit cards and mobile payments?',
      answer: 'Yes! All our modern vending machines feature contactless payment options including Apple Pay, Google Pay, credit cards, and debit cards in addition to cash. This convenience increases satisfaction and usage.',
    },
  ];

  return (
    <Section background="dark" spacing="xl" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4">
            Frequently Asked <span className="text-[#FD5A1E]">Questions</span>
          </h2>
          <p className="text-lg text-[#A5ACAF]">
            Common questions about our Central Valley vending services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#111111] rounded-xl border border-[#333333] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1a1a1a] transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-[#F5F5F5] font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#FD5A1E] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-[#A5ACAF]">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/**
 * CTA section
 */
function CentralValleyCTA() {
  return (
    <Section background="gradient" spacing="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-4">
          Ready to Get a Free Vending Machine?
        </h2>
        <p className="text-lg text-[#A5ACAF] mb-8 max-w-2xl mx-auto">
          Join hundreds of Central Valley businesses enjoying free, professional vending service.
          Contact us today for a no-obligation consultation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <AccessibleButton
            href="/contact"
            variant="cta"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Request Free Machine
          </AccessibleButton>
          <AccessibleButton
            href="tel:+12094035450"
            variant="secondary"
            size="lg"
          >
            Call (209) 403-5450
          </AccessibleButton>
        </div>

        <p className="text-sm text-[#666666]">
          Serving Modesto, Stockton, Turlock, Tracy, Manteca, and all of Central California
        </p>
      </motion.div>
    </Section>
  );
}

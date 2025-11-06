import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateEnhancedLocalBusinessSchema } from '@/lib/seo/local-schema';
import { PhoneButton } from '@/components/ui/PhoneButton';

// Define service areas
const serviceAreas = {
  modesto: {
    name: 'Modesto',
    state: 'California',
    zip: '95354',
    population: '218,000',
    description: 'Premier vending machine services in Modesto, CA',
  },
  stockton: {
    name: 'Stockton',
    state: 'California',
    zip: '95202',
    population: '320,000',
    description: 'Professional vending solutions in Stockton, CA',
  },
  turlock: {
    name: 'Turlock',
    state: 'California',
    zip: '95380',
    population: '73,000',
    description: 'Quality vending machines serving Turlock, CA',
  },
  manteca: {
    name: 'Manteca',
    state: 'California',
    zip: '95336',
    population: '84,000',
    description: 'Top-rated vending machine company in Manteca, CA',
  },
  tracy: {
    name: 'Tracy',
    state: 'California',
    zip: '95376',
    population: '95,000',
    description: 'Advanced vending solutions for Tracy, CA businesses',
  },
} as const;

type CitySlug = keyof typeof serviceAreas;

interface PageProps {
  params: { city: string };
}

/**
 * Generate metadata for city-specific pages
 * Optimized for local SEO rankings
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = serviceAreas[params.city as CitySlug];
  
  if (!city) {
    return {};
  }

  return generatePageMetadata({
    title: `Vending Machines in ${city.name}, CA | Professional Installation & Service`,
    description: `Transform your ${city.name} workplace with premium vending machines. 21.5" touchscreen technology, contactless payments, and full-service maintenance. Serving ${city.name} and Central California.`,
    path: `/service-areas/${params.city}`,
    additionalKeywords: [
      `vending machines ${city.name}`,
      `${city.name} vending services`,
      `commercial vending ${city.name} CA`,
      `office vending ${city.name}`,
      `vending machine company ${city.name}`,
    ],
  });
}

/**
 * Generate static params for all service areas
 */
export function generateStaticParams() {
  return Object.keys(serviceAreas).map((city) => ({
    city,
  }));
}

/**
 * City-specific landing page
 */
export default function CityPage({ params }: PageProps) {
  const city = serviceAreas[params.city as CitySlug];

  if (!city) {
    notFound();
  }

  return (
    <>
      {/* Local business schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...JSON.parse(JSON.stringify(generateEnhancedLocalBusinessSchema())),
          }),
        }}
      />

      <main className="bg-black">
        {/* Hero Section */}
        <section className="relative py-24">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-5xl font-bold text-whitesmoke">
              Premium Vending Machines in {city.name}, {city.state}
            </h1>
            <p className="mb-8 text-xl text-silver">
              Serving {city.population}+ residents with state-of-the-art vending solutions
            </p>
            
            {/* Key benefits specific to city */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-dark-gray p-6">
                <h3 className="mb-2 text-xl font-semibold text-orange">
                  Local Service
                </h3>
                <p className="text-silver">
                  Based in Central California, we provide same-day service to {city.name} businesses.
                </p>
              </div>

              <div className="rounded-lg bg-dark-gray p-6">
                <h3 className="mb-2 text-xl font-semibold text-orange">
                  Touchscreen Technology
                </h3>
                <p className="text-silver">
                  21.5quot; HD touchscreen interfaces with contactless payment options.
                </p>
              </div>

              <div className="rounded-lg bg-dark-gray p-6">
                <h3 className="mb-2 text-xl font-semibold text-orange">
                  Full-Service Support
                </h3>
                <p className="text-silver">
                  Professional installation and maintenance for {city.name} locations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-4xl font-bold text-whitesmoke">
              Why {city.name} Businesses Choose AMP Vending
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-whitesmoke">
                  Serving {city.name} and Surrounding Areas
                </h3>
                <p className="text-silver">
                  We understand the unique needs of {city.name} businesses. From corporate offices 
                  to educational facilities, our vending solutions are designed to enhance your 
                  workplace while providing exceptional value.
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-2xl font-semibold text-whitesmoke">
                  Advanced Technology for Modern Workplaces
                </h3>
                <p className="text-silver">
                  Our 21.5&quot;touchscreen vending machines bring cutting-edge technology to {city.name}. 
                  Features include contactless payment, real-time inventory tracking, and customizable 
                  product selections tailored to your team&apos;s preferences.
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-2xl font-semibold text-whitesmoke">
                  Comprehensive Service Package
                </h3>
                <p className="text-silver">
                  Every {city.name} installation includes professional setup, regular maintenance, 
                  and responsive support. We handle everything from product selection to restocking, 
                  so you can focus on running your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service area map */}
        <section className="py-16 bg-dark-gray">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-4xl font-bold text-whitesmoke">
              We Serve {city.name} and Central California
            </h2>
            <p className="mb-8 text-silver">
              Our service area includes {city.name}, Modesto, Stockton, Turlock, Manteca, Tracy, 
              and surrounding Central California communities.
            </p>
            {/* Add interactive map component here */}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold text-whitesmoke">
              Ready to Upgrade Your {city.name} Workplace?
            </h2>
            <p className="mb-8 text-xl text-silver">
              Contact us today for a free consultation and quote
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/contact"
                className="rounded-lg bg-orange px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-orange/90"
              >
                Get Free Quote
              </a>
              <PhoneButton
                phoneNumber="+12094035450"
                className="rounded-lg border-2 border-orange px-8 py-4 text-lg font-semibold text-orange transition-all hover:bg-orange hover:text-white"
              >
                Call (209) 403-5450
              </PhoneButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/core/Container';
import Text from '@/components/ui/Text';
import Link from 'next/link';
import CTASection from '@/components/landing/CTASection';

const SERVICE_AREAS = {
  modesto: {
    name: 'Modesto',
    description: 'Professional commercial vending machine services in Modesto, CA. Serving offices, schools, and businesses with state-of-the-art touchscreen vending solutions.',
    population: '218,000',
    businesses: '5,000+',
    landmarks: ['Gallo Center for the Arts', 'Modesto Junior College', 'Vintage Faire Mall']
  },
  stockton: {
    name: 'Stockton',
    description: 'Expert vending machine installation and maintenance in Stockton, CA. Providing workplace vending solutions with 24/7 support.',
    population: '320,000',
    businesses: '7,500+',
    landmarks: ['University of the Pacific', 'San Joaquin Delta College', 'Weberstown Mall']
  },
  turlock: {
    name: 'Turlock',
    description: 'Commercial vending machines for Turlock businesses. Free consultation and professional installation with touchscreen technology.',
    population: '73,000',
    businesses: '2,000+',
    landmarks: ['California State University Stanislaus', 'Downtown Turlock', 'Turlock Regional Sports Complex']
  },
  fresno: {
    name: 'Fresno',
    description: 'Premium vending machine services in Fresno, CA. Serving Central California with modern touchscreen vending solutions.',
    population: '545,000',
    businesses: '12,000+',
    landmarks: ['Fresno State University', 'River Park Shopping Center', 'Fashion Fair Mall']
  },
  merced: {
    name: 'Merced',
    description: 'Office vending machines in Merced, CA. Complete installation, maintenance, and restocking services.',
    population: '87,000',
    businesses: '2,500+',
    landmarks: ['UC Merced', 'Merced College', 'Downtown Merced']
  },
  tracy: {
    name: 'Tracy',
    description: 'Workplace vending solutions in Tracy, CA. Modern touchscreen machines with contactless payment options.',
    population: '95,000',
    businesses: '2,800+',
    landmarks: ['Tracy Transit Center', 'West Valley Mall', 'Tracy Community Center']
  },
  manteca: {
    name: 'Manteca',
    description: 'Commercial vending services in Manteca, CA. Reliable vending machine solutions for businesses of all sizes.',
    population: '85,000',
    businesses: '2,300+',
    landmarks: ['Manteca Transit Center', 'Bass Pro Shops', 'Tidewater Bikeway']
  }
};

type ServiceAreaKey = keyof typeof SERVICE_AREAS;

export async function generateStaticParams() {
  return Object.keys(SERVICE_AREAS).map((area) => ({
    area,
  }));
}

export async function generateMetadata({ params }: { params: { area: string } }): Promise<Metadata> {
  const areaData = SERVICE_AREAS[params.area as ServiceAreaKey];
  
  if (!areaData) {
    return {
      title: 'Service Area Not Found | AMP Vending',
    };
  }
  
  return {
    title: `Vending Machines in ${areaData.name}, CA | AMP Vending`,
    description: areaData.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/service-areas/${params.area}`,
    },
    openGraph: {
      title: `Commercial Vending Machines in ${areaData.name}`,
      description: areaData.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/service-areas/${params.area}`,
      siteName: 'AMP Vending',
      type: 'website',
    },
  };
}

export default function ServiceAreaPage({ params }: { params: { area: string } }) {
  const areaData = SERVICE_AREAS[params.area as ServiceAreaKey];
  
  if (!areaData) {
    notFound();
  }
  
  return (
    <div className="bg-[#000000] min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-[#000000]/50 border-b border-[#4d4d4d]" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center text-sm text-[#A5ACAF]">
          <Link href="/" className="hover:text-[#FD5A1E] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/service-areas" className="hover:text-[#FD5A1E] transition-colors">Service Areas</Link>
          <span className="mx-2">/</span>
          <span className="text-[#F5F5F5]">{areaData.name}</span>
        </div>
      </nav>
      
      <div className="py-16">
        <Container size="lg">
          {/* Header */}
          <header className="text-center mb-12">
            <Text variant="h1" className="text-[#F5F5F5] mb-4">
              Vending Machines in {areaData.name}, California
            </Text>
            <Text variant="body" color="muted" className="max-w-3xl mx-auto">
              {areaData.description}
            </Text>
          </header>
          
          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#111111] p-6 rounded-xl border border-[#333333] text-center">
              <Text variant="h2" className="text-[#FD5A1E] mb-2">{areaData.population}</Text>
              <Text variant="body" color="muted">Population</Text>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl border border-[#333333] text-center">
              <Text variant="h2" className="text-[#FD5A1E] mb-2">{areaData.businesses}</Text>
              <Text variant="body" color="muted">Local Businesses</Text>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl border border-[#333333] text-center">
              <Text variant="h2" className="text-[#FD5A1E] mb-2">24/7</Text>
              <Text variant="body" color="muted">Support</Text>
            </div>
          </div>
          
          {/* Services */}
          <section className="mb-16">
            <Text variant="h2" className="text-[#F5F5F5] mb-8 text-center">
              Our Services in {areaData.name}
            </Text>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#111111] p-6 rounded-xl border border-[#333333]">
                <Text variant="h3" className="text-[#FD5A1E] mb-3">Free Installation</Text>
                <Text variant="body" color="muted">
                  Professional installation of touchscreen vending machines at your {areaData.name} location with no upfront costs.
                </Text>
              </div>
              <div className="bg-[#111111] p-6 rounded-xl border border-[#333333]">
                <Text variant="h3" className="text-[#FD5A1E] mb-3">Regular Maintenance</Text>
                <Text variant="body" color="muted">
                  Scheduled maintenance and cleaning to keep your machines running smoothly in {areaData.name}.
                </Text>
              </div>
              <div className="bg-[#111111] p-6 rounded-xl border border-[#333333]">
                <Text variant="h3" className="text-[#FD5A1E] mb-3">Product Restocking</Text>
                <Text variant="body" color="muted">
                  Regular restocking with popular snacks, beverages, and healthy options for your {areaData.name} workplace.
                </Text>
              </div>
              <div className="bg-[#111111] p-6 rounded-xl border border-[#333333]">
                <Text variant="h3" className="text-[#FD5A1E] mb-3">24/7 Support</Text>
                <Text variant="body" color="muted">
                  Round-the-clock technical support for all vending machine issues in {areaData.name}.
                </Text>
              </div>
            </div>
          </section>
          
          {/* Landmarks */}
          <section className="mb-16">
            <Text variant="h2" className="text-[#F5F5F5] mb-6 text-center">
              Serving {areaData.name} Landmarks
            </Text>
            <div className="flex flex-wrap justify-center gap-4">
              {areaData.landmarks.map((landmark, index) => (
                <div key={index} className="bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 px-4 py-2 rounded-lg">
                  <Text variant="body" className="text-[#F5F5F5]">{landmark}</Text>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </div>
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Commercial Vending Machine Services",
            "provider": {
              "@type": "LocalBusiness",
              "name": "AMP Vending",
              "telephone": "(209) 403-5450"
            },
            "areaServed": {
              "@type": "City",
              "name": areaData.name,
              "containedInPlace": {
                "@type": "State",
                "name": "California"
              }
            },
            "description": areaData.description
          })
        }}
      />
    </div>
  );
}
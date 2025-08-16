// components/landing/ServiceAreaSection.tsx - Fixed TypeScript errors

import React from 'react';

interface City {
  name: string;
  isPrimary: boolean;
}

interface ServiceAreaSectionProps {
  className?: string;
}

const serviceCities: City[] = [
  { name: 'Modesto', isPrimary: true },
  { name: 'Stockton', isPrimary: true },
  { name: 'Sacramento', isPrimary: true },
  { name: 'Fresno', isPrimary: true },
  { name: 'San Jose', isPrimary: false },
  { name: 'Oakland', isPrimary: false },
  { name: 'San Francisco', isPrimary: false },
  { name: 'Turlock', isPrimary: false },
  { name: 'Merced', isPrimary: false },
  { name: 'Tracy', isPrimary: false },
  { name: 'Manteca', isPrimary: false },
  { name: 'Lodi', isPrimary: false },
];

export default function ServiceAreaSection({ className = '' }: ServiceAreaSectionProps) {
  // Create columns for city display
  const citiesPerColumn = Math.ceil(serviceCities.length / 3);
  const columns: City[][] = [];
  
  for (let i = 0; i < 3; i++) {
    const columnCities = serviceCities.slice(i * citiesPerColumn, (i + 1) * citiesPerColumn);
    columns.push(columnCities);
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Service Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We proudly serve businesses throughout Central California with premium vending solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {column.map((city) => (
                <div
                  key={city.name}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    city.isPrimary
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-500'
                  }`}
                >
                  {city.name}
                  {city.isPrimary && (
                    <span className="block text-sm opacity-90 mt-1">
                      Primary Service Area
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Don&apos;t see your city? We&apos;re always expanding our service area.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Contact Us About Your Location
          </button>
        </div>
      </div>
    </section>
  );
}

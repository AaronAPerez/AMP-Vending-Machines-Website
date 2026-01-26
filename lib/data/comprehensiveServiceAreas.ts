/**
 * Comprehensive Service Area Coverage
 * Complete list of ALL cities in Stanislaus and San Joaquin Counties
 * Optimized for local SEO targeting
 */

export interface ServiceCity {
  name: string;
  slug: string;
  county: 'Stanislaus' | 'San Joaquin' | 'Merced';
  type: 'incorporated' | 'unincorporated';
  coordinates: {
    lat: number;
    lng: number;
  };
  population?: number;
  priority: number; // SEO priority 0.5-1.0
}

/**
 * STANISLAUS COUNTY - Complete Coverage
 * All incorporated cities and major unincorporated communities
 */
export const STANISLAUS_COUNTY_CITIES: ServiceCity[] = [
  // Incorporated Cities (9 total)
  {
    name: 'Modesto',
    slug: 'modesto',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.6391, lng: -120.9969 },
    population: 218464,
    priority: 1.0, // Highest priority - headquarters location
  },
  {
    name: 'Turlock',
    slug: 'turlock',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.4947, lng: -120.8466 },
    population: 73631,
    priority: 0.9,
  },
  {
    name: 'Ceres',
    slug: 'ceres',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.5949, lng: -120.9577 },
    population: 49302,
    priority: 0.9,
  },
  {
    name: 'Riverbank',
    slug: 'riverbank',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.7360, lng: -120.9355 },
    population: 24623,
    priority: 0.85,
  },
  {
    name: 'Oakdale',
    slug: 'oakdale',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.7666, lng: -120.8470 },
    population: 23181,
    priority: 0.85,
  },
  {
    name: 'Patterson',
    slug: 'patterson',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.4716, lng: -121.1296 },
    population: 23015,
    priority: 0.85,
  },
  {
    name: 'Waterford',
    slug: 'waterford',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.6410, lng: -120.7604 },
    population: 8988,
    priority: 0.8,
  },
  {
    name: 'Hughson',
    slug: 'hughson',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.5971, lng: -120.8660 },
    population: 7545,
    priority: 0.8,
  },
  {
    name: 'Newman',
    slug: 'newman',
    county: 'Stanislaus',
    type: 'incorporated',
    coordinates: { lat: 37.3138, lng: -121.0202 },
    population: 11501,
    priority: 0.8,
  },

  // Unincorporated Communities (Major CDPs)
  {
    name: 'Salida',
    slug: 'salida',
    county: 'Stanislaus',
    type: 'unincorporated',
    coordinates: { lat: 37.7062, lng: -121.0896 },
    population: 14630,
    priority: 0.75,
  },
  {
    name: 'Denair',
    slug: 'denair',
    county: 'Stanislaus',
    type: 'unincorporated',
    coordinates: { lat: 37.5263, lng: -120.7971 },
    population: 5015,
    priority: 0.7,
  },
  {
    name: 'Empire',
    slug: 'empire',
    county: 'Stanislaus',
    type: 'unincorporated',
    coordinates: { lat: 37.6402, lng: -120.9024 },
    population: 4451,
    priority: 0.7,
  },
  {
    name: 'Keyes',
    slug: 'keyes',
    county: 'Stanislaus',
    type: 'unincorporated',
    coordinates: { lat: 37.5569, lng: -120.9155 },
    population: 5738,
    priority: 0.7,
  },
  {
    name: 'Del Rio',
    slug: 'del-rio',
    county: 'Stanislaus',
    type: 'unincorporated',
    coordinates: { lat: 37.7402, lng: -120.9707 },
    population: 1310,
    priority: 0.65,
  },
  {
    name: 'Hickman',
    slug: 'hickman',
    county: 'Stanislaus',
    type: 'unincorporated',
    coordinates: { lat: 37.6219, lng: -120.7010 },
    population: 673,
    priority: 0.6,
  },
  {
    name: 'Knights Ferry',
    slug: 'knights-ferry',
    county: 'Stanislaus',
    type: 'unincorporated',
    coordinates: { lat: 37.8261, lng: -120.6296 },
    population: 36,
    priority: 0.6,
  },
  {
    name: 'La Grange',
    slug: 'la-grange',
    county: 'Stanislaus',
    type: 'unincorporated',
    coordinates: { lat: 37.6666, lng: -120.4585 },
    population: 347,
    priority: 0.6,
  },
];

/**
 * SAN JOAQUIN COUNTY - Complete Coverage
 * All incorporated cities and major unincorporated communities
 */
export const SAN_JOAQUIN_COUNTY_CITIES: ServiceCity[] = [
  // Incorporated Cities (7 total)
  {
    name: 'Stockton',
    slug: 'stockton',
    county: 'San Joaquin',
    type: 'incorporated',
    coordinates: { lat: 37.9577, lng: -121.2908 },
    population: 320554,
    priority: 0.95, // High priority - major metro
  },
  {
    name: 'Tracy',
    slug: 'tracy',
    county: 'San Joaquin',
    type: 'incorporated',
    coordinates: { lat: 37.7396, lng: -121.4252 },
    population: 93000,
    priority: 0.9,
  },
  {
    name: 'Manteca',
    slug: 'manteca',
    county: 'San Joaquin',
    type: 'incorporated',
    coordinates: { lat: 37.7974, lng: -121.2160 },
    population: 83498,
    priority: 0.9,
  },
  {
    name: 'Lodi',
    slug: 'lodi',
    county: 'San Joaquin',
    type: 'incorporated',
    coordinates: { lat: 38.1302, lng: -121.2724 },
    population: 66348,
    priority: 0.9,
  },
  {
    name: 'Ripon',
    slug: 'ripon',
    county: 'San Joaquin',
    type: 'incorporated',
    coordinates: { lat: 37.7416, lng: -121.1244 },
    population: 16049,
    priority: 0.85,
  },
  {
    name: 'Lathrop',
    slug: 'lathrop',
    county: 'San Joaquin',
    type: 'incorporated',
    coordinates: { lat: 37.8227, lng: -121.2766 },
    population: 29296,
    priority: 0.85,
  },
  {
    name: 'Escalon',
    slug: 'escalon',
    county: 'San Joaquin',
    type: 'incorporated',
    coordinates: { lat: 37.7974, lng: -120.9960 },
    population: 7606,
    priority: 0.8,
  },

  // Unincorporated Communities (Major CDPs)
  {
    name: 'Mountain House',
    slug: 'mountain-house',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 37.7819, lng: -121.5394 },
    population: 18924,
    priority: 0.75,
  },
  {
    name: 'French Camp',
    slug: 'french-camp',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 37.8763, lng: -121.2730 },
    population: 3643,
    priority: 0.7,
  },
  {
    name: 'Country Club',
    slug: 'country-club',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 37.9866, lng: -121.2649 },
    population: 9618,
    priority: 0.7,
  },
  {
    name: 'Farmington',
    slug: 'farmington',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 37.9422, lng: -120.9846 },
    population: 277,
    priority: 0.65,
  },
  {
    name: 'Lockeford',
    slug: 'lockeford',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 38.2241, lng: -121.1455 },
    population: 3572,
    priority: 0.65,
  },
  {
    name: 'Thornton',
    slug: 'thornton',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 38.2263, lng: -121.4186 },
    population: 1190,
    priority: 0.6,
  },
  {
    name: 'Victor',
    slug: 'victor',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 38.1866, lng: -121.1980 },
    population: 372,
    priority: 0.6,
  },
  {
    name: 'Woodbridge',
    slug: 'woodbridge',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 38.1569, lng: -121.3016 },
    population: 4000,
    priority: 0.65,
  },
  {
    name: 'Collegeville',
    slug: 'collegeville',
    county: 'San Joaquin',
    type: 'unincorporated',
    coordinates: { lat: 37.9488, lng: -121.2438 },
    population: 400,
    priority: 0.6,
  },
];

/**
 * Adjacent Counties (for broader reach)
 */
export const ADJACENT_COUNTY_CITIES: ServiceCity[] = [
  {
    name: 'Merced',
    slug: 'merced',
    county: 'Merced',
    type: 'incorporated',
    coordinates: { lat: 37.3022, lng: -120.4829 },
    population: 86333,
    priority: 0.8,
  },
];

/**
 * Combined service area - ALL cities across target counties
 */
export const ALL_SERVICE_CITIES: ServiceCity[] = [
  ...STANISLAUS_COUNTY_CITIES,
  ...SAN_JOAQUIN_COUNTY_CITIES,
  ...ADJACENT_COUNTY_CITIES,
];

/**
 * Get cities by county
 */
export function getCitiesByCounty(county: 'Stanislaus' | 'San Joaquin' | 'Merced'): ServiceCity[] {
  return ALL_SERVICE_CITIES.filter(city => city.county === county);
}

/**
 * Get cities by type (incorporated vs unincorporated)
 */
export function getCitiesByType(type: 'incorporated' | 'unincorporated'): ServiceCity[] {
  return ALL_SERVICE_CITIES.filter(city => city.type === type);
}

/**
 * Get high-priority cities for sitemap
 */
export function getHighPriorityCities(minPriority: number = 0.7): ServiceCity[] {
  return ALL_SERVICE_CITIES.filter(city => city.priority >= minPriority).sort(
    (a, b) => b.priority - a.priority
  );
}

/**
 * Get all incorporated cities (main targets)
 */
export function getIncorporatedCities(): ServiceCity[] {
  return ALL_SERVICE_CITIES.filter(city => city.type === 'incorporated');
}

/**
 * Generate city name list for SEO keywords
 */
export function getCityNamesList(): string[] {
  return ALL_SERVICE_CITIES.map(city => city.name);
}

/**
 * Generate city slugs for URL generation
 */
export function getCitySlugs(): string[] {
  return ALL_SERVICE_CITIES.map(city => city.slug);
}

/**
 * Get formatted service area string for metadata
 */
export function getFormattedServiceArea(): string {
  const counties = ['Stanislaus County', 'San Joaquin County'];
  const majorCities = getHighPriorityCities(0.85)
    .slice(0, 5)
    .map(c => c.name);

  return `${majorCities.join(', ')}, ${counties.join(', ')} & Central California`;
}

/**
 * County coverage stats
 */
export const COVERAGE_STATS = {
  stanislausCounty: {
    total: STANISLAUS_COUNTY_CITIES.length,
    incorporated: STANISLAUS_COUNTY_CITIES.filter(c => c.type === 'incorporated').length,
    unincorporated: STANISLAUS_COUNTY_CITIES.filter(c => c.type === 'unincorporated').length,
  },
  sanJoaquinCounty: {
    total: SAN_JOAQUIN_COUNTY_CITIES.length,
    incorporated: SAN_JOAQUIN_COUNTY_CITIES.filter(c => c.type === 'incorporated').length,
    unincorporated: SAN_JOAQUIN_COUNTY_CITIES.filter(c => c.type === 'unincorporated').length,
  },
  overall: {
    total: ALL_SERVICE_CITIES.length,
    incorporated: ALL_SERVICE_CITIES.filter(c => c.type === 'incorporated').length,
    unincorporated: ALL_SERVICE_CITIES.filter(c => c.type === 'unincorporated').length,
  },
} as const;

export default ALL_SERVICE_CITIES;

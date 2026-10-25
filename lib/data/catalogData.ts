/**
 * Catalog / Brochure Content
 *
 * Single source of truth for the /catalog brochure page and the downloadable PDF
 * generated from it (see scripts/generate-catalog-pdf.mjs). To change what the
 * brochure says, edit this file, then re-run `npm run catalog:pdf`.
 *
 * Sources:
 * - Koolmore machines: spec values come from this site's own machine data
 *   (lib/data/vendingMachineData.ts). Photos are AMP's own machines.
 * - XMAI machines: manufacturer specification sheet + product brochure
 *   (catalog-reference/). Manufacturer pricing is intentionally NOT included.
 * - Vendo 721 and the freezer machine: values marked TODO(owner) are unconfirmed
 *   and must be checked against the machine's data plate / spec sheet before the
 *   PDF is sent to prospects.
 * - Product lists: edited by hand for the brochure (they are deliberately separate
 *   from components/products/productCatalog.ts, which drives the live site's
 *   product section).
 *
 * All images are in public/images/catalog/ and are rendered with `unoptimized`
 * so the PDF and print use the full-resolution files.
 */

// ═══════════════════════════════════════════════════════════════════════════
// MACHINES
// ═══════════════════════════════════════════════════════════════════════════

export interface CatalogMachine {
  id: string;
  /** Manufacturer, shown as a small label above the name */
  maker: string;
  name: string;
  /** Short machine-type badge, e.g. "Snacks", "Cold Drinks" */
  type: string;
  tagline: string;
  /** Optional: machines without a photo yet render a branded placeholder panel */
  image?: string;
  /** Optional: version of `image` on a light background, used by the white-background brochure */
  imageLight?: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
  features: string[];
  bestFor: string[];
}

export const catalogMachines: CatalogMachine[] = [
  {
    id: 'koolmore-touchscreen-snack',
    maker: 'Koolmore',
    name: 'Touchscreen Snack Machine',
    type: 'Snacks',
    tagline: 'Our flagship snack machine: a big touchscreen, 50+ selections and every way to pay.',
    image: '/images/catalog/koolmore-touchscreen-snack-vending-machine.jpg',
    imageAlt: 'Koolmore touchscreen snack vending machine fully stocked with chips, candy and cookies',
    specs: [
      { label: 'Selections', value: '50+ snacks & convenience items' },
      { label: 'Display', value: '21.5" HD touchscreen' },
      { label: 'Size (W × D × H)', value: '50" × 30.2" × 76.7"' },
      { label: 'Power', value: '120V / 60Hz standard outlet' },
    ],
    features: [
      'Credit/debit, tap-to-pay, Apple Pay, Google Pay and cash',
      'Adjustable spirals fit everything from candy bars to large chip bags',
      'Cloud inventory tracking so we restock before it runs low',
    ],
    bestFor: ['Offices', 'Warehouses', 'Schools', 'Hospitals', 'Lobbies'],
  },
  {
    id: 'koolmore-refrigerated-combo',
    maker: 'Koolmore',
    name: 'Refrigerated Snack & Drink Combo',
    type: 'Combo',
    tagline: 'Cold drinks, snacks and fresh options in one machine for break rooms with limited space.',
    image: '/images/catalog/koolmore-refrigerated-snack-drink-combo-vending-machine.jpg',
    imageAlt: 'Koolmore refrigerated combo vending machine stocked with chips, cookies, sodas and energy drinks',
    specs: [
      { label: 'Selections', value: '40+ drinks, snacks & fresh items' },
      { label: 'Cooling', value: 'Refrigerated, 35°F – 41°F' },
      { label: 'Size (W × D × H)', value: '40.4" × 31" × 76.7"' },
      { label: 'Power', value: '120V / 60Hz standard outlet' },
    ],
    features: [
      'Card reader, tap-to-pay and cash acceptor',
      'Adjustable shelving for bottles, cans, snacks and fresh food',
      'Remote monitoring so our team sees problems before you do',
    ],
    bestFor: ['Break rooms', 'Clinics', 'Gyms', 'Hotels', 'Offices'],
  },
  {
    id: 'vendo-721',
    maker: 'Vendo',
    name: 'Vendo 721 Cold Drink Machine',
    type: 'Cold Drinks',
    tagline: 'The proven high-volume cold drink workhorse for busy sites.',
    image: '/images/catalog/vendo-721-cold-drink-vending-machine-10-selections.jpg',
    imageAlt: 'Vendo 721 cold drink vending machine with ten bottle and can selections',
    specs: [
      // TODO(owner): capacity, size and weight are from dealer listings of the 721. Confirm against your unit.
      { label: 'Selections', value: '10 cold drink selections' },
      { label: 'Capacity', value: 'Approx. 680 cans or 300 20-oz bottles' },
      { label: 'Size (W × D × H)', value: '39.5" × 35" × 72"' },
      { label: 'Weight', value: 'Approx. 680 lb' },
    ],
    features: [
      'Holds cans and bottles, so fewer refills for high-traffic sites',
      'Cash and card payment',
      'Commercial-grade Vendo cabinet built for years of daily use',
    ],
    bestFor: ['Warehouses', 'Factories', 'Schools', 'Hospitals', 'Gyms'],
  },
  {
    // Specs are from HAHA's US product page (mkt-us.hahavending.com). Temperature range and bottle
    // capacity are intentionally left out: HAHA's page and its dealers disagree on both.
    // TODO(owner): confirm the model number on your unit matches "Freezer 550-AI".
    id: 'haha-freezer-550',
    maker: 'HAHA',
    name: 'Freezer 550 AI Smart Freezer',
    type: 'Frozen',
    tagline: 'AI smart freezer for ice cream, burritos, pizza and other frozen favorites.',
    image: '/images/catalog/haha-freezer-550-ai-smart-vending-freezer.jpg',
    imageLight: '/images/catalog/haha-freezer-550-ai-smart-vending-freezer-white-background.jpg',
    imageAlt: 'HAHA Freezer 550 AI smart vending freezer stocked with frozen pizza, ice cream and frozen meals',
    specs: [
      { label: 'Checkout', value: 'AI vision, cashless' },
      { label: 'Capacity', value: '19.4 cu ft, 6 shelves' },
      { label: 'Size (W × D × H)', value: '27.6" × 35.8" × 80.4"' },
      { label: 'Weight', value: '329.6 lb' },
    ],
    features: [
      'Ice cream, burritos, pizza and more, stored frozen until purchased',
      'AI vision technology with cashless payment: cards, Apple Pay and more',
      'Slim 27.6-inch-wide cabinet that fits tight spaces',
    ],
    bestFor: ['Break rooms', 'Warehouses', 'Factories', 'Hospitals'],
  },
];

// ───────────────────────────────────────────────────────────────────────────
// XMAI AI smart coolers (specs from the XMAI specification sheet and brochure)
// ───────────────────────────────────────────────────────────────────────────

export const xmaiMachines: CatalogMachine[] = [
  {
    id: 'xmai-core-425l',
    maker: 'XMAI',
    name: 'Core 425L',
    type: 'Compact',
    tagline: 'The smallest footprint in the line, ideal for tight spaces.',
    image: '/images/catalog/xmai-core-425l-ai-smart-vending-cooler.jpg',
    imageLight: '/images/catalog/xmai-core-425l-ai-smart-vending-cooler-white-background.jpg',
    imageAlt: 'XMAI Core 425L AI smart vending cooler',
    specs: [
      { label: 'Capacity', value: '425 L, 6 shelves' },
      { label: 'Holds up to', value: '288 cans or 336 bottles' },
      { label: 'Size (W × D × H)', value: '24.4" × 23.6" × 78.9"' },
      { label: 'Weight', value: '198.5 lb' },
    ],
    features: [],
    bestFor: [],
  },
  {
    id: 'xmai-pro-520l',
    maker: 'XMAI',
    name: 'Pro 520L',
    type: 'Mid-size',
    tagline: 'More shelves and capacity in a still-slim cabinet.',
    image: '/images/catalog/xmai-pro-520l-ai-smart-vending-cooler.jpg',
    imageLight: '/images/catalog/xmai-pro-520l-ai-smart-vending-cooler-white-background.jpg',
    imageAlt: 'XMAI Pro 520L AI smart vending cooler',
    specs: [
      { label: 'Capacity', value: '520 L, 7 shelves' },
      { label: 'Holds up to', value: '360 cans or 384 bottles' },
      { label: 'Size (W × D × H)', value: '25.6" × 26.8" × 79.6"' },
      { label: 'Weight', value: '231.5 lb' },
    ],
    features: [],
    bestFor: [],
  },
  {
    id: 'xmai-max-680l',
    maker: 'XMAI',
    name: 'Max 680L',
    type: 'High capacity',
    tagline: 'Our largest single-door cooler for high-traffic sites.',
    image: '/images/catalog/xmai-max-680l-ai-smart-vending-cooler.jpg',
    imageLight: '/images/catalog/xmai-max-680l-ai-smart-vending-cooler-white-background.jpg',
    imageAlt: 'XMAI Max 680L AI smart vending cooler',
    specs: [
      { label: 'Capacity', value: '680 L, 7 shelves' },
      { label: 'Holds up to', value: '450 cans or 528 bottles' },
      { label: 'Size (W × D × H)', value: '31.5" × 26.8" × 79.6"' },
      { label: 'Weight', value: '286.6 lb' },
    ],
    features: [],
    bestFor: [],
  },
];

/** Features common to the whole XMAI line (from the XMAI product brochure) */
export const xmaiSharedFeatures = [
  'AI vision technology monitors the shopping journey to prevent loss and theft',
  'Cashless: credit/debit cards, Apple Pay, Google Pay and Samsung Pay',
  'Remote temperature and brightness control from your phone',
  '24/7 fault monitoring, dual tempered glass and reinforced steel frame',
  'Slim design on heavy-duty casters, fits standard elevators and hallways',
  'Stocks drinks, snacks and fresh food',
];

export const xmaiFootnote =
  'Capacity is for 12-oz cans / 16.9-oz bottles and varies with product size and layout. Specifications per manufacturer and subject to change.';

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════════════════

export interface ProductGroup {
  title: string;
  names: string[];
}

export interface CatalogPhoto {
  src: string;
  alt: string;
  caption: string;
}

export const snackGroups: ProductGroup[] = [
  {
    title: 'Chips',
    names: [
      'Lays Classic',
      'Doritos Nacho Cheese',
      'Doritos Spicy Nacho',
      'Cheetos Crunchy',
      'Doritos Cool Ranch',
      'Lays BBQ',
      'Funyuns Onion Rings',
      'Cheetos Flamin’ Hot',
      'Fritos Chili Cheese',
      'Ruffles Cheddar & Sour Cream',
      'Pringles Original',
      'SunChips Harvest Cheddar',
      'Lays Jalapeño Kettle',
      'Chester’s Fries',
      'Doritos Ranch',
    ],
  },
  {
    title: 'Candy',
    names: [
      'Snickers',
      'Kit Kat',
      '3 Musketeers',
      'M&Ms',
      'Skittles',
      'Skittles Sour',
      'Skittles Tropical',
      'Skittles Wild Berry',
      'Starburst',
      'Twix',
      'Milky Way',
      'Hershey Bar',
      'Butterfinger',
      'Reese’s',
      'Baby Ruth',
      'Almond Joy',
      'Mounds',
      'Sour Patch Kids',
    ],
  },
  {
    title: 'Cookies & Pastries',
    names: [
      'Pop Tarts',
      'Oreo Cookies',
      'Hostess Cupcakes',
      'Mini Donut Packs',
      'Famous Amos Chocolate Chip Cookies',
      'Chips Ahoy!',
      'Nutter Butter',
      'Twinkies',
    ],
  },
  {
    title: 'Nuts & Crackers',
    names: [
      'Ritz Crackers w/ Peanut Butter',
      'Ritz Cheese Bits',
      'Ritz Peanut Butter Bits',
      'Planters Peanuts',
      'Blue Diamond Almonds',
      'Trail Mix',
      'Roasted Cashews',
      'Wonderful Pistachios',
      'Mixed Nuts',
      'Cheese Crackers',
      'Goldfish Crackers',
      'Cheez-It',
      'Wheat Thins',
      'Rold Gold Pretzels',
    ],
  },
  {
    title: 'Protein Bars & Trail Mix',
    names: ['Mountain Trail Mix', 'Nut Bars'],
  },
  {
    title: 'More Snacks',
    names: ['Rice Krispies Treat', 'Fruit Snacks', 'Microwave Popcorn', 'Chex Mix', 'String Cheese'],
  },
  {
    title: 'Healthy Snacks',
    names: [
      'Veggie Chips',
      'Skinny Pop Popcorn',
      'Dried Fruit Mix',
      'Fresh Apple Slices',
      'Hummus & Pretzels',
      'Greek Yogurt',
      'Granola Pack',
      'Rice Cakes',
      'Seaweed Snacks',
      'Fresh Fruit Cup',
      'Protein Shake',
      'Break Snacks',
      'Beef Jerky',
    ],
  },
];

export const drinkGroups: ProductGroup[] = [
  {
    title: 'Sodas, Water & Tea',
    names: [
      'Coca-Cola',
      'Coca-Cola Zero',
      'Diet Coke',
      'Dr Pepper',
      'Mountain Dew',
      'Orange Soda',
      'Sprite',
      '7UP',
      'Pepsi',
      'Cherry Pepsi',
      'Diet Pepsi',
      'Gatorade',
      'Gatorade Zero',
      'Powerade',
      'Dasani Water',
      'Vitaminwater',
      'Minute Maid Lemonade',
      'Lemon Iced Tea',
      'Green Tea Mixed Berry',
      'Apple Juice',
      'Orange Juice',
      'Snapple Kiwi Strawberry',
      'Snapple Raspberry Tea',
      'Snapple Mango',
      'Snapple Peach Tea',
    ],
  },
  {
    title: 'Energy & Coffee Drinks',
    names: [
      'Sugar Free Red Bull',
      'Red Bull',
      'Red Bull Pink Wild Berries',
      'Red Bull Red Watermelon',
      'Red Bull Juneberry',
      'Red Bull Fuji Apple & Ginger',
      'Monster Energy',
      'Monster Zero Ultra',
      'Rockstar Fruit Punch',
      'Celsius',
      'NOS Energy',
      'C4 Energy',
      'Starbucks Frappuccino',
      'Starbucks Double Shot',
    ],
  },
];

/** Fresh and frozen food that our freezer and refrigerated machines can carry */
export const frozenGroup: ProductGroup = {
  title: 'Frozen Foods',
  names: ['Burritos', 'Hot Pockets', 'Ice Cream', 'Eggos', 'Pizza', 'Pizza Bites', 'Tacos'],
};

export const refrigeratedGroup: ProductGroup = {
  title: 'Refrigerated Food',
  names: [
    'Sandwiches',
    'Wraps',
    'Salads',
    'Yogurts',
    'Break Snacks (cheese, raspberries, nuts & crackers)',
    'Protein Bowls',
  ],
};

/** Cover lineup: three of AMP's own machines (the XMAI cooler is added after these in the component) */
/**
 * `objectPosition` is the focal point used when a photo is cropped to fit its cover tile
 * (x% y%). It keeps each machine centered: the touchscreen machine sits against the right
 * edge of its photo and the combo sits left of center, so the default centered crop cut them unevenly.
 */
export const catalogCoverPhotos: { src: string; alt: string; objectPosition?: string }[] = [
  {
    src: '/images/catalog/koolmore-touchscreen-snack-vending-machine.jpg',
    alt: 'Koolmore touchscreen snack vending machine fully stocked with chips, candy and cookies',
    objectPosition: '70% 50%',
  },
  {
    src: '/images/catalog/koolmore-refrigerated-snack-drink-combo-vending-machine.jpg',
    alt: 'Koolmore refrigerated combo vending machine stocked with chips, cookies, sodas and energy drinks',
    objectPosition: '9% 50%',
  },
  {
    src: '/images/catalog/vendo-721-cold-drink-vending-machine-10-selections.jpg',
    alt: 'Vendo 721 cold drink vending machine with ten bottle and can selections',
  },
];

/** Photos of AMP's own stocked machines, cropped for the product pages */
export const snackPhotos: CatalogPhoto[] = [
  {
    src: '/images/catalog/vending-machine-chips-jerky-cheetos-doritos-snacks.jpg',
    alt: 'Stocked machine shelves with Jack Link’s jerky, Cheetos, Doritos, Chester’s Fries, Lays and Funyuns',
    caption: 'Chips, jerky & crunchy snacks',
  },
  {
    src: '/images/catalog/vending-machine-candy-chocolate-skittles-hersheys-snacks.jpg',
    alt: 'Stocked machine shelves with Hershey’s, Skittles, Twix, Reese’s and M&Ms',
    caption: 'Candy & chocolate',
  },
  {
    src: '/images/catalog/vending-machine-cookies-crackers-famous-amos-oreo-ritz-bits.jpg',
    alt: 'Stocked machine shelves with Doritos, Ruffles, Famous Amos cookies, Oreo and Ritz Bits',
    caption: 'Cookies, crackers & more',
  },
];

export const drinkPhotos: CatalogPhoto[] = [
  {
    src: '/images/catalog/vending-machine-soda-bottles-starbucks-monster-drinks.jpg',
    alt: 'Vendo drink machine window showing Red Bull, 7UP, Coca-Cola, Monster, Dr Pepper, Starbucks Frappuccino and Cherry Coke',
    caption: 'Sodas, Starbucks & energy',
  },
  {
    src: '/images/catalog/vending-machine-7up-pepsi-starbucks-frappuccino-bottles.jpg',
    alt: 'Stocked machine shelves with 7UP, Mountain Dew, Starbucks Frappuccino, Pepsi, Coca-Cola and Dr Pepper bottles',
    caption: 'Soda bottles & Starbucks',
  },
  {
    src: '/images/catalog/vending-machine-red-bull-diet-coke-coca-cola-pepsi-drinks.jpg',
    alt: 'Stocked machine shelves with Red Bull, Diet Coke, Coca-Cola, Dr Pepper, Pepsi and 7UP',
    caption: 'Red Bull, Coca-Cola & more',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// MARKETING COPY
// ═══════════════════════════════════════════════════════════════════════════

/** Product categories listed on the cover (a short version of the groups on the product pages) */
export const catalogCoverCategories = [
  'Chips',
  'Candy',
  'Cookies & Pastries',
  'Nuts & Crackers',
  'Protein Bars & Trail Mix',
  'Healthy Snacks',
  'Sodas, Water & Tea',
  'Energy & Coffee Drinks',
  'Frozen Foods',
  'Refrigerated Food',
];

export const catalogLocations = [
  'Offices & corporate campuses',
  'Warehouses & distribution',
  'Manufacturing & factories',
  'Schools & universities',
  'Hospitals & clinics',
  'Hotels & hospitality',
  'Gyms & fitness centers',
  'Government & community buildings',
];

export const catalogServiceArea =
  'Modesto, Stockton, Turlock, Ceres, Riverbank, Oakdale and surrounding Central Valley communities';

/** The brochure comes in two looks: dark (black background) and light (white background, for printing) */
export type CatalogTheme = 'dark' | 'light';

/** Logos: the standard logo has light-gray text (for dark backgrounds); the dark-text one is for white pages */
export const CATALOG_LOGO = {
  dark: '/images/logo/AMP_logo.webp',
  light: '/images/logo/amp-vending-logo-dark-text.png',
} as const;

/** Downloadable PDFs, generated by `npm run catalog:pdf` */
export const CATALOG_PDF_PATHS: Record<CatalogTheme, string> = {
  dark: '/downloads/AMP-Vending-Catalog.pdf',
  light: '/downloads/AMP-Vending-Catalog-White-Background.pdf',
};

/**
 * Product Catalog Data
 *
 * Data for the website's "Customizable Product Selection" section, shown as category
 * lists (like the /catalog brochure) with a small photo for each product that has one.
 *
 * The product LISTS (names and groups) come from lib/data/catalogData.ts, the same
 * file that drives the brochure and its PDFs, so the website and the brochure always
 * agree. Edit the lists there.
 *
 * This file adds the photos: PRODUCT_IMAGES maps a product name to its photo in
 * public/images/products/. Products without an entry are listed by name only; there
 * are no placeholder images. To add a photo, drop the file in that folder and add one
 * line to PRODUCT_IMAGES.
 */

import {
  drinkGroups,
  frozenGroup,
  refrigeratedGroup,
  snackGroups,
  type ProductGroup,
} from '@/lib/data/catalogData';

// ═══════════════════════════════════════════════════════════════════════════
// SECTIONS (one per product group in catalogData.ts)
// ═══════════════════════════════════════════════════════════════════════════

export interface Product {
  name: string;
  /** Photo of the actual product, if we have one */
  image?: string;
}

export interface ProductSectionGroup {
  id: string;
  /** Heading, same wording as the brochure */
  title: string;
  products: Product[];
}

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT PHOTOS
// Keys are the exact product names used in catalogData.ts.
// New photos are crops from AMP's own machines, named for SEO (product + vending machine).
// ═══════════════════════════════════════════════════════════════════════════

const PRODUCT_IMAGES: Record<string, string> = {
  // Chips
  'Lays Classic': '/images/products/lays.webp',
  'Lays BBQ': '/images/products/lays-bbq.webp',
  'Doritos Nacho Cheese': '/images/products/doritos-nacho-cheese-chips-snack-vending-machine.webp',
  'Doritos Spicy Nacho': '/images/products/doritos-spicy-nacho-chips-snack-vending-machine.webp',
  'Doritos Cool Ranch': '/images/products/doritos-cool-ranch.webp',
  'Cheetos Crunchy': '/images/products/cheetos.webp',
  'Cheetos Flamin’ Hot': '/images/products/cheetos-flamin-hot-crunchy-snack-vending-machine.webp',
  'Chester’s Fries': '/images/products/chesters-flamin-hot-fries-snack-vending-machine.webp',
  'Fritos Chili Cheese': '/images/products/fritos-chili-cheese-corn-chips-snack-vending-machine.webp',
  'Funyuns Onion Rings': '/images/products/funyuns-onion-rings-snack-vending-machine.webp',
  'Ruffles Cheddar & Sour Cream':
    '/images/products/ruffles-cheddar-sour-cream-chips-snack-vending-machine.webp',
  'SunChips Harvest Cheddar': '/images/products/sunchips-harvest-cheddar-snack-vending-machine.webp',

  // Candy
  Snickers: '/images/products/snickers.webp',
  'Kit Kat': '/images/products/kitkat.webp',
  '3 Musketeers': '/images/products/3musketeers.webp',
  'M&Ms': '/images/products/mms.webp',
  Skittles: '/images/products/skittles.webp',
  Starburst: '/images/products/starburst.webp',
  Twix: '/images/products/twix.webp',
  'Hershey Bar': '/images/products/hersheys-milk-chocolate-bar-snack-vending-machine.webp',
  'Reese’s': '/images/products/reeses-peanut-butter-cups-snack-vending-machine.webp',
  'Baby Ruth': '/images/products/baby-ruth-candy-bar-snack-vending-machine.webp',
  'Sour Patch Kids': '/images/products/sour-patch-kids-candy-snack-vending-machine.webp',

  // Cookies & pastries
  'Pop Tarts': '/images/products/poptarts.webp',
  'Oreo Cookies': '/images/products/oreos.webp',
  'Famous Amos Chocolate Chip Cookies':
    '/images/products/famous-amos-chocolate-chip-cookies-snack-vending-machine.webp',
  'Chips Ahoy!': '/images/products/chips-ahoy-cookies-snack-vending-machine.webp',

  // Nuts & crackers
  'Ritz Crackers w/ Peanut Butter':
    '/images/products/ritz-peanut-butter-crackers-snack-vending-machine.webp',
  'Ritz Cheese Bits': '/images/products/ritz-cheese-bits-crackers-snack-vending-machine.webp',
  'Planters Peanuts': '/images/products/peanuts.webp',
  'Cheez-It': '/images/products/cheez-it-original-crackers-snack-vending-machine.webp',

  // Healthy snacks
  'Beef Jerky': '/images/products/jack-links-beef-jerky-teriyaki-snack-vending-machine.webp',

  // Sodas, water & tea
  'Coca-Cola': '/images/products/coca-cola-original-bottle-drink-vending-machine.webp',
  'Coca-Cola Zero': '/images/products/coke-zero.webp',
  'Diet Coke': '/images/products/diet-coke.webp',
  'Dr Pepper': '/images/products/drpepper.webp',
  'Mountain Dew': '/images/products/mountaindew.webp',
  'Orange Soda': '/images/products/orangecrush.webp',
  '7UP': '/images/products/7up-lemon-lime-soda-bottle-drink-vending-machine.webp',
  Pepsi: '/images/products/pepsi-soda-bottle-drink-vending-machine.webp',
  'Cherry Pepsi': '/images/products/cherry-pepsi-soda-bottle-drink-vending-machine.webp',
  Gatorade: '/images/products/gatorade-sports-drink-bottle-vending-machine.webp',
  'Dasani Water': '/images/products/dasani-bottled-water-drink-vending-machine.webp',

  // Energy & coffee drinks
  'Red Bull': '/images/products/redbull.webp',
  'Red Bull Pink Wild Berries':
    '/images/products/red-bull-pink-wild-berries-energy-drink-vending-machine.webp',
  'Monster Energy': '/images/products/monster.webp',
  Celsius: '/images/products/celsius-arctic-vibe-energy-drink-vending-machine.webp',
  'Starbucks Frappuccino': '/images/products/starbucks-frappuccino-mocha-drink-vending-machine.webp',
  'Starbucks Double Shot':
    '/images/products/starbucks-double-shot-energy-coffee-drink-vending-machine.webp',
};

// ═══════════════════════════════════════════════════════════════════════════
// BUILD THE SECTIONS
// ═══════════════════════════════════════════════════════════════════════════

const GROUPS: ProductGroup[] = [...snackGroups, ...drinkGroups, frozenGroup, refrigeratedGroup];

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const productSections: ProductSectionGroup[] = GROUPS.map((group) => ({
  id: slugify(group.title),
  title: group.title,
  products: group.names.map((name) => ({ name, image: PRODUCT_IMAGES[name] })),
}));

/** Total number of products listed (used for the "127+ Options" badge) */
export const productCount = productSections.reduce((sum, section) => sum + section.products.length, 0);

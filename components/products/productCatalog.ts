/**
 * Product Catalog Data
 *
 * Centralized product data for the vending machine product section.
 * Separated from components for better maintainability and performance.
 *
 * Image sources: Primarily local images (/images/products/) for reliability.
 * Products without dedicated images use category-appropriate fallbacks.
 */

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

/** Product category types available in the vending machines */
export type ProductCategory = 'chips' | 'candy' | 'protein' | 'pastries' | 'nuts' | 'snacks' | 'beverages' | 'energy' | 'healthy';

/** Product interface defining the structure of each product item */
export interface Product {
    id: string;
    name: string;
    category: 'chips' | 'candy' | 'protein' | 'pastries' | 'nuts' | 'snacks' | 'beverages' | 'energy' | 'healthy';
    image?: string; // Primary image (can be external URL or local path)
    fallbackImage?: string; // Fallback local image if primary fails
    popular?: boolean;
    healthy?: boolean;
    details?: string;
  }


  export const productCatalog: Product[] = [
    // ═══════════════════════════════════════════════════════════════════════════
    // CHIPS - Popular savory snacks
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'lays-classic', name: 'Lays Classic', category: 'chips', image: '/images/products/lays.webp', popular: true },
    { id: 'doritos-nacho', name: 'Doritos Nacho Cheese', category: 'chips', image: '/images/products/doritos-nacho.webp', popular: true },
    { id: 'doritos-spicy', name: 'Doritos Spicy Nacho', category: 'chips', image: '/images/products/doritos-spicy.webp', popular: true },
    { id: 'cheetos', name: 'Cheetos Crunchy', category: 'chips', image: '/images/products/cheetos.webp' },
    { id: 'lays-sourcream', name: 'Lays Sour Cream & Onion', category: 'chips', image: '/images/products/layssourcream.webp' },
    { id: 'doritos-cool-ranch', name: 'Doritos Cool Ranch', category: 'chips', image: '/images/products/doritos-cool-ranch.webp' },
    { id: 'lays-bbq', name: 'Lays BBQ', category: 'chips', image: '/images/products/lays-bbq.webp' },
    { id: 'funyuns', name: 'Funyuns Onion Rings', category: 'chips', image: '/images/products/lays.webp' },
    { id: 'cheetos-flaminhot', name: 'Cheetos Flamin\' Hot', category: 'chips', image: '/images/products/cheetos.webp', popular: true },
    { id: 'fritos', name: 'Fritos Original', category: 'chips', image: '/images/products/doritos-nacho.webp' },
    { id: 'ruffles', name: 'Ruffles Cheddar', category: 'chips', image: '/images/products/lays.webp' },
    { id: 'pringles', name: 'Pringles Original', category: 'chips', image: '/images/products/lays.webp', popular: true },
    { id: 'tostitos', name: 'Tostitos Scoops', category: 'chips', image: '/images/products/doritos-nacho.webp' },
    { id: 'sunchips', name: 'SunChips Harvest Cheddar', category: 'chips', image: '/images/products/lays.webp', healthy: true },
    { id: 'kettle-chips', name: 'Kettle Brand Sea Salt', category: 'chips', image: '/images/products/lays.webp' },

    // ═══════════════════════════════════════════════════════════════════════════
    // CANDY & CHOCOLATE - Sweet treats
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'snickers', name: 'Snickers', category: 'candy', image: '/images/products/snickers.webp', popular: true },
    { id: 'kitkat', name: 'Kit Kat', category: 'candy', image: '/images/products/kitkat.webp' },
    { id: '3musketeers', name: '3 Musketeers', category: 'candy', image: '/images/products/3musketeers.webp' },
    { id: 'mms', name: 'M&Ms', category: 'candy', image: '/images/products/mms.webp', popular: true },
    { id: 'skittles', name: 'Skittles', category: 'candy', image: '/images/products/skittles.webp' },
    { id: 'skittles-sour', name: 'Skittles Sour', category: 'candy', image: '/images/products/skittles-sour.webp' },
    { id: 'starburst', name: 'Starburst', category: 'candy', image: '/images/products/starburst.webp' },
    { id: 'twix', name: 'Twix', category: 'candy', image: '/images/products/twix.webp' },
    { id: 'milkyway', name: 'Milky Way', category: 'candy', image: '/images/products/snickers.webp' },
    { id: 'hershey', name: 'Hershey Bar', category: 'candy', image: '/images/products/kitkat.webp' },
    { id: 'butterfinger', name: 'Butterfinger', category: 'candy', image: '/images/products/snickers.webp' },
    { id: 'reeses', name: 'Reese\'s Peanut Butter Cups', category: 'candy', image: '/images/products/mms.webp', popular: true },
    { id: 'baby-ruth', name: 'Baby Ruth', category: 'candy', image: '/images/products/snickers.webp' },
    { id: 'payday', name: 'PayDay', category: 'candy', image: '/images/products/snickers.webp' },
    { id: 'almond-joy', name: 'Almond Joy', category: 'candy', image: '/images/products/3musketeers.webp' },
    { id: 'mounds', name: 'Mounds', category: 'candy', image: '/images/products/3musketeers.webp' },
    { id: 'sour-patch', name: 'Sour Patch Kids', category: 'candy', image: '/images/products/skittles.webp', popular: true },
    { id: 'swedish-fish', name: 'Swedish Fish', category: 'candy', image: '/images/products/skittles.webp' },
    { id: 'twizzlers', name: 'Twizzlers', category: 'candy', image: '/images/products/starburst.webp' },
    { id: 'lifesavers', name: 'Life Savers Gummies', category: 'candy', image: '/images/products/skittles.webp' },

    // ═══════════════════════════════════════════════════════════════════════════
    // PROTEIN BARS - Fitness and nutrition focused
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'kind-bar', name: 'KIND Bar', category: 'protein', image: '/images/products/peanuts.webp', healthy: true, details: 'Nuts & dark chocolate' },
    { id: 'clif-bar', name: 'Clif Bar', category: 'protein', image: '/images/products/snickers.webp', healthy: true, details: '9g protein per bar' },
    { id: 'rxbar', name: 'RXBAR', category: 'protein', image: '/images/products/peanuts.webp', healthy: true, details: '12g protein, whole ingredients' },
    { id: 'quest-bar', name: 'Quest Bar', category: 'protein', image: '/images/products/snickers.webp', healthy: true, details: '20g protein, low sugar', popular: true },
    { id: 'pure-protein', name: 'Pure Protein Bar', category: 'protein', image: '/images/products/snickers.webp', healthy: true, details: '21g protein per bar' },
    { id: 'nature-valley', name: 'Nature Valley Granola', category: 'protein', image: '/images/products/poptarts.webp', healthy: true },
    { id: 'larabar', name: 'Larabar', category: 'protein', image: '/images/products/peanuts.webp', healthy: true, details: 'Made from fruit & nuts' },
    { id: 'powerbar', name: 'PowerBar', category: 'protein', image: '/images/products/snickers.webp', healthy: true, details: 'Sports nutrition bar' },

    // ═══════════════════════════════════════════════════════════════════════════
    // PASTRIES & COOKIES - Baked goods
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'poptarts', name: 'Pop Tarts', category: 'pastries', image: '/images/products/poptarts.webp', popular: true },
    { id: 'oreos', name: 'Oreo Cookies', category: 'pastries', image: '/images/products/oreos.webp', popular: true },
    { id: 'hostess-cupcakes', name: 'Hostess Cupcakes', category: 'pastries', image: '/images/products/poptarts.webp' },
    { id: 'mini-donuts', name: 'Mini Donut Packs', category: 'pastries', image: '/images/products/poptarts.webp' },
    { id: 'choc-chip-cookies', name: 'Chocolate Chip Cookies', category: 'pastries', image: '/images/products/oreos.webp' },
    { id: 'honeybun', name: 'Honey Bun', category: 'pastries', image: '/images/products/poptarts.webp', popular: true },
    { id: 'little-debbie', name: 'Little Debbie Brownies', category: 'pastries', image: '/images/products/oreos.webp' },
    { id: 'nutrigrain', name: 'Nutri-Grain Bars', category: 'pastries', image: '/images/products/poptarts.webp', healthy: true },
    { id: 'belvita', name: 'BelVita Breakfast Biscuits', category: 'pastries', image: '/images/products/poptarts.webp', healthy: true, details: 'Sustained energy' },
    { id: 'fig-newtons', name: 'Fig Newtons', category: 'pastries', image: '/images/products/oreos.webp' },
    { id: 'chips-ahoy', name: 'Chips Ahoy!', category: 'pastries', image: '/images/products/oreos.webp' },
    { id: 'nutter-butter', name: 'Nutter Butter', category: 'pastries', image: '/images/products/oreos.webp' },

    // ═══════════════════════════════════════════════════════════════════════════
    // NUTS & CRACKERS - Savory and nutritious
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'ritz', name: 'Ritz Crackers w/ Peanut Butter', category: 'nuts', image: '/images/products/ritz.webp' },
    { id: 'planters', name: 'Planters Peanuts', category: 'nuts', image: '/images/products/peanuts.webp' },
    { id: 'blue-diamond', name: 'Blue Diamond Almonds', category: 'nuts', image: '/images/products/peanuts.webp', healthy: true, details: '100 calories per pack' },
    { id: 'trail-mix', name: 'Trail Mix', category: 'nuts', image: '/images/products/peanuts.webp', healthy: true },
    { id: 'cashews', name: 'Roasted Cashews', category: 'nuts', image: '/images/products/peanuts.webp', healthy: true },
    { id: 'pistachios', name: 'Wonderful Pistachios', category: 'nuts', image: '/images/products/peanuts.webp', healthy: true, popular: true },
    { id: 'mixed-nuts', name: 'Mixed Nuts', category: 'nuts', image: '/images/products/peanuts.webp', healthy: true },
    { id: 'cheese-crackers', name: 'Cheese Crackers', category: 'nuts', image: '/images/products/ritz.webp' },
    { id: 'goldfish', name: 'Goldfish Crackers', category: 'nuts', image: '/images/products/ritz.webp' },
    { id: 'cheez-it', name: 'Cheez-It', category: 'nuts', image: '/images/products/ritz.webp', popular: true },
    { id: 'wheat-thins', name: 'Wheat Thins', category: 'nuts', image: '/images/products/ritz.webp', healthy: true },
    { id: 'pretzels', name: 'Rold Gold Pretzels', category: 'nuts', image: '/images/products/ritz.webp' },

    // ═══════════════════════════════════════════════════════════════════════════
    // OTHER SNACKS - Variety of tasty options
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'beef-jerky', name: 'Beef Jerky', category: 'snacks', image: '/images/products/beef-jerky.webp', popular: true, details: 'High protein snack' },
    { id: 'slim-jim', name: 'Slim Jim', category: 'snacks', image: '/images/products/peanuts.webp' },
    { id: 'rice-krispies', name: 'Rice Krispies Treat', category: 'snacks', image: '/images/products/poptarts.webp', popular: true },
    { id: 'fruit-snacks', name: 'Fruit Snacks', category: 'snacks', image: '/images/products/skittles.webp' },
    { id: 'combos', name: 'Combos Pretzel', category: 'snacks', image: '/images/products/ritz.webp' },
    { id: 'popcorn', name: 'Microwave Popcorn', category: 'snacks', image: '/images/products/lays.webp' },
    { id: 'chex-mix', name: 'Chex Mix', category: 'snacks', image: '/images/products/ritz.webp' },
    { id: 'gardetto', name: 'Gardetto\'s Snack Mix', category: 'snacks', image: '/images/products/ritz.webp' },
    { id: 'munchies', name: 'Munchies Snack Mix', category: 'snacks', image: '/images/products/ritz.webp' },
    { id: 'cheese-sticks', name: 'String Cheese', category: 'snacks', image: '/images/products/peanuts.webp', healthy: true },

    // ═══════════════════════════════════════════════════════════════════════════
    // BEVERAGES - Cold drinks and refreshments
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'coke', name: 'Coca-Cola', category: 'beverages', image: '/images/products/coca-cola.webp', popular: true },
    { id: 'coke-zero', name: 'Coca-Cola Zero', category: 'beverages', image: '/images/products/coke-zero.webp', popular: true },
    { id: 'diet-coke', name: 'Diet Coke', category: 'beverages', image: '/images/products/diet-coke.webp', healthy: true },
    { id: 'drpepper', name: 'Dr Pepper', category: 'beverages', image: '/images/products/drpepper.webp' },
    { id: 'mountaindew', name: 'Mountain Dew', category: 'beverages', image: '/images/products/mountaindew.webp', popular: true },
    { id: 'orangecrush', name: 'Orange Crush', category: 'beverages', image: '/images/products/orangecrush.webp', popular: true },
    { id: 'sprite', name: 'Sprite', category: 'beverages', image: '/images/products/coke-zero.webp' },
    { id: 'pepsi', name: 'Pepsi', category: 'beverages', image: '/images/products/drpepper.webp', popular: true },
    { id: 'diet-pepsi', name: 'Diet Pepsi', category: 'beverages', image: '/images/products/diet-coke.webp', healthy: true },
    { id: 'fanta', name: 'Fanta Orange', category: 'beverages', image: '/images/products/orangecrush.webp' },
    { id: 'gatorade', name: 'Gatorade', category: 'beverages', image: '/images/products/mountaindew.webp', popular: true, details: 'Sports hydration' },
    { id: 'gatorade-zero', name: 'Gatorade Zero', category: 'beverages', image: '/images/products/gatorade-zero.webp', healthy: true, details: 'Zero sugar electrolyte drink' },
    { id: 'powerade', name: 'Powerade', category: 'beverages', image: '/images/products/mountaindew.webp', details: 'Electrolyte drink' },
    { id: 'bottled-water', name: 'Dasani Water', category: 'beverages', image: '/images/products/coke-zero.webp', healthy: true },
    { id: 'smartwater', name: 'Smartwater', category: 'beverages', image: '/images/products/coke-zero.webp', healthy: true },
    { id: 'vitamin-water', name: 'Vitaminwater', category: 'beverages', image: '/images/products/orangecrush.webp', healthy: true },
    { id: 'lemonade', name: 'Minute Maid Lemonade', category: 'beverages', image: '/images/products/orangecrush.webp' },
    { id: 'iced-tea', name: 'Gold Peak Iced Tea', category: 'beverages', image: '/images/products/drpepper.webp' },
    { id: 'lemon-ice-tea', name: 'Lemon Iced Tea', category: 'beverages', image: '/images/products/lemon-ice-tea.webp' },
    { id: 'green-tea-mixed-berry', name: 'Green Tea Mixed Berry', category: 'beverages', image: '/images/products/green-tea-mixed-berry.webp', healthy: true },
    { id: 'apple-juice', name: 'Apple Juice', category: 'beverages', image: '/images/products/orangecrush.webp', healthy: true },
    { id: 'orange-juice', name: 'Orange Juice', category: 'beverages', image: '/images/products/orangecrush.webp', healthy: true },

    // ═══════════════════════════════════════════════════════════════════════════
    // ENERGY DRINKS - Boost your energy
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'redbull-sf', name: 'Sugar Free Red Bull', category: 'energy', image: '/images/products/redbull.webp', healthy: true, details: '8.4 oz sugar free' },
    { id: 'redbull', name: 'Red Bull', category: 'energy', image: '/images/products/redbull.webp', details: '12 fl oz', popular: true },
    { id: 'monster', name: 'Monster Energy', category: 'energy', image: '/images/products/monster.webp', popular: true },
    { id: 'monster-zero', name: 'Monster Zero Ultra', category: 'energy', image: '/images/products/monster.webp', healthy: true },
    { id: 'bang', name: 'Bang Energy Drink', category: 'energy', image: '/images/products/monster.webp', popular: true, details: '300mg caffeine' },
    { id: 'rockstar', name: 'Rockstar Fruit Punch', category: 'energy', image: '/images/products/rockstar-fruit-punch.webp' },
    { id: 'celsius', name: 'Celsius', category: 'energy', image: '/images/products/redbull.webp', healthy: true, popular: true, details: 'Fitness drink' },
    { id: 'nos', name: 'NOS Energy', category: 'energy', image: '/images/products/monster.webp' },
    { id: 'reign', name: 'Reign Total Body Fuel', category: 'energy', image: '/images/products/monster.webp', healthy: true, details: 'Zero sugar, BCAAs' },
    { id: 'ghost', name: 'Ghost Energy', category: 'energy', image: '/images/products/monster.webp', details: 'Gaming energy drink' },
    { id: 'c4-energy', name: 'C4 Energy', category: 'energy', image: '/images/products/redbull.webp', healthy: true, details: 'Pre-workout energy' },
    { id: '5-hour-energy', name: '5-Hour Energy', category: 'energy', image: '/images/products/redbull.webp', details: 'Compact energy shot' },
    { id: 'starbucks-frappuccino', name: 'Starbucks Frappuccino', category: 'energy', image: '/images/products/starbucks.webp', popular: true, details: 'Chilled coffee drink' },
    { id: 'starbucks-double-shot', name: 'Starbucks Double Shot', category: 'energy', image: '/images/products/starbucks-double-shot.webp', popular: true, details: 'Espresso & cream' },

    // ═══════════════════════════════════════════════════════════════════════════
    // HEALTHY OPTIONS - Better-for-you choices
    // ═══════════════════════════════════════════════════════════════════════════
    { id: 'baked-lays', name: 'Baked Lays', category: 'healthy', image: '/images/products/lays.webp', healthy: true },
    { id: 'veggie-chips', name: 'Veggie Chips', category: 'healthy', image: '/images/products/lays.webp', healthy: true },
    { id: 'skinny-pop', name: 'Skinny Pop Popcorn', category: 'healthy', image: '/images/products/lays.webp', healthy: true, popular: true },
    { id: 'dried-fruit', name: 'Dried Fruit Mix', category: 'healthy', image: '/images/products/peanuts.webp', healthy: true },
    { id: 'apple-slices', name: 'Fresh Apple Slices', category: 'healthy', image: '/images/products/peanuts.webp', healthy: true },
    { id: 'hummus-pretzels', name: 'Hummus & Pretzels', category: 'healthy', image: '/images/products/ritz.webp', healthy: true },
    { id: 'greek-yogurt', name: 'Greek Yogurt', category: 'healthy', image: '/images/products/peanuts.webp', healthy: true, details: 'High protein' },
    { id: 'granola', name: 'Granola Pack', category: 'healthy', image: '/images/products/peanuts.webp', healthy: true },
    { id: 'rice-cakes', name: 'Rice Cakes', category: 'healthy', image: '/images/products/ritz.webp', healthy: true },
    { id: 'seaweed-snacks', name: 'Seaweed Snacks', category: 'healthy', image: '/images/products/lays.webp', healthy: true },
    { id: 'fruit-cup', name: 'Fresh Fruit Cup', category: 'healthy', image: '/images/products/skittles.webp', healthy: true },
    { id: 'protein-shake', name: 'Protein Shake', category: 'healthy', image: '/images/products/monster.webp', healthy: true, details: '20g protein' }
  ];

  export const productCategories = [
    { id: 'all', label: 'All Products', count: productCatalog.length },
    { id: 'popular', label: 'Popular', count: productCatalog.filter(p => p.popular).length },
    { id: 'healthy', label: 'Healthy Options', count: productCatalog.filter(p => p.healthy).length },
    { id: 'chips', label: 'Chips', count: productCatalog.filter(p => p.category === 'chips').length },
    { id: 'candy', label: 'Candy & Chocolate', count: productCatalog.filter(p => p.category === 'candy').length },
    { id: 'protein', label: 'Protein Bars', count: productCatalog.filter(p => p.category === 'protein').length },
    { id: 'pastries', label: 'Pastries & Cookies', count: productCatalog.filter(p => p.category === 'pastries').length },
    { id: 'nuts', label: 'Nuts & Crackers', count: productCatalog.filter(p => p.category === 'nuts').length },
    { id: 'snacks', label: 'Other Snacks', count: productCatalog.filter(p => p.category === 'snacks').length },
    { id: 'beverages', label: 'Beverages', count: productCatalog.filter(p => p.category === 'beverages').length },
    { id: 'energy', label: 'Energy Drinks', count: productCatalog.filter(p => p.category === 'energy').length }
  ];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get filtered products based on category
 * Used by ProductSection with useMemo for performance optimization
 */
export const getFilteredProducts = (category: string): Product[] => {
  if (category === 'all') return productCatalog;
  if (category === 'popular') return productCatalog.filter(p => p.popular);
  if (category === 'healthy') return productCatalog.filter(p => p.healthy);
  return productCatalog.filter(p => p.category === category);
};
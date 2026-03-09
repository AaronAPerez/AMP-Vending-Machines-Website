import React from 'react'


  /**
   * Full product catalog - Extensive selection of snacks, beverages, and healthy options
   * Additional products can be requested by clients to customize their vending experience
   *
   * Image sources: Primarily local images (/images/products/) for reliability
   * Products without dedicated images use category-appropriate fallbacks
   */

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
    { id: 'beef-jerky', name: 'Beef Jerky', category: 'snacks', image: '/images/products/peanuts.webp', popular: true, details: 'High protein snack' },
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
    { id: 'coke', name: 'Coca-Cola', category: 'beverages', image: '/images/products/coke-zero.webp', popular: true },
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
    { id: 'powerade', name: 'Powerade', category: 'beverages', image: '/images/products/mountaindew.webp', details: 'Electrolyte drink' },
    { id: 'bottled-water', name: 'Dasani Water', category: 'beverages', image: '/images/products/coke-zero.webp', healthy: true },
    { id: 'smartwater', name: 'Smartwater', category: 'beverages', image: '/images/products/coke-zero.webp', healthy: true },
    { id: 'vitamin-water', name: 'Vitaminwater', category: 'beverages', image: '/images/products/orangecrush.webp', healthy: true },
    { id: 'lemonade', name: 'Minute Maid Lemonade', category: 'beverages', image: '/images/products/orangecrush.webp' },
    { id: 'iced-tea', name: 'Gold Peak Iced Tea', category: 'beverages', image: '/images/products/drpepper.webp' },
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
    { id: 'rockstar', name: 'Rockstar Energy', category: 'energy', image: '/images/products/monster.webp' },
    { id: 'celsius', name: 'Celsius', category: 'energy', image: '/images/products/redbull.webp', healthy: true, popular: true, details: 'Fitness drink' },
    { id: 'nos', name: 'NOS Energy', category: 'energy', image: '/images/products/monster.webp' },
    { id: 'reign', name: 'Reign Total Body Fuel', category: 'energy', image: '/images/products/monster.webp', healthy: true, details: 'Zero sugar, BCAAs' },
    { id: 'ghost', name: 'Ghost Energy', category: 'energy', image: '/images/products/monster.webp', details: 'Gaming energy drink' },
    { id: 'c4-energy', name: 'C4 Energy', category: 'energy', image: '/images/products/redbull.webp', healthy: true, details: 'Pre-workout energy' },
    { id: '5-hour-energy', name: '5-Hour Energy', category: 'energy', image: '/images/products/redbull.webp', details: 'Compact energy shot' },

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

//   export const getFilteredProducts = () => {
//     if (activeCategory === 'all') return productCatalog;
//     if (activeCategory === 'popular') return productCatalog.filter(p => p.popular);
//     if (activeCategory === 'healthy') return productCatalog.filter(p => p.healthy);
//     return productCatalog.filter(p => p.category === activeCategory);
//   };

//  export const filteredProducts = getFilteredProducts();
//   const displayProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, PRODUCTS_PER_ROW * INITIAL_ROWS);
//   const hasMoreProducts = filteredProducts.length > PRODUCTS_PER_ROW * INITIAL_ROWS;

//   export const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//     if (isExpanded) {
//       setTimeout(() => {
//         const expandButton = document.getElementById('expand-button');
//         if (expandButton) {
//           expandButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       }, 100);
//     }
//   };




//   return (
//     <Section id="products" background="gradient" spacing="lg">
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
//           <svg className="w-5 h-5 text-[#FD5A1E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//           </svg>
//           <span className="text-[#FD5A1E] font-medium text-sm">{productCatalog.length}+ Options</span>
//         </div>
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
//           Customizable <span className="text-[#FD5A1E]">Product Selection</span>
//         </h2>
//         <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto pb-4">
//           Tailored refreshment options to match your workplace preferences throughout the Central Valley, including San Joaquin County
//         </p>
//       </div>
//       {/* Category Filters */}
//       <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4">
//         <div className="flex flex-nowrap gap-2 justify-start md:justify-center md:flex-wrap">
//           {productCategories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => {
//                 setActiveCategory(category.id);
//                 setIsExpanded(false);
//               }}
//               className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm whitespace-nowrap ${
//                 activeCategory === category.id
//                   ? 'bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors'
//                   : 'bg-[#000000]/60 text-[#F5F5F5] border border-[#a4acac] hover:border-[#FD5A1E] hover:bg-[#FD5A1E]/10'
//               }`}
//               aria-pressed={activeCategory === category.id}
//               aria-label={`Filter by ${category.label}. ${category.count} items.`}
//             >
//               {category.label}
//               <span
//                 className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
//                   activeCategory === category.id
//                     ? 'bg-black/50 text-[#F5F5F5]'
//                     : 'bg-[#FD5A1E]/10 text-[#FD5A1E]'
//                 }`}
//               >
//                 {category.count}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Products Grid */}
//       <ResponsiveGrid cols={{ xs: 2, sm: 3, md: 4, lg: 5 }} gap="gap-4 sm:gap-6">
//         {displayProducts.map((product) => (
//           <BackgroundOverlayCard key={product.id} product={product} />
//         ))}
//       </ResponsiveGrid>

//       {/* Expand/Collapse Button */}
//       {hasMoreProducts && (
//         <div id="expand-button" className="flex justify-center mt-8">
//           <button
//             onClick={toggleExpand}
//             className="group flex items-center gap-2 px-6 py-3 bg-[#4d4d4d]/30 border border-[#a4acac] hover:border-[#FD5A1E] rounded-full transition-all hover:bg-[#FD5A1E]/10"
//             aria-expanded={isExpanded}
//             aria-controls="product-grid"
//           >
//             <span className="text-[#F5F5F5]">
//               {isExpanded
//                 ? 'Show Less'
//                 : `Show More (${filteredProducts.length - displayProducts.length} items)`}
//             </span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`h-5 w-5 text-[#FD5A1E] transition-transform duration-300 ${
//                 isExpanded ? 'rotate-180' : ''
//               }`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>
//         </div>
//       )}

//       {/* Custom Product Request CTA */}
//       <div className="mt-12 relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#FD5A1E]/5 via-[#FD5A1E]/10 to-[#FD5A1E]/5 rounded-2xl" aria-hidden="true" />
//         <div className="relative border border-[#FD5A1E]/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             {/* Icon and Text */}
//             <div className="flex items-start gap-4 flex-1">
//               <div className="shrink-0 w-12 h-12 rounded-full bg-[#FD5A1E]/20 flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-[#FD5A1E]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
//                   Don&apos;t See Your Favorite Product?
//                 </h3>
//                 <p className="text-[#A5ACAF] text-sm sm:text-base max-w-xl">
//                   We customize our vending machines to match your workplace preferences.
//                   Request specific brands, dietary options, or regional favorites — we&apos;ll stock what your team wants.
//                 </p>
//               </div>
//             </div>

//             {/* CTA Button */}
//             <a
//               href="/contact"
//               className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#FD5A1E] text-white font-semibold rounded-full hover:bg-[#e54d15] transition-all shadow-lg hover:shadow-[#FD5A1E]/25 group"
//             >
//               <span>Request Products</span>
//               <svg
//                 className="w-5 h-5 transition-transform group-hover:translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Additional Info Tags */}
//           <div className="mt-6 pt-6 border-t border-[#333333] flex flex-wrap gap-3 justify-center md:justify-start">
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
//               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               Gluten-Free Options
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
//               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               Vegan Selections
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
//               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               Sugar-Free Drinks
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
//               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               Organic Snacks
//             </span>
//             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
//               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//               Local Favorites
//             </span>
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default ProductCatelog
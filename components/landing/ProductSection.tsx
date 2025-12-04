'use client';

import ResponsiveGrid from '@/components/layout/ResponsiveGrid';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import Section from '../ui/shared/Section';


/**
 * Background Overlay Card Component - Inspired by Aceternity
 */
const BackgroundOverlayCard = ({ product }: { product: Product }) => {

  return (
      <div className="relative group h-60 sm:h-72 overflow-hidden rounded-xl shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/products/placeholder.jpg';
          }}
        />
      </div>

      {/* Gradient Overlay - Ensure visibility on all screens */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
        aria-hidden="true"
      />

      {/* Tags */}
      <div className="absolute top-2 left-2 right-2 flex justify-between">
        {product.popular && (
          <div className="px-2 py-1 bg-[#FD5A1E] text-white text-xs rounded-full backdrop-blur-sm">
            Popular
          </div>
        )}
        {product.healthy && (
          <div className="ml-auto px-2 py-1 bg-green-500 text-white text-xs rounded-full backdrop-blur-sm">
            Healthy
          </div>
        )}
      </div>

      {/* Content - Adjusted for better visibility on small screens */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 text-white">
        <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1">{product.name}</h3>
        
        {product.details && (
          <p className="text-xs text-gray-300 italic mb-1 sm:mb-2 line-clamp-2">{product.details}</p>
        )}
        
        {/* Bottom section with category */}
        <div className="relative mt-1 sm:mt-2">
          <div 
            className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-2" 
            aria-hidden="true"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-300 capitalize">{product.category}</p>
          </div>
        </div>
      </div>

      {/* Hover Effect Glow */}
      <div 
        className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" 
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FD5A1E]/20 to-transparent blur-md" />
      </div>
    </div>
  );
};


export interface Product {
  id: string;
  name: string;
  // price: number;
  category: 'chips' | 'candy' | 'protein' | 'pastries' | 'nuts' | 'snacks' | 'beverages' | 'energy' | 'healthy';
  image: string;
  popular?: boolean;
  healthy?: boolean;
  details?: string;
}

/**
 * ProductSection component that displays the vending machine product catalog
 */

/**
 * ProductSection component that displays the vending machine product catalog
 * Updated with modern styling and improved user experience
 */
const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setAnimateCards] = useState(false);

  // Define products per row and initial rows to show
  const PRODUCTS_PER_ROW = 5; // For desktop view
  const INITIAL_ROWS = 2;

  // Reset animation when changing categories
  useEffect(() => {
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  }, [activeCategory]);

  /**
   * Complete product catalog with 50+ products
   */
  const productCatalog: Product[] = [
    // Chips & Savory Snacks ($1.75)
    { id: 'lays-classic', name: 'Lays Classic', category: 'chips', image: '/images/products/lays.jpg', popular: true },
    { id: 'doritos-nacho', name: 'Doritos Nacho Cheese', category: 'chips', image: '/images/products/doritos-nacho-cheese.jpg', popular: true },
    { id: 'cheetos', name: 'Cheetos', category: 'chips', image: '/images/products/cheetos.jpg' },
    { id: 'lays-sour-cream', name: 'Lays Sour Cream & Onion', category: 'chips', image: '/images/products/layssourcream.jpg' },
    // { id: 'fritos-original', name: 'Fritos Original', category: 'chips', image: '/images/products/placeholder.jpg' },
    { id: 'doritos-cool-ranch', name: 'Doritos Cool Ranch', category: 'chips', image: '/images/products/doritos-cool-ranch.jpg' },
    // { id: 'ruffles-cheddar', name: 'Ruffles Cheddar & Sour Cream', category: 'chips', image: '/images/products/placeholder.jpg' },
    { id: 'lays-bbq', name: 'Lays BBQ', category: 'chips', image: '/images/products/lays-bbq.jpg' },
    // { id: 'funyuns', name: 'Funyuns Onion Rings', category: 'chips', image: '/images/products/placeholder.jpg' },
    // { id: 'cheetos-flamin-hot', name: 'Cheetos Flamin Hot', category: 'chips', image: '/images/products/placeholder.jpg', popular: true },

    // Candy & Chocolate ($1.75)
    { id: 'snickers', name: 'Snickers', category: 'candy', image: '/images/products/snickers.jpg', popular: true },
    { id: 'kitkat', name: 'Kit Kat', category: 'candy', image: '/images/products/kit-kat.jpg' },
    { id: 'threemusketeers', name: '3 Musketeers', category: 'candy', image: '/images/products/threemusketeers.jpg' },
    { id: 'mms', name: 'M&Ms', category: 'candy', image: '/images/products/mms.jpg', popular: true },
    { id: 'skittles', name: 'Skittles', category: 'candy', image: '/images/products/skittles.jpg' },
    { id: 'starburst', name: 'Starburst', category: 'candy', image: '/images/products/starburst.jpg' },
    // { id: 'twix', name: 'Twix', category: 'candy', image: '/images/products/placeholder.jpg' },
    // { id: 'milky-way', name: 'Milky Way', category: 'candy', image: '/images/products/placeholder.jpg' },
    // { id: 'hershey', name: 'Hershey Bar', category: 'candy', image: '/images/products/placeholder.jpg' },
    // { id: 'butterfinger', name: 'Butterfinger', category: 'candy', image: '/images/products/placeholder.jpg' },

    // Protein & Energy Bars ($1.75-$2.25)
    // { id: 'kind-bar', name: 'KIND Bar', category: 'protein', image: '/images/products/placeholder.jpg', healthy: true },
    // { id: 'cliff-bar', name: 'Cliff Bar', category: 'protein', image: '/images/products/placeholder.jpg', healthy: true, details: '9g protein per bar' },
    // { id: 'rxbar', name: 'RXBAR', category: 'protein', image: '/images/products/placeholder.jpg', healthy: true, details: 'Whole food protein bar' },
    // { id: 'quest-bar', name: 'Quest Bar', category: 'protein', image: '/images/products/placeholder.jpg', healthy: true, details: '20g protein, low sugar' },
    // { id: 'pure-protein', name: 'Pure Protein Bar', category: 'protein', image: '/images/products/placeholder.jpg', healthy: true, details: '21g protein per bar' },

    // Pastries & Cookies ($1.75-$2.25)
    { id: 'poptarts', name: 'Pop Tarts', category: 'pastries', image: '/images/products/poptarts.jpg', popular: true },
    { id: 'oreos', name: 'Oreo Cookies', category: 'pastries', image: '/images/products/oreo.jpg', popular: true },
    // { id: 'hostess-cupcakes', name: 'Hostess Cupcakes', category: 'pastries', image: '/images/products/placeholder.jpg' },
    // { id: 'donut-packs', name: '6 Mini Donut Packs', category: 'pastries', image: '/images/products/placeholder.jpg' },
    // { id: 'choc-chip-cookies', name: 'Chocolate Chip Cookies', category: 'pastries', image: '/images/products/placeholder.jpg' },
    // { id: 'honey-bun', name: 'Honey Bun', category: 'pastries', image: '/images/products/placeholder.jpg' },

    // Nuts & Crackers ($1.75)
    { id: 'ritz-peanut', name: 'Ritz Crackers w/ Peanut Butter', category: 'nuts', image: '/images/products/ritz.jpg' },
    { id: 'planters', name: 'Planters Peanuts', category: 'nuts', image: '/images/products/planters.jpg' },
    // { id: 'blue-diamond', name: 'Blue Diamond Almonds', category: 'nuts', image: '/images/products/placeholder.jpg', healthy: true, details: '100 calories per pack' },
    // { id: 'trail-mix', name: 'Trail Mix', category: 'nuts', image: '/images/products/placeholder.jpg', healthy: true },
    // { id: 'cashews', name: 'Roasted Cashews', category: 'nuts', image: '/images/products/placeholder.jpg', healthy: true },

    // Other Snacks ($1.75-$2.25)
    // { id: 'beef-jerky', name: 'Beef Jerky', category: 'snacks', image: '/images/products/placeholder.jpg' },
    // { id: 'slim-jim', name: 'Slim Jim', category: 'snacks', image: '/images/products/placeholder.jpg' },
    // { id: 'rice-krispies', name: 'Rice Krispies Treat', category: 'snacks', image: '/images/products/placeholder.jpg' },
    // { id: 'fruit-snacks', name: 'Fruit Snacks', category: 'snacks', image: '/images/products/placeholder.jpg' },

    // Beverages ($2.50)
    { id: 'coca-cola', name: 'Coca-Cola', category: 'beverages', image: '/images/products/coke.jpg', popular: true },
    { id: 'coca-cola-zero', name: 'Coca-Cola Zero', category: 'beverages', image: '/images/products/cocacolazero.jpg', popular: true },
    { id: 'diet-coke', name: 'Diet Coke', category: 'beverages', image: '/images/products/dietcoke.jpg', healthy: true },
    { id: 'dr-pepper', name: 'Dr Pepper', category: 'beverages', image: '/images/products/drpepper.jpg' },
    { id: 'mountain-dew', name: 'Mountain Dew', category: 'beverages', image: '/images/products/mountaindew.jpg', popular: true },
    { id: 'orange-crush', name: 'Orange Crush', category: 'beverages', image: '/images/products/orangecrush.jpg', popular: true },
    { id: 'gatorade', name: 'Gatorade', category: 'beverages', image: '/images/products/gatorade.jpg' },
    { id: 'just-water', name: 'Just Water', category: 'beverages', image: '/images/products/justwater.jpg', healthy: true },
    { id: 'sprite', name: 'Sprite', category: 'beverages', image: '/images/products/Sprite.jpg' },
    { id: 'pepsi', name: 'Pepsi', category: 'beverages', image: '/images/products/pepsi.jpg' },
    // { id: 'diet-pepsi', name: 'Diet Pepsi', category: 'beverages', image: '/images/products/placeholder.jpg' },
    { id: 'fanta', name: 'Fanta Orange', category: 'beverages', image: '/images/products/fanta.jpg' },

    // Energy Drinks ($3.25-$4.00)
    { id: 'red-bull-sf', name: 'Sugar Free Red Bull', category: 'energy', image: '/images/products/redbull-sf.jpg', healthy: true, details: '8.4 oz sugar free' },
    { id: 'red-bull-12oz', name: 'Red Bull', category: 'energy', image: '/images/products/redbull.jpg', details: '12 fl oz sugar free' },
    { id: 'monster', name: 'Monster Energy', category: 'energy', image: '/images/products/monster.jpg', popular: true },
    // { id: 'monster-zero', name: 'Monster Zero Ultra', category: 'energy', image: '/images/products/placeholder.jpg', healthy: true },
    // { id: 'bang', name: 'Bang Energy Drink', category: 'energy', image: '/images/products/placeholder.jpg' },
    // { id: 'rockstar', name: 'Rockstar Energy', category: 'energy', image: '/images/products/placeholder.jpg' },

    // Healthy Options
    // { id: 'baked-lays', name: 'Baked Lays', category: 'healthy', image: '/images/products/placeholder.jpg', healthy: true },
    // { id: 'veggie-chips', name: 'Veggie Chips', category: 'healthy', image: '/images/products/placeholder.jpg', healthy: true },
    // { id: 'skinny-pop', name: 'Skinny Pop Popcorn', category: 'healthy', image: '/images/products/placeholder.jpg', healthy: true },
    // { id: 'dried-fruit', name: 'Dried Fruit Mix', category: 'healthy', image: '/images/products/placeholder.jpg', healthy: true }
  ];

  /**
   * Product categories with labels and actual counts
   */
  const productCategories = [
    { id: 'all', label: 'All Products', count: productCatalog.length },
    { id: 'popular', label: 'Popular', count: productCatalog.filter(p => p.popular).length },
    { id: 'healthy', label: 'Healthy Options', count: productCatalog.filter(p => p.healthy).length },
    { id: 'chips', label: 'Chips', count: productCatalog.filter(p => p.category === 'chips').length },
    { id: 'candy', label: 'Candy & Chocolate', count: productCatalog.filter(p => p.category === 'candy').length },
    { id: 'protein', label: 'Protein Bars', count: productCatalog.filter(p => p.category === 'protein').length },
    { id: 'pastries', label: 'Pastries & Cookies', count: productCatalog.filter(p => p.category === 'pastries').length },
    { id: 'nuts', label: 'Nuts & Crackers', count: productCatalog.filter(p => p.category === 'nuts').length },
    { id: 'beverages', label: 'Beverages', count: productCatalog.filter(p => p.category === 'beverages').length },
    { id: 'energy', label: 'Energy Drinks', count: productCatalog.filter(p => p.category === 'energy').length }
  ];

  /**
   * Filter products based on active category
   */
  const getFilteredProducts = () => {
    if (activeCategory === 'all') return productCatalog;
    if (activeCategory === 'popular') return productCatalog.filter(p => p.popular);
    if (activeCategory === 'healthy') return productCatalog.filter(p => p.healthy);
    return productCatalog.filter(p => p.category === activeCategory);
  };

  const filteredProducts = getFilteredProducts();

  /**
   * Limit products displayed based on expand/collapse state
   */
  const displayProducts = isExpanded
    ? filteredProducts
    : filteredProducts.slice(0, PRODUCTS_PER_ROW * INITIAL_ROWS);

  const hasMoreProducts = filteredProducts.length > PRODUCTS_PER_ROW * INITIAL_ROWS;

  /**
   * Toggle expand/collapse
   */
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    // Scroll to "See More" button position when collapsing
    if (isExpanded) {
      setTimeout(() => {
        const expandButton = document.getElementById('expand-button');
        if (expandButton) {
          expandButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <>
     <Section
          id="products"
          background="gradient"
          spacing="lg"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-[#FD5A1E] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-[#FD5A1E] font-medium text-sm">50+ Options</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
              Customizable <span className="text-[#FD5A1E]">Product Selection</span>
            </h2>

            <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto  pb-4">
              Tailored refreshment options to match your workplace preferences throughout Central California
            </p>
          </div>

      {/* Product Category Filters */}
      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex flex-nowrap gap-2 justify-start md:justify-center md:flex-wrap">
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm whitespace-nowrap ${activeCategory === category.id
                ? 'bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors'
                : 'bg-[#000000]/60 text-[#F5F5F5] border border-[#a4acac] hover:border-[#FD5A1E] hover:bg-[#FD5A1E]/10'
                }`}
              aria-pressed={activeCategory === category.id}
              aria-label={`Filter by ${category.label}. ${category.count} items.`}
            >
              {category.label}
              <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${activeCategory === category.id ? 'bg-black/50 text-[#F5F5f5F5]' : 'bg-[#FD5A1E]/10 text-[#FD5A1E]'
                }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <ResponsiveGrid
        cols={{ xs: 2, sm: 3, md: 4, lg: 5 }}
        gap="gap-4 sm:gap-6"
      >
        {displayProducts.map((product) => (
          <BackgroundOverlayCard key={product.id} product={product} />
        ))}
      </ResponsiveGrid>

      {/* Expand/Collapse Button */}
      {hasMoreProducts && (
        <div id="expand-button" className="flex justify-center mt-8">
          <button
            onClick={toggleExpand}
            className="group flex items-center gap-2 px-6 py-3 bg-[#4d4d4d]/30 border border-[#a4acac] hover:border-[#FD5A1E] rounded-full transition-all hover:bg-[#FD5A1E]/10"
            aria-expanded={isExpanded}
            aria-controls="product-grid"
          >
            <span className="text-[#F5F5F5]">
              {isExpanded ? 'Show Less' : `Show More (${filteredProducts.length - displayProducts.length} items)`}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-[#FD5A1E] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
      </Section>
    </>
  );
};


export default ProductSection;
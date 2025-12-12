'use client';

import ResponsiveGrid from '@/components/layout/ResponsiveGrid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Section from '../ui/shared/Section';

/**
 * Background Overlay Card Component
 */
const BackgroundOverlayCard = ({ product }: { product: Product }) => {
  const [imgError, setImgError] = useState(false);
  const imageSrc = imgError || !product.image ? '/images/placeholder.webp' : product.image;

  return (
    <div className="relative group h-60 sm:h-72 overflow-hidden rounded-xl shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Gradient Overlay */}
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

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 text-white">
        <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1">{product.name}</h3>
        {product.details && (
          <p className="text-xs text-gray-300 italic mb-1 sm:mb-2 line-clamp-2">{product.details}</p>
        )}
        <div className="relative mt-1 sm:mt-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-2" aria-hidden="true" />
          <div className="flex justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-300 capitalize">{product.category}</p>
          </div>
        </div>
      </div>

      {/* Hover Glow */}
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
  category: 'chips' | 'candy' | 'protein' | 'pastries' | 'nuts' | 'snacks' | 'beverages' | 'energy' | 'healthy';
  image?: string;
  popular?: boolean;
  healthy?: boolean;
  details?: string;
}

/**
 * ProductSection component
 */
const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setAnimateCards] = useState(false);

  const PRODUCTS_PER_ROW = 5;
  const INITIAL_ROWS = 2;

  useEffect(() => {
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  }, [activeCategory]);

  /**
   * Full product catalog (62 items)
   */
  const productCatalog: Product[] = [
    // Chips
    { id: 'lays-classic', name: 'Lays Classic', category: 'chips', image: '/images/products/lays.webp', popular: true },
    { id: 'doritos-nacho', name: 'Doritos Nacho Cheese', category: 'chips', image: '/images/products/doritos-nacho.webp', popular: true },
    { id: 'cheetos', name: 'Cheetos', category: 'chips', image: '/images/products/cheetos.webp' },
    { id: 'lays-sourcream', name: 'Lays Sour Cream & Onion', category: 'chips' },
    { id: 'doritos-cool-ranch', name: 'Doritos Cool Ranch', category: 'chips', image: '/images/products/doritos-cool-ranch.webp' },
    // { id: 'ruffles-cheddar', name: 'Ruffles Cheddar & Sour Cream', category: 'chips', image: '/images/products/placeholder.webp' },
    // { id: 'lays-bbq', name: 'Lays BBQ', category: 'chips', image: '/images/products/placeholder.webp' },
    // { id: 'funyuns', name: 'Funyuns Onion Rings', category: 'chips', image: '/images/products/placeholder.webp' },
    // { id: 'cheetos-flaminhot', name: 'Cheetos Flamin Hot', category: 'chips', image: '/images/products/placeholder.webp', popular: true },
    // { id: 'fritos', name: 'Fritos Original', category: 'chips', image: '/images/products/placeholder.webp' },
    // { id: 'lays-classic', name: 'Lays Classic', category: 'chips', image: '/images/products/lays.webp', popular: true },
    // { id: 'doritos-nacho', name: 'Doritos Nacho Cheese', category: 'chips', image: '/images/products/doritos-nacho.webp', popular: true },
    // { id: 'cheetos', name: 'Cheetos', category: 'chips', image: '/images/products/cheetos.webp' },
    // { id: 'lays-sourcream', name: 'Lays Sour Cream & Onion', category: 'chips', image: '/images/products/lays-sourcream.webp' },
    // { id: 'doritos-cool-ranch', name: 'Doritos Cool Ranch', category: 'chips', image: '/images/products/doritos-cool-ranch.webp' },
    // { id: 'ruffles-cheddar', name: 'Ruffles Cheddar & Sour Cream', category: 'chips', image: '/images/products/ruffles-cheddar.webp' },
    // { id: 'lays-bbq', name: 'Lays BBQ', category: 'chips', image: '/images/products/lays-bbq.webp' },
    // { id: 'funyuns', name: 'Funyuns Onion Rings', category: 'chips', image: '/images/products/funyuns.webp' },
    // { id: 'cheetos-flaminhot', name: 'Cheetos Flamin Hot', category: 'chips', image: '/images/products/cheetos-flaminhot.webp', popular: true },
    // { id: 'fritos', name: 'Fritos Original', category: 'chips', image: '/images/products/fritos.webp' },

    // Candy
    { id: 'snickers', name: 'Snickers', category: 'candy', image: '/images/products/snickers.webp', popular: true },
    { id: 'kitkat', name: 'Kit Kat', category: 'candy', image: '/images/products/kitkat.webp' },
    { id: '3musketeers', name: '3 Musketeers', category: 'candy', image: '/images/products/3musketeers.webp' },
    { id: 'mms', name: 'M&Ms', category: 'candy', image: '/images/products/mms.webp', popular: true },
    { id: 'skittles', name: 'Skittles', category: 'candy', image: '/images/products/skittles.webp' },
    { id: 'starburst', name: 'Starburst', category: 'candy', image: '/images/products/starburst.webp' },
    { id: 'twix', name: 'Twix', category: 'candy', image: '/images/products/twix.webp' },
    { id: 'milkyway', name: 'Milky Way', category: 'candy' },
    { id: 'hershey', name: 'Hershey Bar', category: 'candy' },
    { id: 'butterfinger', name: 'Butterfinger', category: 'candy' },
    // { id: 'snickers', name: 'Snickers', category: 'candy', image: '/images/products/snickers.webp', popular: true },
    // { id: 'kitkat', name: 'Kit Kat', category: 'candy', image: '/images/products/kitkat.webp' },
    // { id: '3musketeers', name: '3 Musketeers', category: 'candy', image: '/images/products/3musketeers.webp' },
    // { id: 'mms', name: 'M&Ms', category: 'candy', image: '/images/products/mms.webp', popular: true },
    // { id: 'skittles', name: 'Skittles', category: 'candy', image: '/images/products/skittles.webp' },
    // { id: 'starburst', name: 'Starburst', category: 'candy', image: '/images/products/starburst.webp' },
    // { id: 'twix', name: 'Twix', category: 'candy', image: '/images/products/twix.webp' },
    // { id: 'milkyway', name: 'Milky Way', category: 'candy', image: '/images/products/milkyway.webp' },
    // { id: 'hershey', name: 'Hershey Bar', category: 'candy', image: '/images/products/hershey.webp' },
    // { id: 'butterfinger', name: 'Butterfinger', category: 'candy', image: '/images/products/butterfinger.webp' },

    // Protein Bars
    // { id: 'kind-bar', name: 'KIND Bar', category: 'protein', image: '/images/products/kind-bar.webp', healthy: true },
    // { id: 'clif-bar', name: 'Clif Bar', category: 'protein', image: '/images/products/clif-bar.webp', healthy: true, details: '9g protein per bar' },
    // { id: 'rxbar', name: 'RXBAR', category: 'protein', image: '/images/products/rxbar.webp', healthy: true },
    // { id: 'quest-bar', name: 'Quest Bar', category: 'protein', image: '/images/products/quest-bar.webp', healthy: true, details: '20g protein, low sugar' },
    // { id: 'pure-protein', name: 'Pure Protein Bar', category: 'protein', image: '/images/products/pure-protein.webp', healthy: true, details: '21g protein per bar' },

    // Pastries
    { id: 'poptarts', name: 'Pop Tarts', category: 'pastries', image: '/images/products/poptarts.webp', popular: true },
    { id: 'oreos', name: 'Oreo Cookies', category: 'pastries', image: '/images/products/oreos.webp', popular: true },
    // { id: 'hostess-cupcakes', name: 'Hostess Cupcakes', category: 'pastries', image: '/images/products/hostess-cupcakes.webp' },
    // { id: 'mini-donuts', name: 'Mini Donut Packs', category: 'pastries', image: '/images/products/mini-donuts.webp' },
    // { id: 'choc-chip-cookies', name: 'Chocolate Chip Cookies', category: 'pastries', image: '/images/products/choc-chip-cookies.webp'},
    //       { id: 'honeybun', name: 'Honey Bun', category: 'pastries', image: '/images/products/honeybun.webp' },

    // Nuts & Crackers
    { id: 'ritz', name: 'Ritz Crackers w/ Peanut Butter', category: 'nuts', image: '/images/products/ritz.webp' },
    { id: 'planters', name: 'Planters Peanuts', category: 'nuts', image: '/images/products/peanuts.webp' },
    { id: 'blue-diamond', name: 'Blue Diamond Almonds', category: 'nuts', healthy: true, details: '100 calories per pack' },
    { id: 'trail-mix', name: 'Trail Mix', category: 'nuts', healthy: true },
    { id: 'cashews', name: 'Roasted Cashews', category: 'nuts', healthy: true },
    // { id: 'ritz', name: 'Ritz Crackers w/ Peanut Butter', category: 'nuts', image: '/images/products/ritz.webp' },
    // { id: 'planters', name: 'Planters Peanuts', category: 'nuts', image: '/images/products/planters.webp' },
    // { id: 'blue-diamond', name: 'Blue Diamond Almonds', category: 'nuts', image: '/images/products/blue-diamond.webp', healthy: true, details: '100 calories per pack' },
    // { id: 'trail-mix', name: 'Trail Mix', category: 'nuts', image: '/images/products/trail-mix.webp', healthy: true },
    // { id: 'cashews', name: 'Roasted Cashews', category: 'nuts', image: '/images/products/cashews.webp', healthy: true },

    // Other Snacks
    // { id: 'beef-jerky', name: 'Beef Jerky', category: 'snacks', image: '/images/products/placeholder.webp' },
    // { id: 'slim-jim', name: 'Slim Jim', category: 'snacks', image: '/images/products/placeholder.webp' },
    // { id: 'rice-krispies', name: 'Rice Krispies Treat', category: 'snacks', image: '/images/products/rice-krispies.webp' },
    // { id: 'fruit-snacks', name: 'Fruit Snacks', category: 'snacks', image: '/images/products/placeholder.webp' },
    // { id: 'beef-jerky', name: 'Beef Jerky', category: 'snacks', image: '/images/products/beef-jerky.webp' },
    // { id: 'slim-jim', name: 'Slim Jim', category: 'snacks', image: '/images/products/slim-jim.webp' },
    // { id: 'rice-krispies', name: 'Rice Krispies Treat', category: 'snacks', image: '/images/products/rice-krispies.webp' },
    // { id: 'fruit-snacks', name: 'Fruit Snacks', category: 'snacks', image: '/images/products/fruit-snacks.webp' },

    // Beverages
    { id: 'coke', name: 'Coca-Cola', category: 'beverages', popular: true },
    { id: 'coke-zero', name: 'Coca-Cola Zero', category: 'beverages', image: '/images/products/coke-zero.webp', popular: true },
    { id: 'diet-coke', name: 'Diet Coke', category: 'beverages', image: '/images/products/diet-coke.webp', healthy: true },
    { id: 'drpepper', name: 'Dr Pepper', category: 'beverages', image: '/images/products/drpepper.webp' },
    { id: 'mountaindew', name: 'Mountain Dew', category: 'beverages', image: '/images/products/mountaindew.webp', popular: true },
    { id: 'orangecrush', name: 'Orange Crush', category: 'beverages', image: '/images/products/orangecrush.webp', popular: true },
    // { id: 'gatorade', name: 'Gatorade', category: 'beverages', image: '/images/products/gatorade.webp' },
    // { id: 'just-water', name: 'Just Water', category: 'beverages', image: '/images/products/just-water.webp', healthy: true },
    // { id: 'sprite', name: 'Sprite', category: 'beverages', image: '/images/products/sprite.webp' },
    // { id: 'pepsi', name: 'Pepsi', category: 'beverages', image: '/images/products/pepsi.webp' },
    // { id: 'diet-pepsi', name: 'Diet Pepsi', category: 'beverages', image: '/images/products/diet-pepsi.webp', healthy: true },
    // { id: 'fanta', name: 'Fanta Orange', category: 'beverages', image: '/images/products/fanta.webp' },
    // { id: 'coke', name: 'Coca-Cola', category: 'beverages', image: '/images/products/coke.webp', popular: true },
    // { id: 'coke-zero', name: 'Coca-Cola Zero', category: 'beverages', image: '/images/products/coke-zero.webp', popular: true },
    // { id: 'diet-coke', name: 'Diet Coke', category: 'beverages', image: '/images/products/diet-coke.webp', healthy: true },
    // { id: 'drpepper', name: 'Dr Pepper', category: 'beverages', image: '/images/products/drpepper.webp' },
    // { id: 'mountaindew', name: 'Mountain Dew', category: 'beverages', image: '/images/products/mountaindew.webp', popular: true },
    // { id: 'orangecrush', name: 'Orange Crush', category: 'beverages', image: '/images/products/orangecrush.webp', popular: true },
    // { id: 'gatorade', name: 'Gatorade', category: 'beverages', image: '/images/products/gatorade.webp' },
    // { id: 'just-water', name: 'Just Water', category: 'beverages', image: '/images/products/just-water.webp', healthy: true },
    // { id: 'sprite', name: 'Sprite', category: 'beverages', image: '/images/products/sprite.webp' },
    // { id: 'pepsi', name: 'Pepsi', category: 'beverages', image: '/images/products/pepsi.webp' },
    // { id: 'diet-pepsi', name: 'Diet Pepsi', category: 'beverages', image: '/images/products/diet-pepsi.webp', healthy: true },
    // { id: 'fanta', name: 'Fanta Orange', category: 'beverages', image: '/images/products/fanta.webp' },

    // Energy Drinks
    { id: 'redbull-sf', name: 'Sugar Free Red Bull', category: 'energy', healthy: true, details: '8.4 oz sugar free' },
    { id: 'redbull', name: 'Red Bull', category: 'energy', image: '/images/products/redbull.webp', details: '12 fl oz' },
    { id: 'monster', name: 'Monster Energy', category: 'energy', image: '/images/products/monster.webp', popular: true },
    { id: 'monster-zero', name: 'Monster Zero Ultra', category: 'energy', healthy: true },
    { id: 'bang', name: 'Bang Energy Drink', category: 'energy' },
    { id: 'rockstar', name: 'Rockstar Energy', category: 'energy' },
    // { id: 'redbull-sf', name: 'Sugar Free Red Bull', category: 'energy', image: '/images/products/redbull-sf.webp', healthy: true, details: '8.4 oz sugar free' },
    // { id: 'redbull', name: 'Red Bull', category: 'energy', image: '/images/products/redbull.webp', details: '12 fl oz' },
    // { id: 'monster', name: 'Monster Energy', category: 'energy', image: '/images/products/monster.webp', popular: true },
    // { id: 'monster-zero', name: 'Monster Zero Ultra', category: 'energy', image: '/images/products/monster-zero.webp', healthy: true },
    // { id: 'bang', name: 'Bang Energy Drink', category: 'energy', image: '/images/products/bang.webp' },
    // { id: 'rockstar', name: 'Rockstar Energy', category: 'energy', image: '/images/products/rockstar.webp' },

    // Healthy Options
    { id: 'baked-lays', name: 'Baked Lays', category: 'healthy', healthy: true },
    { id: 'veggie-chips', name: 'Veggie Chips', category: 'healthy', healthy: true },
    { id: 'skinny-pop', name: 'Skinny Pop Popcorn', category: 'healthy', healthy: true },
    { id: 'dried-fruit', name: 'Dried Fruit Mix', category: 'healthy', healthy: true }
  ];

  const productCategories = [
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

  const getFilteredProducts = () => {
    if (activeCategory === 'all') return productCatalog;
    if (activeCategory === 'popular') return productCatalog.filter(p => p.popular);
    if (activeCategory === 'healthy') return productCatalog.filter(p => p.healthy);
    return productCatalog.filter(p => p.category === activeCategory);
  };

  const filteredProducts = getFilteredProducts();
  const displayProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, PRODUCTS_PER_ROW * INITIAL_ROWS);
  const hasMoreProducts = filteredProducts.length > PRODUCTS_PER_ROW * INITIAL_ROWS;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
    <Section id="products" background="gradient" spacing="lg">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
          <svg className="w-5 h-5 text-[#FD5A1E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[#FD5A1E] font-medium text-sm">{productCatalog.length}+ Options</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
          Customizable <span className="text-[#FD5A1E]">Product Selection</span>
        </h2>
        <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto pb-4">
          Tailored refreshment options to match your workplace preferences throughout Central California
        </p>
      </div>
      {/* Category Filters */}
      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex flex-nowrap gap-2 justify-start md:justify-center md:flex-wrap">
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-[#FD5A1E] text-[#000000] font-medium rounded-full shadow-lg hover:bg-[#F5F5F5] hover:text-[#000000] transition-colors'
                  : 'bg-[#000000]/60 text-[#F5F5F5] border border-[#a4acac] hover:border-[#FD5A1E] hover:bg-[#FD5A1E]/10'
              }`}
              aria-pressed={activeCategory === category.id}
              aria-label={`Filter by ${category.label}. ${category.count} items.`}
            >
              {category.label}
              <span
                className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                  activeCategory === category.id
                    ? 'bg-black/50 text-[#F5F5F5]'
                    : 'bg-[#FD5A1E]/10 text-[#FD5A1E]'
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <ResponsiveGrid cols={{ xs: 2, sm: 3, md: 4, lg: 5 }} gap="gap-4 sm:gap-6">
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
              {isExpanded
                ? 'Show Less'
                : `Show More (${filteredProducts.length - displayProducts.length} items)`}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-[#FD5A1E] transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
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
  );
};

export default ProductSection;

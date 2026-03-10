'use client';

import ResponsiveGrid from '@/components/layout/ResponsiveGrid';
import { useCallback, useMemo, useState } from 'react';
import Section from '../ui/shared/Section';
import BackgroundOverlayCard from '../products/BackgroundOverlayCard';
import { productCatalog, productCategories, getFilteredProducts } from '../products/productCatalog';

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const PRODUCTS_PER_ROW = 5;
const INITIAL_ROWS = 2;

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ProductSection - Displays filterable product catalog with expandable grid
 *
 * Performance optimizations:
 * - useMemo for filtered products (prevents recalculation on unrelated state changes)
 * - useCallback for event handlers (stable references for child components)
 * - React.memo on BackgroundOverlayCard (prevents re-renders when product data unchanged)
 * - Data separated to productCatelog.ts (not recreated on each render)
 */
const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize filtered products - only recalculates when category changes
  const filteredProducts = useMemo(
    () => getFilteredProducts(activeCategory),
    [activeCategory]
  );

  // Memoize display products - recalculates when filtered products or expanded state changes
  const displayProducts = useMemo(
    () => isExpanded ? filteredProducts : filteredProducts.slice(0, PRODUCTS_PER_ROW * INITIAL_ROWS),
    [filteredProducts, isExpanded]
  );

  // Memoize whether there are more products to show
  const hasMoreProducts = useMemo(
    () => filteredProducts.length > PRODUCTS_PER_ROW * INITIAL_ROWS,
    [filteredProducts]
  );

  // Memoized expand/collapse handler
  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => {
      if (prev) {
        // Scrolling back to button when collapsing
        setTimeout(() => {
          const expandButton = document.getElementById('expand-button');
          if (expandButton) {
            expandButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
      return !prev;
    });
  }, []);

  // Memoized category change handler
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setIsExpanded(false);
  }, []);

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
          Tailored refreshment options to match your workplace preferences throughout the Central Valley, including San Joaquin County
        </p>
      </div>
      {/* Category Filters */}
      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex flex-nowrap gap-2 justify-start md:justify-center md:flex-wrap">
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm whitespace-nowrap ${
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

      {/* Custom Product Request CTA */}
      <div className="mt-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FD5A1E]/5 via-[#FD5A1E]/10 to-[#FD5A1E]/5 rounded-2xl" aria-hidden="true" />
        <div className="relative border border-[#FD5A1E]/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Icon and Text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="shrink-0 w-12 h-12 rounded-full bg-[#FD5A1E]/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#FD5A1E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
                  Don&apos;t See Your Favorite Product?
                </h3>
                <p className="text-[#A5ACAF] text-sm sm:text-base max-w-xl">
                  We customize our vending machines to match your workplace preferences.
                  Request specific brands, dietary options, or regional favorites — we&apos;ll stock what your team wants.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#FD5A1E] text-white font-semibold rounded-full hover:bg-[#e54d15] transition-all shadow-lg hover:shadow-[#FD5A1E]/25 group"
            >
              <span>Request Products</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Additional Info Tags */}
          <div className="mt-6 pt-6 border-t border-[#333333] flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Gluten-Free Options
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Vegan Selections
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sugar-Free Drinks
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Organic Snacks
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-[#A5ACAF]">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Local Favorites
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductSection;

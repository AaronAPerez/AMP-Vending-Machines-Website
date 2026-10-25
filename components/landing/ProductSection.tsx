import Image from 'next/image';
import Section from '../ui/shared/Section';
import { productCount, productSections } from '../products/productCatalog';

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ProductSection - The product lineup, one block per category (same layout as the
 * /catalog brochure): a heading, small photos of the products we have pictures of,
 * and the full list of product names.
 *
 * Products without a photo are listed by name only (no placeholder images).
 * Content comes from components/products/productCatalog.ts, which reads the lists in
 * lib/data/catalogData.ts. This is a server component: there is nothing interactive.
 */
const ProductSection = () => {
  return (
    <Section id="products" background="gradient" spacing="lg">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
          <svg className="w-5 h-5 text-[#FD5A1E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[#FD5A1E] font-medium text-sm">{productCount}+ Options</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
          Customizable <span className="text-[#FD5A1E]">Product Selection</span>
        </h2>
        <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto pb-4">
          Tailored refreshment options to match your workplace preferences throughout the Central Valley, including San Joaquin County
        </p>
      </div>

      {/* Category blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        {productSections.map((section) => {
          const withPhotos = section.products.filter((product) => product.image);
          return (
            <section key={section.id} aria-labelledby={`products-${section.id}`}>
              <h3
                id={`products-${section.id}`}
                className="mb-3 border-b border-[#FD5A1E]/60 pb-1.5 text-sm font-bold uppercase tracking-wide text-[#FD5A1E]"
              >
                {section.title}
              </h3>

              {/* Small photos (only the products we have pictures of) */}
              {withPhotos.length > 0 && (
                <ul className="mb-3 flex flex-wrap gap-2">
                  {withPhotos.map((product) => (
                    <li key={product.name} className="w-16 sm:w-[72px]">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#1a1a1a] ring-1 ring-white/10">
                        <Image
                          src={product.image as string}
                          alt={`${product.name} in an AMP Vending machine`}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-sm leading-relaxed text-[#d1d5db]">
                {section.products.map((product) => product.name).join(' • ')}
              </p>
            </section>
          );
        })}
      </div>

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

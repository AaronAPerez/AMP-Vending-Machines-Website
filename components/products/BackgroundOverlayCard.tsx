import { useState } from 'react'
import Image from 'next/image';
import { Product } from './productCatelog';


/**
 * Background Overlay Card Component
 * Supports external URLs with local fallback images
 */
const BackgroundOverlayCard = ({ product }: { product: Product }) => {
  const [imgError, setImgError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Image priority: primary image -> fallback image -> generic placeholder
  const getImageSrc = () => {
    if (!product.image) return '/images/placeholder.webp';
    if (imgError && product.fallbackImage && !useFallback) return product.fallbackImage;
    if (imgError || useFallback) return '/images/placeholder.webp';
    return product.image;
  };

  const imageSrc = getImageSrc();

  const handleImageError = () => {
    if (!imgError) {
      // First error: try fallback image
      setImgError(true);
    } else if (product.fallbackImage && !useFallback) {
      // Fallback also failed: use placeholder
      setUseFallback(true);
    }
  };

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
          onError={handleImageError}
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


export default BackgroundOverlayCard
'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

// Product images with descriptive alt text for SEO and accessibility
// First image is the LCP element and loads with highest priority
const productImages = [
    { src: '/images/products/drpepper.webp', alt: 'Dr Pepper soda can' },
    { src: '/images/products/doritos-nacho.webp', alt: 'Doritos Nacho Cheese chips bag' },
    { src: '/images/products/redbull.webp', alt: 'Red Bull energy drink can' },
    { src: '/images/products/snickers.webp', alt: 'Snickers chocolate bar' },
    { src: '/images/products/cheetos.webp', alt: 'Cheetos crunchy snack bag' },
    { src: '/images/products/skittles.webp', alt: 'Skittles candy pack' },
    { src: '/images/products/kitkat.webp', alt: 'Kit Kat chocolate wafer bar' },
    { src: '/images/products/monster.webp', alt: 'Monster Energy drink can' },
    { src: '/images/products/poptarts.webp', alt: 'Pop-Tarts toaster pastries box' },
    { src: '/images/products/starburst.webp', alt: 'Starburst fruit chews candy' },
    { src: '/images/products/mms.webp', alt: 'M&Ms chocolate candies pack' },
    { src: '/images/products/orangecrush.webp', alt: 'Orange Crush soda bottle' },
];

export const BackgroundImages = () => {
    const [scrollY, setScrollY] = useState(0);

    // Optimized scroll handler with passive listener
    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div
            className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 z-10"
            aria-hidden="true"
        >
            {productImages.map((product, index) => {
                // Calculate parallax effect only when scrolled
                const offset = scrollY > 0 ? Math.min(scrollY * 0.1 * (index % 6 + 1) * 0.2, 100) : 0;
                const opacity = scrollY > 0 ? Math.max(0.3, 1 - scrollY * 0.001) : 1;

                // First image (index 0) is LCP - use priority + fetchPriority="high"
                // Images 1-5 are above-the-fold - use priority but not fetchPriority
                // Images 6+ are below-the-fold - lazy load them
                const isLCPImage = index === 0;
                const isAboveFold = index < 6;

                return (
                    <div
                        key={index}
                        className="relative rounded-lg overflow-hidden w-full h-40 sm:h-48"
                        style={{
                            transform: offset > 0 ? `translateY(${offset}px)` : undefined,
                            opacity,
                        }}
                    >
                        <Image
                            src={product.src}
                            alt={product.alt}
                            fill
                            sizes="(max-width: 640px) 33vw, 25vw"
                            className="object-cover"
                            // LCP image gets highest priority for immediate discovery
                            priority={isAboveFold}
                            // fetchPriority="high" only on LCP image to signal browser
                            fetchPriority={isLCPImage ? 'high' : undefined}
                            // Below-fold images use lazy loading
                            loading={isAboveFold ? undefined : 'lazy'}
                            quality={60}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default BackgroundImages;
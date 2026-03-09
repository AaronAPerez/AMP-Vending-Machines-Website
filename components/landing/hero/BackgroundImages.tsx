'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Product images with descriptive alt text for SEO and accessibility
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
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Only start loading after component mounts (after LCP)
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isLoaded) {
        return (
            <div className="absolute inset-0 bg-black z-10" aria-hidden="true" />
        );
    }

    return (
        <>
            <div
                className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 z-10"
                aria-hidden="true"
            >
                {productImages.map((product, index) => {
                    const offset = Math.min(scrollY * 0.1 * (index % 6 + 1) * 0.2, 100);
                    const opacity = Math.max(0.3, 1 - scrollY * 0.001);

                    return (
                        <div
                            key={index}
                            className="relative rounded-lg overflow-hidden w-full h-40 sm:h-48"
                            style={{
                                transform: `translateY(${offset}px)`,
                                opacity,
                            }}
                        >
                            <Image
                                src={product.src}
                                alt={product.alt}
                                fill
                                sizes="(max-width: 640px) 33vw, 25vw"
                                className="object-cover"
                                priority // Prioritize the first 6 images for loading
                                quality={60}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default BackgroundImages;
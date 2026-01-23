'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const productImages = [
    '/images/products/drpepper.webp',
    '/images/products/doritos-nacho.webp',
    '/images/products/redbull.webp',
    '/images/products/snickers.webp',
    '/images/products/cheetos.webp',
    '/images/products/skittles.webp',
    '/images/products/kitkat.webp',
    '/images/products/monster.webp',
    '/images/products/poptarts.webp',
    '/images/products/starburst.webp',
    '/images/products/mms.webp',
    '/images/products/orangecrush.webp',
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
                {productImages.map((src, index) => {
                    const offset = Math.min(scrollY * 0.1 * (index % 6 + 1) * 0.2, 100);
                    const opacity = Math.max(0.3, 1 - (scrollY * 0.001));

                    return (
                        <div
                            key={index}
                            className="relative rounded-lg overflow-hidden w-full h-38
"
                            style={{
                                transform: `translateY(${offset}px)`,
                                opacity
                            }}
                        >
                            <Image
                                src={src}
                                alt="hero product images"
                                fill
                                sizes="(max-width: 768px) 25vw, 20vw"
                                className="object-cover"
                                loading={index < 4 ? "eager" : "lazy"}
                            // Only first 4 eager, rest lazy
                            // quality uses default from next.config.js (75)
                            />
                            {/* Subtle dark overlay for readability */}
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    );
                })}
            </div>      
        </>
    );
};

export default BackgroundImages;
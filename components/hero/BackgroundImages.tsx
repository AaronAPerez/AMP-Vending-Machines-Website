import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const productImages = [
    '/images/products/drpepper.jpg',
    '/images/products/doritos-nacho-cheese.jpg',
    '/images/products/redbull.jpg',
    '/images/products/snickers.jpg',
    '/images/products/cheetos.jpg',
    '/images/products/skittles.jpg',
    '/images/products/kitkat.jpg',
    '/images/products/monster.jpg',
    '/images/products/poptarts.jpg',
    '/images/products/starburst.jpg',
    '/images/products/mms.jpg',
    '/images/products/orangecrush.jpg',
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
                            className="relative rounded-lg overflow-hidden w-full h-50"
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
                                loading="lazy"
                                quality={75}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
                        </div>
                    );
                })}
            </div>
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black z-10"
                aria-hidden="true"
            >
            </div>

        </>
    );
};

export default BackgroundImages;
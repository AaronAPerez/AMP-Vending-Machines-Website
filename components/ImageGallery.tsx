'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

/**
 * Enhanced image gallery component with touch controls
 */
interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
  machineName: string;
  category: string;
}


export default function ImageGallery({ images, machineName, category }
: ImageGalleryProps)
 {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);




  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedImageIndex(index);
    }
  };


  return (
    <div className="space-y-6">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          className="object-contain"
          priority
        />

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 p-3 rounded-full text-white">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 p-3 rounded-full text-white">
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className="absolute top-4 left-4 bg-orange-600 text-black px-4 py-2 rounded-full font-bold">
          {category === 'refrigerated' ? 'Refrigerated' : 'Snack'}
        </div>

        <div className="absolute top-4 right-4 bg-orange-500 text-black px-4 py-2 rounded-full font-bold flex items-center">
          <CheckCircle size={16} className="mr-2" /> Professional Service
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${
                index === i ? 'border-orange-500' : 'border-neutral-700'
              }`}
            >
              <Image src={img.src} alt={img.alt} width={80} height={80} className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


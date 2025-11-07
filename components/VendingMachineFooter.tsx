// VendingMachineFooter.tsx
//
// A footer component designed to display contact information for AMP Vending
// Provides phone, email, and QR code for website scanning
// Can be placed over any background
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface VendingMachineFooterProps {
  phone?: string;
  email?: string;
  website?: string;
  qrCodeSrc?: string;
}

const VendingMachineFooter = ({
  phone = '(209) 403-5450',
  email = 'ampdesignandconsulting@gmail.com',
  website = 'www.ampvendingmachines.com',
  qrCodeSrc = '/images/optimized/AMP-qr-Code.webp', // Replace with actual QR code path
}: VendingMachineFooterProps) => {
  const [isQrLoaded, setIsQrLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading the QR code
    // In a real implementation, you might want to check if the image loaded correctly
    const timer = setTimeout(() => {
      setIsQrLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="flex items-center justify-center space-x-8">
        {/* QR Code */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white p-2 rounded-lg flex items-center justify-center">
            {isQrLoaded ? (
              <Image 
                src={qrCodeSrc} 
                alt={`QR Code to ${website}`} 
                width="80" 
                height="80"
                className="rounded"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
            )}
          </div>
          <span className="mt-1 text-xs text-gray-400">Scan for website</span>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-col">
          <div className="mb-1">
            <h2 className="text-[#FD5A1E] font-bold text-lg">Questions or Feedback?</h2>
            <p className="text-white">We&apos;d love to hear from you!</p>
          </div>
          <div>
            <a 
              href={`tel:${phone.replace(/\D/g, '')}`} 
              className="block text-white hover:text-[#FD5A1E] transition-colors duration-300"
              aria-label={`Call AMP Vending at ${phone}`}
            >
              {phone}
            </a>
            <a 
              href={`mailto:${email}`} 
              className="block text-white hover:text-[#FD5A1E] transition-colors duration-300"
              aria-label="Email AMP Vending"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-white">
            <span className="text-[#FD5A1E]">AMP</span> VENDING
          </div>
          <a 
            href={`https://${website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-white hover:text-[#FD5A1E] transition-colors duration-300"
            aria-label={`Visit ${website}`}
          >
            {website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default VendingMachineFooter;
'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Globe, MapPin } from 'lucide-react';

interface BusinessCardProps {
  theme?: 'dark' | 'light' | 'matte-black';
  variant?: 'vertical' | 'horizontal' | 'compact' | 'modern' | 'classic' | 'minimal';
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  theme = 'dark',
  variant = 'vertical'
}) => {
  const isDark = theme === 'dark' || theme === 'matte-black';
  const isMatteBlack = theme === 'matte-black';

  // Compact Card (Standard Business Card Size)
  if (variant === 'compact') {
    return (
      <div
        className="w-[350px] h-[200px] rounded-xl shadow-2xl overflow-hidden relative flex"
        style={{
          backgroundColor: isDark ? '#000000' : '#F5F5DC',
          borderColor: '#FD5A1E',
          borderWidth: '2px',
          borderStyle: 'solid'
        }}
      >
        {/* Left side with logo */}
        <div className="w-1/3 flex items-center justify-center p-4" style={{ backgroundColor: '#FD5A1E' }}>
          <div className="text-center">
            <div className="w-20 h-20 relative mx-auto mb-2">
              <Image
                src="/images/logo/AMP_Logo_Gray.webp"
                alt="AMP Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="text-white text-xl font-black">AMP</div>
            <div className="text-white text-xs font-light">VENDING</div>
          </div>
        </div>

        {/* Right side with info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold mb-1" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
              Andrew Perez
            </h3>
            <p className="text-xs mb-2" style={{ color: isDark ? '#9CA3AF' : '#4B5563' }}>
              President
            </p>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" style={{ color: '#FD5A1E' }} />
              <span style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>(209) 403-5450</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" style={{ color: '#FD5A1E' }} />
              <span style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>ampvendingmachines.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color: '#FD5A1E' }} />
              <span style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>Modesto, CA</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="absolute bottom-2 right-2 w-12 h-12 bg-white rounded p-0.5">
            <Image
              src="/images/logo/AMP-QR-Code.webp"
              alt="QR Code"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  // Modern Card (Bold & Contemporary)
  // if (variant === 'modern') {
  //   return (
  //     <div
  //       className="w-[400px] h-[250px] rounded-2xl shadow-2xl overflow-hidden relative"
  //       style={{ backgroundColor: isDark ? '#000000' : '#FFFFFF' }}
  //     >
  //       {/* Diagonal orange stripe */}
  //       <div
  //         className="absolute top-0 right-0 w-40 h-full"
  //         style={{
  //           background: 'linear-gradient(135deg, transparent 30%, #FD5A1E 30%)'
  //         }}
  //       />

  //       {/* Content */}
  //       <div className="relative z-10 p-8 h-full flex flex-col justify-between">
  //         <div>
  //           <div className="w-16 h-16 mb-4 relative">
  //             <Image
  //               src="/images/logo/AMP_logo.png"
  //               alt="AMP Logo"
  //               fill
  //               className="object-contain"
  //             />
  //           </div>
  //           <h1 className="text-4xl font-black mb-1" style={{ color: '#FD5A1E' }}>
  //             AMP VENDING
  //           </h1>
  //           <p className="text-sm mb-4" style={{ color: isDark ? '#9CA3AF' : '#4B5563' }}>
  //             Premium Workplace Solutions
  //           </p>
  //         </div>

  //         <div className="space-y-1.5">
  //           <div className="flex items-center gap-2">
  //             <Phone className="w-4 h-4" style={{ color: '#FD5A1E' }} />
  //             <span className="text-sm font-medium" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
  //               (209) 403-5450
  //             </span>
  //           </div>
  //           <div className="flex items-center gap-2">
  //             <Globe className="w-4 h-4" style={{ color: '#FD5A1E' }} />
  //             <span className="text-sm font-medium" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
  //               www.ampvendingmachines.com
  //             </span>
  //           </div>
  //         </div>

  //         {/* QR Code positioned in orange area */}
  //         <div className="absolute top-6 right-6 w-16 h-16 bg-white rounded-lg p-1">
  //           <Image
  //             src="/images/logo/AMP-QR-Code.webp"
  //             alt="QR Code"
  //             width={64}
  //             height={64}
  //             className="object-contain"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Classic Card (Traditional & Professional)
  if (variant === 'classic') {
    return (
      <div
        className="w-[350px] h-[200px] rounded-lg shadow-xl overflow-hidden relative"
        style={{
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
          border: '1px solid',
          borderColor: isDark ? '#374151' : '#E5E7EB'
        }}
      >
        {/* Top border accent */}
        <div className="h-1 w-full" style={{ backgroundColor: '#FD5A1E' }} />

        <div className="p-6 flex gap-4">
          {/* Left: Logo and branding */}
          <div className="flex-shrink-0 text-center">
            <div className="w-20 h-20 relative mb-2 mx-auto">
              <Image
                src="/images/logo/AMP_logo.png"
                alt="AMP Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-lg font-black" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
              AMP
            </div>
            <div className="text-xs" style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}>
              VENDING
            </div>
          </div>

          {/* Vertical divider */}
          <div className="w-px h-full" style={{ backgroundColor: '#FD5A1E' }} />

          {/* Right: Contact info */}
          <div className="flex-1 flex flex-col justify-center space-y-2">
            <div>
              <h3 className="text-base font-bold" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
                Andrew Perez
              </h3>
              <p className="text-xs" style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}>
                President
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3" style={{ color: '#FD5A1E' }} />
                <span style={{ color: isDark ? '#D1D5DB' : '#374151' }}>(209) 403-5450</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3" style={{ color: '#FD5A1E' }} />
                <span style={{ color: isDark ? '#D1D5DB' : '#374151' }}>ampvendingmachines.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" style={{ color: '#FD5A1E' }} />
                <span style={{ color: isDark ? '#D1D5DB' : '#374151' }}>Modesto, CA</span>
              </div>
            </div>
          </div>

          {/* QR Code bottom right */}
          <div className="absolute bottom-2 right-2 w-12 h-12 bg-white rounded p-0.5">
            <Image
              src="/images/logo/AMP-QR-Code.webp"
              alt="QR Code"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  // Minimal Card (Clean & Simple)
  // if (variant === 'minimal') {
  //   return (
  //     <div
  //       className="w-[350px] h-[200px] rounded-none shadow-lg overflow-hidden relative"
  //       style={{ backgroundColor: isDark ? '#000000' : '#FFFFFF' }}
  //     >
  //       <div className="p-8 h-full flex flex-col justify-between">
  //         {/* Top section */}
  //         <div className="flex items-start justify-between">
  //           <div>
  //             <h1 className="text-2xl font-black mb-0.5" style={{ color: isDark ? '#FFFFFF' : '#000000' }}>
  //               AMP VENDING
  //             </h1>
  //             <div className="h-0.5 w-20 mb-3" style={{ backgroundColor: '#FD5A1E' }} />
  //             <p className="text-xs" style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}>
  //               Premium Workplace Solutions
  //             </p>
  //           </div>

  //           <div className="w-12 h-12 relative">
  //             <Image
  //               src="/images/logo/AMP_logo.png"
  //               alt="AMP Logo"
  //               fill
  //               className="object-contain"
  //             />
  //           </div>
  //         </div>

  //         {/* Bottom section */}
  //         <div className="flex justify-between items-end">
  //           <div className="space-y-0.5 text-xs">
  //             <div style={{ color: isDark ? '#FFFFFF' : '#000000' }}>
  //               <strong>Andrew Perez</strong> • President
  //             </div>
  //             <div style={{ color: isDark ? '#D1D5DB' : '#374151' }}>
  //               (209) 403-5450
  //             </div>
  //             <div style={{ color: isDark ? '#D1D5DB' : '#374151' }}>
  //               ampvendingmachines.com
  //             </div>
  //             <div style={{ color: isDark ? '#D1D5DB' : '#374151' }}>
  //               Modesto, CA
  //             </div>
  //           </div>

  //           <div className="w-14 h-14 bg-white rounded p-1">
  //             <Image
  //               src="/images/logo/AMP-QR-Code.webp"
  //               alt="QR Code"
  //               width={56}
  //               height={56}
  //               className="object-contain"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Vertical Card (Original)
  if (variant === 'vertical') {
    return (
      <div
        className="w-[350px] h-[500px] rounded-2xl shadow-2xl overflow-hidden relative border-2"
        style={{
          backgroundColor: isDark ? '#000000' : '#F5F5DC',
          borderColor: isDark ? '#FD5A1E' : '#A5A5A5'
        }}
      >
        {/* Top Section with Logo */}
        <div className="p-8 flex flex-col items-center">
          {/* AMP Logo */}
          <div className="w-32 h-32 mb-4 relative">
            <Image
              src="/images/logo/AMP_logo.png"
              alt="AMP Vending Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Brand Name */}
          <div className="text-center">
            <h1
              className="text-5xl font-black tracking-tight"
              style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}
            >
              AMP
            </h1>
            <h2
              className="text-2xl font-light tracking-wide"
              style={{ color: isDark ? '#9CA3AF' : '#4B5563' }}
            >
              VENDING
            </h2>
          </div>
        </div>

        {/* Orange Divider Line */}
        <div className="w-2/3 mx-auto h-1 rounded-full" style={{ backgroundColor: '#FD5A1E' }}></div>

        {/* Contact Information */}
        <div className="p-8 space-y-4">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#FD5A1E' }} />
            <span className="text-lg font-medium" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
              (209) 403-5450
            </span>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#FD5A1E' }} />
            <span className="text-lg font-medium break-all" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
              www.ampvendingmachines.com
            </span>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#FD5A1E' }} />
            <span className="text-lg font-medium" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
              Based in Modesto, CA
            </span>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#FD5A1E' }} />
            <span className="text-lg font-medium" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
              Serving Northern Cal
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-sm text-center font-medium" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
            Call us for a free consultation
          </p>
        </div>

        {/* QR Code */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-white rounded-lg p-1">
          <Image
            src="/images/logo/AMP-QR-Code.webp"
            alt="Scan QR Code"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  // Horizontal variant (Avery 28878 - Standard Business Card 3.5" × 2")
  return (
    <div
      className="w-[350px] h-[200px] shadow-2xl overflow-hidden relative flex"
      style={{
        backgroundColor: isMatteBlack ? '#1a1a1a' : (isDark ? '#000000' : '#FFFFFF'),
        border: isMatteBlack ? 'none' : (isDark ? '2px solid #FD5A1E' : '1px solid #E5E7EB'),
        boxShadow: isMatteBlack ? '0 8px 32px rgba(0,0,0,0.4)' : undefined
      }}
    >
      {/* Left side - Orange accent bar */}
      <div className="w-1.5" style={{ backgroundColor: '#FD5A1E' }}></div>

      {/* Main content area */}
      <div className="flex-1 p-4 flex justify-between">
        {/* Left: Contact Info */}
        <div className="flex flex-col justify-between flex-1">
          {/* Brand section */}
          <div>
            <h1 className="text-2xl font-black mb-0.5 leading-tight" style={{ color: '#FD5A1E' }}>
              AMP VENDING
            </h1>
            <p
              className="text-[10px] uppercase tracking-wider mb-2"
              style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
            >
              Premium Workplace Solutions
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 flex-shrink-0" style={{ color: '#FD5A1E' }} />
              <span className="text-xs font-medium" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
                (209) 403-5450
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 flex-shrink-0" style={{ color: '#FD5A1E' }} />
              <span className="text-xs font-medium" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
                ampvendingmachines.com
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#FD5A1E' }} />
              <span className="text-xs" style={{ color: isDark ? '#D1D5DB' : '#374151' }}>
                Modesto, CA
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="border-l-2 pl-2 mt-1" style={{ borderColor: '#FD5A1E' }}>
            <p className="text-[10px] font-medium" style={{ color: isDark ? '#D1D5DB' : '#6B7280' }}>
              Free consultation
            </p>
          </div>
        </div>

        {/* Right side - Logo and QR */}
        <div className="flex flex-col items-center justify-between pl-3">
          {/* Logo */}
          <div className="text-center">
            <div className="w-24 h-24 relative mx-auto mb-1">
              <Image
                src="/images/logo/AMP_logo.webp"
                alt="AMP Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* <div className="text-xs font-black leading-tight" style={{ color: isDark ? '#FFFFFF' : '#1F2937' }}>
              AMP
            </div>
            <div className="text-[10px] font-light" style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}>
              VENDING
            </div> */}
          </div>

          {/* QR Code */}
          <div className="w-12 h-12 bg-white rounded p-0.5">
            <Image
              src="/images/logo/AMP-QR-Code.webp"
              alt="Scan QR"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
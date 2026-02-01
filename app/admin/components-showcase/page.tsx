// 'use client';

// import React, { useState } from 'react';
// import { ButtonShowcase } from '@/components/ButtonShowcase';
// import { ExitIntentPopup } from '@/components/ExitIntentPopup';
// import Card from '@/components/ui/core/Card';
// import MachineCard from '@/components/MachineCard';
// import { Input } from '@/components/ui/forms/Input';
// import { AccessibleButton } from '@/components/ui/AccessibleButton';
// import { Phone, Mail, ArrowRight, X, CheckCircle, Star, Sparkles } from 'lucide-react';
// import Image from 'next/image';

// /**
//  * Components Showcase Page
//  *
//  * Displays all UI components in one place for easy testing and editing.
//  * Access this page at: /components-showcase
//  */
// export default function ComponentsShowcase() {
//   const [showExitIntent, setShowExitIntent] = useState(false);
//   const [selectedTab, setSelectedTab] = useState<'buttons' | 'cards' | 'forms' | 'popup' | 'email'>('buttons');

//   // Sample machine data for MachineCard component
//   const sampleMachine = {
//     id: 'premium-touchscreen',
//     name: 'Premium Touchscreen Vending Machine',
//     model: 'TS-2024',
//     image: '/images/machines/amp-refrigerated-vending-machine-tap-to-pay.webp',
//     shortDescription: 'State-of-the-art 21.5" HD touchscreen with contactless payment',
//     description: 'Premium touchscreen vending machine with modern features',
//     category: 'refrigerated' as const,
//     bestFor: ['Offices', 'Corporate Campuses', 'Schools'],
//     highlights: ['21.5" HD Display', 'Tap to Pay', 'Remote Monitoring'],
//     features: [
//       { title: '21.5" HD Touchscreen Display', description: 'Interactive user experience' },
//       { title: 'Contactless Payment Support', description: 'Apple Pay, Google Pay, and more' },
//       { title: '40-Selection Capacity', description: 'Wide product variety' }
//     ],
//     price: 'FREE Installation',
//     dimensions: [
//       { label: 'Height', value: '72"' },
//       { label: 'Width', value: '39"' },
//       { label: 'Depth', value: '35"' }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-black pt-20">
//       {/* Header - positioned under navbar */}
//       <header className="bg-[#111111] border-b border-[#333333]">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F5]">
//                 AMP Components Showcase
//               </h1>
//               <p className="text-sm text-[#A5ACAF] mt-1">
//                 All UI components in one place for easy testing and editing
//               </p>
//             </div>
//             <AccessibleButton
//               variant="cta"
//               size="sm"
//               href="/"
//             >
//               Back to Site
//             </AccessibleButton>
//           </div>

//           {/* Tab Navigation */}
//           <nav className="flex gap-2 mt-6 overflow-x-auto pb-2" role="tablist">
//             {[
//               { id: 'buttons', label: 'Buttons' },
//               { id: 'cards', label: 'Cards' },
//               { id: 'forms', label: 'Forms' },
//               { id: 'popup', label: 'Exit Intent' },
//               { id: 'email', label: 'Email Templates' }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setSelectedTab(tab.id as any)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                   selectedTab === tab.id
//                     ? 'bg-[#FD5A1E] text-white'
//                     : 'bg-[#333333] text-[#A5ACAF] hover:bg-[#444444] hover:text-[#F5F5F5]'
//                 }`}
//                 role="tab"
//                 aria-selected={selectedTab === tab.id}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">

//         {/* Buttons Section */}
//         {selectedTab === 'buttons' && (
//           <section>
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Button Variants</h2>
//               <p className="text-[#A5ACAF]">
//                 All available button styles with different sizes and states
//               </p>
//             </div>
//             <ButtonShowcase />
//           </section>
//         )}

//         {/* Cards Section */}
//         {selectedTab === 'cards' && (
//           <section>
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Card Components</h2>
//               <p className="text-[#A5ACAF]">
//                 Different card styles and layouts for content display
//               </p>
//             </div>

//             <div className="space-y-12">
//               {/* Card Variants */}
//               <div>
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Basic Card Variants</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {/* Default Card */}
//                   <Card variant="default" padding="md">
//                     <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">Default Card</h4>
//                     <p className="text-[#A5ACAF] text-sm mb-4">
//                       Standard card with neutral styling. Perfect for general content.
//                     </p>
//                     <div className="flex gap-2">
//                       <AccessibleButton variant="primary" size="sm">
//                         Action
//                       </AccessibleButton>
//                       <AccessibleButton variant="ghost" size="sm">
//                         Cancel
//                       </AccessibleButton>
//                     </div>
//                   </Card>

//                   {/* Highlighted Card */}
//                   <Card variant="highlighted" padding="md">
//                     <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">Highlighted Card</h4>
//                     <p className="text-[#A5ACAF] text-sm mb-4">
//                       Featured card with orange accent. Great for special offers.
//                     </p>
//                     <div className="flex gap-2">
//                       <AccessibleButton variant="cta" size="sm">
//                         Get Started
//                       </AccessibleButton>
//                     </div>
//                   </Card>

//                   {/* Outlined Card */}
//                   <Card variant="outlined" padding="md">
//                     <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">Outlined Card</h4>
//                     <p className="text-[#A5ACAF] text-sm mb-4">
//                       Minimal card with border only. Subtle and clean.
//                     </p>
//                     <div className="flex gap-2">
//                       <AccessibleButton variant="secondary" size="sm">
//                         Learn More
//                       </AccessibleButton>
//                     </div>
//                   </Card>
//                 </div>
//               </div>

//               {/* Card Padding Options */}
//               <div>
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Card Padding Options</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <Card variant="default" padding="none">
//                     <div className="p-4 bg-[#FD5A1E]/10">
//                       <p className="text-[#F5F5F5] text-sm font-bold">No Padding</p>
//                       <p className="text-[#A5ACAF] text-xs">padding=&quot;none&quot;</p>
//                     </div>
//                   </Card>
//                   <Card variant="default" padding="sm">
//                     <p className="text-[#F5F5F5] text-sm font-bold">Small</p>
//                     <p className="text-[#A5ACAF] text-xs">padding=&quot;sm&quot;</p>
//                   </Card>
//                   <Card variant="default" padding="md">
//                     <p className="text-[#F5F5F5] text-sm font-bold">Medium</p>
//                     <p className="text-[#A5ACAF] text-xs">padding=&quot;md&quot;</p>
//                   </Card>
//                   <Card variant="default" padding="lg">
//                     <p className="text-[#F5F5F5] text-sm font-bold">Large</p>
//                     <p className="text-[#A5ACAF] text-xs">padding=&quot;lg&quot;</p>
//                   </Card>
//                 </div>
//               </div>

//               {/* Machine Card */}
//               <div>
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Machine Card Component</h3>
//                 <div className="max-w-sm mx-auto">
//                   <MachineCard machine={sampleMachine} variant="grid" />
//                 </div>
//                 <div className="mt-4 p-4 bg-[#111111] rounded-lg border border-[#333333]">
//                   <p className="text-[#A5ACAF] text-sm">
//                     <span className="text-[#FD5A1E] font-bold">Note:</span> Machine cards are
//                     fully clickable and include hover effects, loading states, and SEO optimization.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Forms Section */}
//         {selectedTab === 'forms' && (
//           <section>
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Form Components</h2>
//               <p className="text-[#A5ACAF]">
//                 Input fields, textareas, and form controls
//               </p>
//             </div>

//             <div className="max-w-2xl space-y-8">
//               {/* Input Field Examples */}
//               <Card variant="default" padding="lg">
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Input Fields</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
//                       Text Input
//                     </label>
//                     <Input
//                       type="text"
//                       placeholder="Enter your name"
//                       className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
//                       Email Input
//                     </label>
//                     <Input
//                       type="email"
//                       placeholder="your.email@example.com"
//                       className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
//                       Phone Input
//                     </label>
//                     <Input
//                       type="tel"
//                       placeholder="(209) 403-5450"
//                       className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
//                       Disabled Input
//                     </label>
//                     <Input
//                       type="text"
//                       placeholder="Disabled field"
//                       disabled
//                       className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
//                     />
//                   </div>
//                 </div>
//               </Card>

//               {/* Contact Form Example */}
//               <Card variant="highlighted" padding="lg">
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Sample Contact Form</h3>
//                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
//                         First Name *
//                       </label>
//                       <Input
//                         type="text"
//                         required
//                         className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
//                         Last Name *
//                       </label>
//                       <Input
//                         type="text"
//                         required
//                         className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
//                       Email *
//                     </label>
//                     <Input
//                       type="email"
//                       required
//                       className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
//                       Message *
//                     </label>
//                     <textarea
//                       rows={4}
//                       required
//                       className="w-full rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-[#F5F5F5] focus:border-[#FD5A1E] focus:ring-2 focus:ring-[#FD5A1E]/20 transition-colors"
//                       placeholder="Tell us about your vending machine needs..."
//                     />
//                   </div>

//                   <div className="flex gap-3">
//                     <AccessibleButton
//                       variant="cta"
//                       size="lg"
//                       type="submit"
//                       rightIcon={<ArrowRight className="h-5 w-5" />}
//                     >
//                       Send Message
//                     </AccessibleButton>
//                     <AccessibleButton variant="ghost" size="lg" type="reset">
//                       Clear Form
//                     </AccessibleButton>
//                   </div>
//                 </form>
//               </Card>
//             </div>
//           </section>
//         )}

//         {/* Exit Intent Popup Section */}
//         {selectedTab === 'popup' && (
//           <section>
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Exit Intent Popup</h2>
//               <p className="text-[#A5ACAF]">
//                 Conversion-optimized popup that appears when users show exit intent
//               </p>
//             </div>
//             <ExitIntentPopup/>

//             <Card variant="highlighted" padding="lg">
//               <div className="text-center space-y-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FD5A1E]/20">
//                   <CheckCircle className="h-8 w-8 text-[#FD5A1E]" />
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">
//                     Exit Intent Popup Features
//                   </h3>
//                   <p className="text-[#A5ACAF]">
//                     Click the button below to preview the exit intent popup
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
//                   <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
//                     <CheckCircle className="h-5 w-5 text-[#FD5A1E] mb-2" />
//                     <h4 className="text-[#F5F5F5] font-semibold mb-1">Desktop Exit Detection</h4>
//                     <p className="text-[#A5ACAF] text-sm">
//                       Triggers when mouse leaves viewport from top
//                     </p>
//                   </div>
//                   <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
//                     <CheckCircle className="h-5 w-5 text-[#FD5A1E] mb-2" />
//                     <h4 className="text-[#F5F5F5] font-semibold mb-1">Mobile Scroll Detection</h4>
//                     <p className="text-[#A5ACAF] text-sm">
//                       Activates on rapid upward scroll near top
//                     </p>
//                   </div>
//                   <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
//                     <CheckCircle className="h-5 w-5 text-[#FD5A1E] mb-2" />
//                     <h4 className="text-[#F5F5F5] font-semibold mb-1">Touch-Friendly Targets</h4>
//                     <p className="text-[#A5ACAF] text-sm">
//                       WCAG 2.1 AA compliant (44x44px minimum)
//                     </p>
//                   </div>
//                   <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
//                     <CheckCircle className="h-5 w-5 text-[#FD5A1E] mb-2" />
//                     <h4 className="text-[#F5F5F5] font-semibold mb-1">Session Management</h4>
//                     <p className="text-[#A5ACAF] text-sm">
//                       Shows once per session, stored in sessionStorage
//                     </p>
//                   </div>
//                 </div>

//                 <AccessibleButton
//                   variant="cta"
//                   size="lg"
//                   onClick={() => setShowExitIntent(true)}
//                   rightIcon={<ArrowRight className="h-5 w-5" />}
//                 >
//                   Preview Exit Intent Popup
//                 </AccessibleButton>

//                 <div className="p-4 bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-lg">
//                   <p className="text-[#F5F5F5] text-sm">
//                     <span className="font-bold text-[#FD5A1E]">Implementation:</span> The popup
//                     automatically appears on exit intent. For testing, use the preview button above.
//                   </p>
//                 </div>
//               </div>
//             </Card>


//               {/* Popup - Responsive container */}
//       <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">

//                     <Card className="relative bg-gradient-to-br from-black via-[#1a1a1a] to-black shadow-2xl border-2 border-[#FD5A1E] overflow-hidden">
//           {/* Close Button - Touch-friendly size */}
//           <button
          
//             className="absolute top-3 right-3 md:top-4 md:right-4 z-10 p-3 rounded-lg bg-[#4d4d4d] hover:bg-[#FD5A1E] transition-colors touch-manipulation"
//             aria-label="Close popup"
//             style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target
//           >
//             <X className="h-5 w-5 text-[#F5F5F5]" />
//           </button>

//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

    
//               {/* Left Column - Image & Stats */}
//               <div className="relative hidden lg:flex lg:flex-col bg-gradient-to-br from-[#FD5A1E]/15 via-[#FD5A1E]/10 to-transparent p-8">
//                 {/* Logo */}
//                 <div className="mb-6">
//                   <Image
//                     src="/images/logo/AMP_logo.webp"
//                     alt="AMP Vending Machines"
//                     width={150}
//                     height={50}
//                     className="object-contain mx-auto"
//                   />
//                 </div>

//                 {/* Vending Machine Image */}
//                 <div className="relative flex-1 min-h-[280px] mb-6">
//                   <Image
//                     src="/images/machines/amp-refrigerated-vending-machine-tap-to-pay.webp"
//                     alt="Premium Touchscreen Vending Machine"
//                     fill
//                     className="object-contain drop-shadow-2xl"
//                     sizes="(max-width: 768px) 0vw, 50vw"
//                   />
//                 </div>

//                 {/* Stats Grid - Moved from right column */}
//                 <div className="grid grid-cols-3 gap-2">
//                   <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
//                     <div className="text-xl font-bold text-[#FD5A1E] mb-1">
//                       100%
//                     </div>
//                     <div className="text-xs text-[#A5ACAF]">
//                       Free Setup
//                     </div>
//                   </div>
//                   <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
//                     <div className="text-xl font-bold text-[#FD5A1E] mb-1">
//                       24/7
//                     </div>
//                     <div className="text-xs text-[#A5ACAF]">
//                       Service
//                     </div>
//                   </div>
//                   <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
//                     <div className="text-xl font-bold text-[#FD5A1E] mb-1">
//                       50+
//                     </div>
//                     <div className="text-xs text-[#A5ACAF]">
//                       Products
//                     </div>
//                   </div>
//                 </div>

//                 {/* Special Offer Badge - Also moved here for balance */}
//                 <div className="flex items-center justify-center gap-2 px-3 py-2 mt-4 rounded-lg bg-gradient-to-r from-[#FD5A1E]/20 to-orange-600/20 border-2 border-[#FD5A1E]">
//                   <Sparkles className="h-4 w-4 text-[#FD5A1E] animate-pulse flex-shrink-0" />
//                   <span className="font-bold text-[#FD5A1E] text-xs text-center">
//                     FREE Premium Touchscreen Machines!
//                   </span>
//                 </div>
//               </div>

//               {/* Right Column - Content */}
//               <div className="p-6 md:p-8 lg:p-8">
//                 {/* Mobile Logo */}
//                 <div className="lg:hidden mb-4 flex justify-center">
//                   <Image
//                     src="/images/logo/AMP_logo.webp"
//                     alt="AMP Vending Machines"
//                     width={120}
//                     height={40}
//                     className="object-contain"
//                   />
//                 </div>

//                 {/* Header */}
//                 <div className="text-center mb-4">
//                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FD5A1E]/20 mb-3 animate-pulse">
//                     <Sparkles className="h-6 w-6 text-[#FD5A1E]" />
//                   </div>
//                   <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">
//                     Wait! Don&apos;t Miss Out...
//                   </h2>
//                   <p className="text-sm md:text-base text-[#FD5A1E] font-semibold">
//                     Get a FREE Vending Machine!
//                   </p>
//                 </div>

//                 {/* Value Prop */}
//                 <p className="text-sm text-[#F5F5F5] leading-relaxed text-center mb-4">
//                   Join <span className="font-bold text-[#FD5A1E]">the many businesses</span> in Modesto & Stanislaus County
//                   providing premium vending at{' '}
//                   <span className="font-bold text-[#FD5A1E]">zero cost</span>!
//                 </p>

//                 {/* Stats Grid - Mobile Only (hidden on desktop, shown on left column) */}
//                 <div className="grid grid-cols-3 gap-3 mb-6 lg:hidden">
//                   <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
//                     <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">
//                       100%
//                     </div>
//                     <div className="text-xs text-[#A5ACAF]">
//                       Free Setup
//                     </div>
//                   </div>
//                   <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
//                     <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">
//                       24/7
//                     </div>
//                     <div className="text-xs text-[#A5ACAF]">
//                       Service
//                     </div>
//                   </div>
//                   <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
//                     <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">
//                       50+
//                     </div>
//                     <div className="text-xs text-[#A5ACAF]">
//                       Products
//                     </div>
//                   </div>
//                 </div>

//                 {/* Special Offer Badge - Mobile Only */}
//                 <div className="flex items-center justify-center gap-2 px-4 py-2.5 mb-6 rounded-lg bg-gradient-to-r from-[#FD5A1E]/20 to-orange-600/20 border-2 border-[#FD5A1E] lg:hidden">
//                   <Sparkles className="h-4 w-4 text-[#FD5A1E] animate-pulse flex-shrink-0" />
//                   <span className="font-bold text-[#FD5A1E] text-xs md:text-sm text-center">
//                     FREE Premium Touchscreen Machines!
//                   </span>
//                 </div>

//                 {/* Benefits List */}
//                 <div className="space-y-1.5 mb-4">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
//                     <span className="text-[#F5F5F5] text-xs">21.5&quot; HD touchscreen</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
//                     <span className="text-[#F5F5F5] text-xs">Contactless payments</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
//                     <span className="text-[#F5F5F5] text-xs">Weekly restocking</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
//                     <span className="text-[#F5F5F5] text-xs">Zero upfront costs</span>
//                   </div>
//                 </div>

//                 {/* Quick Lead Capture Form */}
//                 <form className="space-y-2.5">
//                   <div className="grid grid-cols-1 gap-2">
//                     <input
//                       type="text"
//                       placeholder="Your Name "
//                       className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]"
//                     />
//                     <input
//                       type="email"
//                       placeholder="Your Email (Optional)"
           
//                       className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]"
//                     />
//                     <input
//                       type="tel"
//                       placeholder="Your Phone (Optional)"
                     
//                       className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]"
//                     />
//                   </div>

//                   {/* CTA Buttons - Touch-friendly with proper spacing */}
//                   <div className="space-y-2">
//                     <AccessibleButton
//                       type="submit"
//                       variant="cta"
//                       size="lg"
          
//                       rightIcon={<ArrowRight className="h-5 w-5" />}
//                       fullWidth
//                       className="touch-manipulation"
//                       style={{ minHeight: '48px' }} // WCAG touch target
//                     >
//                       Get Your Free Machine
//                     </AccessibleButton>
//                     <AccessibleButton
//                       variant="outline"
//                       size="md"
//                       href="tel:+12094035450"
//                       leftIcon={<Phone className="h-4 w-4" />}
                     
//                       fullWidth
//                       className="touch-manipulation"
//                       style={{ minHeight: '44px' }} // WCAG touch target
//                     >
//                       Call (209) 403-5450
//                     </AccessibleButton>
//                   </div>
//                 </form>

//                 {/* Trust Indicators */}
//                 <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 pt-3 text-xs text-[#A5ACAF]">
//                   <span>✓ No contracts</span>
//                   <span>✓ Cancel anytime</span>
//                   <span className="hidden sm:inline">✓ Local service</span>
//                 </div>
//               </div>
//             </div>
//         </Card>
//         </div>

//             {/* Show exit intent when button is clicked */}
//             {showExitIntent && (
//               <div className="fixed inset-0 z-[100]">
//                 <ExitIntentPopup delay={0} />
//                 {/* Add manual close button for showcase */}
//                 <button
//                   onClick={() => setShowExitIntent(false)}
//                   className="fixed top-4 right-4 z-[101] p-3 bg-[#FD5A1E] hover:bg-[#FD5A1E]/80 rounded-lg text-white font-bold shadow-lg"
//                 >
//                   Close Preview
//                 </button>
//               </div>
//             )}
//           </section>
//         )}

//         {/* Email Templates Section */}
//         {selectedTab === 'email' && (
//           <section>
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Email Templates</h2>
//               <p className="text-[#A5ACAF]">
//                 Auto-response and notification email formats
//               </p>
//             </div>

//             <div className="space-y-8">
//               {/* Contact Form Auto-Response */}
//               <Card variant="default" padding="lg">
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
//                   Contact Form Auto-Response
//                 </h3>
//                 <div className="bg-white text-black p-8 rounded-lg">
//                   <div className="max-w-2xl mx-auto">
//                     <div className="text-center mb-6">
//                       <div className="w-32 h-32 mx-auto mb-4 bg-[#FD5A1E] rounded-lg flex items-center justify-center">
//                         <span className="text-white text-2xl font-bold">AMP</span>
//                       </div>
//                       <h1 className="text-2xl font-bold text-gray-900">
//                         Thank You for Contacting AMP Vending!
//                       </h1>
//                     </div>

//                     <div className="space-y-4 text-gray-700">
//                       <p>Hi [Customer Name],</p>

//                       <p>
//                         Thank you for reaching out to <strong>AMP Vending Machines</strong>!
//                         We&apos;ve received your message and our team will get back to you within
//                         24 hours.
//                       </p>

//                       <div className="bg-gray-50 border-l-4 border-[#FD5A1E] p-4 my-6">
//                         <p className="font-semibold text-gray-900 mb-2">
//                           What Happens Next?
//                         </p>
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start">
//                             <CheckCircle className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
//                             <span>Our team reviews your specific needs</span>
//                           </li>
//                           <li className="flex items-start">
//                             <CheckCircle className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
//                             <span>We prepare a customized vending solution</span>
//                           </li>
//                           <li className="flex items-start">
//                             <CheckCircle className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
//                             <span>You receive a detailed proposal</span>
//                           </li>
//                         </ul>
//                       </div>

//                       <p>
//                         In the meantime, feel free to call us directly at{' '}
//                         <a href="tel:+12094035450" className="text-[#FD5A1E] font-semibold">
//                           (209) 403-5450
//                         </a>{' '}
//                         if you have any urgent questions.
//                       </p>

//                       <p className="font-semibold">
//                         Best regards,<br />
//                         The AMP Vending Team
//                       </p>
//                     </div>

//                     <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
//                       <p>AMP Vending Machines</p>
//                       <p>Serving Modesto & Stanislaus County</p>
//                       <p>(209) 403-5450 | info@ampvendingmachines.com</p>
//                     </div>
//                   </div>
//                 </div>
//               </Card>

//               {/* Lead Notification Email */}
//               <Card variant="default" padding="lg">
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
//                   Internal Lead Notification
//                 </h3>
//                 <div className="bg-white text-black p-8 rounded-lg">
//                   <div className="max-w-2xl mx-auto">
//                     <div className="bg-[#FD5A1E] text-white p-4 rounded-lg mb-6">
//                       <h1 className="text-xl font-bold flex items-center">
//                         <Star className="h-6 w-6 mr-2" />
//                         New Lead from Website
//                       </h1>
//                       <p className="text-sm opacity-90">ampvendingmachines.com</p>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-gray-50 p-3 rounded">
//                           <p className="text-xs text-gray-500 mb-1">Name</p>
//                           <p className="font-semibold">John Smith</p>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <p className="text-xs text-gray-500 mb-1">Company</p>
//                           <p className="font-semibold">ABC Corporation</p>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <p className="text-xs text-gray-500 mb-1">Email</p>
//                           <p className="font-semibold text-sm">john@example.com</p>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <p className="text-xs text-gray-500 mb-1">Phone</p>
//                           <p className="font-semibold">(209) 555-0123</p>
//                         </div>
//                       </div>

//                       <div className="bg-gray-50 p-4 rounded">
//                         <p className="text-xs text-gray-500 mb-2">Message</p>
//                         <p className="text-sm">
//                           We&apos;re interested in getting a vending machine for our office
//                           with about 50 employees. Looking for healthy snack options.
//                         </p>
//                       </div>

//                       <div className="flex gap-3">
//                         <AccessibleButton variant="cta" size="sm" fullWidth>
//                           <Mail className="h-4 w-4 mr-2" />
//                           Reply to Lead
//                         </AccessibleButton>
//                         <AccessibleButton variant="primary" size="sm" fullWidth>
//                           <Phone className="h-4 w-4 mr-2" />
//                           Call Now
//                         </AccessibleButton>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Card>

//               {/* Service Reminder Email */}
//               <Card variant="default" padding="lg">
//                 <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
//                   Service Reminder Email
//                 </h3>
//                 <div className="bg-white text-black p-8 rounded-lg">
//                   <div className="max-w-2xl mx-auto">
//                     <div className="text-center mb-6">
//                       <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#FD5A1E] to-orange-600 rounded-full flex items-center justify-center">
//                         <CheckCircle className="h-12 w-12 text-white" />
//                       </div>
//                       <h1 className="text-2xl font-bold text-gray-900">
//                         Your Vending Machine Service Update
//                       </h1>
//                     </div>

//                     <div className="space-y-4 text-gray-700">
//                       <p>Hi [Customer Name],</p>

//                       <p>
//                         This is a friendly reminder that your vending machine is scheduled
//                         for restocking and maintenance on:
//                       </p>

//                       <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] p-4 rounded-lg text-center">
//                         <p className="text-2xl font-bold text-[#FD5A1E]">
//                           Thursday, January 25, 2026
//                         </p>
//                         <p className="text-gray-600">Between 10:00 AM - 2:00 PM</p>
//                       </div>

//                       <p className="text-sm">
//                         <strong>What we&apos;ll do during this service:</strong>
//                       </p>
//                       <ul className="space-y-2 text-sm">
//                         <li className="flex items-start">
//                           <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
//                           <span>Fully restock all products</span>
//                         </li>
//                         <li className="flex items-start">
//                           <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
//                           <span>Clean and sanitize the machine</span>
//                         </li>
//                         <li className="flex items-start">
//                           <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
//                           <span>Check all mechanical components</span>
//                         </li>
//                         <li className="flex items-start">
//                           <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
//                           <span>Update payment system software</span>
//                         </li>
//                       </ul>

//                       <p className="text-sm">
//                         Need to reschedule or have product requests? Reply to this email
//                         or call us at <strong>(209) 403-5450</strong>.
//                       </p>

//                       <p className="font-semibold">
//                         Thank you for choosing AMP Vending!
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-[#333333] bg-[#111111] py-8 mt-16">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-[#A5ACAF] text-sm">
//             AMP Vending Machines Components Showcase
//           </p>
//           <p className="text-[#666666] text-xs mt-2">
//             For development and testing purposes only
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }



import ComponentsShowcase from '@/components/admin/ComponentsShowcase';



export default function ComponentsShowcasePage() {


  return (
    <>

      <ComponentsShowcase />
    </>
  );
}
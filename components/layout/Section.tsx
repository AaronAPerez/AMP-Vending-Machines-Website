// import React from 'react';
// import Text from './Text';
// import Container from './Container';

// export interface SectionProps {
//   children: React.ReactNode;
//   className?: string;
//   id?: string;
//   title?: React.ReactNode;
//   subtitle?: string;
//   titleClassName?: string;
//   subtitleClassName?: string;
//   containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
//   background?: 'default' | 'gradient' | 'accent' | 'dark' | 'none';
//   spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
// }

// /**
//  * Section Component
//  * 
//  * Creates responsive page sections with consistent styling
//  * and optional title/subtitle heading
//  */
// const Section = ({
//   children,
//   className = '',
//   id,
//   title,
//   subtitle,
//   titleClassName = '',
//   subtitleClassName = '',
//   containerSize = 'lg',
//   background = 'default',
//   spacing = 'lg'
// }: SectionProps) => {
//   // Background classes
//   const bgClasses = {
//     default: 'bg-black',
//     gradient: 'bg-gradient-to-b from-black to-[#111111]',
//     accent: 'bg-gradient-to-br from-[#FD5A1E]/10 to-black',
//     dark: 'bg-[#0a0a0a]',
//     none: ''
//   };

//   // Spacing classes
//   const spacingClasses = {
//     none: '',
//     sm: 'py-6 sm:py-8',
//     md: 'py-8 sm:py-12',
//     lg: 'py-12 sm:py-16',
//     xl: 'py-16 sm:py-24'
//   };

//   return (
//     <section 
//       id={id}
//       className={`relative ${bgClasses[background]} ${spacingClasses[spacing]} ${className}`}
//     >
//       <Container size={containerSize}>
//         {(title || subtitle) && (
//           <div className="text-center mb-8 sm:mb-12">
//             {title && (
//               <Text 
//                 variant="h2" 
//                 className={titleClassName}
//               >
//                 {title}
//               </Text>
//             )}
//             {subtitle && (
//               <Text 
//                 variant="body" 
//                 color="muted" 
//                 className={`mt-4 max-w-3xl mx-auto ${subtitleClassName}`}
//               >
//                 {subtitle}
//               </Text>
//             )}
//           </div>
//         )}
//         {children}
//       </Container>
//     </section>
//   );
// };

// export default Section;
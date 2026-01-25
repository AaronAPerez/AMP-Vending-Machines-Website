/**
 * SEO-Optimized Vending Machine Data Types and Utilities
 * Updated with search-friendly IDs and names for better Google rankings
 * 
 * Build Process Documentation:
 * 1. Machine IDs use descriptive, URL-friendly slugs
 * 2. Names include primary keywords for vending machine searches
 * 3. Descriptions optimized for local and commercial vending searches
 * 4. Categories aligned with common search terms
 * 5. Related machines cross-reference for internal linking SEO
 */

export interface MachineImage {
  id: number;
  src: string;
  alt: string; // SEO-optimized alt text for images
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface SpecificationGroup {
  category: string;
  items: {
    label: string;
    value: string | string[];
  }[];
}

/**
 * Enhanced Machine Data Interface with SEO considerations
 * All fields optimized for search engine visibility
 */
export interface MachineData {
  image: any;
  id: string; // SEO-friendly slug (e.g., "refrigerated-touchscreen-vending-machine")
  name: string; // Keyword-rich machine name
  seoTitle?: string; // Optional custom SEO title tag
  metaDescription?: string; // Custom meta description for machine pages
  shortDescription: string;
  description: string;
  images: MachineImage[];
  dimensions: { label: string; value: string }[] | string;
  features: FeatureItem[];
  specifications: SpecificationGroup[];
  productOptions: string[];
  bestFor: string[] | string;
  relatedMachines: {
    id: string;
    name: string;
    image: string;
  }[];
  category: "refrigerated" | "non-refrigerated";
  highlights?: string[];
  // SEO Enhancement Fields
  keywords?: string[]; // Target keywords for this machine
  localKeywords?: string[]; // Location-based keywords
  businessKeywords?: string[]; // Business/industry-specific keywords
}

/**
 * Get long-tail keywords for content optimization - FIXED TypeScript compatibility
 * @returns Array of long-tail keywords
 */
export function getLongTailKeywords(): string[] {
  return [
    "commercial vending machine installation Modesto CA",
    "office break room vending solutions Central California",
    "touchscreen snack vending machines for businesses",
    "refrigerated beverage vending machines with contactless payment",
    "professional vending machine service Stockton Fresno",
    "workplace refreshment solutions employee satisfaction",
    "commercial vending equipment supplier Central Valley",
    "business vending machine consultation free estimate",
  ];
}

/**
 * Search vending machines by keywords for SEO optimization - FIXED
 * @param searchTerm Search term to match against machine data
 * @returns Array of machines matching the search term
 */
export const searchVendingMachines = (searchTerm: string): MachineData[] => {
  const term = searchTerm.toLowerCase();
  return Object.values(vendingMachineData).filter(machine => {
    // Fixed: Handle both string and array types safely
    const bestForArray = Array.isArray(machine.bestFor) 
      ? machine.bestFor 
      : [machine.bestFor];
    
    const searchableText = [
      machine.name,
      machine.shortDescription,
      machine.description,
      ...(machine.keywords || []),
      ...(machine.localKeywords || []),
      ...(machine.businessKeywords || []),
      ...bestForArray, // Now safely spread as array
      ...machine.productOptions,
    ].join(' ').toLowerCase();
    
    return searchableText.includes(term);
  });
};

/**
 * Get machines by business type for targeted SEO - FIXED
 * @param businessType Business type (e.g., "office", "school", "hospital")
 * @returns Array of machines suitable for the business type
 */
export const getMachinesByBusinessType = (businessType: string): MachineData[] => {
  const businessTerm = businessType.toLowerCase();
  return Object.values(vendingMachineData).filter(machine => {
    const businessKeywords = machine.businessKeywords || [];
    
    // Fixed: Handle both string and array types safely
    const bestForText = Array.isArray(machine.bestFor) 
      ? machine.bestFor.join(' ').toLowerCase()
      : machine.bestFor.toLowerCase();
    
    return businessKeywords.some(keyword => 
      keyword.toLowerCase().includes(businessTerm)
    ) || bestForText.includes(businessTerm);
  });
};

/**
 * Normalize machine data for the MachineCard component - FIXED
 * @param machine - Raw machine data from the database/file
 * @returns Normalized machine data or null if invalid
 */
export const normalizeMachineData = (machine: MachineData | undefined) => {
  if (!machine) {
    console.warn("Machine data is undefined, skipping normalization");
    return null;
  }

  // Safely extract image with SEO-optimized fallback
  const image = machine.images?.[0]?.src || "/images/vending-machines/placeholder-vending-machine.webp";

  // Safely handle dimensions conversion
  let dimensions: string;
  if (typeof machine.dimensions === "string") {
    dimensions = machine.dimensions;
  } else if (Array.isArray(machine.dimensions)) {
    dimensions = machine.dimensions
      .map((d: { label: any; value: any }) => `${d.label}: ${d.value}`)
      .join(", ");
  } else {
    dimensions = "Professional vending machine dimensions available";
  }

  // Fixed: Safely handle bestFor conversion with proper type checking
  let bestFor: string;
  if (typeof machine.bestFor === "string") {
    bestFor = machine.bestFor;
  } else if (Array.isArray(machine.bestFor)) {
    bestFor = machine.bestFor.join(", ");
  } else {
    bestFor = "Suitable for offices, schools, hospitals, and commercial locations";
  }

  // Safely handle highlights - create from features if not present
  const highlights =
    machine.highlights ||
    machine.features?.slice(0, 4).map((f: { title: any }) => f.title) ||
    [
      "Professional Installation Service",
      "Complete Maintenance Package", 
      "Advanced Payment Technology",
      "24/7 Technical Support"
    ];

  // Generate model field for display purposes
  const model = machine.id.toUpperCase().replace(/-/g, '-');

  return {
    ...machine,
    model,
    image,
    dimensions,
    bestFor,
    highlights,
  };
};

/**
 * Utility functions for accessing vending machine data
 * Enhanced with SEO considerations for search optimization
 */

/**
 * Get all vending machines
 * @returns Array of all vending machine data with SEO optimization
 */
export const getAllVendingMachines = (): MachineData[] => {
  return Object.values(vendingMachineData);
};

/**
 * Get a specific vending machine by SEO-friendly ID
 * @param id SEO-friendly machine ID (e.g., "refrigerated-touchscreen-vending-machine")
 * @returns Machine data or undefined if not found
 */
export const getVendingMachineById = (id: string): MachineData | undefined => {
  return vendingMachineData[id];
};

/**
 * Get vending machines by category with SEO-optimized results
 * @param category Machine category ('refrigerated' or 'non-refrigerated')
 * @returns Array of matching vending machines
 */
export const getVendingMachinesByCategory = (
  category: 'refrigerated' | 'non-refrigerated'
): MachineData[] => {
  return Object.values(vendingMachineData).filter(
    machine => machine.category === category
  );
};

/**
 * Get featured vending machines for SEO landing pages
 * @param count Number of featured machines to return
 * @returns Array of featured vending machines optimized for search visibility
 */
export const getFeaturedVendingMachines = (count: number = 2): MachineData[] => {
  // Featured machines prioritized for SEO and business value
  const featuredIds = [
    'premium-snack-vending-machine-touchscreen',
    'refrigerated-touchscreen-vending-machine'
  ];
  return featuredIds
    .map(id => vendingMachineData[id])
    .filter(machine => machine !== undefined)
    .slice(0, count);
};


/**
 * Get SEO-optimized machine URLs for sitemap generation
 * @returns Array of SEO-friendly URLs for all machines
 */
export const getMachineUrls = (): string[] => {
  return Object.keys(vendingMachineData).map(id => `/vending-machines/${id}`);
};

/**
 * Get machines by location-based keywords for local SEO
 * @param location Location term (e.g., "Modesto", "Central California")
 * @returns Array of machines optimized for local search
 */
export const getMachinesByLocation = (location: string): MachineData[] => {
  const locationTerm = location.toLowerCase();
  return Object.values(vendingMachineData).filter(machine => {
    const localKeywords = machine.localKeywords || [];
    return localKeywords.some(keyword => 
      keyword.toLowerCase().includes(locationTerm)
    );
  });
};

/**
 * SEO-Optimized Vending Machine Data Collection
 * Machine IDs and names strategically chosen for search visibility
 * Targeting keywords: vending machine, office vending, commercial vending, etc.
 */
const vendingMachineData: Record<string, MachineData> = {

  "vendo-821-v21-blue-refresh-high-capacity": {
    id: "vendo-821-v21-blue-refresh-high-capacity",
    name: "Vendo 821 V21 Blue Refresh High-Capacity Beverage Machine",
    image: "/images/machines/refrigerated-vending-machine-blue-refresh.webp",
    seoTitle: "Vendo 821 V21 Blue Refresh - High-Capacity Commercial Vending Machine",
    metaDescription: "Professional Vendo 821 V21 Blue Refresh vending machine with 800 can capacity, LED lighting, and live display. Perfect for high-traffic commercial locations.",
    shortDescription: "High-capacity commercial beverage vending machine with live display and 800 can capacity",
    description: `The Vendo 821 V21 Blue Refresh represents the pinnacle of high-capacity commercial vending technology. 
      Designed specifically for high-volume locations, this machine combines exceptional capacity with reliable performance 
      and energy-efficient operation. Featuring a sophisticated live display system that eliminates the need for product 
      labels, customers can see exactly what's available through the transparent product windows. With the ability to hold 
      up to 800 12-oz cans across 10 selections, this machine is ideal for busy workplaces, hospitals, universities, and 
      other high-traffic commercial environments where consistent beverage availability is crucial.`,
    
    images: [
      {
        id: 1,
        src: "/images/machines/refrigerated-vending-machine-blue-refresh.webp",
        alt: "Vendo 821 V21 Blue Refresh high-capacity vending machine front view with LED lighting"
      },
      // {
      //   id: 2,
      //   src: "/images/machines/vending-machine-card-reader-detail-01.webp",
      //        alt: "Close-up view of bill insert slot and touchscreen display on premium snack vending machine with cash payment system",
      // },
      // {
      //   id: 3,
      //   src: "/images/machines/vending-machine-products-display-01.webp",
      //   alt: "Interior product display showing 50+ snack selections in premium touchscreen vending machine for workplace break rooms",
      // },
    ],

    // Comprehensive technical specifications
    specifications: [
      {
        category: "Capacity & Selections",
        items: [
          { label: "Product Selections", value: "10 selections" },
          { label: "12 oz Can Capacity", value: "800 cans total" },
          { label: "20 oz Bottle Capacity", value: "360 bottles total" },
          { label: "24 oz Bottle Capacity", value: "300 bottles total" },
          { label: "Display Type", value: "Live product display (no labels required)" }
        ]
      },
      {
        category: "Physical Dimensions",
        items: [
          { label: "Height", value: '72" (183 cm)' },
          { label: "Width", value: '32.5" (83 cm)' },
          { label: "Depth", value: '31.5" (80 cm)' },
          { label: "Shipping Weight", value: "680 lbs (308 kg)" },
          { label: "Operating Weight", value: "750 lbs (340 kg) fully loaded" }
        ]
      },
      {
        category: "Electrical & Power",
        items: [
          { label: "Power Requirements", value: "115 VAC, 60 Hz" },
          { label: "Current Draw", value: "12 amps maximum" },
          { label: "Energy Efficiency", value: "LED lighting system" },
          { label: "Refrigeration", value: "R134a refrigerant system" },
          { label: "Temperature Range", value: "35°F - 42°F (2°C - 6°C)" }
        ]
      },
      {
        category: "Control Systems",
        items: [
          { label: "Controller", value: "V21 full function MDB controller" },
          { label: "Display Options", value: ["Red LED display", "LCD dual-line display"] },
          { label: "Telemetry Support", value: "DEX/UCS and wireless compatible" },
          { label: "Payment Systems", value: "MDB interface, credit card capable" },
          { label: "Recycler Compatible", value: "Yes, with proper adapter" }
        ]
      },
      {
        category: "Vending Mechanisms",
        items: [
          { label: "Vend System", value: "Self-priming vend mechanisms" },
          { label: "Product Loading", value: "Flexible shimless loading system" },
          { label: "Vend Motor", value: "24V, 1 amp metal casing motor" },
          { label: "Control Boards", value: "Interchangeable for easy service" },
          { label: "Vend Reliability", value: "Commercial-grade mechanisms" }
        ]
      }
    ],

    // Key product features highlighting commercial benefits
    features: [
      {
        title: "High-Volume Capacity",
        description: "Holds up to 800 12-oz cans across 10 selections, perfect for high-traffic locations with consistent demand",
        icon: "package"
      },
      {
        title: "Live Product Display", 
        description: "No product labels needed - customers see actual products through transparent display windows",
        icon: "eye"
      },
      {
        title: "Energy-Efficient LED Lighting",
        description: "Modern LED lighting system reduces energy consumption while providing excellent product visibility",
        icon: "zap"
      },
      {
        title: "Flexible Product Loading",
        description: "Shimless loading system accommodates bottles, cans, and cartons for optimal product mix",
        icon: "settings"
      },
      {
        title: "Self-Priming Vend Mechanisms",
        description: "Advanced vending technology ensures reliable product delivery with minimal maintenance",
        icon: "gear"
      },
      {
        title: "MDB Payment Integration",
        description: "Full MDB interface supports modern payment systems including credit cards and mobile payments",
        icon: "credit-card"
      },
      {
        title: "Superior Refrigeration",
        description: "Advanced refrigeration system maintains optimal temperature while maximizing energy efficiency",
        icon: "thermometer"
      },
      {
        title: "Easy Service Access",
        description: "Interchangeable control boards and accessible design simplify maintenance and repairs",
        icon: "wrench"
      }
    ],

    // Product compatibility and options
    productOptions: [
      "12 oz aluminum cans (Coca-Cola, Pepsi, energy drinks)",
      "16 oz plastic bottles (water, sports drinks)",
      "20 oz plastic bottles (sodas, juices)",
      "24 oz bottles (premium beverages)",
      "Energy drinks and specialty beverages", 
      "Mixed product configurations available"
    ],

    // Target market and optimal use cases
    bestFor: [
      "High-traffic office buildings and corporate campuses",
      "Hospitals and medical facilities with 24/7 operations", 
      "Universities and educational institutions",
      "Manufacturing facilities and industrial sites",
      "Hotels and hospitality venues",
      "Government buildings and public facilities",
      "Transportation hubs (airports, train stations)",
      "Large retail locations and shopping centers",
      "Sports and recreation facilities",
      "Any location requiring consistent high-volume beverage service"
    ],

    // SEO-optimized related machine suggestions
    relatedMachines: [
      {
        id: "premium-snack-vending-machine-touchscreen",
        name: "Premium Snack Vending Machine with Touchscreen", 
        image: "/images/machines/amp-premium-touchscreen-vending-machine.webp"
      },
      {
        id: "refrigerated-touchscreen-vending-machine",
        name: "Refrigerated Touchscreen Vending Machine",
        image: "/images/machines/amp-refrigerated-vending-machine.webp"
      },
    ],

    category: "refrigerated" as const,

    // Machine highlights for quick reference
    highlights: [
      "Highest Capacity Available - 800 Can Storage",
      "Live Display Technology - No Labels Required", 
      "Energy-Efficient LED Lighting System",
      "Professional Installation & Maintenance Included",
      "MDB Payment System Integration Ready",
      "Commercial-Grade Reliability & Performance"
    ],

    // SEO keyword optimization
    keywords: [
      "high capacity vending machine",
      "commercial beverage vending machine", 
      "vendo 821 v21 blue refresh",
      "office beverage machine",
      "hospital vending machine",
      "university vending machine",
      "live display vending machine"
    ],

    // Local SEO targeting
    localKeywords: [
      "commercial vending machine Modesto CA",
      "high capacity beverage machine Central California", 
      "office vending service Central Valley",
      "hospital vending machine Northern California"
    ],

    // Business-focused keywords
    businessKeywords: [
      "workplace beverage solutions",
      "commercial vending service",
      "high-volume vending machine rental",
      "office beverage program",
      "employee break room vending"
    ],

    // Physical dimensions for space planning
    dimensions: [
      { label: "Height", value: '72" (6 feet)' },
      { label: "Width", value: '32.5" (2.7 feet)' },
      { label: "Depth", value: '31.5" (2.6 feet)' },
      { label: "Clearance Required", value: "6 inches on sides, 12 inches on back" },
      { label: "Door Swing", value: "Right-hand opening, 36 inches clearance needed" }
    ]
  },

  
  // Premium Snack Vending Machine with Touchscreen
  "premium-snack-vending-machine-touchscreen": {
    id: "premium-snack-vending-machine-touchscreen",
    name: "Premium Snack Vending Machine with Touchscreen",
    image: "/images/machines/amp-premium-touchscreen-vending-machine.webp",
    seoTitle: "Commercial Snack Vending Machine with 21.5\" Touchscreen | AMP Vending",
    metaDescription: "Premium snack vending machine with large touchscreen display for offices and businesses. 50+ product options with professional installation in Modesto, CA.",
    shortDescription: "Advanced snack vending machine featuring a large 21.5\" HD touchscreen display, designed for high-capacity snack and convenience item dispensing in commercial environments.",
    description: "Our premium snack vending machine with touchscreen technology represents the pinnacle of commercial vending solutions. Featuring a stunning 21.5\" HD touchscreen interface and capacity for 50+ different snack products, this machine delivers an exceptional user experience while maximizing your product variety. Perfect for offices, schools, hospitals, and high-traffic commercial locations throughout Central California. Professional installation and comprehensive maintenance ensure reliable operation and customer satisfaction.",
    images: [
      {
        id: 1,
        src: "/images/machines/amp-premium-touchscreen-vending-machine.webp",
        alt: "Premium commercial snack vending machine with 21.5 inch touchscreen for offices and businesses in Central California",
      },
      //  {
      //   id: 2,
      //   src: "/images/machines/refrigerated-vending-machine-front-angle-view-01.webp",
      //   alt: "Angled front view of refrigerated touchscreen vending machine displaying payment options and product visibility",
      // },
      // {
      //   id: 3,
      //    src: "/images/machines/amp-vending-machines-touchscreen.webp",
      //   alt: "Side angle view of commercial refrigerated vending machine showing compact design for office spaces",
      // },
      // {
      //   id: 4,
      //   src: "/images/machines/vending-machine-open-push-door-close-up-01.webp",
      //   alt: "Close-up of product retrieval door on commercial snack vending machine with secure push-open mechanism",
      // },
      //      {
      //   id: 5,
      //   src: "/images/machines/vending-machine-cash-insert-slot-01.webp",
      //   alt: "Cash payment slot with bill validator on touchscreen vending machine accepting all denominations for office snacks",
      // },
    ],
    dimensions: [
      { label: "Width", value: "50 inches (127 cm)" },
      { label: "Depth", value: "30.2 inches (77 cm)" },
      { label: "Height", value: "76.7 inches (195 cm)" },
      { label: "Weight", value: "700 lbs (318 kg)" },
      { label: "Capacity", value: "50+ product selections" },
      { label: "Power", value: "120V / 60Hz" },
    ],
    features: [
      {
        title: '21.5" Commercial HD Touchscreen Display',
        description: "Large interactive high-definition touchscreen with intuitive navigation enhances customer experience and showcases your snack products with vibrant graphics and easy selection.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>',
      },
      {
        title: "Comprehensive Payment Processing System",
        description: "Integrated payment system accepts all major credit/debit cards, mobile payments (Apple Pay, Google Pay, Samsung Pay), and traditional cash for maximum customer convenience.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>',
      },
      {
        title: "Advanced Bill Recycler Technology",
        description: "State-of-the-art cash handling system uses accepted bills for change dispensing, reducing service calls and ensuring customers always receive proper change for their purchases.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75c.414 0 .75.336.75.75v.75m0 0H18a2.25 2.25 0 002.25-2.25V4.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 4.5m10.5-1.5h.75c.414 0 .75.336.75.75v.75M3 18.75v.75c0 .414.336.75.75.75h.75M3.75 18h16.5m-16.5 0h-.75a.75.75 0 01-.75-.75v-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25" /></svg>',
      },
      {
        title: "Adjustable Product Spiral Configuration",
        description: "Customizable product spirals accommodate various snack sizes from small candy bars to large bags of chips, maximizing your product offering flexibility and revenue potential.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
      },
      {
        title: "Cloud-Based Inventory Management",
        description: "Real-time cloud monitoring provides detailed analytics on product levels, sales patterns, and machine performance, enabling data-driven restocking and product optimization decisions.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>',
      },
      {
        title: "Energy-Efficient Commercial Operation",
        description: "Optimized power consumption with energy-saving LED lighting and intelligent standby modes that reduce electrical usage during low-traffic periods while maintaining product quality.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>',
      },
    ],
    specifications: [
      {
        category: "Physical Specifications",
        items: [
          { label: "Dimensions", value: '50"W x 30.2"D x 76.7"H' },
          { label: "Weight", value: "700 lbs (318 kg)" },
          { label: "Cabinet Construction", value: "Commercial-grade powder-coated steel" },
          { label: "Front Glass", value: "Triple-pane heated glass with anti-glare coating" },
          { label: "Insulation", value: "High-efficiency thermal insulation" },
        ],
      },
      {
        category: "Capacity & Configuration",
        items: [
          { label: "Product Selections", value: "50+ different snack and convenience products" },
          { label: "Spirals", value: "Adjustable spirals for various product sizes" },
          { label: "Maximum Products", value: "Up to 500+ items depending on product configuration" },
        ],
      },
      {
        category: "Technology Features",
        items: [
          { label: "Display", value: '21.5" HD touchscreen with multi-touch capability' },
          { label: "Controller", value: "Advanced commercial microprocessor system" },
          { label: "Connectivity", value: "4G LTE cellular, Wi-Fi wireless, Ethernet" },
          { label: "Remote Monitoring", value: "Real-time inventory tracking and diagnostic alerts" },
        ],
      },
      {
        category: "Payment Systems",
        items: [
          { label: "Card Reader", value: "EMV chip compliant with contactless NFC" },
          { label: "Mobile Payments", value: "Apple Pay, Google Pay, Samsung Pay support" },
          { label: "Cash Handling", value: "Bill recycler system for $1-$100 denominations" },
          { label: "Coin Mechanism", value: "Multi-coin acceptor with precise change dispensing" },
        ],
      },
      {
        category: "Electrical Requirements",
        items: [
          { label: "Power Requirements", value: "120V AC, 60Hz standard commercial power" },
          { label: "Power Consumption", value: "Average 4.5 kWh/day energy efficient operation" },
          { label: "Lighting", value: "Energy-efficient LED lighting with motion sensors" },
          { label: "Certifications", value: "UL Listed, Energy Star qualified for commercial use" },
        ],
      },
    ],
    productOptions: [
      "Premium chips and savory snacks (Lays, Doritos, Cheetos)",
      "Candy and chocolate bars (Snickers, Kit Kat, M&Ms)",
      "Cookies and pastries (Oreos, Pop-Tarts, pastries)",
      "Crackers and pretzels (variety pack options)",
      "Nuts and trail mixes (healthy snack alternatives)",
      "Granola and protein bars (fitness-focused options)",
      "Dried fruits and jerky (premium snack choices)",
      "Mints and gum (fresh breath products)",
      "Energy bars and nutrition supplements",
      "Popcorn varieties and corn-based snacks",
      "Rice cakes and corn cakes (health-conscious options)",
      "Instant noodles and cup soups",
      "Cereal bars and breakfast items",
      "Fruit snacks and gummies",
      "Gluten-free snack options",
      "Vegan snack choices",
      "Organic selections and natural products",
      "International snacks and specialty items",
      "Seasonal specialty items and limited editions",
      "Personal care items and convenience products",
    ],
    bestFor: [
      "Large corporate offices and business complexes",
      "Schools, universities, and educational institutions",
      "Manufacturing facilities and industrial locations",
      "Hospitals and healthcare facilities",
      "Retail locations and shopping centers",
      "Transportation hubs (airports, train stations)",
      "Government buildings and public facilities",
      "Conference centers and event venues",
      "High-traffic public areas and lobbies",
      "24/7 facilities and round-the-clock operations",
    ],
    relatedMachines: [
      {
        id: "vendo-821-v21-blue-refresh-high-capacity",
        name: "Vendo 821 V21 Blue Refresh High-Capacity Beverage Machine",
        image: "/images/machines/refrigerated-vending-machine-blue-refresh.webp",
      },
      {
        id: "refrigerated-touchscreen-vending-machine",
        name: "Refrigerated Touchscreen Vending Machine",
        image: "/images/machines/amp-refrigerated-vending-machine.webp",
      },
      {
        id: "compact-office-refrigerated-vending-machine",
        name: "Compact Office Refrigerated Vending Machine",
        image: "/images/machines/compact-refrigerated-vending-machine.webp",
      },
      {
        id: "commercial-snack-vending-machine",
        name: "Commercial Snack Vending Machine",
        image: "/images/machines/standard-non-refrigerated.webp",
      },
    ],
    category: "non-refrigerated",
    highlights: [
      '21.5" Commercial HD Touchscreen Display',
      "Comprehensive Payment Processing System",
      "50+ Snack Product Capacity",
      "Professional Installation & Maintenance Service",
    ],
    keywords: [
      "snack vending machine",
      "touchscreen vending machine",
      "commercial vending machine",
      "office snack machine",
      "large capacity vending machine"
    ],
    localKeywords: [
      "snack vending machine Modesto CA",
      "office vending Central California",
      "commercial snack machine Central Valley"
    ],
    businessKeywords: [
      "employee snack solutions",
      "workplace convenience vending",
      "business snack machine service",
      "office break room vending"
    ],
  },

 // Premium Refrigerated Touchscreen Vending Machine
  "refrigerated-touchscreen-vending-machine": {
    id: "refrigerated-touchscreen-vending-machine",
    name: "Refrigerated Touchscreen Vending Machine",
    image: "/images/machines/amp-refrigerated-vending-machine.webp",
    seoTitle: "Commercial Refrigerated Vending Machine with Touchscreen | AMP Vending",
    metaDescription: "Premium refrigerated vending machine with touchscreen technology for offices, schools, and commercial spaces. Professional installation and maintenance included in Modesto, CA.",
    shortDescription: "Advanced refrigerated vending machine with touchscreen interface, designed for high-traffic commercial locations requiring fresh beverages and food options.",
    description: "Our premium refrigerated touchscreen vending machine combines cutting-edge technology with reliable refrigeration for businesses that demand the best. Featuring energy-efficient cooling systems and modern payment processing, this commercial-grade vending solution is perfect for offices, schools, hospitals, and retail locations throughout Central California. Professional installation and complete maintenance service ensure your vending machine operates smoothly while enhancing workplace satisfaction.",
    images: [
      {
        id: 1,
        src: "/images/machines/amp-refrigerated-vending-machine.webp",
        alt: "Commercial refrigerated touchscreen vending machine for offices and businesses in Modesto California",
      },
      // {
      //   id: 2,
      //   src: "/images/machines/refrigerated-vending-machine-front-view-01.webp",
      //   alt: "Front view of commercial refrigerated vending machine with full glass display showing beverage selection for office break rooms",
      // },
      // {
      //   id: 3,
      //   src: "/images/machines/refrigerated-combo-vending-machine-payment-angle-view-01.webp",
      //   alt: "Angled view of refrigerated combo vending machine showing card reader and payment system interface"
      // },
      // {
      //   id: 4,
      //   src: "/images/machines/refrigerated-combo-vending-machine-keypad-display-01.webp",
      //     alt: "Detailed view of card reader and contactless payment system on commercial snack vending machine for offices"
      // },
      // {
      //   id: 5,
      //   src: "/images/machines/refrigerated-vending-machine-full-angle-view-01.webp",
      //     alt: "Coin insert mechanism on combo vending machine accepting quarters, dimes, and nickels for payments"
      // },
      // {
      //   id: 6,
      //   src: "/images/machines/vending-machine-angle-view-cooling-system-01.webp",
      //        alt: "Interior beverage selection display in commercial refrigerated vending machine showing drink variety and capacity",
      // },
    ],
    dimensions: [
      { label: "Width", value: "40.4 inches (103 cm)" },
      { label: "Depth", value: "31 inches (79 cm)" },
      { label: "Height", value: "76.7 inches (195 cm)" },
      { label: "Weight", value: "650 lbs (295 kg)" },
      { label: "Capacity", value: "40+ product selections" },
      { label: "Power", value: "120V / 60Hz" },
    ],
    features: [
      {
        title: "Energy-Efficient Commercial Refrigeration",
        description: "Advanced refrigeration system maintains optimal temperature for beverages and fresh food while minimizing power consumption, reducing operational costs for your business.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>',
      },
      {
        title: "Smart Inventory Management System",
        description: "Real-time monitoring tracks product levels and purchase patterns, automatically optimizing restocking schedules to ensure your vending machine never runs empty.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>',
      },
      {
        title: "Multiple Payment Processing Options",
        description: "Accept credit cards, debit cards, mobile payments (Apple Pay, Google Pay), and cash, ensuring maximum convenience for employees and customers.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.75c.414 0 .75.336.75.75v.75m0 0H18a2.25 2.25 0 002.25-2.25V4.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 4.5m10.5-1.5h.75c.414 0 .75.336.75.75v.75M3 18.75v.75c0 .414.336.75.75.75h.75M3.75 18h16.5m-16.5 0h-.75a.75.75 0 01-.75-.75v-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25" /></svg>',
      },
      {
        title: "Adjustable Product Configuration",
        description: "Configurable shelf system accommodates various beverage and food sizes, from water bottles to fresh sandwiches, maximizing your product selection options.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
      },
      {
        title: "Remote Diagnostic Monitoring",
        description: "Advanced monitoring system alerts our service technicians to potential issues before they impact your business, ensuring maximum uptime and customer satisfaction.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>',
      },
      {
        title: "Energy-Saving Commercial Design",
        description: "Intelligent power management reduces electricity consumption during low-traffic periods while maintaining optimal product freshness, lowering your operational costs.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>',
      },
    ],
    specifications: [
      {
        category: "Physical Specifications",
        items: [
          { label: "Dimensions", value: '40.4"W x 31"D x 76.7"H' },
          { label: "Weight", value: "650 lbs (295 kg)" },
          { label: "Cabinet Construction", value: "Commercial-grade powder-coated steel" },
          { label: "Front Glass", value: "Tempered safety glass with anti-glare coating" },
          { label: "Insulation", value: "Energy-efficient foam insulation" },
        ],
      },
      {
        category: "Capacity & Configuration",
        items: [
          { label: "Product Selections", value: "40+ different beverages and food items" },
          { label: "Shelving", value: "5 adjustable refrigerated shelves" },
          { label: "Maximum Products", value: "Up to 360 items depending on product size" },
        ],
      },
      {
        category: "Technology Features",
        items: [
          { label: "Display", value: '7" LCD touchscreen interface' },
          { label: "Controller", value: "Commercial microprocessor control system" },
          { label: "Connectivity", value: "4G LTE cellular, Wi-Fi wireless option" },
          { label: "Remote Monitoring", value: "Real-time inventory tracking and diagnostic alerts" },
        ],
      },
      {
        category: "Payment Systems",
        items: [
          { label: "Card Reader", value: "EMV chip compliant credit/debit processing" },
          { label: "Contactless", value: "NFC mobile payment capability (Apple Pay, Google Pay)" },
          { label: "Cash Handling", value: "Bill acceptor for $1-$20 denominations" },
          { label: "Coin Mechanism", value: "Multi-coin acceptor with automatic change dispensing" },
        ],
      },
      {
        category: "Refrigeration System",
        items: [
          { label: "Cooling System", value: "Energy-efficient commercial compressor" },
          { label: "Temperature Range", value: "35°F to 41°F (1.7°C to 5°C)" },
          { label: "Defrost System", value: "Automatic cycle defrost technology" },
          { label: "Refrigerant", value: "R290 environmentally friendly refrigerant" },
        ],
      },
      {
        category: "Electrical Requirements",
        items: [
          { label: "Power Requirements", value: "120V AC, 60Hz standard commercial power" },
          { label: "Power Consumption", value: "Average 7.2 kWh/day energy efficient operation" },
          { label: "Lighting", value: "LED interior lighting with automatic sensors" },
          { label: "Certifications", value: "UL Listed, Energy Star qualified for commercial use" },
        ],
      },
    ],
    productOptions: [
      "Bottled water and premium sparkling water",
      "Soft drinks and sodas (Coca-Cola, Pepsi products)",
      "Energy drinks and coffee beverages",
      "Sports drinks and fitness beverages",
      "Milk-based beverages and protein drinks",
      "Yogurt cups and dairy products",
      "Fresh sandwiches and wraps",
      "Fresh salads and healthy meal options",
      "Ready-to-eat meals and snacks",
      "Protein bars and nutrition bars",
      "Healthy snack alternatives",
      "Fresh fruit cups and produce",
    ],
    bestFor: [
      "Corporate offices and business centers",
      "Educational facilities and schools",
      "Healthcare facilities and hospitals",
      "Retail locations and shopping centers",
      "Fitness centers and gyms",
      "Hotel lobbies and hospitality venues",
      "Community centers and government buildings",
      "High-traffic public areas",
      "Employee break rooms and cafeterias",
      "Medical waiting areas and clinics",
    ],
    relatedMachines: [
      {
        id: "vendo-821-v21-blue-refresh-high-capacity",
        name: "Vendo 821 V21 Blue Refresh High-Capacity Beverage Machine",
        image: "/images/machines/refrigerated-vending-machine-blue-refresh.webp",
      },
      {
        id: "premium-snack-vending-machine-touchscreen",
        name: "Premium Snack Vending Machine with Touchscreen",
        image: "/images/machines/amp-premium-touchscreen-vending-machine.webp",
      },
      {
        id: "compact-office-refrigerated-vending-machine",
        name: "Compact Office Refrigerated Vending Machine",
        image: "/images/machines/compact-refrigerated-vending-machine.webp",
      },
      {
        id: "commercial-snack-vending-machine",
        name: "Commercial Snack Vending Machine",
        image: "/images/machines/standard-refrigerated-vending-machine.webp",
      },
    ],
    category: "refrigerated",
    highlights: [
      "Energy-Efficient Commercial Refrigeration",
      "Multiple Payment Processing Options",
      "40+ Beverage & Food Product Capacity",
      "Professional Installation & Maintenance Service",
    ],
    keywords: [
      "refrigerated vending machine",
      "commercial vending machine",
      "office vending machine",
      "touchscreen vending machine",
      "beverage vending machine"
    ],
    localKeywords: [
      "vending machine Modesto CA",
      "commercial vending Central California",
      "office vending machine Central Valley"
    ],
    businessKeywords: [
      "workplace vending solutions",
      "employee break room vending",
      "business vending machine service",
      "commercial refreshment solutions"
    ],
  },
};

export default vendingMachineData;

/**
 * ============================================================================
 * CUSTOM VENDING MACHINE REQUEST SECTION
 * ============================================================================
 * Separate from standard machine inventory - this is a service offering
 * for businesses requiring custom vending solutions
 */

export interface CustomMachineRequestData {
  id: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  metaDescription: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
  structuredData: {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    provider: {
      "@type": string;
      name: string;
      areaServed: string;
    };
    serviceType: string;
    availableChannel: {
      "@type": string;
      serviceUrl: string;
    };
  };
  heroSection: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    image: string;
    imageAlt: string;
  };
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  customizationOptions: Array<{
    category: string;
    options: string[];
  }>;
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  idealFor: string[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    location: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  keywords: string[];
  localKeywords: string[];
}

export const customMachineRequest: CustomMachineRequestData = {
  id: "custom-vending-machine-request",
  title: "Request Your Custom Vending Machine",
  subtitle: "Brand New Machines Tailored to Your Exact Business Needs",

  // SEO Optimization for Search Results
  seoTitle: "Custom Vending Machine Solutions | Order New Machines | AMP Vending Modesto CA",
  metaDescription: "Can't find the perfect vending machine? AMP Vending orders brand new commercial machines customized to your specifications. Touchscreen, refrigerated, high-capacity - we source it all. Serving Central California businesses.",

  // Open Graph for Social Media Sharing
  openGraphTitle: "Custom Vending Machines Tailored to Your Business | AMP Vending",
  openGraphDescription: "Need something unique? We'll order a brand new vending machine built to your exact specifications - any capacity, features, or requirements.",
  openGraphImage: "/images/machines/standard-non-refrigerated.webp",

  // Structured Data for Rich Search Results
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Vending Machine Consultation & Procurement",
    description: "Professional consultation and procurement service for businesses requiring custom commercial vending machines tailored to specific requirements",
    provider: {
      "@type": "LocalBusiness",
      name: "AMP Vending Machines",
      areaServed: "Central California, Modesto, Stockton, Fresno, Turlock"
    },
    serviceType: "Commercial Vending Machine Consultation",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://ampvendingmachines.com/custom-request"
    }
  },

  // Hero Section Content
  heroSection: {
    headline: "Can't Find Exactly What You Need?",
    subheadline: "We'll source and order a brand new vending machine built precisely to your specifications",
    ctaText: "Request Your Custom Machine",
    ctaLink: "/contact",
    image: "/images/machines/standard-non-refrigerated.webp",
    imageAlt: "Custom commercial vending machine solutions for Central California businesses"
  },

  // Key Benefits
  benefits: [
    {
      title: "Fully Customized to Your Needs",
      description: "Tell us your exact requirements - capacity, product types, payment systems, dimensions, or special features - and we'll source a brand new machine built precisely to your specifications.",
      icon: "customize"
    },
    {
      title: "Brand New Factory-Direct Machines",
      description: "We order premium commercial-grade vending machines directly from leading manufacturers, ensuring you receive the latest technology, features, and full warranty coverage.",
      icon: "new"
    },
    {
      title: "Expert Consultation & Guidance",
      description: "Our experienced team guides you through the selection process, recommending machines that perfectly match your space, budget, traffic patterns, and product preferences.",
      icon: "consultation"
    },
    {
      title: "Access to Premium Manufacturers",
      description: "Benefit from our established relationships with top vending machine manufacturers, giving you access to models and features that may not be readily available elsewhere.",
      icon: "premium"
    },
    {
      title: "Complete Turnkey Service",
      description: "From initial consultation and machine procurement to professional installation, product stocking, and ongoing maintenance - we handle everything.",
      icon: "turnkey"
    },
    {
      title: "Flexible Options for Every Budget",
      description: "Whether you're looking for economy models or premium high-capacity machines with the latest features, we'll find options that fit your budget without compromising quality.",
      icon: "budget"
    }
  ],

  // Customization Options Available
  customizationOptions: [
    {
      category: "Capacity & Size",
      options: [
        "Compact 20-30 selection models for small spaces",
        "Standard 40-50 selection machines for medium traffic",
        "High-capacity 60+ selection machines for high-volume locations",
        "Custom dimensions to fit specific space constraints",
        "ADA-compliant models for accessibility requirements"
      ]
    },
    {
      category: "Cooling & Temperature Control",
      options: [
        "Non-refrigerated for shelf-stable products",
        "Refrigerated for beverages and fresh food",
        "Frozen food capable machines",
        "Dual-temperature zones (refrigerated + frozen)",
        "Energy-efficient climate control systems"
      ]
    },
    {
      category: "Payment & Technology",
      options: [
        "Touchscreen displays with customizable branding",
        "Credit/debit card readers (EMV chip compliant)",
        "Contactless mobile payments (Apple Pay, Google Pay)",
        "Cash accepting with bill recyclers",
        "Cashless-only configurations",
        "Real-time inventory monitoring and alerts",
        "Remote telemetry and diagnostic capabilities"
      ]
    },
    {
      category: "Special Features",
      options: [
        "Custom exterior wraps and company branding",
        "Outdoor-rated weatherproof machines",
        "Specialized product configurations (electronics, PPE, etc.)",
        "Combination snack and beverage machines",
        "Micro-market solutions for larger break rooms",
        "Enhanced security features and locks",
        "Extended product display windows"
      ]
    }
  ],

  // The Process - How It Works
  process: [
    {
      step: 1,
      title: "Initial Consultation",
      description: "Tell us about your business needs, space constraints, budget, and desired features. We'll ask the right questions to understand exactly what you're looking for."
    },
    {
      step: 2,
      title: "Custom Recommendations",
      description: "Based on your requirements, we'll research and present options from our network of premium manufacturers, complete with specifications and pricing."
    },
    {
      step: 3,
      title: "Machine Procurement",
      description: "Once you approve the selection, we order your brand new machine directly from the manufacturer, handling all logistics and coordination."
    },
    {
      step: 4,
      title: "Professional Installation",
      description: "Our certified technicians deliver and professionally install your machine, ensuring everything is configured perfectly and operating flawlessly."
    },
    {
      step: 5,
      title: "Stocking & Training",
      description: "We stock your machine with products tailored to your preferences and provide any necessary training on operation and features."
    },
    {
      step: 6,
      title: "Ongoing Support",
      description: "Enjoy comprehensive maintenance, regular restocking, and 24/7 support to keep your vending machine running optimally."
    }
  ],

  // Ideal Use Cases
  idealFor: [
    "Businesses with unique space constraints requiring specific dimensions",
    "Companies needing specialized product selections or niche items",
    "Organizations requiring higher capacity than standard offerings",
    "Locations with specific aesthetic or branding requirements",
    "Businesses seeking the latest vending technology and features",
    "Companies with unique payment processing needs (cashless only, etc.)",
    "Facilities needing outdoor or weatherproof machines",
    "Organizations requiring ADA compliance or accessibility features",
    "Businesses wanting to match specific manufacturer models or brands",
    "Companies that don't see their perfect fit in standard offerings",
    "Forward-thinking businesses wanting cutting-edge vending solutions",
    "Organizations planning expansion needing scalable infrastructure"
  ],

  // FAQ Section
  faq: [
    {
      question: "How long does it take to receive a custom vending machine?",
      answer: "Lead times vary by manufacturer and model, but typically range from 4-8 weeks from order placement to installation. We'll provide specific timelines during consultation based on your chosen machine."
    },
    {
      question: "Is there a minimum order quantity?",
      answer: "No minimum order required. Whether you need one machine or fifty, we'll work with you to procure exactly what your business needs."
    },
    {
      question: "Can you source machines from specific manufacturers?",
      answer: "Absolutely! If you have a preferred manufacturer or specific model in mind, we can work with them. We have relationships with all major vending machine manufacturers."
    },
    {
      question: "What if I'm not sure exactly what I need?",
      answer: "That's what we're here for! Our consultation process is designed to help you identify the perfect solution. We'll assess your space, traffic patterns, product preferences, and budget to recommend the ideal machine."
    },
    {
      question: "Do custom machines come with warranty and support?",
      answer: "Yes! All new machines come with full manufacturer warranties, plus our comprehensive maintenance and support services to ensure optimal performance."
    },
    {
      question: "Can I see the machine before ordering?",
      answer: "While we can't stock every model for preview, we provide detailed specifications, photos, and videos. For larger orders, we may be able to arrange factory tours or demonstrations."
    }
  ],

  // SEO Keywords
  keywords: [
    "custom vending machine",
    "order new vending machine",
    "specialized vending solutions",
    "commercial vending machine consultation",
    "custom commercial vending",
    "tailored vending machines",
    "bespoke vending solutions",
    "vending machine procurement service",
    "request custom vending machine"
  ],

  localKeywords: [
    "custom vending machine Modesto CA",
    "order vending machine Central California",
    "specialized vending Central Valley",
    "commercial vending consultation Modesto",
    "custom vending Stockton Fresno",
    "vending machine service Turlock"
  ]
};

/**
 * Helper function to get custom machine request data
 */
export const getCustomMachineRequestData = (): CustomMachineRequestData => {
  return customMachineRequest;
};
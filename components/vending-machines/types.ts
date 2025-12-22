/**
 * TypeScript Type Definitions
 * Shared types for vending machine showcase components
 */

export interface MachineImage {
  src: string;
  alt: string;
  description: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export interface MachineSpecification {
  name: string;
  value: string;
  icon?: React.ReactNode;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageIndex?: number;
  details: string[];
  ariaLabel?: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  type: 'beverage' | 'energy' | 'snack' | 'candy';
  position: {
    row: number;
    col: number;
  };
  image: string;
  inStock?: boolean;
}

export interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
  stat?: string;
}

export interface VendingMachineData {
  model: string;
  manufacturer: string;
  images: MachineImage[];
  specifications: MachineSpecification[];
  features: Feature[];
  products?: Product[];
  benefits?: Benefit[];
  pricing?: {
    upfrontCost: number;
    revenueShare: number;
  };
}

export interface ImageCarouselProps {
  images: MachineImage[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

export interface FeatureListProps {
  features: Feature[];
  activeFeature: string;
  expandedFeature: string | null;
  onFeatureSelect: (featureId: string) => void;
  onImageChange?: (imageIndex: number) => void;
}

export interface SpecificationGridProps {
  specifications: MachineSpecification[];
  className?: string;
}

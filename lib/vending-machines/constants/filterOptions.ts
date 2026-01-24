/**
 * @fileoverview Filter Options Configuration
 * @module lib/vending-machines/constants/filterOptions
 */

export interface FilterOption {
  id: 'all' | 'refrigerated' | 'non-refrigerated';
  label: string;
  description: string;
}

export const FILTER_OPTIONS: FilterOption[] = [
  {
    id: 'all',
    label: 'All Machines',
    description: 'View all available vending machines'
  },
  {
    id: 'refrigerated',
    label: 'Refrigerated',
    description: 'View refrigerated vending machines for cold beverages'
  },
  {
    id: 'non-refrigerated',
    label: 'Non-Refrigerated',
    description: 'View non-refrigerated vending machines for snacks'
  }
];

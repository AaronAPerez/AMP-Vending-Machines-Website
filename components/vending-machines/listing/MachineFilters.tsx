/**
 * @fileoverview Machine Filters Component
 * @module components/vending-machines/listing/MachineFilters
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

type FilterType = 'all' | 'refrigerated' | 'non-refrigerated';

interface FilterOption {
  id: FilterType;
  label: string;
  count: number;
  description: string;
}

interface MachineFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  filterOptions: FilterOption[];
}

/**
 * Filter controls for machine listing
 */
export const MachineFilters: React.FC<MachineFiltersProps> = ({
  activeFilter,
  onFilterChange,
  filterOptions
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {filterOptions.map((option) => (
        <motion.button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#000000] ${
            activeFilter === option.id
              ? 'bg-[#FD5A1E] text-[#000000] shadow-lg shadow-[#FD5A1E]/30 scale-105'
              : 'bg-[#111111] text-[#F5F5F5] border border-[#333333] hover:border-[#FD5A1E]/50 hover:scale-105'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={option.description}
          aria-pressed={activeFilter === option.id}
        >
          <span className="flex items-center gap-2">
            {option.label}
            <span className="text-xs opacity-70">({option.count})</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
};

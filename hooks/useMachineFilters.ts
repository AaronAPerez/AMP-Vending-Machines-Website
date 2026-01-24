/**
 * @fileoverview Machine Filtering Hook
 * @module hooks/useMachineFilters
 */

'use client';

import { useState, useMemo } from 'react';
import { fetchMachinesByCategory } from '@/lib/vending-machines/data/machineQueries';
import { normalizeMachinesForDisplay } from '@/lib/vending-machines/data/machineTransformers';
import type { MachineData } from '@/lib/data/vendingMachineData';

type FilterType = 'all' | 'refrigerated' | 'non-refrigerated';

interface UseMachineFiltersProps {
  allMachines: MachineData[];
}

interface UseMachineFiltersReturn {
  filteredMachines: any[];
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  isFiltering: boolean;
}

/**
 * Hook for managing machine filtering
 */
export const useMachineFilters = ({
  allMachines
}: UseMachineFiltersProps): UseMachineFiltersReturn => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isFiltering, setIsFiltering] = useState(false);

  const filteredMachines = useMemo(() => {
    if (allMachines.length === 0) return [];

    setIsFiltering(true);

    try {
      let machines: MachineData[];

      if (activeFilter === 'all') {
        machines = allMachines;
      } else {
        machines = fetchMachinesByCategory(activeFilter);
      }

      return normalizeMachinesForDisplay(machines);
    } catch (error) {
      console.error('[useMachineFilters] Error:', error);
      return [];
    } finally {
      setIsFiltering(false);
    }
  }, [activeFilter, allMachines]);

  return {
    filteredMachines,
    activeFilter,
    setActiveFilter,
    isFiltering
  };
};

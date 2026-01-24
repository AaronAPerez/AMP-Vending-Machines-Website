/**
 * @fileoverview Related Machines Hook
 * @module hooks/useRelatedMachines
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchRelatedMachines } from '@/lib/vending-machines/data/machineQueries';
import { normalizeMachinesForDisplay } from '@/lib/vending-machines/data/machineTransformers';
import type { MachineData } from '@/lib/data/vendingMachineData';

interface UseRelatedMachinesReturn {
  relatedMachines: any[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for fetching related machines
 */
export const useRelatedMachines = (
  machine: MachineData | null
): UseRelatedMachinesReturn => {
  const [relatedMachines, setRelatedMachines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    if (!machine || !machine.relatedMachines || machine.relatedMachines.length === 0) {
      setRelatedMachines([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const related = fetchRelatedMachines(machine);
      if (!isMounted.current) return;
      
      const normalized = normalizeMachinesForDisplay(related);
      if (!isMounted.current) return;
      
      setRelatedMachines(normalized);
    } catch (err) {
      console.error('[useRelatedMachines] Error:', err);
      if (!isMounted.current) return;
      setError('Failed to load related machines');
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, [machine?.id]);

  return { relatedMachines, isLoading, error };
};

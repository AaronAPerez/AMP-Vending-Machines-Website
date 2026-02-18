/**
 * @fileoverview Machine Data Management Hook
 * @module hooks/useMachineData
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { normalizeMachinesForDisplay } from '@/lib/vending-machines/data/machineTransformers';
import { HybridDataService } from '@/lib/services/hybridDataService';
import type { MachineData } from '@/lib/data/vendingMachineData';

interface UseMachineDataReturn {
  machines: any[];
  rawMachines: MachineData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook for fetching all machines
 */
export const useMachineData = (): UseMachineDataReturn => {
  const [machines, setMachines] = useState<any[]>([]);
  const [rawMachines, setRawMachines] = useState<MachineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const loadMachines = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use HybridDataService - tries database first, falls back to static data
      const allMachines = await HybridDataService.getVendingMachines();
      if (!isMounted.current) return;

      setRawMachines(allMachines);
      const normalized = normalizeMachinesForDisplay(allMachines);

      if (!isMounted.current) return;
      setMachines(normalized);
    } catch (err) {
      console.error('[useMachineData] Error:', err);
      if (!isMounted.current) return;
      setError('Failed to load machines');
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadMachines();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { machines, rawMachines, isLoading, error, refetch: loadMachines };
};

interface UseSingleMachineReturn {
  machine: MachineData | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for fetching single machine
 */
export const useSingleMachine = (machineId: string): UseSingleMachineReturn => {
  const [machine, setMachine] = useState<MachineData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    // Reset mounted flag at the start of each effect run
    isMounted.current = true;

    if (!machineId) {
      setError('No machine ID provided');
      setIsLoading(false);
      return;
    }

    const loadMachine = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use HybridDataService - tries database first, falls back to static data
        const machineData = await HybridDataService.getVendingMachineBySlug(machineId);
        if (!isMounted.current) return;

        if (!machineData) {
          setError(`Machine ${machineId} not found`);
        } else {
          setMachine(machineData);
        }
      } catch (err) {
        console.error('[useSingleMachine] Error:', err);
        if (!isMounted.current) return;
        setError('Failed to load machine');
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    loadMachine();

    return () => {
      isMounted.current = false;
    };
  }, [machineId]);

  return { machine, isLoading, error };
};

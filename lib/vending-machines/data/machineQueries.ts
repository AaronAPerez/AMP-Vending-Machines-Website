/**
 * @fileoverview Machine Data Queries
 * @module lib/vending-machines/data/machineQueries
 */

import { 
  getAllVendingMachines, 
  getVendingMachineById,
  getVendingMachinesByCategory,
  type MachineData 
} from '@/lib/data/vendingMachineData';

/**
 * Fetches all available vending machines
 */
export const fetchAllMachines = (): MachineData[] => {
  try {
    const machines = getAllVendingMachines();
    console.log(`[machineQueries] Fetched ${machines.length} machines`);
    return machines;
  } catch (error) {
    console.error('[machineQueries] Error fetching all machines:', error);
    throw new Error('Failed to load vending machines');
  }
};

/**
 * Fetches a single vending machine by ID
 */
export const fetchMachineById = (id: string): MachineData | null => {
  try {
    const machine = getVendingMachineById(id);
    if (machine) {
      console.log(`[machineQueries] Fetched machine: ${id}`);
    } else {
      console.warn(`[machineQueries] Machine not found: ${id}`);
    }
    return machine ?? null;
  } catch (error) {
    console.error(`[machineQueries] Error fetching machine ${id}:`, error);
    return null;
  }
};

/**
 * Fetches machines filtered by category
 */
export const fetchMachinesByCategory = (
  category: 'refrigerated' | 'non-refrigerated'
): MachineData[] => {
  try {
    const machines = getVendingMachinesByCategory(category);
    console.log(`[machineQueries] Fetched ${machines.length} ${category} machines`);
    return machines;
  } catch (error) {
    console.error(`[machineQueries] Error fetching ${category} machines:`, error);
    return [];
  }
};

/**
 * Fetches related machines for a given machine
 */
export const fetchRelatedMachines = (machine: MachineData): MachineData[] => {
  if (!machine.relatedMachines || machine.relatedMachines.length === 0) {
    return [];
  }

  try {
    const related = machine.relatedMachines
      .map(rel => getVendingMachineById(rel.id))
      .filter((m): m is MachineData => m !== null);
    
    console.log(`[machineQueries] Loaded ${related.length} related machines`);
    return related;
  } catch (error) {
    console.error('[machineQueries] Error fetching related machines:', error);
    return [];
  }
};

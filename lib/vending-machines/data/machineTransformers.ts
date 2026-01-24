/**
 * @fileoverview Machine Data Transformers
 * @module lib/vending-machines/data/machineTransformers
 */

import { normalizeMachineData, type MachineData } from '@/lib/data/vendingMachineData';

/**
 * Normalizes machines for UI display
 */
export const normalizeMachinesForDisplay = (
  machines: MachineData[]
): NonNullable<ReturnType<typeof normalizeMachineData>>[] => {
  return machines
    .map(normalizeMachineData)
    .filter((machine): machine is NonNullable<typeof machine> => machine !== null);
};

/**
 * Extracts capacity from machine dimensions
 */
export const extractCapacity = (machine: MachineData): string => {
  const dimensions = machine.dimensions || '';
  
  if (dimensions.includes('40+')) return '40+ Selections';
  if (dimensions.includes('50+')) return '50+ Selections';
  if (dimensions.includes('60+')) return '60+ Selections';
  if (dimensions.includes('800')) return '800 Cans';
  if (dimensions.includes('600')) return '600+ Items';
  
  return '30-50 Selections';
};

/**
 * Determines technology type from machine
 */
export const getTechnologyType = (machine: MachineData): string => {
  const name = machine.name.toLowerCase();
  
  if (name.includes('hd touchscreen')) return 'HD Touchscreen';
  if (name.includes('touchscreen')) return 'Touchscreen Display';
  
  return 'Digital Display';
};

/**
 * Generates SEO-friendly slug
 */
export const getMachineSlug = (machine: MachineData): string => {
  if (machine.id) return machine.id;
  
  return machine.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

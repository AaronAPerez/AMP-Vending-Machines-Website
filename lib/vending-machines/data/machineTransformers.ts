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
export const extractCapacity = (machine: MachineData): { label: string; value: string } => {
  const dimensions = typeof machine.dimensions === 'string' ? machine.dimensions : '';
  
  if (dimensions.includes('40+')) return { label: '40+ Selections', value: '40+' };
  if (dimensions.includes('50+')) return { label: '50+ Selections', value: '50+' };
  if (dimensions.includes('60+')) return { label: '60+ Selections', value: '60+' };
  if (dimensions.includes('800')) return { label: '800 Cans', value: '800' };
  if (dimensions.includes('600')) return { label: '600+ Items', value: '600+' };
  
  return { label: '30-50 Selections', value: '30-50' };
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

/**
 * @fileoverview Machine Grid Component
 * @module components/vending-machines/listing/MachineGrid
 */

'use client';

import React from 'react';
import { MachineCard } from './MachineCard';

interface MachineGridProps {
  machines: any[];
}

/**
 * Grid layout for machine cards
 */
export const MachineGrid: React.FC<MachineGridProps> = ({ machines }) => {
  if (machines.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#A5ACAF] text-xl">No machines found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {machines.map((machine, index) => (
        <MachineCard key={machine.id} machine={machine} index={index} />
      ))}
    </div>
  );
};

import { MachineData } from '@/lib/data/vendingMachineData';
import { CheckCircle } from 'lucide-react';

export default function BenefitsList({ machine }: { machine: MachineData }) {


  const benefits = machine.highlights || [
    'Professional Installation Included',
    'Complete Maintenance Service',
    'Advanced Payment Technology',
    'Smart Inventory Management',
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <CheckCircle size={20} className="text-orange-500 mr-3" />
        Key Benefits
      </h2>

      <ul className="space-y-3">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-center text-white">
            <CheckCircle size={16} className="text-orange-500 mr-3" />
            {b}
          </li>
        ))}
      </ul>
    </section>
  );
}
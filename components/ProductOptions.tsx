import { MachineData } from '@/lib/data/vendingMachineData';
import { CheckCircle } from 'lucide-react';

export default function ProductOptions({ machine }: { machine: MachineData }) {




  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-6">Available Product Options</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {machine.productOptions.map((p, i) => (
          <div key={i} className="flex items-center p-4 bg-neutral-900 rounded-xl border border-neutral-700">
            <CheckCircle size={16} className="text-orange-500 mr-3" />
            <span className="text-white text-sm">{p}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
import { Monitor, CreditCard, Wifi, Zap } from 'lucide-react';
import type { MachineData } from '@/lib/data/vendingMachineData';



export default function TechIndicators({ machine }: { machine: MachineData }) {


  const tech = [
    { icon: Monitor, label: 'HD Touchscreen', match: 'touchscreen' },
    { icon: CreditCard, label: 'Mobile Payments', match: 'payment' },
    { icon: Wifi, label: 'Smart Monitoring', match: 'monitoring' },
    { icon: Zap, label: 'Energy Efficient', match: 'energy' },
  ];

  const available = tech.filter(t =>
    machine.features.some(f => f.title.toLowerCase().includes(t.match))
  );

  return (
    <div className="flex flex-wrap gap-3">
      {available.map((t, i) => (
        <div key={i} className="flex items-center px-4 py-2 bg-neutral-900 rounded-full border border-neutral-700">
          <t.icon size={16} className="text-orange-500 mr-2" />
          <span className="text-white text-sm">{t.label}</span>
        </div>
      ))}
    </div>
  );
}
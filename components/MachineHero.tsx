import { MachineData } from '@/lib/data/vendingMachineData';

export default function MachineHero({ machine }: { machine: MachineData }) {

    
  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{machine.name}</h1>
      <p className="text-xl text-orange-500 font-semibold">
        Commercial {machine.category === 'refrigerated' ? 'Refrigerated' : 'Snack'} Vending Machine
      </p>
    </header>
  );
}
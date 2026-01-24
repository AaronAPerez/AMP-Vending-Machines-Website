import Link from 'next/link';
import Image from 'next/image';
import { MachineData } from '@/hooks/useVendingMachines';


export default function RelatedMachines({ machines }: { machines: MachineData[] }) {


  if (!machines.length) return null;




  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Related Machines</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {machines.map((m) => (
          <Link key={m.id} href={`/vending-machines/${m.id}`} className="group">
            <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700">
              <div className="relative aspect-[4/3]">
                <Image src={m.images[0].src} alt={m.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold group-hover:text-orange-500">{m.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {machines.map((m) => (
          <Link key={m.id} href={`/vending-machines/${m.id}`} className="group">
            <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700">
              <div className="relative aspect-[4/3]">
                <Image src={m.images[0].src} alt={m.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold group-hover:text-orange-500">{m.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

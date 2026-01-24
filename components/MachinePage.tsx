'use client';

import { useEffect, useState } from 'react';
import { getVendingMachineById, getAllVendingMachines, normalizeMachineData, type MachineData } from '@/lib/data/vendingMachineData';
import { Loading } from '@/components/ui/core/Loading';
import Breadcrumbs from '@/components/Breadcrumbs';
import MachineHero from '@/components/MachineHero';
import ImageGallery from '@/components/ImageGallery';
import TechIndicators from './TechIndicators';
import BenefitsList from './BenefitsList';
import MachineDetailSection from './MachineDetailSection';
import SpecificationGroup from './SpecificationGroup';
import ProductOptions from './ProductOptions';
import RelatedMachines from './RelatedMachines';

export default function MachinePage({ id }: { id: string }) {
  const [machine, setMachine] = useState<MachineData | null>(null);
  const [related, setRelated] = useState<MachineData[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const m = getVendingMachineById(id);
    if (!m) {
      setMachine(null);
      setLoading(false);
      return;
    }

    setMachine(m);

    const all = getAllVendingMachines();
    const rel = all
      .filter(x => x.id !== id && x.category === m.category)
      .slice(0, 3)
      .map(normalizeMachineData)
      .filter((x): x is NonNullable<ReturnType<typeof normalizeMachineData>> => x !== null);

    setRelated(rel);
    setLoading(false);
  }, [id]);

  if (loading) return <Loading />;
  if (!machine) return <div className="text-white p-20">Machine not found.</div>;

  return (
    <div className="min-h-screen bg-black">
      <Breadcrumbs machine={machine} />
      <MachineHero machine={machine} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ImageGallery images={machine.images} machineName={machine.name} category={machine.category} />
        <TechIndicators machine={machine} />
      </div>

      <BenefitsList machine={machine} />

      <MachineDetailSection title="Technical Specifications">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {machine.specifications.map((spec, i) => (
            <SpecificationGroup key={i} specification={spec} index={i} />
          ))}
        </div>
      </MachineDetailSection>

      <ProductOptions machine={machine} />

      <RelatedMachines machines={related} />
    </div>
  );
}
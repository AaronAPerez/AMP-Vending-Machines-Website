import React from "react";


/**
 * Props interface for reusable section components
 */
interface MachineDetailSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  icon?: React.ElementType;
}

export default function MachineDetailSection({ title, children }
: MachineDetailSectionProps)
 {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
      {children}
    </section>
  );
}


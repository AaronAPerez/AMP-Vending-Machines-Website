import React from "react";
import { useInView } from "framer-motion";


/**
 * Enhanced specification group component with better visual hierarchy
 */
interface SpecificationGroupProps {
  specification: {
    category: string;
    items: Array<{
      label: string;
      value: string | string[];
    }>;
  };
  index: number;
}


const SpecificationGroup = ({ specification, index }: SpecificationGroupProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });


  return (
    <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-700">
      <h3 className="text-lg font-bold text-white mb-4">{specification.category}</h3>

      <dl className="space-y-3">
        {specification.items.map((item, i) => (
          <div key={i}>
            <dt className="text-neutral-400 text-sm">{item.label}</dt>
            <dd className="text-white font-medium">
              {Array.isArray(item.value) ? item.value.join(', ') : item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default SpecificationGroup;
'use client';

import { trackPhoneCall } from '@/lib/analytics/gtag';

interface PhoneButtonProps {
  phoneNumber: string;
  className?: string;
  children: React.ReactNode;
}

export function PhoneButton({ phoneNumber, className, children }: PhoneButtonProps) {
  const handleClick = () => {
    trackPhoneCall();
  };

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

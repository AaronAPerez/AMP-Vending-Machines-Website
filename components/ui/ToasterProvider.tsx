'use client';

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: { zIndex: 9999 },
        className: 'z-[9999]',
      }}
    />
  );
}

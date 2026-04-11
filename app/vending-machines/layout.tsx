/**
 * Vending Machines Layout
 *
 * Provides page-level metadata for the /vending-machines route segment.
 * The page component is 'use client' and cannot export metadata directly —
 * this layout acts as the server-side metadata provider for the route.
 *
 * Metadata is sourced from PAGE_METADATA.VENDING_MACHINES in seoData.ts
 * (single source of truth) to avoid duplication.
 */

import type { Metadata } from 'next';
import { PAGE_METADATA } from '@/lib/data/seoData';

/* Re-export centralized metadata so Next.js picks it up for this route */
export const metadata: Metadata = PAGE_METADATA.VENDING_MACHINES;

export default function VendingMachinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

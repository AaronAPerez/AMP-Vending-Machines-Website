'use client';

/**
 * CatalogViewer
 *
 * Client wrapper around the brochure. It adds:
 * - A toolbar (dark / white version toggle, Print / Save as PDF, Download PDF,
 *   Request a consultation) that is hidden when printing.
 * - The theme choice: "Dark" (black pages) or "White background" (cheaper to print).
 *   Print and Download both follow the selected version.
 * - Scaling: the brochure sheets are a fixed 8.5in (816px) wide, so on narrower
 *   screens the whole brochure is shrunk to fit instead of scrolling sideways.
 *   Scaling is reset to 100% for printing (see catalog.css).
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CatalogBrochure } from '@/components/catalog/CatalogBrochure';
import { CATALOG_PDF_PATHS, type CatalogTheme } from '@/lib/data/catalogData';

/** Width of one brochure sheet in CSS px (8.5in at 96dpi) */
const SHEET_WIDTH_PX = 816;
/** Horizontal breathing room kept on each side on small screens */
const GUTTER_PX = 16;

const THEME_OPTIONS: { value: CatalogTheme; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'White background' },
];

export function CatalogViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [theme, setTheme] = useState<CatalogTheme>('dark');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const available = container.clientWidth - GUTTER_PX * 2;
      setScale(Math.min(1, Math.max(0.3, available / SHEET_WIDTH_PX)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="catalog-root w-full">
      {/* Toolbar: screen only */}
      <div className="catalog-toolbar mx-auto max-w-4xl px-4 pb-6 pt-28 text-center print:hidden">
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">
          AMP Vending <span className="text-orange-500">Catalog</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-300">
          Our machines, products and services in one brochure. Print it, save it as a PDF or share it with
          your team.
        </p>

        {/* Version toggle: Print and Download below follow this choice */}
        <div
          role="group"
          aria-label="Brochure version"
          className="mx-auto mt-6 inline-flex rounded-lg border border-white/20 p-1"
        >
          {THEME_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              data-catalog-theme={option.value}
              aria-pressed={theme === option.value}
              onClick={() => setTheme(option.value)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                theme === option.value ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Print / Save as PDF
          </button>
          <a
            href={CATALOG_PDF_PATHS[theme]}
            download
            className="rounded-lg border border-orange-500 px-6 py-3 font-semibold text-orange-500 transition-colors hover:bg-orange-500 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Download PDF{theme === 'light' ? ' (white background)' : ''}
          </a>
          <Link
            href="/contact"
            className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Request a Consultation
          </Link>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Tip: in the print dialog, choose &ldquo;Save as PDF&rdquo;, set margins to &ldquo;None&rdquo; and turn on
          &ldquo;Background graphics&rdquo;.
        </p>
      </div>

      {/*
        The scaler shrinks the sheets on small screens. `zoom` (unlike transform) also
        shrinks the layout box, so there is no empty space below the scaled sheets.
      */}
      <div className="catalog-scaler pb-12" style={{ zoom: scale }}>
        <CatalogBrochure theme={theme} />
      </div>
    </div>
  );
}

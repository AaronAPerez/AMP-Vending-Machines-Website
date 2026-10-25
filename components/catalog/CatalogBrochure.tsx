/**
 * CatalogBrochure
 *
 * The AMP Vending sales brochure, laid out as fixed US-Letter sheets (8.5in x 11in)
 * so the on-screen page, the browser's "Print / Save as PDF" and the downloadable
 * PDFs all look identical. Content lives in lib/data/catalogData.ts.
 *
 * Two looks, chosen with the `theme` prop:
 * - 'dark'  : black pages (default, on-brand for screens)
 * - 'light' : white pages (cheaper and cleaner to print)
 * Colors are not hard-coded in the markup. They come from CSS variables (--c-page,
 * --c-text, ...) that app/catalog/catalog.css defines per `data-theme`, so the same
 * markup renders both looks. Print rules (page size, hiding site chrome, forcing
 * background colors) are in the same file.
 *
 * Every <Image> here is `unoptimized`: Next's image optimizer downsizes images to a
 * few preset widths at quality 75, which looks soft once printed. Serving the original
 * files keeps photos sharp in print and in the generated PDFs.
 */

import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  AMP_VENDING_BUSINESS_INFO,
  getFormattedAddress,
} from '@/lib/data/businessData';
import {
  CATALOG_LOGO,
  catalogCoverCategories,
  catalogCoverPhotos,
  catalogLocations,
  catalogMachines,
  catalogServiceArea,
  drinkGroups,
  drinkPhotos,
  frozenGroup,
  refrigeratedGroup,
  snackGroups,
  snackPhotos,
  xmaiFootnote,
  xmaiMachines,
  xmaiSharedFeatures,
  type CatalogMachine,
  type CatalogPhoto,
  type CatalogTheme,
  type ProductGroup,
} from '@/lib/data/catalogData';

const { contact } = AMP_VENDING_BUSINESS_INFO;
const WEBSITE_DISPLAY = contact.website.replace(/^https?:\/\//, '');
const TOTAL_PAGES = 7;

// Tailwind classes for theme colors (values come from the CSS variables in catalog.css)
const C = {
  page: 'bg-[color:var(--c-page)]',
  text: 'text-[color:var(--c-text)]',
  body: 'text-[color:var(--c-body)]',
  muted: 'text-[color:var(--c-muted)]',
  faint: 'text-[color:var(--c-faint)]',
  accent: 'text-[color:var(--c-accent)]',
  card: 'bg-[color:var(--c-card)]',
  line: 'border-[color:var(--c-line)]',
  panel: 'bg-gradient-to-b from-[color:var(--c-panel-from)] to-[color:var(--c-panel-to)]',
} as const;

// ───────────────────────────────────────────────────────────────────────────
// Building blocks
// ───────────────────────────────────────────────────────────────────────────

/** One printed page. `break-after` in catalog.css puts each Sheet on its own paper page. */
function Sheet({
  label,
  pageNumber,
  title,
  theme,
  children,
}: {
  label: string;
  pageNumber: number;
  title: string;
  theme: CatalogTheme;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className={`catalog-sheet relative flex h-[11in] w-[8.5in] shrink-0 flex-col overflow-hidden ${C.page} ${C.text}`}
    >
      <header className={`flex items-center justify-between border-b ${C.line} px-[0.55in] pb-3 pt-[0.4in]`}>
        <Image
          src={CATALOG_LOGO[theme]}
          alt="AMP Vending"
          width={110}
          height={66}
          loading="eager"
          unoptimized
          className="h-12 w-auto"
        />
        <p className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${C.accent}`}>{title}</p>
      </header>

      <div className="flex-1 px-[0.55in] py-5">{children}</div>

      <footer className={`flex items-center justify-between border-t ${C.line} px-[0.55in] py-3 text-[9px] ${C.muted}`}>
        <span>
          {contact.phone} &nbsp;•&nbsp; {WEBSITE_DISPLAY}
        </span>
        <span>
          {pageNumber} / {TOTAL_PAGES}
        </span>
      </footer>
    </section>
  );
}

function Heading({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${C.accent}`}>{kicker}</p>
      <h2 className="mt-1 text-[26px] font-extrabold leading-tight">{children}</h2>
    </div>
  );
}

/** Branded tile shown when a machine has no photo yet */
function MachinePlaceholder({ machine }: { machine: CatalogMachine }) {
  return (
    <div
      role="img"
      aria-label={machine.imageAlt}
      className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center"
    >
      <span className={`text-3xl font-black uppercase tracking-widest ${C.accent}`}>{machine.maker}</span>
      <span className={`text-[10px] uppercase tracking-widest ${C.muted}`}>{machine.type}</span>
    </div>
  );
}

/** Wide machine card: photo on the left, details on the right */
function MachineCard({ machine, theme }: { machine: CatalogMachine; theme: CatalogTheme }) {
  // Machines with a cut-out image (e.g. the freezer) have a separate version for the white theme
  const image = theme === 'light' ? (machine.imageLight ?? machine.image) : machine.image;

  return (
    <article className={`flex h-[4.05in] gap-5 overflow-hidden rounded-xl border ${C.line} ${C.card} p-4`}>
      {/* 2.8in x 3.73in matches the 3:4 shape of the machine photos, so nothing is cropped */}
      <div className={`relative w-[2.8in] shrink-0 overflow-hidden rounded-lg ${C.panel}`}>
        {image ? (
          <Image
            src={image}
            alt={machine.imageAlt}
            fill
            sizes="270px"
            loading="eager"
            unoptimized
            className="object-cover"
          />
        ) : (
          <MachinePlaceholder machine={machine} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${C.muted}`}>{machine.maker}</span>
          <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">
            {machine.type}
          </span>
        </div>
        <h3 className="mt-1 text-[19px] font-extrabold leading-tight">{machine.name}</h3>
        <p className={`mt-1.5 text-[11.5px] leading-snug ${C.body}`}>{machine.tagline}</p>

        <div className={`mt-3 border-t ${C.line} pt-3`}>
          {machine.specs.length > 0 ? (
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[11px]">
              {machine.specs.map((spec) => (
                <div key={spec.label} className="contents">
                  <dt className={C.muted}>{spec.label}</dt>
                  <dd className="font-semibold">{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className={`text-[11px] italic ${C.muted}`}>Full specifications available on request.</p>
          )}
        </div>

        <ul className={`mt-3 space-y-1.5 border-t ${C.line} pt-3 text-[11px] leading-snug ${C.body}`}>
          {machine.features.map((feature) => (
            <li key={feature} className="flex gap-1.5">
              <span aria-hidden="true" className={C.accent}>
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <p className={`mt-auto pt-2 text-[9.5px] ${C.muted}`}>
          <span className={`font-semibold ${C.body}`}>Great for: </span>
          {machine.bestFor.join(' • ')}
        </p>
      </div>
    </article>
  );
}

/** Tall card for the XMAI coolers (three side by side) */
function XmaiCard({ machine, theme }: { machine: CatalogMachine; theme: CatalogTheme }) {
  // The XMAI images include their own panel background (baked in to keep the PDF small),
  // so the white version swaps to the light-background file.
  const image = theme === 'light' ? (machine.imageLight ?? machine.image) : machine.image;

  return (
    <article className={`flex flex-col overflow-hidden rounded-xl border ${C.line} ${C.card} p-3`}>
      <div className={`relative h-[3.7in] overflow-hidden rounded-lg ${C.panel}`}>
        {image ? (
          <Image
            src={image}
            alt={machine.imageAlt}
            fill
            sizes="220px"
            loading="eager"
            unoptimized
            className="object-cover"
          />
        ) : (
          <MachinePlaceholder machine={machine} />
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${C.muted}`}>{machine.maker}</span>
        <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wide text-black">
          {machine.type}
        </span>
      </div>
      <h3 className="mt-1 text-[20px] font-extrabold leading-tight">{machine.name}</h3>
      <p className={`mt-1 min-h-[2.4em] text-[10.5px] leading-snug ${C.body}`}>{machine.tagline}</p>

      <dl className={`mt-2 space-y-1.5 border-t ${C.line} pt-2.5 text-[10.5px]`}>
        {machine.specs.map((spec) => (
          <div key={spec.label}>
            <dt className={`text-[9px] uppercase tracking-wide ${C.muted}`}>{spec.label}</dt>
            <dd className="font-semibold">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Row of real photos of AMP's stocked machines */
function PhotoStrip({
  photos,
  aspect,
}: {
  photos: CatalogPhoto[];
  aspect: 'aspect-[3/2]' | 'aspect-[4/5]';
}) {
  return (
    <ul className="mb-5 grid grid-cols-3 gap-3">
      {photos.map((photo) => (
        <li key={photo.src}>
          <div className={`relative ${aspect} overflow-hidden rounded-lg ${C.card}`}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="240px"
              loading="eager"
              unoptimized
              className="object-cover"
            />
          </div>
          <p className={`mt-1.5 text-center text-[9.5px] ${C.muted}`}>{photo.caption}</p>
        </li>
      ))}
    </ul>
  );
}

function ProductList({ group, className = '' }: { group: ProductGroup; className?: string }) {
  return (
    <div className={`break-inside-avoid ${className}`}>
      <h3
        className={`mb-1.5 border-b border-orange-500/60 pb-1 text-[13px] font-bold uppercase tracking-wide ${C.accent}`}
      >
        {group.title}
      </h3>
      <p className={`text-[11.5px] leading-[1.65] ${C.body}`}>{group.names.join(' • ')}</p>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// The brochure
// ───────────────────────────────────────────────────────────────────────────

export function CatalogBrochure({ theme = 'dark' }: { theme?: CatalogTheme }) {
  const [koolmoreSnack, koolmoreCombo, vendo, freezer] = catalogMachines;

  // Cover lineup: three of AMP's own machine photos plus the XMAI Max 680L cooler (4 tiles)
  const xmaiMax = xmaiMachines[2];
  const coverTiles = [
    ...catalogCoverPhotos.map((photo) => ({
      src: photo.src,
      alt: photo.alt,
      fit: 'object-cover',
      objectPosition: photo.objectPosition,
    })),
    {
      src: (theme === 'light' ? xmaiMax.imageLight : xmaiMax.image) ?? '',
      alt: xmaiMax.imageAlt,
      fit: 'object-contain',
      objectPosition: undefined,
    },
  ];

  return (
    <div className="catalog-brochure flex flex-col items-center gap-8" data-theme={theme}>
      {/* 1 ─ Cover */}
      <section
        aria-label="Cover"
        className={`catalog-sheet relative flex h-[11in] w-[8.5in] shrink-0 flex-col overflow-hidden ${C.page} ${C.text}`}
      >
        <div className="relative h-[4.9in] w-full">
          <Image
            src="/images/catalog/amp-vending-machines-installed-office-lobby.jpg"
            alt="AMP Vending Vendo and Koolmore machines installed in a building lobby"
            fill
            sizes="816px"
            loading="eager"
            unoptimized
            className="object-cover"
          />
          {/* Fades the photo into the page color (black or white) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-[color:var(--c-page)]" />
          {/* Top-right stack: logo plate + product-categories plate. The logo sits in its own wrapper because globals.css
              has `.relative > img { height: auto }`, which would override the image's h-32 if it were a direct child
              of the relative hero box. Both plates are dark, translucent and blurred so they stay readable over the
              photo in both themes (the dark tint survives PDF export if a viewer ignores the blur). The light-text
              logo is always used here because it sits on a dark plate. */}
          <div className="absolute right-[0.3in] top-[0.4in] flex w-[2.75in] flex-col gap-3">
            <div className="flex justify-center rounded-2xl bg-black/65 px-2 py-3 shadow-lg ring-1 ring-white/15 backdrop-blur-md">
              <Image
                src={CATALOG_LOGO.dark}
                alt="AMP Vending"
                width={190}
                height={114}
                loading="eager"
                unoptimized
                className="h-32 w-auto"
              />
            </div>

            <div className="rounded-2xl bg-black/65 px-4 py-4 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-md">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-500">What we stock</p>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-semibold leading-tight">
                {catalogCoverCategories.map((category) => (
                  <li key={category} className="flex items-start gap-1.5">
                    <span aria-hidden="true" className="text-orange-500">
                      ✓
                    </span>
                    {category}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-white/15 pt-3 text-[10.5px] leading-snug text-gray-300">
                Serving Modesto, Stockton, Turlock and the Central Valley
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-[0.55in] pb-[0.45in]">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${C.accent}`}>
            Product &amp; Machine Catalog
          </p>
          <h1 className="mt-2 text-[48px] font-black leading-[1.05]">
            Premium <span className={C.accent}>vending.</span>
          </h1>
          <p className={`mt-3 max-w-[6in] text-[14px] leading-relaxed ${C.body}`}>
            Touchscreen snack machines, cold drink machines, AI smart coolers and freezer machines, installed,
            stocked and serviced by a local team.
          </p>

          {/* Machine lineup preview. 3:4 tiles match the shape of the machine photos, so each machine is
              shown in full; the focal points in catalogCoverPhotos keep them centered if a tile is ever cropped. */}
          <ul className="mt-5 flex flex-1 items-center gap-3">
            {coverTiles.map(({ src, alt, fit, objectPosition }) => (
              <li key={src} className={`relative aspect-[3/4] flex-1 overflow-hidden rounded-lg ${C.panel}`}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="180px"
                  loading="eager"
                  unoptimized
                  className={fit}
                  style={{ objectPosition }}
                />
              </li>
            ))}
          </ul>

          <div className={`mt-5 flex items-end justify-between border-t ${C.line} pt-4 text-[11px] ${C.body}`}>
            <div>
              <p className={`text-[9px] uppercase tracking-widest ${C.faint}`}>Call or text</p>
              <p className={`text-[18px] font-bold ${C.text}`}>{contact.phone}</p>
            </div>
            <p className={`text-[12px] font-semibold ${C.accent}`}>{WEBSITE_DISPLAY}</p>
          </div>
        </div>
      </section>

      {/* 2 ─ Machines: Koolmore */}
      <Sheet label="Machines: Koolmore" pageNumber={2} title="Our Machines" theme={theme}>
        <Heading kicker="Snack & combo machines">Koolmore touchscreen machines</Heading>
        <div className="flex flex-col gap-4">
          <MachineCard machine={koolmoreSnack} theme={theme} />
          <MachineCard machine={koolmoreCombo} theme={theme} />
        </div>
      </Sheet>

      {/* 3 ─ Machines: Vendo + freezer */}
      <Sheet label="Machines: Vendo and freezer" pageNumber={3} title="Our Machines" theme={theme}>
        <Heading kicker="Cold drinks & frozen food">Vendo and freezer vending</Heading>
        <div className="flex flex-col gap-4">
          <MachineCard machine={vendo} theme={theme} />
          <MachineCard machine={freezer} theme={theme} />
        </div>
      </Sheet>

      {/* 4 ─ Machines: XMAI */}
      <Sheet label="Machines: XMAI AI smart coolers" pageNumber={4} title="Our Machines" theme={theme}>
        <Heading kicker="AI smart coolers">XMAI smart vending</Heading>
        <div className="grid grid-cols-3 gap-3">
          {xmaiMachines.map((machine) => (
            <XmaiCard key={machine.id} machine={machine} theme={theme} />
          ))}
        </div>

        <h3 className={`mb-2 mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] ${C.accent}`}>
          On every XMAI cooler
        </h3>
        <ul className={`grid grid-cols-2 gap-x-5 gap-y-1.5 text-[10.5px] leading-snug ${C.body}`}>
          {xmaiSharedFeatures.map((feature) => (
            <li key={feature} className="flex gap-1.5">
              <span aria-hidden="true" className={C.accent}>
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className={`mt-3 text-[8.5px] leading-snug ${C.faint}`}>{xmaiFootnote}</p>
      </Sheet>

      {/* 5 ─ Snacks */}
      <Sheet label="Snack lineup" pageNumber={5} title="What We Stock" theme={theme}>
        <Heading kicker="Snacks">Favorites your team already loves</Heading>
        <PhotoStrip photos={snackPhotos} aspect="aspect-[3/2]" />
        <div className="grid grid-cols-2 gap-x-7 gap-y-5">
          {snackGroups.map((group, index) => (
            // The last group (Healthy Snacks) spans the full width so the grid stays balanced
            <ProductList
              key={group.title}
              group={group}
              className={index === snackGroups.length - 1 ? 'col-span-2' : ''}
            />
          ))}
        </div>
      </Sheet>

      {/* 6 ─ Drinks, fresh & frozen */}
      <Sheet label="Drink, fresh and frozen lineup" pageNumber={6} title="What We Stock" theme={theme}>
        <Heading kicker="Drinks">Cold, fresh and always in stock</Heading>
        <PhotoStrip photos={drinkPhotos} aspect="aspect-[4/5]" />
        <div className="grid grid-cols-1 gap-y-5">
          {drinkGroups.map((group) => (
            <ProductList key={group.title} group={group} />
          ))}
        </div>

        <div className="mt-6">
          <Heading kicker="Fresh & frozen">Meals and treats</Heading>
          <div className="grid grid-cols-2 gap-x-7">
            <ProductList group={frozenGroup} />
            <ProductList group={refrigeratedGroup} />
          </div>
        </div>

        <p className={`mt-5 rounded-xl border ${C.line} ${C.card} p-4 text-[11.5px] leading-snug ${C.body}`}>
          <strong className={C.accent}>Your machine, your mix.</strong> The lineup is what we commonly stock.
          Tell us what your employees or customers prefer and we&apos;ll tailor each machine to match.
          Availability varies by machine and location.
        </p>
      </Sheet>

      {/* 7 ─ Locations & contact */}
      <Sheet label="Where we fit and contact" pageNumber={7} title="Get Started" theme={theme}>
        <Heading kicker="Where AMP fits">Built for busy workplaces</Heading>
        <ul className="grid grid-cols-2 gap-2">
          {catalogLocations.map((location) => (
            <li
              key={location}
              className={`flex items-center gap-2 rounded-lg border ${C.line} ${C.card} px-4 py-4 text-[13px] font-semibold`}
            >
              <span aria-hidden="true" className={C.accent}>
                ●
              </span>
              {location}
            </li>
          ))}
        </ul>
        <p className={`mt-4 text-[12px] ${C.muted}`}>
          <span className={`font-semibold ${C.body}`}>Serving: </span>
          {catalogServiceArea}.
        </p>

        {/* The orange call-to-action card keeps black text in both themes */}
        <div className="mt-10 flex gap-6 rounded-2xl bg-orange-500 p-8 text-black">
          <div className="min-w-0 flex-1">
            <h2 className="text-[34px] font-black leading-tight">Get your vending consultation</h2>
            <p className="mt-3 text-[14.5px] font-medium leading-snug">
              Tell us about your location and we&apos;ll recommend the right machine, with no obligation.
            </p>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-[15px]">
              <dt className="font-bold">Phone</dt>
              <dd>{contact.phone}</dd>
              <dt className="font-bold">Email</dt>
              <dd className="break-all">{contact.email}</dd>
              <dt className="font-bold">Web</dt>
              <dd>{WEBSITE_DISPLAY}/contact</dd>
              <dt className="font-bold">Office</dt>
              <dd>{getFormattedAddress()}</dd>
            </dl>
          </div>

          {/* QR code (same image used on the AMP business card). White tile keeps it scannable on orange. */}
          <div className="flex w-[1.6in] shrink-0 flex-col items-center justify-center self-center">
            <div className="relative h-[1.6in] w-[1.6in] rounded-xl bg-white p-2">
              <Image
                src="/images/logo/AMP-QR-Code.webp"
                alt="QR code to connect with AMP Vending"
                fill
                sizes="154px"
                loading="eager"
                unoptimized
                className="object-contain p-2"
              />
            </div>
            <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-wide">Scan to connect</p>
          </div>
        </div>

        <p className={`mt-6 text-center text-[10px] ${C.faint}`}>
          Machine specifications and product availability are subject to change. AMP Vending Machines,
          Modesto, California.
        </p>
      </Sheet>
    </div>
  );
}

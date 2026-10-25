/**
 * Generate the downloadable catalog PDFs
 *
 * Renders the /catalog page in headless Chromium (using its print layout) and saves
 * both versions of the brochure to public/downloads/, which the "Download PDF" button
 * links to:
 *   - AMP-Vending-Catalog.pdf                       (dark / black pages)
 *   - AMP-Vending-Catalog-White-Background.pdf      (white pages, cheaper to print)
 * Re-run this whenever lib/data/catalogData.ts or the brochure changes, then commit
 * the new PDFs. (Keep the file names in sync with CATALOG_PDF_PATHS in catalogData.ts.)
 *
 * Usage (PowerShell), with the site running in another terminal:
 *   npm run dev            # terminal 1 (or: npm run build; npm run start)
 *   npm run catalog:pdf    # terminal 2
 *
 * Optional: point at a different server with  $env:CATALOG_BASE_URL="http://localhost:3001"
 * Uses the Playwright already installed for E2E tests. If Playwright's Chromium isn't
 * downloaded, Microsoft Edge is used instead (or run `npm run test:setup` once).
 */

import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.CATALOG_BASE_URL ?? 'http://localhost:3000';
const outputDir = path.join(process.cwd(), 'public', 'downloads');

/** theme value (matches the toggle buttons on the page) -> output file name */
const versions = [
  { theme: 'dark', file: 'AMP-Vending-Catalog.pdf' },
  { theme: 'light', file: 'AMP-Vending-Catalog-White-Background.pdf' },
];

// Prefer Playwright's bundled Chromium; if it isn't downloaded (or is the wrong
// version), fall back to the Microsoft Edge that ships with Windows. Both are Chromium,
// so the PDF output is the same.
let browser;
try {
  browser = await chromium.launch();
} catch {
  browser = await chromium.launch({ channel: 'msedge' });
}

try {
  await mkdir(outputDir, { recursive: true });

  for (const { theme, file } of versions) {
    // A fresh page per version so each starts from the page's default state
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/catalog`, { waitUntil: 'networkidle', timeout: 120_000 });

    // Pick the version the same way a visitor does: with the toggle button
    await page.click(`button[data-catalog-theme="${theme}"]`);
    await page.waitForSelector(`.catalog-brochure[data-theme="${theme}"]`);

    // Brochure images are eager-loaded, but make sure every one has actually finished
    // decoding before the PDF is captured, or the PDF would contain blank photos.
    // Only brochure images are checked: the site header/footer (hidden when printing)
    // lazy-load their own images, which may never load in a headless page.
    await page.waitForFunction(
      () =>
        Array.from(document.querySelectorAll('.catalog-brochure img')).every(
          (img) => img.complete && img.naturalWidth > 0,
        ),
      undefined,
      { timeout: 60_000 },
    );

    const outputPath = path.join(outputDir, file);
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: outputPath,
      width: '8.5in',
      height: '11in',
      printBackground: true, // keep the page background colors
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    console.log(`Catalog PDF (${theme}) written to ${outputPath}`);
    await page.close();
  }
} finally {
  await browser.close();
}

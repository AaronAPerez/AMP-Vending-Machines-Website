'use client';

import BusinessCard from '@/components/BusinessCard';
import { useState } from 'react';

type Theme = 'dark' | 'matte-black' | 'light';
type PrintMode = 'quick' | 'custom';

interface CardSelection {
  theme: Theme;
  count: number;
  enabled: boolean;
  label: string;
  description: string;
}

export default function PrintPage() {
  const [printMode, setPrintMode] = useState<PrintMode>('quick');
  const [selections, setSelections] = useState<CardSelection[]>([
    {
      theme: 'dark',
      count: 10,
      enabled: true,
      label: 'Dark Theme',
      description: 'Black background with orange accents'
    },
    {
      theme: 'matte-black',
      count: 10,
      enabled: true,
      label: 'Matte Black Premium',
      description: 'Sleek matte black finish'
    },
    {
      theme: 'light',
      count: 10,
      enabled: true,
      label: 'Light/White Theme',
      description: 'Clean white background'
    }
  ]);

  const toggleTheme = (theme: Theme) => {
    setSelections(prev =>
      prev.map(s => s.theme === theme ? { ...s, enabled: !s.enabled } : s)
    );
  };

  const updateCount = (theme: Theme, count: number) => {
    setSelections(prev =>
      prev.map(s => s.theme === theme ? { ...s, count: Math.max(1, Math.min(50, count)) } : s)
    );
  };

  const enabledSelections = selections.filter(s => s.enabled);
  const totalCards = enabledSelections.reduce((sum, s) => sum + s.count, 0);
  const totalSheets = Math.ceil(totalCards / 10);

  return (
    <div className="min-h-screen bg-white">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }

          .no-print {
            display: none !important;
          }

          .print-page {
            page-break-after: always;
            width: 8.5in;
            height: 11in;
            padding: 0.5in;
            margin: 0;
          }

          .card-grid {
            display: grid;
            grid-template-columns: repeat(2, 3.5in);
            grid-template-rows: repeat(5, 2in);
            gap: 0;
            width: 100%;
            height: 100%;
          }

          .card-wrapper {
            width: 3.5in;
            height: 2in;
            display: flex;
            align-items: center;
            justify-content: center;
            page-break-inside: avoid;
          }
        }

        @media screen {
          .print-page {
            width: 8.5in;
            min-height: 11in;
            padding: 0.5in;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-bottom: 1in;
          }

          .card-grid {
            display: grid;
            grid-template-columns: repeat(2, 3.5in);
            grid-template-rows: repeat(5, 2in);
            gap: 0;
            width: 100%;
          }

          .card-wrapper {
            width: 3.5in;
            height: 2in;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px dashed #ccc;
          }
        }
      `}</style>

      {/* Print Header - Hidden on Print */}
      <div className="no-print bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">
            AMP Vending <span className="text-[#FD5A1E]">Business Cards</span>
          </h1>
          <p className="text-gray-300 mb-4 text-center">
            Printable Template - Avery 28878 Compatible (3.5&quot; × 2&quot;)
          </p>

          {/* Print Mode Selection */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setPrintMode('quick')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                printMode === 'quick'
                  ? 'bg-[#FD5A1E] text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Quick Print (All Themes)
            </button>
            <button
              onClick={() => setPrintMode('custom')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                printMode === 'custom'
                  ? 'bg-[#FD5A1E] text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Custom Selection
            </button>
          </div>

          {/* Card Selection Controls - Only show in custom mode */}
          {printMode === 'custom' && (
            <div className="grid md:grid-cols-3 gap-4 mb-6">
            {selections.map((selection) => (
              <div
                key={selection.theme}
                className={`bg-gray-800 p-4 rounded-lg border-2 transition-all ${
                  selection.enabled ? 'border-[#FD5A1E]' : 'border-gray-700 opacity-60'
                }`}
              >
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selection.enabled}
                    onChange={() => toggleTheme(selection.theme)}
                    className="mt-1 w-5 h-5 text-[#FD5A1E] bg-gray-700 border-gray-600 rounded focus:ring-[#FD5A1E] focus:ring-2"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-white">{selection.label}</div>
                    <div className="text-sm text-gray-400 mb-3">{selection.description}</div>

                    {selection.enabled && (
                      <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-300">Cards:</label>
                        <button
                          onClick={() => updateCount(selection.theme, selection.count - 10)}
                          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                        >
                          -10
                        </button>
                        <input
                          type="number"
                          value={selection.count}
                          onChange={(e) => updateCount(selection.theme, parseInt(e.target.value) || 1)}
                          className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-white"
                          min="1"
                          max="50"
                        />
                        <button
                          onClick={() => updateCount(selection.theme, selection.count + 10)}
                          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                        >
                          +10
                        </button>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>
          )}

          {/* Print Summary & Button */}
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            {printMode === 'quick' ? (
              <>
                <div className="text-sm text-gray-300 mb-3">
                  Print all themes: <strong className="text-[#FD5A1E]">30 cards</strong> on
                  <strong className="text-[#FD5A1E]"> 3 sheets</strong>
                  <span className="block mt-1 text-xs text-gray-400">
                    (10 Dark, 10 Matte Black, 10 Light)
                  </span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="bg-[#FD5A1E] hover:bg-[#E54A0E] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Print All Cards
                </button>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-300 mb-3">
                  <strong className="text-[#FD5A1E]">{totalCards}</strong> cards selected •
                  <strong className="text-[#FD5A1E]"> {totalSheets}</strong> sheet{totalSheets !== 1 ? 's' : ''} needed
                  {enabledSelections.length > 0 && (
                    <span className="block mt-1 text-xs text-gray-400">
                      ({enabledSelections.map(s => `${s.count} ${s.label}`).join(', ')})
                    </span>
                  )}
                </div>
                <button
                  onClick={() => window.print()}
                  disabled={totalCards === 0}
                  className="bg-[#FD5A1E] hover:bg-[#E54A0E] disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  {totalCards === 0 ? 'Select Cards to Print' : 'Print Selected Cards'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* VistaPrint Export Preview - Hidden on Print */}
      <div className="no-print bg-gray-100 p-8 mb-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">
            VistaPrint Export Preview
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Use browser zoom (200-300%) and take screenshots of individual cards below for VistaPrint upload
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Dark Theme Card */}
            <div>
              <h3 className="text-center font-semibold text-gray-700 mb-3">Dark Theme</h3>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="relative" style={{ aspectRatio: '3.5 / 2' }}>
                  <BusinessCard theme="dark" variant="horizontal" />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Best on matte finish card stock
              </p>
            </div>

            {/* Matte Black Theme Card */}
            <div>
              <h3 className="text-center font-semibold text-gray-700 mb-3">Matte Black Premium</h3>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="relative" style={{ aspectRatio: '3.5 / 2' }}>
                  <BusinessCard theme="matte-black" variant="horizontal" />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Premium look on matte or silk finish
              </p>
            </div>

            {/* Light Theme Card */}
            <div>
              <h3 className="text-center font-semibold text-gray-700 mb-3">Light/White Theme</h3>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="relative" style={{ aspectRatio: '3.5 / 2' }}>
                  <BusinessCard theme="light" variant="horizontal" />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Works well on glossy or matte finish
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                <strong>Tip:</strong> Right-click on card → &quot;Inspect&quot; → Right-click element → &quot;Capture node screenshot&quot; for perfect quality
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Print Pages Based on Mode */}
      {printMode === 'quick' ? (
        <>
          {/* Quick Mode: All themes, 10 cards each */}
          {/* Page 1: Dark Theme Cards */}
          <div className="print-page">
            <div className="card-grid">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={`dark-${index}`} className="card-wrapper">
                  <BusinessCard theme="dark" variant="horizontal" />
                </div>
              ))}
            </div>
          </div>

          {/* Page 2: Matte Black Premium Cards */}
          <div className="print-page">
            <div className="card-grid">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={`matte-${index}`} className="card-wrapper">
                  <BusinessCard theme="matte-black" variant="horizontal" />
                </div>
              ))}
            </div>
          </div>

          {/* Page 3: Light/White Theme Cards */}
          <div className="print-page">
            <div className="card-grid">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={`light-${index}`} className="card-wrapper">
                  <BusinessCard theme="light" variant="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Custom Mode: Generate based on selection */
        enabledSelections.map((selection) => {
          const fullSheets = Math.floor(selection.count / 10);
          const remainder = selection.count % 10;
          const pages = [];

          // Full sheets of 10 cards
          for (let i = 0; i < fullSheets; i++) {
            pages.push(
              <div key={`${selection.theme}-sheet-${i}`} className="print-page">
                <div className="card-grid">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div key={`${selection.theme}-${i}-${index}`} className="card-wrapper">
                      <BusinessCard theme={selection.theme} variant="horizontal" />
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // Partial sheet with remaining cards
          if (remainder > 0) {
            pages.push(
              <div key={`${selection.theme}-sheet-partial`} className="print-page">
                <div className="card-grid">
                  {Array.from({ length: remainder }).map((_, index) => (
                    <div key={`${selection.theme}-partial-${index}`} className="card-wrapper">
                      <BusinessCard theme={selection.theme} variant="horizontal" />
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return pages;
        })
      )}

      {/* Print Instructions - Hidden on Print */}
      <div className="no-print bg-gray-900 text-white p-6 max-w-6xl mx-auto mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Home Printing Instructions */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#FD5A1E]">🖨️ Home Printing (Avery Sheets)</h2>
            <ol className="space-y-2 text-gray-300 text-sm">
              <li>1. Click the &quot;Print Business Cards&quot; button above</li>
              <li>2. In the print dialog, ensure:
                <ul className="ml-6 mt-2 space-y-1 text-xs">
                  <li>• Paper: Letter (8.5&quot; × 11&quot;)</li>
                  <li>• Orientation: Portrait</li>
                  <li>• Margins: None/Minimum</li>
                  <li>• Scale: 100%</li>
                  <li>• Background graphics: ON</li>
                </ul>
              </li>
              <li>3. Use Avery 28878 business card sheets</li>
              <li>4. Best with color laser printer</li>
            </ol>

            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-[#FD5A1E] text-sm mb-2">Specifications:</h3>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Size: 3.5&quot; × 2&quot;</li>
                <li>• 10 cards per sheet</li>
                <li>• 2 columns × 5 rows</li>
              </ul>
            </div>
          </div>

          {/* VistaPrint Instructions */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#FD5A1E]">🎨 VistaPrint Professional Printing</h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
                <h3 className="font-semibold text-orange-400 mb-2">📸 Step 1: Capture Screenshot</h3>
                <ol className="space-y-1 text-xs">
                  <li>1. Scroll to the card preview above</li>
                  <li>2. Use browser zoom: 200-300% for high quality</li>
                  <li>3. Take screenshot of single card</li>
                  <li>4. Crop to exact card boundaries</li>
                </ol>
              </div>

              <div className="p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
                <h3 className="font-semibold text-orange-400 mb-2">📤 Step 2: Upload to VistaPrint</h3>
                <ol className="space-y-1 text-xs">
                  <li>1. Go to vistaprint.com/business-cards</li>
                  <li>2. Choose &quot;Upload your own design&quot;</li>
                  <li>3. Select size: Standard (3.5&quot; × 2&quot;)</li>
                  <li>4. Upload your screenshot/design file</li>
                  <li>5. Use &quot;Full Bleed&quot; option (design to edges)</li>
                </ol>
              </div>

              <div className="p-3 bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-[#FD5A1E] text-sm mb-2">VistaPrint Settings:</h3>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Size: Standard (3.5&quot; × 2&quot;)</li>
                  <li>• Finish: Matte or Glossy</li>
                  <li>• Paper: 14pt or 16pt card stock</li>
                  <li>• Design: Full bleed to edges</li>
                  <li>• Format: Upload PNG/JPG/PDF</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                <h3 className="font-semibold text-blue-400 mb-1 text-xs">💡 Pro Tips:</h3>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• For best quality, use browser at 300% zoom when taking screenshot</li>
                  <li>• Dark/Matte Black themes look best on matte finish</li>
                  <li>• Light theme works well on glossy finish</li>
                  <li>• Order sample pack first to test quality</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative: Export High-Res Images */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-900/30 to-gray-800 border border-orange-600/30 rounded-lg">
          <h3 className="font-semibold text-[#FD5A1E] mb-2">🚀 Advanced: Export High-Resolution Files</h3>
          <p className="text-sm text-gray-300 mb-3">
            For the highest quality, you can export each card design as a high-resolution image:
          </p>
          <ol className="text-sm text-gray-300 space-y-2">
            <li>
              <strong className="text-orange-400">Method 1 - Browser DevTools:</strong>
              <ul className="ml-6 mt-1 space-y-1 text-xs">
                <li>1. Right-click on a card preview → Inspect Element</li>
                <li>2. In DevTools, find the card container element</li>
                <li>3. Right-click element → Capture node screenshot</li>
                <li>4. This captures at actual rendered resolution</li>
              </ul>
            </li>
            <li>
              <strong className="text-orange-400">Method 2 - Design Software:</strong>
              <ul className="ml-6 mt-1 space-y-1 text-xs">
                <li>1. Import screenshot into Photoshop/GIMP/Canva</li>
                <li>2. Set canvas to 3.5&quot; × 2&quot; at 300 DPI (1050 × 600 px)</li>
                <li>3. Scale image to fit, maintaining quality</li>
                <li>4. Export as high-quality PNG or PDF</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

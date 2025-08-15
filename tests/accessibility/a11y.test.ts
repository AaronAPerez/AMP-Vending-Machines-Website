/**
 * Comprehensive accessibility testing suite
 * Implements WCAG 2.1 AA compliance verification
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const CRITICAL_PAGES = [
  '/',
  '/vending-machines',
  '/contact',
  '/feedback'
];

for (const page of CRITICAL_PAGES) {
  test.describe(`Accessibility: ${page}`, () => {
    test('should pass axe accessibility tests', async ({ page: playwrightPage }) => {
      await playwrightPage.goto(page);
      
      const accessibilityScanResults = await new AxeBuilder({ page: playwrightPage })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should support keyboard navigation', async ({ page: playwrightPage }) => {
      await playwrightPage.goto(page);
      
      // Test tab navigation
      const focusableElements = await playwrightPage.locator(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ).all();

      for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
        await playwrightPage.keyboard.press('Tab');
        const focusedElement = playwrightPage.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    });

    test('should have proper heading hierarchy', async ({ page: playwrightPage }) => {
      await playwrightPage.goto(page);
      
      const headings = await playwrightPage.locator('h1, h2, h3, h4, h5, h6').all();
      const headingLevels = await Promise.all(
        headings.map(h => h.evaluate(el => parseInt(el.tagName.charAt(1))))
      );

      // Verify h1 exists and is unique
      const h1Count = headingLevels.filter(level => level === 1).length;
      expect(h1Count).toBe(1);

      // Verify no heading levels are skipped
      for (let i = 1; i < headingLevels.length; i++) {
        const diff = headingLevels[i] - headingLevels[i-1];
        expect(diff).toBeLessThanOrEqual(1);
      }
    });
  });
}
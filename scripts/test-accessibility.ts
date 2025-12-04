/**
 * Accessibility Testing Script
 * Tests WCAG 2.1 AA compliance
 */

import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

async function testAccessibility() {
  console.log('🔍 Starting Accessibility Tests...\n');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const pages = [
    { url: 'http://localhost:3000', name: 'Homepage' },
    { url: 'http://localhost:3000/vending-machines', name: 'Vending Machines' },
    { url: 'http://localhost:3000/contact', name: 'Contact' },
  ];
  
  let totalViolations = 0;
  
  for (const testPage of pages) {
    console.log(`\n📄 Testing: ${testPage.name}`);
    console.log(`   URL: ${testPage.url}`);
    
    await page.goto(testPage.url);
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    console.log(`   ✅ Passed: ${results.passes.length}`);
    console.log(`   ❌ Violations: ${results.violations.length}`);
    
    if (results.violations.length > 0) {
      console.log('\n   📋 Violations Found:');
      results.violations.forEach((violation, index) => {
        console.log(`\n   ${index + 1}. ${violation.help}`);
        console.log(`      Impact: ${violation.impact}`);
        console.log(`      Elements: ${violation.nodes.length}`);
        console.log(`      Fix: ${violation.helpUrl}`);
      });
      totalViolations += results.violations.length;
    }
  }
  
  await browser.close();
  
  console.log(`\n\n📊 Test Summary:`);
  console.log(`   Total Violations: ${totalViolations}`);
  console.log(`   Status: ${totalViolations === 0 ? '✅ PASSED' : '❌ FAILED'}\n`);
  
  process.exit(totalViolations === 0 ? 0 : 1);
}

testAccessibility().catch(console.error);
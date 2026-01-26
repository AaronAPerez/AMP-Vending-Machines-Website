# Breadcrumbs Implementation Guide

Complete guide for implementing and maintaining breadcrumb navigation across the AMP Vending Machines website.

## Table of Contents
- [Overview](#overview)
- [Component API](#component-api)
- [Implementation Steps](#implementation-steps)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [SEO Benefits](#seo-benefits)
- [Accessibility](#accessibility)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Breadcrumbs component provides consistent navigation trails across the website, improving user experience and SEO. It shows users their location within the site hierarchy and provides quick navigation to parent pages.

### Features
- ✅ **Responsive Design**: Adapts to mobile, tablet, and desktop
- ✅ **Accessible**: ARIA labels, semantic HTML, keyboard navigation
- ✅ **SEO Optimized**: Structured data compatible, crawlable links
- ✅ **Icon Support**: Home icon for first item, chevron separators
- ✅ **Text Truncation**: Prevents overflow on long page titles
- ✅ **Sticky Styling**: Optional backdrop blur and fixed positioning

### File Location
```
components/ui/Breadcrumbs.tsx
```

---

## Component API

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `BreadcrumbItem[]` | Yes | - | Array of breadcrumb items to display |
| `className` | `string` | No | `''` | Additional CSS classes for the nav element |

### BreadcrumbItem Interface

```typescript
interface BreadcrumbItem {
  label: string;    // Display text for the breadcrumb
  href?: string;    // Optional link URL (omit for current page)
}
```

---

## Implementation Steps

### Step 1: Import the Component

```typescript
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
```

### Step 2: Define Breadcrumb Items

Create an array of breadcrumb items representing the navigation path:

```typescript
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Parent Page', href: '/parent' },
  { label: 'Current Page' } // No href for current page
];
```

### Step 3: Add to Page Layout

Place the breadcrumbs below the navbar with appropriate top padding:

```tsx
<div className="min-h-screen bg-[#000000]">
  {/* Breadcrumb Navigation */}
  <div className="pt-16 md:pt-20">
    <Breadcrumbs items={breadcrumbItems} />
  </div>

  {/* Rest of page content */}
  <section>
    {/* ... */}
  </section>
</div>
```

### Step 4: Update SEO Schema (Optional)

Add BreadcrumbList schema to your page for enhanced SEO:

```tsx
<Script
  id="breadcrumb-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? `https://www.ampvendingmachines.com${item.href}` : undefined
      }))
    })
  }}
/>
```

---

## Usage Examples

### Example 1: Simple Two-Level Breadcrumb

```tsx
// pages/contact/page.tsx
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Contact Us' }
];

return (
  <div>
    <div className="pt-16 md:pt-20">
      <Breadcrumbs items={breadcrumbItems} />
    </div>
    {/* Page content */}
  </div>
);
```

### Example 2: Three-Level Breadcrumb (Product Detail)

```tsx
// pages/vending-machines/[id]/page.tsx
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Vending Machines', href: '/vending-machines' },
  { label: machine.name } // Dynamic from data
];

return (
  <div className="min-h-screen bg-[#000000]">
    <div className="pt-16 md:pt-20">
      <Breadcrumbs items={breadcrumbItems} />
    </div>
    {/* Machine details */}
  </div>
);
```

### Example 3: Deep Hierarchy

```tsx
// pages/resources/guides/installation/page.tsx
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Guides', href: '/resources/guides' },
  { label: 'Installation Guide' }
];

return (
  <div>
    <div className="pt-16 md:pt-20">
      <Breadcrumbs items={breadcrumbItems} />
    </div>
    {/* Guide content */}
  </div>
);
```

### Example 4: Dynamic Breadcrumbs with usePathname

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function DynamicPage() {
  const pathname = usePathname();

  // Generate breadcrumbs from URL path
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...pathname
      .split('/')
      .filter(Boolean)
      .map((segment, index, array) => {
        const href = '/' + array.slice(0, index + 1).join('/');
        const label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return index === array.length - 1
          ? { label } // Last item has no link
          : { label, href };
      })
  ];

  return (
    <div className="pt-16 md:pt-20">
      <Breadcrumbs items={breadcrumbItems} />
    </div>
  );
}
```

---

## Best Practices

### 1. Consistent Hierarchy
Always start with "Home" and maintain logical parent-child relationships:

✅ **Good:**
```typescript
Home → Vending Machines → Premium Snack Machine
Home → About → Our Story
Home → Contact
```

❌ **Bad:**
```typescript
Vending Machines → Home → Premium Snack Machine  // Wrong order
Premium Snack Machine  // Missing parent pages
```

### 2. Keep Labels Concise
Use short, descriptive labels that fit on mobile screens:

✅ **Good:**
```typescript
{ label: 'Vending Machines', href: '/vending-machines' }
{ label: 'Premium Snack Machine' }
```

❌ **Bad:**
```typescript
{ label: 'Our Complete Collection of Commercial Vending Machines', href: '/vending-machines' }
{ label: 'Premium High-Capacity Touchscreen Snack Vending Machine with Card Reader' }
```

### 3. Current Page Has No Link
The last breadcrumb item should not have an `href`:

✅ **Good:**
```typescript
{ label: 'Current Page' } // No href
```

❌ **Bad:**
```typescript
{ label: 'Current Page', href: '/current-page' } // Links to itself
```

### 4. Proper Spacing
Use consistent top padding to account for the fixed navbar:

```tsx
{/* Desktop: 80px (pt-20), Mobile: 64px (pt-16) */}
<div className="pt-16 md:pt-20">
  <Breadcrumbs items={breadcrumbItems} />
</div>
```

### 5. Dynamic Content
For dynamic pages (like product details), construct breadcrumbs from actual data:

```tsx
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Vending Machines', href: '/vending-machines' },
  { label: machine.name } // From fetched data, not hardcoded
];
```

### 6. Error States
Handle loading and error states appropriately:

```tsx
if (!machine) {
  // Don't show breadcrumbs if data isn't loaded
  return <Loading />;
}

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Vending Machines', href: '/vending-machines' },
  { label: machine.name }
];
```

---

## SEO Benefits

### 1. Search Engine Visibility
Breadcrumbs help search engines understand your site structure and can appear in search results:

```
ampvendingmachines.com › vending-machines › premium-snack
```

### 2. Structured Data
When combined with JSON-LD schema, breadcrumbs provide rich snippets:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### 3. Internal Linking
Breadcrumbs create natural internal links, distributing page authority across your site.

### 4. Reduced Bounce Rate
Users can easily navigate to parent pages, reducing bounce rate and improving engagement metrics.

---

## Accessibility

The Breadcrumbs component follows WCAG 2.1 AA standards:

### Features

1. **Semantic HTML**
   - Uses `<nav>` with `aria-label="Breadcrumb"`
   - Ordered list `<ol>` for proper structure

2. **Keyboard Navigation**
   - All links are focusable with Tab key
   - Visible focus states with orange highlight

3. **Screen Reader Support**
   - `aria-current="page"` on current page
   - Proper link text (no "click here")
   - Chevron icons hidden with `aria-hidden="true"`

4. **Visual Clarity**
   - High contrast text colors
   - Hover states for interactive elements
   - Truncation prevents layout breaks

### Testing Checklist

- [ ] Can navigate breadcrumbs with keyboard only
- [ ] Screen reader announces all links properly
- [ ] Focus indicators are visible
- [ ] Text contrast meets WCAG AA standards (4.5:1)
- [ ] Works with browser zoom up to 200%
- [ ] Responsive on mobile devices

---

## Troubleshooting

### Issue: Breadcrumbs Hidden Behind Navbar

**Problem:** Breadcrumbs appear underneath the fixed navbar.

**Solution:** Ensure proper top padding:
```tsx
<div className="pt-16 md:pt-20"> {/* Matches navbar height */}
  <Breadcrumbs items={breadcrumbItems} />
</div>
```

### Issue: Text Overflow on Mobile

**Problem:** Long breadcrumb labels break layout on small screens.

**Solution:** The component automatically truncates long text:
```tsx
{/* Built-in truncation */}
<span className="truncate max-w-[200px] sm:max-w-xs md:max-w-md">
  {item.label}
</span>
```

For custom truncation:
```typescript
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  {
    label: machine.name.length > 50
      ? machine.name.substring(0, 50) + '...'
      : machine.name
  }
];
```

### Issue: Breadcrumbs Not Showing

**Problem:** Component renders but nothing appears.

**Checklist:**
1. Verify `items` array is not empty
2. Check that component is imported correctly
3. Ensure parent div has proper background contrast
4. Check z-index conflicts with other components

**Debug:**
```tsx
console.log('Breadcrumb items:', breadcrumbItems);

// Should output:
// [
//   { label: 'Home', href: '/' },
//   { label: 'Current Page' }
// ]
```

### Issue: Links Not Working

**Problem:** Clicking breadcrumb links doesn't navigate.

**Solution:** Ensure you're using Next.js Link correctly and hrefs are valid:
```typescript
// ✅ Correct
{ label: 'Machines', href: '/vending-machines' }

// ❌ Wrong
{ label: 'Machines', href: 'vending-machines' }  // Missing leading /
{ label: 'Machines', href: '#' }  // Invalid for breadcrumbs
```

### Issue: TypeScript Errors

**Problem:** Type errors when passing items prop.

**Solution:** Import the interface:
```typescript
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/Breadcrumbs';

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Contact' }
];
```

---

## Maintenance

### Adding Breadcrumbs to New Pages

1. **Identify page hierarchy** in site structure
2. **Create breadcrumb items array** with proper parent pages
3. **Import and render component** with consistent spacing
4. **Test responsive behavior** on mobile, tablet, desktop
5. **Verify accessibility** with keyboard and screen reader
6. **Update SEO schema** if applicable

### Updating Existing Breadcrumbs

When page structure changes:

1. **Update all child pages** that reference the changed page
2. **Test navigation paths** to ensure links work
3. **Update schema markup** if URLs changed
4. **Check for orphaned pages** without breadcrumbs

### Code Review Checklist

When reviewing PRs with breadcrumb changes:

- [ ] Items array follows logical hierarchy
- [ ] Current page has no href
- [ ] Labels are concise and descriptive
- [ ] Proper spacing (pt-16 md:pt-20)
- [ ] Works on mobile devices
- [ ] No TypeScript errors
- [ ] Accessible with keyboard
- [ ] Links navigate correctly

---

## Component Code Reference

### Full Component Implementation

```tsx
// components/ui/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      className={`bg-[#000000]/80 backdrop-blur-sm border-b border-[#333333] ${className}`}
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight
                    className="w-4 h-4 text-[#4d4d4d]"
                    aria-hidden="true"
                  />
                )}

                {isLast ? (
                  <span
                    className="text-[#F5F5F5] font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="text-[#A5ACAF] hover:text-[#FD5A1E] transition-colors focus:outline-none focus:text-[#FD5A1E] flex items-center gap-1.5"
                  >
                    {isFirst && (
                      <Home className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span className="hidden sm:inline">{item.label}</span>
                    {isFirst && <span className="sm:hidden">Home</span>}
                  </Link>
                ) : (
                  <span className="text-[#A5ACAF]">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
```

---

## Quick Reference

### Common Breadcrumb Patterns

```typescript
// Homepage (usually no breadcrumbs)
// None

// Top-level pages
[
  { label: 'Home', href: '/' },
  { label: 'Page Name' }
]

// Category pages
[
  { label: 'Home', href: '/' },
  { label: 'Category Name' }
]

// Detail pages
[
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Item Name' }
]

// Deep hierarchy
[
  { label: 'Home', href: '/' },
  { label: 'Level 1', href: '/level1' },
  { label: 'Level 2', href: '/level1/level2' },
  { label: 'Level 3' }
]
```

### Spacing Classes

```tsx
{/* Standard spacing below fixed navbar */}
<div className="pt-16 md:pt-20">
  <Breadcrumbs items={breadcrumbItems} />
</div>

{/* With additional margin */}
<div className="pt-16 md:pt-20 mb-8">
  <Breadcrumbs items={breadcrumbItems} />
</div>
```

---

## Additional Resources

- [Google Search Central - Breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Schema.org - BreadcrumbList](https://schema.org/BreadcrumbList)
- [WCAG 2.1 - Navigation Mechanisms](https://www.w3.org/WAI/WCAG21/Understanding/multiple-ways.html)
- [Next.js Link Documentation](https://nextjs.org/docs/app/api-reference/components/link)

---

## Version History

- **v1.0.0** (2026-01-25): Initial implementation
  - Responsive breadcrumb component
  - Home icon and chevron separators
  - Accessibility features
  - Mobile text truncation
  - Integration in vending machine pages

---

## Support

For questions or issues with breadcrumbs:

1. Check this documentation first
2. Review component code in `components/ui/Breadcrumbs.tsx`
3. Check existing implementations in `app/vending-machines/`
4. Test in browser dev tools for responsive/accessibility issues

---

**Last Updated:** January 25, 2026
**Component Location:** `components/ui/Breadcrumbs.tsx`
**Documentation:** `docs/BREADCRUMBS_GUIDE.md`

# AccessibleButton Component - Implementation Guide

## Overview

The `AccessibleButton` component is a fully accessible, feature-rich button/link component with multiple variants, animations, and WCAG 2.1 AA compliance. It supports both button and anchor tag rendering based on whether an `href` prop is provided.

## Features

- ✅ **7 Variants**: primary, secondary, ghost, outline, gradient, cta, danger
- ✅ **4 Sizes**: sm, md, lg, xl
- ✅ **Animations**: Optional hover/press animations with smooth transitions
- ✅ **Icons**: Support for left and right icons
- ✅ **Loading States**: Built-in spinner with accessible loading text
- ✅ **Accessibility**: WCAG 2.1 AA compliant with proper focus states, aria labels, and keyboard navigation
- ✅ **Responsive**: Works seamlessly across all devices
- ✅ **Analytics**: Automatic phone call tracking for tel: links

---

## Variant Showcase

### Primary
**Use Case**: Main actions, form submissions, primary CTAs
```tsx
<AccessibleButton variant="primary" size="lg">
  Submit Form
</AccessibleButton>
```
- Orange background with black text
- Shadow effects that intensify on hover
- Subtle scale animation (1.02x on hover)

### Secondary
**Use Case**: Alternative actions, less emphasis than primary
```tsx
<AccessibleButton variant="secondary" size="md">
  Learn More
</AccessibleButton>
```
- Orange border with transparent background
- Fills with orange on hover
- Perfect for pairing with primary buttons

### Ghost
**Use Case**: Subtle actions, navigation links, tertiary actions
```tsx
<AccessibleButton variant="ghost" size="md">
  Cancel
</AccessibleButton>
```
- Transparent with minimal styling
- Subtle background on hover
- Text changes to orange on hover

### Outline
**Use Case**: Alternative CTAs, secondary navigation
```tsx
<AccessibleButton variant="outline" size="lg">
  View Details
</AccessibleButton>
```
- White border with transparent background
- Inverts colors on hover (fills white, black text)
- Clean, modern aesthetic

### Gradient
**Use Case**: Premium features, special offers, highlighted actions
```tsx
<AccessibleButton variant="gradient" size="lg" animate>
  Premium Feature
</AccessibleButton>
```
- Eye-catching gradient (orange → red)
- Shimmer effect on hover
- Scale animation for extra attention
- Best with `animate` prop

### CTA (Call-to-Action)
**Use Case**: Most important actions, conversion-focused buttons
```tsx
<AccessibleButton variant="cta" size="xl" rightIcon={<ArrowRight />}>
  Get Started Now
</AccessibleButton>
```
- Bold gradient with white border
- Fills with white background on hover
- Strongest visual hierarchy
- Perfect for hero sections and conversion points

### Danger
**Use Case**: Destructive actions, deletions, warnings
```tsx
<AccessibleButton variant="danger" size="md">
  Delete Account
</AccessibleButton>
```
- Red background signaling caution
- Reserved for destructive actions only
- Use sparingly to maintain impact

---

## Props Reference

```typescript
interface AccessibleButtonProps {
  // Appearance
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient' | 'cta' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;

  // Layout
  fullWidth?: boolean;  // Makes button stretch to container width

  // Animation
  animate?: boolean;    // Enables hover lift animation

  // Loading State
  loading?: boolean;
  loadingText?: string; // Defaults to "Loading..."

  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Link Behavior (makes it render as <a>)
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;         // Defaults to "noopener noreferrer" for external links

  // Standard button/a tag props
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  // ... all other HTML button attributes
}
```

---

## Usage Examples

### Basic Button
```tsx
import { AccessibleButton } from '@/components/ui/AccessibleButton';

<AccessibleButton variant="primary" size="md">
  Click Me
</AccessibleButton>
```

### Button with Icons
```tsx
import { Phone, ArrowRight } from 'lucide-react';

<AccessibleButton
  variant="primary"
  leftIcon={<Phone size={18} />}
  size="lg"
>
  Call Now
</AccessibleButton>

<AccessibleButton
  variant="cta"
  rightIcon={<ArrowRight size={20} />}
  size="xl"
>
  Get Started
</AccessibleButton>
```

### Link (Renders as `<a>`)
```tsx
// Internal link
<AccessibleButton
  variant="primary"
  href="/contact"
  size="md"
>
  Contact Us
</AccessibleButton>

// External link (automatically adds security attributes)
<AccessibleButton
  variant="secondary"
  href="https://example.com"
  target="_blank"
  size="md"
>
  Visit Website
</AccessibleButton>
```

### With Loading State
```tsx
const [isLoading, setIsLoading] = useState(false);

<AccessibleButton
  variant="primary"
  loading={isLoading}
  loadingText="Submitting..."
  onClick={handleSubmit}
>
  Submit
</AccessibleButton>
```

### With Animations
```tsx
<AccessibleButton
  variant="gradient"
  size="lg"
  animate  // Adds hover lift effect
>
  Explore Features
</AccessibleButton>
```

### Full Width (Mobile Friendly)
```tsx
<AccessibleButton
  variant="primary"
  size="lg"
  fullWidth
  className="sm:w-auto"  // Full width on mobile, auto on desktop
>
  Continue
</AccessibleButton>
```

### Phone Link (with Analytics)
```tsx
<AccessibleButton
  variant="cta"
  href="tel:+12094035450"
  leftIcon={<Phone />}
>
  Call (209) 403-5450
</AccessibleButton>
// Automatically tracks phone clicks via gtag
```

---

## Best Practices

### Variant Selection Guide

1. **Use Primary** for:
   - Form submissions
   - Main page actions
   - Default emphasized buttons

2. **Use Secondary** for:
   - Alternative actions alongside primary
   - Less critical navigation
   - Cancel buttons (when not destructive)

3. **Use Ghost** for:
   - Tertiary actions
   - Inline links in content
   - Minimal emphasis needed

4. **Use Outline** for:
   - Clean, modern secondary actions
   - Pairs well with gradient/cta variants
   - Hero section secondary CTAs

5. **Use Gradient** for:
   - Premium features
   - Special offers
   - Eye-catching content sections

6. **Use CTA** for:
   - Most important conversion points
   - Hero section primary actions
   - "Get Started" / "Sign Up" buttons
   - One per page/section for maximum impact

7. **Use Danger** for:
   - Account deletion
   - Permanent data removal
   - Warning actions
   - Use sparingly!

### Accessibility Checklist

✅ **Always provide descriptive text** - Avoid generic "Click Here"
✅ **Use semantic HTML** - Component auto-selects button vs anchor
✅ **Include aria-labels** for icon-only buttons
✅ **Test keyboard navigation** - Tab, Enter, Space should all work
✅ **Maintain color contrast** - All variants meet WCAG AA standards
✅ **Communicate loading states** - Built-in aria-busy support

### Size Guidelines

- **sm**: Compact spaces, inline buttons, mobile-optimized layouts
- **md**: Default size, most common use case, balanced for all devices
- **lg**: Hero sections, prominent CTAs, desktop emphasis
- **xl**: Hero banners, maximum impact moments, conversion-critical actions

### Animation Guidelines

- Use `animate` prop for:
  - CTA buttons in hero sections
  - Cards/product listings
  - Interactive elements that need attention

- Avoid `animate` for:
  - Form submission buttons
  - Navigation items
  - High-frequency interaction buttons

### Performance Considerations

- **Lazy Load Icons**: Import only needed icons from lucide-react
- **Avoid Inline Styles**: Use className for custom styling
- **Minimize Re-renders**: Memoize icon components if passed as props
- **CSS Transitions**: All animations use CSS for optimal performance

---

## Common Patterns

### Hero Section
```tsx
<div className="flex flex-wrap justify-center gap-4">
  <AccessibleButton
    variant="gradient"
    size="lg"
    href="/get-started"
    animate
  >
    Get Started
  </AccessibleButton>

  <AccessibleButton
    variant="outline"
    size="lg"
    href="/learn-more"
    animate
  >
    Learn More
  </AccessibleButton>
</div>
```

### Form Actions
```tsx
<div className="flex gap-3">
  <AccessibleButton
    variant="primary"
    type="submit"
    loading={isSubmitting}
    rightIcon={<Send />}
  >
    Submit
  </AccessibleButton>

  <AccessibleButton
    variant="ghost"
    type="button"
    onClick={handleCancel}
  >
    Cancel
  </AccessibleButton>
</div>
```

### Contact Section
```tsx
<AccessibleButton
  variant="cta"
  size="xl"
  href="/contact"
  rightIcon={<ArrowRight />}
  animate
>
  Get in Touch
</AccessibleButton>
```

### Footer CTA
```tsx
<AccessibleButton
  variant="secondary"
  href="tel:+12094035450"
  leftIcon={<Phone />}
  size="md"
>
  Call Now
</AccessibleButton>
```

---

## Migration Guide

### From Standard Button
```tsx
// Before
<button className="px-6 py-3 bg-orange-500 text-black rounded-lg">
  Click Me
</button>

// After
<AccessibleButton variant="primary" size="md">
  Click Me
</AccessibleButton>
```

### From Standard Link
```tsx
// Before
<a href="/contact" className="px-6 py-3 bg-orange-500 rounded-lg">
  Contact
</a>

// After
<AccessibleButton variant="primary" size="md" href="/contact">
  Contact
</AccessibleButton>
```

---

## Troubleshooting

### Icons Not Displaying
- Ensure icons are imported: `import { Icon } from 'lucide-react'`
- Check icon size matches button size (16-20px recommended)

### Styles Not Applying
- Check for className conflicts
- Ensure Tailwind CSS classes are not being purged
- Use `cn()` utility for combining classes

### Link Not Working
- Verify `href` prop is provided
- Check Next.js version for compatibility
- For Next.js <13, wrap in `<Link>` manually

### TypeScript Errors
- Ensure proper import: `import { AccessibleButton } from '@/components/ui/AccessibleButton'`
- Check that props match `AccessibleButtonProps` interface

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari 14+, Chrome Android 90+)

---

## Contributing

When adding new variants:
1. Update `AccessibleButtonProps` interface
2. Add variant styles to `variantStyles` object
3. Ensure WCAG AA contrast compliance
4. Test with keyboard navigation
5. Update this documentation

---

## Related Components

- **PhoneButton**: Specialized button for phone links (legacy, prefer AccessibleButton with href="tel:")
- **Button**: Basic button (consider migrating to AccessibleButton)
- **Link**: Next.js Link (AccessibleButton handles routing automatically)

---

## Version History

- **v2.0**: Added outline, gradient, danger variants + animations + xl size
- **v1.0**: Initial release with primary, secondary, ghost, cta variants

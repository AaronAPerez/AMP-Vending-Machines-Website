import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { Phone, Mail, ArrowRight, Download, Heart } from 'lucide-react';

/**
 * Button Showcase Component
 * 
 * Demonstrates all available button variants with different configurations.
 * Use this as a reference or style guide page in your application.
 * 
 * Place this on a test/showcase page to see all variants in action!
 */
export function ButtonShowcase() {
  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-center text-5xl font-bold text-whitesmoke">
          AMP Vending Button Variants
        </h1>
        <p className="mb-16 text-center text-xl text-silver">
          Choose the right style for your call-to-action
        </p>

        {/* CTA Variant - Your Custom Gradient Style */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-whitesmoke">
              CTA Variant (Your Custom Style)
            </h2>
            <p className="text-silver">
              Eye-catching gradient with pulse animation - perfect for primary CTAs
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Small */}
            <AccessibleButton variant="cta" size="sm">
              Small CTA
            </AccessibleButton>

            {/* Medium (default) */}
            <AccessibleButton variant="cta" size="md">
              Medium CTA
            </AccessibleButton>

            {/* Large */}
            <AccessibleButton variant="cta" size="lg">
              Large CTA
            </AccessibleButton>

            {/* With left icon */}
            <AccessibleButton
              variant="cta"
              size="lg"
              leftIcon={<Phone className="h-6 w-6" />}
            >
              Call Now
            </AccessibleButton>

            {/* With right icon */}
            <AccessibleButton
              variant="cta"
              size="lg"
              rightIcon={<ArrowRight className="h-6 w-6" />}
            >
              Get Started
            </AccessibleButton>

            {/* As a link */}
            <AccessibleButton
              variant="cta"
              size="lg"
              href="/contact"
              rightIcon={<Mail className="h-5 w-5" />}
            >
              Contact Us
            </AccessibleButton>

            {/* Disabled */}
            <AccessibleButton variant="cta" size="lg" disabled>
              Disabled CTA
            </AccessibleButton>

            {/* Loading */}
            <AccessibleButton
              variant="cta"
              size="lg"
              loading
              loadingText="Sending..."
            >
              Submit
            </AccessibleButton>
          </div>

          {/* Real-world examples */}
          <div className="mt-12 rounded-lg border border-yellow-400/30 bg-dark-gray/50 p-8">
            <h3 className="mb-6 text-center text-2xl font-semibold text-whitesmoke">
              Real-World CTA Examples
            </h3>
            
            <div className="space-y-8">
              {/* Example 1: Hero Section */}
              <div className="rounded-lg bg-black p-6 text-center">
                <h4 className="mb-2 text-xl font-bold text-whitesmoke">
                  Premium Vending Solutions
                </h4>
                <p className="mb-4 text-silver">
                  Transform your workplace today
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <AccessibleButton
                    variant="cta"
                    size="lg"
                    href="tel:+12094035450"
                    leftIcon={<Phone className="h-6 w-6" />}
                  >
                    Call (209) 403-5450
                  </AccessibleButton>
                  <AccessibleButton
                    variant="secondary"
                    size="lg"
                    href="/contact"
                  >
                    Get Free Quote
                  </AccessibleButton>
                </div>
              </div>

              {/* Example 2: Service Area */}
              <div className="rounded-lg bg-black p-6">
                <h4 className="mb-4 text-center text-xl font-bold text-whitesmoke">
                  Select Your City
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  <AccessibleButton variant="cta" href="/service-areas/modesto">
                    Modesto
                  </AccessibleButton>
                  <AccessibleButton variant="cta" href="/service-areas/stockton">
                    Stockton
                  </AccessibleButton>
                  <AccessibleButton variant="cta" href="/service-areas/turlock">
                    Turlock
                  </AccessibleButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Variant */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-whitesmoke">
              Primary Variant
            </h2>
            <p className="text-silver">
              Solid orange background - for important secondary actions
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <AccessibleButton variant="primary" size="sm">
              Small Primary
            </AccessibleButton>

            <AccessibleButton variant="primary" size="md">
              Medium Primary
            </AccessibleButton>

            <AccessibleButton variant="primary" size="lg">
              Large Primary
            </AccessibleButton>

            <AccessibleButton
              variant="primary"
              size="lg"
              leftIcon={<Download className="h-5 w-5" />}
            >
              Download Brochure
            </AccessibleButton>

            <AccessibleButton
              variant="primary"
              size="lg"
              href="/vending-machines"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              View Products
            </AccessibleButton>

            <AccessibleButton variant="primary" size="lg" disabled>
              Disabled
            </AccessibleButton>

            <AccessibleButton variant="primary" size="lg" loading>
              Loading
            </AccessibleButton>
          </div>
        </section>

        {/* Secondary Variant */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-whitesmoke">
              Secondary Variant
            </h2>
            <p className="text-silver">
              Orange border with transparent background - for alternative actions
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <AccessibleButton variant="secondary" size="sm">
              Small Secondary
            </AccessibleButton>

            <AccessibleButton variant="secondary" size="md">
              Medium Secondary
            </AccessibleButton>

            <AccessibleButton variant="secondary" size="lg">
              Large Secondary
            </AccessibleButton>

            <AccessibleButton
              variant="secondary"
              size="lg"
              leftIcon={<Mail className="h-5 w-5" />}
            >
              Email Us
            </AccessibleButton>

            <AccessibleButton
              variant="secondary"
              size="lg"
              href="/about"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Learn More
            </AccessibleButton>

            <AccessibleButton variant="secondary" size="lg" disabled>
              Disabled
            </AccessibleButton>

            <AccessibleButton variant="secondary" size="lg" loading>
              Loading
            </AccessibleButton>
          </div>
        </section>

        {/* Ghost Variant */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-whitesmoke">
              Ghost Variant
            </h2>
            <p className="text-silver">
              Transparent with subtle hover - for tertiary actions
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <AccessibleButton variant="ghost" size="sm">
              Small Ghost
            </AccessibleButton>

            <AccessibleButton variant="ghost" size="md">
              Medium Ghost
            </AccessibleButton>

            <AccessibleButton variant="ghost" size="lg">
              Large Ghost
            </AccessibleButton>

            <AccessibleButton
              variant="ghost"
              size="lg"
              leftIcon={<Heart className="h-5 w-5" />}
            >
              Add to Favorites
            </AccessibleButton>

            <AccessibleButton
              variant="ghost"
              size="lg"
              href="/blog"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              View Blog
            </AccessibleButton>

            <AccessibleButton variant="ghost" size="lg" disabled>
              Disabled
            </AccessibleButton>

            <AccessibleButton variant="ghost" size="lg" loading>
              Loading
            </AccessibleButton>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mt-20 rounded-lg border border-orange/30 bg-dark-gray p-8">
          <h2 className="mb-6 text-center text-3xl font-bold text-whitesmoke">
            Usage Guidelines
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-orange">
                <span className="text-2xl">✅</span> Do
              </h3>
              <ul className="space-y-2 text-silver">
                <li>• Use CTA variant for primary actions (1-2 per page)</li>
                <li>• Use Primary variant for important secondary actions</li>
                <li>• Use Secondary variant for alternative actions</li>
                <li>• Use Ghost variant for subtle, less important actions</li>
                <li>• Include descriptive text (not just &quot;Click Here&quot;)</li>
                <li>• Add icons to enhance clarity</li>
                <li>• Use href for navigation links</li>
                <li>• Add loading states for async actions</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-red-500">
                <span className="text-2xl">❌</span> Don&apos;t
              </h3>
              <ul className="space-y-2 text-silver">
                <li>• Overuse CTA variant (loses impact)</li>
                <li>• Use vague text like &quot;Click Here&quot; or &quot;Submit&quot;</li>
                <li>• Forget to add loading states</li>
                <li>• Use icons without text (accessibility)</li>
                <li>• Mix too many variants on one screen</li>
                <li>• Forget to test keyboard navigation</li>
                <li>• Ignore disabled states</li>
                <li>• Skip proper contrast ratios</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Hierarchy Example */}
        <section className="mt-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-whitesmoke">
            Visual Hierarchy Example
          </h2>
          
          <div className="rounded-lg border border-silver/30 bg-dark-gray p-12 text-center">
            <h3 className="mb-4 text-4xl font-bold text-whitesmoke">
              Ready to Transform Your Workplace?
            </h3>
            <p className="mb-8 text-xl text-silver">
              Get started with premium vending solutions today
            </p>

            {/* Proper button hierarchy */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              {/* Primary action - CTA variant */}
              <AccessibleButton
                variant="cta"
                size="lg"
                href="tel:+12094035450"
                leftIcon={<Phone className="h-6 w-6" />}
              >
                Call (209) 403-5450
              </AccessibleButton>

              {/* Secondary action - Primary variant */}
              <AccessibleButton
                variant="primary"
                size="lg"
                href="/contact"
                rightIcon={<Mail className="h-5 w-5" />}
              >
                Request Quote
              </AccessibleButton>

              {/* Tertiary action - Secondary variant */}
              <AccessibleButton
                variant="secondary"
                size="lg"
                href="/vending-machines"
              >
                View Products
              </AccessibleButton>
            </div>

            <p className="mt-6 text-sm text-silver">
              Notice how the CTA variant draws your eye first?
            </p>
          </div>
        </section>

        {/* Code Reference */}
        <section className="mt-20 rounded-lg border border-orange/30 bg-dark-gray p-8">
          <h2 className="mb-6 text-center text-3xl font-bold text-whitesmoke">
            Quick Code Reference
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg bg-black p-4">
              <p className="mb-2 font-mono text-sm text-orange">
                {`<AccessibleButton variant="cta" href="tel:+12094035450">`}
              </p>
              <p className="pl-4 font-mono text-sm text-whitesmoke">
                Call Now
              </p>
              <p className="font-mono text-sm text-orange">
                {`</AccessibleButton>`}
              </p>
            </div>

            <div className="rounded-lg bg-black p-4">
              <p className="mb-2 font-mono text-sm text-orange">
                {`<AccessibleButton variant="primary" href="/contact">`}
              </p>
              <p className="pl-4 font-mono text-sm text-whitesmoke">
                Get Quote
              </p>
              <p className="font-mono text-sm text-orange">
                {`</AccessibleButton>`}
              </p>
            </div>

            <div className="rounded-lg bg-black p-4">
              <p className="mb-2 font-mono text-sm text-orange">
                {`<AccessibleButton variant="secondary" href="/about">`}
              </p>
              <p className="pl-4 font-mono text-sm text-whitesmoke">
                Learn More
              </p>
              <p className="font-mono text-sm text-orange">
                {`</AccessibleButton>`}
              </p>
            </div>

            <div className="rounded-lg bg-black p-4">
              <p className="mb-2 font-mono text-sm text-orange">
                {`<AccessibleButton variant="ghost" onClick={handleClick}>`}
              </p>
              <p className="pl-4 font-mono text-sm text-whitesmoke">
                Close
              </p>
              <p className="font-mono text-sm text-orange">
                {`</AccessibleButton>`}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
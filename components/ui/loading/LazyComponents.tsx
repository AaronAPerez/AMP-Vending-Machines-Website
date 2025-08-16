import React from "react";
import { lazy } from "react";

// Critical components (load immediately)
export const ResponsiveHero = lazy(() => 
  import('../../../components/hero/ResponsiveHero').then(module => ({
    default: module.ResponsiveHero
  }))
);

// Viewport-based lazy components (load when scrolled into view)
export const WorkplaceTransformSection = lazy(() => 
  import('../../../components/landing/WorkplaceTransformSection')
);

export const VendingMachineShowcase = lazy(() => 
  import('../../../components/landing/VendingMachineShowcase')
);

export const ProductSection = lazy(() => 
  import('../../../components/landing/ProductSection')
);

export const ProcessSection = lazy(() => 
  import('../../../components/landing/ProcessSection')
);

export const ServiceAreaSection = lazy(() => 
  import('../../../components/landing/ServiceAreaSection')
);

export const FAQSection = lazy(() => 
  import('../../../components/landing/FAQSection')
);

export const HomeContactSection = lazy(() => 
  import('../../../components/landing/HomeContactSection')
);

export const CTASection = lazy(() => 
  import('../../../components/landing/CTASection')
);

// Interaction-based lazy components (load when user interacts)
export const ContactForm = lazy(() => 
  import('../../../components/forms/LazyContactForm')
);

export const FeedbackForm = lazy(() => 
  import('../../../components/feedback/FeedbackForm')
);

// Deferred components (load after delay)
export const Analytics = lazy(() => 
  import('@vercel/analytics/react').then(module => ({
    default: module.Analytics
  }))
);

export const SpeedInsights = lazy(() => 
  import('@vercel/speed-insights/next').then(module => ({
    default: module.SpeedInsights
  }))
);
'use client';

import { useState } from 'react';
import { ButtonShowcase } from '@/components/ButtonShowcase';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import Card from '@/components/ui/core/Card';
import { Input } from '@/components/ui/forms/Input';
import { AccessibleButton } from '@/components/ui/AccessibleButton';
import { Phone, Mail, ArrowRight, X, CheckCircle, Star, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { MachineCard } from '../vending-machines/listing';
import vendingMachineData, { normalizeMachineData } from '@/lib/data/vendingMachineData';

/**
 * Components Showcase Page
 *
 * Displays all UI components in one place for easy testing and editing.
 * Access this page at: /components-showcase
 */
export default function ComponentsShowcase() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'buttons' | 'cards' | 'forms' | 'popup' | 'email'>('buttons');

  // Exit Intent Popup State
  const [exitIntentContent, setExitIntentContent] = useState({
    headline: "Wait! Don't Miss Out...",
    subheadline: "Get a FREE Vending Machine!",
    valueProposition: "Join the many businesses in Modesto & Stanislaus County providing premium vending at zero cost!",
    ctaButton: "Get Your Free Machine",
    phoneButton: "Call (209) 403-5450",
    phoneNumber: "+12094035450",
    benefit1: '21.5" HD touchscreen',
    benefit2: 'Contactless payments',
    benefit3: 'Weekly restocking',
    benefit4: 'Zero upfront costs',
    stat1Value: '100%',
    stat1Label: 'Free Setup',
    stat2Value: '24/7',
    stat2Label: 'Service',
    stat3Value: '50+',
    stat3Label: 'Products',
    offerBadge: 'FREE Premium Touchscreen Machines!'
  });

  // Email Template State
  const [emailContent, setEmailContent] = useState({
    autoResponse: {
      subject: 'Thank You for Contacting AMP Vending!',
      greeting: 'Hi [Customer Name],',
      intro: "Thank you for reaching out to AMP Vending Machines! We've received your message and our team will get back to you within 24 hours.",
      step1: 'Our team reviews your specific needs',
      step2: 'We prepare a customized vending solution',
      step3: 'You receive a detailed proposal',
      closing: 'In the meantime, feel free to call us directly at (209) 403-5450 if you have any urgent questions.',
      signature: 'The AMP Vending Team'
    },
    leadNotification: {
      subject: 'New Lead from Website',
      source: 'ampvendingmachines.com'
    },
    serviceReminder: {
      subject: 'Your Vending Machine Service Update',
      greeting: 'Hi [Customer Name],',
      intro: 'This is a friendly reminder that your vending machine is scheduled for restocking and maintenance on:',
      service1: 'Fully restock all products',
      service2: 'Clean and sanitize the machine',
      service3: 'Check all mechanical components',
      service4: 'Update payment system software',
      closing: 'Need to reschedule or have product requests? Reply to this email or call us at (209) 403-5450.',
      signature: 'Thank you for choosing AMP Vending!'
    }
  });

  // Recommended Exit Intent Templates
  const exitIntentTemplates = [
    {
      name: 'Default (Current)',
      content: exitIntentContent
    },
    {
      name: 'Urgent Offer',
      content: {
        headline: "Wait! Limited Time Offer 🔥",
        subheadline: "Get 50% Off Your First Month!",
        valueProposition: "Don't miss this exclusive deal for new customers in Stanislaus County. Premium vending machines with unbeatable savings!",
        ctaButton: "Claim Your 50% Discount",
        phoneButton: "Call Now: (209) 403-5450",
        phoneNumber: "+12094035450",
        benefit1: 'Premium touchscreen machines',
        benefit2: '50% off first month',
        benefit3: 'Free installation included',
        benefit4: 'No contract required',
        stat1Value: '50%',
        stat1Label: 'Off First Month',
        stat2Value: '$0',
        stat2Label: 'Setup Fee',
        stat3Value: '100+',
        stat3Label: 'Happy Clients',
        offerBadge: 'LIMITED TIME: 50% OFF FIRST MONTH!'
      }
    },
    {
      name: 'Social Proof',
      content: {
        headline: "Before You Go...",
        subheadline: "See Why 100+ Businesses Trust Us",
        valueProposition: "Join the leading businesses across Central California who've upgraded their break rooms with AMP Vending's premium machines!",
        ctaButton: "Get Started Today",
        phoneButton: "Speak to Our Team",
        phoneNumber: "+12094035450",
        benefit1: 'Trusted by 100+ companies',
        benefit2: 'A+ BBB rating',
        benefit3: '5-star customer reviews',
        benefit4: 'Local family-owned business',
        stat1Value: '100+',
        stat1Label: 'Businesses',
        stat2Value: '5⭐',
        stat2Label: 'Rating',
        stat3Value: '15+',
        stat3Label: 'Years',
        offerBadge: 'TRUSTED BY 100+ LOCAL BUSINESSES!'
      }
    },
    {
      name: 'Problem-Solution',
      content: {
        headline: "Tired of Empty Vending Machines?",
        subheadline: "We Guarantee Fresh Stock Weekly!",
        valueProposition: "Say goodbye to out-of-stock machines and unhappy employees. Our automated restocking ensures your team always has what they need.",
        ctaButton: "Never Run Out Again",
        phoneButton: "Schedule Consultation",
        phoneNumber: "+12094035450",
        benefit1: 'Guaranteed weekly restocking',
        benefit2: 'Real-time inventory alerts',
        benefit3: 'Custom product selection',
        benefit4: '24/7 customer support',
        stat1Value: '99%',
        stat1Label: 'Uptime',
        stat2Value: 'Weekly',
        stat2Label: 'Restocking',
        stat3Value: '24/7',
        stat3Label: 'Support',
        offerBadge: 'NEVER DEAL WITH EMPTY MACHINES AGAIN!'
      }
    }
  ];

  // Recommended Email Templates
  const emailTemplates = {
    autoResponse: [
      {
        name: 'Professional',
        content: {
          subject: 'Thank You for Contacting AMP Vending!',
          greeting: 'Hello [Customer Name],',
          intro: "We appreciate you reaching out to AMP Vending Machines. Your inquiry has been received and we'll respond within 24 business hours.",
          step1: 'Your message is assigned to a specialist',
          step2: 'We analyze your vending requirements',
          step3: 'You receive a comprehensive proposal',
          closing: 'For immediate assistance, please call us at (209) 403-5450.',
          signature: 'Best regards,\nAMP Vending Team'
        }
      },
      {
        name: 'Friendly & Casual',
        content: {
          subject: "We Got Your Message! 🎉",
          greeting: 'Hey [Customer Name]!',
          intro: "Thanks so much for getting in touch! We're excited to help you find the perfect vending solution. Our team is on it and will reach back out within 24 hours!",
          step1: "We'll review what you're looking for",
          step2: "We'll put together some awesome options",
          step3: "You'll get a personalized quote",
          closing: "Can't wait? Give us a ring at (209) 403-5450 - we'd love to chat!",
          signature: 'Cheers,\nThe AMP Vending Crew'
        }
      },
      {
        name: 'Value-Focused',
        content: {
          subject: 'Your FREE Vending Machine Quote is Being Prepared!',
          greeting: 'Hi [Customer Name],',
          intro: "Excellent choice reaching out! We're already working on your custom vending solution. Here's what makes AMP different: FREE installation, NO upfront costs, and premium touchscreen machines!",
          step1: 'We calculate your ROI potential',
          step2: 'We customize machine & product selection',
          step3: 'You get a detailed cost-savings analysis',
          closing: 'Want to fast-track your quote? Call our team at (209) 403-5450.',
          signature: 'To Your Success,\nAMP Vending Machines'
        }
      }
    ],
    serviceReminder: [
      {
        name: 'Standard',
        content: {
          subject: 'Your Vending Machine Service Update',
          greeting: 'Hi [Customer Name],',
          intro: 'This is a friendly reminder that your vending machine is scheduled for restocking and maintenance on:',
          service1: 'Fully restock all products',
          service2: 'Clean and sanitize the machine',
          service3: 'Check all mechanical components',
          service4: 'Update payment system software',
          closing: 'Need to reschedule or have product requests? Reply to this email or call us at (209) 403-5450.',
          signature: 'Thank you for choosing AMP Vending!'
        }
      },
      {
        name: 'Detailed',
        content: {
          subject: 'Upcoming Service: [Date] - What to Expect',
          greeting: 'Dear [Customer Name],',
          intro: 'Your scheduled vending machine maintenance is coming up. Here\'s exactly what our certified technicians will do:',
          service1: 'Restock all products (200+ items checked)',
          service2: 'Deep clean exterior & interior surfaces',
          service3: 'Test all mechanical & electrical systems',
          service4: 'Update software & verify payment processing',
          closing: 'Questions or special requests? Contact us at (209) 403-5450 at least 24 hours before your appointment.',
          signature: 'Your AMP Service Team'
        }
      }
    ]
  };

  const resetExitIntent = () => {
    setExitIntentContent(exitIntentTemplates[0].content);
  };

  const loadExitIntentTemplate = (templateIndex: number) => {
    setExitIntentContent(exitIntentTemplates[templateIndex].content);
  };

  const resetEmailTemplate = (type: 'autoResponse' | 'serviceReminder') => {
    if (type === 'autoResponse') {
      setEmailContent({
        ...emailContent,
        autoResponse: emailTemplates.autoResponse[0].content
      });
    } else {
      setEmailContent({
        ...emailContent,
        serviceReminder: emailTemplates.serviceReminder[0].content
      });
    }
  };

  const loadEmailTemplate = (type: 'autoResponse' | 'serviceReminder', templateIndex: number) => {
    if (type === 'autoResponse') {
      setEmailContent({
        ...emailContent,
        autoResponse: emailTemplates.autoResponse[templateIndex].content
      });
    } else {
      setEmailContent({
        ...emailContent,
        serviceReminder: emailTemplates.serviceReminder[templateIndex].content
      });
    }
  };

  // Machine Card Selection State
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(0);

  // Real machine data from vendingMachineData.ts
  const realMachineIds = [
    'premium-snack-vending-machine-touchscreen',
    'refrigerated-touchscreen-vending-machine',
    'vendo-821-v21-blue-refresh-high-capacity'
  ];

  // Get real machines and normalize them for display
  const sampleMachines = realMachineIds
    .map(id => vendingMachineData[id])
    .filter((machine): machine is NonNullable<typeof machine> => Boolean(machine))
    .map(machine => normalizeMachineData(machine))
    .filter((machine): machine is NonNullable<typeof machine> => machine !== null);

  // Ensure we always have a valid machine (fallback to first if selected index is out of bounds)
  const sampleMachine = sampleMachines[selectedMachineIndex] || sampleMachines[0]!;

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header - positioned under navbar */}
      <header className="bg-[#111111] border-b border-[#333333]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F5]">
                AMP Components Showcase
              </h1>
              <p className="text-sm text-[#A5ACAF] mt-1">
                All UI components in one place for easy testing and editing
              </p>
            </div>
            <AccessibleButton
              variant="cta"
              size="sm"
              href="/"
            >
              Back to Site
            </AccessibleButton>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-2 mt-6 overflow-x-auto pb-2" role="tablist">
            {[
              { id: 'buttons', label: 'Buttons' },
              { id: 'cards', label: 'Cards' },
              { id: 'forms', label: 'Forms' },
              { id: 'popup', label: 'Exit Intent' },
              { id: 'email', label: 'Email Templates' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'bg-[#FD5A1E] text-white'
                    : 'bg-[#333333] text-[#A5ACAF] hover:bg-[#444444] hover:text-[#F5F5F5]'
                }`}
                role="tab"
                aria-selected={selectedTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">

        {/* Buttons Section */}
        {selectedTab === 'buttons' && (
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Button Variants</h2>
              <p className="text-[#A5ACAF]">
                All available button styles with different sizes and states
              </p>
            </div>
            <ButtonShowcase />
          </section>
        )}

        {/* Cards Section */}
        {selectedTab === 'cards' && (
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Card Components</h2>
              <p className="text-[#A5ACAF]">
                Different card styles and layouts for content display
              </p>
            </div>

            <div className="space-y-12">
              {/* Card Variants */}
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Basic Card Variants</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Default Card */}
                  <Card variant="default" padding="md">
                    <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">Default Card</h4>
                    <p className="text-[#A5ACAF] text-sm mb-4">
                      Standard card with neutral styling. Perfect for general content.
                    </p>
                    <div className="flex gap-2">
                      <AccessibleButton variant="primary" size="sm">
                        Action
                      </AccessibleButton>
                      <AccessibleButton variant="ghost" size="sm">
                        Cancel
                      </AccessibleButton>
                    </div>
                  </Card>

                  {/* Highlighted Card */}
                  <Card variant="highlighted" padding="md">
                    <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">Highlighted Card</h4>
                    <p className="text-[#A5ACAF] text-sm mb-4">
                      Featured card with orange accent. Great for special offers.
                    </p>
                    <div className="flex gap-2">
                      <AccessibleButton variant="cta" size="sm">
                        Get Started
                      </AccessibleButton>
                    </div>
                  </Card>

                  {/* Outlined Card */}
                  <Card variant="outlined" padding="md">
                    <h4 className="text-lg font-bold text-[#F5F5F5] mb-2">Outlined Card</h4>
                    <p className="text-[#A5ACAF] text-sm mb-4">
                      Minimal card with border only. Subtle and clean.
                    </p>
                    <div className="flex gap-2">
                      <AccessibleButton variant="secondary" size="sm">
                        Learn More
                      </AccessibleButton>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Card Padding Options */}
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Card Padding Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card variant="default" padding="none">
                    <div className="p-4 bg-[#FD5A1E]/10">
                      <p className="text-[#F5F5F5] text-sm font-bold">No Padding</p>
                      <p className="text-[#A5ACAF] text-xs">padding=&quot;none&quot;</p>
                    </div>
                  </Card>
                  <Card variant="default" padding="sm">
                    <p className="text-[#F5F5F5] text-sm font-bold">Small</p>
                    <p className="text-[#A5ACAF] text-xs">padding=&quot;sm&quot;</p>
                  </Card>
                  <Card variant="default" padding="md">
                    <p className="text-[#F5F5F5] text-sm font-bold">Medium</p>
                    <p className="text-[#A5ACAF] text-xs">padding=&quot;md&quot;</p>
                  </Card>
                  <Card variant="default" padding="lg">
                    <p className="text-[#F5F5F5] text-sm font-bold">Large</p>
                    <p className="text-[#A5ACAF] text-xs">padding=&quot;lg&quot;</p>
                  </Card>
                </div>
              </div>

              {/* Machine Card */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#F5F5F5]">Machine Card Component</h3>
                </div>

                {/* Machine Selector */}
                <Card variant="highlighted" padding="lg" className="mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-3">
                      Select Machine Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {sampleMachines.map((machine, index) => (
                        <AccessibleButton
                          key={machine.id}
                          variant={selectedMachineIndex === index ? "cta" : "secondary"}
                          size="sm"
                          onClick={() => setSelectedMachineIndex(index)}
                          fullWidth
                        >
                          {machine.name}
                        </AccessibleButton>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[#A5ACAF]">Category:</span>
                        <span className="text-[#F5F5F5] ml-2 font-semibold">{sampleMachine.category}</span>
                      </div>
                      <div>
                        <span className="text-[#A5ACAF]">Model:</span>
                        <span className="text-[#F5F5F5] ml-2 font-semibold">{sampleMachine.model}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#A5ACAF]">Best For:</span>
                        <span className="text-[#F5F5F5] ml-2">
                          {Array.isArray(sampleMachine.bestFor)
                            ? sampleMachine.bestFor.join(', ')
                            : sampleMachine.bestFor}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Live Card Preview */}
                <div className="max-w-sm mx-auto">
                  <MachineCard machine={sampleMachine} variant="grid" index={0} />
                </div>

                <div className="mt-4 p-4 bg-[#111111] rounded-lg border border-[#333333]">
                  <p className="text-[#A5ACAF] text-sm">
                    <span className="text-[#FD5A1E] font-bold">Note:</span> Machine cards are
                    fully clickable and include hover effects, loading states, and SEO optimization.
                    Select different machine types above to preview various card configurations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Forms Section */}
        {selectedTab === 'forms' && (
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Form Components</h2>
              <p className="text-[#A5ACAF]">
                Input fields, textareas, and form controls
              </p>
            </div>

            <div className="max-w-2xl space-y-8">
              {/* Input Field Examples */}
              <Card variant="default" padding="lg">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Input Fields</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Text Input
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Email Input
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Phone Input
                    </label>
                    <Input
                      type="tel"
                      placeholder="(209) 403-5450"
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Disabled Input
                    </label>
                    <Input
                      type="text"
                      placeholder="Disabled field"
                      disabled
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>
                </div>
              </Card>

              {/* Contact Form Example */}
              <Card variant="highlighted" padding="lg">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">Sample Contact Form</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        required
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        required
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-[#F5F5F5] focus:border-[#FD5A1E] focus:ring-2 focus:ring-[#FD5A1E]/20 transition-colors"
                      placeholder="Tell us about your vending machine needs..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <AccessibleButton
                      variant="cta"
                      size="lg"
                      type="submit"
                      rightIcon={<ArrowRight className="h-5 w-5" />}
                    >
                      Send Message
                    </AccessibleButton>
                    <AccessibleButton variant="ghost" size="lg" type="reset">
                      Clear Form
                    </AccessibleButton>
                  </div>
                </form>
              </Card>
            </div>
          </section>
        )}

        {/* Exit Intent Popup Section */}
        {selectedTab === 'popup' && (
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Exit Intent Popup Editor</h2>
              <p className="text-[#A5ACAF]">
                Edit and preview your exit intent popup with live updates
              </p>
            </div>

            {/* Template Selector */}
            <Card variant="highlighted" padding="lg" className="mb-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
                📋 Recommended Templates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {exitIntentTemplates.map((template, index) => (
                  <AccessibleButton
                    key={index}
                    variant={index === 0 ? "cta" : "secondary"}
                    size="sm"
                    onClick={() => loadExitIntentTemplate(index)}
                    fullWidth
                  >
                    {template.name}
                  </AccessibleButton>
                ))}
              </div>
              <p className="text-xs text-[#A5ACAF] mt-3">
                💡 Tip: Start with a template and customize it to match your brand
              </p>
            </Card>

            {/* Editor and Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Editor Panel */}
              <Card variant="default" padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#F5F5F5]">✏️ Edit Content</h3>
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={resetExitIntent}
                  >
                    Reset
                  </AccessibleButton>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {/* Headlines */}
                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Main Headline
                    </label>
                    <Input
                      type="text"
                      value={exitIntentContent.headline}
                      onChange={(e) => setExitIntentContent({ ...exitIntentContent, headline: e.target.value })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Subheadline
                    </label>
                    <Input
                      type="text"
                      value={exitIntentContent.subheadline}
                      onChange={(e) => setExitIntentContent({ ...exitIntentContent, subheadline: e.target.value })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Value Proposition
                    </label>
                    <textarea
                      rows={3}
                      value={exitIntentContent.valueProposition}
                      onChange={(e) => setExitIntentContent({ ...exitIntentContent, valueProposition: e.target.value })}
                      className="w-full rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-[#F5F5F5] focus:border-[#FD5A1E] focus:ring-2 focus:ring-[#FD5A1E]/20 transition-colors"
                    />
                  </div>

                  {/* Benefits */}
                  <div className="border-t border-[#333333] pt-4">
                    <h4 className="text-sm font-bold text-[#F5F5F5] mb-3">Benefits List</h4>
                    <div className="space-y-2">
                      {['benefit1', 'benefit2', 'benefit3', 'benefit4'].map((key, idx) => (
                        <Input
                          key={key}
                          type="text"
                          placeholder={`Benefit ${idx + 1}`}
                          value={exitIntentContent[key as keyof typeof exitIntentContent] as string}
                          onChange={(e) => setExitIntentContent({ ...exitIntentContent, [key]: e.target.value })}
                          className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="border-t border-[#333333] pt-4">
                    <h4 className="text-sm font-bold text-[#F5F5F5] mb-3">Statistics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="text"
                        placeholder="Stat 1 Value"
                        value={exitIntentContent.stat1Value}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, stat1Value: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                      <Input
                        type="text"
                        placeholder="Stat 1 Label"
                        value={exitIntentContent.stat1Label}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, stat1Label: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                      <Input
                        type="text"
                        placeholder="Stat 2 Value"
                        value={exitIntentContent.stat2Value}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, stat2Value: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                      <Input
                        type="text"
                        placeholder="Stat 2 Label"
                        value={exitIntentContent.stat2Label}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, stat2Label: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                      <Input
                        type="text"
                        placeholder="Stat 3 Value"
                        value={exitIntentContent.stat3Value}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, stat3Value: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                      <Input
                        type="text"
                        placeholder="Stat 3 Label"
                        value={exitIntentContent.stat3Label}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, stat3Label: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="border-t border-[#333333] pt-4">
                    <h4 className="text-sm font-bold text-[#F5F5F5] mb-3">Call-to-Action</h4>
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Primary CTA Button Text"
                        value={exitIntentContent.ctaButton}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, ctaButton: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                      <Input
                        type="text"
                        placeholder="Phone Button Text"
                        value={exitIntentContent.phoneButton}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, phoneButton: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={exitIntentContent.phoneNumber}
                        onChange={(e) => setExitIntentContent({ ...exitIntentContent, phoneNumber: e.target.value })}
                        className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                      />
                    </div>
                  </div>

                  {/* Offer Badge */}
                  <div className="border-t border-[#333333] pt-4">
                    <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                      Special Offer Badge
                    </label>
                    <Input
                      type="text"
                      value={exitIntentContent.offerBadge}
                      onChange={(e) => setExitIntentContent({ ...exitIntentContent, offerBadge: e.target.value })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>
                </div>
              </Card>

              {/* Live Preview Panel */}
              <div>
                <Card variant="default" padding="md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#F5F5F5]">👁️ Live Preview</h3>
                    <AccessibleButton
                      variant="cta"
                      size="sm"
                      onClick={() => setShowExitIntent(true)}
                    >
                      Full Screen
                    </AccessibleButton>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#333333]">
                    <div className="relative w-full max-w-4xl mx-auto" style={{ maxHeight: '600px', overflow: 'auto' }}>
                      {/* Live Preview of Exit Intent Popup */}
                      <Card className="relative bg-gradient-to-br from-black via-[#1a1a1a] to-black shadow-2xl border-2 border-[#FD5A1E] overflow-hidden">
                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                          {/* Left Column - Image & Stats */}
                          <div className="relative hidden lg:flex lg:flex-col bg-gradient-to-br from-[#FD5A1E]/15 via-[#FD5A1E]/10 to-transparent p-8">
                            <div className="mb-6">
                              <Image
                                src="/images/logo/AMP_logo.webp"
                                alt="AMP Vending Machines"
                                width={150}
                                height={50}
                                className="object-contain mx-auto"
                              />
                            </div>
                            <div className="relative flex-1 min-h-[280px] mb-6">
                              <Image
                                src="/images/machines/amp-refrigerated-vending-machine-tap-to-pay.webp"
                                alt="Premium Touchscreen Vending Machine"
                                fill
                                className="object-contain drop-shadow-2xl"
                                sizes="(max-width: 768px) 0vw, 50vw"
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                                <div className="text-xl font-bold text-[#FD5A1E] mb-1">{exitIntentContent.stat1Value}</div>
                                <div className="text-xs text-[#A5ACAF]">{exitIntentContent.stat1Label}</div>
                              </div>
                              <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                                <div className="text-xl font-bold text-[#FD5A1E] mb-1">{exitIntentContent.stat2Value}</div>
                                <div className="text-xs text-[#A5ACAF]">{exitIntentContent.stat2Label}</div>
                              </div>
                              <div className="text-center p-2.5 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                                <div className="text-xl font-bold text-[#FD5A1E] mb-1">{exitIntentContent.stat3Value}</div>
                                <div className="text-xs text-[#A5ACAF]">{exitIntentContent.stat3Label}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 px-3 py-2 mt-4 rounded-lg bg-gradient-to-r from-[#FD5A1E]/20 to-orange-600/20 border-2 border-[#FD5A1E]">
                              <Sparkles className="h-4 w-4 text-[#FD5A1E] animate-pulse flex-shrink-0" />
                              <span className="font-bold text-[#FD5A1E] text-xs text-center">{exitIntentContent.offerBadge}</span>
                            </div>
                          </div>

                          {/* Right Column - Content */}
                          <div className="p-6 md:p-8 lg:p-8">
                            <div className="lg:hidden mb-4 flex justify-center">
                              <Image
                                src="/images/logo/AMP_logo.webp"
                                alt="AMP Vending Machines"
                                width={120}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <div className="text-center mb-4">
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FD5A1E]/20 mb-3 animate-pulse">
                                <Sparkles className="h-6 w-6 text-[#FD5A1E]" />
                              </div>
                              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">{exitIntentContent.headline}</h2>
                              <p className="text-sm md:text-base text-[#FD5A1E] font-semibold">{exitIntentContent.subheadline}</p>
                            </div>
                            <p className="text-sm text-[#F5F5F5] leading-relaxed text-center mb-4">{exitIntentContent.valueProposition}</p>
                            <div className="grid grid-cols-3 gap-3 mb-6 lg:hidden">
                              <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                                <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">{exitIntentContent.stat1Value}</div>
                                <div className="text-xs text-[#A5ACAF]">{exitIntentContent.stat1Label}</div>
                              </div>
                              <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                                <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">{exitIntentContent.stat2Value}</div>
                                <div className="text-xs text-[#A5ACAF]">{exitIntentContent.stat2Label}</div>
                              </div>
                              <div className="text-center p-3 bg-[#4d4d4d]/30 rounded-lg border border-[#FD5A1E]/20">
                                <div className="text-xl md:text-2xl font-bold text-[#FD5A1E] mb-1">{exitIntentContent.stat3Value}</div>
                                <div className="text-xs text-[#A5ACAF]">{exitIntentContent.stat3Label}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 px-4 py-2.5 mb-6 rounded-lg bg-gradient-to-r from-[#FD5A1E]/20 to-orange-600/20 border-2 border-[#FD5A1E] lg:hidden">
                              <Sparkles className="h-4 w-4 text-[#FD5A1E] animate-pulse flex-shrink-0" />
                              <span className="font-bold text-[#FD5A1E] text-xs md:text-sm text-center">{exitIntentContent.offerBadge}</span>
                            </div>
                            <div className="space-y-1.5 mb-4">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
                                <span className="text-[#F5F5F5] text-xs">{exitIntentContent.benefit1}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
                                <span className="text-[#F5F5F5] text-xs">{exitIntentContent.benefit2}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
                                <span className="text-[#F5F5F5] text-xs">{exitIntentContent.benefit3}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-[#FD5A1E] flex-shrink-0 mt-0.5" />
                                <span className="text-[#F5F5F5] text-xs">{exitIntentContent.benefit4}</span>
                              </div>
                            </div>
                            <form className="space-y-2.5">
                              <div className="grid grid-cols-1 gap-2">
                                <input type="text" placeholder="Your Name" className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]" />
                                <input type="email" placeholder="Your Email (Optional)" className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]" />
                                <input type="tel" placeholder="Your Phone (Optional)" className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:border-[#FD5A1E] focus:ring-1 focus:ring-[#FD5A1E]" />
                              </div>
                              <div className="space-y-2">
                                <AccessibleButton type="submit" variant="cta" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />} fullWidth className="touch-manipulation" style={{ minHeight: '48px' }}>
                                  {exitIntentContent.ctaButton}
                                </AccessibleButton>
                                <AccessibleButton variant="outline" size="md" href={`tel:${exitIntentContent.phoneNumber}`} leftIcon={<Phone className="h-4 w-4" />} fullWidth className="touch-manipulation" style={{ minHeight: '44px' }}>
                                  {exitIntentContent.phoneButton}
                                </AccessibleButton>
                              </div>
                            </form>
                            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 pt-3 text-xs text-[#A5ACAF]">
                              <span>✓ No contracts</span>
                              <span>✓ Cancel anytime</span>
                              <span className="hidden sm:inline">✓ Local service</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Features Info Card */}
            <Card variant="highlighted" padding="lg" className="mt-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FD5A1E]/20">
                  <CheckCircle className="h-8 w-8 text-[#FD5A1E]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2">Exit Intent Features</h3>
                  <p className="text-[#A5ACAF]">Smart, conversion-optimized popup system</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <CheckCircle className="h-5 w-5 text-[#FD5A1E] mb-2" />
                    <h4 className="text-[#F5F5F5] font-semibold mb-1">Desktop Exit Detection</h4>
                    <p className="text-[#A5ACAF] text-sm">Triggers when mouse leaves viewport from top</p>
                  </div>
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <CheckCircle className="h-5 w-5 text-[#FD5A1E] mb-2" />
                    <h4 className="text-[#F5F5F5] font-semibold mb-1">Mobile Scroll Detection</h4>
                    <p className="text-[#A5ACAF] text-sm">Activates on rapid upward scroll near top</p>
                  </div>
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <CheckCircle className="h-5 w-5 text-[#FD5A1E] mb-2" />
                    <h4 className="text-[#F5F5F5] font-semibold mb-1">Touch-Friendly Targets</h4>
                    <p className="text-[#A5ACAF] text-sm">WCAG 2.1 AA compliant (44x44px minimum)</p>
                  </div>
                  <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <CheckCircle className="h-5 w-5 text-[#FD5A1E] mb-2" />
                    <h4 className="text-[#F5F5F5] font-semibold mb-1">Session Management</h4>
                    <p className="text-[#A5ACAF] text-sm">Shows once per session, stored in sessionStorage</p>
                  </div>
                </div>
                <div className="p-4 bg-[#FD5A1E]/10 border border-[#FD5A1E]/30 rounded-lg">
                  <p className="text-[#F5F5F5] text-sm">
                    <span className="font-bold text-[#FD5A1E]">💡 Tip:</span> Edit the content above and see live updates in the preview. Use the &quot;Full Screen&quot; button to test the actual popup experience.
                  </p>
                </div>
              </div>
            </Card>

            {/* Show exit intent when button is clicked */}
            {showExitIntent && (
              <div className="fixed inset-0 z-[100]">
                <ExitIntentPopup delay={0} />
                {/* Add manual close button for showcase */}
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="fixed top-4 right-4 z-[101] p-3 bg-[#FD5A1E] hover:bg-[#FD5A1E]/80 rounded-lg text-white font-bold shadow-lg"
                >
                  Close Preview
                </button>
              </div>
            )}
          </section>
        )}

        {/* Email Templates Section */}
        {selectedTab === 'email' && (
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#F5F5F5] mb-2">Email Templates Editor</h2>
              <p className="text-[#A5ACAF]">
                Edit and preview your automated email templates
              </p>
            </div>

            {/* Auto-Response Template */}
            <Card variant="highlighted" padding="lg" className="mb-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
                📧 Contact Form Auto-Response
              </h3>

              {/* Template Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Choose Template
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {emailTemplates.autoResponse.map((template, index) => (
                    <AccessibleButton
                      key={index}
                      variant={index === 0 ? "cta" : "secondary"}
                      size="sm"
                      onClick={() => loadEmailTemplate('autoResponse', index)}
                      fullWidth
                    >
                      {template.name}
                    </AccessibleButton>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-[#F5F5F5]">✏️ Edit Content</h4>
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => resetEmailTemplate('autoResponse')}
                    >
                      Reset
                    </AccessibleButton>
                  </div>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    <Input
                      type="text"
                      placeholder="Email Subject"
                      value={emailContent.autoResponse.subject}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        autoResponse: { ...emailContent.autoResponse, subject: e.target.value }
                      })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                    <Input
                      type="text"
                      placeholder="Greeting"
                      value={emailContent.autoResponse.greeting}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        autoResponse: { ...emailContent.autoResponse, greeting: e.target.value }
                      })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                    <textarea
                      rows={3}
                      placeholder="Introduction"
                      value={emailContent.autoResponse.intro}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        autoResponse: { ...emailContent.autoResponse, intro: e.target.value }
                      })}
                      className="w-full rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-[#F5F5F5] focus:border-[#FD5A1E] focus:ring-2 focus:ring-[#FD5A1E]/20 transition-colors text-sm"
                    />
                    <div className="border-t border-[#333333] pt-3">
                      <label className="block text-xs font-medium text-[#A5ACAF] mb-2">Next Steps</label>
                      {['step1', 'step2', 'step3'].map((key, idx) => (
                        <Input
                          key={key}
                          type="text"
                          placeholder={`Step ${idx + 1}`}
                          value={emailContent.autoResponse[key as keyof typeof emailContent.autoResponse] as string}
                          onChange={(e) => setEmailContent({
                            ...emailContent,
                            autoResponse: { ...emailContent.autoResponse, [key]: e.target.value }
                          })}
                          className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5] mb-2"
                        />
                      ))}
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Closing"
                      value={emailContent.autoResponse.closing}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        autoResponse: { ...emailContent.autoResponse, closing: e.target.value }
                      })}
                      className="w-full rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-[#F5F5F5] focus:border-[#FD5A1E] focus:ring-2 focus:ring-[#FD5A1E]/20 transition-colors text-sm"
                    />
                    <Input
                      type="text"
                      placeholder="Signature"
                      value={emailContent.autoResponse.signature}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        autoResponse: { ...emailContent.autoResponse, signature: e.target.value }
                      })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div>
                  <h4 className="text-lg font-bold text-[#F5F5F5] mb-4">👁️ Live Preview</h4>
                  <div className="bg-white text-black p-6 rounded-lg max-h-[500px] overflow-y-auto">
                    <div className="max-w-xl mx-auto">
                      <div className="text-center mb-4">
                        <div className="w-24 h-24 mx-auto mb-3 bg-[#FD5A1E] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl font-bold">AMP</span>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">{emailContent.autoResponse.subject}</h1>
                      </div>
                      <div className="space-y-3 text-gray-700 text-sm">
                        <p>{emailContent.autoResponse.greeting}</p>
                        <p>{emailContent.autoResponse.intro}</p>
                        <div className="bg-gray-50 border-l-4 border-[#FD5A1E] p-3 my-4">
                          <p className="font-semibold text-gray-900 mb-2 text-sm">What Happens Next?</p>
                          <ul className="space-y-1.5 text-xs">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
                              <span>{emailContent.autoResponse.step1}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
                              <span>{emailContent.autoResponse.step2}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
                              <span>{emailContent.autoResponse.step3}</span>
                            </li>
                          </ul>
                        </div>
                        <p>{emailContent.autoResponse.closing}</p>
                        <p className="font-semibold whitespace-pre-line">{emailContent.autoResponse.signature}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
                        <p>AMP Vending Machines</p>
                        <p>Serving Modesto & Stanislaus County</p>
                        <p>(209) 403-5450 | info@ampvendingmachines.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service Reminder Template */}
            <Card variant="highlighted" padding="lg" className="mb-6">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
                🔧 Service Reminder Email
              </h3>

              {/* Template Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Choose Template
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {emailTemplates.serviceReminder.map((template, index) => (
                    <AccessibleButton
                      key={index}
                      variant={index === 0 ? "cta" : "secondary"}
                      size="sm"
                      onClick={() => loadEmailTemplate('serviceReminder', index)}
                      fullWidth
                    >
                      {template.name}
                    </AccessibleButton>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-[#F5F5F5]">✏️ Edit Content</h4>
                    <AccessibleButton
                      variant="ghost"
                      size="sm"
                      onClick={() => resetEmailTemplate('serviceReminder')}
                    >
                      Reset
                    </AccessibleButton>
                  </div>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    <Input
                      type="text"
                      placeholder="Email Subject"
                      value={emailContent.serviceReminder.subject}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        serviceReminder: { ...emailContent.serviceReminder, subject: e.target.value }
                      })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                    <Input
                      type="text"
                      placeholder="Greeting"
                      value={emailContent.serviceReminder.greeting}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        serviceReminder: { ...emailContent.serviceReminder, greeting: e.target.value }
                      })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Introduction"
                      value={emailContent.serviceReminder.intro}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        serviceReminder: { ...emailContent.serviceReminder, intro: e.target.value }
                      })}
                      className="w-full rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-[#F5F5F5] focus:border-[#FD5A1E] focus:ring-2 focus:ring-[#FD5A1E]/20 transition-colors text-sm"
                    />
                    <div className="border-t border-[#333333] pt-3">
                      <label className="block text-xs font-medium text-[#A5ACAF] mb-2">Service Items</label>
                      {['service1', 'service2', 'service3', 'service4'].map((key, idx) => (
                        <Input
                          key={key}
                          type="text"
                          placeholder={`Service ${idx + 1}`}
                          value={emailContent.serviceReminder[key as keyof typeof emailContent.serviceReminder] as string}
                          onChange={(e) => setEmailContent({
                            ...emailContent,
                            serviceReminder: { ...emailContent.serviceReminder, [key]: e.target.value }
                          })}
                          className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5] mb-2"
                        />
                      ))}
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Closing"
                      value={emailContent.serviceReminder.closing}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        serviceReminder: { ...emailContent.serviceReminder, closing: e.target.value }
                      })}
                      className="w-full rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-[#F5F5F5] focus:border-[#FD5A1E] focus:ring-2 focus:ring-[#FD5A1E]/20 transition-colors text-sm"
                    />
                    <Input
                      type="text"
                      placeholder="Signature"
                      value={emailContent.serviceReminder.signature}
                      onChange={(e) => setEmailContent({
                        ...emailContent,
                        serviceReminder: { ...emailContent.serviceReminder, signature: e.target.value }
                      })}
                      className="bg-[#1a1a1a] border-[#333333] text-[#F5F5F5]"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div>
                  <h4 className="text-lg font-bold text-[#F5F5F5] mb-4">👁️ Live Preview</h4>
                  <div className="bg-white text-black p-6 rounded-lg max-h-[500px] overflow-y-auto">
                    <div className="max-w-xl mx-auto">
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-[#FD5A1E] to-orange-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">{emailContent.serviceReminder.subject}</h1>
                      </div>
                      <div className="space-y-3 text-gray-700 text-sm">
                        <p>{emailContent.serviceReminder.greeting}</p>
                        <p>{emailContent.serviceReminder.intro}</p>
                        <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] p-3 rounded-lg text-center my-4">
                          <p className="text-lg font-bold text-[#FD5A1E]">Thursday, January 30, 2026</p>
                          <p className="text-gray-600 text-xs">Between 10:00 AM - 2:00 PM</p>
                        </div>
                        <p className="text-xs font-semibold">What we&apos;ll do during this service:</p>
                        <ul className="space-y-1.5 text-xs">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{emailContent.serviceReminder.service1}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{emailContent.serviceReminder.service2}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{emailContent.serviceReminder.service3}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{emailContent.serviceReminder.service4}</span>
                          </li>
                        </ul>
                        <p className="text-xs">{emailContent.serviceReminder.closing}</p>
                        <p className="font-semibold text-xs">{emailContent.serviceReminder.signature}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Lead Notification (Static - Internal Use Only) */}
            <div className="space-y-8">
              {/* Contact Form Auto-Response */}
              <Card variant="default" padding="lg">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
                  Contact Form Auto-Response
                </h3>
                <div className="bg-white text-black p-8 rounded-lg">
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 mx-auto mb-4 bg-[#FD5A1E] rounded-lg flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">AMP</span>
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Thank You for Contacting AMP Vending!
                      </h1>
                    </div>

                    <div className="space-y-4 text-gray-700">
                      <p>Hi [Customer Name],</p>

                      <p>
                        Thank you for reaching out to <strong>AMP Vending Machines</strong>!
                        We&apos;ve received your message and our team will get back to you within
                        24 hours.
                      </p>

                      <div className="bg-gray-50 border-l-4 border-[#FD5A1E] p-4 my-6">
                        <p className="font-semibold text-gray-900 mb-2">
                          What Happens Next?
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
                            <span>Our team reviews your specific needs</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
                            <span>We prepare a customized vending solution</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-[#FD5A1E] mr-2 flex-shrink-0 mt-0.5" />
                            <span>You receive a detailed proposal</span>
                          </li>
                        </ul>
                      </div>

                      <p>
                        In the meantime, feel free to call us directly at{' '}
                        <a href="tel:+12094035450" className="text-[#FD5A1E] font-semibold">
                          (209) 403-5450
                        </a>{' '}
                        if you have any urgent questions.
                      </p>

                      <p className="font-semibold">
                        Best regards,<br />
                        The AMP Vending Team
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                      <p>AMP Vending Machines</p>
                      <p>Serving Modesto & Stanislaus County</p>
                      <p>(209) 403-5450 | info@ampvendingmachines.com</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Lead Notification Email */}
              <Card variant="default" padding="lg">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
                  Internal Lead Notification
                </h3>
                <div className="bg-white text-black p-8 rounded-lg">
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-[#FD5A1E] text-white p-4 rounded-lg mb-6">
                      <h1 className="text-xl font-bold flex items-center">
                        <Star className="h-6 w-6 mr-2" />
                        New Lead from Website
                      </h1>
                      <p className="text-sm opacity-90">ampvendingmachines.com</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500 mb-1">Name</p>
                          <p className="font-semibold">John Smith</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500 mb-1">Company</p>
                          <p className="font-semibold">ABC Corporation</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500 mb-1">Email</p>
                          <p className="font-semibold text-sm">john@example.com</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500 mb-1">Phone</p>
                          <p className="font-semibold">(209) 555-0123</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-xs text-gray-500 mb-2">Message</p>
                        <p className="text-sm">
                          We&apos;re interested in getting a vending machine for our office
                          with about 50 employees. Looking for healthy snack options.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <AccessibleButton variant="cta" size="sm" fullWidth>
                          <Mail className="h-4 w-4 mr-2" />
                          Reply to Lead
                        </AccessibleButton>
                        <AccessibleButton variant="primary" size="sm" fullWidth>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </AccessibleButton>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Service Reminder Email */}
              <Card variant="default" padding="lg">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
                  Service Reminder Email
                </h3>
                <div className="bg-white text-black p-8 rounded-lg">
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#FD5A1E] to-orange-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-white" />
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Your Vending Machine Service Update
                      </h1>
                    </div>

                    <div className="space-y-4 text-gray-700">
                      <p>Hi [Customer Name],</p>

                      <p>
                        This is a friendly reminder that your vending machine is scheduled
                        for restocking and maintenance on:
                      </p>

                      <div className="bg-[#FD5A1E]/10 border border-[#FD5A1E] p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#FD5A1E]">
                          Thursday, January 25, 2026
                        </p>
                        <p className="text-gray-600">Between 10:00 AM - 2:00 PM</p>
                      </div>

                      <p className="text-sm">
                        <strong>What we&apos;ll do during this service:</strong>
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Fully restock all products</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Clean and sanitize the machine</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check all mechanical components</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Update payment system software</span>
                        </li>
                      </ul>

                      <p className="text-sm">
                        Need to reschedule or have product requests? Reply to this email
                        or call us at <strong>(209) 403-5450</strong>.
                      </p>

                      <p className="font-semibold">
                        Thank you for choosing AMP Vending!
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#333333] bg-[#111111] py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#A5ACAF] text-sm">
            AMP Vending Machines Components Showcase
          </p>
          <p className="text-[#666666] text-xs mt-2">
            For development and testing purposes only
          </p>
        </div>
      </footer>
    </div>
  );
}

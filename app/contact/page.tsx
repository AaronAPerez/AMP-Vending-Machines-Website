import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us | AMP Vending',
  description: 'Get in touch with AMP Vending for personalized vending machine solutions for your workplace.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}

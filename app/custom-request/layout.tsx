import type { Metadata } from 'next';
import { getCustomMachineRequestData } from '@/lib/data/vendingMachineData';

const customData = getCustomMachineRequestData();

export const metadata: Metadata = {
  title: customData.seoTitle,
  description: customData.metaDescription,
  keywords: [...customData.keywords, ...customData.localKeywords].join(', '),

  alternates: {
    canonical: 'https://ampvendingmachines.com/custom-request',
  },

  openGraph: {
    title: customData.openGraphTitle,
    description: customData.openGraphDescription,
    url: 'https://ampvendingmachines.com/custom-request',
    siteName: 'AMP Vending Machines',
    images: [
      {
        url: `https://ampvendingmachines.com${customData.openGraphImage}`,
        width: 1200,
        height: 630,
        alt: customData.openGraphDescription,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: customData.openGraphTitle,
    description: customData.openGraphDescription,
    images: [`https://ampvendingmachines.com${customData.openGraphImage}`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CustomRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

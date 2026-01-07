import { PAGE_METADATA } from '@/lib/data/seoData';
import OptimizedHomePage from '@/components/landing/OptimizedHomePage';



export const metadata = PAGE_METADATA.HOME;

export default function HomePage() {
  return (
    // <Suspense fallback={<SectionLoadingFallback />}>
      <OptimizedHomePage />
    // </Suspense>
  );
}
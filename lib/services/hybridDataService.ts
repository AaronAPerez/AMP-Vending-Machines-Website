import { supabaseServer } from '../supabase';
import { MachineData } from '../data/vendingMachineData';
import vendingMachineDataStatic from '../data/vendingMachineData';

/**
 * Hybrid Data Service
 * Fetches data from database first, falls back to static data
 * Ensures zero downtime during migration and database failures
 */

export class HybridDataService {
  /**
   * Get all vending machines
   * Try database first, fallback to static data
   */
  static async getVendingMachines(): Promise<MachineData[]> {
    try {
      if (!supabaseServer) {
        console.warn('Supabase not configured, using static data');
        return this.getStaticMachines();
      }

      const { data, error } = await supabaseServer
        .from('vending_machines')
        .select('*, machine_images(*)')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        console.warn('Database fetch failed or empty, using static data:', error?.message);
        return this.getStaticMachines();
      }

      return this.transformDbMachines(data);
    } catch (error) {
      console.error('Error fetching machines from database, using static data:', error);
      return this.getStaticMachines();
    }
  }

  /**
   * Get single vending machine by slug
   */
  static async getVendingMachineBySlug(slug: string): Promise<MachineData | undefined> {
    try {
      if (!supabaseServer) {
        console.warn('Supabase not configured, using static data');
        return this.getStaticMachineBySlug(slug);
      }

      const { data, error } = await supabaseServer
        .from('vending_machines')
        .select('*, machine_images(*)')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        console.warn(`Database fetch failed for machine ${slug}, using static data:`, error?.message);
        return this.getStaticMachineBySlug(slug);
      }

      return this.transformDbMachine(data);
    } catch (error) {
      console.error(`Error fetching machine ${slug} from database, using static data:`, error);
      return this.getStaticMachineBySlug(slug);
    }
  }

  /**
   * Get vending machines by category
   */
  static async getVendingMachinesByCategory(
    category: 'refrigerated' | 'non-refrigerated'
  ): Promise<MachineData[]> {
    try {
      if (!supabaseServer) {
        return this.getStaticMachinesByCategory(category);
      }

      const { data, error } = await supabaseServer
        .from('vending_machines')
        .select('*, machine_images(*)')
        .eq('category', category)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        console.warn(`Database fetch failed for category ${category}, using static data`);
        return this.getStaticMachinesByCategory(category);
      }

      return this.transformDbMachines(data);
    } catch (error) {
      console.error(`Error fetching ${category} machines, using static data:`, error);
      return this.getStaticMachinesByCategory(category);
    }
  }

  /**
   * Transform database machine record to MachineData interface
   */
  private static transformDbMachine(dbMachine: any): MachineData {
    return {
      id: dbMachine.slug,
      name: dbMachine.name,
      category: dbMachine.category,
      seoTitle: dbMachine.seo_title,
      metaDescription: dbMachine.meta_description,
      shortDescription: dbMachine.short_description,
      description: dbMachine.description,
      image: dbMachine.machine_images?.[0]?.public_url || '/images/placeholder.webp',
      images: (dbMachine.machine_images || [])
        .sort((a: any, b: any) => a.display_order - b.display_order)
        .map((img: any) => ({
          id: img.id,
          src: img.public_url,
          alt: img.alt_text
        })),
      dimensions: dbMachine.dimensions || [],
      specifications: dbMachine.specifications || [],
      features: dbMachine.features || [],
      productOptions: dbMachine.product_options || [],
      bestFor: dbMachine.best_for || [],
      highlights: dbMachine.highlights || [],
      keywords: dbMachine.keywords || [],
      localKeywords: dbMachine.local_keywords || [],
      businessKeywords: dbMachine.business_keywords || [],
      relatedMachines: [] // TODO: Implement related machines lookup
    };
  }

  /**
   * Transform array of database machine records
   */
  private static transformDbMachines(dbMachines: any[]): MachineData[] {
    return dbMachines.map(m => this.transformDbMachine(m));
  }

  /**
   * Get static machines from hardcoded data
   */
  private static getStaticMachines(): MachineData[] {
    return Object.values(vendingMachineDataStatic);
  }

  /**
   * Get static machine by slug
   */
  private static getStaticMachineBySlug(slug: string): MachineData | undefined {
    return vendingMachineDataStatic[slug];
  }

  /**
   * Get static machines by category
   */
  private static getStaticMachinesByCategory(
    category: 'refrigerated' | 'non-refrigerated'
  ): MachineData[] {
    return Object.values(vendingMachineDataStatic).filter(
      m => m.category === category
    );
  }

  /**
   * Get products (for future implementation)
   */
  static async getProducts(): Promise<any[]> {
    try {
      if (!supabaseServer) {
        console.warn('Supabase not configured for products');
        return [];
      }

      const { data, error } = await supabaseServer
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Failed to fetch products from database:', error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  /**
   * Get service areas (for future implementation)
   */
  static async getServiceAreas(): Promise<any[]> {
    try {
      if (!supabaseServer) {
        console.warn('Supabase not configured for service areas');
        return [];
      }

      const { data, error } = await supabaseServer
        .from('service_areas')
        .select('*')
        .eq('is_active', true)
        .order('seo_priority', { ascending: false });

      if (error) {
        console.warn('Failed to fetch service areas from database:', error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching service areas:', error);
      return [];
    }
  }

  /**
   * Get business information
   */
  static async getBusinessInfo(): Promise<any | null> {
    try {
      if (!supabaseServer) {
        console.warn('Supabase not configured for business info');
        return null;
      }

      const { data, error } = await supabaseServer
        .from('business_info')
        .select('*')
        .single();

      if (error) {
        console.warn('Failed to fetch business info from database:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching business info:', error);
      return null;
    }
  }

  /**
   * Get SEO settings for a page
   */
  static async getSeoSettings(pagePath: string): Promise<any | null> {
    try {
      if (!supabaseServer) {
        console.warn('Supabase not configured for SEO settings');
        return null;
      }

      const { data, error } = await supabaseServer
        .from('seo_settings')
        .select('*')
        .eq('page_path', pagePath)
        .single();

      if (error) {
        // Not finding SEO settings is expected for many pages
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Error fetching SEO settings for ${pagePath}:`, error);
      return null;
    }
  }
}

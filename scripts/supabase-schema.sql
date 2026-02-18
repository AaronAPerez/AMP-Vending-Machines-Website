-- AMP Vending Machines Admin Dashboard
-- Complete Database Schema for Supabase PostgreSQL
-- Execute this script in your Supabase SQL Editor

-- =====================================================
-- TABLE 1: Vending Machines
-- =====================================================

CREATE TABLE IF NOT EXISTS vending_machines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('refrigerated', 'non-refrigerated')),

  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  seo_title TEXT,
  meta_description TEXT,

  -- Store as JSONB for flexibility
  dimensions JSONB NOT NULL,
  specifications JSONB NOT NULL,
  features JSONB NOT NULL,
  product_options JSONB NOT NULL,
  best_for JSONB NOT NULL,
  highlights JSONB,

  keywords TEXT[],
  local_keywords TEXT[],
  business_keywords TEXT[],

  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_machines_slug ON vending_machines(slug);
CREATE INDEX IF NOT EXISTS idx_machines_category ON vending_machines(category);
CREATE INDEX IF NOT EXISTS idx_machines_active ON vending_machines(is_active);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vending_machines_updated_at
  BEFORE UPDATE ON vending_machines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE 2: Machine Images
-- =====================================================

CREATE TABLE IF NOT EXISTS machine_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID NOT NULL REFERENCES vending_machines(id) ON DELETE CASCADE,

  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,

  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,

  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_machine_images_machine ON machine_images(machine_id);
CREATE INDEX IF NOT EXISTS idx_machine_images_order ON machine_images(machine_id, display_order);

-- =====================================================
-- TABLE 3: Products
-- =====================================================

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'chips', 'candy', 'protein', 'pastries', 'nuts',
    'snacks', 'beverages', 'energy', 'healthy'
  )),

  image_path TEXT,
  image_url TEXT,

  is_popular BOOLEAN DEFAULT false,
  is_healthy BOOLEAN DEFAULT false,
  details TEXT,

  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_popular ON products(is_popular) WHERE is_popular = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE 4: Service Areas
-- =====================================================

CREATE TABLE IF NOT EXISTS service_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  county TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('incorporated', 'unincorporated')),

  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  population INTEGER,

  seo_priority DECIMAL(3, 2) NOT NULL DEFAULT 0.7,
  keywords TEXT[],
  description TEXT,

  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_areas_county ON service_areas(county);
CREATE INDEX IF NOT EXISTS idx_service_areas_priority ON service_areas(seo_priority DESC);
CREATE INDEX IF NOT EXISTS idx_service_areas_slug ON service_areas(slug);

CREATE TRIGGER update_service_areas_updated_at
  BEFORE UPDATE ON service_areas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE 5: Business Info (Single Row)
-- =====================================================

CREATE TABLE IF NOT EXISTS business_info (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001'::UUID,

  business_name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  slogan TEXT,
  description TEXT NOT NULL,
  short_description TEXT,

  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL,

  street_address TEXT NOT NULL,
  suite TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'USA',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  business_hours JSONB NOT NULL,

  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,

  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT single_row CHECK (id = '00000000-0000-0000-0000-000000000001'::UUID)
);

CREATE TRIGGER update_business_info_updated_at
  BEFORE UPDATE ON business_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial row
INSERT INTO business_info (id, business_name, legal_name, description, phone, email, website, street_address, city, state, zip_code, business_hours)
VALUES (
  '00000000-0000-0000-0000-000000000001'::UUID,
  'AMP Vending Machines',
  'AMP Vending Machines LLC',
  'Leading vending machine supplier in Central California',
  '(555) 123-4567',
  'info@ampvendingmachines.com',
  'https://ampvendingmachines.com',
  '123 Business St',
  'Modesto',
  'CA',
  '95350',
  '{"monday": "8:00 AM - 5:00 PM", "tuesday": "8:00 AM - 5:00 PM", "wednesday": "8:00 AM - 5:00 PM", "thursday": "8:00 AM - 5:00 PM", "friday": "8:00 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::JSONB
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- TABLE 6: SEO Settings
-- =====================================================

CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT UNIQUE NOT NULL,

  title TEXT,
  meta_description TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  keywords TEXT[],

  structured_data JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_seo_settings_path ON seo_settings(page_path);

CREATE TRIGGER update_seo_settings_updated_at
  BEFORE UPDATE ON seo_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE 7: Contact Submissions
-- =====================================================

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
  assigned_to UUID,
  notes TEXT,
  responded_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns to existing table (if table already exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'contact_submissions') THEN
    ALTER TABLE contact_submissions
      ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new'
        CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
      ADD COLUMN IF NOT EXISTS assigned_to UUID,
      ADD COLUMN IF NOT EXISTS notes TEXT,
      ADD COLUMN IF NOT EXISTS responded_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE 8: Admin Users
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,

  oauth_provider TEXT,
  oauth_id TEXT,

  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'admin',

  permissions JSONB NOT NULL DEFAULT '[]'::JSONB,

  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_oauth ON admin_users(oauth_provider, oauth_id);

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TABLE 9: Admin Activity Log (Audit Trail)
-- =====================================================

CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID,

  action_type TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,

  old_values JSONB,
  new_values JSONB,

  ip_address TEXT,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_activity_user ON admin_activity_log(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_timestamp ON admin_activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_activity_resource ON admin_activity_log(resource_type, resource_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE vending_machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE machine_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Public read policies (for active content)
CREATE POLICY "Public read active machines" ON vending_machines
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read machine images" ON machine_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vending_machines
      WHERE vending_machines.id = machine_images.machine_id
      AND vending_machines.is_active = true
    )
  );

CREATE POLICY "Public read active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read active service areas" ON service_areas
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read business info" ON business_info
  FOR SELECT USING (true);

CREATE POLICY "Public read SEO settings" ON seo_settings
  FOR SELECT USING (true);

-- Admin write policies (service role only)
-- Note: These policies check for service_role, which is automatically set by Supabase
-- when using the service role key from your backend

CREATE POLICY "Service role full access machines" ON vending_machines
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access machine images" ON machine_images
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access products" ON products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access service areas" ON service_areas
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access business info" ON business_info
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access SEO settings" ON seo_settings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access contacts" ON contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access admin users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access activity log" ON admin_activity_log
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE vending_machines IS 'Vending machine catalog with full product details';
COMMENT ON TABLE machine_images IS 'Multiple images per vending machine with ordering';
COMMENT ON TABLE products IS 'Product catalog for all vendable items';
COMMENT ON TABLE service_areas IS 'Geographic service coverage areas';
COMMENT ON TABLE business_info IS 'Single-row table for business contact and information';
COMMENT ON TABLE seo_settings IS 'Per-page SEO metadata and structured data';
COMMENT ON TABLE contact_submissions IS 'Customer inquiries and contact form submissions';
COMMENT ON TABLE admin_users IS 'Admin user accounts with OAuth support';
COMMENT ON TABLE admin_activity_log IS 'Audit log of all admin actions';

-- =====================================================
-- COMPLETION
-- =====================================================

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Create storage buckets: machine-images, product-images, business-assets';
  RAISE NOTICE '2. Set bucket policies to public read access';
  RAISE NOTICE '3. Run data migration scripts to populate tables';
END $$;

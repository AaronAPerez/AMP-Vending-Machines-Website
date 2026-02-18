import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { createSeoSettingsSchema, seoFiltersSchema } from '@/lib/schemas/admin/seoSchema';
import { supabaseServer } from '@/lib/supabase';
import { z } from 'zod';

/**
 * GET /api/admin/seo
 * Get all SEO settings
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { searchParams } = new URL(request.url);
    const filters = {
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0
    };

    const validatedFilters = seoFiltersSchema.parse(filters);

    let query = supabaseServer
      .from('seo_settings')
      .select('*', { count: 'exact' });

    if (validatedFilters.search) {
      query = query.or(`page_path.ilike.%${validatedFilters.search}%,title.ilike.%${validatedFilters.search}%`);
    }

    query = query
      .order('page_path', { ascending: true })
      .range(validatedFilters.offset!, validatedFilters.offset! + validatedFilters.limit! - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        total: count || 0,
        limit: validatedFilters.limit,
        offset: validatedFilters.offset,
        hasMore: count ? validatedFilters.offset! + validatedFilters.limit! < count : false
      }
    });
  } catch (error) {
    console.error('GET /api/admin/seo error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch SEO settings' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/seo
 * Create new SEO settings for a page
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const body = await request.json();
    const validatedData = createSeoSettingsSchema.parse(body);

    // Check if SEO settings for this page already exist
    const { data: existing } = await supabaseServer
      .from('seo_settings')
      .select('id')
      .eq('page_path', validatedData.pagePath)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'SEO settings for this page already exist. Use PATCH to update.' },
        { status: 409 }
      );
    }

    const { data: seoSettings, error } = await supabaseServer
      .from('seo_settings')
      .insert({
        page_path: validatedData.pagePath,
        title: validatedData.title || null,
        meta_description: validatedData.metaDescription || null,
        og_title: validatedData.ogTitle || null,
        og_description: validatedData.ogDescription || null,
        og_image: validatedData.ogImage || null,
        keywords: validatedData.keywords || null,
        structured_data: validatedData.structuredData || null
      })
      .select()
      .single();

    if (error) throw error;

    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'create',
      resource_type: 'seo_settings',
      resource_id: seoSettings.id,
      new_values: validatedData
    });

    return NextResponse.json(
      { success: true, data: seoSettings, message: 'SEO settings created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/admin/seo error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create SEO settings' },
      { status: 500 }
    );
  }
}

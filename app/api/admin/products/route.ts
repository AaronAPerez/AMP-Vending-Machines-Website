import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { createProductSchema, productFiltersSchema } from '@/lib/schemas/admin/productSchema';
import { supabaseServer } from '@/lib/supabase';
import { z } from 'zod';

/**
 * GET /api/admin/products
 * Get all products with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { searchParams } = new URL(request.url);
    const filters = {
      category: searchParams.get('category') || undefined,
      active: searchParams.get('active') || undefined,
      popular: searchParams.get('popular') || undefined,
      healthy: searchParams.get('healthy') || undefined,
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0
    };

    const validatedFilters = productFiltersSchema.parse(filters);

    let query = supabaseServer
      .from('products')
      .select('*', { count: 'exact' });

    if (validatedFilters.category) {
      query = query.eq('category', validatedFilters.category);
    }

    if (validatedFilters.active) {
      query = query.eq('is_active', validatedFilters.active === 'true');
    }

    if (validatedFilters.popular) {
      query = query.eq('is_popular', validatedFilters.popular === 'true');
    }

    if (validatedFilters.healthy) {
      query = query.eq('is_healthy', validatedFilters.healthy === 'true');
    }

    if (validatedFilters.search) {
      query = query.or(`name.ilike.%${validatedFilters.search}%,slug.ilike.%${validatedFilters.search}%`);
    }

    query = query
      .order('display_order', { ascending: true })
      .order('name', { ascending: true })
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
    console.error('GET /api/admin/products error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const body = await request.json();
    const validatedData = createProductSchema.parse(body);

    // Check slug uniqueness
    const { data: existing } = await supabaseServer
      .from('products')
      .select('id')
      .eq('slug', validatedData.slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A product with this slug already exists' },
        { status: 409 }
      );
    }

    const { data: product, error } = await supabaseServer
      .from('products')
      .insert({
        slug: validatedData.slug,
        name: validatedData.name,
        category: validatedData.category,
        image_path: validatedData.imagePath || null,
        image_url: validatedData.imageUrl || null,
        is_popular: validatedData.isPopular,
        is_healthy: validatedData.isHealthy,
        details: validatedData.details || null,
        is_active: validatedData.isActive,
        display_order: validatedData.displayOrder
      })
      .select()
      .single();

    if (error) throw error;

    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'create',
      resource_type: 'product',
      resource_id: product.id,
      new_values: validatedData
    });

    return NextResponse.json(
      { success: true, data: product, message: 'Product created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/admin/products error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { createMachineSchema, machineFiltersSchema } from '@/lib/schemas/admin/machineSchema';
import { supabaseServer } from '@/lib/supabase';
import { z } from 'zod';

/**
 * GET /api/admin/machines
 * Get all vending machines with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const filters = {
      category: searchParams.get('category') || undefined,
      active: searchParams.get('active') || undefined,
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0
    };

    // Validate filters
    const validatedFilters = machineFiltersSchema.parse(filters);

    // Build query
    let query = supabaseServer
      .from('vending_machines')
      .select('*, machine_images(*)', { count: 'exact' });

    // Apply filters
    if (validatedFilters.category) {
      query = query.eq('category', validatedFilters.category);
    }

    if (validatedFilters.active) {
      query = query.eq('is_active', validatedFilters.active === 'true');
    }

    if (validatedFilters.search) {
      query = query.or(`name.ilike.%${validatedFilters.search}%,slug.ilike.%${validatedFilters.search}%`);
    }

    // Apply pagination
    query = query
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(validatedFilters.offset!, validatedFilters.offset! + validatedFilters.limit! - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching machines:', error);
      throw error;
    }

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
    console.error('GET /api/admin/machines error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request parameters',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch machines'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/machines
 * Create a new vending machine
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = createMachineSchema.parse(body);

    // Check if slug already exists
    const { data: existing } = await supabaseServer
      .from('vending_machines')
      .select('id')
      .eq('slug', validatedData.slug)
      .single();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'A machine with this slug already exists'
        },
        { status: 409 }
      );
    }

    // Insert machine
    const { data: machine, error } = await supabaseServer
      .from('vending_machines')
      .insert({
        slug: validatedData.slug,
        name: validatedData.name,
        category: validatedData.category,
        short_description: validatedData.shortDescription,
        description: validatedData.description,
        seo_title: validatedData.seoTitle || null,
        meta_description: validatedData.metaDescription || null,
        dimensions: validatedData.dimensions,
        specifications: validatedData.specifications,
        features: validatedData.features,
        product_options: validatedData.productOptions,
        best_for: validatedData.bestFor,
        highlights: validatedData.highlights || null,
        keywords: validatedData.keywords || null,
        local_keywords: validatedData.localKeywords || null,
        business_keywords: validatedData.businessKeywords || null,
        is_active: validatedData.isActive,
        display_order: validatedData.displayOrder
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating machine:', error);
      throw error;
    }

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'create',
      resource_type: 'vending_machine',
      resource_id: machine.id,
      new_values: validatedData
    });

    return NextResponse.json(
      {
        success: true,
        data: machine,
        message: 'Machine created successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/admin/machines error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create machine'
      },
      { status: 500 }
    );
  }
}

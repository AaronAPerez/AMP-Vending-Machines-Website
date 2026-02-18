import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { updateMachineSchema } from '@/lib/schemas/admin/machineSchema';
import { supabaseServer } from '@/lib/supabase';
import { z } from 'zod';

/**
 * GET /api/admin/machines/[id]
 * Get a single vending machine by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    const admin = await requireAdmin(request);
    console.log('Admin authenticated:', admin.email);

    if (!supabaseServer) {
      console.error('Supabase not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Database not configured'
        },
        { status: 500 }
      );
    }

    // Await params in Next.js 15
    const { id } = await params;
    console.log('Fetching machine with ID:', id);

    // Fetch machine with images
    const { data: machine, error } = await supabaseServer
      .from('vending_machines')
      .select('*, machine_images(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Machine not found'
          },
          { status: 404 }
        );
      }
      throw error;
    }

    console.log('Machine fetched successfully:', machine?.name);

    return NextResponse.json({
      success: true,
      data: machine
    });
  } catch (error: any) {
    console.error('GET /api/admin/machines/[id] error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack
    });

    // Handle authentication errors
    if (error.status === 401 || error.name === 'AuthError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required',
          code: 'UNAUTHORIZED'
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch machine',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/machines/[id]
 * Update a vending machine
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    // Await params in Next.js 15
    const { id } = await params;

    // Get existing machine for activity log
    const { data: existing } = await supabaseServer
      .from('vending_machines')
      .select('*')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Machine not found'
        },
        { status: 404 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = updateMachineSchema.parse(body);

    // If slug is being updated, check it doesn't conflict
    if (validatedData.slug && validatedData.slug !== existing.slug) {
      const { data: conflicting } = await supabaseServer
        .from('vending_machines')
        .select('id')
        .eq('slug', validatedData.slug)
        .neq('id', id)
        .single();

      if (conflicting) {
        return NextResponse.json(
          {
            success: false,
            error: 'A machine with this slug already exists'
          },
          { status: 409 }
        );
      }
    }

    // Build update object
    const updateData: any = {};
    if (validatedData.slug !== undefined) updateData.slug = validatedData.slug;
    if (validatedData.name !== undefined) updateData.name = validatedData.name;
    if (validatedData.category !== undefined) updateData.category = validatedData.category;
    if (validatedData.shortDescription !== undefined) updateData.short_description = validatedData.shortDescription;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.seoTitle !== undefined) updateData.seo_title = validatedData.seoTitle;
    if (validatedData.metaDescription !== undefined) updateData.meta_description = validatedData.metaDescription;
    if (validatedData.dimensions !== undefined) updateData.dimensions = validatedData.dimensions;
    if (validatedData.specifications !== undefined) updateData.specifications = validatedData.specifications;
    if (validatedData.features !== undefined) updateData.features = validatedData.features;
    if (validatedData.productOptions !== undefined) updateData.product_options = validatedData.productOptions;
    if (validatedData.bestFor !== undefined) updateData.best_for = validatedData.bestFor;
    if (validatedData.highlights !== undefined) updateData.highlights = validatedData.highlights;
    if (validatedData.keywords !== undefined) updateData.keywords = validatedData.keywords;
    if (validatedData.localKeywords !== undefined) updateData.local_keywords = validatedData.localKeywords;
    if (validatedData.businessKeywords !== undefined) updateData.business_keywords = validatedData.businessKeywords;
    if (validatedData.isActive !== undefined) updateData.is_active = validatedData.isActive;
    if (validatedData.displayOrder !== undefined) updateData.display_order = validatedData.displayOrder;

    // Update machine
    const { data: machine, error } = await supabaseServer
      .from('vending_machines')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating machine:', error);
      throw error;
    }

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'update',
      resource_type: 'vending_machine',
      resource_id: id,
      old_values: existing,
      new_values: validatedData
    });

    return NextResponse.json({
      success: true,
      data: machine,
      message: 'Machine updated successfully'
    });
  } catch (error) {
    console.error('PATCH /api/admin/machines/[id] error:', error);

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
        error: 'Failed to update machine'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/machines/[id]
 * Delete a vending machine (soft delete by setting is_active to false)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require authentication
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    // Await params in Next.js 15
    const { id } = await params;

    // Get existing machine for activity log
    const { data: existing } = await supabaseServer
      .from('vending_machines')
      .select('*')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Machine not found'
        },
        { status: 404 }
      );
    }

    // Soft delete by setting is_active to false
    const { error } = await supabaseServer
      .from('vending_machines')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting machine:', error);
      throw error;
    }

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'delete',
      resource_type: 'vending_machine',
      resource_id: id,
      old_values: existing
    });

    return NextResponse.json({
      success: true,
      message: 'Machine deleted successfully'
    });
  } catch (error) {
    console.error('DELETE /api/admin/machines/[id] error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete machine'
      },
      { status: 500 }
    );
  }
}

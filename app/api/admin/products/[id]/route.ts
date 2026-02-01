import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { updateProductSchema } from '@/lib/schemas/admin/productSchema';
import { supabaseServer } from '@/lib/supabase';
import { z } from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { data: product, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('GET /api/admin/products/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { data: existing } = await supabaseServer
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);

    if (validatedData.slug && validatedData.slug !== existing.slug) {
      const { data: conflicting } = await supabaseServer
        .from('products')
        .select('id')
        .eq('slug', validatedData.slug)
        .neq('id', params.id)
        .single();

      if (conflicting) {
        return NextResponse.json(
          { success: false, error: 'A product with this slug already exists' },
          { status: 409 }
        );
      }
    }

    const updateData: any = {};
    if (validatedData.slug !== undefined) updateData.slug = validatedData.slug;
    if (validatedData.name !== undefined) updateData.name = validatedData.name;
    if (validatedData.category !== undefined) updateData.category = validatedData.category;
    if (validatedData.imagePath !== undefined) updateData.image_path = validatedData.imagePath;
    if (validatedData.imageUrl !== undefined) updateData.image_url = validatedData.imageUrl;
    if (validatedData.isPopular !== undefined) updateData.is_popular = validatedData.isPopular;
    if (validatedData.isHealthy !== undefined) updateData.is_healthy = validatedData.isHealthy;
    if (validatedData.details !== undefined) updateData.details = validatedData.details;
    if (validatedData.isActive !== undefined) updateData.is_active = validatedData.isActive;
    if (validatedData.displayOrder !== undefined) updateData.display_order = validatedData.displayOrder;

    const { data: product, error } = await supabaseServer
      .from('products')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'update',
      resource_type: 'product',
      resource_id: params.id,
      old_values: existing,
      new_values: validatedData
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('PATCH /api/admin/products/[id] error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { data: existing } = await supabaseServer
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const { error } = await supabaseServer
      .from('products')
      .update({ is_active: false })
      .eq('id', params.id);

    if (error) throw error;

    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'delete',
      resource_type: 'product',
      resource_id: params.id,
      old_values: existing
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('DELETE /api/admin/products/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

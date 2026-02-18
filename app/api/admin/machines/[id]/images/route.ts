import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { ImageUploadService } from '@/lib/services/imageUploadService';
import { supabaseServer } from '@/lib/supabase';

/**
 * POST /api/admin/machines/[id]/images
 * Upload a new image for a vending machine
 */
export async function POST(
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
    const { id: machineId } = await params;

    // Get machine to verify it exists and get slug
    const { data: machine, error: machineError } = await supabaseServer
      .from('vending_machines')
      .select('id, slug, name')
      .eq('id', machineId)
      .single();

    if (machineError || !machine) {
      return NextResponse.json(
        {
          success: false,
          error: 'Machine not found'
        },
        { status: 404 }
      );
    }

    // Parse FormData
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const altText = formData.get('alt_text') as string;
    const displayOrderStr = formData.get('display_order') as string;
    const isPrimaryStr = formData.get('is_primary') as string;

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image file is required'
        },
        { status: 400 }
      );
    }

    // Parse optional fields
    const displayOrder = displayOrderStr ? parseInt(displayOrderStr, 10) : 0;
    const isPrimary = isPrimaryStr === 'true';

    // Upload image
    const result = await ImageUploadService.uploadMachineImage(
      file,
      machine.id,
      machine.slug,
      altText || `${machine.name} - Image`,
      displayOrder,
      isPrimary
    );

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'create',
      resource_type: 'machine_image',
      resource_id: result.id,
      new_values: {
        machine_id: machine.id,
        alt_text: altText,
        display_order: displayOrder,
        is_primary: isPrimary
      }
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Image uploaded successfully'
    });
  } catch (error: any) {
    console.error('POST /api/admin/machines/[id]/images error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to upload image'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/machines/[id]/images
 * Delete a machine image
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
    const { id: machineId } = await params;

    // Get image ID from query params
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('image_id');

    if (!imageId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image ID is required'
        },
        { status: 400 }
      );
    }

    // Get image details before deleting
    const { data: image, error: imageError } = await supabaseServer
      .from('machine_images')
      .select('*')
      .eq('id', imageId)
      .eq('machine_id', machineId)
      .single();

    if (imageError || !image) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image not found'
        },
        { status: 404 }
      );
    }

    // Delete image using service
    await ImageUploadService.deleteMachineImage(imageId);

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'delete',
      resource_type: 'machine_image',
      resource_id: imageId,
      old_values: image
    });

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error: any) {
    console.error('DELETE /api/admin/machines/[id]/images error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete image'
      },
      { status: 500 }
    );
  }
}

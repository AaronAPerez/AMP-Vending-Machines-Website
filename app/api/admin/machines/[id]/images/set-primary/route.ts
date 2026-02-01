import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { supabaseServer } from '@/lib/supabase';

/**
 * PATCH /api/admin/machines/[id]/images/set-primary
 * Set an image as the primary image for a machine
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
    const { id: machineId } = await params;

    // Parse request body
    const body = await request.json();
    const { image_id: imageId } = body;

    if (!imageId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image ID is required'
        },
        { status: 400 }
      );
    }

    // Verify the image belongs to this machine
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
          error: 'Image not found or does not belong to this machine'
        },
        { status: 404 }
      );
    }

    // First, unset all primary images for this machine
    const { error: unsetError } = await supabaseServer
      .from('machine_images')
      .update({ is_primary: false })
      .eq('machine_id', machineId);

    if (unsetError) {
      console.error('Error unsetting primary images:', unsetError);
      throw unsetError;
    }

    // Then, set the selected image as primary
    const { error: setPrimaryError } = await supabaseServer
      .from('machine_images')
      .update({ is_primary: true })
      .eq('id', imageId);

    if (setPrimaryError) {
      console.error('Error setting primary image:', setPrimaryError);
      throw setPrimaryError;
    }

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'update',
      resource_type: 'machine_image',
      resource_id: imageId,
      old_values: { is_primary: image.is_primary },
      new_values: { is_primary: true }
    });

    return NextResponse.json({
      success: true,
      message: 'Primary image set successfully'
    });
  } catch (error: any) {
    console.error('PATCH /api/admin/machines/[id]/images/set-primary error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to set primary image'
      },
      { status: 500 }
    );
  }
}

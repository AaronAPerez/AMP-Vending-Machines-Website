import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { updateBusinessInfoSchema } from '@/lib/schemas/admin/businessSchema';
import { supabaseServer } from '@/lib/supabase';
import { z } from 'zod';

const BUSINESS_INFO_ID = '00000000-0000-0000-0000-000000000001';

/**
 * GET /api/admin/business
 * Get business information
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { data: businessInfo, error } = await supabaseServer
      .from('business_info')
      .select('*')
      .eq('id', BUSINESS_INFO_ID)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data: businessInfo });
  } catch (error) {
    console.error('GET /api/admin/business error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch business information' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/business
 * Update business information
 */
export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { data: existing } = await supabaseServer
      .from('business_info')
      .select('*')
      .eq('id', BUSINESS_INFO_ID)
      .single();

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Business information not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateBusinessInfoSchema.parse(body);

    const updateData: any = {};
    if (validatedData.businessName !== undefined) updateData.business_name = validatedData.businessName;
    if (validatedData.legalName !== undefined) updateData.legal_name = validatedData.legalName;
    if (validatedData.slogan !== undefined) updateData.slogan = validatedData.slogan;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.shortDescription !== undefined) updateData.short_description = validatedData.shortDescription;
    if (validatedData.phone !== undefined) updateData.phone = validatedData.phone;
    if (validatedData.email !== undefined) updateData.email = validatedData.email;
    if (validatedData.website !== undefined) updateData.website = validatedData.website;
    if (validatedData.streetAddress !== undefined) updateData.street_address = validatedData.streetAddress;
    if (validatedData.suite !== undefined) updateData.suite = validatedData.suite;
    if (validatedData.city !== undefined) updateData.city = validatedData.city;
    if (validatedData.state !== undefined) updateData.state = validatedData.state;
    if (validatedData.zipCode !== undefined) updateData.zip_code = validatedData.zipCode;
    if (validatedData.country !== undefined) updateData.country = validatedData.country;
    if (validatedData.latitude !== undefined) updateData.latitude = validatedData.latitude;
    if (validatedData.longitude !== undefined) updateData.longitude = validatedData.longitude;
    if (validatedData.businessHours !== undefined) updateData.business_hours = validatedData.businessHours;
    if (validatedData.facebookUrl !== undefined) updateData.facebook_url = validatedData.facebookUrl;
    if (validatedData.instagramUrl !== undefined) updateData.instagram_url = validatedData.instagramUrl;
    if (validatedData.linkedinUrl !== undefined) updateData.linkedin_url = validatedData.linkedinUrl;

    const { data: businessInfo, error } = await supabaseServer
      .from('business_info')
      .update(updateData)
      .eq('id', BUSINESS_INFO_ID)
      .select()
      .single();

    if (error) throw error;

    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'update',
      resource_type: 'business_info',
      resource_id: BUSINESS_INFO_ID,
      old_values: existing,
      new_values: validatedData
    });

    return NextResponse.json({
      success: true,
      data: businessInfo,
      message: 'Business information updated successfully'
    });
  } catch (error) {
    console.error('PATCH /api/admin/business error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update business information' },
      { status: 500 }
    );
  }
}

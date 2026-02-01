// app/api/admin/marketing/exit-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { supabaseServer } from '@/lib/supabase';

export const runtime = 'nodejs';

/**
 * GET /api/admin/marketing/exit-intent
 * Get all exit intent settings
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { data: settings, error } = await supabaseServer
      .from('exit_intent_settings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: settings || []
    });
  } catch (error: any) {
    console.error('GET /api/admin/marketing/exit-intent error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch exit intent settings' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/marketing/exit-intent
 * Create new exit intent setting
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const body = await request.json();
    const {
      name,
      is_active,
      headline,
      subheadline,
      value_proposition,
      benefits,
      stats,
      special_offer_badge,
      primary_cta_text,
      primary_cta_link,
      phone_button_text,
      phone_number
    } = body;

    // Validate required fields
    if (!name || !headline || !subheadline) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, headline, subheadline' },
        { status: 400 }
      );
    }

    // If setting this as active, deactivate all others
    if (is_active) {
      await supabaseServer
        .from('exit_intent_settings')
        .update({ is_active: false })
        .neq('name', name);
    }

    const { data: setting, error } = await supabaseServer
      .from('exit_intent_settings')
      .insert({
        name,
        is_active: is_active || false,
        headline,
        subheadline,
        value_proposition,
        benefits: benefits || [],
        stats: stats || [],
        special_offer_badge,
        primary_cta_text: primary_cta_text || 'Get Your Free Machine',
        primary_cta_link: primary_cta_link || '/contact',
        phone_button_text: phone_button_text || 'Call (209) 403-5450',
        phone_number: phone_number || '+12094035450',
        created_by: admin.id
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'create',
      resource_type: 'exit_intent_setting',
      resource_id: setting.id,
      new_values: { name, is_active }
    });

    return NextResponse.json({
      success: true,
      data: setting,
      message: 'Exit intent setting created successfully'
    });
  } catch (error: any) {
    console.error('POST /api/admin/marketing/exit-intent error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create exit intent setting' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/marketing/exit-intent
 * Update exit intent setting
 */
export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: id' },
        { status: 400 }
      );
    }

    // If setting this as active, deactivate all others
    if (updates.is_active === true) {
      await supabaseServer
        .from('exit_intent_settings')
        .update({ is_active: false })
        .neq('id', id);
    }

    const { data: setting, error } = await supabaseServer
      .from('exit_intent_settings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'update',
      resource_type: 'exit_intent_setting',
      resource_id: id,
      new_values: updates
    });

    return NextResponse.json({
      success: true,
      data: setting,
      message: 'Exit intent setting updated successfully'
    });
  } catch (error: any) {
    console.error('PATCH /api/admin/marketing/exit-intent error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update exit intent setting' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/marketing/exit-intent
 * Delete exit intent setting
 */
export async function DELETE(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }

    // Get setting details before deleting
    const { data: setting } = await supabaseServer
      .from('exit_intent_settings')
      .select('*')
      .eq('id', id)
      .single();

    const { error } = await supabaseServer
      .from('exit_intent_settings')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Log activity
    if (setting) {
      await supabaseServer.from('admin_activity_log').insert({
        admin_user_id: admin.id,
        action_type: 'delete',
        resource_type: 'exit_intent_setting',
        resource_id: id,
        old_values: setting
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Exit intent setting deleted successfully'
    });
  } catch (error: any) {
    console.error('DELETE /api/admin/marketing/exit-intent error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete exit intent setting' },
      { status: 500 }
    );
  }
}

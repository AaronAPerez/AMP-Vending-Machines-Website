// app/api/admin/marketing/email-templates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { supabaseServer } from '@/lib/supabase';

export const runtime = 'nodejs';

/**
 * GET /api/admin/marketing/email-templates
 * Get all email templates
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const activeOnly = searchParams.get('active_only') === 'true';

    let query = supabaseServer
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data: templates, error } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: templates || []
    });
  } catch (error: any) {
    console.error('GET /api/admin/marketing/email-templates error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch email templates' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/marketing/email-templates
 * Create new email template
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const body = await request.json();
    const {
      template_id,
      name,
      description,
      category,
      subject,
      body: emailBody,
      variables,
      is_active,
      is_default
    } = body;

    // Validate required fields
    if (!template_id || !name || !category || !subject || !emailBody) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: template, error } = await supabaseServer
      .from('email_templates')
      .insert({
        template_id,
        name,
        description,
        category,
        subject,
        body: emailBody,
        variables: variables || [],
        is_active: is_active !== undefined ? is_active : true,
        is_default: is_default || false,
        created_by: admin.id
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'create',
      resource_type: 'email_template',
      resource_id: template.id,
      new_values: { template_id, name, category }
    });

    return NextResponse.json({
      success: true,
      data: template,
      message: 'Email template created successfully'
    });
  } catch (error: any) {
    console.error('POST /api/admin/marketing/email-templates error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create email template' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/marketing/email-templates
 * Update email template
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

    const { data: template, error } = await supabaseServer
      .from('email_templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'update',
      resource_type: 'email_template',
      resource_id: id,
      new_values: updates
    });

    return NextResponse.json({
      success: true,
      data: template,
      message: 'Email template updated successfully'
    });
  } catch (error: any) {
    console.error('PATCH /api/admin/marketing/email-templates error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update email template' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/marketing/email-templates
 * Delete email template
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

    // Get template details before deleting
    const { data: template } = await supabaseServer
      .from('email_templates')
      .select('*')
      .eq('id', id)
      .single();

    // Don't allow deleting default templates
    if (template?.is_default) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete default template' },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from('email_templates')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Log activity
    if (template) {
      await supabaseServer.from('admin_activity_log').insert({
        admin_user_id: admin.id,
        action_type: 'delete',
        resource_type: 'email_template',
        resource_id: id,
        old_values: template
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Email template deleted successfully'
    });
  } catch (error: any) {
    console.error('DELETE /api/admin/marketing/email-templates error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete email template' },
      { status: 500 }
    );
  }
}

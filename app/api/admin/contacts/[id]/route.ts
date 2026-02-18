import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { updateContactSchema } from '@/lib/schemas/admin/contactSchema';
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

    const { data: contact, error } = await supabaseServer
      .from('contact_submissions')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Contact not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error('GET /api/admin/contacts/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact' },
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
      .from('contact_submissions')
      .select('*')
      .eq('id', params.id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Contact not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = updateContactSchema.parse(body);

    const updateData: any = {};
    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status;
      if (validatedData.status === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
      }
    }
    if (validatedData.assignedTo !== undefined) updateData.assigned_to = validatedData.assignedTo;
    if (validatedData.notes !== undefined) updateData.notes = validatedData.notes;

    const { data: contact, error } = await supabaseServer
      .from('contact_submissions')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    await supabaseServer.from('admin_activity_log').insert({
      admin_user_id: admin.id,
      action_type: 'update',
      resource_type: 'contact_submission',
      resource_id: params.id,
      old_values: existing,
      new_values: validatedData
    });

    return NextResponse.json({
      success: true,
      data: contact,
      message: 'Contact updated successfully'
    });
  } catch (error) {
    console.error('PATCH /api/admin/contacts/[id] error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

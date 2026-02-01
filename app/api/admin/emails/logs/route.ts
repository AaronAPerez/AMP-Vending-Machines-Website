// app/api/admin/emails/logs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { supabaseServer } from '@/lib/supabase';

export const runtime = 'nodejs';

/**
 * GET /api/admin/emails/logs
 * Get email sending history
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
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const contactId = searchParams.get('contact_id');
    const status = searchParams.get('status');

    // Build query
    let query = supabaseServer
      .from('email_logs')
      .select(`
        *,
        admin_users!email_logs_admin_user_id_fkey (
          id,
          name,
          email
        ),
        contacts!email_logs_contact_id_fkey (
          id,
          first_name,
          last_name,
          company_name
        )
      `, { count: 'exact' })
      .order('sent_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (contactId) {
      query = query.eq('contact_id', contactId);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data: emails, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: emails || [],
      pagination: {
        total: count || 0,
        limit,
        offset
      }
    });
  } catch (error: any) {
    console.error('GET /api/admin/emails/logs error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch email logs' },
      { status: 500 }
    );
  }
}

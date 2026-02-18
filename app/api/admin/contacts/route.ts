import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { contactFiltersSchema } from '@/lib/schemas/admin/contactSchema';
import { supabaseServer } from '@/lib/supabase';
import { z } from 'zod';

/**
 * GET /api/admin/contacts
 * Get all contact submissions with filters
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    if (!supabaseServer) {
      throw new Error('Supabase not configured');
    }

    const { searchParams } = new URL(request.url);
    const filters = {
      status: searchParams.get('status') || undefined,
      assignedTo: searchParams.get('assignedTo') || undefined,
      search: searchParams.get('search') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0
    };

    const validatedFilters = contactFiltersSchema.parse(filters);

    let query = supabaseServer
      .from('contact_submissions')
      .select('*', { count: 'exact' });

    if (validatedFilters.status) {
      query = query.eq('status', validatedFilters.status);
    }

    if (validatedFilters.assignedTo) {
      query = query.eq('assigned_to', validatedFilters.assignedTo);
    }

    if (validatedFilters.search) {
      query = query.or(
        `first_name.ilike.%${validatedFilters.search}%,` +
        `last_name.ilike.%${validatedFilters.search}%,` +
        `email.ilike.%${validatedFilters.search}%,` +
        `company_name.ilike.%${validatedFilters.search}%`
      );
    }

    if (validatedFilters.dateFrom) {
      query = query.gte('created_at', validatedFilters.dateFrom);
    }

    if (validatedFilters.dateTo) {
      query = query.lte('created_at', validatedFilters.dateTo);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(validatedFilters.offset!, validatedFilters.offset! + validatedFilters.limit! - 1);

    const { data, error, count } = await query;

    if (error) throw error;

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
    console.error('GET /api/admin/contacts error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// app/api/admin/activity/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export const runtime = 'nodejs';

/**
 * GET /api/admin/activity
 * Fetch admin activity logs
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!supabaseServer) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Fetch activity logs
    const { data, error, count } = await supabaseServer
      .from('admin_activity_log')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching activity logs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch activity logs' },
        { status: 500 }
      );
    }

    // Transform data for frontend
    const activities = (data || []).map((log) => ({
      id: log.id,
      action: formatAction(log.action, log.resource_type),
      resource: formatResource(log.resource_type, log.resource_id),
      timestamp: log.created_at,
      adminId: log.admin_user_id,
      details: log.details
    }));

    return NextResponse.json({
      success: true,
      data: activities,
      pagination: {
        total: count || 0,
        limit,
        offset
      }
    });
  } catch (error: any) {
    console.error('Activity log error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    );
  }
}

/**
 * Format action for display
 */
function formatAction(action: string, resourceType: string): string {
  const actionMap: Record<string, string> = {
    create: 'Created',
    update: 'Updated',
    delete: 'Deleted',
    login: 'Logged in',
    logout: 'Logged out'
  };

  const actionText = actionMap[action] || action;
  const resourceName = formatResourceType(resourceType);

  return `${actionText} ${resourceName}`;
}

/**
 * Format resource type for display
 */
function formatResourceType(resourceType: string): string {
  const typeMap: Record<string, string> = {
    vending_machine: 'vending machine',
    machine_image: 'machine image',
    product: 'product',
    contact_submission: 'contact',
    business_info: 'business info',
    seo_setting: 'SEO settings',
    admin_user: 'admin user'
  };

  return typeMap[resourceType] || resourceType;
}

/**
 * Format resource for display
 */
function formatResource(resourceType: string, resourceId: string | null): string {
  if (!resourceId) {
    return formatResourceType(resourceType);
  }

  return `${formatResourceType(resourceType)} #${resourceId.slice(0, 8)}`;
}

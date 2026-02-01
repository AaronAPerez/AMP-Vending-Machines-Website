// app/api/marketing/email-templates/active/route.ts
// PUBLIC endpoint - no auth required (for email service)
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export const runtime = 'nodejs';
export const revalidate = 300; // Cache for 5 minutes

/**
 * GET /api/marketing/email-templates/active
 * Get all active email templates (for email service to use)
 */
export async function GET() {
  try {
    if (!supabaseServer) {
      return NextResponse.json({
        success: false,
        error: 'Database not configured'
      }, { status: 500 });
    }

    const { data: templates, error } = await supabaseServer
      .from('email_templates')
      .select('template_id, name, subject, body, variables')
      .eq('is_active', true)
      .order('template_id');

    if (error) throw error;

    // Convert array to object keyed by template_id for easy lookup
    const templatesMap = (templates || []).reduce((acc, template) => {
      acc[template.template_id] = {
        name: template.name,
        subject: template.subject,
        body: template.body,
        variables: template.variables
      };
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({
      success: true,
      data: templatesMap
    });
  } catch (error: any) {
    console.error('GET /api/marketing/email-templates/active error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch email templates' },
      { status: 500 }
    );
  }
}

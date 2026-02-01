// app/api/admin/emails/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/adminAuth';
import { emailService } from '@/lib/email/emailService';
import { supabaseServer } from '@/lib/supabase';

export const runtime = 'nodejs';

interface SendEmailRequest {
  to: string;
  subject: string;
  html: string;
  templateUsed?: string;
  contactId?: string;
  metadata?: Record<string, any>;
}

/**
 * POST /api/admin/emails/send
 * Send email from admin dashboard
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const admin = await requireAdmin(request);

    const body: SendEmailRequest = await request.json();
    const { to, subject, html, templateUsed, contactId, metadata } = body;

    // Validate required fields
    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, subject, html' },
        { status: 400 }
      );
    }

    // Send email using existing email service
    const result = await emailService.sendEmail({
      to,
      subject,
      html,
      from: process.env.FROM_EMAIL || 'AMP Vending <ampdesignandconsulting@gmail.com>'
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    // Log email in database
    if (supabaseServer) {
      const { data: emailLog, error: logError } = await supabaseServer
        .from('email_logs')
        .insert({
          admin_user_id: admin.id,
          recipient_email: to,
          subject,
          template_used: templateUsed,
          contact_id: contactId,
          message_id: result.messageId,
          status: 'sent',
          metadata,
          sent_at: new Date().toISOString()
        })
        .select()
        .single();

      if (logError) {
        console.error('Failed to log email:', logError);
        // Don't fail the request if logging fails
      }

      // Log activity
      await supabaseServer.from('admin_activity_log').insert({
        admin_user_id: admin.id,
        action_type: 'create',
        resource_type: 'email',
        resource_id: emailLog?.id,
        new_values: {
          to,
          subject,
          template_used: templateUsed
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId
    });
  } catch (error: any) {
    console.error('POST /api/admin/emails/send error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}

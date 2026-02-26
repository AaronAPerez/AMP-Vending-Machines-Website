import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/services/emailService';
import { supabaseServer } from '@/lib/supabase';

/**
 * Contact Form Monitor - Vercel Cron Job
 *
 * This endpoint performs synthetic testing of the contact form infrastructure.
 * It verifies that all services are operational and sends alerts if issues are detected.
 *
 * Schedule: Runs every 6 hours via Vercel Cron
 * Security: Protected by CRON_SECRET environment variable
 *
 * Tests performed:
 * 1. Database connectivity (Supabase)
 * 2. Email service connectivity (Resend)
 * 3. Database write capability (test record)
 */

// Test submission data - clearly marked as synthetic
const SYNTHETIC_TEST_DATA = {
  first_name: 'SYNTHETIC_TEST',
  last_name: 'DO_NOT_RESPOND',
  email: 'synthetic-test@ampvendingmachines.com',
  phone: '000-000-0000',
  company_name: 'Automated Monitoring Test',
  message: 'This is an automated synthetic test submission. Please ignore.',
  status: 'archived' as const, // Auto-archive so it doesn't clutter admin dashboard
};

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // In production, require authorization
  if (process.env.NODE_ENV === 'production' && cronSecret) {
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error('❌ Unauthorized cron job attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  console.log('🔄 Starting contact form synthetic monitoring...');

  const results = {
    timestamp: new Date().toISOString(),
    overall: 'pass' as 'pass' | 'fail' | 'partial',
    tests: {
      database_connection: { status: 'pending' as string, message: '', duration_ms: 0 },
      database_write: { status: 'pending' as string, message: '', duration_ms: 0 },
      database_cleanup: { status: 'pending' as string, message: '', duration_ms: 0 },
      email_service: { status: 'pending' as string, message: '', duration_ms: 0 },
    },
    alerts_sent: false,
  };

  let hasFailure = false;

  // Test 1: Database Connection
  const dbConnStart = Date.now();
  try {
    if (!supabaseServer) {
      results.tests.database_connection = {
        status: 'fail',
        message: 'Supabase not configured',
        duration_ms: Date.now() - dbConnStart,
      };
      hasFailure = true;
    } else {
      const { error } = await supabaseServer
        .from('contact_submissions')
        .select('id')
        .limit(1);

      if (error) {
        results.tests.database_connection = {
          status: 'fail',
          message: error.message,
          duration_ms: Date.now() - dbConnStart,
        };
        hasFailure = true;
      } else {
        results.tests.database_connection = {
          status: 'pass',
          message: 'Connected successfully',
          duration_ms: Date.now() - dbConnStart,
        };
      }
    }
  } catch (error) {
    results.tests.database_connection = {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
      duration_ms: Date.now() - dbConnStart,
    };
    hasFailure = true;
  }

  // Test 2: Database Write (only if connection succeeded)
  let testRecordId: string | null = null;
  if (results.tests.database_connection.status === 'pass' && supabaseServer) {
    const dbWriteStart = Date.now();
    try {
      const { data, error } = await supabaseServer
        .from('contact_submissions')
        .insert(SYNTHETIC_TEST_DATA)
        .select('id')
        .single();

      if (error) {
        results.tests.database_write = {
          status: 'fail',
          message: error.message,
          duration_ms: Date.now() - dbWriteStart,
        };
        hasFailure = true;
      } else {
        testRecordId = data?.id;
        results.tests.database_write = {
          status: 'pass',
          message: 'Write successful',
          duration_ms: Date.now() - dbWriteStart,
        };
      }
    } catch (error) {
      results.tests.database_write = {
        status: 'fail',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration_ms: Date.now() - dbWriteStart,
      };
      hasFailure = true;
    }

    // Test 3: Cleanup test record
    if (testRecordId) {
      const cleanupStart = Date.now();
      try {
        const { error } = await supabaseServer
          .from('contact_submissions')
          .delete()
          .eq('id', testRecordId);

        if (error) {
          results.tests.database_cleanup = {
            status: 'fail',
            message: error.message,
            duration_ms: Date.now() - cleanupStart,
          };
          // Don't mark as failure - cleanup failure isn't critical
        } else {
          results.tests.database_cleanup = {
            status: 'pass',
            message: 'Test record cleaned up',
            duration_ms: Date.now() - cleanupStart,
          };
        }
      } catch (error) {
        results.tests.database_cleanup = {
          status: 'fail',
          message: error instanceof Error ? error.message : 'Unknown error',
          duration_ms: Date.now() - cleanupStart,
        };
      }
    } else {
      results.tests.database_cleanup = {
        status: 'skipped',
        message: 'No test record to clean up',
        duration_ms: 0,
      };
    }
  } else {
    results.tests.database_write = {
      status: 'skipped',
      message: 'Skipped due to connection failure',
      duration_ms: 0,
    };
    results.tests.database_cleanup = {
      status: 'skipped',
      message: 'Skipped due to connection failure',
      duration_ms: 0,
    };
  }

  // Test 4: Email Service
  const emailStart = Date.now();
  try {
    const emailReady = await emailService.verifyConnection();
    if (emailReady) {
      results.tests.email_service = {
        status: 'pass',
        message: 'Resend API connected',
        duration_ms: Date.now() - emailStart,
      };
    } else {
      results.tests.email_service = {
        status: 'warn',
        message: 'Resend API not configured (emails will fail)',
        duration_ms: Date.now() - emailStart,
      };
      // Don't mark as failure in dev, but do in production
      if (process.env.NODE_ENV === 'production') {
        hasFailure = true;
      }
    }
  } catch (error) {
    results.tests.email_service = {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
      duration_ms: Date.now() - emailStart,
    };
    hasFailure = true;
  }

  // Determine overall status
  results.overall = hasFailure ? 'fail' : 'pass';

  // Send alert if there are failures (in production)
  if (hasFailure && process.env.NODE_ENV === 'production') {
    try {
      await sendAlertEmail(results);
      results.alerts_sent = true;
      console.log('🚨 Alert email sent for contact form monitoring failures');
    } catch (alertError) {
      console.error('❌ Failed to send alert email:', alertError);
    }
  }

  // Log results
  console.log('📊 Contact form monitoring complete:', JSON.stringify(results, null, 2));

  // Return appropriate status code
  const httpStatus = hasFailure ? 500 : 200;
  return NextResponse.json(results, { status: httpStatus });
}

/**
 * Send alert email when monitoring detects failures
 */
async function sendAlertEmail(results: any): Promise<void> {
  const alertEmail = process.env.ALERT_EMAIL || process.env.TO_EMAIL;

  if (!alertEmail) {
    console.warn('⚠️ No alert email configured (ALERT_EMAIL or TO_EMAIL)');
    return;
  }

  // Format the alert message
  const failedTests = Object.entries(results.tests)
    .filter(([, test]: [string, any]) => test.status === 'fail')
    .map(([name, test]: [string, any]) => `• ${name}: ${test.message}`)
    .join('\n');

  const alertHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Contact Form Alert - AMP Vending</title>
    </head>
    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">🚨 Contact Form Alert</h1>
        </div>
        <div style="padding: 20px;">
          <p><strong>Time:</strong> ${results.timestamp}</p>
          <p><strong>Status:</strong> <span style="color: #dc2626; font-weight: bold;">${results.overall.toUpperCase()}</span></p>

          <h3 style="color: #dc2626;">Failed Tests:</h3>
          <pre style="background: #fef2f2; padding: 15px; border-radius: 4px; border-left: 4px solid #dc2626;">${failedTests}</pre>

          <h3>All Test Results:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${Object.entries(results.tests)
              .map(
                ([name, test]: [string, any]) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px;"><strong>${name}</strong></td>
                <td style="padding: 8px; color: ${test.status === 'pass' ? '#16a34a' : test.status === 'fail' ? '#dc2626' : '#ca8a04'};">
                  ${test.status.toUpperCase()}
                </td>
                <td style="padding: 8px; color: #666;">${test.message}</td>
              </tr>
            `
              )
              .join('')}
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 4px;">
            <p style="margin: 0;"><strong>Action Required:</strong> Please check your contact form and related services immediately.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Use Resend to send the alert (if available)
  if (process.env.RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'AMP Vending Alerts <alerts@ampvendingmachines.com>',
        to: alertEmail,
        subject: '🚨 ALERT: Contact Form Monitoring Failed - AMP Vending',
        html: alertHtml,
      }),
    });
  }
}

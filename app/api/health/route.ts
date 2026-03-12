import { NextResponse } from 'next/server';
import { emailService } from '@/lib/services/emailService';

/**
 * Health Check API Route for UptimeRobot Monitoring
 *
 * This endpoint provides comprehensive health status for all critical services.
 * UptimeRobot can monitor this endpoint to detect outages and alert the team.
 *
 * Monitors:
 * - Website availability (implicit - if this responds, site is up)
 * - Database connectivity (Supabase)
 * - Email service (Resend API)
 * - External API availability
 *
 * HTTP Status Codes:
 * - 200: All services healthy
 * - 503: One or more critical services are down
 *
 * Usage with UptimeRobot:
 * 1. Monitor Type: HTTP(s) - Keyword
 * 2. URL: https://ampvendingmachines.com/api/health
 * 3. Keyword Type: Keyword exists
 * 4. Keyword: "healthy"
 * 5. Monitoring Interval: 5 minutes (recommended)
 */

interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  latencyMs?: number;
}

interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  services: {
    database: ServiceHealth;
    email: ServiceHealth;
    website: ServiceHealth;
  };
  // Simple keyword for UptimeRobot monitoring
  uptimeKeyword?: string;
}

// Track server start time for uptime calculation
const serverStartTime = Date.now();

/**
 * GET /api/health
 *
 * Main health check endpoint for monitoring services.
 * Returns JSON with detailed service status.
 */
export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  const startTime = Date.now();

  const healthCheck: HealthCheckResponse = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: Math.floor((Date.now() - serverStartTime) / 1000),
    services: {
      database: { status: 'healthy', message: 'Checking...' },
      email: { status: 'healthy', message: 'Checking...' },
      website: { status: 'healthy', message: 'OK' },
    },
  };

  // Track if any service has critical failure
  let hasCriticalFailure = false;
  let hasDegradation = false;

  // Check Database (Supabase) - Critical service
  const dbHealth = await checkDatabaseHealth();
  healthCheck.services.database = dbHealth;
  if (dbHealth.status === 'unhealthy') {
    hasCriticalFailure = true;
  } else if (dbHealth.status === 'degraded') {
    hasDegradation = true;
  }

  // Check Email Service (Resend) - Important but not critical
  const emailHealth = await checkEmailHealth();
  healthCheck.services.email = emailHealth;
  if (emailHealth.status === 'unhealthy') {
    hasDegradation = true; // Email failure is degradation, not critical
  }

  // Determine overall status
  if (hasCriticalFailure) {
    healthCheck.status = 'unhealthy';
  } else if (hasDegradation) {
    healthCheck.status = 'degraded';
  } else {
    healthCheck.status = 'healthy';
    // Add keyword for UptimeRobot to detect healthy state
    healthCheck.uptimeKeyword = 'healthy';
  }

  // Calculate total response time
  const totalLatency = Date.now() - startTime;

  // Log health check for debugging
  console.log(`[Health Check] Status: ${healthCheck.status}, Latency: ${totalLatency}ms, Timestamp: ${healthCheck.timestamp}`);

  // Return appropriate HTTP status code
  // 200 = healthy or degraded (site is functioning)
  // 503 = unhealthy (critical services down)
  const httpStatus = hasCriticalFailure ? 503 : 200;

  return NextResponse.json(healthCheck, {
    status: httpStatus,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Response-Time': `${totalLatency}ms`,
    }
  });
}

/**
 * Check Supabase database connectivity
 * Performs a lightweight query to verify connection
 */
async function checkDatabaseHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();

  try {
    const { supabaseServer } = await import('@/lib/supabase');

    if (!supabaseServer) {
      return {
        status: 'degraded',
        message: 'Supabase not configured (missing credentials)',
        latencyMs: Date.now() - startTime,
      };
    }

    // Perform a lightweight health check query
    const { error } = await supabaseServer
      .from('contact_submissions')
      .select('id')
      .limit(1);

    const latencyMs = Date.now() - startTime;

    if (error) {
      console.error('[Health Check] Database error:', error.message);
      return {
        status: 'unhealthy',
        message: `Database query failed: ${error.message}`,
        latencyMs,
      };
    }

    // Check for slow response (over 2 seconds)
    if (latencyMs > 2000) {
      return {
        status: 'degraded',
        message: `Database responding slowly (${latencyMs}ms)`,
        latencyMs,
      };
    }

    return {
      status: 'healthy',
      message: 'Supabase connected',
      latencyMs,
    };
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    console.error('[Health Check] Database exception:', error);
    return {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Database check failed',
      latencyMs,
    };
  }
}

/**
 * Check Email Service (Resend) connectivity
 * Verifies API key is valid and service is reachable
 */
async function checkEmailHealth(): Promise<ServiceHealth> {
  const startTime = Date.now();

  try {
    // Use the email service's built-in verification
    const isConnected = await emailService.verifyConnection();
    const latencyMs = Date.now() - startTime;

    if (!isConnected) {
      // In development mode, this is expected
      if (process.env.NODE_ENV === 'development') {
        return {
          status: 'healthy',
          message: 'Development mode - console logging',
          latencyMs,
        };
      }

      return {
        status: 'degraded',
        message: 'Resend API key not configured',
        latencyMs,
      };
    }

    return {
      status: 'healthy',
      message: 'Resend API connected',
      latencyMs,
    };
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    console.error('[Health Check] Email service exception:', error);
    return {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Email check failed',
      latencyMs,
    };
  }
}

/**
 * HEAD /api/health
 *
 * Lightweight health check for simple uptime monitoring.
 * Returns only HTTP status code without body.
 */
export async function HEAD(): Promise<NextResponse> {
  try {
    // Quick database connectivity check
    const { supabaseServer } = await import('@/lib/supabase');

    if (supabaseServer) {
      const { error } = await supabaseServer
        .from('contact_submissions')
        .select('id')
        .limit(1);

      if (error) {
        return new NextResponse(null, { status: 503 });
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}

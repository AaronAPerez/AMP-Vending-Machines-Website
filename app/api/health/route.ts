import { NextResponse } from 'next/server';
import { checkDatabase, checkEmailService, type ServiceCheckResult } from '@/lib/services/healthChecks';

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
 *
 * The database and email checks run in parallel, each with a 4-second limit
 * (lib/services/healthChecks.ts), so a hung service can't make this time out.
 */

// Longest Vercel lets this function run, in seconds: a backstop, since the checks
// themselves give up after 4 s
export const maxDuration = 10;

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

  // Run both checks at once; each has its own time limit
  const [dbCheck, emailCheck] = await Promise.all([checkDatabase(), checkEmailService()]);

  // Database (Supabase) - Critical service
  const dbHealth = toDatabaseHealth(dbCheck);
  healthCheck.services.database = dbHealth;
  if (dbHealth.status === 'unhealthy') {
    hasCriticalFailure = true;
  } else if (dbHealth.status === 'degraded') {
    hasDegradation = true;
  }

  // Email Service (Resend) - Important but not critical
  const emailHealth = toEmailHealth(emailCheck);
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
 * Translate the shared database check into this endpoint's healthy/degraded/unhealthy terms
 */
function toDatabaseHealth(check: ServiceCheckResult): ServiceHealth {
  const { latencyMs } = check;

  switch (check.status) {
    case 'ready':
      // Check for slow response (over 2 seconds)
      if (latencyMs > 2000) {
        return { status: 'degraded', message: `Database responding slowly (${latencyMs}ms)`, latencyMs };
      }
      return { status: 'healthy', message: 'Supabase connected', latencyMs };
    case 'not_configured':
      return { status: 'degraded', message: 'Supabase not configured (missing credentials)', latencyMs };
    case 'timeout':
      console.error('[Health Check] Database timeout:', check.message);
      return { status: 'unhealthy', message: `Database timed out: ${check.message}`, latencyMs };
    case 'error':
      console.error('[Health Check] Database error:', check.message);
      return { status: 'unhealthy', message: `Database query failed: ${check.message}`, latencyMs };
  }
}

/**
 * Translate the shared email check into this endpoint's healthy/degraded/unhealthy terms
 */
function toEmailHealth(check: ServiceCheckResult): ServiceHealth {
  const { latencyMs } = check;

  switch (check.status) {
    case 'ready':
      return { status: 'healthy', message: check.message, latencyMs };
    case 'not_configured':
      return { status: 'degraded', message: 'Resend API key not configured', latencyMs };
    case 'timeout':
    case 'error':
      console.error('[Health Check] Email service problem:', check.message);
      return { status: 'unhealthy', message: check.message, latencyMs };
  }
}

/**
 * HEAD /api/health
 *
 * Lightweight health check for simple uptime monitoring.
 * Returns only HTTP status code without body.
 */
export async function HEAD(): Promise<NextResponse> {
  // Quick database connectivity check. Missing credentials isn't an outage here;
  // only a failed or timed-out query is.
  const db = await checkDatabase();
  const isDown = db.status === 'error' || db.status === 'timeout';

  return new NextResponse(null, {
    status: isDown ? 503 : 200,
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
  });
}

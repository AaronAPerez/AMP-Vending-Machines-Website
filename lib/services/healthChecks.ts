import { emailService } from '@/lib/services/emailService';

/**
 * Health checks for the services the contact form depends on (Resend and Supabase).
 * Used by GET /api/contact and /api/health, which uptime monitors poll.
 *
 * Every check has a time limit. Without one, a stalled service kept the endpoint
 * running until Vercel killed it (HTTP 504), and the response couldn't say which
 * service was slow. Now a stalled service is reported as "timeout".
 */

export type ServiceStatus = 'ready' | 'not_configured' | 'error' | 'timeout';

export interface ServiceCheckResult {
  status: ServiceStatus;
  message: string;
  latencyMs: number;
}

/**
 * How long a single check may take. Endpoints run their checks in parallel, so
 * they answer within about this long even when every service hangs.
 */
export const HEALTH_CHECK_TIMEOUT_MS = 4000;

type CheckOutcome = Pick<ServiceCheckResult, 'status' | 'message'>;

/** Checks that Resend is reachable with the configured API key */
export function checkEmailService(): Promise<ServiceCheckResult> {
  return runWithTimeout((signal) => emailService.checkConnection(signal));
}

/** Checks that Supabase answers a minimal query on the contact_submissions table */
export function checkDatabase(): Promise<ServiceCheckResult> {
  return runWithTimeout(async (signal) => {
    // Loaded here so a client that fails to load is reported as a database error
    const { supabaseServer } = await import('@/lib/supabase');
    if (!supabaseServer) {
      return { status: 'not_configured', message: 'Supabase credentials not set' };
    }

    const { error } = await supabaseServer
      .from('contact_submissions')
      .select('id')
      .limit(1)
      .abortSignal(signal);

    if (error) {
      // Supabase reports a cancelled request as an error result instead of throwing.
      // Rethrow it so it is counted as a timeout, not a database error.
      if (signal.aborted) throw signal.reason;
      return { status: 'error', message: error.message };
    }

    return { status: 'ready', message: 'Supabase connected' };
  });
}

/**
 * Runs one check with a time limit and turns any failure into a result, so the
 * returned promise never rejects. The check receives an abort signal that fires
 * at the time limit, which it passes on to cancel its outbound request.
 */
async function runWithTimeout(
  check: (signal: AbortSignal) => Promise<CheckOutcome>
): Promise<ServiceCheckResult> {
  const startedAt = Date.now();
  const signal = AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS);

  try {
    // Also race the check against the signal, so the time limit holds even if
    // something inside the check doesn't listen to the signal.
    const outcome = await Promise.race([check(signal), rejectWhenAborted(signal)]);
    return { ...outcome, latencyMs: Date.now() - startedAt };
  } catch (error) {
    const latencyMs = Date.now() - startedAt;
    if (signal.aborted) {
      return { status: 'timeout', message: `No response within ${HEALTH_CHECK_TIMEOUT_MS} ms`, latencyMs };
    }
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Check failed',
      latencyMs,
    };
  }
}

/** A promise that rejects when the signal aborts (and otherwise never settles) */
function rejectWhenAborted(signal: AbortSignal): Promise<never> {
  return new Promise((_, reject) => {
    signal.addEventListener('abort', () => reject(signal.reason), { once: true });
  });
}

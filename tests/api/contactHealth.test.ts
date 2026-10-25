/**
 * GET /api/contact health check tests
 *
 * UptimeRobot polls this endpoint. Each service check has a 4-second limit, so a
 * hung service must produce a 503 that names the slow service, instead of the
 * request hanging until Vercel returns a 504.
 */

import { GET } from '@/app/api/contact/route';

// Minimal NextResponse.json stand-in that keeps the status, headers and body
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data: unknown, init?: { status?: number; headers?: Record<string, string> }) => ({
      status: init?.status ?? 200,
      headers: new Map(Object.entries(init?.headers ?? {})),
      json: async () => data,
    })),
  },
}));

// Result of the health check's Supabase query; each test sets what it resolves to
const mockDatabaseQuery = jest.fn();
jest.mock('@/lib/supabase', () => ({
  supabaseServer: {
    from: () => ({
      select: () => ({
        limit: () => ({ abortSignal: (signal: AbortSignal) => mockDatabaseQuery(signal) }),
      }),
    }),
  },
}));

// jest.setup.js replaces global fetch with a mock; the Resend check calls it
const mockFetch = jest.mocked(fetch);

describe('GET /api/contact (health check)', () => {
  const originalResendKey = process.env.RESEND_API_KEY;

  beforeEach(() => {
    process.env.RESEND_API_KEY = 're_test_key';
    mockFetch.mockResolvedValue({ ok: true, status: 200 } as Response);
    mockDatabaseQuery.mockResolvedValue({ error: null });
  });

  afterAll(() => {
    if (originalResendKey === undefined) {
      delete process.env.RESEND_API_KEY;
    } else {
      process.env.RESEND_API_KEY = originalResendKey;
    }
  });

  it('reports healthy, uncached, with each service\'s latency', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(body.status).toBe('healthy');
    expect(body.services.email).toMatchObject({ status: 'ready', latencyMs: expect.any(Number) });
    expect(body.services.database).toMatchObject({ status: 'ready', latencyMs: expect.any(Number) });

    // Both outbound requests get a signal that cancels them at the time limit
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.resend.com/domains',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(mockDatabaseQuery).toHaveBeenCalledWith(expect.any(AbortSignal));
  });

  it('returns 503 within about 5 s, with email "timeout", when Resend never responds', async () => {
    mockFetch.mockImplementation(() => new Promise<Response>(() => {}));

    const startedAt = Date.now();
    const response = await GET();
    const elapsedMs = Date.now() - startedAt;
    const body = await response.json();

    expect(elapsedMs).toBeLessThan(5000);
    expect(response.status).toBe(503);
    expect(body.status).toBe('unhealthy');
    expect(body.services.email.status).toBe('timeout');
    expect(body.services.database.status).toBe('ready');
  });

  it('returns 503 with database "error" when Supabase returns an error', async () => {
    mockDatabaseQuery.mockResolvedValue({ error: { message: 'permission denied for table contact_submissions' } });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.status).toBe('unhealthy');
    expect(body.services.database).toMatchObject({
      status: 'error',
      message: 'permission denied for table contact_submissions',
    });
    expect(body.services.email.status).toBe('ready');
  });

  it('reports the status code when Resend rejects the key, not "key not set"', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 401 } as Response);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.services.email).toMatchObject({ status: 'error', message: 'Resend returned 401' });
  });

  it('reports a missing RESEND_API_KEY as not_configured (degraded, still 200)', async () => {
    delete process.env.RESEND_API_KEY;

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('degraded');
    expect(body.services.email).toMatchObject({ status: 'not_configured', message: 'RESEND_API_KEY not set' });
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

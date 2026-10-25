/**
 * /api/health tests
 *
 * The database and email checks run in parallel with a 4-second limit each, so
 * the endpoint answers in about 4 seconds even when both services hang.
 */

import { GET, HEAD } from '@/app/api/health/route';

// NextResponse stand-in for both `new NextResponse(...)` (HEAD) and NextResponse.json (GET)
jest.mock('next/server', () => {
  const toResponse = (body: unknown, init?: { status?: number; headers?: Record<string, string> }) => ({
    status: init?.status ?? 200,
    headers: new Map(Object.entries(init?.headers ?? {})),
    json: async () => body,
  });
  return { NextResponse: Object.assign(jest.fn(toResponse), { json: jest.fn(toResponse) }) };
});

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

describe('/api/health', () => {
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

  it('GET reports healthy when both services respond', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('healthy');
    expect(body.services.database.status).toBe('healthy');
    expect(body.services.email.status).toBe('healthy');
  });

  it('GET returns 503 within about 5 s when Supabase and Resend both hang', async () => {
    mockDatabaseQuery.mockImplementation(() => new Promise(() => {}));
    mockFetch.mockImplementation(() => new Promise<Response>(() => {}));

    const startedAt = Date.now();
    const response = await GET();
    const elapsedMs = Date.now() - startedAt;
    const body = await response.json();

    // Run one after the other, two 4 s timeouts would take 8 s
    expect(elapsedMs).toBeLessThan(5000);
    expect(response.status).toBe(503);
    expect(body.status).toBe('unhealthy');
    expect(body.services.database.status).toBe('unhealthy');
    expect(body.services.database.message).toMatch(/timed out/i);
    expect(body.services.email.status).toBe('unhealthy');
  });

  it('HEAD returns 503 when the database query fails', async () => {
    mockDatabaseQuery.mockResolvedValue({ error: { message: 'connection refused' } });

    const response = await HEAD();

    expect(response.status).toBe(503);
  });

  it('HEAD returns 200 when the database responds', async () => {
    const response = await HEAD();

    expect(response.status).toBe(200);
  });
});

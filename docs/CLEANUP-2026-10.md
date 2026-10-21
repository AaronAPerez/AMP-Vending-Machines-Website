# Repository Cleanup — October 2026

Branch: `cleanup/2026-10` (8 code commits + this log), based on `main` at `c33f326`.
Net change: ~167 files, ~18,800 lines removed.

## How every change was verified

After each commit:

| Check | Command | Result |
|---|---|---|
| Types | `npm run type-check` | 0 errors |
| Lint | `npm run lint` | 0 errors (10 warnings, down from 13) |
| Unit/API tests | `npm run test:ci:no-coverage` | 62 passed (was 37) |
| Production build | `npm run build` | passes |
| Route list | diff of `next build` route table vs. `main` | identical except the 2 routes removed on purpose |
| Lockfile | `npm ci` from scratch | passes; no remaining package changed version |

Dead code was found with [knip](https://knip.dev) (`npx knip`), then each finding was
checked by hand (grep for imports and config references) before deletion.

## What changed, by commit

1. **fix(security): admin auth on `GET /api/admin/activity`.** The route used the
   service-role Supabase client (bypasses row-level security) with no auth check.
   `proxy.ts` only matches `/admin/:path*`, so **every `/api/admin/*` handler must call
   `requireAdmin()` itself.**
2. **fix(security): removed `POST /api/request-indexing`.** It was unauthenticated and
   nothing called it; weekly indexing runs `scripts/request-indexing.ts` from GitHub Actions.
3. **fix(security): cron monitor fails closed.** It now refuses requests in production
   when `CRON_SECRET` is missing. **`CRON_SECRET` must be set in Vercel.**
4. **test: API tests now run.** `tests/api/` was missing from `testMatch`, so
   `contactApi.test.ts` (25 tests) never ran. Removed a test that couldn't load under
   jsdom and stale duplicate Jest configs.
5. **chore: 146 unused files deleted**: dead components, hooks and lib files, `.bak`
   backups, and route folders with no `page.tsx`.
6. **chore(deps): 20 unused packages removed**; `@types/jsonwebtoken` moved to devDependencies.
7. **chore(scripts): 15 broken or duplicate npm scripts removed**; `clean` made
   cross-platform; `engines.node` set to `>=20.9.0`; CI workflows on Node 24.
8. **chore: root tidied.** Verification files moved into `public/` so they're actually served.

## Kept on purpose

- `public/sw.js`: nothing registers it anymore, but browsers that registered it in the
  past keep requesting it. Remove it only together with an unregister step.
- `scripts/*` not wired to npm scripts (`convert-images.js`, `verify-secrets.js`, etc.):
  manual utilities.
- `app/_print/`: a folder starting with `_` is private in the App Router, so this page
  can never be visited. Delete it or move it under `app/admin/` if it's still needed.
- `critters` + `optimizeCss: true`: left as-is; confirm whether Next 16 still uses it.
- `.npmrc` `legacy-peer-deps=true`: hides version mismatches such as
  `jest-environment-jsdom@30` with `jest@29` and `eslint-config-next@15` with `next@16`.
  Align those versions, then try removing it.

## Open issues (need a decision; not changed)

| Severity | Issue | Notes |
|---|---|---|
| High | Admin **change password is broken** | `ChangePasswordForm` calls `/api/auth/change-password`; no such route exists. The old route file at `/api/admin/auth/change-password` was empty and was removed. |
| Medium | **Builds fail without `RESEND_API_KEY`** | `new Resend(...)` runs at module load in `app/api/admin/emails/send`. Create the client inside the handler. Builds on Dependabot PRs (no access to normal secrets) can fail because of this. |
| Medium | **No rate limiting on `/api/contact`** | A honeypot exists; the old `rateLimit.ts` was never wired in. On Vercel, use a shared store (Upstash) or Vercel firewall rules; an in-memory counter resets per function instance. |
| Medium | Contact form doesn't move focus to the first invalid field | `noValidate` + custom validation with no `.focus()`. Screen-reader and keyboard users must hunt for the error. |
| Low | Most E2E specs never run in CI | Only `contact-form-email-verification.spec.ts` runs (Contact Form Health Check workflow). The other 9 specs in `tests/e2e/` run only locally. |
| Low | 11 stale Dependabot branches + `development` | Close or merge on GitHub. |
| Low | `lint:check` fails on 10 existing warnings | `--max-warnings 0`; fix the warnings or relax the script. |

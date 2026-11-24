/**
 * Google Indexing API - request (re)indexing for the site's priority pages.
 *
 * Credentials (one of):
 *   GOOGLE_SERVICE_ACCOUNT_KEY       the service account's JSON key, as a string
 *                                    (this is what the GitHub Actions secret holds)
 *   GOOGLE_SERVICE_ACCOUNT_KEY_FILE  path to that JSON key file (local runs)
 *
 * The service account needs the Indexing API enabled in its Google Cloud project
 * and must be an Owner of the site's property in Google Search Console.
 *
 * Exits non-zero if credentials are missing or any request fails, so CI shows it.
 * Never logs credential values or full error objects (they can carry tokens).
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';

interface ServiceAccountKey {
  client_email?: string;
  private_key?: string;
}

function loadServiceAccountKey(): ServiceAccountKey {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.trim();
  const file = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE?.trim();

  let raw: string;
  let source: string;
  if (inline) {
    raw = inline;
    source = 'GOOGLE_SERVICE_ACCOUNT_KEY';
  } else if (file) {
    raw = readFileSync(file, 'utf-8');
    source = 'GOOGLE_SERVICE_ACCOUNT_KEY_FILE';
  } else {
    throw new Error(
      'No credentials: set GOOGLE_SERVICE_ACCOUNT_KEY (JSON key contents) or GOOGLE_SERVICE_ACCOUNT_KEY_FILE (path to the JSON key).'
    );
  }

  let key: ServiceAccountKey;
  try {
    key = JSON.parse(raw);
  } catch {
    throw new Error(`${source} is not valid JSON. It must be the full service account key file contents.`);
  }

  if (!key.client_email || !key.private_key) {
    throw new Error(`${source} is missing client_email or private_key. Use a service account JSON key.`);
  }
  return key;
}

function describeError(error: unknown): string {
  const e = error as { code?: unknown; status?: unknown; message?: unknown; response?: { status?: unknown } };
  const status = e?.response?.status ?? e?.status ?? e?.code;
  const message = typeof e?.message === 'string' ? e.message : String(error);
  return status ? `${status}: ${message}` : message;
}

async function main() {
  const key = loadServiceAccountKey();

  const auth = new google.auth.JWT({
    email: key.client_email,
    // Keys pasted into secrets sometimes keep "\n" as two literal characters.
    key: key.private_key!.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  try {
    await auth.authorize();
  } catch (error) {
    throw new Error(`Could not authenticate the service account (${describeError(error)})`);
  }

  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ampvendingmachines.com').replace(/\/$/, '');
  const priorityUrls = [
    baseUrl,
    `${baseUrl}/vending-machines`,
    `${baseUrl}/vending-machines/refrigerated-touchscreen-vending-machine`,
    `${baseUrl}/contact`,
    `${baseUrl}/service-areas/modesto`,
    `${baseUrl}/service-areas/stockton`,
  ];

  const indexing = google.indexing({ version: 'v3', auth });
  const failures: string[] = [];

  console.log(`🚀 Requesting indexing for ${priorityUrls.length} URLs...\n`);

  for (const url of priorityUrls) {
    try {
      const response = await indexing.urlNotifications.publish({
        requestBody: { url, type: 'URL_UPDATED' },
      });
      console.log(`✅ ${url} (HTTP ${response.status})`);
    } catch (error) {
      console.error(`❌ ${url}: ${describeError(error)}`);
      failures.push(url);
    }
    // Wait 1 second between requests to respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (failures.length) {
    throw new Error(`${failures.length} of ${priorityUrls.length} indexing requests failed.`);
  }
  console.log('\n✅ All indexing requests completed!');
}

main().catch((error) => {
  console.error(`\n❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

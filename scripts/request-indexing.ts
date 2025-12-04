/**
 * Google Indexing API - Request Indexing for New/Updated Pages
 * Week 1: Technical Foundation Enhancement
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';

// Load service account credentials
const keyFile = JSON.parse(
  readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || '', 'utf-8')
);

const jwtClient = new google.auth.JWT(
  keyFile.client_email,
);

// const jwtClient = new google.auth.JWT(
//   keyFile.client_email,
//   undefined,
//   keyFile.private_key,
//   ['https://www.googleapis.com/auth/indexing'],
//   undefined
// );

async function requestIndexing(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  try {
    await jwtClient.authorize();
    
    const response = await google.indexing('v3').urlNotifications.publish({
      auth: jwtClient,
      requestBody: {
        url: url,
        type: type,
      },
    });
    
    console.log(`✅ Indexing requested for: ${url}`);
    console.log(`   Status: ${response.status}`);
    return response;
  } catch (error) {
    console.error(`❌ Error requesting indexing for ${url}:`, error);
    throw error;
  }
}

async function main() {
  const baseUrl = 'https://www.ampvendingmachines.com';
  
  const priorityUrls = [
    baseUrl,
    `${baseUrl}/vending-machines`,
    `${baseUrl}/vending-machines/refrigerated-touchscreen-vending-machine`,
    `${baseUrl}/contact`,
    `${baseUrl}/service-areas/modesto`,
    `${baseUrl}/service-areas/stockton`,
  ];
  
  console.log('🚀 Requesting indexing for priority URLs...\n');
  
  for (const url of priorityUrls) {
    await requestIndexing(url);
    // Wait 1 second between requests to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ All indexing requests completed!');
}

main().catch(console.error);
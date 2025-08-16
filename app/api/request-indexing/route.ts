// app/api/request-indexing/route.ts - Fixed TypeScript errors

import { NextRequest, NextResponse } from 'next/server';

interface GoogleIndexingResponse {
  success: boolean;
  error?: string;
  urlNotificationMetadata?: any;
}

interface IndexingResult {
  url: string;
  google?: GoogleIndexingResponse | { error: string };
  indexNow?: { success: boolean; error?: string };
  status: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      );
    }

    const results: IndexingResult[] = [];

    for (const urlToIndex of urls) {
      try {
        // Submit to Google Indexing API
        const googleResponse = await submitToGoogleIndexing(urlToIndex);
        
        // Submit to IndexNow
        const indexNowResponse = await submitToIndexNow(urlToIndex);

        const result: IndexingResult = {
          url: urlToIndex,
          google: googleResponse,
          indexNow: indexNowResponse,
          status: 'success',
        };
        
        results.push(result);

      } catch (error) {
        const errorResult: IndexingResult = {
          url: urlToIndex,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        
        results.push(errorResult);
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Processed ${urls.length} URLs`
    });

  } catch (error) {
    console.error('Request indexing error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

async function submitToGoogleIndexing(url: string): Promise<GoogleIndexingResponse> {
  try {
    // Placeholder for Google Indexing API
    console.log('Submitting to Google Indexing:', url);
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Google indexing failed' };
  }
}

async function submitToIndexNow(url: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Placeholder for IndexNow API
    console.log('Submitting to IndexNow:', url);
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'IndexNow failed' };
  }
}

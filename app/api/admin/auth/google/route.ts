import { NextRequest, NextResponse } from 'next/server';
import { getGoogleOAuthService } from '@/lib/auth/googleOAuth';

/**
 * GET /api/admin/auth/google
 * Initiates Google OAuth flow by redirecting to Google sign-in
 */
export async function GET(request: NextRequest) {
  try {
    const oauth = getGoogleOAuthService();
    const authUrl = oauth.getAuthUrl();

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Google OAuth initiation error:', error);

    // Redirect back to login with error
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('error', 'oauth_init_failed');
    loginUrl.searchParams.set('message', 'Failed to initialize Google sign-in');

    return NextResponse.redirect(loginUrl);
  }
}

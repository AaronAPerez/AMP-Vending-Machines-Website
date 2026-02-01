import { NextRequest, NextResponse } from 'next/server';
import { getGoogleOAuthService } from '@/lib/auth/googleOAuth';
import { HybridAuthService } from '@/lib/auth/hybridAuth';
import { cookies } from 'next/headers';

/**
 * GET /api/admin/auth/google/callback
 * Handles Google OAuth callback after user authorization
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      console.error('OAuth error from Google:', error);
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'oauth_denied');
      loginUrl.searchParams.set('message', 'Google sign-in was cancelled or denied');
      return NextResponse.redirect(loginUrl);
    }

    // Check for authorization code
    if (!code) {
      console.error('No authorization code received');
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'no_code');
      loginUrl.searchParams.set('message', 'No authorization code received from Google');
      return NextResponse.redirect(loginUrl);
    }

    // Exchange code for tokens
    const oauth = getGoogleOAuthService();
    const tokens = await oauth.getTokens(code);

    if (!tokens.id_token) {
      throw new Error('No ID token received from Google');
    }

    // Authenticate with ID token
    const session = await HybridAuthService.authenticateWithGoogle(tokens.id_token);

    if (!session) {
      console.warn('User not authorized for admin access');
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'unauthorized');
      loginUrl.searchParams.set('message', 'Your Google account is not authorized for admin access');
      return NextResponse.redirect(loginUrl);
    }

    // Set authentication cookies
    const cookieStore = await cookies();

    // Access token cookie
    cookieStore.set('amp-admin-token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/admin'
    });

    // Refresh token cookie
    cookieStore.set('amp-admin-refresh', session.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/admin'
    });

    // User info cookie (for UI display)
    cookieStore.set('amp-admin-user', JSON.stringify({
      name: session.user.name,
      email: session.user.email,
      avatar: session.user.avatarUrl,
      role: session.user.role
    }), {
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/admin'
    });

    console.log(`✅ Admin logged in via Google: ${session.user.email}`);

    // Redirect to admin dashboard
    const dashboardUrl = new URL('/admin', request.url);
    return NextResponse.redirect(dashboardUrl);

  } catch (error) {
    console.error('OAuth callback error:', error);

    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('error', 'auth_failed');
    loginUrl.searchParams.set('message', 'Authentication failed. Please try again.');

    return NextResponse.redirect(loginUrl);
  }
}

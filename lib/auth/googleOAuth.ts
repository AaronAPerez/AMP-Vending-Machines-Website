import { OAuth2Client } from 'google-auth-library';

/**
 * Google OAuth tokens returned from token exchange
 */
export interface GoogleTokens {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expiry_date?: number;
}

/**
 * User information extracted from Google ID token
 */
export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture?: string;
  email_verified?: boolean;
}

/**
 * Google OAuth Service
 * Handles Google Sign-In authentication flow
 */
export class GoogleOAuthService {
  private client: OAuth2Client;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI ||
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/auth/google/callback`;

    if (!clientId || !clientSecret) {
      throw new Error('Google OAuth credentials not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment variables.');
    }

    this.client = new OAuth2Client(
      clientId,
      clientSecret,
      redirectUri
    );
  }

  /**
   * Generate Google OAuth authorization URL
   * Redirects user to Google sign-in page
   */
  getAuthUrl(): string {
    return this.client.generateAuthUrl({
      access_type: 'offline', // Get refresh token
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ],
      prompt: 'consent', // Force consent screen to get refresh token
      include_granted_scopes: true
    });
  }

  /**
   * Exchange authorization code for tokens
   * Called after user authorizes and is redirected back
   */
  async getTokens(code: string): Promise<GoogleTokens> {
    try {
      const { tokens } = await this.client.getToken(code);

      if (!tokens.access_token || !tokens.id_token) {
        throw new Error('Invalid tokens received from Google');
      }

      return {
        access_token: tokens.access_token,
        id_token: tokens.id_token,
        refresh_token: tokens.refresh_token || undefined,
        expiry_date: tokens.expiry_date || undefined
      };
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw new Error('Failed to exchange authorization code for tokens');
    }
  }

  /**
   * Verify and decode Google ID token
   * Returns user information from the token
   */
  async verifyIdToken(idToken: string): Promise<GoogleUserInfo> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error('Invalid token payload');
      }

      if (!payload.email) {
        throw new Error('Email not provided by Google');
      }

      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name || payload.email,
        picture: payload.picture,
        email_verified: payload.email_verified
      };
    } catch (error) {
      console.error('Error verifying ID token:', error);
      throw new Error('Failed to verify Google ID token');
    }
  }

  /**
   * Refresh access token using refresh token
   * Useful for long-lived sessions
   */
  async refreshAccessToken(refreshToken: string): Promise<GoogleTokens> {
    try {
      this.client.setCredentials({
        refresh_token: refreshToken
      });

      const { credentials } = await this.client.refreshAccessToken();

      if (!credentials.access_token) {
        throw new Error('Failed to refresh access token');
      }

      return {
        access_token: credentials.access_token,
        id_token: credentials.id_token || '',
        refresh_token: credentials.refresh_token || refreshToken,
        expiry_date: credentials.expiry_date || undefined
      };
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Failed to refresh Google access token');
    }
  }

  /**
   * Revoke Google OAuth token
   * Logs user out from Google session
   */
  async revokeToken(token: string): Promise<void> {
    try {
      await this.client.revokeToken(token);
    } catch (error) {
      console.error('Error revoking token:', error);
      throw new Error('Failed to revoke Google token');
    }
  }

  /**
   * Get user info from Google using access token
   * Alternative method to get user details
   */
  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info from Google');
      }

      const data = await response.json();

      return {
        id: data.id,
        email: data.email,
        name: data.name || data.email,
        picture: data.picture,
        email_verified: data.verified_email
      };
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw new Error('Failed to fetch Google user information');
    }
  }
}

/**
 * Singleton instance for easy import
 */
let googleOAuthService: GoogleOAuthService | null = null;

export function getGoogleOAuthService(): GoogleOAuthService {
  if (!googleOAuthService) {
    googleOAuthService = new GoogleOAuthService();
  }
  return googleOAuthService;
}

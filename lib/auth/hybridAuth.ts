import jwt from 'jsonwebtoken';
import { GoogleOAuthService } from './googleOAuth';
import { AuthService } from '../services/authService';
import { supabaseServer } from '../supabase';
import { AdminUser } from '../types/auth';

/**
 * Authentication session with user details and tokens
 */
export interface AuthSession {
  user: AdminUser;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

/**
 * Hybrid Authentication Service
 * Supports both JWT credentials and Google OAuth
 * Provides unified authentication interface
 */
export class HybridAuthService {
  /**
   * Authenticate with email/password (existing JWT system)
   */
  static async authenticateWithCredentials(
    email: string,
    password: string
  ): Promise<AuthSession | null> {
    try {
      // Use existing AuthService
      const session = await AuthService.authenticateAdmin({ email, password });

      if (!session) {
        return null;
      }

      // Generate refresh token
      const refreshToken = this.generateRefreshToken(session.user);

      return {
        user: session.user,
        token: session.token,
        refreshToken,
        expiresAt: session.expiresAt
      };
    } catch (error) {
      console.error('Credential authentication error:', error);
      return null;
    }
  }

  /**
   * Authenticate with Google OAuth ID token
   */
  static async authenticateWithGoogle(
    idToken: string
  ): Promise<AuthSession | null> {
    try {
      const oauth = new GoogleOAuthService();
      const googleUser = await oauth.verifyIdToken(idToken);

      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      // Check if admin user exists with this Google OAuth ID
      const { data: adminUser, error } = await supabaseServer
        .from('admin_users')
        .select('*')
        .eq('oauth_provider', 'google')
        .eq('oauth_id', googleUser.id)
        .eq('is_active', true)
        .single();

      if (error || !adminUser) {
        console.warn(`OAuth user not found or not authorized: ${googleUser.email}`);
        return null;
      }

      // Update last login
      await supabaseServer
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminUser.id);

      // Convert database admin user to AdminUser type
      const user: AdminUser = {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        name: adminUser.name,
        permissions: adminUser.permissions || [],
        lastLogin: new Date(adminUser.last_login),
        createdAt: new Date(adminUser.created_at),
        isActive: adminUser.is_active,
        avatarUrl: adminUser.avatar_url || googleUser.picture
      };

      // Generate JWT token
      const token = this.generateToken(user);
      const refreshToken = this.generateRefreshToken(user);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      return {
        user,
        token,
        refreshToken,
        expiresAt
      };
    } catch (error) {
      console.error('Google OAuth authentication error:', error);
      return null;
    }
  }

  /**
   * Verify session token (works for both JWT and OAuth sessions)
   */
  static async verifySession(token: string): Promise<AdminUser | null> {
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      // Check if user still exists and is active
      if (supabaseServer && decoded.userId) {
        const { data: adminUser } = await supabaseServer
          .from('admin_users')
          .select('*')
          .eq('id', decoded.userId)
          .eq('is_active', true)
          .single();

        if (adminUser) {
          return {
            id: adminUser.id,
            email: adminUser.email,
            role: adminUser.role,
            name: adminUser.name,
            permissions: adminUser.permissions || [],
            lastLogin: new Date(adminUser.last_login || adminUser.created_at),
            createdAt: new Date(adminUser.created_at),
            isActive: adminUser.is_active,
            avatarUrl: adminUser.avatar_url
          };
        }
      }

      // Fallback to token data if database check fails
      return {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name || 'Admin',
        permissions: this.parsePermissions(decoded.permissions || []),
        lastLogin: new Date(),
        createdAt: new Date(),
        isActive: true
      };
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  }

  /**
   * Refresh session with refresh token
   */
  static async refreshSession(refreshToken: string): Promise<AuthSession | null> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as any;

      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      // Get latest user data
      const { data: adminUser, error } = await supabaseServer
        .from('admin_users')
        .select('*')
        .eq('id', decoded.userId)
        .eq('is_active', true)
        .single();

      if (error || !adminUser) {
        return null;
      }

      const user: AdminUser = {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        name: adminUser.name,
        permissions: adminUser.permissions || [],
        lastLogin: new Date(adminUser.last_login),
        createdAt: new Date(adminUser.created_at),
        isActive: adminUser.is_active,
        avatarUrl: adminUser.avatar_url
      };

      // Generate new tokens
      const newToken = this.generateToken(user);
      const newRefreshToken = this.generateRefreshToken(user);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      return {
        user,
        token: newToken,
        refreshToken: newRefreshToken,
        expiresAt
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }

  /**
   * Create or update OAuth user in database
   * Used during first-time OAuth login
   */
  static async createOrUpdateOAuthUser(
    provider: 'google',
    oauthId: string,
    email: string,
    name: string,
    picture?: string
  ): Promise<AdminUser | null> {
    try {
      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      // Check if user exists
      const { data: existing } = await supabaseServer
        .from('admin_users')
        .select('*')
        .eq('oauth_provider', provider)
        .eq('oauth_id', oauthId)
        .single();

      if (existing) {
        // Update existing user
        const { data: updated, error } = await supabaseServer
          .from('admin_users')
          .update({
            name,
            avatar_url: picture,
            last_login: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;

        return {
          id: updated.id,
          email: updated.email,
          role: updated.role,
          name: updated.name,
          permissions: updated.permissions || [],
          lastLogin: new Date(updated.last_login),
          createdAt: new Date(updated.created_at),
          isActive: updated.is_active,
          avatarUrl: updated.avatar_url
        };
      } else {
        // Create new user (requires manual approval or pre-configuration)
        // Note: By default, new OAuth users are NOT created automatically for security
        // They must be pre-configured in the admin_users table
        console.warn(`OAuth user not pre-configured: ${email}`);
        return null;
      }
    } catch (error) {
      console.error('Error creating/updating OAuth user:', error);
      return null;
    }
  }

  /**
   * Generate JWT access token
   */
  private static generateToken(user: AdminUser): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      permissions: user.permissions.map(p =>
        `${p.resource}:${p.actions.join(',')}`
      )
    };

    const jwtSecret = process.env.JWT_SECRET as string;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    return jwt.sign(payload, jwtSecret, {
      expiresIn: '15m',
      algorithm: 'HS256',
      issuer: 'amp-vending',
      audience: 'amp-admin'
    });
  }

  /**
   * Generate JWT refresh token
   */
  private static generateRefreshToken(user: AdminUser): string {
    const payload = {
      userId: user.id,
      type: 'refresh'
    };

    const jwtSecret = process.env.JWT_SECRET as string;
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    return jwt.sign(payload, jwtSecret, {
      expiresIn: '7d',
      algorithm: 'HS256',
      issuer: 'amp-vending',
      audience: 'amp-admin-refresh'
    });
  }

  /**
   * Parse permissions from token payload
   */
  private static parsePermissions(permissionStrings: string[]): any[] {
    return permissionStrings.map((permStr, index) => {
      const [resource, actionsStr] = permStr.split(':');
      const actions = actionsStr ? actionsStr.split(',') : [];

      return {
        id: `permission-${index}`,
        name: resource,
        resource: resource,
        actions
      };
    });
  }
}

// lib/services/authService.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { LoginCredentials, AdminUser, AdminPermission } from '../types/auth';
import { PasswordSecurity } from '../utils/auth/passwordUtils';

import { AuthSession } from '@supabase/supabase-js';

// Custom session type to include token and expiresAt
export type AdminAuthSession = {
  user: AdminUser;
  token: string;
  expiresAt: Date;
};

/**
 * Enterprise-grade authentication service
 * Build Process: Implements JWT tokens with refresh mechanism and secure session management
 */
export class AuthService {
  private static readonly REFRESH_TOKEN_EXPIRY = '7d';
  private static readonly COOKIE_NAME = 'amp-admin-token';
    static TOKEN_EXPIRY: number | string = '1h';

  /**
   * Authenticate admin user with credentials
   */
  static async authenticateAdmin(credentials: LoginCredentials): Promise<AdminAuthSession | null> {
    try {
      // Validate credentials format
      this.validateCredentials(credentials);

      // Check against environment variables (for initial setup)
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

      if (!adminEmail || !adminPasswordHash) {
        throw new Error('Admin credentials not configured');
      }

      // Verify email
      if (credentials.email !== adminEmail) {
        // Add delay to prevent timing attacks
        await new Promise(resolve => setTimeout(resolve, 1000));
        return null;
      }

      // Verify password
      const isValidPassword = await PasswordSecurity.verifyPassword(
        credentials.password,
        adminPasswordHash
      );

      if (!isValidPassword) {
        // Add delay to prevent timing attacks
        await new Promise(resolve => setTimeout(resolve, 1000));
        return null;
      }

      // Create admin user object
      const adminUser: AdminUser & {
        app_metadata: any;
        user_metadata: any;
        aud: string;
        created_at: string;
      } = {
        id: 'admin-1',
        email: adminEmail,
        role: 'super_admin',
        name: 'AMP Vending Administrator',
        permissions: this.getAllPermissions(),
        lastLogin: new Date(),
        createdAt: new Date('2024-01-01'),
        isActive: true,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date('2024-01-01').toISOString(),
      };

      // Generate JWT token
      const token = this.generateToken(adminUser);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      return {
        user: adminUser,
        token,
        expiresAt,
      };

    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  /**
   * Generate JWT token for authenticated user
   */
  static generateToken(user: AdminUser): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions.map(p => `${p.resource}:${p.actions.join(',')}`),
    };

const jwtSecret = process.env.JWT_SECRET as string;
if (!jwtSecret) {
  throw new Error('JWT secret is not defined in environment variables');
}
return jwt.sign(
  payload,           // First parameter: payload object
  jwtSecret,         // Second parameter: secret string  
  {                  // Third parameter: options object
    expiresIn: '15m',        // Use simple string format
    algorithm: 'HS256',
    issuer: 'amp-vending',
    audience: 'amp-admin'
  }
);
}

  /**
   * Verify and decode JWT token
   */
  static async verifyToken(token: string): Promise<AdminUser | null> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      // Reconstruct user object from token
      const adminUser: AdminUser = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        name: 'AMP Vending Administrator',
        permissions: this.parsePermissions(decoded.permissions),
        lastLogin: new Date(),
        createdAt: new Date('2024-01-01'),
        isActive: true,
      };

      return adminUser;
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  }

  /**
   * Get current authenticated admin from cookies
   */
  static async getCurrentAdmin(): Promise<AdminUser | null> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get(this.COOKIE_NAME)?.value;

      if (!token) {
        return null;
      }

      return this.verifyToken(token);
    } catch (error) {
      console.error('Get current admin error:', error);
      return null;
    }
  }

  /**
   * Set authentication cookie
   */
  static async setAuthCookie(token: string, rememberMe: boolean = false): Promise<void> {
    const cookieStore = await cookies();

    // Using path: '/' to make cookie accessible to both /admin and /api/admin routes
    cookieStore.set(this.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: rememberMe ? 7 * 24 * 60 * 60 : 60 * 60, // 7 days or 1 hour
      path: '/',
    });
  }

  /**
   * Clear authentication cookie
   */
  static async clearAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(this.COOKIE_NAME);
  }

  /**
   * Validate login credentials format
   */
  private static validateCredentials(credentials: LoginCredentials): void {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      throw new Error('Invalid email format');
    }
  }

  /**
   * Get all available permissions for super admin
   */
  private static getAllPermissions(): AdminPermission[] {
    return [
      {
        id: 'users-full',
        name: 'User Management',
        resource: 'users',
        actions: ['read', 'write', 'delete'],
      },
      {
        id: 'content-full',
        name: 'Content Management',
        resource: 'content',
        actions: ['read', 'write', 'delete', 'publish'],
      },
      {
        id: 'analytics-full',
        name: 'Analytics Access',
        resource: 'analytics',
        actions: ['read'],
      },
      {
        id: 'settings-full',
        name: 'System Settings',
        resource: 'settings',
        actions: ['read', 'write'],
      },
      {
        id: 'business-profile-full',
        name: 'Business Profile Management',
        resource: 'business_profile',
        actions: ['read', 'write', 'publish'],
      },
    ];
  }

  /**
   * Parse permissions from token payload
   */
  private static parsePermissions(permissionStrings: string[]): AdminPermission[] {
    return permissionStrings.map((permStr, index) => {
      const [resource, actionsStr] = permStr.split(':');
      const actions = actionsStr.split(',') as ('read' | 'write' | 'delete' | 'publish')[];
      
      return {
        id: `permission-${index}`,
        name: this.getPermissionName(resource),
        resource: resource as any,
        actions,
      };
    });
  }

  /**
   * Get human-readable permission name
   */
  private static getPermissionName(resource: string): string {
    const names: Record<string, string> = {
      users: 'User Management',
      content: 'Content Management',
      analytics: 'Analytics Access',
      settings: 'System Settings',
      business_profile: 'Business Profile Management',
    };
    return names[resource] || resource;
  }
}
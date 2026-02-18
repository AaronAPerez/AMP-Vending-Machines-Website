import { NextRequest } from 'next/server';
import { HybridAuthService } from '../auth/hybridAuth';
import { AdminUser } from '../types/auth';

/**
 * Custom error class for authentication failures
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Require admin authentication
 * Throws AuthError if not authenticated
 * Returns authenticated AdminUser if successful
 */
export async function requireAdmin(request: NextRequest): Promise<AdminUser> {
  try {
    // Get token from cookies
    const token = request.cookies.get('amp-admin-token')?.value;

    if (!token) {
      throw new AuthError('Not authenticated', 401, 'NO_TOKEN');
    }

    // Verify session
    const user = await HybridAuthService.verifySession(token);

    if (!user || !user.isActive) {
      throw new AuthError('Invalid or expired session', 401, 'INVALID_SESSION');
    }

    return user;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }

    console.error('Authentication middleware error:', error);
    throw new AuthError('Authentication failed', 401, 'AUTH_FAILED');
  }
}

/**
 * Require specific permission for a resource
 * Returns middleware function that checks permission
 */
export function requirePermission(
  resource: string,
  action: 'read' | 'write' | 'delete' | 'publish'
) {
  return async (request: NextRequest): Promise<AdminUser> => {
    const user = await requireAdmin(request);

    // Super admins have all permissions
    if (user.role === 'super_admin') {
      return user;
    }

    // Check if user has required permission
    const hasPermission = user.permissions?.some(
      p => p.resource === resource && p.actions.includes(action)
    );

    if (!hasPermission) {
      throw new AuthError(
        `Insufficient permissions. Required: ${resource}:${action}`,
        403,
        'INSUFFICIENT_PERMISSIONS'
      );
    }

    return user;
  };
}

/**
 * Require specific role
 * Returns middleware function that checks role
 */
export function requireRole(...allowedRoles: string[]) {
  return async (request: NextRequest): Promise<AdminUser> => {
    const user = await requireAdmin(request);

    if (!allowedRoles.includes(user.role)) {
      throw new AuthError(
        `Insufficient role. Required one of: ${allowedRoles.join(', ')}`,
        403,
        'INSUFFICIENT_ROLE'
      );
    }

    return user;
  };
}

/**
 * Optional authentication
 * Returns user if authenticated, null otherwise
 * Does not throw error if not authenticated
 */
export async function optionalAuth(request: NextRequest): Promise<AdminUser | null> {
  try {
    return await requireAdmin(request);
  } catch (error) {
    return null;
  }
}

/**
 * Get current admin user from request
 * Alias for requireAdmin with better naming
 */
export async function getCurrentAdmin(request: NextRequest): Promise<AdminUser> {
  return requireAdmin(request);
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  user: AdminUser,
  resource: string,
  action: 'read' | 'write' | 'delete' | 'publish'
): boolean {
  // Super admins have all permissions
  if (user.role === 'super_admin') {
    return true;
  }

  return user.permissions?.some(
    p => p.resource === resource && p.actions.includes(action)
  ) || false;
}

/**
 * Check if user has specific role
 */
export function hasRole(user: AdminUser, ...roles: string[]): boolean {
  return roles.includes(user.role);
}

/**
 * Middleware wrapper for API routes
 * Handles authentication and returns user or error response
 */
export function withAuth(
  handler: (request: NextRequest, user: AdminUser) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    try {
      const user = await requireAdmin(request);
      return handler(request, user);
    } catch (error) {
      if (error instanceof AuthError) {
        return Response.json(
          {
            success: false,
            error: error.message,
            code: error.code
          },
          { status: error.status }
        );
      }

      console.error('Unexpected error in auth middleware:', error);
      return Response.json(
        {
          success: false,
          error: 'Internal server error'
        },
        { status: 500 }
      );
    }
  };
}

/**
 * Middleware wrapper with permission check
 */
export function withPermission(
  resource: string,
  action: 'read' | 'write' | 'delete' | 'publish',
  handler: (request: NextRequest, user: AdminUser) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    try {
      const user = await requirePermission(resource, action)(request);
      return handler(request, user);
    } catch (error) {
      if (error instanceof AuthError) {
        return Response.json(
          {
            success: false,
            error: error.message,
            code: error.code
          },
          { status: error.status }
        );
      }

      console.error('Unexpected error in permission middleware:', error);
      return Response.json(
        {
          success: false,
          error: 'Internal server error'
        },
        { status: 500 }
      );
    }
  };
}

/**
 * Extract auth token from request
 * Checks Authorization header and cookies
 */
export function extractToken(request: NextRequest): string | null {
  // Check Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookie
  return request.cookies.get('amp-admin-token')?.value || null;
}

/**
 * Get request metadata for logging
 */
export function getRequestMetadata(request: NextRequest) {
  return {
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    method: request.method,
    url: request.url,
    timestamp: new Date().toISOString()
  };
}

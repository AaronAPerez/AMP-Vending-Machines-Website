// /**
//  * Token Refresh API Route - Fixed Async Cookies Support
//  * 
//  * Build Process Documentation:
//  * 1. Fixed async cookies() API usage for Next.js 15+
//  * 2. Implements proper error handling and security logging
//  * 3. Uses TypeScript-safe parameter passing
//  * 4. Includes comprehensive audit trails for authentication events
//  * 5. Maintains backward compatibility with existing auth flow
//  */

// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { verify, sign } from 'jsonwebtoken';
// import AuditService from '@/lib/services/auditService';

// /**
//  * JWT Payload interface for type safety
//  */
// interface JWTPayload {
//   userId: string;
//   email: string;
//   role: string;
//   iat?: number;
//   exp?: number;
// }

// /**
//  * POST /api/admin/auth/refresh
//  * 
//  * Refreshes authentication tokens for admin users
//  * Includes comprehensive audit logging for security tracking
//  */
// export async function POST(request: NextRequest) {
//   const startTime = Date.now();

//   try {
//     // Get refresh token from cookies - FIXED: Handle both sync and async cookies API
//     const cookieStore = await cookies();
//     const refreshToken = cookieStore.get('refresh_token')?.value;

//     if (!refreshToken) {
//       // Log failed refresh attempt
//       await AuditService.logEvent({
//         event: 'token_refresh',
//         success: false,
//         errorMessage: 'No refresh token provided',
//         severity: 'medium',
//         details: {
//           reason: 'missing_refresh_token',
//           timestamp: new Date().toISOString(),
//         }
//       });

//       return NextResponse.json(
//         { error: 'No refresh token provided' },
//         { status: 401 }
//       );
//     }

//     // Verify the refresh token
//     const jwtSecret = process.env.JWT_SECRET;
//     const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

//     if (!jwtSecret || !jwtRefreshSecret) {
//       console.error('JWT secrets not configured');
      
//       // Log configuration error
//       await AuditService.logEvent({
//         event: 'security_event',
//         success: false,
//         errorMessage: 'JWT secrets not configured',
//         severity: 'critical',
//         details: {
//           reason: 'missing_jwt_secrets',
//           environment: process.env.NODE_ENV,
//         }
//       });

//       return NextResponse.json(
//         { error: 'Server configuration error' },
//         { status: 500 }
//       );
//     }

//     let user: JWTPayload;
    
//     try {
//       // Verify refresh token
//       const decoded = verify(refreshToken, jwtRefreshSecret) as JWTPayload;
//       user = decoded;
//     } catch (tokenError) {
//       // Log invalid token attempt
//       await AuditService.logEvent({
//         event: 'security_event',
//         success: false,
//         errorMessage: 'Invalid refresh token',
//         severity: 'high',
//         details: {
//           reason: 'invalid_refresh_token',
//           error: tokenError instanceof Error ? tokenError.message : 'Unknown error',
//           tokenPresent: !!refreshToken,
//           timestamp: new Date().toISOString(),
//         }
//       });

//       return NextResponse.json(
//         { error: 'Invalid refresh token' },
//         { status: 401 }
//       );
//     }

//     // Generate new access token
//     const accessToken = sign(
//       {
//         userId: user.userId,
//         email: user.email,
//         role: user.role,
//       },
//       jwtSecret,
//       { expiresIn: '15m' } // Short-lived access token
//     );

//     // Generate new refresh token
//     const newRefreshToken = sign(
//       {
//         userId: user.userId,
//         email: user.email,
//         role: user.role,
//       },
//       jwtRefreshSecret,
//       { expiresIn: '7d' } // Longer-lived refresh token
//     );

//     // Calculate request duration
//     const duration = Date.now() - startTime;

//     // Log successful token refresh
//     await AuditService.logEvent({
//       event: 'token_refresh',
//       userId: user.userId,
//       userEmail: user.email,
//       success: true,
//       duration,
//       severity: 'low',
//       details: {
//         reason: 'successful_refresh',
//         userRole: user.role,
//         accessTokenGenerated: true,
//         refreshTokenRotated: true,
//         timestamp: new Date().toISOString(),
//         duration: `${duration}ms`,
//       }
//     });

//     // Create response with new tokens
//     const response = NextResponse.json(
//       {
//         success: true,
//         accessToken,
//         user: {
//           id: user.userId,
//           email: user.email,
//           role: user.role,
//         },
//       },
//       { status: 200 }
//     );

//     // Set new refresh token as httpOnly cookie
//     response.cookies.set('refresh_token', newRefreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60, // 7 days
//       path: '/',
//     });

//     // Set access token as httpOnly cookie (optional)
//     response.cookies.set('access_token', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 15 * 60, // 15 minutes
//       path: '/',
//     });

//     return response;

//   } catch (error) {
//     const duration = Date.now() - startTime;
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error during token refresh';

//     // Log unexpected error
//     await AuditService.logEvent({
//       event: 'token_refresh',
//       success: false,
//       errorMessage,
//       duration,
//       severity: 'high',
//       details: {
//         reason: 'unexpected_error',
//         error: errorMessage,
//         stack: error instanceof Error ? error.stack : undefined,
//         timestamp: new Date().toISOString(),
//         duration: `${duration}ms`,
//       }
//     });

//     console.error('Token refresh error:', error);

//     return NextResponse.json(
//       { error: 'Internal server error during token refresh' },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * GET /api/admin/auth/refresh
//  * 
//  * Not allowed - refresh should only be done via POST
//  */
// export async function GET(request: NextRequest) {
//   // Log invalid method attempt
//   await AuditService.logEvent({
//     event: 'security_event',
//     success: false,
//     errorMessage: 'Invalid method for token refresh endpoint',
//     severity: 'medium',
//     details: {
//       reason: 'invalid_method',
//       method: 'GET',
//       endpoint: '/api/admin/auth/refresh',
//       timestamp: new Date().toISOString(),
//     }
//   });

//   return NextResponse.json(
//     { error: 'Method not allowed' },
//     { status: 405 }
//   );
// }

// /**
//  * Handle other HTTP methods
//  */
// export async function PUT(request: NextRequest) {
//   return GET(request);
// }

// export async function DELETE(request: NextRequest) {
//   return GET(request);
// }

// export async function PATCH(request: NextRequest) {
//   return GET(request);
// }
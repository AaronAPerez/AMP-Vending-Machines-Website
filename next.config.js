/**
 * Next.js Configuration - Optimized for Next.js 16.0.10
 *
 * Production-Ready Configuration:
 * 1. Compiler optimizations for bundle size reduction
 * 2. Advanced security headers (CSP, HSTS, COOP)
 * 3. Image optimization with AVIF/WebP support
 * 4. Aggressive caching strategy for static assets
 * 5. Performance optimizations for Core Web Vitals
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Core Configuration */

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Compiler optimizations using SWC (default in Next.js 16)
  compiler: {
    // Remove console.log statements in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"], // Keep errors and warnings
          }
        : false,
    // Remove React properties in production
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? {
            properties: ["^data-testid$"],
          }
        : false,
  },

  // Experimental features for optimization
  experimental: {
    // Optimize package imports for better tree shaking
    optimizePackageImports: ["lucide-react", "framer-motion"],
    optimizeCss: true,
  },

  // Environment variables available to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || "",
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV,
  },

  // Configure output behavior
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  distDir: ".next",

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    qualities: [75, 85, 90], // list of allowed qualities
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ampvendingmachines.com",
      },
    ],
    // Optimize for Core Web Vitals
    unoptimized: false,
  },

  // HTTP headers configuration
  async headers() {
    return [
      {
        // Security headers for all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            // NOTE: 'unsafe-inline' and 'unsafe-eval' reduce CSP protection but are
            // required for Next.js runtime and third-party analytics.
            // Consider tightening with nonces/hashes for stricter security.
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://vercel-analytics.com https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // API route headers
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "development"
                ? "*"
                : "https://www.ampvendingmachines.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400",
          },
        ],
      },
      {
        // Static asset caching
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Image caching
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects configuration
  async redirects() {
    return [
      // Add any permanent redirects here
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites configuration for API proxying
  async rewrites() {
    return [
      // Add any rewrites here
      // {
      //   source: '/api/external/:path*',
      //   destination: 'https://external-api.com/:path*',
      // },
    ];
  },

  // Configure build behavior
  async generateBuildId() {
    // Use git commit hash as build ID for better caching
    if (process.env.VERCEL_GIT_COMMIT_SHA) {
      return process.env.VERCEL_GIT_COMMIT_SHA;
    }
    // Fallback to default
    return null;
  },

  // Page extensions configuration
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Build-specific optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundles

  // Configure which files should be treated as pages
  excludeDefaultMomentLocales: true,
};

module.exports = nextConfig;

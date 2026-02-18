/**
 * Next.js Configuration - Optimized for Next.js 15.x
 *
 * Production-Ready Configuration:
 * 1. Compiler optimizations for bundle size reduction
 * 2. Advanced security headers (CSP, HSTS, COOP, Permissions-Policy)
 * 3. Image optimization with AVIF/WebP support
 * 4. Aggressive caching strategy for static assets
 * 5. Performance optimizations for Core Web Vitals
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Core Configuration */

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Compiler optimizations using SWC (default bundler)
  compiler: {
    // Remove console.log statements in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features for optimization
  experimental: {
    // Optimize package imports for better tree shaking
    optimizePackageImports: [
      "lucide-react",
      "@heroicons/react",
      "date-fns",
      "lodash",
      "framer-motion",
    ],
    // CSS optimization (requires critters package)
    optimizeCss: true,
    // Disable server source maps to fix source map parsing errors in dev
    serverSourceMaps: false,
    // Better Core Web Vitals attribution for debugging
    webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB", "INP"],
  },

  // Packages to exclude from server component bundling (prevents SSR issues)
  serverExternalPackages: ["sharp", "bcrypt", "argon2"],

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
  // Quality is set per-image via the Image component, default is 75
  images: {
    qualities: [60, 75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
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
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://www.google.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              "frame-src https://www.googletagmanager.com",
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

  // Turbopack configuration (used in dev mode with --turbopack flag)
  turbopack: {
    // Configuration handled by experimental.serverSourceMaps
  },

  // Logging configuration for better debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;

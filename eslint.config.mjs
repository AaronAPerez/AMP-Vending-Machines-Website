import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create compatibility layer for legacy configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // Extend Next.js core-web-vitals config
  ...compat.extends('next/core-web-vitals'),

  // Ignore patterns
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      '*.config.js',
      '*.config.mjs',
      'scripts/**',
    ],
  },

  // Custom rules
  {
    rules: {
      // Downgrade common issues to warnings for CI compatibility
      'react/no-unescaped-entities': 'warn',
      'react/display-name': 'warn',
    },
  },
];

export default config;

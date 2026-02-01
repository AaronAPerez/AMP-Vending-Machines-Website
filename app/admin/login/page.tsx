// app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon';
import EyeIcon from '@heroicons/react/24/outline/EyeIcon';

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#111111] to-[#000000] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#111111] rounded-2xl p-8 border border-[#333333] shadow-2xl">
          {/* Header */}
          
          <div className="text-center mb-8">
     
            <div className="inline-flex items-center space-x-8 mb-4">
      <Image
                src="/images/logo/AMP_logo.webp"
                width={90}
                height={60}
                alt={''}
                />
              {/* <div className="w-12 h-12 bg-[#FD5A1E] rounded-xl flex items-center justify-center">
                <span className="text-[#000000] font-bold text-xl">A</span>
              </div> */}
              <div> 
                <h1 className="text-xl font-bold text-[#F5F5F5]">AMP Vending</h1>
                <p className="text-sm text-[#A5ACAF]">Administration Portal</p>
                
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-[#333333] rounded-lg bg-[#000000] text-[#F5F5F5] placeholder-[#A5ACAF] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E]"
                placeholder="Enter your admin email"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                Password
              </label>
                <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-[#333333] rounded-lg bg-[#000000] text-[#F5F5F5] placeholder-[#A5ACAF] focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:border-[#FD5A1E]"
                placeholder="Enter your password"
                disabled={isLoading}
              />
                 <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
            </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#FD5A1E] text-[#000000] font-medium rounded-lg hover:bg-[#FD5A1E]/90 focus:outline-none focus:ring-2 focus:ring-[#FD5A1E] focus:ring-offset-2 focus:ring-offset-[#111111] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#333333]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#111111] text-[#A5ACAF]">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => {
              window.location.href = '/api/admin/auth/google';
            }}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg flex items-center justify-center space-x-3 border border-gray-300 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-[#A5ACAF]">
            <p>Authorized personnel only</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

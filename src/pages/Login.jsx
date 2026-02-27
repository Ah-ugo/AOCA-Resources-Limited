/** @format */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
  ChevronLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/api-client';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Prepare form data as URLSearchParams (x-www-form-urlencoded)
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append('username', formData.email); // Note: API expects 'username' field with email value
      formDataEncoded.append('password', formData.password);

      // Make the API call to the correct endpoint
      const response = await fetch(
        'https://aoca-resources-backend.onrender.com/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          body: formDataEncoded,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Login failed. Please check your credentials.',
        );
      }

      // Store authentication details
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('isAuthenticated', 'true');

        // Fetch user details
        const userResponse = await apiClient.get('/dashboard/profile');
        const userData = userResponse.data;

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userData.role);

        setStatus('success');

        // Redirect based on user role after a brief delay
        setTimeout(() => {
          if (userData.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatus('error');
      setErrorMessage(
        error.message || 'Invalid credentials. Please try again.',
      );
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Side: Form */}
      <div className='flex-1 flex items-center justify-center p-8 bg-white'>
        <div className='w-full max-w-md'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-12'
          >
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-12 hover:gap-3 transition-all'
            >
              <ChevronLeft className='h-4 w-4' /> Back to Home
            </Link>
            <h1 className='text-4xl md:text-5xl font-serif font-bold text-luxury-black mb-4'>
              Welcome Back
            </h1>
            <p className='text-gray-500 font-light'>
              Enter your credentials to access your elite portal.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  required
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder='name@example.com'
                  className='w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between items-center ml-4'>
                <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400'>
                  Password
                </label>
                <Link
                  to='/forgot-password'
                  title='Reset Password'
                  className='text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-600 hover:text-emerald-500'
                >
                  Forgot?
                </Link>
              </div>
              <div className='relative'>
                <Lock className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder='••••••••'
                  className='w-full pl-16 pr-16 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 text-sm'
              >
                <AlertCircle className='h-5 w-5 shrink-0' />
                {errorMessage}
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-center gap-3 p-4 rounded-xl bg-emerald-50 text-emerald-600 text-sm'
              >
                <div className='h-5 w-5 rounded-full bg-emerald-600 flex items-center justify-center'>
                  <svg
                    className='h-3 w-3 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={3}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                Login successful! Redirecting...
              </motion.div>
            )}

            <div className='flex items-center gap-3 ml-4'>
              <input
                type='checkbox'
                id='remember'
                className='w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500'
              />
              <label
                htmlFor='remember'
                className='text-sm text-gray-500 font-light'
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type='submit'
              disabled={status === 'loading'}
              className='w-full py-5 bg-luxury-black text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className='h-5 w-5 animate-spin' />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In{' '}
                  <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                </>
              )}
            </button>
          </form>

          <div className='mt-12 text-center'>
            <p className='text-gray-500 font-light'>
              Don't have an account?{' '}
              <Link
                to='/register'
                className='text-emerald-600 font-bold hover:text-emerald-500 transition-colors'
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Visual */}
      <div className='hidden lg:block flex-1 bg-luxury-black relative overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000'
            alt='Login Visual'
            className='w-full h-full object-cover opacity-50'
          />
          <div className='absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-transparent to-black' />
        </div>

        <div className='absolute inset-0 z-10 flex items-center justify-center p-20'>
          <div className='max-w-lg text-center'>
            <Globe className='h-20 w-20 text-emerald-500 mx-auto mb-12 animate-pulse' />
            <h2 className='text-5xl font-serif font-bold text-white mb-8'>
              Access Your Global Future
            </h2>
            <p className='text-xl text-white/60 font-light leading-relaxed'>
              "The only limit to our realization of tomorrow will be our doubts
              of today."
            </p>
            <div className='mt-12 pt-12 border-t border-white/10'>
              <p className='text-sm uppercase tracking-widest font-bold text-emerald-500'>
                AOCA Elite Portal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

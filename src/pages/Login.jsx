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
import PageLayout from '../components/PageLayout';

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
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append('username', formData.email);
      formDataEncoded.append('password', formData.password);

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

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('isAuthenticated', 'true');

        const userResponse = await apiClient.get('/dashboard/profile');
        const userData = userResponse.data.user;

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userData.role);

        setStatus('success');

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
    <PageLayout>
      <div className='min-h-screen flex'>
        {/* Left Side: Form */}
        <div className='flex-1 flex items-center justify-center p-8 bg-surface-container-lowest'>
          <div className='w-full max-w-md'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-12'
            >
              <Link
                to='/'
                className='inline-flex items-center gap-2 text-primary font-label-caps font-bold uppercase tracking-widest text-xs mb-12 hover:gap-3 transition-all'
              >
                <ChevronLeft className='h-4 w-4' /> Back to Home
              </Link>
              <h1 className='font-headline-lg text-on-surface font-bold mb-4'>
                Welcome Back
              </h1>
              <p className='font-body-md text-on-surface-variant'>
                Enter your credentials to access your elite portal.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <label className='font-label-md text-label-md font-bold text-on-surface mb-1 ml-4'>
                  Email Address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant' />
                  <input
                    required
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder='name@example.com'
                    className='w-full pl-16 pr-8 py-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-colors'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between items-center ml-4'>
                  <label className='font-label-md text-label-md font-bold text-on-surface mb-1'>
                    Password
                  </label>
                  <Link
                    to='/forgot-password'
                    title='Reset Password'
                    className='text-[10px] font-label-caps uppercase tracking-[0.2em] font-bold text-primary hover:text-primary-container transition-colors'
                  >
                    Forgot?
                  </Link>
                </div>
                <div className='relative'>
                  <Lock className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant' />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder='••••••••'
                    className='w-full pl-16 pr-16 py-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-colors'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors'
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
                  className='flex items-center gap-3 p-4 rounded-xl bg-primary/5 text-primary text-sm'
                >
                  <div className='h-5 w-5 rounded-full bg-primary flex items-center justify-center'>
                    <svg
                      className='h-3 w-3 text-on-primary'
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
                  className='w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary'
                />
                <label
                  htmlFor='remember'
                  className='text-sm text-on-surface-variant font-body-md'
                >
                  Remember me for 30 days
                </label>
              </div>

              <button
                type='submit'
                disabled={status === 'loading'}
                className='w-full py-5 bg-primary text-on-primary rounded-full font-label-md text-label-md font-semibold hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed'
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
              <p className='text-on-surface-variant font-body-md'>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  className='text-primary font-bold hover:text-primary-container transition-colors'
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className='hidden lg:block flex-1 bg-primary relative overflow-hidden'>
          <div className='absolute inset-0 z-0'>
            <img
              src="/image7.png"
              alt='Login Visual'
              className='w-full h-full object-cover opacity-50'
            />
            <div className='absolute inset-0 bg-gradient-to-br from-primary/80 via-transparent to-primary' />
          </div>

          <div className='absolute inset-0 z-10 flex items-center justify-center p-20'>
            <div className='max-w-lg text-center'>
              <Globe className='h-20 w-20 text-on-primary-container mx-auto mb-12 animate-pulse' />
              <h2 className='font-display-hero text-5xl text-white font-bold mb-8'>
                Access Your Global Future
              </h2>
              <p className='font-body-lg text-white/70 leading-relaxed'>
                "The only limit to our realization of tomorrow will be our doubts
                of today."
              </p>
              <div className='mt-12 pt-12 border-t border-white/10'>
                <p className='text-sm font-label-caps font-bold uppercase tracking-widest text-on-primary-container'>
                  AOCA Elite Portal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

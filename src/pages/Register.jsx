/** @format */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Phone,
  Globe,
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    role: 'student',
    password: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim())
      errors.first_name = 'First name is required';
    if (!formData.last_name.trim()) errors.last_name = 'Last name is required';

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) errors.phone = 'Phone number is required';

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus('loading');
    setFieldErrors({});
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://aoca-resources-backend.onrender.com/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // Store user data if needed
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
        }
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Handle validation errors from backend
        if (data.detail) {
          if (Array.isArray(data.detail)) {
            // Handle Pydantic validation errors
            const backendErrors = {};
            data.detail.forEach((err) => {
              const field = err.loc[err.loc.length - 1];
              backendErrors[field] = err.msg;
            });
            setFieldErrors(backendErrors);
            throw new Error('Please check the form for errors');
          } else {
            throw new Error(data.detail || 'Registration failed');
          }
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.message || 'Something went wrong. Please try again.',
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left Side: Visual */}
      <div className='hidden lg:block flex-1 bg-luxury-black relative overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000'
            alt='Register Visual'
            className='w-full h-full object-cover opacity-40'
          />
          <div className='absolute inset-0 bg-gradient-to-tr from-emerald-600/30 via-transparent to-black' />
        </div>

        <div className='absolute inset-0 z-10 flex flex-col justify-between p-20'>
          <Link to='/' className='text-3xl font-serif font-bold text-white'>
            AOCA<span className='text-emerald-500'>.</span>
          </Link>

          <div className='max-w-lg'>
            <ShieldCheck className='h-16 w-16 text-emerald-500 mb-8' />
            <h2 className='text-6xl font-serif font-bold text-white mb-8 leading-tight'>
              Begin Your Elite Journey
            </h2>
            <div className='space-y-8'>
              {[
                'Access to exclusive German work pathways',
                'Personalized career mentorship',
                'Elite language training resources',
                'Direct connection to global employers',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className='flex items-center gap-4 text-white/80'
                >
                  <CheckCircle className='h-6 w-6 text-emerald-500 shrink-0' />
                  <span className='text-lg font-light'>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className='text-white/30 text-sm font-light'>
            © 2024 AOCA Resources Limited. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className='flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto'>
        <div className='w-full max-w-xl py-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-12'
          >
            <Link
              to='/login'
              className='inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-12 hover:gap-3 transition-all'
            >
              <ChevronLeft className='h-4 w-4' /> Already have an account?
            </Link>
            <h1 className='text-4xl md:text-5xl font-serif font-bold text-luxury-black mb-4'>
              Create Account
            </h1>
            <p className='text-gray-500 font-light'>
              Join the elite community of global professionals.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* First Name */}
              <div className='space-y-2'>
                <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                  First Name <span className='text-emerald-600'>*</span>
                </label>
                <div className='relative'>
                  <User className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    required
                    type='text'
                    name='first_name'
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder='John'
                    className={`w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border ${
                      fieldErrors.first_name
                        ? 'border-red-300'
                        : 'border-gray-100'
                    } focus:outline-none focus:border-emerald-500 transition-colors`}
                  />
                </div>
                {fieldErrors.first_name && (
                  <p className='ml-4 text-xs text-red-500'>
                    {fieldErrors.first_name}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className='space-y-2'>
                <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                  Last Name <span className='text-emerald-600'>*</span>
                </label>
                <div className='relative'>
                  <User className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    required
                    type='text'
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder='Doe'
                    className={`w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border ${
                      fieldErrors.last_name
                        ? 'border-red-300'
                        : 'border-gray-100'
                    } focus:outline-none focus:border-emerald-500 transition-colors`}
                  />
                </div>
                {fieldErrors.last_name && (
                  <p className='ml-4 text-xs text-red-500'>
                    {fieldErrors.last_name}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className='space-y-2'>
              <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                Email Address <span className='text-emerald-600'>*</span>
              </label>
              <div className='relative'>
                <Mail className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  required
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='john@example.com'
                  className={`w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border ${
                    fieldErrors.email ? 'border-red-300' : 'border-gray-100'
                  } focus:outline-none focus:border-emerald-500 transition-colors`}
                />
              </div>
              {fieldErrors.email && (
                <p className='ml-4 text-xs text-red-500'>{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className='space-y-2'>
              <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                Phone Number <span className='text-emerald-600'>*</span>
              </label>
              <div className='relative'>
                <Phone className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  required
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='+234 123 456 7890'
                  className={`w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border ${
                    fieldErrors.phone ? 'border-red-300' : 'border-gray-100'
                  } focus:outline-none focus:border-emerald-500 transition-colors`}
                />
              </div>
              {fieldErrors.phone && (
                <p className='ml-4 text-xs text-red-500'>{fieldErrors.phone}</p>
              )}
            </div>

            {/* Address (Optional) */}
            <div className='space-y-2'>
              <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                Address
              </label>
              <div className='relative'>
                <Globe className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='Lagos, Nigeria'
                  className='w-full pl-16 pr-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
                />
              </div>
            </div>

            {/* Bio (Optional) */}
            <div className='space-y-2'>
              <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                Bio
              </label>
              <div className='relative'>
                <textarea
                  name='bio'
                  value={formData.bio}
                  onChange={handleChange}
                  rows='3'
                  placeholder='Tell us a bit about yourself...'
                  className='w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors resize-none'
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <label className='text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 ml-4'>
                Password <span className='text-emerald-600'>*</span>
              </label>
              <div className='relative'>
                <Lock className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className={`w-full pl-16 pr-16 py-5 rounded-2xl bg-gray-50 border ${
                    fieldErrors.password ? 'border-red-300' : 'border-gray-100'
                  } focus:outline-none focus:border-emerald-500 transition-colors`}
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
              {fieldErrors.password && (
                <p className='ml-4 text-xs text-red-500'>
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Role (Hidden - defaults to student) */}
            <input type='hidden' name='role' value='student' />

            {/* Error Message */}
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

            {/* Success Message */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-center gap-3 p-4 rounded-xl bg-emerald-50 text-emerald-600 text-sm'
              >
                <CheckCircle className='h-5 w-5 shrink-0' />
                Registration successful! Redirecting to login...
              </motion.div>
            )}

            {/* Terms Checkbox */}
            <div className='flex items-start gap-3 ml-4'>
              <input
                type='checkbox'
                id='terms'
                required
                className='mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500'
              />
              <label
                htmlFor='terms'
                className='text-sm text-gray-500 font-light leading-relaxed'
              >
                I agree to the{' '}
                <Link
                  to='/terms'
                  className='text-emerald-600 font-bold hover:underline'
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to='/privacy'
                  className='text-emerald-600 font-bold hover:underline'
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={status === 'loading'}
              className='w-full py-5 bg-luxury-black text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className='h-5 w-5 animate-spin' />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/** @format */

'use client';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Home, ArrowLeft } from 'lucide-react';
import PageLayout from '../components/PageLayout';

function NotFound() {
  return (
    <PageLayout>
      {/* Page Content */}
      <main className='pt-8 pb-16 flex items-center justify-center min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-2xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className='font-display-hero text-9xl text-primary mb-6'>404</div>
              <h1 className='font-headline-lg text-on-surface font-bold mb-4'>
                Page Not Found
              </h1>
              <p className='font-body-lg text-on-surface-variant mb-8'>
                The page you are looking for doesn't exist or has been moved.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  to='/'
                  className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all'
                >
                  <Home className='h-5 w-5' />
                  Go to Homepage
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className='inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary/10 transition-all'
                >
                  <ArrowLeft className='h-5 w-5' />
                  Go Back
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}

export default NotFound;

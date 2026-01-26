/** @format */

'use client';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

function Header({ pathwaysRef, coursesRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pathways', path: '/#pathways', ref: pathwaysRef },
    { name: 'Courses', path: '/#courses', ref: coursesRef },
    { name: 'Blog', path: '/blogs' },
    { name: 'Careers', path: '/careers' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleHashLinkClick = (e, item) => {
    e.preventDefault();

    if (item.ref) {
      if (location.pathname === '/') {
        item.ref.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          item.ref.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (item.path.includes('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(item.path.split('#')[1]);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(item.path.split('#')[1]);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleRegularLinkClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className='fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl'
      >
        <div className='relative bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg'>
          <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-emerald-500/5 rounded-2xl pointer-events-none'></div>

          <div className='relative px-6 py-4 flex justify-between items-center'>
            <Link to='/' className='flex items-center gap-3 group'>
              <div className='relative'>
                <div className='absolute inset-0 bg-emerald-500 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500'></div>
                <img
                  src='/aocalogo-bg.png'
                  alt='AOCA Resources Limited'
                  className='h-12 w-auto relative z-10 drop-shadow-sm'
                />
              </div>
            </Link>

            <nav className='hidden lg:flex items-center gap-1'>
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.path}
                  whileHover={{ y: -2 }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    isActive(item.path.replace(/#.*/, ''))
                      ? 'text-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                  onClick={(e) => {
                    if (item.path.includes('#') || item.ref) {
                      handleHashLinkClick(e, item);
                    }
                  }}
                >
                  {isActive(item.path.replace(/#.*/, '')) && (
                    <motion.div
                      layoutId='activeNav'
                      className='absolute inset-0 bg-emerald-50 rounded-lg'
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className='relative z-10'>{item.name}</span>
                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 group-hover:w-3/4 transition-all duration-300'></div>
                </motion.a>
              ))}
            </nav>

            <div className='hidden lg:flex items-center gap-3'>
              <Link
                to='/login'
                className='px-5 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors duration-300'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='relative group px-6 py-2.5 text-sm font-medium text-white rounded-lg overflow-hidden'
              >
                <div className='absolute inset-0 bg-emerald-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500'></div>
                <span className='relative z-10'>Register</span>
              </Link>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className='lg:hidden p-2.5 rounded-lg hover:bg-gray-100/80 transition-colors'
              onClick={toggleMenu}
            >
              <Menu className='h-6 w-6 text-gray-700' />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden'
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex flex-col h-full'>
                <div className='flex justify-between items-center p-6 border-b border-gray-100'>
                  <Link
                    to='/'
                    className='flex items-center gap-2'
                    onClick={handleRegularLinkClick}
                  >
                    <img
                      src='/aocalogo-bg.png'
                      alt='AOCA Resources Limited'
                      className='h-10 w-auto'
                    />
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
                    onClick={toggleMenu}
                  >
                    <X className='h-6 w-6 text-gray-700' />
                  </motion.button>
                </div>

                <nav className='flex-1 overflow-y-auto p-6'>
                  <div className='space-y-1'>
                    {navItems.map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.path}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-300 ${
                          isActive(item.path.replace(/#.*/, ''))
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                        }`}
                        onClick={(e) => {
                          if (item.path.includes('#') || item.ref) {
                            handleHashLinkClick(e, item);
                          } else {
                            handleRegularLinkClick();
                          }
                        }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>

                  <div className='mt-8 pt-6 border-t border-gray-100 space-y-3'>
                    <Link
                      to='/login'
                      className='block px-4 py-3 text-center text-base font-medium text-gray-700 hover:text-emerald-600 rounded-xl hover:bg-gray-50 transition-all duration-300'
                      onClick={handleRegularLinkClick}
                    >
                      Login
                    </Link>
                    <Link
                      to='/register'
                      className='block px-4 py-3.5 text-center text-base font-medium text-white rounded-xl bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300'
                      onClick={handleRegularLinkClick}
                    >
                      Register
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;

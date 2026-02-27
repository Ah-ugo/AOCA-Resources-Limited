/** @format */

'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  GraduationCap,
  FileText,
  Laptop,
  BookOpen,
  Code,
  BarChart,
  Shield,
  Briefcase,
  Award,
} from 'lucide-react';

const dropdownItems = {
  pathways: [
    { name: 'Nursing Work Contract', path: '/pathways/nursing', icon: Globe },
    {
      name: 'Ausbildung Training',
      path: '/pathways/ausbildung',
      icon: GraduationCap,
    },
    { name: 'Study Pathway', path: '/pathways/study', icon: FileText },
    {
      name: 'Opportunity/Job Seeker',
      path: '/pathways/job-seeker',
      icon: Laptop,
    },
  ],
  services: [
    {
      name: 'Professional Exam Prep',
      path: '/services/exam-prep',
      icon: Award,
    },
    { name: 'Computer Programming', path: '/services/programming', icon: Code },
    { name: 'Data Analysis', path: '/services/data-analysis', icon: BarChart },
    { name: 'Cyber Security', path: '/services/cyber-security', icon: Shield },
    {
      name: 'Project Management',
      path: '/services/project-management',
      icon: Briefcase,
    },
    { name: 'German Language', path: '/services/german', icon: BookOpen },
  ],
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pathways', type: 'dropdown', id: 'pathways' },
    { name: 'Services', type: 'dropdown', id: 'services' },
    { name: 'Blog', path: '/blogs' },
    { name: 'Careers', path: '/careers' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        {/* Subtle gradient overlay for readability before scroll */}
        {!scrolled && (
          <div className='absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none -z-10 h-32' />
        )}

        <div className='container mx-auto px-4 md:px-6'>
          <div
            className={`relative flex items-center justify-between px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20'
                : 'bg-white/5 backdrop-blur-sm border border-white/10'
            }`}
          >
            <Link to='/' className='flex items-center gap-3 group'>
              <div className='relative'>
                <img
                  src='/aocalogo-bg.png'
                  alt='AOCA'
                  className='h-15 w-auto rounded-lg'
                />
              </div>
              <span
                className={`text-2xl font-serif font-bold tracking-tight transition-colors duration-500 ${
                  scrolled ? 'text-luxury-black' : 'text-white'
                }`}
              >
                AOCA<span className='text-emerald-600'>.</span>
              </span>
            </Link>

            <nav className='hidden lg:flex items-center gap-2'>
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className='relative'
                  onMouseEnter={() =>
                    item.type === 'dropdown' && setActiveDropdown(item.id)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.type === 'dropdown' ? (
                    <button
                      className={`flex items-center gap-1.5 px-5 py-2 text-[13px] uppercase tracking-[0.15em] font-medium transition-colors duration-500 ${
                        scrolled
                          ? 'text-luxury-black/70 hover:text-emerald-600'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-5 py-2 text-[13px] uppercase tracking-[0.15em] font-medium transition-colors duration-500 ${
                        isActive(item.path)
                          ? 'text-emerald-600'
                          : scrolled
                            ? 'text-luxury-black/70 hover:text-emerald-600'
                            : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  <AnimatePresence>
                    {item.type === 'dropdown' && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className='absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72'
                      >
                        <div className='bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-3'>
                          {dropdownItems[item.id].map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className='flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 group transition-all'
                            >
                              <div className='p-2 rounded-lg bg-gray-50 group-hover:bg-white transition-colors'>
                                <subItem.icon className='h-4 w-4 text-emerald-600' />
                              </div>
                              <span className='text-sm font-medium text-luxury-black/80 group-hover:text-emerald-700'>
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className='hidden lg:flex items-center gap-4 xl:gap-6'>
              <Link
                to='/login'
                className={`text-[12px] xl:text-[13px] uppercase tracking-[0.15em] font-medium transition-colors duration-500 ${
                  scrolled
                    ? 'text-luxury-black/70 hover:text-emerald-600'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Login
              </Link>
              <Link
                to='/register'
                className={`px-6 xl:px-8 py-2.5 xl:py-3 text-[12px] xl:text-[13px] uppercase tracking-[0.15em] font-medium text-white rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_rgba(5,150,105,0.2)] whitespace-nowrap ${
                  scrolled
                    ? 'bg-luxury-black hover:bg-emerald-600'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                Register
              </Link>
            </div>

            <button
              className={`lg:hidden p-2 transition-colors duration-500 ${scrolled ? 'text-luxury-black' : 'text-white'}`}
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed inset-0 z-[60] bg-white lg:hidden overflow-y-auto'
          >
            <div className='flex flex-col min-h-full p-8'>
              <div className='flex justify-between items-center mb-12'>
                <span className='text-2xl font-serif font-bold text-luxury-black'>
                  AOCA.
                </span>
                <button onClick={toggleMenu} className='p-2'>
                  <X className='h-8 w-8' />
                </button>
              </div>

              <nav className='flex flex-col gap-10'>
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.type === 'dropdown' ? (
                      <div className='space-y-6'>
                        <span className='text-xs uppercase tracking-[0.3em] text-emerald-600 font-bold'>
                          {item.name}
                        </span>
                        <div className='grid grid-cols-1 gap-6 pl-4 border-l border-emerald-100'>
                          {dropdownItems[item.id].map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className='text-xl font-medium text-luxury-black hover:text-emerald-600 transition-colors'
                              onClick={toggleMenu}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className='text-4xl font-serif font-bold text-luxury-black hover:text-emerald-600 transition-colors'
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className='mt-12 pt-8 border-t border-gray-100 flex flex-col gap-4 pb-8'>
                <Link
                  to='/login'
                  className='text-center py-5 text-lg font-bold uppercase tracking-widest text-luxury-black border border-luxury-black rounded-2xl'
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='text-center py-5 text-lg font-bold uppercase tracking-widest text-white bg-luxury-black rounded-2xl'
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;

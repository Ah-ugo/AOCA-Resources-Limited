/** @format */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  ChevronRight,
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
      name: 'Opportunity / Job Seeker',
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

// ─── DROPDOWN MENU ─────────────────────────────────────────────────────────────
// Uses a ref-based timeout so the menu stays open when cursor moves
// from the trigger button into the panel (the small gap won't dismiss it).
function NavDropdown({ item, scrolled, isActive, onClose }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const baseText = scrolled
    ? 'text-luxury-black/70 hover:text-emerald-600 hover:bg-gray-100'
    : 'text-white/80 hover:text-white hover:bg-white/10';

  return (
    <div
      className='relative flex-shrink-0'
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        className={`flex items-center gap-0.5 px-2 py-2 text-[10px] 2xl:text-xs uppercase tracking-[0.08em] 2xl:tracking-[0.12em] font-medium rounded-full transition-all duration-300 whitespace-nowrap ${baseText}`}
      >
        {item.name}
        <ChevronDown
          className={`h-2.5 w-2.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            // pt-3 creates an invisible hover bridge over the gap
            className='absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52 z-50'
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className='bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-gray-100 p-1.5 overflow-hidden'>
              {dropdownItems[item.id].map((subItem) => (
                <Link
                  key={subItem.name}
                  to={subItem.path}
                  className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-emerald-50 group transition-all'
                  onClick={() => {
                    setOpen(false);
                    onClose?.();
                  }}
                >
                  <div className='w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors shrink-0 shadow-sm'>
                    <subItem.icon className='h-3.5 w-3.5 text-emerald-600' />
                  </div>
                  <span className='text-xs font-medium text-luxury-black/80 group-hover:text-emerald-700 leading-tight'>
                    {subItem.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── CONTACT BADGE ──────────────────────────────────────────────────────────────
function ContactBadge({ isScrolled }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      className='relative'
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <motion.button
        className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className='relative'>
          <Phone className='h-3.5 w-3.5' />
          <span className='absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
        </div>
        <span className='text-xs font-medium whitespace-nowrap'>
          24/7 Support
        </span>
        <ChevronRight
          className={`h-3 w-3 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className='absolute top-full right-0 pt-3 w-64 z-50'
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className='bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden'>
              <div className='bg-gradient-to-r from-emerald-600 to-emerald-500 p-3 text-white'>
                <div className='flex items-center gap-1.5'>
                  <Sparkles className='h-3.5 w-3.5' />
                  <span className='text-xs font-medium'>Connect With Us</span>
                </div>
                <p className='text-[10px] text-white/80 mt-0.5'>
                  Replies within 5 min
                </p>
              </div>
              <div className='p-2 space-y-1'>
                <a
                  href='tel:+2348038865466'
                  className='flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-all'
                >
                  <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600'>
                    <Phone className='h-3.5 w-3.5' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-[10px] text-gray-500'>Call us</p>
                    <p className='text-xs font-medium text-luxury-black'>
                      +234 803 886 5466
                    </p>
                  </div>
                </a>
                <a
                  href='mailto:info@aocaresourcesltd.com'
                  className='flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-all'
                >
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600'>
                    <Mail className='h-3.5 w-3.5' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-[10px] text-gray-500'>Email</p>
                    <p className='text-xs font-medium text-luxury-black truncate'>
                      info@aocaresourcesltd.com
                    </p>
                  </div>
                </a>
                <a
                  href='https://wa.me/2348038865466'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-all'
                >
                  <div className='w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600'>
                    <MessageCircle className='h-3.5 w-3.5' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-[10px] text-gray-500'>WhatsApp</p>
                    <p className='text-xs font-medium text-luxury-black'>
                      Live Chat
                    </p>
                  </div>
                  <span className='text-[8px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium'>
                    Online
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── QUICK ACTIONS (2xl only) ─────────────────────────────────────────────────
function QuickActions({ isScrolled }) {
  const actions = [
    { icon: Phone, href: 'tel:+2348038865466', label: 'Call' },
    { icon: Mail, href: 'mailto:info@aocaresourcesltd.com', label: 'Email' },
    {
      icon: MessageCircle,
      href: 'https://wa.me/2348038865466',
      label: 'WhatsApp',
      target: '_blank',
    },
  ];
  return (
    <div className='hidden 2xl:flex items-center gap-1'>
      {actions.map((action) => (
        <motion.a
          key={action.label}
          href={action.href}
          target={action.target}
          rel={action.target === '_blank' ? 'noopener noreferrer' : undefined}
          className={`p-2 rounded-full transition-all duration-300 group relative ${
            isScrolled
              ? 'hover:bg-gray-100 text-gray-600'
              : 'hover:bg-white/10 text-white/80'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <action.icon className='h-4 w-4' />
          <span className='absolute -bottom-7 left-1/2 -translate-x-1/2 bg-luxury-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none'>
            {action.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

// ─── FLOATING CONTACT BUTTON (Mobile) ────────────────────────────────────────
function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const contactMethods = [
    {
      icon: Phone,
      label: 'Call Us',
      value: '+234 803 886 5466',
      action: 'tel:+2348038865466',
      color: 'bg-green-500',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@aocaresourcesltd.com',
      action: 'mailto:info@aocaresourcesltd.com',
      color: 'bg-blue-500',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with us',
      action: 'https://wa.me/2348038865466',
      color: 'bg-emerald-500',
    },
  ];

  return (
    <div className='lg:hidden fixed right-4 bottom-24 z-40'>
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className='absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl p-3 w-56 border border-emerald-100'
          >
            <div className='flex items-start gap-2'>
              <div className='relative'>
                <div className='w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center'>
                  <Sparkles className='h-4 w-4 text-emerald-600' />
                </div>
                <span className='absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white' />
              </div>
              <div className='flex-1'>
                <p className='text-xs font-medium text-luxury-black'>
                  Need help?
                </p>
                <p className='text-[10px] text-gray-500 mt-0.5'>
                  We're here 24/7
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className='text-gray-400 hover:text-gray-600'
              >
                <X className='h-3 w-3' />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className='relative'
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className='relative w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-2xl flex items-center justify-center'
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          {isOpen ? (
            <X className='h-4 w-4' />
          ) : (
            <MessageCircle className='h-4 w-4' />
          )}
          <span className='absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20' />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20 }}
              className='absolute bottom-14 right-0 w-64'
            >
              <div className='bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden'>
                <div className='bg-gradient-to-r from-emerald-600 to-emerald-500 p-3 text-white'>
                  <h3 className='text-sm font-serif font-bold'>
                    Connect With Us
                  </h3>
                </div>
                <div className='p-2 space-y-1'>
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.action}
                      target={
                        method.label === 'WhatsApp' ? '_blank' : undefined
                      }
                      rel={
                        method.label === 'WhatsApp'
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className='flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-all'
                      onClick={() => setIsOpen(false)}
                    >
                      <div
                        className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center text-white`}
                      >
                        <method.icon className='h-3.5 w-3.5' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-[10px] text-gray-500'>
                          {method.label}
                        </p>
                        <p className='text-xs font-medium text-luxury-black truncate'>
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ─── MAIN HEADER ──────────────────────────────────────────────────────────────
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pathways', type: 'dropdown', id: 'pathways' },
    { name: 'Services', type: 'dropdown', id: 'services' },
    { name: 'Blog', path: '/blogs' },
    { name: 'Careers', path: '/careers' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const baseLinkStyle = scrolled
    ? 'text-luxury-black/70 hover:text-emerald-600 hover:bg-gray-100'
    : 'text-white/80 hover:text-white hover:bg-white/10';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
      >
        {!scrolled && (
          <div className='absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none -z-10 h-32' />
        )}

        <div className='container mx-auto px-4 sm:px-5 md:px-6'>
          <div
            className={`flex items-center justify-between px-3 sm:px-4 md:px-5 py-2.5 md:py-3 rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-white/92 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20'
                : 'bg-white/5 backdrop-blur-sm border border-white/10'
            }`}
          >
            {/* Logo */}
            <Link to='/' className='flex items-center gap-2 flex-shrink-0'>
              <img
                src='/aocalogo-bg.png'
                alt='AOCA'
                className='h-9 sm:h-10 md:h-11 w-auto rounded-lg'
              />
              <span
                className={`text-lg sm:text-xl font-serif font-bold tracking-tight transition-colors duration-500 ${scrolled ? 'text-luxury-black' : 'text-white'}`}
              >
                AOCA<span className='text-emerald-600'>.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className='hidden xl:flex items-center gap-0.5 mx-2 flex-1 justify-center min-w-0'>
              {navItems.map((item) =>
                item.type === 'dropdown' ? (
                  <NavDropdown
                    key={item.name}
                    item={item}
                    scrolled={scrolled}
                    isActive={isActive}
                  />
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-2 py-2 text-[10px] 2xl:text-xs uppercase tracking-[0.08em] 2xl:tracking-[0.12em] font-medium rounded-full transition-all duration-300 whitespace-nowrap block flex-shrink-0 ${
                      isActive(item.path) ? 'text-emerald-600' : baseLinkStyle
                    }`}
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </nav>

            {/* Right: Contact + Auth */}
            <div className='flex items-center gap-1.5 md:gap-2 flex-shrink-0'>
              <div className='hidden xl:block'>
                <ContactBadge isScrolled={scrolled} />
              </div>
              <QuickActions isScrolled={scrolled} />
              <span
                className={`hidden xl:block w-px h-5 mx-0.5 ${scrolled ? 'bg-gray-200' : 'bg-white/20'}`}
              />
              <div className='hidden md:flex items-center gap-1.5'>
                <Link
                  to='/login'
                  className={`px-2.5 py-2 text-[10px] 2xl:text-xs uppercase tracking-[0.08em] font-medium rounded-full transition-all duration-300 whitespace-nowrap ${baseLinkStyle}`}
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className={`px-3 py-2 text-[10px] 2xl:text-xs uppercase tracking-[0.08em] font-medium text-white rounded-full transition-all duration-300 whitespace-nowrap ${
                    scrolled
                      ? 'bg-luxury-black hover:bg-emerald-600'
                      : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  Register
                </Link>
              </div>
              <button
                className={`xl:hidden p-2 rounded-full transition-colors ${scrolled ? 'text-luxury-black hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label='Toggle menu'
              >
                {isMenuOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <FloatingContactButton />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/50 z-[55] xl:hidden'
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className='fixed top-0 right-0 bottom-0 w-full max-w-[300px] z-[60] xl:hidden overflow-y-auto bg-white'
            >
              <div className='flex flex-col min-h-full p-6'>
                {/* Header row */}
                <div className='flex justify-between items-center mb-8'>
                  <span className='text-2xl font-serif font-bold text-luxury-black'>
                    AOCA<span className='text-emerald-600'>.</span>
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>

                {/* Quick contact icons */}
                <div className='mb-8 grid grid-cols-3 gap-2'>
                  {[
                    { href: 'tel:+2348038865466', Icon: Phone, label: 'Call' },
                    {
                      href: 'mailto:info@aocaresourcesltd.com',
                      Icon: Mail,
                      label: 'Email',
                    },
                    {
                      href: 'https://wa.me/2348038865466',
                      Icon: MessageCircle,
                      label: 'WhatsApp',
                      target: '_blank',
                    },
                  ].map(({ href, Icon, label, target }) => (
                    <a
                      key={label}
                      href={href}
                      target={target}
                      rel={
                        target === '_blank' ? 'noopener noreferrer' : undefined
                      }
                      className='flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors'
                    >
                      <Icon className='h-5 w-5 text-emerald-600' />
                      <span className='text-xs text-gray-600 font-medium'>
                        {label}
                      </span>
                    </a>
                  ))}
                </div>

                {/* Nav links */}
                <nav className='flex flex-col gap-1 flex-1'>
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.type === 'dropdown' ? (
                        <div>
                          <button
                            onClick={() =>
                              setMobileExpanded(
                                mobileExpanded === item.id ? null : item.id,
                              )
                            }
                            className='w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors'
                          >
                            <span className='text-xs uppercase tracking-[0.3em] text-emerald-600 font-bold'>
                              {item.name}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 text-emerald-500 transition-transform duration-200 ${mobileExpanded === item.id ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileExpanded === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22 }}
                                className='overflow-hidden'
                              >
                                <div className='pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3'>
                                  {dropdownItems[item.id].map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      to={subItem.path}
                                      className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors group'
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      <subItem.icon className='h-4 w-4 text-emerald-500 shrink-0' />
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
                      ) : (
                        <Link
                          to={item.path}
                          className='block px-3 py-3 text-xl font-serif font-bold text-luxury-black hover:text-emerald-600 rounded-xl hover:bg-gray-50 transition-all'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Auth buttons */}
                <div className='pt-8 flex flex-col gap-3'>
                  <Link
                    to='/login'
                    className='text-center py-4 text-sm font-bold uppercase tracking-widest text-luxury-black border-2 border-luxury-black rounded-2xl hover:bg-gray-50 transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='text-center py-4 text-sm font-bold uppercase tracking-widest text-white bg-luxury-black rounded-2xl hover:bg-emerald-600 transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register Free
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;

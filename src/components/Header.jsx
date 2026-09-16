/** @format */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
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
  Mail,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Plane,
  BriefcaseBusiness,
  Languages,
  Users,
  Phone,
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
      name: 'German Visa Travel Consultancy',
      path: '/services/german-visa',
      icon: Plane,
    },
    {
      name: 'German Language & Exam Prep (A1-B2)',
      path: '/services/german-language',
      icon: BookOpen,
    },
    {
      name: 'French Language & Exam Prep (A1-C1)',
      path: '/services/french-language',
      icon: Languages,
    },
    {
      name: 'IELTS & Exam Preparatory Classes',
      path: '/services/ielts-exam',
      icon: Award,
    },
    {
      name: 'Corporate & Staff Professional Training',
      path: '/services/corporate-training',
      icon: BriefcaseBusiness,
    },
    {
      name: 'Basic & Advanced ICT Programs',
      path: '/services/ict-programs',
      icon: Laptop,
    },
    {
      name: 'Kids & Teens Tech Programs',
      path: '/services/kids-tech',
      icon: Users,
    },
  ],
};

function NavDropdown({ item, onClose }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button className="flex items-center gap-1 px-3 py-2 text-[14.5px] font-medium text-on-surface-variant hover:text-primary transition-colors focus:outline-none whitespace-nowrap">
        {item.name}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64 z-50"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl p-2.5 flex flex-col gap-1 text-xs">
              {dropdownItems[item.id].map((subItem) => (
                <Link
                  key={subItem.name}
                  to={subItem.path}
                  className="px-3 py-2.5 rounded-lg hover:bg-surface-container-low text-on-surface hover:text-primary font-semibold flex items-center gap-2.5 group transition-all"
                  onClick={() => {
                    setOpen(false);
                    onClose?.();
                  }}
                >
                  <div className="w-7 h-7 rounded-lg bg-surface-container group-hover:bg-surface-container-lowest flex items-center justify-center transition-colors shrink-0 shadow-sm">
                    <subItem.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-on-surface-variant group-hover:text-primary leading-tight">
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

function Header({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const baseLinkStyle = scrolled
    ? 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-surface-container-lowest/95 backdrop-blur-xl shadow-lg border border-outline-variant/30'
              : 'bg-surface-container-lowest/90 backdrop-blur-lg shadow-md border border-outline-variant/20'
          }`}
        >
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md p-1.5 hover:scale-105 transition-transform duration-300">
              <img
                alt="AOCA Crest"
                className="w-full h-full object-contain rounded-lg"
                src="/aocalogo.jpeg"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-xl font-bold tracking-tight text-primary leading-none">
                  AOCA
                </span>
                <span className="font-label-caps text-[10px] font-bold tracking-widest text-secondary uppercase">
                  Resources
                </span>
              </div>
              <span className="font-label-caps text-[9px] text-primary/70 tracking-widest uppercase mt-0.5 font-semibold">
                The African Power House
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1 mx-4">
            {navItems.map((item) =>
              item.type === 'dropdown' ? (
                <NavDropdown key={item.name} item={item} onClose={onNavigate} />
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-[13px] font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/5'
                      : baseLinkStyle
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className={`hidden md:inline-flex px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                isActive('/login') ? 'text-primary bg-primary/5' : baseLinkStyle
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs sm:text-sm font-semibold shadow-md transition-all hover:shadow-lg"
            >
              <span>Get Started</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
            <button
              className="xl:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[55] xl:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[300px] z-[60] xl:hidden overflow-y-auto bg-surface-container-lowest"
            >
              <div className="flex flex-col min-h-full p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-2xl font-headline-sm font-bold text-primary">
                    AOCA
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-surface-container"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-3 py-3 text-base font-headline-sm font-bold text-primary hover:text-secondary rounded-xl hover:bg-surface-container-low transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="pt-8 flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="text-center py-4 text-sm font-bold uppercase tracking-widest text-primary border-2 border-primary rounded-2xl hover:bg-surface-container-low transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-center py-4 text-sm font-bold uppercase tracking-widest text-white bg-primary rounded-2xl hover:bg-primary-container transition-colors"
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
    </motion.header>
  );
}

export default Header;

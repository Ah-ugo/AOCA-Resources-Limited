/** @format */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Laptop,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  User,
  Video,
  X,
  BookOpen,
  Code,
  BarChart,
  Shield,
  Briefcase,
  Award,
  CheckCircle,
  Star,
  Info,
  TrendingUp,
  Users,
  Zap,
  Loader2,
  AlertCircle,
  Languages,
  Plane,
  BriefcaseBusiness,
} from 'lucide-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import { authService } from './services/auth-service';

// Public Pages
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import Careers from './pages/Careers';
import CareerDetail from './pages/CareerDetail';

// User Dashboard Pages
import Dashboard from './pages/Dashboard';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UsersList from './pages/admin/users/UsersList';
import BlogPosts from './pages/admin/blog/BlogPosts';
import CoursesList from './pages/admin/courses/CoursesList';
import LessonsList from './pages/admin/lessons/LessonsList';
import JobsList from './pages/admin/careers/JobsList';
import ApplicationsList from './pages/admin/careers/ApplicationsList';
import AdminLayout from './components/admin/AdminLayout';
import Header from './components/Header';
import { getBlogPosts } from './services/blogService';
import CategoriesList from './pages/admin/blog/CategoriesList';
import BlogForm from './pages/admin/blog/BlogForm';
import BlogsList from './pages/admin/blog/BlogsList';
import JobCategoriesList from './pages/admin/careers/CategoriesList';
import JobForm from './pages/admin/careers/JobForm';
import UserForm from './pages/admin/users/UserForm';
import UserDetail from './pages/admin/users/UserDetail';
import CourseForm from './pages/admin/courses/CourseForm';
import CourseDetail from './pages/admin/courses/CourseDetail';
import LessonForm from './pages/admin/lessons/LessonForm';
import LessonDetail from './pages/admin/lessons/LessonDetail';
import ClassesList from './pages/admin/lessons/ClassesList';
import ClassCreate from './pages/admin/lessons/ClassCreate';
import ClassPreview from './pages/admin/lessons/ClassPreview';
import ClassEdit from './pages/admin/lessons/ClassEdit';
import AdminContactSubmissions from './pages/admin/contact-forms/ContactMain';
import ApplicationDetails from './pages/admin/careers/ApplicationDetails';
import PathwayDetail from './pages/PathwayDetail';
import ServiceDetail from './pages/ServiceDetail';
import ScrollToTop from './components/ScrollToTop';
import AdmissionLandingPage from './pages/admissionad';
import InstructorDashboard from './pages/instructor/Dashboard';
import InstructorCourseCreate from './pages/instructor/CourseCreate';
import Messages from './pages/instructor/Messages';

// ─── ADMISSION POPUP COMPONENT ───────────────────────────────────────────────
function AdmissionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    program: '',
    location: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenAdmissionPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenAdmissionPopup', 'true');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch(
        'https://aoca-resources-backend.onrender.com/admission-inquiry',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        setStatus('success');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          program: '',
          location: '',
          message: '',
        });
        setTimeout(() => {
          handleClose();
          setStatus('idle');
        }, 3000);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send inquiry');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.message || 'Something went wrong. Please try again later.',
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className='fixed inset-0 bg-black/70 z-50 backdrop-blur-sm'
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto'
          >
            <div className='relative bg-white rounded-[2rem] shadow-2xl overflow-hidden'>
              {/* Close Button */}
              <button
                onClick={handleClose}
                className='absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-all'
              >
                <X className='h-5 w-5' />
              </button>

              {/* Content Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* Left Side */}
                <div className='relative h-64 md:h-auto bg-emerald-600 overflow-hidden'>
                  <img
                    src='/study-group.jpg'
                    alt='Admission Open'
                    className='absolute inset-0 w-full h-full object-cover opacity-20'
                  />
                  <div className='absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 mix-blend-multiply' />

                  <div className='relative h-full p-8 md:p-10 flex flex-col justify-between text-white'>
                    <div>
                      <img
                        src='/aoca-logo-white.png'
                        alt='AOCA Resources'
                        className='h-8 mb-6'
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                      <h2 className='text-3xl md:text-4xl font-serif font-bold mb-2'>
                        THE INTAKE
                      </h2>
                      <p className='text-lg md:text-xl font-light mb-6'>
                        Smart Students & Professionals Choose AOCA
                      </p>
                      <div className='space-y-4'>
                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                            <GraduationCap className='h-4 w-4' />
                          </div>
                          <div>
                            <p className='font-bold text-sm uppercase tracking-wider mb-1'>
                              Exam Preparation
                            </p>
                            <p className='text-sm text-white/80'>
                              IELTS · GMAT · SAT · GRE · GCSE · TOEFL
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                            <Languages className='h-4 w-4' />
                          </div>
                          <div>
                            <p className='font-bold text-sm uppercase tracking-wider mb-1'>
                              German Language
                            </p>
                            <p className='text-sm text-white/80'>
                              A1 · A2 · B1 · B2 · C1 — All Levels
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                            <Plane className='h-4 w-4' />
                          </div>
                          <div>
                            <p className='font-bold text-sm uppercase tracking-wider mb-1'>
                              Travel & Migration
                            </p>
                            <p className='text-sm text-white/80'>
                              Visa Counselling · Study Abroad · Relocation
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                            <BriefcaseBusiness className='h-4 w-4' />
                          </div>
                          <div>
                            <p className='font-bold text-sm uppercase tracking-wider mb-1'>
                              Jobs & Career
                            </p>
                            <p className='text-sm text-white/80'>
                              Placement · CV Writing · Interview Prep
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                            <Laptop className='h-4 w-4' />
                          </div>
                          <div>
                            <p className='font-bold text-sm uppercase tracking-wider mb-1'>
                              Tech & Programming
                            </p>
                            <p className='text-sm text-white/80'>
                              Python · Web Dev · Cyber Security · Data Analysis
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 space-y-3 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Phone className='h-4 w-4 shrink-0' />
                        <span>09038013105, 08038713612</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Mail className='h-4 w-4 shrink-0' />
                        <span>info@aocaresourcesltd.com</span>
                      </div>
                      <div className='flex items-start gap-2'>
                        <MapPin className='h-4 w-4 shrink-0 mt-0.5' />
                        <span>
                          No 70 Eligbolo Rd, Rumudumaya, Port Harcourt, Rivers
                          State, Nigeria.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className='p-8 md:p-10 bg-white'>
                  <h3 className='text-2xl md:text-3xl font-serif font-bold text-luxury-black mb-2'>
                    Apply Now
                  </h3>
                  <p className='text-gray-500 text-sm mb-6'>
                    Fill in your details and we'll contact you with next steps
                  </p>

                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='text-center py-8'
                    >
                      <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <CheckCircle className='h-8 w-8 text-emerald-600' />
                      </div>
                      <h4 className='text-lg font-serif font-bold text-luxury-black mb-2'>
                        Application Submitted!
                      </h4>
                      <p className='text-sm text-gray-500'>
                        Thank you for your interest. Our admissions team will
                        contact you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-4'>
                      <div className='grid grid-cols-2 gap-3'>
                        <div>
                          <label className='text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-2'>
                            First Name
                          </label>
                          <input
                            required
                            type='text'
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder='John'
                            className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm'
                          />
                        </div>
                        <div>
                          <label className='text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-2'>
                            Last Name
                          </label>
                          <input
                            required
                            type='text'
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder='Doe'
                            className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-2'>
                          Email Address
                        </label>
                        <input
                          required
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          placeholder='john@example.com'
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm'
                        />
                      </div>

                      <div>
                        <label className='text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-2'>
                          Phone Number
                        </label>
                        <input
                          required
                          type='tel'
                          name='phone'
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder='+234 ...'
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm'
                        />
                      </div>

                      {/* ── PROGRAM SELECT — grouped with optgroup ── */}
                      <div>
                        <label className='text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-2'>
                          Program of Interest
                        </label>
                        <select
                          name='program'
                          value={formData.program}
                          onChange={handleChange}
                          required
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm'
                        >
                          <option value=''>Select a program</option>

                          <optgroup label='── Exam Preparation'>
                            <option value='ielts'>IELTS Preparation</option>
                            <option value='gmat'>GMAT Preparation</option>
                            <option value='sat'>SAT Preparation</option>
                            <option value='gre'>GRE Preparation</option>
                            <option value='gcse'>GCSE Preparation</option>
                            <option value='toefl'>TOEFL Preparation</option>
                          </optgroup>

                          <optgroup label='── German Language'>
                            <option value='german-a1'>
                              German Language — A1 (Beginner)
                            </option>
                            <option value='german-a2'>
                              German Language — A2 (Elementary)
                            </option>
                            <option value='german-b1'>
                              German Language — B1 (Intermediate)
                            </option>
                            <option value='german-b2'>
                              German Language — B2 (Upper Intermediate)
                            </option>
                            <option value='german-c1'>
                              German Language — C1 (Advanced)
                            </option>
                          </optgroup>

                          <optgroup label='── Travel & Migration'>
                            <option value='travel-visa'>
                              Travel & Visa Counselling
                            </option>
                            <option value='study-abroad'>
                              Study Abroad Placement
                            </option>
                            <option value='relocation'>
                              Relocation & Settlement Support
                            </option>
                          </optgroup>

                          <optgroup label='── Jobs & Career'>
                            <option value='job-placement'>
                              Job Placement Assistance
                            </option>
                            <option value='cv-interview'>
                              CV Writing & Interview Prep
                            </option>
                            <option value='career-counselling'>
                              Career Counselling
                            </option>
                          </optgroup>

                          <optgroup label='── Programming'>
                            <option value='scratch'>Scratch Programming</option>
                            <option value='python'>Python Programming</option>
                            <option value='web'>Web Development</option>
                          </optgroup>

                          <optgroup label='── Tech Skills'>
                            <option value='cyber-security'>
                              Cyber Security
                            </option>
                            <option value='data-analysis'>Data Analysis</option>
                          </optgroup>

                          <optgroup label='── Professional'>
                            <option value='project-management'>
                              Project Management
                            </option>
                          </optgroup>
                        </select>
                      </div>

                      <div>
                        <label className='text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-2'>
                          Preferred Location
                        </label>
                        <select
                          name='location'
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm'
                        >
                          <option value=''>Select location</option>
                          <option value='lagos'>Lagos (Physical)</option>
                          <option value='port-harcourt'>
                            Port Harcourt (Physical)
                          </option>
                          <option value='online'>Online</option>
                        </select>
                      </div>

                      <div>
                        <label className='text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-2'>
                          Additional Message (Optional)
                        </label>
                        <textarea
                          name='message'
                          value={formData.message}
                          onChange={handleChange}
                          rows={2}
                          placeholder='Any specific questions?'
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none'
                        />
                      </div>

                      {status === 'error' && (
                        <div className='flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-xs'>
                          <AlertCircle className='h-4 w-4 shrink-0' />
                          {errorMessage}
                        </div>
                      )}

                      <button
                        type='submit'
                        disabled={status === 'loading'}
                        className='w-full py-4 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className='h-4 w-4 animate-spin' />
                            Submitting...
                          </>
                        ) : (
                          'Apply Now'
                        )}
                      </button>

                      <p className='text-[10px] text-gray-400 text-center mt-3'>
                        By submitting, you agree to be contacted by our
                        admissions team
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── TOOLTIP COMPONENT ───────────────────────────────────────────────────────
function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className='relative inline-flex items-center'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 bg-luxury-black text-white text-xs font-light leading-relaxed rounded-xl px-4 py-3 shadow-xl border border-white/10 pointer-events-none text-center'
          >
            {text}
            <div className='absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-luxury-black' />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

function InfoBadge({ text }) {
  return (
    <Tooltip text={text}>
      <Info className='h-3.5 w-3.5 ml-1.5 text-emerald-500 cursor-help opacity-70 hover:opacity-100 transition-opacity' />
    </Tooltip>
  );
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
function Layout({ children, hideHeaderFooter = false }) {
  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
      <AdmissionPopup />
    </>
  );
}

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────
const slides = [
  {
    image: './1.jpg',
    badge: "🇳🇬 Nigeria's #1 German Language School",
    title: 'Learn German.\nWork in Germany.',
    description:
      'We take you from zero German to B2 certified — and straight into a nursing role, Ausbildung, or tech job in Germany. Over 530 of our students are already there.',
    primary: { label: 'See Our Programs', to: '/services/german' },
    secondary: { label: 'Enroll Today — Free Consultation', to: '/register' },
  },
  {
    image: './2.jpg',
    badge: '💼 Nursing · Ausbildung · Job Seeker Visa',
    title: 'Your German\nCareer Awaits.',
    description:
      'Hospitals, tech companies, and top firms in Germany are actively recruiting Nigerians right now. We train you, connect you, and handle your visa — end to end.',
    primary: { label: 'Explore Pathways to Germany', to: '/pathways/nursing' },
    secondary: { label: 'Talk to a Counsellor', to: '/contact' },
  },
  {
    image: './3.jpg',
    badge: '⚡ Fast-Track: A1 to B2 in 6 Months',
    title: 'Speak German\nFluently. Fast.',
    description:
      'No prior knowledge needed. Our intensive Goethe-certified program gets you exam-ready in record time — without cutting corners on quality.',
    primary: { label: 'Start A1 for Free', to: '/register' },
    secondary: { label: 'View All German Levels', to: '/services/german' },
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section
      className='relative h-screen w-full overflow-hidden bg-black'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          className='absolute inset-0'
        >
          <div className='absolute inset-0 bg-black/55 z-10' />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10' />
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className='h-full w-full object-cover'
          />
        </motion.div>
      </AnimatePresence>

      <div className='absolute inset-0 z-20 flex items-center pt-20 md:pt-24'>
        <div className='container mx-auto px-5 sm:px-8 lg:px-12'>
          <div className='max-w-4xl'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.75, delay: 0.35 }}
              >
                <span className='inline-block bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs uppercase tracking-[0.3em] font-bold px-4 py-2 rounded-full mb-5 sm:mb-7'>
                  {slides[current].badge}
                </span>
                <h1 className='text-[clamp(2.4rem,7vw,5.5rem)] font-serif font-bold text-white mb-5 sm:mb-7 leading-[1.08] tracking-tight'>
                  {slides[current].title.split('\n').map((line, i) => (
                    <span key={i} className='block'>
                      {line}
                    </span>
                  ))}
                </h1>
                <p className='text-base sm:text-lg md:text-xl text-white/70 max-w-xl mb-8 sm:mb-10 font-light leading-relaxed'>
                  {slides[current].description}
                </p>
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                  <Link
                    to={slides[current].primary.to}
                    className='inline-flex items-center justify-center gap-2 px-7 py-4 sm:px-9 sm:py-5 bg-emerald-600 text-white rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all duration-300 hover:scale-[1.03] shadow-[0_8px_25px_rgba(16,185,129,0.35)]'
                  >
                    {slides[current].primary.label}{' '}
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                  <Link
                    to={slides[current].secondary.to}
                    className='inline-flex items-center justify-center px-7 py-4 sm:px-9 sm:py-5 bg-white/10 backdrop-blur-md text-white border border-white/25 rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white/20 transition-all duration-300'
                  >
                    {slides[current].secondary.label}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className='absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex items-center justify-between px-5 sm:px-10 lg:px-14'>
        <div className='flex items-center gap-2'>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${current === i ? 'w-10 bg-emerald-500' : 'w-4 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
        <div className='flex gap-2'>
          <button
            onClick={prev}
            aria-label='Previous slide'
            className='p-3 sm:p-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all'
          >
            <ChevronLeft className='h-4 w-4 sm:h-5 sm:w-5' />
          </button>
          <button
            onClick={next}
            aria-label='Next slide'
            className='p-3 sm:p-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all'
          >
            <ChevronRight className='h-4 w-4 sm:h-5 sm:w-5' />
          </button>
        </div>
      </div>

      {/* Trust bar */}
      <div className='absolute bottom-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-sm border-t border-white/10 hidden md:block'>
        <div className='container mx-auto px-8 py-3 flex items-center justify-center gap-10 text-white/50 text-xs uppercase tracking-widest font-bold'>
          <span>✓ Goethe-Certified Training</span>
          <span className='w-px h-4 bg-white/20' />
          <span>✓ 5,000+ Students Trained</span>
          <span className='w-px h-4 bg-white/20' />
          <span>✓ 98% Exam Pass Rate</span>
          <span className='w-px h-4 bg-white/20' />
          <span>✓ Visa Support Included</span>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    {
      label: 'Students & Professionals Trained',
      value: '5,000+',
      tooltip: 'Across Lagos, Port Harcourt, and online — since 2009',
      icon: Users,
    },
    {
      label: 'Goethe Exam Pass Rate',
      value: '98%',
      tooltip:
        'Verified pass rate for students who completed our full prep program',
      icon: Award,
    },
    {
      label: 'Now in Germany',
      value: '530+',
      tooltip:
        'Working nurses, Ausbildung trainees, IT professionals, and university students',
      icon: TrendingUp,
    },
    {
      label: 'Years of Excellence',
      value: '15+',
      tooltip:
        "Nigeria's most experienced German language & Germany placement consultancy",
      icon: Star,
    },
  ];

  return (
    <section className='py-20 sm:py-24 bg-luxury-black text-white'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12'>
          {stats.map((stat, i) => (
            <div key={i} className='text-center group'>
              <div className='flex justify-center mb-3'>
                <div className='w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center'>
                  <stat.icon className='h-5 w-5 text-emerald-400' />
                </div>
              </div>
              <h3 className='text-[clamp(2rem,6vw,4.5rem)] font-serif font-bold mb-2 text-emerald-500 leading-none'>
                {stat.value}
              </h3>
              <p className='text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/45 font-medium inline-flex items-center gap-1 justify-center'>
                {stat.label}
                <InfoBadge text={stat.tooltip} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GERMAN LANGUAGE PROGRAMS ─────────────────────────────────────────────────
function GermanProgramsSection() {
  const levels = [
    {
      level: 'A1',
      title: 'A1 — Absolute Beginner',
      description:
        'Never spoken German before? This is your starting point. We build your foundation from scratch — pronunciation, basic grammar, and everyday conversation. No prior knowledge needed.',
      outcome:
        "You'll hold simple everyday conversations and read basic German texts.",
      duration: '6–8 weeks',
      best: "Perfect if you're just starting out",
      color: 'bg-blue-500',
      tooltipInfo:
        'The A1 level is the official starting point on the European language scale (CEFR). No experience needed.',
    },
    {
      level: 'A2',
      title: 'A2 — Elementary',
      description:
        'Build on your A1 base. Expand vocabulary, sharpen grammar, and gain real confidence communicating in daily situations — shopping, directions, work introductions.',
      outcome:
        "You'll handle real-world conversations and understand common written German.",
      duration: '6–8 weeks',
      best: 'Already know some basics',
      color: 'bg-cyan-500',
      tooltipInfo:
        'A2 is recommended before applying for a tourist or family reunion visa to Germany.',
    },
    {
      level: 'B1',
      title: 'B1 — Intermediate',
      description:
        'This is where it gets serious. B1 is the minimum for Ausbildung (vocational training) and most entry-level jobs in Germany. Our Goethe-focused training gets you exam-ready.',
      outcome:
        'Ausbildung-ready. Entry-level employment-ready. Germany application-ready.',
      duration: '8–10 weeks',
      best: 'Required for Ausbildung',
      color: 'bg-emerald-500',
      tooltipInfo:
        "Ausbildung is Germany's paid vocational training program. You earn a salary while you train — typically €700–€1,200/month.",
    },
    {
      level: 'B2',
      title: 'B2 — Upper Intermediate',
      description:
        'The key level for most career pathways in Germany. Required for nursing, IT roles, and skilled immigration. A B2 certificate opens doors that no other qualification can.',
      outcome:
        'Qualify for nursing, IT, engineering roles — and the skilled worker visa.',
      duration: '8–12 weeks',
      best: 'Required for nursing & most jobs',
      color: 'bg-amber-500',
      tooltipInfo:
        'The German Nursing Recognition process requires B2. Most skilled worker visas also require B2 language proficiency.',
    },
    {
      level: 'C1',
      title: 'C1 — Advanced',
      description:
        'Near-native fluency. Required for university admissions, permanent residency applications, and specialist career tracks in Germany. This is the highest level we offer.',
      outcome: 'University admission-ready. Permanent residency-eligible.',
      duration: '10–14 weeks',
      best: 'Required for German universities',
      color: 'bg-rose-500',
      tooltipInfo:
        'German public universities are tuition-free — even for Nigerians — but most require a C1 certificate for admission.',
    },
  ];

  const [expanded, setExpanded] = useState(null);

  return (
    <section className='py-24 sm:py-32 bg-luxury-cream'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 sm:mb-20 gap-8'>
          <div className='max-w-2xl'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
              Our Core Offering
            </span>
            <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold text-luxury-black leading-tight'>
              German Language Classes
              <br />
              A1 to C1 — Pick Your Level
            </h2>
          </div>
          <div className='max-w-md'>
            <p className='text-base sm:text-xl text-gray-500 font-light leading-relaxed'>
              Not sure which level to start at? We'll assess you for free. Every
              level is structured around the official Goethe Institute exam.
            </p>
            <Link
              to='/contact'
              className='inline-flex items-center gap-2 mt-5 text-emerald-600 font-bold text-sm hover:underline'
            >
              Book a Free Level Assessment <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </div>

        <div className='space-y-4'>
          {levels.map((lvl, i) => {
            const isOpen = expanded === i;
            const colorMap = {
              'bg-blue-500': 'bg-blue-500',
              'bg-cyan-500': 'bg-cyan-500',
              'bg-emerald-500': 'bg-emerald-500',
              'bg-amber-500': 'bg-amber-500',
              'bg-rose-500': 'bg-rose-500',
            };
            return (
              <motion.div
                key={i}
                layout
                className='group bg-white rounded-2xl sm:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300'
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className='w-full p-6 sm:p-8 flex items-center gap-5 sm:gap-8 text-left'
                  aria-expanded={isOpen}
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${colorMap[lvl.color]} flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <span className='text-white font-serif font-bold text-lg sm:text-xl'>
                      {lvl.level}
                    </span>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mb-1'>
                      <h3 className='text-lg sm:text-2xl font-serif font-bold text-luxury-black'>
                        {lvl.title}
                      </h3>
                      <InfoBadge text={lvl.tooltipInfo} />
                    </div>
                    <div className='flex flex-wrap gap-3 mt-2'>
                      <span className='inline-flex items-center gap-1.5 text-[11px] sm:text-xs bg-gray-100 text-gray-500 font-semibold uppercase tracking-wide px-3 py-1 rounded-full'>
                        <Clock className='h-3 w-3' /> {lvl.duration}
                      </span>
                      <span className='inline-flex items-center gap-1.5 text-[11px] sm:text-xs bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-wide px-3 py-1 rounded-full'>
                        <CheckCircle className='h-3 w-3' /> {lvl.best}
                      </span>
                    </div>
                  </div>
                  <div className='shrink-0'>
                    <div
                      className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-emerald-600 border-emerald-600 rotate-90' : 'group-hover:border-emerald-400'}`}
                    >
                      <ChevronRight
                        className={`h-4 w-4 transition-colors ${isOpen ? 'text-white' : 'text-gray-400'}`}
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <div className='px-6 sm:px-8 pb-7 sm:pb-9 border-t border-gray-100 pt-5 sm:pt-6 ml-0 sm:ml-[88px]'>
                        <p className='text-gray-500 font-light leading-relaxed mb-5 text-sm sm:text-base'>
                          {lvl.description}
                        </p>
                        <div className='flex items-start gap-2 text-emerald-700 font-semibold text-sm mb-6'>
                          <CheckCircle className='h-4 w-4 mt-0.5 shrink-0' />
                          <span>{lvl.outcome}</span>
                        </div>
                        <Link
                          to='/services/german'
                          className='inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all'
                        >
                          Enroll in {lvl.level}{' '}
                          <ArrowRight className='h-4 w-4' />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className='mt-12 sm:mt-16 text-center'>
          <Link
            to='/register'
            className='inline-flex items-center gap-2 px-10 sm:px-12 py-4 sm:py-5 bg-emerald-600 text-white rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(16,185,129,0.3)]'
          >
            Enroll Now — Spots Filling Fast <ArrowRight className='h-4 w-4' />
          </Link>
          <p className='text-xs text-gray-400 mt-3'>
            Free consultation included. No payment needed to register.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── URGENCY BANNER ───────────────────────────────────────────────────────────
function UrgencyBanner() {
  return (
    <section className='py-16 sm:py-20 bg-emerald-600 text-white relative overflow-hidden'>
      <div className='absolute inset-0 opacity-10 pointer-events-none'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2' />
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2' />
      </div>
      <div className='container mx-auto px-5 sm:px-8 relative z-10 text-center'>
        <span className='inline-block bg-white/20 text-white text-xs uppercase tracking-[0.3em] font-bold px-5 py-2 rounded-full mb-5 sm:mb-6'>
          ⚡ New Cohort Starting Soon — Limited Seats Available
        </span>
        <h2 className='text-[clamp(1.8rem,5vw,3.8rem)] font-serif font-bold mb-5 sm:mb-6 leading-tight'>
          Lock In Your Discounted Rate Today
        </h2>
        <p className='text-base sm:text-xl text-white/80 font-light max-w-2xl mx-auto mb-8 sm:mb-10'>
          Prices go up once the cohort fills. Register now to secure your seat
          at the current rate — even if your class hasn't started yet.
        </p>
        <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
          <Link
            to='/register'
            className='px-10 sm:px-12 py-4 sm:py-5 bg-white text-emerald-700 rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-luxury-black hover:text-white transition-all duration-300 shadow-xl'
          >
            Register Now — It's Free to Start
          </Link>
          <Link
            to='/contact'
            className='px-8 py-4 sm:py-5 bg-transparent text-white border border-white/40 rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all'
          >
            Speak to a Counsellor First
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── GERMANY PATHWAYS ─────────────────────────────────────────────────────────
function GermanyPathwaysSection() {
  const pathways = [
    {
      id: 'nursing',
      icon: '🏥',
      title: 'Work as a Nurse in Germany',
      description:
        'Germany is actively recruiting Nigerian nurses right now. We partner with German hospitals to place our B2-certified graduates directly into nursing contracts — with accommodation and relocation support included.',
      requirement: 'B2 German Certificate Required',
      tooltipInfo:
        'Average nurse salary in Germany: €2,500–€3,800/month. Relocation assistance often provided by the hospital.',
      timeline: 'Job offer within 3–6 months of B2 certification',
      color: 'bg-rose-50 border-rose-100',
      accent: 'text-rose-600',
    },
    {
      id: 'ausbildung',
      icon: '🎓',
      title: 'Ausbildung — Get Paid to Train',
      description:
        "Germany's Ausbildung is one of the best-kept secrets for Nigerians. You train inside a real German company, earn a salary (€700–€1,200/month), and graduate with a recognised German qualification.",
      requirement: 'B1 German Certificate Required',
      tooltipInfo:
        'Ausbildung typically lasts 2–3 years. After completion, most trainees are offered permanent employment.',
      timeline: 'Place within 4–8 months of B1 certification',
      color: 'bg-blue-50 border-blue-100',
      accent: 'text-blue-600',
    },
    {
      id: 'job-seeker',
      icon: '💼',
      title: 'Job Seeker Visa',
      description:
        "Already skilled in IT, healthcare, or engineering? Germany's Job Seeker Visa lets you travel there and find work on the ground. We prepare your language skills, CV, and documentation — everything you need.",
      requirement: 'B1–B2 German Certificate Required',
      tooltipInfo:
        'The Job Seeker Visa gives you 6 months in Germany to find employment. No job offer needed to apply.',
      timeline: 'Visa approval in 3–6 weeks',
      color: 'bg-amber-50 border-amber-100',
      accent: 'text-amber-600',
    },
    {
      id: 'university',
      icon: '📚',
      title: 'University Admission — Tuition Free',
      description:
        'German public universities charge zero tuition — even for international students. We get you to C1 German, guide your application, and help with your student visa. A world-class degree, almost for free.',
      requirement: 'B2–C1 German Certificate Required',
      tooltipInfo:
        'German public universities charge only a semester fee of ~€300. No tuition fees for international students.',
      timeline: 'Admission within one semester',
      color: 'bg-emerald-50 border-emerald-100',
      accent: 'text-emerald-600',
    },
  ];

  return (
    <section className='py-24 sm:py-32 bg-white'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-14 sm:mb-20'>
          <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
            What Comes After Your Certificate
          </span>
          <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold text-luxury-black mb-5 sm:mb-6 leading-tight'>
            Your German Unlocks These Doors
          </h2>
          <p className='text-base sm:text-xl text-gray-500 font-light leading-relaxed'>
            Learning German at AOCA isn't just language class — it's the first
            step to a real life in Germany. Here's exactly what happens next.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
          {pathways.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className={`rounded-2xl sm:rounded-[2.5rem] border p-8 sm:p-10 ${p.color} transition-all duration-300 flex flex-col`}
            >
              <div className='text-4xl sm:text-5xl mb-5'>{p.icon}</div>
              <h3 className='text-xl sm:text-2xl font-serif font-bold text-luxury-black mb-3 sm:mb-4'>
                {p.title}
              </h3>
              <p className='text-gray-600 font-light leading-relaxed mb-5 text-sm sm:text-base flex-1'>
                {p.description}
              </p>

              <div className='space-y-2 mb-6 sm:mb-8'>
                <div
                  className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest ${p.accent}`}
                >
                  <CheckCircle className='h-4 w-4 shrink-0' />
                  <span>{p.requirement}</span>
                  <InfoBadge text={p.tooltipInfo} />
                </div>
                <div className='flex items-center gap-2 text-xs text-gray-500 font-medium'>
                  <Clock className='h-3 w-3 shrink-0' />
                  <span>{p.timeline}</span>
                </div>
              </div>

              <Link
                to={`/pathways/${p.id}`}
                className='inline-flex items-center gap-2 text-luxury-black font-bold uppercase tracking-widest text-xs hover:text-emerald-600 transition-colors'
              >
                See Full Pathway Details <ArrowRight className='h-4 w-4' />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Level',
      desc: 'Not sure where to start? We assess you for free. Then you enroll in the right level — A1 through C1 — and begin immediately.',
      detail: 'Free placement test. No commitment required.',
    },
    {
      number: '02',
      title: 'Pass the Goethe Exam',
      desc: 'We prepare you specifically for the official Goethe Institute certification. This is the certificate German employers, embassies, and universities actually recognise.',
      detail: '98% of our students pass on the first attempt.',
    },
    {
      number: '03',
      title: 'Choose Your Pathway',
      desc: 'Nursing, Ausbildung, Job Seeker Visa, or University — our counsellors match your certificate to the best Germany route for your profile and goals.',
      detail: 'One-on-one career counselling included.',
    },
    {
      number: '04',
      title: 'We Handle Everything Else',
      desc: 'Employer matching, document preparation, embassy coaching, visa applications, and relocation support. We stay with you until you land in Germany.',
      detail: 'Full end-to-end placement support.',
    },
  ];

  return (
    <section className='py-24 sm:py-32 bg-luxury-black text-white'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-14 sm:mb-20'>
          <span className='text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
            The Journey
          </span>
          <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold leading-tight'>
            Exactly How We Get You to Germany
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10'>
          {steps.map((step, i) => (
            <div key={i} className='relative group'>
              <div className='text-7xl sm:text-8xl font-serif font-bold text-emerald-500/8 absolute -top-8 -left-2 group-hover:text-emerald-500/15 transition-colors select-none pointer-events-none'>
                {step.number}
              </div>
              <div className='relative z-10 pt-6 sm:pt-8'>
                <span className='text-emerald-500 font-bold text-xs uppercase tracking-widest mb-2 block'>
                  {step.number}
                </span>
                <h3 className='text-xl sm:text-2xl font-serif font-bold text-white mb-3 sm:mb-4'>
                  {step.title}
                </h3>
                <p className='text-white/50 font-light leading-relaxed text-sm sm:text-base mb-3'>
                  {step.desc}
                </p>
                <p className='text-emerald-500 text-xs font-bold uppercase tracking-wide'>
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-14 sm:mt-16 text-center'>
          <Link
            to='/register'
            className='inline-flex items-center gap-2 px-10 sm:px-12 py-4 sm:py-5 bg-emerald-600 text-white rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all hover:scale-105 shadow-[0_10px_30px_rgba(16,185,129,0.25)]'
          >
            Begin Your Journey Today <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── WHY AOCA ─────────────────────────────────────────────────────────────────
function WhyAOCASection() {
  const features = [
    {
      title: 'Goethe-Certified Training',
      desc: 'Every program is structured around the official Goethe Institute exam — the certification that German embassies, hospitals, and universities actually accept.',
    },
    {
      title: 'Fast-Track Option Available',
      desc: 'Need B2 urgently for a nursing contract or visa deadline? Our intensive track gets you there in 6 months — without cutting corners on what you actually learn.',
    },
    {
      title: "We Don't Stop at Language",
      desc: 'Unlike ordinary language schools, we bridge your training into placement — visa processing, employer connections, document support, and relocation guidance.',
    },
    {
      title: "Instructors Who've Been There",
      desc: "Our teachers have studied or worked in Germany. They don't just teach grammar — they prepare you for real life in a German workplace or university.",
    },
  ];

  return (
    <section className='py-24 sm:py-32 bg-luxury-cream'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-20 items-center'>
          <div className='relative order-2 lg:order-1'>
            <div className='aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl'>
              <img
                src='./2.jpg'
                alt='AOCA German Training'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-10 w-52 sm:w-64 bg-emerald-600 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 text-white hidden sm:flex flex-col justify-center shadow-2xl'>
              <span className='text-4xl sm:text-5xl font-serif font-bold mb-2'>
                98%
              </span>
              <p className='text-xs uppercase tracking-widest font-bold opacity-80 leading-relaxed'>
                Goethe Exam Pass Rate
              </p>
            </div>
          </div>
          <div className='order-1 lg:order-2'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
              Why Train With AOCA
            </span>
            <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold text-luxury-black mb-6 sm:mb-8 leading-tight'>
              We're More Than a Language School
            </h2>
            <p className='text-base sm:text-xl text-gray-500 font-light leading-relaxed mb-10 sm:mb-12'>
              Over 5,000 students and professionals trained. 530+ now living and
              working in Germany. We've built the most complete
              Nigeria-to-Germany pathway in the country — and we improve it
              every year.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8'>
              {features.map((f, i) => (
                <div key={i} className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='h-4 w-4 text-emerald-500 shrink-0' />
                    <h4 className='text-base sm:text-xl font-serif font-bold text-luxury-black'>
                      {f.title}
                    </h4>
                  </div>
                  <p className='text-gray-500 font-light leading-relaxed text-sm pl-6'>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to='/about'
              className='inline-flex items-center gap-3 mt-10 sm:mt-12 text-luxury-black font-bold uppercase tracking-widest text-xs sm:text-sm hover:text-emerald-600 transition-colors'
            >
              Read Our Full Story <ArrowRight className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY GERMANY ──────────────────────────────────────────────────────────────
function WhyGermanySection() {
  const cards = [
    {
      title: 'Tuition-Free University',
      desc: 'Public universities in Germany charge zero tuition — even for Nigerians. A world-class education for the cost of living expenses only.',
      tooltip:
        'Semester fees average just €250–€400. No tuition fees for international students at public universities.',
    },
    {
      title: 'Nursing Shortage — Your Advantage',
      desc: 'Germany has a critical shortage of 80,000+ nurses. B2-certified Nigerian nurses are being actively recruited right now.',
      tooltip:
        'Nurses in Germany earn €2,500–€3,800/month. Most hospitals provide relocation and accommodation support.',
    },
    {
      title: 'Ausbildung Pays You Monthly',
      desc: 'German vocational training pays you €700–€1,200 per month while you learn. No loans. No tuition. You train and earn simultaneously.',
      tooltip:
        'After Ausbildung, most trainees receive a permanent job offer from the same company.',
    },
    {
      title: '3–5x Higher Salaries',
      desc: 'Average salaries in Germany are 3 to 5 times higher than equivalent roles in Nigeria — across healthcare, IT, trades, and engineering.',
      tooltip:
        'Minimum wage in Germany is €12.41/hour. IT professionals typically earn €4,000–€7,000/month.',
    },
    {
      title: 'Clear Path to Permanent Residency',
      desc: 'Germany offers one of the most structured paths to permanent residency in Europe — achievable after just 4–5 years of legal work.',
      tooltip:
        'The EU Blue Card can lead to permanent residency in just 2 years for high earners.',
    },
    {
      title: 'Bring Your Family',
      desc: "Most German work visas allow family reunification. Bring your spouse and children to Germany once you're settled.",
      tooltip:
        'Spouses of skilled workers can also get work permits immediately upon arrival.',
    },
    {
      title: 'Booming Economy',
      desc: "Europe's largest economy, with consistent demand for skilled workers in healthcare, IT, engineering, and the trades.",
      tooltip:
        'Germany has the 4th largest economy in the world and faces a shortage of 400,000+ skilled workers.',
    },
    {
      title: 'Safety & Stability',
      desc: 'Consistently rated among the safest, most politically stable countries in the world. An excellent environment for raising a family.',
      tooltip:
        'Germany ranks in the top 20 globally on the Global Peace Index and has universal healthcare.',
    },
  ];

  const row1 = cards.slice(0, 4);
  const row2 = cards.slice(4, 8);

  return (
    <section className='py-24 sm:py-32 bg-white relative overflow-hidden'>
      <div className='container mx-auto px-5 sm:px-8 relative z-10 mb-14 sm:mb-20'>
        <div className='max-w-3xl'>
          <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
            Why Germany?
          </span>
          <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold text-luxury-black mb-6 sm:mb-8 leading-tight'>
            The Opportunity Is Real.
            <br />
            The Door Is German Language.
          </h2>
          <p className='text-base sm:text-xl text-gray-500 font-light leading-relaxed'>
            Germany isn't just a visa destination — it's a career, a family
            future, and a quality of life upgrade. Every reason below is backed
            by real numbers.
          </p>
        </div>
      </div>

      {/* Mobile: grid */}
      <div className='md:hidden container mx-auto px-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          {cards.map((r, i) => (
            <div
              key={i}
              className='p-6 rounded-2xl bg-luxury-cream border border-gray-100'
            >
              <div className='flex items-start gap-2 mb-2'>
                <h4 className='text-base font-serif font-bold text-emerald-600'>
                  {r.title}
                </h4>
                <InfoBadge text={r.tooltip} />
              </div>
              <p className='text-sm text-gray-500 font-light leading-relaxed'>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: infinite marquee */}
      <div className='hidden md:block relative overflow-hidden'>
        <div className='flex overflow-hidden'>
          <motion.div
            animate={{ x: [0, '-50%'] }}
            transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
            className='flex gap-6 shrink-0'
          >
            {[...row1, ...row1].map((r, i) => (
              <div
                key={i}
                className='w-[360px] p-9 rounded-[2.5rem] bg-luxury-cream border border-gray-100 shrink-0'
              >
                <div className='flex items-start gap-2 mb-3'>
                  <h4 className='text-xl font-serif font-bold text-emerald-600'>
                    {r.title}
                  </h4>
                  <InfoBadge text={r.tooltip} />
                </div>
                <p className='text-sm text-gray-500 font-light leading-relaxed'>
                  {r.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
        <div className='flex overflow-hidden mt-6'>
          <motion.div
            animate={{ x: ['-50%', 0] }}
            transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
            className='flex gap-6 shrink-0'
          >
            {[...row2, ...row2].map((r, i) => (
              <div
                key={i}
                className='w-[360px] p-9 rounded-[2.5rem] bg-luxury-cream border border-gray-100 shrink-0'
              >
                <div className='flex items-start gap-2 mb-3'>
                  <h4 className='text-xl font-serif font-bold text-emerald-600'>
                    {r.title}
                  </h4>
                  <InfoBadge text={r.tooltip} />
                </div>
                <p className='text-sm text-gray-500 font-light leading-relaxed'>
                  {r.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className='container mx-auto px-5 sm:px-8 mt-16 sm:mt-24'>
        <div className='flex justify-center'>
          <Link
            to='/services/german'
            className='group flex items-center gap-4 text-luxury-black hover:text-emerald-600 transition-colors'
          >
            <span className='text-xs sm:text-sm uppercase tracking-[0.3em] font-bold'>
              Start Your German Journey
            </span>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-emerald-500 transition-colors'>
              <ArrowRight className='h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform' />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const services = [
    {
      id: 'exam-prep',
      title: 'Goethe Exam Prep',
      description:
        'Targeted prep for A1–C1 Goethe exams. Past questions, mock tests, and expert coaching. Pass on your first attempt.',
      icon: Award,
      color: 'bg-blue-500',
      tooltip:
        'Goethe certificates are required for German visas, nursing recognition, and university admission.',
    },
    {
      id: 'german',
      title: 'German Language (A1–C1)',
      description:
        'Our flagship program. Full-curriculum German courses taught by certified instructors with real Germany experience.',
      icon: BookOpen,
      color: 'bg-emerald-500',
      tooltip:
        'We offer both standard pace and intensive fast-track options. Classes run online and in-person.',
    },
    {
      id: 'document-translation',
      title: 'Document Translation',
      description:
        'Certified German ↔ English translation for certificates, contracts, medical records, and all official documents.',
      icon: FileText,
      color: 'bg-purple-500',
      tooltip:
        'Our translations are accepted by German embassies and government offices.',
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      description:
        "Turn raw data into business insights. Ideal for professionals targeting Germany's data-driven industries.",
      icon: BarChart,
      color: 'bg-orange-500',
      tooltip:
        'Data analysts earn €3,500–€6,000/month in Germany. Pair with B2 German for strong job prospects.',
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description:
        'Advanced cybersecurity training aligned with global standards. Pair with German B1+ for IT roles in Germany.',
      icon: Shield,
      color: 'bg-rose-500',
      tooltip:
        'Cybersecurity professionals are in high demand across Germany — especially in Frankfurt and Munich.',
    },
    {
      id: 'project-management',
      title: 'Project Management',
      description:
        'PMP-aligned curriculum for professionals who want to lead teams and projects in international environments.',
      icon: Briefcase,
      color: 'bg-cyan-500',
      tooltip:
        'PMP certification is globally recognised. Combine with German language for management roles in Germany.',
    },
  ];

  return (
    <section className='py-24 sm:py-32 bg-white'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 sm:mb-20 gap-8'>
          <div className='max-w-2xl'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
              All Services
            </span>
            <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold text-luxury-black leading-tight'>
              Everything You Need
              <br />
              to Work in Germany
            </h2>
          </div>
          <p className='text-base sm:text-xl text-gray-500 max-w-md font-light leading-relaxed'>
            From your first German lesson to your first salary in Germany — AOCA
            covers the full journey.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className='group relative bg-white p-7 sm:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden'
            >
              <div
                className={`absolute top-0 right-0 w-28 h-28 ${service.color} opacity-[0.04] rounded-bl-full transition-all duration-500 group-hover:scale-150`}
              />
              <div className='relative z-10'>
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 shadow-md`}
                >
                  <service.icon className='h-6 w-6 sm:h-7 sm:w-7 text-white' />
                </div>
                <div className='flex items-center gap-2 mb-3 sm:mb-4'>
                  <h3 className='text-xl sm:text-2xl font-serif font-bold text-luxury-black'>
                    {service.title}
                  </h3>
                  <InfoBadge text={service.tooltip} />
                </div>
                <p className='text-gray-500 font-light mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base'>
                  {service.description}
                </p>
                <Link
                  to={`/services/${service.id}`}
                  className='inline-flex items-center gap-2 text-luxury-black font-bold uppercase tracking-widest text-xs group-hover:text-emerald-600 transition-colors'
                >
                  Learn More{' '}
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS CAROUSEL ────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Chioma A.',
      role: 'Registered Nurse — Now in Berlin',
      text: "AOCA took me from zero German to B2 in under 8 months. I passed the Goethe exam, got placed in a Berlin hospital, and my entire work contract was handled by their team. The process was seamless — I didn't have to figure anything out alone.",
      image:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
      rating: 5,
    },
    {
      name: 'Emmanuel O.',
      role: 'IT Professional — Now in Munich',
      text: "I thought learning German would take years. AOCA's intensive B1–B2 program changed that completely. Six months later I was on a plane to Munich with a tech job already lined up. I'm earning 4x what I made in Lagos.",
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      rating: 5,
    },
    {
      name: 'Blessing M.',
      role: 'Ausbildung Trainee — Frankfurt',
      text: "I didn't even know what Ausbildung was before I came to AOCA. They explained the whole process, helped me reach B1, and connected me with a German company. I'm now earning €900/month while I train in Frankfurt. Life-changing.",
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: 5,
    },
    {
      name: 'Tunde B.',
      role: 'University Student — Hamburg',
      text: "I'm paying almost nothing for a world-class education at the University of Hamburg. AOCA got me to C1 German, handled my application, and walked me through the visa. I started university 8 months after I started German.",
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 5,
    },
  ];

  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % total), 5500);
    return () => clearInterval(t);
  }, [total]);

  return (
    <section className='py-24 sm:py-32 bg-luxury-cream'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-14 sm:mb-16'>
          <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
            Real Students. Real Results.
          </span>
          <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold text-luxury-black leading-tight'>
            They Learned German.
            <br />
            Now They Live in Germany.
          </h2>
        </div>

        {/* Desktop: grid */}
        <div className='hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className='p-7 sm:p-9 rounded-2xl sm:rounded-[2.5rem] bg-white border border-gray-100 relative flex flex-col'
            >
              <div className='flex gap-1 mb-4'>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className='h-4 w-4 fill-emerald-500 text-emerald-500'
                  />
                ))}
              </div>
              <p className='text-sm sm:text-base text-gray-600 font-light leading-relaxed mb-7 flex-1 italic'>
                "{t.text}"
              </p>
              <div className='flex items-center gap-3'>
                <img
                  src={t.image}
                  alt={t.name}
                  className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md'
                />
                <div>
                  <h4 className='font-serif font-bold text-luxury-black text-sm'>
                    {t.name}
                  </h4>
                  <p className='text-[10px] uppercase tracking-widest text-emerald-600 font-bold leading-tight'>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className='md:hidden relative overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45 }}
              className='p-7 rounded-2xl bg-white border border-gray-100'
            >
              <div className='flex gap-1 mb-4'>
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, j) => (
                    <Star
                      key={j}
                      className='h-4 w-4 fill-emerald-500 text-emerald-500'
                    />
                  ),
                )}
              </div>
              <p className='text-sm text-gray-600 font-light leading-relaxed mb-6 italic'>
                "{testimonials[current].text}"
              </p>
              <div className='flex items-center gap-3'>
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md'
                />
                <div>
                  <h4 className='font-serif font-bold text-luxury-black text-sm'>
                    {testimonials[current].name}
                  </h4>
                  <p className='text-[10px] uppercase tracking-widest text-emerald-600 font-bold'>
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className='flex justify-center gap-2 mt-5'>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? 'w-8 bg-emerald-500' : 'w-3 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GLOBAL REACH ─────────────────────────────────────────────────────────────
function GlobalReach() {
  return (
    <section className='py-24 sm:py-32 bg-luxury-cream'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='flex flex-col lg:flex-row items-center gap-14 sm:gap-20'>
          <div className='flex-1 w-full'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
              Our Locations
            </span>
            <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold text-luxury-black mb-6 sm:mb-8 leading-tight'>
              Based in Nigeria.
              <br />
              Connected to Germany.
            </h2>
            <p className='text-base sm:text-xl text-gray-500 font-light leading-relaxed mb-10 sm:mb-12'>
              Training centers in Lagos and Port Harcourt, with direct employer
              and hospital partnerships across Germany. We bridge the gap from
              where you are to where you want to be.
            </p>
            <div className='space-y-4'>
              {[
                {
                  city: 'Lagos, Nigeria',
                  role: 'Headquarters — German Language Training & Placement',
                  flag: '🇳🇬',
                },
                {
                  city: 'Port Harcourt, Nigeria',
                  role: 'Regional German Classes & Consultancy Hub',
                  flag: '🇳🇬',
                },
                {
                  city: 'Berlin, Germany',
                  role: 'Employer Partnerships & Visa Support Office',
                  flag: '🇩🇪',
                },
              ].map((loc, i) => (
                <div
                  key={i}
                  className='flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm'
                >
                  <span className='text-2xl shrink-0'>{loc.flag}</span>
                  <div>
                    <h4 className='font-serif font-bold text-luxury-black text-sm sm:text-base'>
                      {loc.city}
                    </h4>
                    <p className='text-xs sm:text-sm text-gray-400 font-light'>
                      {loc.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex-1 w-full relative'>
            <div className='aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-luxury-black flex items-center justify-center'>
              <img
                src='https://res.cloudinary.com/dejeplzpv/image/upload/v1744418391/m5tgp0rr8ihaqinxyoxd.jpg'
                alt='Nigeria to Germany map'
                className='w-full h-full object-cover opacity-60'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='relative w-full h-full'>
                  <div className='absolute top-1/3 left-1/4'>
                    <div className='relative'>
                      <div className='w-4 h-4 bg-emerald-500 rounded-full animate-ping absolute' />
                      <div className='w-4 h-4 bg-emerald-500 rounded-full relative' />
                    </div>
                  </div>
                  <div className='absolute top-1/4 right-1/3'>
                    <div className='relative'>
                      <div className='w-4 h-4 bg-emerald-300 rounded-full animate-ping absolute' />
                      <div className='w-4 h-4 bg-emerald-300 rounded-full relative' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    {
      q: 'Do I need any German knowledge to enroll?',
      a: "Not at all. Our A1 program is for complete beginners — even if you've never heard German before. We assess you first, then you start at the right level.",
    },
    {
      q: 'How long does it take to reach B2 from zero?',
      a: "With our standard program: 12–18 months. With our intensive fast-track option, dedicated students have reached B2 in as little as 6–8 months. We'll recommend the right pace for your goals.",
    },
    {
      q: 'What exactly is the Goethe certificate and why do I need it?',
      a: "The Goethe Institut is Germany's official language certification body. Their certificates are the standard accepted by German embassies, hospitals, companies, and universities. You need a Goethe certificate for virtually every German visa and employment pathway.",
    },
    {
      q: 'Do nurses need B2 or can they go with B1?',
      a: "Nursing recognition in Germany specifically requires B2. For Ausbildung (vocational training), B1 is sufficient. We'll always advise you on exactly what's required for your specific pathway.",
    },
    {
      q: 'Do you help with the visa application?',
      a: "Yes — completely. Once you've obtained your certificate and been matched with an employer or program, our team handles your full visa process: document preparation, embassy appointment coaching, and follow-up.",
    },
    {
      q: 'Can I study online or do I have to attend in person?',
      a: 'Both options are available. Our online classes are live and interactive — not pre-recorded videos. In-person classes run in Lagos and Port Harcourt. Many students combine both for flexibility.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id='faq' className='py-24 sm:py-32 bg-luxury-cream'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-20'>
          <div>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm block mb-4'>
              Common Questions
            </span>
            <h2 className='text-[clamp(2rem,5vw,3.8rem)] font-serif font-bold text-luxury-black mb-6 sm:mb-8 leading-tight'>
              Got Questions? We've Got Answers.
            </h2>
            <p className='text-base sm:text-xl text-gray-500 font-light leading-relaxed mb-10 sm:mb-12'>
              These are the questions we get most often from Nigerians who are
              serious about getting to Germany. Can't find yours here? Talk to
              us directly.
            </p>
            <Link
              to='/contact'
              className='inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-luxury-black text-white rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-emerald-600 transition-all'
            >
              Ask a Counsellor <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='space-y-4'>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className='w-full p-6 sm:p-7 text-left flex items-start gap-4 justify-between'
                >
                  <h4 className='text-sm sm:text-base font-serif font-bold text-luxury-black pr-4'>
                    {faq.q}
                  </h4>
                  <div
                    className={`w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center shrink-0 transition-all duration-200 ${openIndex === i ? 'bg-emerald-600 border-emerald-600 rotate-90' : ''}`}
                  >
                    <ChevronRight
                      className={`h-3.5 w-3.5 transition-colors ${openIndex === i ? 'text-white' : 'text-gray-400'}`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className='overflow-hidden'
                    >
                      <p className='px-6 sm:px-7 pb-6 text-sm text-gray-500 font-light leading-relaxed'>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className='py-24 sm:py-32 bg-white'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='bg-luxury-black rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 md:p-24 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none' />
          <div className='relative z-10 max-w-2xl'>
            <h2 className='text-[clamp(1.8rem,4vw,3.5rem)] font-serif font-bold text-white mb-5 sm:mb-8 leading-tight'>
              Get Germany-Ready Updates
            </h2>
            <p className='text-base sm:text-xl text-white/60 font-light mb-10 sm:mb-12'>
              New cohort dates, Goethe tips, job offers from Germany, and visa
              news — straight to your inbox. No spam. Unsubscribe anytime.
            </p>
            {submitted ? (
              <div className='flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg'>
                <CheckCircle className='h-6 w-6' />
                You're in! Watch your inbox for Germany updates.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='flex flex-col sm:flex-row gap-3 sm:gap-4'
              >
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Your email address'
                  required
                  className='flex-1 bg-white/10 border border-white/20 rounded-full px-6 sm:px-8 py-4 sm:py-5 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500 transition-colors text-sm sm:text-base'
                />
                <button
                  type='submit'
                  className='px-8 sm:px-10 py-4 sm:py-5 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-emerald-500 transition-all whitespace-nowrap'
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className='bg-luxury-black text-white pt-20 sm:pt-32 pb-10 sm:pb-12'>
      <div className='container mx-auto px-5 sm:px-8'>
        <div className='mb-14 sm:mb-16 pb-14 sm:pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-10'>
          <div className='max-w-md'>
            <Link
              to='/'
              className='text-3xl sm:text-4xl font-serif font-bold mb-5 sm:mb-6 block'
            >
              AOCA<span className='text-emerald-500'>.</span>
            </Link>
            <p className='text-base sm:text-lg text-white/50 font-light leading-relaxed mb-5 sm:mb-6'>
              Nigeria's premier German language school and Germany placement
              consultancy. From A1 to your first day in Germany — we handle it
              all.
            </p>
            <p className='text-xs text-emerald-500 font-bold uppercase tracking-widest'>
              German Language · Ausbildung · Nursing · Job Seeker Visa · Travel
              & Migration
            </p>
          </div>
          <div className='flex gap-3 sm:gap-4'>
            {[
              { Icon: Instagram, href: '#' },
              { Icon: Twitter, href: '#' },
              { Icon: Facebook, href: '#' },
              { Icon: Linkedin, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className='p-3 sm:p-4 rounded-full border border-white/10 hover:bg-emerald-600 hover:border-emerald-600 transition-all'
              >
                <Icon className='h-4 w-4 sm:h-5 sm:w-5' />
              </a>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-16 sm:mb-20'>
          <div>
            <h4 className='text-xs uppercase tracking-[0.3em] font-bold mb-5 sm:mb-6 text-emerald-500'>
              German Programs
            </h4>
            <ul className='space-y-3'>
              {[
                { label: 'A1 — Absolute Beginner', to: '/services/german' },
                { label: 'A2 — Elementary', to: '/services/german' },
                { label: 'B1 — Intermediate', to: '/services/german' },
                { label: 'B2 — Upper Intermediate', to: '/services/german' },
                { label: 'C1 — Advanced', to: '/services/german' },
                { label: 'Goethe Exam Prep', to: '/services/exam-prep' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className='text-white/50 hover:text-emerald-400 transition-colors text-xs sm:text-sm font-light block leading-relaxed'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-xs uppercase tracking-[0.3em] font-bold mb-5 sm:mb-6 text-emerald-500'>
              Germany Pathways
            </h4>
            <ul className='space-y-3'>
              {[
                { label: 'Nursing in Germany', to: '/pathways/nursing' },
                {
                  label: 'Ausbildung / Vocational',
                  to: '/pathways/ausbildung',
                },
                { label: 'Job Seeker Visa', to: '/pathways/job-seeker' },
                { label: 'University Admission', to: '/pathways/university' },
                {
                  label: 'Skilled Immigration',
                  to: '/pathways/skilled-immigration',
                },
                { label: 'FSJ & BFD Volunteer', to: '/pathways/fsj-bfd' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className='text-white/50 hover:text-emerald-400 transition-colors text-xs sm:text-sm font-light block leading-relaxed'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-xs uppercase tracking-[0.3em] font-bold mb-5 sm:mb-6 text-emerald-500'>
              Other Services
            </h4>
            <ul className='space-y-3'>
              {[
                {
                  label: 'Travel & Visa Counselling',
                  to: '/services/travel-visa',
                },
                { label: 'Job Placement', to: '/services/job-placement' },
                { label: 'CV & Interview Prep', to: '/services/cv-interview' },
                { label: 'Data Analysis', to: '/services/data-analysis' },
                { label: 'Cyber Security', to: '/services/cyber-security' },
                {
                  label: 'Project Management',
                  to: '/services/project-management',
                },
                {
                  label: 'Document Translation',
                  to: '/services/document-translation',
                },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className='text-white/50 hover:text-emerald-400 transition-colors text-xs sm:text-sm font-light block leading-relaxed'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-xs uppercase tracking-[0.3em] font-bold mb-5 sm:mb-6 text-emerald-500'>
              Contact Us
            </h4>
            <ul className='space-y-4'>
              <li className='flex items-start gap-3 text-white/50 text-xs sm:text-sm font-light'>
                <MapPin className='h-4 w-4 text-emerald-500 shrink-0 mt-0.5' />
                <span>
                  8 Bayo Adetuna Street off Sangotedo, Lagos, Nigeria.
                </span>
              </li>
              <li className='flex items-start gap-3 text-white/50 text-xs sm:text-sm font-light'>
                <MapPin className='h-4 w-4 text-emerald-500 shrink-0 mt-0.5' />
                <span>
                  No 70 Eligbolo Rd, Rumudumaya, Port Harcourt, Rivers State,
                  Nigeria.
                </span>
              </li>
              <li className='flex items-center gap-3 text-white/50 text-xs sm:text-sm font-light'>
                <Phone className='h-4 w-4 text-emerald-500 shrink-0' />
                <a
                  href='tel:+2349038013105'
                  className='hover:text-emerald-400 transition-colors'
                >
                  +234 903 801 3105
                </a>
              </li>
              <li className='flex items-center gap-3 text-white/50 text-xs sm:text-sm font-light'>
                <MessageSquare className='h-4 w-4 text-emerald-500 shrink-0' />
                <a
                  href='https://wa.me/2348038865466'
                  className='hover:text-emerald-400 transition-colors'
                >
                  +234 803 886 5466
                </a>
              </li>
              <li className='flex items-center gap-3 text-white/50 text-xs sm:text-sm font-light'>
                <Mail className='h-4 w-4 text-emerald-500 shrink-0' />
                <a
                  href='mailto:info@aocaresourcesltd.com'
                  className='hover:text-emerald-400 transition-colors'
                >
                  info@aocaresourcesltd.com
                </a>
              </li>
            </ul>
            <div className='mt-7'>
              <Link
                to='/contact'
                className='inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-emerald-600 text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all'
              >
                Get in Touch <ArrowRight className='h-3 w-3' />
              </Link>
            </div>
          </div>
        </div>

        <div className='pt-7 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-5 text-white/30 text-xs font-light'>
          <p>
            © {new Date().getFullYear()} AOCA Resources Limited. All Rights
            Reserved.
          </p>
          <div className='flex flex-wrap justify-center gap-5 sm:gap-8'>
            <a href='#' className='hover:text-white transition-colors'>
              Privacy Policy
            </a>
            <a href='#' className='hover:text-white transition-colors'>
              Terms of Service
            </a>
            <Link to='/faq' className='hover:text-white transition-colors'>
              FAQ
            </Link>
            <Link to='/blogs' className='hover:text-white transition-colors'>
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <main className='overflow-hidden'>
      <HeroCarousel />
      <StatsSection />
      <GermanProgramsSection />
      <UrgencyBanner />
      <GermanyPathwaysSection />
      <ProcessSection />
      <WhyAOCASection />
      <WhyGermanySection />
      <ServicesSection />
      <TestimonialsSection />
      <GlobalReach />
      <FAQSection />

      {/* Closing CTA */}
      <section className='relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden'>
        <div className='absolute inset-0 bg-black/55 z-10' />
        <img
          src='https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000'
          alt='Career in Germany'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 z-20 flex items-center justify-center text-center px-5'>
          <div className='container mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='max-w-4xl mx-auto'
            >
              <h2 className='text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-white mb-6 sm:mb-8 leading-tight'>
                Your German Journey Starts With One Step
              </h2>
              <p className='text-base sm:text-lg md:text-xl text-white/80 font-light mb-8 sm:mb-12 max-w-2xl mx-auto'>
                Hundreds of Nigerians are already building lives in Germany —
                because they made this one decision. Your turn starts today.
              </p>
              <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
                <Link
                  to='/register'
                  className='px-9 sm:px-12 py-4 sm:py-5 bg-emerald-600 text-white rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all duration-300 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-105'
                >
                  Start Learning German Today
                </Link>
                <Link
                  to='/contact'
                  className='px-9 sm:px-12 py-4 sm:py-5 bg-white/10 backdrop-blur border border-white/25 text-white rounded-full text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white/20 transition-all'
                >
                  Talk to a Counsellor First
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path='/login'
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path='/register'
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path='/faq'
            element={
              <Layout>
                <FAQ />
              </Layout>
            }
          />
          <Route
            path='/about'
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path='/pathways/:id'
            element={
              <Layout>
                <PathwayDetail />
              </Layout>
            }
          />
          <Route
            path='/services/:id'
            element={
              <Layout>
                <ServiceDetail />
              </Layout>
            }
          />
          <Route
            path='/contact'
            element={
              <Layout>
                <ContactUs />
              </Layout>
            }
          />
          <Route
            path='/careers'
            element={
              <Layout>
                <Careers />
              </Layout>
            }
          />
          <Route
            path='/admissionAd'
            element={
              <Layout>
                <AdmissionLandingPage />
              </Layout>
            }
          />
          <Route
            path='/careers/:id'
            element={
              <Layout>
                <CareerDetail />
              </Layout>
            }
          />
          <Route
            path='/blogs'
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path='/blog/:slug'
            element={
              <Layout>
                <BlogPost />
              </Layout>
            }
          />
          <Route
            path='/dashboard/*'
            element={
              <PrivateRoute>
                <Layout hideHeaderFooter={true}>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path='/messages'
            element={
              <PrivateRoute>
                <Layout>
                  <Messages />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path='/admin'
            element={<Navigate to='/admin/dashboard' replace />}
          />
          <Route
            path='/admin/*'
            element={
              <AdminRoute>
                <Layout hideHeaderFooter={true}>
                  <AdminLayout>
                    <Routes>
                      <Route path='dashboard' element={<AdminDashboard />} />
                      <Route path='users' element={<UsersList />} />
                      <Route path='users/new' element={<UserForm />} />
                      <Route path='users/:id' element={<UserDetail />} />
                      <Route path='users/:id/edit' element={<UserForm />} />
                      <Route path='careers/jobs' element={<JobsList />} />
                      <Route path='careers/jobs/new' element={<JobForm />} />
                      <Route
                        path='careers/jobs/:id/edit'
                        element={<JobForm />}
                      />
                      <Route
                        path='careers/applications'
                        element={<ApplicationsList />}
                      />
                      <Route
                        path='careers/applications/:id'
                        element={<ApplicationDetails />}
                      />
                      <Route
                        path='careers/categories'
                        element={<JobCategoriesList />}
                      />
                      <Route path='blogs' element={<BlogsList />} />
                      <Route path='blogs/new' element={<BlogForm />} />
                      <Route path='blogs/:id/edit' element={<BlogForm />} />
                      <Route
                        path='blogs/categories'
                        element={<CategoriesList />}
                      />
                      <Route path='courses' element={<CoursesList />} />
                      <Route path='courses/new' element={<CourseForm />} />
                      <Route path='courses/:id' element={<CourseDetail />} />
                      <Route path='courses/:id/edit' element={<CourseForm />} />
                      <Route path='classes' element={<ClassesList />} />
                      <Route path='lessons' element={<ClassesList />} />
                      <Route path='classes/new' element={<ClassCreate />} />
                      <Route path='classes/:id' element={<ClassPreview />} />
                      <Route path='classes/:id/edit' element={<ClassEdit />} />
                      <Route
                        path='courses/:courseId/lessons'
                        element={<LessonsList />}
                      />
                      <Route
                        path='courses/:courseId/lessons/new'
                        element={<LessonForm />}
                      />
                      <Route
                        path='courses/:courseId/lessons/:lessonId'
                        element={<LessonDetail />}
                      />
                      <Route
                        path='courses/:courseId/lessons/:lessonId/edit'
                        element={<LessonForm />}
                      />
                      <Route
                        path='messages'
                        element={<AdminContactSubmissions />}
                      />
                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  </AdminLayout>
                </Layout>
              </AdminRoute>
            }
          />
          <Route
            path='/instructor/*'
            element={
              <InstructorRoute>
                <Layout hideHeaderFooter={true}>
                  {/* You can create a specific InstructorLayout later */}
                  <div className='min-h-screen bg-gray-50'>
                    <Routes>
                      <Route
                        path='dashboard'
                        element={<InstructorDashboard />}
                      />
                      <Route
                        path='courses/create'
                        element={<InstructorCourseCreate />}
                      />
                      <Route path='messages' element={<Messages />} />
                    </Routes>
                  </div>
                </Layout>
              </InstructorRoute>
            }
          />
          <Route
            path='/not-found'
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
          <Route
            path='*'
            element={
              <Layout>
                <Navigate to='/not-found' replace />
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  return children;
}

function InstructorRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  const isInstructor =
    currentUser?.role === 'instructor' || currentUser?.role === 'admin';
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  if (!isInstructor) return <Navigate to='/dashboard' replace />;
  return children;
}

function AdminRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  if (!isAdmin) return <Navigate to='/dashboard' replace />;
  return children;
}

export default App;

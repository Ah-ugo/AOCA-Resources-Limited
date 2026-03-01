/** @format */

'use client';

import { useEffect, useRef, useState } from 'react';
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
} from 'lucide-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  ScrollRestoration,
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

function Layout({ children, hideHeaderFooter = false }) {
  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  const shouldHideHeaderFooter = (pathname) => {
    return pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
  };

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
      {/* <ScrollRestoration /> */}
    </Router>
  );
}

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) return <Navigate to='/login' replace />;
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

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────
const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000',
    subtitle: "Nigeria's Premier German Language School",
    title: 'Learn German.\nWork in Germany.',
    description:
      'We take you from zero German to B2 certified — and straight into a career, nursing role, Ausbildung, or university seat in Germany.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000',
    subtitle: 'Nursing · Ausbildung · Job Seeker Visa',
    title: 'Your German\nCareer.',
    description:
      'Hospitals, tech companies, and vocational firms in Germany need skilled Nigerians. We train you, connect you, and process your visa end-to-end.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000',
    subtitle: 'From A1 to B2 — Fast Track Available',
    title: 'Speak German\nFluently.',
    description:
      'Our intensive programs prepare you for the Goethe examination and real-life communication in Germany — in the shortest time possible.',
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className='relative h-screen w-full overflow-hidden bg-black'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className='absolute inset-0'
        >
          <div className='absolute inset-0 bg-black/50 z-10' />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10' />
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className='h-full w-full object-cover'
          />
        </motion.div>
      </AnimatePresence>

      <div className='absolute inset-0 z-20 flex items-center pt-20 md:pt-24'>
        <div className='container mx-auto px-6 lg:px-12'>
          <div className='max-w-5xl'>
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className='inline-block text-emerald-400 text-xs md:text-sm uppercase tracking-[0.4em] font-bold mb-6'>
                {slides[current].subtitle}
              </span>
              <h1 className='text-fluid-h1 font-serif font-bold text-white mb-8 tracking-tighter'>
                {slides[current].title.split('\n').map((line, i) => (
                  <span key={i} className='block'>
                    {line}
                  </span>
                ))}
              </h1>
              <p className='text-lg md:text-xl text-white/70 max-w-xl mb-12 font-light leading-relaxed'>
                {slides[current].description}
              </p>
              <div className='flex flex-wrap gap-4 md:gap-6'>
                <Link
                  to='/services/german'
                  className='px-8 md:px-10 py-4 md:py-5 bg-emerald-600 text-white rounded-full text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(16,185,129,0.3)]'
                >
                  View German Programs
                </Link>
                <Link
                  to='/register'
                  className='px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/20 transition-all duration-300'
                >
                  Enroll Today
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-8 md:bottom-12 right-6 md:right-12 z-30 flex items-center gap-4 md:gap-6'>
        <div className='hidden md:flex items-center gap-2'>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 transition-all duration-500 rounded-full ${current === i ? 'w-12 bg-emerald-500' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() =>
              setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
            }
            className='p-3 md:p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all'
          >
            <ChevronLeft className='h-5 w-5 md:h-6 md:w-6' />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className='p-3 md:p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all'
          >
            <ChevronRight className='h-5 w-5 md:h-6 md:w-6' />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { label: 'Students Trained', value: '5K+' },
    { label: 'Goethe Exam Success Rate', value: '98%' },
    { label: 'Now Working in Germany', value: '530+' },
    { label: 'Years of Excellence', value: '15+' },
  ];

  return (
    <section className='py-24 bg-luxury-black text-white'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-12'>
          {stats.map((stat, i) => (
            <div key={i} className='text-center'>
              <h3 className='text-5xl md:text-7xl font-serif font-bold mb-4 text-emerald-500'>
                {stat.value}
              </h3>
              <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-medium'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GERMAN LANGUAGE PROGRAMS (CORE SECTION) ──────────────────────────────────
function GermanProgramsSection() {
  const levels = [
    {
      level: 'A1',
      title: 'A1 German — Absolute Beginner',
      description:
        'Never spoken German before? Never used anything beyond Duolingo? This is your starting point. We build your foundation from scratch with structured lessons, pronunciation, and basic conversational German.',
      outcome:
        "You'll hold simple everyday conversations and read basic German texts.",
    },
    {
      level: 'A2',
      title: 'A2 German — Elementary',
      description:
        'Build on your A1 foundation. At this level you expand your vocabulary, sharpen your grammar, and gain the confidence to communicate more naturally in daily life situations.',
      outcome:
        "You'll handle real-world conversations and understand common written German.",
    },
    {
      level: 'B1',
      title: 'B1 German — Intermediate',
      description:
        'This is where it gets serious. B1 is the minimum requirement for Ausbildung (vocational training) and many entry-level jobs in Germany. Our Goethe-focused training prepares you to pass with distinction.',
      outcome: 'Ausbildung-ready. Entry-level job-ready. Germany-ready.',
    },
    {
      level: 'B2',
      title: 'B2 German — Upper Intermediate',
      description:
        'If you want to work as a nurse, IT professional, or skilled worker in Germany, B2 is the key. With a B2 certificate, you unlock highly sought-after roles in German hospitals, companies, and institutions.',
      outcome:
        'Qualify for nursing roles, IT positions, and skilled immigration pathways.',
    },
    {
      level: 'C1',
      title: 'C1 German — Advanced',
      description:
        'Required for university admissions, specialist career tracks, and permanent residency applications in Germany. This advanced level gives you near-native fluency and academic-grade German proficiency.',
      outcome: 'University admission-ready. Permanent residency-eligible.',
    },
  ];

  const levelColors = {
    A1: 'bg-blue-500',
    A2: 'bg-cyan-500',
    B1: 'bg-emerald-500',
    B2: 'bg-amber-500',
    C1: 'bg-rose-500',
  };

  return (
    <section className='py-32 bg-luxury-cream'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col lg:flex-row justify-between items-end mb-20 gap-8'>
          <div className='max-w-2xl'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Our Core Offering
            </span>
            <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black'>
              German Language
              <br />
              Classes — A1 to C1
            </h2>
          </div>
          <div className='max-w-md'>
            <p className='text-xl text-gray-500 font-light leading-relaxed'>
              We bring German to you in the most dynamic, results-driven form —
              on a fast track that fits your career goals, your timeline, and
              your budget.
            </p>
          </div>
        </div>

        <div className='space-y-6'>
          {levels.map((lvl, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 6 }}
              className='group bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start shadow-sm hover:shadow-lg transition-all duration-300'
            >
              <div
                className={`w-16 h-16 rounded-2xl ${levelColors[lvl.level]} flex items-center justify-center shrink-0 shadow-lg`}
              >
                <span className='text-white font-serif font-bold text-xl'>
                  {lvl.level}
                </span>
              </div>
              <div className='flex-1'>
                <h3 className='text-2xl font-serif font-bold text-luxury-black mb-3'>
                  {lvl.title}
                </h3>
                <p className='text-gray-500 font-light leading-relaxed mb-4'>
                  {lvl.description}
                </p>
                <div className='flex items-start gap-2 text-emerald-700 font-semibold text-sm'>
                  <CheckCircle className='h-4 w-4 mt-0.5 shrink-0' />
                  <span>{lvl.outcome}</span>
                </div>
              </div>
              <Link
                to={`/services/german`}
                className='shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-luxury-black font-bold uppercase tracking-widest text-xs group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300'
              >
                Program Details <ArrowRight className='h-4 w-4' />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className='mt-16 text-center'>
          <Link
            to='/register'
            className='px-12 py-5 bg-emerald-600 text-white rounded-full text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(16,185,129,0.3)]'
          >
            Enroll in a German Class Today
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── URGENCY / CTA BANNER ─────────────────────────────────────────────────────
function UrgencyBanner() {
  return (
    <section className='py-20 bg-emerald-600 text-white relative overflow-hidden'>
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2' />
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2' />
      </div>
      <div className='container mx-auto px-6 relative z-10 text-center'>
        <span className='inline-block bg-white/20 text-white text-xs uppercase tracking-[0.3em] font-bold px-6 py-2 rounded-full mb-6'>
          ⚡ New Session Starting Now — Limited Spots
        </span>
        <h2 className='text-4xl md:text-6xl font-serif font-bold mb-6'>
          Register Now Before Price Increases
        </h2>
        <p className='text-xl text-white/80 font-light max-w-2xl mx-auto mb-10'>
          Our new German cohort is filling up fast. Once seats are booked,
          enrollment closes immediately. Secure your discounted rate today.
        </p>
        <Link
          to='/register'
          className='inline-block px-12 py-5 bg-white text-emerald-700 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-luxury-black hover:text-white transition-all duration-300 shadow-xl'
        >
          Claim Your Discount Now
        </Link>
      </div>
    </section>
  );
}

// ─── GERMANY PATHWAYS (What you can do with German) ───────────────────────────
function GermanyPathwaysSection() {
  const pathways = [
    {
      id: 'nursing',
      icon: '🏥',
      title: 'Work as a Nurse in Germany',
      description:
        'We collaborate with German hospitals and recruitment agencies to place registered nurses directly into employment after obtaining a B2 certificate. Your German + our network = your German hospital contract.',
      requirement: 'B2 German Certificate Required',
      color: 'bg-rose-50 border-rose-100',
      accent: 'text-rose-600',
    },
    {
      id: 'ausbildung',
      icon: '🎓',
      title: 'Ausbildung / Vocational Training',
      description:
        "Germany's unique dual system lets you work inside German companies as an apprentice while being trained in your trade or profession. Earn while you learn — fully paid by your German employer.",
      requirement: 'B1 German Certificate Required',
      color: 'bg-blue-50 border-blue-100',
      accent: 'text-blue-600',
    },
    {
      id: 'job-seeker',
      icon: '💼',
      title: 'Job Seeker Visa',
      description:
        'Already skilled in IT, engineering, healthcare, or another field? The German Job Seeker Visa lets you travel to Germany and find employment on the ground. We prepare your language, documents, and strategy.',
      requirement: 'B1–B2 German Certificate Required',
      color: 'bg-amber-50 border-amber-100',
      accent: 'text-amber-600',
    },
    {
      id: 'university',
      icon: '📚',
      title: 'University Admission in Germany',
      description:
        "Germany's public universities offer world-class, tuition-free education. We guide you through application requirements, help you reach C1 German proficiency, and manage your full admission process.",
      requirement: 'B2–C1 German Certificate Required',
      color: 'bg-emerald-50 border-emerald-100',
      accent: 'text-emerald-600',
    },
  ];

  return (
    <section className='py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center max-w-3xl mx-auto mb-20'>
          <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
            After Your German Certification
          </span>
          <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black mb-6'>
            Your German Opens These Doors
          </h2>
          <p className='text-xl text-gray-500 font-light leading-relaxed'>
            Learning German at AOCA isn't just language training — it's your
            entry point into a life-changing career in Europe. Here's what comes
            next.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {pathways.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`rounded-[2.5rem] border p-10 ${p.color} transition-all duration-300`}
            >
              <div className='text-5xl mb-6'>{p.icon}</div>
              <h3 className='text-2xl font-serif font-bold text-luxury-black mb-4'>
                {p.title}
              </h3>
              <p className='text-gray-600 font-light leading-relaxed mb-6'>
                {p.description}
              </p>
              <div
                className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${p.accent} mb-8`}
              >
                <CheckCircle className='h-4 w-4' /> {p.requirement}
              </div>
              <div>
                <Link
                  to={`/pathways/${p.id}`}
                  className='inline-flex items-center gap-2 text-luxury-black font-bold uppercase tracking-widest text-xs hover:text-emerald-600 transition-colors'
                >
                  Explore This Pathway <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY AOCA (replaces generic WhyChooseUs) ─────────────────────────────────
function WhyAOCASection() {
  const features = [
    {
      title: 'Goethe-Certified Training',
      desc: "Every program is structured around the official Goethe Institute examination. We don't just teach German — we prepare you to pass.",
    },
    {
      title: 'Fast-Track Intensive Option',
      desc: 'Need to reach B2 urgently for a nursing contract or visa deadline? Our intensive track gets you there faster, without cutting corners.',
    },
    {
      title: 'From Language to Germany',
      desc: 'Unlike schools that stop at language teaching, we bridge training with placement — visa processing, employer connections, and relocation support.',
    },
    {
      title: 'Real-Life German Experience',
      desc: "Our instructors have studied or lived in Germany. They don't just teach grammar — they prepare you for life and work on German soil.",
    },
  ];

  return (
    <section className='py-32 bg-luxury-cream'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
          <div className='relative'>
            <div className='aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl'>
              <img
                src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000'
                alt='AOCA German Training'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-600 rounded-[2rem] p-8 text-white hidden md:flex flex-col justify-center'>
              <span className='text-5xl font-serif font-bold mb-2'>98%</span>
              <p className='text-sm uppercase tracking-widest font-bold opacity-80'>
                Goethe Exam Pass Rate Among Our Students
              </p>
            </div>
          </div>
          <div>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Why Train With AOCA
            </span>
            <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black mb-8'>
              More Than a Language School
            </h2>
            <p className='text-xl text-gray-500 font-light leading-relaxed mb-12'>
              We've trained and equipped over 5,000 students across Nigeria. Our
              approach combines rigorous language instruction with practical
              pathways to employment and relocation in Germany.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {features.map((f, i) => (
                <div key={i} className='space-y-3'>
                  <h4 className='text-xl font-serif font-bold text-luxury-black'>
                    {f.title}
                  </h4>
                  <p className='text-gray-500 font-light leading-relaxed'>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to='/about'
              className='inline-flex items-center gap-3 mt-12 text-luxury-black font-bold uppercase tracking-widest text-sm hover:text-emerald-600 transition-colors'
            >
              Our Full Story <ArrowRight className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IN-DEMAND SERVICES ────────────────────────────────────────────────────────
function ServicesSection() {
  const services = [
    {
      id: 'exam-prep',
      title: 'Goethe Exam Preparation',
      description:
        'Targeted prep for A1 through C1 Goethe exams. Practice tests, past questions, and expert coaching.',
      icon: Award,
      color: 'bg-blue-500',
    },
    {
      id: 'german',
      title: 'German Language (A1–C1)',
      description:
        'Our flagship program. Full-curriculum German courses from beginner to advanced, delivered by certified instructors.',
      icon: BookOpen,
      color: 'bg-emerald-500',
    },
    {
      id: 'document-translation',
      title: 'Document Translation',
      description:
        'Professional German ↔ English translation for certificates, contracts, medical records, and official documents.',
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      description:
        "Transform raw data into strategic business insights. Ideal for professionals targeting Germany's data-driven industries.",
      icon: BarChart,
      color: 'bg-orange-500',
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description:
        'Advanced protection strategies for the digital age. Pair with German B1+ for IT roles in Germany.',
      icon: Shield,
      color: 'bg-rose-500',
    },
    {
      id: 'project-management',
      title: 'Project Management',
      description:
        'Lead complex initiatives with precision. PMP-aligned curriculum built for international professionals.',
      icon: Briefcase,
      color: 'bg-cyan-500',
    },
  ];

  return (
    <section className='py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col lg:flex-row justify-between items-end mb-20 gap-8'>
          <div className='max-w-2xl'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              In-Demand Services
            </span>
            <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black'>
              Everything You Need to
              <br />
              Work & Thrive in Germany
            </h2>
          </div>
          <p className='text-lg md:text-xl text-gray-500 max-w-md font-light leading-relaxed'>
            From your first German lesson to your first day in a German
            workplace — AOCA covers the full journey.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className='group relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden'
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 ${service.color} opacity-[0.03] rounded-bl-full transition-all duration-500 group-hover:scale-150`}
              />
              <div className='relative z-10'>
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8 shadow-lg`}
                >
                  <service.icon className='h-7 w-7 md:h-8 md:w-8 text-white' />
                </div>
                <h3 className='text-2xl font-serif font-bold text-luxury-black mb-4'>
                  {service.title}
                </h3>
                <p className='text-gray-500 font-light mb-8 leading-relaxed'>
                  {service.description}
                </p>
                <Link
                  to={`/services/${service.id}`}
                  className='inline-flex items-center gap-2 text-luxury-black font-bold uppercase tracking-widest text-xs group-hover:text-emerald-600 transition-colors'
                >
                  Learn More{' '}
                  <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-2' />
                </Link>
              </div>
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
      title: 'Enroll in German',
      desc: 'Pick your level — A1, A2, B1, B2, or C1 — and start your German language journey with our certified instructors.',
    },
    {
      number: '02',
      title: 'Pass the Goethe Exam',
      desc: 'We prepare you intensively for the official Goethe certification that German employers and visa offices require.',
    },
    {
      number: '03',
      title: 'Choose Your Pathway',
      desc: 'Nursing, Ausbildung, Job Seeker Visa, or University — we match your certificate to the right Germany-bound route.',
    },
    {
      number: '04',
      title: 'We Handle the Rest',
      desc: 'Visa processing, employer matching, document support, and relocation guidance — we see you through to Germany.',
    },
  ];

  return (
    <section className='py-32 bg-luxury-black text-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center max-w-3xl mx-auto mb-20'>
          <span className='text-emerald-400 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
            The Journey
          </span>
          <h2 className='text-fluid-h2 font-serif font-bold'>
            How We Get You to Germany
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {steps.map((step, i) => (
            <div key={i} className='relative group'>
              <div className='text-8xl font-serif font-bold text-emerald-500/10 absolute -top-10 -left-4 group-hover:text-emerald-500/20 transition-colors'>
                {step.number}
              </div>
              <div className='relative z-10 pt-8'>
                <h3 className='text-2xl font-serif font-bold text-white mb-4'>
                  {step.title}
                </h3>
                <p className='text-white/50 font-light leading-relaxed'>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Chioma A.',
      role: 'Registered Nurse — Now in Berlin',
      text: 'AOCA took me from zero German to B2 in under 8 months. I passed the Goethe exam, got placed in a Berlin hospital, and my work contract was handled completely by their team. The process was seamless.',
      image:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Emmanuel O.',
      role: 'IT Professional — Now in Munich',
      text: "I thought learning German would take years. AOCA's intensive B1–B2 program changed that belief completely. Six months later I was on a plane to Munich with a tech job already lined up.",
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Blessing M.',
      role: 'Ausbildung Trainee — Frankfurt',
      text: "I didn't even know what Ausbildung was before I came to AOCA. They explained everything, got me to B1, and connected me with a German company. I'm now earning and training in Frankfurt.",
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <section className='py-32 bg-luxury-cream'>
      <div className='container mx-auto px-6'>
        <div className='text-center max-w-3xl mx-auto mb-20'>
          <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
            Success Stories
          </span>
          <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black'>
            They Learned German. Now They Live in Germany.
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className='p-10 rounded-[2.5rem] bg-white border border-gray-100 relative'
            >
              <div className='text-6xl font-serif text-emerald-500/20 absolute top-6 left-6'>
                "
              </div>
              <p className='text-lg text-gray-600 font-light leading-relaxed mb-8 relative z-10 italic'>
                {t.text}
              </p>
              <div className='flex items-center gap-4'>
                <img
                  src={t.image}
                  alt={t.name}
                  className='w-14 h-14 rounded-full object-cover border-2 border-white shadow-md'
                />
                <div>
                  <h4 className='font-serif font-bold text-luxury-black'>
                    {t.name}
                  </h4>
                  <p className='text-xs uppercase tracking-widest text-emerald-600 font-bold'>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY GERMANY ──────────────────────────────────────────────────────────────
function WhyGermanySection() {
  const reasonsRow1 = [
    {
      title: 'Tuition-Free University',
      desc: 'Public universities in Germany charge no tuition fees — even for international students from Nigeria.',
    },
    {
      title: 'Nursing Demand',
      desc: 'Germany faces a critical shortage of nurses. Qualified B2-certified nurses from Nigeria are actively recruited.',
    },
    {
      title: 'Ausbildung Pays You',
      desc: 'Unlike internships, German Ausbildung apprentices receive a monthly salary while they train.',
    },
    {
      title: 'High Earning Potential',
      desc: 'Average salaries in Germany are 3–5x higher than comparable roles in Nigeria across most professions.',
    },
  ];

  const reasonsRow2 = [
    {
      title: 'Permanent Residency Path',
      desc: 'Germany offers a clear path to permanent residency after just a few years of working there.',
    },
    {
      title: 'Family Reunification',
      desc: 'Most German work visas allow you to bring your spouse and children to Germany with you.',
    },
    {
      title: 'Strong Economy',
      desc: "Europe's largest economy with booming demand for healthcare, IT, and skilled trades.",
    },
    {
      title: 'Safety & Stability',
      desc: "Consistently ranked among the world's safest and most politically stable countries.",
    },
  ];

  return (
    <section className='py-32 bg-white relative overflow-hidden'>
      <div className='container mx-auto px-6 relative z-10 mb-20'>
        <div className='max-w-3xl'>
          <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
            Why Germany?
          </span>
          <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black mb-8'>
            The Opportunity is Real.
            <br />
            The Door is German Language.
          </h2>
          <p className='text-xl text-gray-500 font-light leading-relaxed'>
            Germany is actively seeking skilled workers from abroad. Whether
            you're a nurse, engineer, IT expert, or trade professional —
            speaking German is the single key that unlocks every opportunity.
          </p>
        </div>
      </div>

      <div className='relative space-y-8 md:space-y-12'>
        <div className='flex overflow-hidden'>
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className='flex gap-4 md:gap-8 whitespace-nowrap'
          >
            {[...reasonsRow1, ...reasonsRow1, ...reasonsRow1].map((r, i) => (
              <div
                key={i}
                className='w-[300px] md:w-[400px] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-luxury-cream border border-gray-100 shrink-0'
              >
                <h4 className='text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4 text-emerald-600'>
                  {r.title}
                </h4>
                <p className='text-sm md:text-base text-gray-500 font-light leading-relaxed whitespace-normal'>
                  {r.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
        <div className='flex overflow-hidden'>
          <motion.div
            animate={{ x: [-1920, 0] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className='flex gap-4 md:gap-8 whitespace-nowrap'
          >
            {[...reasonsRow2, ...reasonsRow2, ...reasonsRow2].map((r, i) => (
              <div
                key={i}
                className='w-[300px] md:w-[400px] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-luxury-cream border border-gray-100 shrink-0'
              >
                <h4 className='text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4 text-emerald-600'>
                  {r.title}
                </h4>
                <p className='text-sm md:text-base text-gray-500 font-light leading-relaxed whitespace-normal'>
                  {r.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className='container mx-auto px-6 mt-24'>
        <div className='flex justify-center'>
          <Link
            to='/services/german'
            className='group flex items-center gap-4 text-luxury-black hover:text-emerald-600 transition-colors'
          >
            <span className='text-sm uppercase tracking-[0.3em] font-bold'>
              Start Your German Journey
            </span>
            <div className='w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-emerald-500 transition-colors'>
              <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── GLOBAL REACH ─────────────────────────────────────────────────────────────
function GlobalReach() {
  return (
    <section className='py-32 bg-luxury-cream'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col lg:flex-row items-center gap-20'>
          <div className='flex-1'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Our Locations
            </span>
            <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black mb-8'>
              Based in Nigeria.
              <br />
              Connected to Germany.
            </h2>
            <p className='text-xl text-gray-500 font-light leading-relaxed mb-12'>
              With training centers in Lagos and Port Harcourt and strategic
              employer partners across Germany, we bridge the gap between your
              current location and your desired destination.
            </p>
            <div className='space-y-6'>
              {[
                {
                  city: 'Lagos, Nigeria',
                  role: 'Headquarters & German Language Training Center',
                },
                {
                  city: 'Port Harcourt, Nigeria',
                  role: 'Regional German Courses & Consultancy Hub',
                },
                {
                  city: 'Berlin, Germany',
                  role: 'Employer Partnerships & Visa Support',
                },
              ].map((loc, i) => (
                <div
                  key={i}
                  className='flex items-center gap-4 p-6 rounded-2xl bg-white border border-gray-100'
                >
                  <div className='w-3 h-3 rounded-full bg-emerald-500' />
                  <div>
                    <h4 className='font-serif font-bold text-luxury-black'>
                      {loc.city}
                    </h4>
                    <p className='text-sm text-gray-400'>{loc.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex-1 relative'>
            <div className='aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-luxury-black flex items-center justify-center p-12'>
              <div className='relative w-full h-full opacity-60'>
                <img
                  src='https://res.cloudinary.com/dejeplzpv/image/upload/v1744418391/m5tgp0rr8ihaqinxyoxd.jpg'
                  alt='Global Map'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='relative'>
                  <div className='absolute -top-12 -left-12 w-4 h-4 bg-emerald-500 rounded-full animate-ping' />
                  <div className='absolute -top-12 -left-12 w-4 h-4 bg-emerald-500 rounded-full' />
                  <div className='absolute top-24 left-32 w-4 h-4 bg-emerald-500 rounded-full animate-ping' />
                  <div className='absolute top-24 left-32 w-4 h-4 bg-emerald-500 rounded-full' />
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
      q: 'Do I need any prior knowledge of German to enroll?',
      a: "Not at all. Our A1 program is designed for complete beginners — whether you've never heard German before or only dabbled on Duolingo. We start from scratch and take you all the way.",
    },
    {
      q: 'How long does it take to reach B2 from zero?',
      a: 'With our standard program, most students reach B2 in 12–18 months. With our intensive fast-track option, dedicated students have achieved B2 in as little as 6–8 months.',
    },
    {
      q: 'What is the Goethe examination and do I need it?',
      a: "The Goethe Institut is Germany's official language certification body. Their certificates are recognized by German embassies, employers, and universities worldwide. Yes — you will need a Goethe certificate for virtually every Germany pathway.",
    },
    {
      q: 'Do I need B2 for nursing or can I go with B1?',
      a: "For direct nursing employment in Germany, B2 is required. B1 is sufficient for Ausbildung (vocational training) programs. We'll advise you on the exact requirement for your specific pathway.",
    },
    {
      q: 'Do you handle the visa application too?',
      a: "Yes. Once you've obtained your certificate and been matched with an employer or program, our team supports your complete visa application — from document preparation to embassy interview coaching.",
    },
  ];

  return (
    <section id='faq' className='py-32 bg-luxury-cream'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
          <div>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Common Questions
            </span>
            <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black mb-8'>
              Frequently Asked Questions
            </h2>
            <p className='text-xl text-gray-500 font-light leading-relaxed mb-12'>
              Everything you need to know about our German programs and Germany
              pathways. Can't find your answer? Talk to our team directly.
            </p>
            <Link
              to='/contact'
              className='px-10 py-5 bg-luxury-black text-white rounded-full text-sm uppercase tracking-widest font-bold hover:bg-emerald-600 transition-all'
            >
              Ask a Question
            </Link>
          </div>
          <div className='space-y-8'>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className='p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100'
              >
                <h4 className='text-xl font-serif font-bold text-luxury-black mb-4'>
                  {faq.q}
                </h4>
                <p className='text-gray-500 font-light leading-relaxed'>
                  {faq.a}
                </p>
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
  return (
    <section className='py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='bg-luxury-black rounded-[3rem] p-12 md:p-24 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl' />
          <div className='relative z-10 max-w-2xl'>
            <h2 className='text-4xl md:text-6xl font-serif font-bold text-white mb-8'>
              Get Germany-Ready Updates
            </h2>
            <p className='text-xl text-white/60 font-light mb-12'>
              New German cohort dates, Goethe exam tips, job offers from
              Germany, and visa news — delivered straight to your inbox. No
              spam.
            </p>
            <form className='flex flex-col md:flex-row gap-4'>
              <input
                type='email'
                placeholder='Your email address'
                className='flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500 transition-colors'
              />
              <button className='px-10 py-5 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className='bg-luxury-black text-white pt-32 pb-12'>
      <div className='container mx-auto px-6'>
        {/* Brand row */}
        <div className='mb-16 pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-10'>
          <div className='max-w-md'>
            <Link to='/' className='text-4xl font-serif font-bold mb-6 block'>
              AOCA<span className='text-emerald-500'>.</span>
            </Link>
            <p className='text-lg text-white/50 font-light leading-relaxed mb-6'>
              Nigeria's premier German language school and Germany placement
              consultancy. From A1 to your first day in Germany — we handle it
              all.
            </p>
            <p className='text-xs text-emerald-500 font-bold uppercase tracking-widest'>
              German Language · Ausbildung · Nursing · Job Seeker Visa
            </p>
          </div>
          <div className='flex gap-4'>
            {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href='#'
                className='p-4 rounded-full border border-white/10 hover:bg-emerald-600 hover:border-emerald-600 transition-all'
              >
                <Icon className='h-5 w-5' />
              </a>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-10 mb-20'>
          {/* German Programs */}
          <div>
            <h4 className='text-xs uppercase tracking-[0.3em] font-bold mb-6 text-emerald-500'>
              German Programs
            </h4>
            <ul className='space-y-3'>
              {[
                { label: 'A1 German — Beginner', to: '/services/german' },
                { label: 'A2 German — Elementary', to: '/services/german' },
                { label: 'B1 German — Intermediate', to: '/services/german' },
                { label: 'B2 German — Upper Inter.', to: '/services/german' },
                { label: 'C1 German — Advanced', to: '/services/german' },
                { label: 'Goethe Exam Prep', to: '/services/exam-prep' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className='text-white/50 hover:text-emerald-400 transition-colors text-sm font-light leading-relaxed block'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Germany Pathways */}
          <div>
            <h4 className='text-xs uppercase tracking-[0.3em] font-bold mb-6 text-emerald-500'>
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
                    className='text-white/50 hover:text-emerald-400 transition-colors text-sm font-light leading-relaxed block'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Services */}
          <div>
            <h4 className='text-xs uppercase tracking-[0.3em] font-bold mb-6 text-emerald-500'>
              Other Services
            </h4>
            <ul className='space-y-3'>
              {[
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
                { label: 'IELTS / Exam Prep', to: '/services/exam-prep' },
                { label: 'Programming', to: '/services/programming' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className='text-white/50 hover:text-emerald-400 transition-colors text-sm font-light leading-relaxed block'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='text-xs uppercase tracking-[0.3em] font-bold mb-6 text-emerald-500'>
              Contact Us
            </h4>
            <ul className='space-y-5'>
              <li className='flex items-start gap-3 text-white/50 font-light text-sm'>
                <MapPin className='h-5 w-5 text-emerald-500 shrink-0 mt-0.5' />
                <span>
                  8 Bayo Adetuna Street off Sangotedo, Lagos, Nigeria.
                </span>
              </li>
              <li className='flex items-start gap-3 text-white/50 font-light text-sm'>
                <MapPin className='h-5 w-5 text-emerald-500 shrink-0 mt-0.5' />
                <span>Port Harcourt, Rivers State, Nigeria.</span>
              </li>
              <li className='flex items-center gap-3 text-white/50 font-light text-sm'>
                <Phone className='h-5 w-5 text-emerald-500 shrink-0' />
                <span>+234 803 886 5466</span>
              </li>
              <li className='flex items-center gap-3 text-white/50 font-light text-sm'>
                <Mail className='h-5 w-5 text-emerald-500 shrink-0' />
                <span>info@aocaresourcesltd.com</span>
              </li>
            </ul>

            <div className='mt-8'>
              <Link
                to='/contact'
                className='inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all'
              >
                Get in Touch <ArrowRight className='h-3 w-3' />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-sm font-light'>
          <p>
            © {new Date().getFullYear()} AOCA Resources Limited. All Rights
            Reserved.
          </p>
          <div className='flex gap-8'>
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

      {/* Closing CTA Image Section */}
      <section className='relative h-[70vh] md:h-[80vh] w-full overflow-hidden'>
        <div className='absolute inset-0 bg-black/50 z-10' />
        <img
          src='https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000'
          alt='Career in Germany'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 z-20 flex items-center justify-center text-center'>
          <div className='container mx-auto px-6'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='max-w-4xl mx-auto'
            >
              <h2 className='text-fluid-h2 font-serif font-bold text-white mb-8'>
                Your German Journey Starts With One Step
              </h2>
              <p className='text-lg md:text-xl text-white/80 font-light mb-12'>
                Thousands of Nigerians are already working, studying, and
                building lives in Germany — because they learned the language
                first. Your turn starts today.
              </p>
              <Link
                to='/register'
                className='px-10 md:px-12 py-5 md:py-6 bg-emerald-600 text-white rounded-full text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all duration-500 shadow-[0_10px_30px_rgba(16,185,129,0.3)]'
              >
                Start Learning German Today
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}

export default App;

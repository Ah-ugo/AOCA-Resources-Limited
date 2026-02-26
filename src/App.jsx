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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/dashboard/*'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/pathways/:id' element={<PathwayDetail />} />
          <Route path='/services/:id' element={<ServiceDetail />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/career/:id' element={<CareerDetail />} />
          <Route path='/blogs' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />

          {/* Admin Routes */}
          <Route
            path='/admin'
            element={<Navigate to='/admin/dashboard' replace />}
          />
          <Route
            path='/admin/*'
            element={
              <AdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path='dashboard' element={<AdminDashboard />} />

                    <Route path='users' element={<UsersList />} />
                    <Route path='users/new' element={<UserForm />} />
                    <Route path='users/:id' element={<UserDetail />} />
                    <Route path='users/:id/edit' element={<UserForm />} />

                    <Route path='careers/jobs' element={<JobsList />} />
                    <Route path='careers/jobs/new' element={<JobForm />} />
                    <Route path='careers/jobs/:id/edit' element={<JobForm />} />

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

                    {/* Blog Management */}
                    <Route path='blogs' element={<BlogsList />} />
                    <Route path='blogs/new' element={<BlogForm />} />
                    <Route path='blogs/:id/edit' element={<BlogForm />} />
                    <Route
                      path='blogs/categories'
                      element={<CategoriesList />}
                    />

                    {/* Course Management */}
                    <Route path='courses' element={<CoursesList />} />
                    <Route path='courses/new' element={<CourseForm />} />
                    <Route path='courses/:id' element={<CourseDetail />} />
                    <Route path='courses/:id/edit' element={<CourseForm />} />
                    <Route path='classes' element={<ClassesList />} />

                    {/* Course Lessons Management */}
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
              </AdminRoute>
            }
          />

          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Private route component to protect dashboard
function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

// Admin route component to protect admin pages
function AdminRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!isAdmin) {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
}

// Mock components for missing pages
const PlaceholderPage = ({ title }) => (
  <div className='min-h-screen flex items-center justify-center pt-32'>
    <h1 className='text-4xl font-serif font-bold'>{title}</h1>
  </div>
);

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Chioma A.',
      role: 'Nursing Professional',
      text: "The German language course was excellent! I passed my B1 exam and secured a nursing position in Berlin through AOCA's work contract pathway.",
      image:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Emmanuel O.',
      role: 'IT Professional',
      text: 'Thanks to their job seeker pathway services, I secured a job with a top German tech company. The visa process was smooth and well-guided.',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Blessing M.',
      role: 'Data Analyst',
      text: "The Data Analysis course gave me practical skills that landed me a role at a leading analytics firm. AOCA's training is world-class!",
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <section className='py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center max-w-3xl mx-auto mb-20'>
          <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
            Success Stories
          </span>
          <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black'>
            Trusted by Professionals
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className='p-10 rounded-[2.5rem] bg-luxury-cream border border-gray-100 relative'
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

function WhyGermanySection() {
  const reasonsRow1 = [
    {
      title: 'Free Education',
      desc: 'Public universities in Germany offer tuition-free education for international students.',
    },
    {
      title: 'Strong Economy',
      desc: "Europe's largest economy with a high demand for skilled professionals.",
    },
    {
      title: 'Work-Life Balance',
      desc: 'Germany is famous for its high quality of life and generous vacation time.',
    },
    {
      title: 'Career Growth',
      desc: 'Access to global companies and a thriving startup ecosystem.',
    },
  ];

  const reasonsRow2 = [
    {
      title: 'Innovation Hub',
      desc: 'A global leader in automotive, engineering, and digital transformation.',
    },
    {
      title: 'Cultural Richness',
      desc: 'Experience a vibrant mix of history, art, and modern European lifestyle.',
    },
    {
      title: 'Safety & Stability',
      desc: 'One of the safest and most politically stable countries in the world.',
    },
    {
      title: 'Central Location',
      desc: 'Perfectly positioned in the heart of Europe for easy travel and business.',
    },
  ];

  return (
    <section className='py-32 bg-luxury-black text-white relative overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none'>
        <Globe className='w-full h-full scale-150 translate-x-1/2' />
      </div>

      <div className='container mx-auto px-6 relative z-10 mb-20'>
        <div className='max-w-3xl'>
          <span className='text-emerald-400 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
            The Destination
          </span>
          <h2 className='text-fluid-h2 font-serif font-bold mb-8'>
            Why Choose Germany?
          </h2>
          <p className='text-xl text-white/60 font-light leading-relaxed'>
            Germany offers unparalleled opportunities for career advancement and
            personal growth. As a global leader in technology and healthcare, it
            remains the top choice for ambitious professionals.
          </p>
        </div>
      </div>

      <div className='relative space-y-8 md:space-y-12'>
        {/* Row 1: Moving Left */}
        <div className='flex overflow-hidden'>
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className='flex gap-4 md:gap-8 whitespace-nowrap'
          >
            {[...reasonsRow1, ...reasonsRow1, ...reasonsRow1].map((r, i) => (
              <div
                key={i}
                className='w-[300px] md:w-[400px] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shrink-0'
              >
                <h4 className='text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4 text-emerald-400'>
                  {r.title}
                </h4>
                <p className='text-sm md:text-base text-white/50 font-light leading-relaxed whitespace-normal'>
                  {r.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moving Right */}
        <div className='flex overflow-hidden'>
          <motion.div
            animate={{ x: [-1920, 0] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className='flex gap-4 md:gap-8 whitespace-nowrap'
          >
            {[...reasonsRow2, ...reasonsRow2, ...reasonsRow2].map((r, i) => (
              <div
                key={i}
                className='w-[300px] md:w-[400px] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shrink-0'
              >
                <h4 className='text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4 text-emerald-400'>
                  {r.title}
                </h4>
                <p className='text-sm md:text-base text-white/50 font-light leading-relaxed whitespace-normal'>
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
            to='/about'
            className='group flex items-center gap-4 text-white/80 hover:text-white transition-colors'
          >
            <span className='text-sm uppercase tracking-[0.3em] font-bold'>
              Discover More About Germany
            </span>
            <div className='w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-500 transition-colors'>
              <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function GlobalReach() {
  return (
    <section className='py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col lg:flex-row items-center gap-20'>
          <div className='flex-1'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Our Reach
            </span>
            <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black mb-8'>
              A Bridge Between Continents
            </h2>
            <p className='text-xl text-gray-500 font-light leading-relaxed mb-12'>
              With offices in Lagos and Port Harcourt, and strategic partners
              across Germany, we provide a seamless bridge for professionals
              looking to expand their horizons.
            </p>
            <div className='space-y-6'>
              {[
                {
                  city: 'Lagos, Nigeria',
                  role: 'Headquarters & Training Center',
                },
                {
                  city: 'Berlin, Germany',
                  role: 'Recruitment & Partner Relations',
                },
                {
                  city: 'Port Harcourt, Nigeria',
                  role: 'Regional Consultancy Hub',
                },
              ].map((loc, i) => (
                <div
                  key={i}
                  className='flex items-center gap-4 p-6 rounded-2xl bg-luxury-cream border border-gray-100'
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
              <div className='relative w-full h-full opacity-20'>
                <Globe className='w-full h-full text-emerald-500' />
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

function FAQSection() {
  const faqs = [
    {
      q: 'What is the Ausbildung program?',
      a: 'Ausbildung is a dual vocational training system in Germany that combines classroom education with on-the-job training, allowing you to earn while you learn.',
    },
    {
      q: 'Do I need to speak German to apply?',
      a: 'For most pathways, at least a B1 level of German is required. We provide intensive language training to help you reach this level.',
    },
    {
      q: 'How long does the visa process take?',
      a: 'The duration varies depending on the pathway, but typically it takes between 3 to 6 months after securing a contract.',
    },
    {
      q: 'Can I bring my family with me?',
      a: 'Yes, many work visas allow for family reunification, though specific requirements must be met for each family member.',
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
              Everything you need to know about our pathways and services. Can't
              find the answer? Contact our team.
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

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000',
    title: 'Global Excellence',
    subtitle: 'Your Gateway to International Success',
    description:
      'Professional training and recruitment services tailored for your global ambitions.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000',
    title: 'German Pathways',
    subtitle: 'Expert Visa & Career Consultancy',
    description:
      'Specialized routes for nursing, vocational training, and academic excellence in Germany.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000',
    title: 'Elite Training',
    subtitle: 'Master the Skills of Tomorrow',
    description:
      'From Cyber Security to Data Analysis, we provide world-class education for the modern professional.',
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
          <div className='absolute inset-0 bg-black/40 z-10' />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10' />
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className='h-full w-full object-cover'
          />
        </motion.div>
      </AnimatePresence>

      <div className='absolute inset-0 z-20 flex items-center'>
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
                {slides[current].title.split(' ').map((word, i) => (
                  <span key={i} className='block'>
                    {word}
                  </span>
                ))}
              </h1>
              <p className='text-lg md:text-xl text-white/70 max-w-xl mb-12 font-light leading-relaxed'>
                {slides[current].description}
              </p>
              <div className='flex flex-wrap gap-4 md:gap-6'>
                <Link
                  to='/register'
                  className='px-8 md:px-10 py-4 md:py-5 bg-emerald-600 text-white rounded-full text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(16,185,129,0.3)]'
                >
                  Get Started
                </Link>
                <Link
                  to='/about'
                  className='px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white/20 transition-all duration-300'
                >
                  Our Story
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
              className={`h-1 transition-all duration-500 rounded-full ${
                current === i ? 'w-12 bg-emerald-500' : 'w-4 bg-white/30'
              }`}
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

function ServicesSection() {
  const services = [
    {
      id: 'exam-prep',
      title: 'Professional Exam Prep',
      description: 'Elite preparation for IELTS, GMAT, SAT, and more.',
      icon: Award,
      color: 'bg-blue-500',
    },
    {
      id: 'german',
      title: 'German Language',
      description: 'Master German from A1 to B2 with native-level fluency.',
      icon: BookOpen,
      color: 'bg-emerald-500',
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Advanced protection strategies for the digital age.',
      icon: Shield,
      color: 'bg-purple-500',
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      description: 'Transform raw data into strategic business insights.',
      icon: BarChart,
      color: 'bg-orange-500',
    },
    {
      id: 'programming',
      title: 'Programming',
      description: 'Build the future with Python and modern web tech.',
      icon: Code,
      color: 'bg-cyan-500',
    },
    {
      id: 'project-management',
      title: 'Project Management',
      description: 'Lead complex initiatives with precision and agility.',
      icon: Briefcase,
      color: 'bg-rose-500',
    },
  ];

  return (
    <section className='py-32 bg-luxury-cream'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col lg:flex-row justify-between items-end mb-20 gap-8'>
          <div className='max-w-2xl'>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Our Expertise
            </span>
            <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black'>
              Crafting Your <br /> Professional Future
            </h2>
          </div>
          <p className='text-lg md:text-xl text-gray-500 max-w-md font-light leading-relaxed'>
            We provide specialized training programs designed to meet the
            highest international standards.
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
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/10`}
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

function WhyChooseUs() {
  const features = [
    {
      title: 'Global Network',
      desc: 'Direct partnerships with top institutions in Germany and beyond.',
    },
    {
      title: 'Expert Mentors',
      desc: 'Learn from professionals with decades of international experience.',
    },
    {
      title: 'Proven Success',
      desc: 'Over 98% of our students achieve their career and visa goals.',
    },
    {
      title: 'End-to-End Support',
      desc: 'From training to recruitment and visa processing, we handle it all.',
    },
  ];

  return (
    <section className='py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
          <div className='relative'>
            <div className='aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl'>
              <img
                src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000'
                alt='Team'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-600 rounded-[2rem] p-8 text-white hidden md:flex flex-col justify-center'>
              <span className='text-5xl font-serif font-bold mb-2'>15+</span>
              <p className='text-sm uppercase tracking-widest font-bold opacity-80'>
                Years of Excellence in Global Education
              </p>
            </div>
          </div>
          <div>
            <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
              Why AOCA Elite
            </span>
            <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black mb-8'>
              Unmatched Support for Your Ambitions
            </h2>
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
              Discover Our Story <ArrowRight className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Consultation',
      desc: 'We assess your goals and recommend the best pathway.',
    },
    {
      number: '02',
      title: 'Elite Training',
      desc: 'Intensive language or skill training with expert mentors.',
    },
    {
      number: '03',
      title: 'Placement',
      desc: 'We connect you with top global employers or institutions.',
    },
    {
      number: '04',
      title: 'Visa & Travel',
      desc: 'Full support for your visa processing and relocation.',
    },
  ];

  return (
    <section className='py-32 bg-luxury-cream'>
      <div className='container mx-auto px-6'>
        <div className='text-center max-w-3xl mx-auto mb-20'>
          <span className='text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4'>
            The Journey
          </span>
          <h2 className='text-fluid-h2 font-serif font-bold text-luxury-black'>
            Your Path to Success
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {steps.map((step, i) => (
            <div key={i} className='relative group'>
              <div className='text-8xl font-serif font-bold text-emerald-500/10 absolute -top-10 -left-4 group-hover:text-emerald-500/20 transition-colors'>
                {step.number}
              </div>
              <div className='relative z-10 pt-8'>
                <h3 className='text-2xl font-serif font-bold text-luxury-black mb-4'>
                  {step.title}
                </h3>
                <p className='text-gray-500 font-light leading-relaxed'>
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

function Newsletter() {
  return (
    <section className='py-32 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='bg-luxury-black rounded-[3rem] p-12 md:p-24 relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl' />
          <div className='relative z-10 max-w-2xl'>
            <h2 className='text-4xl md:text-6xl font-serif font-bold text-white mb-8'>
              Stay Ahead of the Curve
            </h2>
            <p className='text-xl text-white/60 font-light mb-12'>
              Get the latest insights on global career trends and international
              opportunities delivered to your inbox.
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

function StatsSection() {
  const stats = [
    { label: 'Success Rate', value: '98%' },
    { label: 'Students Trained', value: '5K+' },
    { label: 'Global Partners', value: '120+' },
    { label: 'Years Excellence', value: '15+' },
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

function Footer() {
  return (
    <footer className='bg-luxury-black text-white pt-32 pb-12'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-20 mb-32'>
          <div className='lg:col-span-2'>
            <Link to='/' className='text-4xl font-serif font-bold mb-8 block'>
              AOCA<span className='text-emerald-500'>.</span>
            </Link>
            <p className='text-xl text-white/50 font-light max-w-md leading-relaxed mb-12'>
              Empowering the next generation of global professionals through
              elite training and strategic career pathways.
            </p>
            <div className='flex gap-6'>
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href='#'
                  className='p-4 rounded-full border border-white/10 hover:bg-white/10 transition-all'
                >
                  <Icon className='h-5 w-5' />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className='text-sm uppercase tracking-[0.3em] font-bold mb-8 text-emerald-500'>
              Navigation
            </h4>
            <ul className='space-y-4'>
              {['Pathways', 'Services', 'Blog', 'About Us', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      className='text-white/60 hover:text-white transition-colors font-light text-lg'
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className='text-sm uppercase tracking-[0.3em] font-bold mb-8 text-emerald-500'>
              Contact
            </h4>
            <ul className='space-y-6'>
              <li className='flex items-start gap-4 text-white/60 font-light'>
                <MapPin className='h-6 w-6 text-emerald-500 shrink-0' />
                <span>8 Bayo Adetuna Street off Sangotedo, Lagos.</span>
              </li>
              <li className='flex items-center gap-4 text-white/60 font-light'>
                <Phone className='h-6 w-6 text-emerald-500 shrink-0' />
                <span>+234 803 886 5466</span>
              </li>
              <li className='flex items-center gap-4 text-white/60 font-light'>
                <Mail className='h-6 w-6 text-emerald-500 shrink-0' />
                <span>info@aocaresourcesltd.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 text-sm font-light'>
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
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main className='overflow-hidden'>
      <Header />
      <HeroCarousel />
      <StatsSection />
      <WhyChooseUs />
      <WhyGermanySection />
      <GlobalReach />
      <ProcessSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />

      {/* Luxury Image Section */}
      <section className='relative h-[70vh] md:h-[80vh] w-full overflow-hidden'>
        <div className='absolute inset-0 bg-black/40 z-10' />
        <img
          src='https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000'
          alt='Luxury Office'
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
                Elevate Your Career to New Heights
              </h2>
              <p className='text-lg md:text-xl text-white/80 font-light mb-12'>
                Join thousands of professionals who have transformed their lives
                with our elite training programs.
              </p>
              <Link
                to='/register'
                className='px-10 md:px-12 py-5 md:py-6 bg-white text-luxury-black rounded-full text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-emerald-500 hover:text-white transition-all duration-500'
              >
                Join the Elite
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}

export default App;

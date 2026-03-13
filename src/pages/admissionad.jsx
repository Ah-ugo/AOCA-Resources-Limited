/** @format */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  GraduationCap,
  Laptop,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  Users,
  Award,
  BookOpen,
  Code,
  Globe,
  ChevronRight,
  Target,
  TrendingUp,
  Check,
  AlertCircle,
  Loader2,
  Briefcase,
  Star,
  Shield,
  BarChart,
  Wifi,
  Building2,
  Monitor,
  ChevronDown,
  Zap,
  CheckCircle2,
  X,
} from 'lucide-react';

// ─── FONTS ───────────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');
    :root {
      --emerald: #16a34a;
      --emerald-dark: #14532d;
      --emerald-light: #bbf7d0;
      --cream: #fafaf7;
      --black: #0a0a0a;
      --gray: #6b7280;
    }
    body { font-family: 'DM Sans', sans-serif; }
    .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
    .font-serif-dm { font-family: 'DM Serif Display', serif; }
    .noise::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      opacity: 0.06;
      pointer-events: none;
      z-index: 0;
    }
    .tag-badge {
      background: linear-gradient(135deg, #16a34a22, #16a34a11);
      border: 1px solid #16a34a44;
      backdrop-filter: blur(8px);
    }
    .card-hover { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.12); }
    .diagonal-stripe {
      background: repeating-linear-gradient(
        -45deg, transparent, transparent 8px,
        rgba(22,163,74,0.06) 8px, rgba(22,163,74,0.06) 9px
      );
    }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
    .animate-float { animation: float 4s ease-in-out infinite; }
    .pulse-ring::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid #16a34a;
      animation: pulse-ring 2s ease-out infinite;
    }
    .gradient-text {
      background: linear-gradient(135deg, #16a34a, #4ade80);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .section-line::before {
      content: '';
      display: inline-block;
      width: 32px;
      height: 2px;
      background: #16a34a;
      margin-right: 12px;
      vertical-align: middle;
    }
  `}</style>
);

// ─── ADMISSION POPUP ─────────────────────────────────────────────────────────
const AdmissionPopup = ({ isOpen, onClose }) => {
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

  const programs = [
    { value: 'ielts', label: 'IELTS Preparation' },
    { value: 'gmat', label: 'GMAT Preparation' },
    { value: 'sat', label: 'SAT Preparation' },
    { value: 'gre', label: 'GRE Preparation' },
    { value: 'gcse', label: 'GCSE Preparation' },
    { value: 'toefl', label: 'TOEFL Preparation' },
    { value: 'scratch', label: 'Scratch Programming' },
    { value: 'python', label: 'Python Programming' },
    { value: 'web', label: 'Web Development' },
    { value: 'cyber-security', label: 'Cyber Security' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'project-management', label: 'Project Management' },
  ];

  const locations = [
    { value: 'lagos', label: 'Lagos (Physical)' },
    { value: 'port-harcourt', label: 'Port Harcourt (Physical)' },
    { value: 'online', label: 'Online' },
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
          onClose();
          setStatus('idle');
        }, 3000);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.message || 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — clicks anywhere to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/80 backdrop-blur-md'
            style={{ zIndex: 9998 }}
          />

          {/* Scroll container — sits above backdrop */}
          <div
            className='fixed inset-0 overflow-y-auto'
            style={{ zIndex: 9999 }}
          >
            <div
              className='flex min-h-full items-start justify-center p-4 pt-10 pb-10'
              onClick={onClose}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                className='relative w-full max-w-4xl'
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button — fixed above card, large touch target */}
                <button
                  onClick={onClose}
                  aria-label='Close'
                  className='absolute -top-5 right-0 z-20 w-12 h-12 rounded-full bg-white shadow-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all'
                  style={{ touchAction: 'manipulation' }}
                >
                  <X className='h-5 w-5 text-gray-800' />
                </button>

                <div className='relative bg-white rounded-3xl shadow-2xl overflow-hidden'>
                  <div className='grid grid-cols-1 md:grid-cols-5'>
                    {/* Left — dark branding panel */}
                    <div className='md:col-span-2 relative overflow-hidden bg-[#0a1f12] noise'>
                      <div className='absolute inset-0 diagonal-stripe' />
                      <div className='absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl' />
                      <div className='absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl' />

                      <div className='relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-[340px]'>
                        <div>
                          <div className='flex items-center gap-3 mb-8'>
                            <div className='w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center'>
                              <GraduationCap className='h-5 w-5 text-emerald-400' />
                            </div>
                            <span className='text-white font-bold tracking-widest text-sm uppercase'>
                              AOCA Resources
                            </span>
                          </div>

                          <div className='mb-6'>
                            <p className='text-emerald-400 text-xs uppercase tracking-[0.3em] font-bold mb-2'>
                              Now Open
                            </p>
                            <h2 className='font-display text-5xl text-white leading-none mb-3'>
                              THE
                              <br />
                              INTAKE
                            </h2>
                            <p className='text-white/60 text-sm font-light'>
                              Smart students are choosing AOCA for their future.
                            </p>
                          </div>

                          <div className='space-y-4 mb-8'>
                            {[
                              {
                                icon: Award,
                                label: 'Exam Prep',
                                sub: 'IELTS · GMAT · SAT · GRE · GCSE · TOEFL',
                              },
                              {
                                icon: Code,
                                label: 'Programming',
                                sub: 'Scratch · Python · Web Development',
                              },
                              {
                                icon: Shield,
                                label: 'Cyber Security',
                                sub: 'Network · Ethical Hacking · Risk Mgmt',
                              },
                              {
                                icon: BarChart,
                                label: 'Data Analysis',
                                sub: 'Excel · SQL · Visualisation',
                              },
                              {
                                icon: Briefcase,
                                label: 'Project Management',
                                sub: 'Planning · Agile · Risk Management',
                              },
                            ].map((item, i) => (
                              <div key={i} className='flex items-start gap-3'>
                                <div className='w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5'>
                                  <item.icon className='h-3.5 w-3.5 text-emerald-400' />
                                </div>
                                <div>
                                  <p className='text-white text-xs font-semibold uppercase tracking-wider'>
                                    {item.label}
                                  </p>
                                  <p className='text-white/40 text-xs'>
                                    {item.sub}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className='space-y-2 border-t border-white/10 pt-6'>
                          <div className='flex items-center gap-2 text-white/50 text-xs'>
                            <Wifi className='h-3 w-3 text-emerald-500' />
                            <span>Online & Physical Classes Available</span>
                          </div>
                          <div className='flex items-center gap-2 text-white/50 text-xs'>
                            <Phone className='h-3 w-3 text-emerald-500' />
                            <span>09038013105, 08038713612</span>
                          </div>
                          <div className='flex items-center gap-2 text-white/50 text-xs'>
                            <MapPin className='h-3 w-3 text-emerald-500' />
                            <span>
                              No 70 Eligbolo Rd, Rumudumaya, Port Harcourt
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right — form */}
                    <div className='md:col-span-3 p-8 md:p-10 bg-white'>
                      <div className='mb-6'>
                        <h3 className='font-serif-dm text-3xl text-gray-900 mb-1'>
                          Apply Now
                        </h3>
                        <p className='text-gray-400 text-sm'>
                          Fill in your details and we'll contact you with next
                          steps.
                        </p>
                      </div>

                      {status === 'success' ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className='text-center py-16'
                        >
                          <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <CheckCircle2 className='h-10 w-10 text-emerald-600' />
                          </div>
                          <h4 className='text-xl font-bold text-gray-900 mb-2'>
                            Application Submitted!
                          </h4>
                          <p className='text-gray-500 text-sm'>
                            Our admissions team will contact you shortly.
                          </p>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className='space-y-4'>
                          <div className='grid grid-cols-2 gap-3'>
                            {['first_name', 'last_name'].map((field) => (
                              <div key={field}>
                                <label className='block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider'>
                                  {field === 'first_name'
                                    ? 'First Name'
                                    : 'Last Name'}
                                </label>
                                <input
                                  required
                                  type='text'
                                  name={field}
                                  value={formData[field]}
                                  onChange={handleChange}
                                  placeholder={
                                    field === 'first_name' ? 'John' : 'Doe'
                                  }
                                  className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm'
                                />
                              </div>
                            ))}
                          </div>

                          {[
                            {
                              name: 'email',
                              type: 'email',
                              label: 'Email Address',
                              placeholder: 'john@example.com',
                            },
                            {
                              name: 'phone',
                              type: 'tel',
                              label: 'Phone Number',
                              placeholder: '+234 801 234 5678',
                            },
                          ].map((field) => (
                            <div key={field.name}>
                              <label className='block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider'>
                                {field.label}
                              </label>
                              <input
                                required
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm'
                              />
                            </div>
                          ))}

                          <div className='grid grid-cols-2 gap-3'>
                            <div>
                              <label className='block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider'>
                                Program
                              </label>
                              <select
                                required
                                name='program'
                                value={formData.program}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm'
                              >
                                <option value=''>Select program</option>
                                {programs.map((p) => (
                                  <option key={p.value} value={p.value}>
                                    {p.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className='block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider'>
                                Location
                              </label>
                              <select
                                required
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm'
                              >
                                <option value=''>Select location</option>
                                {locations.map((l) => (
                                  <option key={l.value} value={l.value}>
                                    {l.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className='block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider'>
                              Message (Optional)
                            </label>
                            <textarea
                              name='message'
                              value={formData.message}
                              onChange={handleChange}
                              rows={2}
                              placeholder='Any specific questions?'
                              className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm resize-none'
                            />
                          </div>

                          {status === 'error' && (
                            <div className='flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs'>
                              <AlertCircle className='h-4 w-4 shrink-0' />
                              {errorMessage}
                            </div>
                          )}

                          <button
                            type='submit'
                            disabled={status === 'loading'}
                            className='w-full py-4 bg-[#0a1f12] text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50'
                          >
                            {status === 'loading' ? (
                              <>
                                <Loader2 className='h-4 w-4 animate-spin' />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Apply Now <ArrowRight className='h-4 w-4' />
                              </>
                            )}
                          </button>
                          <p className='text-xs text-gray-400 text-center'>
                            No application fee · Free consultation included
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── COUNTER ANIMATION ────────────────────────────────────────────────────────
const CountUp = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(end.replace(/\D/g, ''));
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setCount(start);
      if (start >= num) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// ─── MAIN LANDING PAGE ────────────────────────────────────────────────────────
const AdmissionLandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState('exams');
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: '5000', suffix: '+', label: 'Students Trained' },
    { value: '25', suffix: '+', label: 'Expert Tutors' },
    { value: '94', suffix: '%', label: 'Success Rate' },
    { value: '15', suffix: '+', label: 'Years Experience' },
  ];

  const categories = [
    { id: 'exams', label: 'Exam Prep', icon: Award },
    { id: 'programming', label: 'Programming', icon: Code },
    { id: 'tech', label: 'Cyber & Data', icon: Shield },
    { id: 'management', label: 'Project Mgmt', icon: Briefcase },
  ];

  const programs = {
    exams: [
      {
        name: 'IELTS',
        sub: 'International English Language Testing',
        students: '1,500+',
        passRate: '94%',
        duration: '8 weeks',
        icon: Globe,
        color: 'from-blue-500 to-blue-600',
      },
      {
        name: 'GMAT',
        sub: 'Graduate Management Admission Test',
        students: '800+',
        passRate: '91%',
        duration: '10 weeks',
        icon: TrendingUp,
        color: 'from-violet-500 to-violet-600',
      },
      {
        name: 'SAT',
        sub: 'Scholastic Assessment Test',
        students: '1,200+',
        passRate: '93%',
        duration: '8 weeks',
        icon: Award,
        color: 'from-amber-500 to-orange-500',
      },
      {
        name: 'GRE',
        sub: 'Graduate Record Examinations',
        students: '600+',
        passRate: '90%',
        duration: '10 weeks',
        icon: Target,
        color: 'from-rose-500 to-pink-500',
      },
      {
        name: 'GCSE',
        sub: 'General Certificate of Secondary Education',
        students: '900+',
        passRate: '95%',
        duration: '12 weeks',
        icon: BookOpen,
        color: 'from-teal-500 to-teal-600',
      },
      {
        name: 'TOEFL',
        sub: 'Test of English as a Foreign Language',
        students: '1,100+',
        passRate: '92%',
        duration: '8 weeks',
        icon: Globe,
        color: 'from-cyan-500 to-cyan-600',
      },
    ],
    programming: [
      {
        name: 'Scratch',
        sub: 'Visual block-based programming for beginners',
        level: 'Beginner',
        age: 'Ages 8–12',
        duration: '6 weeks',
        icon: Monitor,
        color: 'from-yellow-400 to-orange-400',
      },
      {
        name: 'Python',
        sub: 'Most in-demand language for data, AI & automation',
        level: 'Beginner → Advanced',
        age: 'Ages 13+',
        duration: '12 weeks',
        icon: Code,
        color: 'from-emerald-500 to-green-600',
      },
      {
        name: 'Web Dev',
        sub: 'HTML, CSS & JavaScript — build real websites',
        level: 'Intermediate',
        age: 'Ages 15+',
        duration: '14 weeks',
        icon: Laptop,
        color: 'from-blue-400 to-indigo-500',
      },
    ],
    tech: [
      {
        name: 'Cyber Security',
        sub: 'Network · Security · Ethical Hacking · Risk Management',
        level: 'All Levels',
        duration: '12 weeks',
        icon: Shield,
        color: 'from-red-500 to-rose-600',
        modules: [
          'Network Security',
          'Ethical Hacking',
          'Risk Management',
          'Security Protocols',
        ],
      },
      {
        name: 'Data Analysis',
        sub: 'Excel · SQL · Data Visualisation · Business Intelligence',
        level: 'Beginner → Intermediate',
        duration: '10 weeks',
        icon: BarChart,
        color: 'from-violet-500 to-purple-600',
        modules: [
          'Excel Mastery',
          'SQL Querying',
          'Data Visualisation',
          'Business Insights',
        ],
      },
    ],
    management: [
      {
        name: 'Project Management',
        sub: 'Industry-aligned curriculum for professional certification',
        level: 'All Levels',
        duration: '10 weeks',
        icon: Briefcase,
        color: 'from-emerald-600 to-teal-600',
        modules: [
          'Project Planning',
          'Scheduling & Timelines',
          'Agile Methodology',
          'Risk Management',
        ],
      },
    ],
  };

  const faqs = [
    {
      q: 'Do I need prior experience to enroll?',
      a: 'No prior experience is needed for our beginner courses. For exam prep, basic English proficiency is recommended. We assess each student during registration to ensure proper placement.',
    },
    {
      q: 'Do you offer online classes?',
      a: 'Yes — we offer live online classes with the same quality as our physical classes in Lagos and Port Harcourt. You can switch between modes based on your convenience.',
    },
    {
      q: 'What is the maximum class size?',
      a: 'We keep classes small — maximum 15 students — to ensure every student gets personalized attention from the instructor.',
    },
    {
      q: 'Are study materials included?',
      a: 'Yes. All course materials, practice tests, past questions, and digital resources are included in your tuition at no extra cost.',
    },
    {
      q: 'What happens after I complete a course?',
      a: 'You receive an AOCA certificate of completion. For exam prep students, we also provide post-course support during your actual exam registration and preparation.',
    },
  ];

  const whyUs = [
    {
      icon: Users,
      title: 'Small Class Sizes',
      desc: 'Maximum 15 students per class. Every student gets direct attention from the instructor, not a lecture hall experience.',
    },
    {
      icon: Wifi,
      title: 'Online & Physical',
      desc: 'Attend from anywhere via our live online platform, or walk into our Lagos and Port Harcourt centres.',
    },
    {
      icon: Target,
      title: '94% Pass Rate',
      desc: 'The results speak for themselves. Most of our students hit their target scores on the very first attempt.',
    },
    {
      icon: BookOpen,
      title: 'Materials Included',
      desc: 'Practice tests, past questions, and all learning resources come with your enrollment — no hidden costs.',
    },
  ];

  return (
    <>
      <FontLoader />
      <AdmissionPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className='relative min-h-screen bg-[#050e08] overflow-hidden flex items-center noise'>
        {/* Background layers */}
        <div className='absolute inset-0 diagonal-stripe opacity-40' />
        <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4' />
        <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4' />

        {/* Grid lines */}
        <div
          className='absolute inset-0 opacity-[0.04]'
          style={{
            backgroundImage:
              'linear-gradient(rgba(22,163,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className='relative z-10 container mx-auto px-6 py-24 lg:py-32'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
            {/* Left content */}
            <div className='lg:col-span-7'>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className='tag-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8'>
                  <span className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse' />
                  <span className='text-emerald-400 text-xs font-bold uppercase tracking-[0.3em]'>
                    Admissions Open — 2026
                  </span>
                </div>

                <div className='mb-6'>
                  <p className='text-white/40 text-sm uppercase tracking-[0.4em] font-semibold mb-3'>
                    AOCA Resources
                  </p>
                  <h1 className='font-display text-[clamp(5rem,14vw,11rem)] text-white leading-none'>
                    THE
                    <br />
                    <span className='gradient-text'>INTAKE</span>
                  </h1>
                </div>

                <p className='text-xl text-white/60 font-light max-w-xl leading-relaxed mb-10'>
                  Smart students are choosing AOCA. Nigeria's most trusted
                  centre for exam preparation, computer programming, cyber
                  security, data analysis, and project management.
                </p>

                {/* Program pills */}
                <div className='flex flex-wrap gap-2 mb-10'>
                  {[
                    'IELTS',
                    'GMAT',
                    'SAT',
                    'GRE',
                    'Python',
                    'Cyber Security',
                    'Data Analysis',
                    'Project Mgmt',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className='px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className='flex flex-col sm:flex-row gap-4'>
                  <button
                    onClick={() => setShowPopup(true)}
                    className='group px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(22,163,74,0.35)]'
                  >
                    Apply Now — Free
                    <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                  </button>
                  <a
                    href='#programs'
                    className='px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/15 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2'
                  >
                    View All Programs
                    <ChevronDown className='h-4 w-4' />
                  </a>
                </div>

                {/* Delivery modes */}
                <div className='flex items-center gap-6 mt-8'>
                  {[
                    { icon: Building2, label: 'Lagos Campus' },
                    { icon: Building2, label: 'Port Harcourt' },
                    { icon: Wifi, label: 'Live Online' },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-2 text-white/40 text-sm'
                    >
                      <m.icon className='h-4 w-4 text-emerald-500' />
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — stats cards */}
            <div className='lg:col-span-5'>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className='grid grid-cols-2 gap-4'
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className='bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm'
                  >
                    <div className='text-4xl font-display text-emerald-400 mb-1'>
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className='text-white/40 text-xs uppercase tracking-wider'>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}

                {/* Urgency card */}
                <div className='col-span-2 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl p-5 flex items-center gap-4'>
                  <div className='w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 relative pulse-ring'>
                    <Zap className='h-5 w-5 text-emerald-400' />
                  </div>
                  <div>
                    <p className='text-emerald-300 font-bold text-sm'>
                      Limited Seats Remaining
                    </p>
                    <p className='text-emerald-400/60 text-xs'>
                      Enrollment closes once seats are filled. Apply today.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ─────────────────────────────────────────────────────── */}
      <section id='programs' className='py-28 bg-[#fafaf7]'>
        <div className='container mx-auto px-6'>
          <div className='mb-16'>
            <p className='section-line text-emerald-600 text-xs uppercase tracking-[0.3em] font-bold mb-4'>
              Our Programs
            </p>
            <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-6'>
              <h2 className='font-serif-dm text-5xl md:text-6xl text-gray-900 leading-tight max-w-xl'>
                Choose Your
                <br />
                <em>Path to Success</em>
              </h2>
              <p className='text-gray-500 max-w-sm leading-relaxed'>
                Whether you're preparing for professional exams, learning to
                code, or building tech skills — AOCA has the right program for
                you.
              </p>
            </div>
          </div>

          {/* Category tabs */}
          <div className='flex flex-wrap gap-3 mb-12'>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0a1f12] text-white shadow-lg'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <cat.icon className='h-4 w-4' />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Programs grid */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            >
              {programs[activeCategory].map((prog, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className='group bg-white rounded-3xl border border-gray-100 overflow-hidden card-hover'
                >
                  {/* Card header */}
                  <div
                    className={`bg-gradient-to-br ${prog.color} p-6 relative overflow-hidden`}
                  >
                    <div className='absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2' />
                    <prog.icon className='h-8 w-8 text-white mb-3 relative z-10' />
                    <h3 className='text-2xl font-display text-white relative z-10'>
                      {prog.name}
                    </h3>
                    <p className='text-white/70 text-xs mt-1 relative z-10'>
                      {prog.sub}
                    </p>
                  </div>

                  <div className='p-6'>
                    {/* Stats row */}
                    <div className='flex gap-4 mb-5'>
                      {prog.students && (
                        <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                          <Users className='h-3.5 w-3.5 text-emerald-500' />
                          {prog.students}
                        </div>
                      )}
                      {prog.passRate && (
                        <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                          <TrendingUp className='h-3.5 w-3.5 text-emerald-500' />
                          {prog.passRate}
                        </div>
                      )}
                      {prog.level && (
                        <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                          <Target className='h-3.5 w-3.5 text-emerald-500' />
                          {prog.level}
                        </div>
                      )}
                      <div className='flex items-center gap-1.5 text-xs text-gray-500 ml-auto'>
                        <Clock className='h-3.5 w-3.5 text-emerald-500' />
                        {prog.duration}
                      </div>
                    </div>

                    {/* Modules if available */}
                    {prog.modules && (
                      <div className='mb-5 space-y-1.5'>
                        {prog.modules.map((m, mi) => (
                          <div
                            key={mi}
                            className='flex items-center gap-2 text-xs text-gray-600'
                          >
                            <Check className='h-3.5 w-3.5 text-emerald-500 shrink-0' />
                            {m}
                          </div>
                        ))}
                      </div>
                    )}

                    {prog.age && (
                      <p className='text-xs text-gray-400 mb-5 flex items-center gap-1.5'>
                        <Users className='h-3.5 w-3.5' />
                        {prog.age}
                      </p>
                    )}

                    <button
                      onClick={() => setShowPopup(true)}
                      className='w-full py-3 bg-[#0a1f12] text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 group-hover:bg-emerald-700'
                    >
                      Enroll Now <ArrowRight className='h-4 w-4' />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── FLYER SPOTLIGHT — THE INTAKE ─────────────────────────────────── */}
      <section className='py-28 bg-[#0a1f12] relative overflow-hidden noise'>
        <div className='absolute inset-0 diagonal-stripe opacity-30' />
        <div className='absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3' />

        <div className='relative z-10 container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <div>
              <p
                className='section-line text-emerald-400 text-xs uppercase tracking-[0.3em] font-bold mb-6'
                style={{ '--tw-content': '' }}
              >
                Now Open
              </p>
              <h2 className='font-display text-[clamp(4rem,10vw,8rem)] text-white leading-none mb-6'>
                SMART
                <br />
                STUDENTS
                <br />
                <span className='gradient-text'>CHOOSE AOCA</span>
              </h2>
              <p className='text-white/50 text-lg font-light leading-relaxed mb-10 max-w-md'>
                Join thousands of students who've transformed their exam scores,
                built coding skills, and launched professional careers through
                AOCA's expert-led programs.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className='group inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-[0_8px_32px_rgba(22,163,74,0.3)]'
              >
                Register — No Application Fee
                <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </button>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  icon: Award,
                  title: 'Exam Preparation',
                  items: ['IELTS', 'GMAT', 'SAT', 'GRE', 'GCSE', 'TOEFL'],
                  color: 'border-blue-500/30 bg-blue-500/5',
                },
                {
                  icon: Code,
                  title: 'Programming',
                  items: ['Scratch', 'Python', 'Web Development'],
                  color: 'border-yellow-500/30 bg-yellow-500/5',
                },
                {
                  icon: Shield,
                  title: 'Cyber Security',
                  items: [
                    'Network Security',
                    'Ethical Hacking',
                    'Risk Management',
                  ],
                  color: 'border-red-500/30 bg-red-500/5',
                },
                {
                  icon: BarChart,
                  title: 'Data Analysis',
                  items: ['Excel', 'SQL', 'Visualisation', 'BI Tools'],
                  color: 'border-purple-500/30 bg-purple-500/5',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border p-5 ${card.color}`}
                >
                  <card.icon className='h-5 w-5 text-emerald-400 mb-3' />
                  <h4 className='text-white font-bold text-sm mb-3'>
                    {card.title}
                  </h4>
                  <ul className='space-y-1'>
                    {card.items.map((item, ii) => (
                      <li
                        key={ii}
                        className='flex items-center gap-1.5 text-white/40 text-xs'
                      >
                        <div className='w-1 h-1 bg-emerald-500 rounded-full' />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CYBER SECURITY + DATA ANALYSIS SPOTLIGHT ──────────────────────── */}
      <section className='py-28 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Cyber Security Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='relative rounded-3xl overflow-hidden bg-gray-900 p-10 text-white'
            >
              <div className='absolute inset-0 diagonal-stripe opacity-20' />
              <div className='absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-2xl' />
              <div className='relative z-10'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center'>
                    <Shield className='h-6 w-6 text-red-400' />
                  </div>
                  <div>
                    <p className='text-white/40 text-xs uppercase tracking-wider'>
                      Ongoing Admission
                    </p>
                    <h3 className='text-white font-bold text-lg'>
                      Cyber Security
                    </h3>
                  </div>
                </div>
                <h2 className='font-display text-5xl text-white mb-4 leading-none'>
                  BUILD A SKILL
                  <br />
                  <span className='text-red-400'>IN CYBER</span>
                </h2>
                <p className='text-white/50 text-sm mb-8'>
                  Master the skills that protect organisations worldwide — from
                  network defence to ethical hacking.
                </p>
                <div className='grid grid-cols-2 gap-2 mb-8'>
                  {[
                    'Network Security',
                    'Ethical Hacking',
                    'Risk Management',
                    'Security Protocols',
                    'Incident Response',
                    'Penetration Testing',
                  ].map((m) => (
                    <div
                      key={m}
                      className='flex items-center gap-2 text-xs text-white/60'
                    >
                      <CheckCircle2 className='h-3.5 w-3.5 text-red-400 shrink-0' />
                      {m}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowPopup(true)}
                  className='px-6 py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-400 transition-colors'
                >
                  Enroll in Cyber Security
                </button>
              </div>
            </motion.div>

            {/* Data Analysis Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='relative rounded-3xl overflow-hidden bg-[#1a0a2e] p-10 text-white'
            >
              <div className='absolute inset-0 diagonal-stripe opacity-20' />
              <div className='absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl' />
              <div className='relative z-10'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center'>
                    <BarChart className='h-6 w-6 text-purple-400' />
                  </div>
                  <div>
                    <p className='text-white/40 text-xs uppercase tracking-wider'>
                      Ongoing Admission
                    </p>
                    <h3 className='text-white font-bold text-lg'>
                      Data Analysis
                    </h3>
                  </div>
                </div>
                <h2 className='font-display text-5xl text-white mb-4 leading-none'>
                  BUILD A SKILL
                  <br />
                  <span className='text-purple-400'>IN DATA</span>
                </h2>
                <p className='text-white/50 text-sm mb-8'>
                  Turn raw numbers into strategic decisions. Learn the tools
                  that power Nigeria's fastest-growing industries.
                </p>
                <div className='grid grid-cols-2 gap-2 mb-8'>
                  {[
                    'Microsoft Excel',
                    'SQL Querying',
                    'Data Visualisation',
                    'Power BI',
                    'Business Intelligence',
                    'Statistical Analysis',
                  ].map((m) => (
                    <div
                      key={m}
                      className='flex items-center gap-2 text-xs text-white/60'
                    >
                      <CheckCircle2 className='h-3.5 w-3.5 text-purple-400 shrink-0' />
                      {m}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowPopup(true)}
                  className='px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-500 transition-colors'
                >
                  Enroll in Data Analysis
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROJECT MANAGEMENT SPOTLIGHT ─────────────────────────────────── */}
      <section className='py-28 bg-[#fafaf7]'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
            <div className='lg:col-span-5'>
              <p className='section-line text-emerald-600 text-xs uppercase tracking-[0.3em] font-bold mb-6'>
                Professional Skills
              </p>
              <h2 className='font-serif-dm text-5xl md:text-6xl text-gray-900 leading-tight mb-6'>
                Learn Project
                <br />
                <em>
                  Management
                  <br />
                  with AOCA
                </em>
              </h2>
              <p className='text-gray-500 leading-relaxed mb-8'>
                Lead teams, manage timelines, and deliver results. Our project
                management course is aligned with global PMP standards — ideal
                for professionals targeting corporate roles in Nigeria and
                abroad.
              </p>
              <div className='flex items-center gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 mb-8'>
                <div className='w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center shrink-0'>
                  <Wifi className='h-5 w-5 text-emerald-600' />
                </div>
                <div>
                  <p className='text-emerald-800 font-bold text-sm'>
                    Online & Physical Classes Available
                  </p>
                  <p className='text-emerald-600/60 text-xs'>
                    Lagos · Port Harcourt · Live Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPopup(true)}
                className='group inline-flex items-center gap-2 px-8 py-4 bg-[#0a1f12] text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all'
              >
                Hurry — Register Now
                <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </button>
            </div>

            <div className='lg:col-span-7'>
              <div className='grid grid-cols-2 gap-4'>
                {[
                  {
                    title: 'Project Planning',
                    desc: 'Define scope, set goals, and map out every phase of your project with precision.',
                    icon: Target,
                  },
                  {
                    title: 'Scheduling & Timelines',
                    desc: 'Master Gantt charts, milestone tracking, and deadline management.',
                    icon: Clock,
                  },
                  {
                    title: 'Agile Methodology',
                    desc: 'Work in sprints, manage backlogs, and lead agile teams effectively.',
                    icon: Zap,
                  },
                  {
                    title: 'Risk Management',
                    desc: 'Identify, assess, and mitigate project risks before they become problems.',
                    icon: Shield,
                  },
                ].map((mod, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className='bg-white rounded-2xl border border-gray-100 p-6 card-hover'
                  >
                    <div className='w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4'>
                      <mod.icon className='h-5 w-5 text-emerald-600' />
                    </div>
                    <h4 className='font-bold text-gray-900 mb-2'>
                      {mod.title}
                    </h4>
                    <p className='text-gray-500 text-sm leading-relaxed'>
                      {mod.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY AOCA ─────────────────────────────────────────────────────── */}
      <section className='py-28 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <p className='section-line text-emerald-600 text-xs uppercase tracking-[0.3em] font-bold mb-4'>
              Why Choose Us
            </p>
            <h2 className='font-serif-dm text-5xl text-gray-900 mb-4'>
              The AOCA Advantage
            </h2>
            <p className='text-gray-500 leading-relaxed'>
              We don't just teach — we deliver results. Here's what makes AOCA
              different from every other training centre in Nigeria.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='p-8 rounded-3xl bg-gray-50 border border-gray-100 card-hover text-center'
              >
                <div className='w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                  <item.icon className='h-7 w-7 text-emerald-600' />
                </div>
                <h3 className='font-bold text-gray-900 text-lg mb-3'>
                  {item.title}
                </h3>
                <p className='text-gray-500 text-sm leading-relaxed'>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className='py-28 bg-[#fafaf7]'>
        <div className='container mx-auto px-6'>
          <div className='mb-16'>
            <p className='section-line text-emerald-600 text-xs uppercase tracking-[0.3em] font-bold mb-4'>
              Success Stories
            </p>
            <h2 className='font-serif-dm text-5xl text-gray-900'>
              What Our Students Say
            </h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              {
                name: 'Blessing Udom',
                program: 'IELTS Preparation',
                score: 'Band 7.5',
                text: 'I passed my IELTS on the first attempt thanks to AOCA. The instructors were incredibly patient and the practice materials were more thorough than anything I found elsewhere.',
              },
              {
                name: 'Michael Okonkwo',
                program: 'Python Programming',
                text: 'I came in with zero coding experience. Three months later I was building my own web applications. The practical project-based approach really changes how you learn.',
              },
              {
                name: 'Chioma Eze',
                program: 'GMAT Preparation',
                score: '720 Score',
                text: 'The GMAT prep was intense — but that intensity is exactly what I needed. I got into my dream business school with a scholarship. AOCA delivers on its promises.',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='bg-white rounded-3xl border border-gray-100 p-8 card-hover'
              >
                <div className='flex gap-1 mb-5'>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className='h-4 w-4 fill-amber-400 text-amber-400'
                    />
                  ))}
                </div>
                <p className='text-gray-600 leading-relaxed mb-6 italic text-sm'>
                  "{t.text}"
                </p>
                <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
                  <div className='w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700 text-sm'>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className='font-bold text-gray-900 text-sm'>{t.name}</p>
                    <p className='text-emerald-600 text-xs font-semibold'>
                      {t.program}
                      {t.score && ` · ${t.score}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className='py-28 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
            <div>
              <p className='section-line text-emerald-600 text-xs uppercase tracking-[0.3em] font-bold mb-6'>
                FAQs
              </p>
              <h2 className='font-serif-dm text-5xl text-gray-900 mb-6'>
                Got Questions?
              </h2>
              <p className='text-gray-500 leading-relaxed mb-10'>
                Everything you need to know before enrolling. Still unsure? Call
                us directly.
              </p>
              <div className='space-y-3'>
                <div className='flex items-center gap-3 text-sm text-gray-600'>
                  <Phone className='h-4 w-4 text-emerald-500' />
                  <span>09038013105, 08038713612</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-600'>
                  <Mail className='h-4 w-4 text-emerald-500' />
                  <span>info@aocaresourcesltd.com</span>
                </div>
                <div className='flex items-start gap-3 text-sm text-gray-600'>
                  <MapPin className='h-4 w-4 text-emerald-500 mt-0.5' />
                  <span>No 70 Eligbolo Road, Rumudumaya, Port Harcourt</span>
                </div>
              </div>
            </div>
            <div className='space-y-3'>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className='rounded-2xl border border-gray-100 overflow-hidden'
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className='w-full p-6 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors'
                  >
                    <span className='font-semibold text-gray-900 text-sm pr-4'>
                      {faq.q}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 text-emerald-600 shrink-0 transition-transform ${faqOpen === i ? 'rotate-90' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className='overflow-hidden'
                      >
                        <p className='p-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100'>
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

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className='py-28 bg-[#0a1f12] relative overflow-hidden noise'>
        <div className='absolute inset-0 diagonal-stripe opacity-30' />
        <div className='absolute top-0 left-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2' />
        <div className='relative z-10 container mx-auto px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className='text-emerald-400 text-xs uppercase tracking-[0.4em] font-bold mb-6'>
              Ready to Start?
            </p>
            <h2 className='font-display text-[clamp(3.5rem,9vw,8rem)] text-white leading-none mb-6'>
              APPLY NOW.
              <br />
              <span className='gradient-text'>IT'S FREE.</span>
            </h2>
            <p className='text-white/50 text-xl font-light max-w-xl mx-auto mb-12'>
              Join thousands of successful AOCA graduates. Limited seats for the
              2026 intake — enrollment closes once full.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={() => setShowPopup(true)}
                className='group px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-[0_8px_40px_rgba(22,163,74,0.4)] flex items-center justify-center gap-2'
              >
                Apply Now — No Application Fee
                <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </button>
              <a
                href='tel:09038013105'
                className='px-10 py-5 bg-white/5 border border-white/20 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2'
              >
                <Phone className='h-4 w-4' /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AdmissionLandingPage;

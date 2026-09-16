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
  Languages,
  Plane,
  BriefcaseBusiness,
  Navigation,
  BookMarked,
  HeartHandshake,
} from 'lucide-react';

// ─── FONTS ───────────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap');
    body { font-family: var(--font-sans); }
    .card-hover { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.12); }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
    .animate-float { animation: float 4s ease-in-out infinite; }
    .pulse-ring::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid var(--color-primary);
      animation: pulse-ring 2s ease-out infinite;
    }
    .section-line::before {
      content: '';
      display: inline-block;
      width: 32px;
      height: 2px;
      background: var(--color-primary);
      margin-right: 12px;
      vertical-align: middle;
    }
    .noise::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      opacity: 0.06;
      pointer-events: none;
      z-index: 0;
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
    { value: 'ielts', label: 'IELTS Preparation', group: 'Exam Preparation' },
    { value: 'gmat', label: 'GMAT Preparation', group: 'Exam Preparation' },
    { value: 'sat', label: 'SAT Preparation', group: 'Exam Preparation' },
    { value: 'gre', label: 'GRE Preparation', group: 'Exam Preparation' },
    { value: 'gcse', label: 'GCSE Preparation', group: 'Exam Preparation' },
    { value: 'toefl', label: 'TOEFL Preparation', group: 'Exam Preparation' },
    {
      value: 'german-a1',
      label: 'German Language — A1 (Beginner)',
      group: 'Language Training',
    },
    {
      value: 'german-a2',
      label: 'German Language — A2 (Elementary)',
      group: 'Language Training',
    },
    {
      value: 'german-b1',
      label: 'German Language — B1 (Intermediate)',
      group: 'Language Training',
    },
    {
      value: 'german-b2',
      label: 'German Language — B2 (Upper Intermediate)',
      group: 'Language Training',
    },
    {
      value: 'german-c1',
      label: 'German Language — C1 (Advanced)',
      group: 'Language Training',
    },
    {
      value: 'french-a1',
      label: 'French Language — A1 (Beginner)',
      group: 'Language Training',
    },
    {
      value: 'french-a2',
      label: 'French Language — A2 (Elementary)',
      group: 'Language Training',
    },
    {
      value: 'french-b1',
      label: 'French Language — B1 (Intermediate)',
      group: 'Language Training',
    },
    {
      value: 'french-b2',
      label: 'French Language — B2 (Upper Intermediate)',
      group: 'Language Training',
    },
    {
      value: 'french-c1',
      label: 'French Language — C1 (Advanced)',
      group: 'Language Training',
    },
    {
      value: 'german-visa',
      label: 'German Visa Travel Consultancy',
      group: 'Visa & Travel',
    },
    {
      value: 'study-abroad',
      label: 'Study Abroad Placement',
      group: 'Visa & Travel',
    },
    {
      value: 'relocation',
      label: 'Relocation & Settlement Support',
      group: 'Visa & Travel',
    },
    {
      value: 'data-analysis',
      label: 'Data Analysis',
      group: 'Professional Training',
    },
    {
      value: 'project-management',
      label: 'Project Management',
      group: 'Professional Training',
    },
    {
      value: 'computer-programming',
      label: 'Computer Programming',
      group: 'Professional Training',
    },
    {
      value: 'hse-level-1',
      label: 'HSE Level 1',
      group: 'Professional Training',
    },
    {
      value: 'hse-level-2',
      label: 'HSE Level 2',
      group: 'Professional Training',
    },
    {
      value: 'hse-level-3',
      label: 'HSE Level 3',
      group: 'Professional Training',
    },
    { value: 'ict-basic', label: 'ICT Basic Programs', group: 'ICT Programs' },
    {
      value: 'ict-advanced',
      label: 'ICT Advanced Programs',
      group: 'ICT Programs',
    },
    { value: 'python', label: 'Python Programming', group: 'ICT Programs' },
    {
      value: 'web-development',
      label: 'Web Development',
      group: 'ICT Programs',
    },
    { value: 'cyber-security', label: 'Cyber Security', group: 'ICT Programs' },
    { value: 'kids-tech', label: 'Kids Tech Programs', group: 'Kids & Teens' },
    {
      value: 'teens-tech',
      label: 'Teens Tech Programs',
      group: 'Kids & Teens',
    },
    { value: 'scratch', label: 'Scratch Programming', group: 'Kids & Teens' },
    {
      value: 'job-placement',
      label: 'Job Placement Assistance',
      group: 'Jobs & Career',
    },
    {
      value: 'cv-interview',
      label: 'CV Writing & Interview Prep',
      group: 'Jobs & Career',
    },
    {
      value: 'career-counselling',
      label: 'Career Counselling',
      group: 'Jobs & Career',
    },
  ];

  const grouped = programs.reduce((acc, p) => {
    if (!acc[p.group]) acc[p.group] = [];
    acc[p.group].push(p);
    return acc;
  }, {});

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            style={{ zIndex: 9998 }}
          />

          <div
            className="fixed inset-0 overflow-y-auto"
            style={{ zIndex: 9999 }}
          >
            <div
              className="flex min-h-full items-start justify-center p-4 pt-10 pb-10"
              onClick={onClose}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                className="relative w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute -top-5 right-0 z-20 w-12 h-12 rounded-full bg-surface-container-lowest shadow-2xl border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container active:scale-95 transition-all"
                  style={{ touchAction: 'manipulation' }}
                >
                  <X className="h-5 w-5 text-on-surface" />
                </button>

                <div className="relative bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/30">
                  <div className="grid grid-cols-1 md:grid-cols-5">
                    {/* Left panel */}
                    <div className="md:col-span-2 relative overflow-hidden bg-primary">
                      <div className="absolute inset-0 diagonal-stripe opacity-20" />
                      <div className="absolute top-0 right-0 w-48 h-48 bg-primary-container/30 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-container/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl" />

                      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-[340px]">
                        <div>
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary-container/30 border border-primary-container/40 rounded-xl flex items-center justify-center">
                              <GraduationCap className="h-5 w-5 text-on-primary" />
                            </div>
                            <span className="text-on-primary font-bold tracking-widest text-sm uppercase">
                              AOCA Resources
                            </span>
                          </div>

                          <div className="mb-6">
                            <p className="text-on-primary-container text-xs uppercase tracking-[0.3em] font-bold mb-2">
                              Now Open
                            </p>
                            <h2 className="font-display-hero text-5xl text-on-primary leading-none mb-3">
                              THE
                              <br />
                              INTAKE
                            </h2>
                            <p className="text-on-primary/60 text-sm font-light">
                              Smart students &amp; ambitious professionals
                              choose AOCA for their future.
                            </p>
                          </div>

                          <div className="space-y-4 mb-8">
                            {[
                              {
                                icon: Award,
                                label: 'Exam Prep',
                                sub: 'IELTS · GMAT · SAT · GRE · GCSE · TOEFL',
                              },
                              {
                                icon: Languages,
                                label: 'German Language',
                                sub: 'A1 · A2 · B1 · B2 · C1 Levels',
                              },
                              {
                                icon: Plane,
                                label: 'Travel & Migration',
                                sub: 'Visa · Study Abroad · Relocation',
                              },
                              {
                                icon: BriefcaseBusiness,
                                label: 'Jobs & Career',
                                sub: 'Placement · CV Writing · Counselling',
                              },
                              {
                                icon: Code,
                                label: 'Programming',
                                sub: 'Scratch · Python · Web Development',
                              },
                              {
                                icon: Shield,
                                label: 'Cyber Security & Data',
                                sub: 'Network · Hacking · Analysis · BI',
                              },
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-lg bg-primary-container/15 border border-primary-container/25 flex items-center justify-center shrink-0 mt-0.5">
                                  <item.icon className="h-3.5 w-3.5 text-on-primary-container" />
                                </div>
                                <div>
                                  <p className="text-on-primary text-xs font-semibold uppercase tracking-wider">
                                    {item.label}
                                  </p>
                                  <p className="text-on-primary/40 text-xs">
                                    {item.sub}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 border-t border-on-primary/10 pt-6">
                          <div className="flex items-center gap-2 text-on-primary/50 text-xs">
                            <Wifi className="h-3 w-3 text-on-primary-container" />
                            <span>Online &amp; Physical Classes Available</span>
                          </div>
                          <div className="flex items-center gap-2 text-on-primary/50 text-xs">
                            <Phone className="h-3 w-3 text-on-primary-container" />
                            <span>09038013105, 08038713612</span>
                          </div>
                          <div className="flex items-center gap-2 text-on-primary/50 text-xs">
                            <MapPin className="h-3 w-3 text-on-primary-container" />
                            <span>
                              No 70 Eligbolo Rd, Rumudumaya, Port Harcourt
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right — form */}
                    <div className="md:col-span-3 p-8 md:p-10 bg-surface-container-lowest">
                      <div className="mb-6">
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                          Apply Now
                        </h3>
                        <p className="text-on-surface-variant text-sm">
                          Fill in your details and we'll contact you with next
                          steps.
                        </p>
                      </div>

                      {status === 'success' ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-16"
                        >
                          <div className="w-20 h-20 bg-primary-container/15 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="h-10 w-10 text-primary" />
                          </div>
                          <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                            Application Submitted!
                          </h4>
                          <p className="text-on-surface-variant text-sm">
                            Our admissions team will contact you shortly.
                          </p>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            {['first_name', 'last_name'].map((field) => (
                              <div key={field}>
                                <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                                  {field === 'first_name'
                                    ? 'First Name'
                                    : 'Last Name'}
                                </label>
                                <input
                                  required
                                  type="text"
                                  name={field}
                                  value={formData[field]}
                                  onChange={handleChange}
                                  placeholder={
                                    field === 'first_name' ? 'John' : 'Doe'
                                  }
                                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-body-md font-body-md"
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
                              <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                                {field.label}
                              </label>
                              <input
                                required
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-body-sm"
                              />
                            </div>
                          ))}

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                                Program
                              </label>
                              <select
                                required
                                name="program"
                                value={formData.program}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-body-sm"
                              >
                                <option value="">Select program</option>
                                {Object.entries(grouped).map(
                                  ([group, items]) => (
                                    <optgroup key={group} label={group}>
                                      {items.map((p) => (
                                        <option key={p.value} value={p.value}>
                                          {p.label}
                                        </option>
                                      ))}
                                    </optgroup>
                                  ),
                                )}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                                Location
                              </label>
                              <select
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-body-sm"
                              >
                                <option value="">Select location</option>
                                {locations.map((l) => (
                                  <option key={l.value} value={l.value}>
                                    {l.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                              Message (Optional)
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={2}
                              placeholder="Any specific questions?"
                              className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-body-sm resize-none"
                            />
                          </div>

                          {status === 'error' && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-xs">
                              <AlertCircle className="h-4 w-4 shrink-0" />
                              {errorMessage}
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {status === 'loading' ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Apply Now <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </button>
                          <p className="text-xs text-on-surface-variant text-center">
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
  const [activeTab, setActiveTab] = useState('apply');

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: '5000', suffix: '+', label: 'Students & Professionals' },
    { value: '25', suffix: '+', label: 'Expert Tutors' },
    { value: '94', suffix: '%', label: 'Success Rate' },
    { value: '15', suffix: '+', label: 'Years Experience' },
  ];

  const categories = [
    { id: 'german-visa', label: 'German Visa', icon: Plane },
    { id: 'german', label: 'German Language', icon: Languages },
    { id: 'french', label: 'French Language', icon: Globe },
    { id: 'exams', label: 'Exam Prep', icon: Award },
    { id: 'corporate', label: 'Corporate Training', icon: BriefcaseBusiness },
    { id: 'ict', label: 'ICT Programs', icon: Laptop },
    { id: 'kids', label: 'Kids & Teens', icon: Users },
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
    german: [
      {
        name: 'German A1',
        sub: 'Complete beginner — greetings, introductions, everyday phrases',
        level: 'Beginner',
        duration: '8 weeks',
        icon: Languages,
        color: 'from-yellow-400 to-amber-500',
        modules: [
          'Alphabet & Pronunciation',
          'Greetings & Introductions',
          'Numbers & Dates',
          'Basic Sentences',
        ],
      },
      {
        name: 'German A2',
        sub: 'Elementary — shopping, transport, simple conversations',
        level: 'Elementary',
        duration: '8 weeks',
        icon: Languages,
        color: 'from-amber-500 to-orange-500',
        modules: [
          'Daily Routines',
          'Shopping & Money',
          'Travel Phrases',
          'Past Tense (Perfekt)',
        ],
      },
      {
        name: 'German B1',
        sub: 'Intermediate — work, studies, opinions, longer conversations',
        level: 'Intermediate',
        duration: '10 weeks',
        icon: Languages,
        color: 'from-orange-500 to-red-500',
        modules: [
          'Work & Career Talk',
          'Expressing Opinions',
          'Letters & Emails',
          'Subordinate Clauses',
        ],
      },
      {
        name: 'German B2',
        sub: 'Upper Intermediate — fluent conversations, academic & professional use',
        level: 'Upper Intermediate',
        duration: '12 weeks',
        icon: Languages,
        color: 'from-red-500 to-rose-600',
        modules: [
          'Complex Grammar',
          'Academic Writing',
          'Debates & Presentations',
          'Professional German',
        ],
      },
      {
        name: 'German C1',
        sub: 'Advanced — near-native fluency for work and university in Germany',
        level: 'Advanced',
        duration: '14 weeks',
        icon: Languages,
        color: 'from-rose-600 to-purple-600',
        modules: [
          'Nuanced Expression',
          'Academic Texts',
          'Native Media',
          'TestDaF / DSH Prep',
        ],
      },
    ],
    french: [
      {
        name: 'French A1',
        sub: 'Complete beginner — greetings, introductions, everyday phrases',
        level: 'Beginner',
        duration: '8 weeks',
        icon: Globe,
        color: 'from-blue-400 to-blue-500',
        modules: [
          'Alphabet & Pronunciation',
          'Greetings & Introductions',
          'Numbers & Dates',
          'Basic Sentences',
        ],
      },
      {
        name: 'French A2',
        sub: 'Elementary — shopping, transport, simple conversations',
        level: 'Elementary',
        duration: '8 weeks',
        icon: Globe,
        color: 'from-blue-500 to-indigo-500',
        modules: [
          'Daily Routines',
          'Shopping & Money',
          'Travel Phrases',
          'Past Tense (Passé Composé)',
        ],
      },
      {
        name: 'French B1',
        sub: 'Intermediate — work, studies, opinions, longer conversations',
        level: 'Intermediate',
        duration: '10 weeks',
        icon: Globe,
        color: 'from-indigo-500 to-purple-500',
        modules: [
          'Work & Career Talk',
          'Expressing Opinions',
          'Letters & Emails',
          'Subordinate Clauses',
        ],
      },
      {
        name: 'French B2',
        sub: 'Upper Intermediate — fluent conversations, academic & professional use',
        level: 'Upper Intermediate',
        duration: '12 weeks',
        icon: Globe,
        color: 'from-purple-500 to-pink-500',
        modules: [
          'Complex Grammar',
          'Academic Writing',
          'Debates & Presentations',
          'Professional French',
        ],
      },
      {
        name: 'French C1',
        sub: 'Advanced — near-native fluency for work and study in French-speaking countries',
        level: 'Advanced',
        duration: '14 weeks',
        icon: Globe,
        color: 'from-pink-500 to-rose-600',
        modules: [
          'Nuanced Expression',
          'Academic Texts',
          'Native Media',
          'DELF / DALF Prep',
        ],
      },
    ],
    'german-visa': [
      {
        name: 'German Visa Travel Consultancy',
        sub: 'Expert guidance for your journey to Germany',
        level: 'All Profiles',
        duration: 'Flexible',
        icon: Plane,
        color: 'from-blue-600 to-cyan-600',
        modules: [
          'Visa Application Support',
          'Document Preparation',
          'Embassy Interview Prep',
          'Travel Insurance Guidance',
        ],
      },
      {
        name: 'Study Abroad Placement',
        sub: 'We help you find, apply to, and land a spot in top foreign universities',
        level: 'Students',
        duration: 'Ongoing',
        icon: GraduationCap,
        color: 'from-blue-600 to-cyan-600',
        modules: [
          'School Selection',
          'Application Essays',
          'Scholarship Search',
          'Pre-Departure Briefing',
        ],
      },
      {
        name: 'Job Placement Assistance',
        sub: 'Connecting Nigerian professionals with verified jobs in Nigeria and abroad',
        level: 'Professionals',
        duration: 'Ongoing',
        icon: BriefcaseBusiness,
        color: 'from-violet-500 to-purple-600',
        modules: [
          'CV & LinkedIn Optimisation',
          'Interview Coaching',
          'Job Board Access',
          'Employer Referrals',
        ],
      },
      {
        name: 'CV Writing & Interview Prep',
        sub: 'Stand out from the crowd with a professional CV and confident interview skills',
        level: 'All Levels',
        duration: '2 weeks',
        icon: Briefcase,
        color: 'from-slate-500 to-gray-600',
        modules: [
          'ATS-Optimised CV',
          'Cover Letter Writing',
          'Mock Interviews',
          'Salary Negotiation',
        ],
      },
      {
        name: 'Career Counselling',
        sub: 'Clarity on your career direction — personalized 1-on-1 sessions',
        level: 'All Levels',
        duration: 'Flexible',
        icon: Target,
        color: 'from-pink-500 to-rose-500',
        modules: [
          'Skills Assessment',
          'Career Roadmap',
          'Industry Insights',
          'Goal Setting',
        ],
      },
    ],
    corporate: [
      {
        name: 'Data Analysis Training',
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
      {
        name: 'Project Management',
        sub: 'Industry-aligned curriculum for professional certification',
        level: 'All Levels',
        duration: '10 weeks',
        icon: Briefcase,
        color: 'from-indigo-600 to-blue-600',
        modules: [
          'Project Planning',
          'Scheduling & Timelines',
          'Agile Methodology',
          'Risk Management',
        ],
      },
      {
        name: 'Computer Programming',
        sub: 'Python · Web Development · Software Engineering',
        level: 'Beginner → Advanced',
        duration: '12 weeks',
        icon: Code,
        color: 'from-blue-500 to-indigo-600',
        modules: [
          'Python Fundamentals',
          'Web Development (HTML/CSS/JS)',
          'Software Engineering Practices',
          'Portfolio Building',
        ],
      },
      {
        name: 'HSE Level 1',
        sub: 'Health, Safety & Environment — Foundation level',
        level: 'Beginner',
        duration: '4 weeks',
        icon: Shield,
        color: 'from-teal-600 to-cyan-700',
        modules: [
          'Safety Principles',
          'Risk Assessment',
          'Emergency Procedures',
          'Environmental Awareness',
        ],
      },
      {
        name: 'HSE Level 2',
        sub: 'Health, Safety & Environment — Intermediate level',
        level: 'Intermediate',
        duration: '6 weeks',
        icon: Shield,
        color: 'from-amber-500 to-orange-600',
        modules: [
          'Advanced Safety Management',
          'Incident Investigation',
          'Hazard Identification',
          'Safety Leadership',
        ],
      },
      {
        name: 'HSE Level 3',
        sub: 'Health, Safety & Environment — Advanced level',
        level: 'Advanced',
        duration: '8 weeks',
        icon: Shield,
        color: 'from-red-500 to-rose-600',
        modules: [
          'Strategic Safety Management',
          'Organisational Safety Culture',
          'Advanced Risk Management',
          'Compliance & Auditing',
        ],
      },
    ],
    ict: [
      {
        name: 'ICT Basic Programs',
        sub: 'Computer literacy and foundational digital skills',
        level: 'Beginner',
        duration: '6 weeks',
        icon: Laptop,
        color: 'from-gray-500 to-gray-600',
        modules: [
          'Computer Fundamentals',
          'Microsoft Office Suite',
          'Internet & Email',
          'Digital Communication',
        ],
      },
      {
        name: 'ICT Advanced Programs',
        sub: 'Advanced digital skills for the modern workplace',
        level: 'Intermediate → Advanced',
        duration: '10 weeks',
        icon: Laptop,
        color: 'from-slate-600 to-slate-700',
        modules: [
          'Advanced Spreadsheets',
          'Database Management',
          'Cloud Computing Basics',
          'Cybersecurity Fundamentals',
        ],
      },
      {
        name: 'Python Programming',
        sub: 'Most in-demand language for data, AI & automation',
        level: 'Beginner → Advanced',
        duration: '12 weeks',
        icon: Code,
        color: 'from-cyan-500 to-teal-600',
        modules: [
          'Python Fundamentals',
          'Data Structures',
          'Automation Scripts',
          'Project Development',
        ],
      },
      {
        name: 'Web Development',
        sub: 'HTML, CSS & JavaScript — build real websites',
        level: 'Intermediate',
        duration: '14 weeks',
        icon: Monitor,
        color: 'from-blue-400 to-indigo-500',
        modules: [
          'HTML5 & CSS3',
          'JavaScript Fundamentals',
          'Responsive Design',
          'Deployment',
        ],
      },
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
    ],
    kids: [
      {
        name: 'Kids Tech Programs',
        sub: 'Fun tech courses for children ages 6-12',
        level: 'Beginner',
        age: 'Ages 6–12',
        duration: '8 weeks',
        icon: Users,
        color: 'from-yellow-400 to-orange-400',
        modules: [
          'Basic Computer Skills',
          'Scratch Programming',
          'Digital Art & Design',
          'Online Safety',
        ],
      },
      {
        name: 'Teens Tech Programs',
        sub: 'Advanced tech courses for teenagers ages 13-17',
        level: 'Intermediate → Advanced',
        age: 'Ages 13–17',
        duration: '12 weeks',
        icon: Users,
        color: 'from-blue-400 to-indigo-500',
        modules: [
          'Python Programming',
          'Web Development Basics',
          'Game Development',
          'Tech Career Exploration',
        ],
      },
      {
        name: 'Scratch Programming',
        sub: 'Visual block-based programming for beginners',
        level: 'Beginner',
        age: 'Ages 8–12',
        duration: '6 weeks',
        icon: Monitor,
        color: 'from-yellow-400 to-orange-400',
        modules: [
          'Scratch Basics',
          'Animation Projects',
          'Game Design',
          'Storytelling with Code',
        ],
      },
    ],
  };

  const faqs = [
    {
      q: 'Do I need prior experience to enroll?',
      a: 'No prior experience is needed for our beginner courses. For exam prep, basic English proficiency is recommended. For German, we start from absolute zero at A1. We assess each student during registration to ensure proper placement.',
    },
    {
      q: 'What German language levels do you offer?',
      a: "We offer German from A1 (complete beginner) through C1 (advanced/near-native). Each level is certified-aligned and prepares you for Goethe Institut or TELC exams. Whether you're learning for travel, work, or relocating to Germany, we have the right level for you.",
    },
    {
      q: 'Can you help me get a visa or find a job abroad?',
      a: 'Yes — our Travel & Migration team provides end-to-end visa counselling, study abroad placement, and job placement assistance. We guide you through applications, documentation, embassy preparation, and employer connections in Nigeria and internationally.',
    },
    {
      q: 'Do you offer online classes?',
      a: 'Yes — we offer live online classes with the same quality as our physical classes in Lagos and Port Harcourt. You can switch between modes based on your convenience.',
    },
    {
      q: 'What is the maximum class size?',
      a: 'We keep classes small — maximum 15 students — to ensure every student and professional gets personalized attention from the instructor.',
    },
    {
      q: 'Are study materials included?',
      a: 'Yes. All course materials, practice tests, past questions, and digital resources are included in your tuition at no extra cost.',
    },
    {
      q: 'What happens after I complete a course?',
      a: 'You receive an AOCA certificate of completion. For exam prep students, we provide post-course support during your actual exam registration. For German language graduates, we connect you with our Travel & Migration team for next steps toward studying or working in German-speaking countries.',
    },
  ];

  const whyUs = [
    {
      icon: Users,
      title: 'Small Class Sizes',
      desc: 'Maximum 15 students per class. Every student and professional gets direct attention from the instructor, not a lecture hall experience.',
    },
    {
      icon: Wifi,
      title: 'Online & Physical',
      desc: 'Attend from anywhere via our live online platform, or walk into our Lagos and Port Harcourt centres.',
    },
    {
      icon: Target,
      title: '94% Pass Rate',
      desc: 'The results speak for themselves. Most of our students and professionals hit their target scores and goals on the very first attempt.',
    },
    {
      icon: Globe,
      title: 'End-to-End Support',
      desc: "From language training to visa counselling to job placement — AOCA takes you from learning to landing, wherever in the world you're headed.",
    },
  ];

  const trackingSteps = [
    {
      step: '1',
      title: 'Application Received',
      desc: 'We review your details and confirm receipt within 24 hours.',
      status: 'complete',
    },
    {
      step: '2',
      title: 'Document Verification',
      desc: 'Our team validates your credentials and required documents.',
      status: 'active',
    },
    {
      step: '3',
      title: 'Interview & Assessment',
      desc: 'Shortlisted candidates attend a placement interview.',
      status: 'pending',
    },
    {
      step: '4',
      title: 'Enrollment Confirmed',
      desc: 'Receive your acceptance letter and schedule details.',
      status: 'pending',
    },
  ];

  const candidateDossier = {
    name: 'Oluwaseun A.',
    program: 'German B1',
    intake: '2026 Spring Intake',
    status: 'In Review',
    progress: 65,
    documents: [
      { name: 'Passport Copy', submitted: true },
      { name: 'Academic Transcripts', submitted: true },
      { name: 'Passport Photos', submitted: true },
      { name: 'Recommendation Letter', submitted: false },
    ],
    notes: 'Application is under review. Interview scheduled for next week.',
  };

  return (
    <>
      <FontLoader />
      <AdmissionPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />

      {/* ── TOP STATUS BAR ─────────────────────────────────────────────────── */}
      <div className="bg-primary text-on-primary py-space-xs px-margin-mobile md:px-margin-tablet lg:px-margin">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-primary/15 text-on-primary font-label-caps font-label-md">
              <span className="w-1.5 h-1.5 rounded-full bg-on-primary animate-pulse" />
              2026 Intake Open
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-on-primary/70">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              Lagos Campus
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Port Harcourt
            </span>
            <span className="flex items-center gap-1.5">
              <Wifi className="h-3.5 w-3.5" />
              Live Online
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-on-primary-container" />
            <span className="text-on-primary-container font-label-caps font-label-md">
              ICAN Accredited
            </span>
          </div>
        </div>
      </div>

      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      {/* <header className='fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]'>
        <div className='px-margin-mobile md:px-margin-tablet lg:px-margin'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center gap-2'>
              <GraduationCap className='h-7 w-7 text-primary' />
              <span className='font-display-hero text-xl text-on-surface tracking-tight'>
                AOCA
              </span>
            </div>
            <nav className='hidden md:flex items-center gap-8'>
              {['Programs', 'German', 'Visa', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className='text-sm font-label-md text-on-surface-variant hover:text-primary transition-colors'
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className='flex items-center gap-3'>
              <a
                href='tel:09038013105'
                className='hidden sm:flex items-center gap-1.5 text-sm font-label-md text-on-surface-variant hover:text-primary transition-colors'
              >
                <Phone className='h-4 w-4' />
                0903 801 3105
              </a>
              <button
                onClick={() => setShowPopup(true)}
                className='px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container transition-all'
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* ── HERO SECTION ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-surface-container-low via-surface to-surface-container-lowest px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-primary-container/10 border border-primary/20">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary text-xs font-label-caps font-bold uppercase tracking-[0.3em]">
                  Admissions Open — 2026
                </span>
              </div>

              <div className="mb-6">
                <p className="text-on-surface-variant text-sm uppercase tracking-[0.4em] font-label-caps font-bold mb-3">
                  AOCA Resources
                </p>
                <h1 className="font-display-hero text-display-hero text-on-surface leading-none">
                  THE
                  <br />
                  <span className="text-primary-container italic font-serif">
                    INTAKE
                  </span>
                </h1>
              </div>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">
                Nigeria's most trusted centre for students and professionals.
                Exam prep, German language, travel &amp; visa support, job
                placement, programming, cyber security, data analysis, and
                project management.
              </p>

              {/* Urgency alert banner */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary-container/10 border border-primary/20 mb-8">
                <div className="w-10 h-10 bg-primary-container/15 rounded-xl flex items-center justify-center shrink-0 relative pulse-ring">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-primary font-label-md text-label-md font-bold">
                    Limited Seats Remaining
                  </p>
                  <p className="text-on-surface-variant text-sm">
                    Enrollment closes once seats are filled. Apply today.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => setShowPopup(true)}
                  className="group px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                >
                  Apply Now — Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#programs"
                  className="px-8 py-4 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-md text-label-md font-semibold border border-outline-variant/30 transition-all flex items-center justify-center gap-2"
                >
                  View All Programs
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {[
                  { icon: Building2, label: 'Lagos Campus' },
                  { icon: MapPin, label: 'Port Harcourt' },
                  { icon: Wifi, label: 'Live Online' },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-on-surface-variant text-sm"
                  >
                    <m.icon className="h-4 w-4 text-primary" />
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Classroom image placeholder */}
              <div className="relative rounded-3xl overflow-hidden bg-surface-container-lowest shadow-lg border border-outline-variant/30 mb-6">
                <div className="aspect-[4/3] bg-gradient-to-br from-surface-container-low to-surface-container flex items-center justify-center">
                  <div className="text-center">
                    <GraduationCap className="h-16 w-16 text-primary/30 mx-auto mb-3" />
                    <p className="text-on-surface-variant text-sm">
                      Modern classrooms, expert instructors
                    </p>
                  </div>
                </div>
                {/* Floating credibility stamp */}
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-on-surface">
                        ICAN Accredited
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Since 2010
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-surface-container-lowest rounded-2xl p-6 shadow-md border border-outline-variant/30"
                  >
                    <div className="text-4xl font-display-hero text-primary mb-1">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-on-surface-variant text-xs font-label-caps uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────────── */}
      {activeTab === 'apply' ? (
        <>
          {/* ── GERMAN LANGUAGE SECTION ─────────────────────────────────────── */}
          <section className="bg-surface-container-lowest px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
            <div className="mb-12">
              <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-4">
                Language Training
              </p>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight max-w-xl">
                  German Language
                  <br />
                  <em>Levels A1 – C1</em>
                </h2>
                <p className="text-on-surface-variant max-w-sm leading-relaxed">
                  Certified-aligned courses preparing you for Goethe Institut or
                  TELC exams. B1 is the minimum requirement for most German visa
                  categories.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  level: 'A1',
                  label: 'Beginner',
                  desc: 'Greetings, numbers, basic introductions. Perfect starting point.',
                  weeks: '8 weeks',
                  exam: 'Goethe A1 / TELC A1',
                  highlighted: false,
                },
                {
                  level: 'A2',
                  label: 'Elementary',
                  desc: 'Shopping, transport, simple conversations about daily life.',
                  weeks: '8 weeks',
                  exam: 'Goethe A2 / TELC A2',
                  highlighted: false,
                },
                {
                  level: 'B1',
                  label: 'Intermediate',
                  desc: 'Work & study discussions, opinions, longer interactions.',
                  weeks: '10 weeks',
                  exam: 'Goethe B1 / TELC B1',
                  highlighted: true,
                },
                {
                  level: 'B2',
                  label: 'Upper-Intermediate',
                  desc: 'Fluent conversation, academic & professional use.',
                  weeks: '12 weeks',
                  exam: 'Goethe B2 / TELC B2',
                  highlighted: false,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl shadow-md border p-6 card-hover ${
                    item.highlighted
                      ? 'bg-primary-container text-on-primary border-primary/30'
                      : 'bg-surface-container-lowest border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        item.highlighted
                          ? 'bg-on-primary/15'
                          : 'bg-primary-container/10'
                      }`}
                    >
                      <span
                        className={`font-display-hero text-xl ${
                          item.highlighted ? 'text-on-primary' : 'text-primary'
                        }`}
                      >
                        {item.level}
                      </span>
                    </div>
                    {item.highlighted && (
                      <span className="px-2.5 py-1 rounded-full bg-on-primary text-on-primary-container text-xs font-label-caps font-bold uppercase">
                        Visa Crucial Level
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-headline-sm text-headline-sm mb-2 ${
                      item.highlighted ? 'text-on-primary' : 'text-on-surface'
                    }`}
                  >
                    {item.label}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      item.highlighted
                        ? 'text-on-primary/70'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {item.desc}
                  </p>
                  <div
                    className={`space-y-2 mb-6 text-xs ${
                      item.highlighted
                        ? 'text-on-primary/60'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {item.weeks}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookMarked className="h-3.5 w-3.5" />
                      {item.exam}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPopup(true)}
                    className={`w-full py-3 rounded-xl font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-2 ${
                      item.highlighted
                        ? 'bg-on-primary text-on-primary-container hover:bg-on-primary/90 shadow-lg'
                        : 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                    }`}
                  >
                    Enroll Now
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── PROGRAM MOSAIC ──────────────────────────────────────────────── */}
          <section
            id="programs"
            className="bg-surface-container-low px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl"
          >
            <div className="mb-12">
              <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-4">
                All Programs
              </p>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight max-w-xl">
                  Choose Your
                  <br />
                  <em>Path to Success</em>
                </h2>
                <p className="text-on-surface-variant max-w-sm leading-relaxed">
                  For students, working professionals, and anyone ready to level
                  up — AOCA has the right program for every goal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'German Migration & Visa',
                  icon: Plane,
                  desc: 'Visa consultancy, relocation support, study abroad placement, and embassy interview preparation for Germany and beyond.',
                  features: [
                    'Visa Application Support',
                    'Document Preparation',
                    'Embassy Interview Prep',
                    'Study Abroad Placement',
                  ],
                },
                {
                  name: 'Healthcare & Nursing',
                  icon: HeartHandshake,
                  desc: 'HSE certification and professional training for healthcare settings. Levels 1 through 3 aligned with global safety standards.',
                  features: [
                    'HSE Level 1, 2 & 3',
                    'Emergency Procedures',
                    'Risk Assessment',
                    'Safety Leadership',
                  ],
                },
                {
                  name: 'Ausbildung & Career',
                  icon: Briefcase,
                  desc: 'Job placement assistance, CV writing, interview prep, and career counselling connecting professionals to opportunities.',
                  features: [
                    'Job Placement',
                    'CV Optimisation',
                    'Mock Interviews',
                    'Career Roadmap',
                  ],
                },
                {
                  name: 'Exam Preparation',
                  icon: BookMarked,
                  desc: 'Intensive preparation for IELTS, GMAT, SAT, GRE, GCSE, and TOEFL with proven strategies and extensive practice materials.',
                  features: [
                    'IELTS & TOEFL',
                    'GMAT & SAT',
                    'GRE & GCSE',
                    'Practice Tests',
                  ],
                },
                {
                  name: 'ICT & Tech Programs',
                  icon: Monitor,
                  desc: 'From computer literacy to advanced Python, web development, cyber security, and data analysis for the digital economy.',
                  features: [
                    'ICT Basic & Advanced',
                    'Python & Web Dev',
                    'Cyber Security',
                    'Data Analysis',
                  ],
                },
                {
                  name: 'French & Corporate',
                  icon: Languages,
                  desc: 'French language levels A1 through C1, plus corporate training in project management and professional communication.',
                  features: [
                    'French A1–C1',
                    'Project Management',
                    'Corporate Training',
                    'Professional Communication',
                  ],
                },
              ].map((prog, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-surface-container-lowest rounded-2xl shadow-md border border-outline-variant/30 overflow-hidden card-hover"
                >
                  <div className="bg-gradient-to-br from-primary to-primary-container p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-on-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <prog.icon className="h-8 w-8 text-on-primary mb-3 relative z-10" />
                    <h3 className="font-headline-sm text-headline-sm text-on-primary relative z-10 leading-tight">
                      {prog.name}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                      {prog.desc}
                    </p>
                    <div className="mb-5 space-y-2">
                      {prog.features.map((f, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-2 text-xs text-on-surface-variant"
                        >
                          <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowPopup(true)}
                      className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── TRAVEL & JOBS SPOTLIGHT ───────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-surface-container-lowest">
            <div className="px-margin-mobile md:px-margin-tablet lg:px-margin">
              <div className="mb-16">
                <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-4">
                  Beyond the Classroom
                </p>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight max-w-xl">
                    Travel, Work &amp;
                    <br />
                    <em>Build Your Future</em>
                  </h2>
                  <p className="text-on-surface-variant max-w-sm leading-relaxed">
                    AOCA doesn't just train you — we take you all the way. Visa
                    counselling, job placement, study abroad, and career
                    coaching under one roof.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl overflow-hidden bg-surface-container p-8 shadow-md border border-outline-variant/30"
                >
                  <div className="w-12 h-12 bg-primary-container/15 border border-primary/20 rounded-xl flex items-center justify-center mb-6">
                    <Plane className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display-hero text-3xl text-on-surface mb-3 leading-tight">
                    TRAVEL &amp;
                    <br />
                    <span className="text-primary">VISA</span>
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-6">
                    Schengen · UK · US · Canada · Germany. We guide you through
                    every step of your visa journey.
                  </p>
                  <ul className="space-y-2 mb-8">
                    {[
                      'Visa Application Support',
                      'Document Checklist',
                      'Embassy Interview Prep',
                      'Travel Planning',
                    ].map((m) => (
                      <li
                        key={m}
                        className="flex items-center gap-2 text-xs text-on-surface-variant"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container transition-colors"
                  >
                    Get Visa Guidance
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-2 rounded-3xl overflow-hidden bg-surface-container p-8 shadow-md border border-outline-variant/30"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-container/15 border border-primary/20 rounded-xl flex items-center justify-center">
                      <BriefcaseBusiness className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-xs uppercase tracking-wider">
                        For Professionals
                      </p>
                      <h3 className="text-on-surface font-bold text-lg">
                        Jobs &amp; Career Services
                      </h3>
                    </div>
                  </div>
                  <h2 className="font-display-hero text-4xl md:text-5xl text-on-surface mb-4 leading-tight">
                    LAND THE JOB.
                    <br />
                    <span className="text-primary">ANYWHERE.</span>
                  </h2>
                  <p className="text-on-surface-variant text-sm mb-8 max-w-lg">
                    Whether you're targeting roles in Nigeria or abroad — we
                    help professionals craft winning CVs, ace interviews, and
                    connect with employers who are hiring.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      {
                        icon: Briefcase,
                        label: 'CV Optimisation',
                        sub: 'ATS-ready, recruiter-approved',
                      },
                      {
                        icon: Users,
                        label: 'Mock Interviews',
                        sub: 'Real questions, expert feedback',
                      },
                      {
                        icon: Globe,
                        label: 'Employer Network',
                        sub: 'Nigeria + international roles',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-center"
                      >
                        <item.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                        <p className="text-on-surface text-xs font-bold mb-1">
                          {item.label}
                        </p>
                        <p className="text-on-surface-variant text-xs">
                          {item.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPopup(true)}
                      className="px-6 py-3 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold shadow-sm hover:bg-primary-container transition-colors"
                    >
                      Job Placement Help
                    </button>
                    <button
                      onClick={() => setShowPopup(true)}
                      className="px-6 py-3 bg-surface-container-lowest text-on-surface rounded-xl font-label-md text-label-md font-semibold border border-outline-variant/30 hover:bg-surface-container-high transition-colors"
                    >
                      CV &amp; Interview Prep
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Study Abroad Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden bg-primary p-8 md:p-10 text-on-primary shadow-lg"
              >
                <div className="absolute inset-0 noise opacity-30" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="h-5 w-5 text-on-primary-container" />
                      <span className="text-on-primary-container text-xs font-label-caps font-bold uppercase tracking-wider">
                        Study Abroad Placement
                      </span>
                    </div>
                    <h3 className="font-display-hero text-3xl md:text-5xl text-on-primary leading-tight mb-2">
                      GET INTO A FOREIGN UNIVERSITY.
                    </h3>
                    <p className="text-on-primary/70 text-sm max-w-lg">
                      School selection, application essays, scholarship search,
                      and full pre-departure briefing. We've placed students in
                      universities across Europe, the UK, Canada, and more.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-surface-container-lowest text-on-surface rounded-xl font-label-md text-label-md font-semibold hover:bg-surface-container transition-all shadow-lg"
                  >
                    Start Study Abroad <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── WHY AOCA ─────────────────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-surface-container-lowest">
            <div className="px-margin-mobile md:px-margin-tablet lg:px-margin">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-4">
                  Why Choose Us
                </p>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                  The AOCA Advantage
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  We don't just teach — we deliver results. For students and
                  professionals alike. Here's what makes AOCA different from
                  every other training centre in Nigeria.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyUs.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/30 card-hover text-center"
                  >
                    <div className="w-14 h-14 bg-primary-container/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-on-surface text-lg mb-3">
                      {item.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
          <section className="py-12 sm:py-16 bg-surface-container-lowest">
            <div className="px-margin-mobile md:px-margin-tablet lg:px-margin">
              <div className="mb-16">
                <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-4">
                  Success Stories
                </p>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Students &amp; Professionals Who Made It
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Blessing Udom',
                    program: 'IELTS Preparation',
                    score: 'Band 7.5',
                    text: 'I passed my IELTS on the first attempt thanks to AOCA. The instructors were incredibly patient and the practice materials were more thorough than anything I found elsewhere.',
                  },
                  {
                    name: 'Emeka Nwosu',
                    program: 'German B1 + Study Abroad',
                    score: 'Now studying in Germany',
                    text: 'I started with German A1 knowing nothing. A year later, AOCA helped me get a German B2 certificate and placed me into a university in Berlin. They handled everything — the language, the application, even the visa.',
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
                    className="bg-surface-container-lowest rounded-2xl shadow-md border border-outline-variant/30 p-8 card-hover"
                  >
                    <div className="flex gap-1 mb-5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-on-surface-variant leading-relaxed mb-6 italic text-sm">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                      <div className="w-10 h-10 bg-primary-container/15 rounded-full flex items-center justify-center font-bold text-primary text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">
                          {t.name}
                        </p>
                        <p className="text-primary text-xs font-semibold">
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
          <section className="py-12 sm:py-16 bg-surface-container-lowest">
            <div className="px-margin-mobile md:px-margin-tablet lg:px-margin">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-6">
                    FAQs
                  </p>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
                    Got Questions?
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed mb-10">
                    Everything you need to know before enrolling. Still unsure?
                    Call us directly.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>09038013105, 08038713612</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>info@aocaresourcesltd.com</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-on-surface-variant">
                      <MapPin className="h-4 w-4 text-primary mt-0.5" />
                      <span>
                        No 70 Eligbolo Road, Rumudumaya, Port Harcourt
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-outline-variant/30 overflow-hidden"
                    >
                      <button
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        className="w-full p-6 text-left flex items-center justify-between bg-surface-container-low hover:bg-surface transition-colors"
                      >
                        <span className="font-semibold text-on-surface text-sm pr-4">
                          {faq.q}
                        </span>
                        <ChevronRight
                          className={`h-4 w-4 text-primary shrink-0 transition-transform ${faqOpen === i ? 'rotate-90' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {faqOpen === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-6 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/30">
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

          {/* ── ADMISSION FORM ───────────────────────────────────────────────── */}
          <section className="bg-surface px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-4 inline-flex items-center">
                  Apply Now
                </p>
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
                  Start Your Application
                </h2>
                <p className="text-on-surface-variant mt-3 max-w-lg mx-auto">
                  Fill in your details below and our admissions team will
                  contact you within 24 hours.
                </p>
              </div>
              <div className="rounded-3xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-xl border border-outline-variant/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 801 234 5678"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                      Program of Interest
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md transition-all">
                      <option value="">Select a program</option>
                      <optgroup label="Language Training">
                        <option>German Language — A1 (Beginner)</option>
                        <option>German Language — B1 (Intermediate)</option>
                        <option>French Language — A1 (Beginner)</option>
                      </optgroup>
                      <optgroup label="Exam Preparation">
                        <option>IELTS Preparation</option>
                        <option>GMAT Preparation</option>
                        <option>TOEFL Preparation</option>
                      </optgroup>
                      <optgroup label="Professional Training">
                        <option>Data Analysis</option>
                        <option>Project Management</option>
                        <option>Cyber Security</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                      Preferred Location
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md transition-all">
                      <option value="">Select location</option>
                      <option>Lagos (Physical)</option>
                      <option>Port Harcourt (Physical)</option>
                      <option>Online</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-label-md font-bold text-on-surface mb-1.5 uppercase tracking-wider">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any specific questions or goals?"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md transition-all resize-none"
                    />
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-on-surface-variant">
                    No application fee · Free consultation included
                  </p>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full sm:w-auto px-10 py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                  >
                    Submit Application <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
          <section className="py-28 bg-primary relative overflow-hidden noise">
            <div className="absolute inset-0 diagonal-stripe opacity-20" />
            <div className="absolute top-0 left-1/2 w-[600px] h-[400px] bg-primary-container/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 px-margin-mobile md:px-margin-tablet lg:px-margin text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-on-primary-container text-xs uppercase tracking-[0.4em] font-label-caps font-bold mb-6">
                  Ready to Start?
                </p>
                <h2 className="font-display-hero text-display-hero text-on-primary leading-none mb-6">
                  APPLY NOW.
                  <br />
                  <span className="text-on-primary-container italic font-serif">
                    IT'S FREE.
                  </span>
                </h2>
                <p className="text-on-primary/70 text-lg font-light max-w-xl mx-auto mb-12">
                  Join thousands of successful AOCA graduates — students,
                  professionals, and everyone in between. Limited seats for the
                  2026 intake — enrollment closes once full.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="group px-10 py-5 bg-surface-container text-on-surface rounded-xl font-label-md text-label-md font-semibold shadow-lg hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
                  >
                    Apply Now — No Application Fee
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="tel:09038013105"
                    className="px-10 py-5 bg-on-primary/10 border border-on-primary/20 text-on-primary rounded-xl font-label-md text-label-md font-semibold hover:bg-on-primary/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" /> Call Us Now
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        /* ── TRACKING DASHBOARD ─────────────────────────────────────────────── */
        <section className="bg-surface px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl py-space-lg">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-4">
                Application Tracker
              </p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
                Track Your Career &amp; Visa Application
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Timeline */}
              <div className="lg:col-span-7">
                <div className="relative">
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-outline-variant/30" />
                  <div className="space-y-8">
                    {trackingSteps.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex gap-6"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md ${
                            item.status === 'complete'
                              ? 'bg-primary text-on-primary'
                              : item.status === 'active'
                                ? 'bg-primary-container text-on-primary shadow-lg ring-4 ring-primary-container/20'
                                : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30'
                          }`}
                        >
                          {item.status === 'complete' ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <span className="font-label-md text-label-md font-bold">
                              {item.step}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 bg-surface-container-lowest rounded-2xl p-6 shadow-md border border-outline-variant/30">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                            {item.title}
                          </h3>
                          <p className="text-on-surface-variant text-sm">
                            {item.desc}
                          </p>
                          {item.status === 'active' && (
                            <div className="mt-4 flex items-center gap-2">
                              <Loader2 className="h-4 w-4 text-primary animate-spin" />
                              <span className="text-xs text-primary font-label-md font-semibold">
                                In Progress
                              </span>
                            </div>
                          )}
                          {item.status === 'complete' && (
                            <div className="mt-4 flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span className="text-xs text-primary font-label-md font-semibold">
                                Completed
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Candidate Dossier Sidebar */}
              <div className="lg:col-span-5">
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-xl border border-outline-variant/30 sticky top-40">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary-container/15 rounded-full flex items-center justify-center">
                      <span className="font-display-hero text-xl text-primary">
                        {candidateDossier.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {candidateDossier.name}
                      </h3>
                      <p className="text-on-surface-variant text-sm">
                        {candidateDossier.intake}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 rounded-xl bg-surface-container border border-outline-variant/30">
                      <span className="text-sm text-on-surface-variant">
                        Program
                      </span>
                      <span className="text-sm font-semibold text-on-surface">
                        {candidateDossier.program}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl bg-surface-container border border-outline-variant/30">
                      <span className="text-sm text-on-surface-variant">
                        Status
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 text-primary text-xs font-label-caps font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {candidateDossier.status}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-on-surface-variant">
                          Progress
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          {candidateDossier.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${candidateDossier.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-label-md text-label-md font-bold text-on-surface mb-3 uppercase tracking-wider">
                      Documents
                    </h4>
                    <div className="space-y-2">
                      {candidateDossier.documents.map((doc, di) => (
                        <div
                          key={di}
                          className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-outline-variant/30"
                        >
                          <div className="flex items-center gap-3">
                            <FileTextIcon submitted={doc.submitted} />
                            <span className="text-sm text-on-surface">
                              {doc.name}
                            </span>
                          </div>
                          {doc.submitted ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : (
                            <Clock className="h-4 w-4 text-on-surface-variant" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary-container/10 border border-primary/20">
                    <p className="text-xs text-on-surface-variant mb-1 font-label-caps uppercase tracking-wider">
                      Notes
                    </p>
                    <p className="text-sm text-on-surface">
                      {candidateDossier.notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CAMPUS SHOWCASE ─────────────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div className="mb-12">
          <p className="section-line text-primary text-xs uppercase tracking-[0.3em] font-label-caps font-bold mb-4">
            Our Campuses
          </p>
          <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
            Visit Any of Our Learning Centres
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            {[
              {
                name: 'Lagos Campus',
                address: 'Victoria Island, Lagos',
                hours: 'Mon–Sat: 8am – 7pm',
                icon: Building2,
              },
              {
                name: 'Port Harcourt Campus',
                address: 'No 70 Eligbolo Rd, Rumudumaya',
                hours: 'Mon–Sat: 8am – 7pm',
                icon: MapPin,
              },
              {
                name: 'Online Learning',
                address: 'Live classes, any device',
                hours: 'Flexible schedule',
                icon: Wifi,
              },
            ].map((campus, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-2xl bg-surface-container-lowest shadow-md border border-outline-variant/30"
              >
                <div className="w-12 h-12 bg-primary-container/15 rounded-xl flex items-center justify-center shrink-0">
                  <campus.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                    {campus.name}
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-1">
                    {campus.address}
                  </p>
                  <p className="text-on-surface-variant text-xs">
                    {campus.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden bg-surface-container shadow-lg border border-outline-variant/30">
              <div className="aspect-video bg-gradient-to-br from-surface-container-low to-surface-container flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-16 w-16 text-primary/30 mx-auto mb-3" />
                  <p className="text-on-surface-variant text-sm">
                    Lagos &amp; Port Harcourt locations
                  </p>
                  <p className="text-on-surface-variant text-xs mt-1">
                    Find us on Google Maps
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─── DOCUMENT ICON HELPER ─────────────────────────────────────────────────────
const FileTextIcon = ({ submitted }) => (
  <div
    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
      submitted ? 'bg-primary-container/15' : 'bg-surface-container'
    }`}
  >
    <BookMarked
      className={`h-4 w-4 ${submitted ? 'text-primary' : 'text-on-surface-variant'}`}
    />
  </div>
);

export default AdmissionLandingPage;

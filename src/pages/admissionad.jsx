/** @format */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles,
  Target,
  TrendingUp,
  Check,
  AlertCircle,
  Loader2,
  Briefcase,
  Calendar,
  Star,
} from 'lucide-react';

// ─── ADMISSION POPUP COMPONENT ───────────────────────────────────────────────
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
  ];

  const locations = [
    { value: 'lagos', label: 'Lagos (Physical)' },
    { value: 'port-harcourt', label: 'Port Harcourt (Physical)' },
    { value: 'online', label: 'Online' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          headers: {
            'Content-Type': 'application/json',
          },
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
        throw new Error(data.message || 'Failed to submit application');
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
            className='fixed inset-0 bg-black/70 z-50 backdrop-blur-sm'
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto'
          >
            <div className='relative bg-white rounded-[2rem] shadow-2xl overflow-hidden'>
              <button
                onClick={onClose}
                className='absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-all'
              >
                <span className='text-2xl leading-none'>&times;</span>
              </button>

              <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* Left Side - Branding */}
                <div className='relative h-64 md:h-auto bg-gradient-to-br from-emerald-700 to-emerald-900 overflow-hidden'>
                  <div
                    className='absolute inset-0 bg-cover bg-center opacity-30'
                    style={{
                      backgroundImage: "url('/study-group.jpg')",
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-800/40 to-transparent' />

                  <div className='relative h-full p-8 md:p-10 flex flex-col justify-between text-white'>
                    <div>
                      <div className='flex items-center gap-2 mb-6'>
                        <div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center'>
                          <GraduationCap className='h-6 w-6' />
                        </div>
                        <span className='text-2xl font-bold tracking-tight'>
                          AOCA
                        </span>
                      </div>

                      <h2 className='text-4xl md:text-5xl font-bold mb-3 leading-tight'>
                        THE INTAKE
                      </h2>
                      <p className='text-xl text-white/90 mb-6'>
                        Smart Students Are Choosing AOCA
                      </p>

                      <div className='space-y-4'>
                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                            <Briefcase className='h-4 w-4' />
                          </div>
                          <div>
                            <p className='font-semibold text-sm uppercase tracking-wider mb-1'>
                              Professional Exams
                            </p>
                            <p className='text-sm text-white/80'>
                              IELTS, GMAT, SAT, GRE, GCSE & TOEFL
                            </p>
                          </div>
                        </div>

                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0'>
                            <Laptop className='h-4 w-4' />
                          </div>
                          <div>
                            <p className='font-semibold text-sm uppercase tracking-wider mb-1'>
                              Computer Programming
                            </p>
                            <p className='text-sm text-white/80'>
                              Scratch • Python • Web Development
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 space-y-3 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Phone className='h-4 w-4 shrink-0' />
                        <span>0903 801 3105, 0803 871 3612</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Mail className='h-4 w-4 shrink-0' />
                        <span>info@aocaresourcesltd.com</span>
                      </div>
                      <div className='flex items-start gap-2'>
                        <MapPin className='h-4 w-4 shrink-0 mt-0.5' />
                        <span>
                          No 70 Eligbolo Road, Rumudumaya, Port Harcourt
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className='p-8 md:p-10 bg-white'>
                  <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
                    Apply Now
                  </h3>
                  <p className='text-gray-500 text-sm mb-6'>
                    Fill in your details and we'll contact you with next steps
                  </p>

                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='text-center py-12'
                    >
                      <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <Check className='h-10 w-10 text-emerald-600' />
                      </div>
                      <h4 className='text-xl font-bold text-gray-900 mb-3'>
                        Application Submitted!
                      </h4>
                      <p className='text-gray-500'>
                        Thank you for your interest. Our admissions team will
                        contact you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-4'>
                      <div className='grid grid-cols-2 gap-3'>
                        <div>
                          <label className='text-xs font-medium text-gray-400 ml-2'>
                            First Name
                          </label>
                          <input
                            required
                            type='text'
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder='John'
                            className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm'
                          />
                        </div>
                        <div>
                          <label className='text-xs font-medium text-gray-400 ml-2'>
                            Last Name
                          </label>
                          <input
                            required
                            type='text'
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder='Doe'
                            className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='text-xs font-medium text-gray-400 ml-2'>
                          Email Address
                        </label>
                        <input
                          required
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          placeholder='john@example.com'
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm'
                        />
                      </div>

                      <div>
                        <label className='text-xs font-medium text-gray-400 ml-2'>
                          Phone Number
                        </label>
                        <input
                          required
                          type='tel'
                          name='phone'
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder='+234 801 234 5678'
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm'
                        />
                      </div>

                      <div>
                        <label className='text-xs font-medium text-gray-400 ml-2'>
                          Program of Interest
                        </label>
                        <select
                          name='program'
                          value={formData.program}
                          onChange={handleChange}
                          required
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm'
                        >
                          <option value=''>Select a program</option>
                          {programs.map((program) => (
                            <option key={program.value} value={program.value}>
                              {program.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className='text-xs font-medium text-gray-400 ml-2'>
                          Preferred Location
                        </label>
                        <select
                          name='location'
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm'
                        >
                          <option value=''>Select location</option>
                          {locations.map((location) => (
                            <option key={location.value} value={location.value}>
                              {location.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className='text-xs font-medium text-gray-400 ml-2'>
                          Additional Message (Optional)
                        </label>
                        <textarea
                          name='message'
                          value={formData.message}
                          onChange={handleChange}
                          rows={2}
                          placeholder='Any specific questions or requirements?'
                          className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm resize-none'
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
                        className='w-full py-4 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
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

                      <p className='text-xs text-gray-400 text-center'>
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
};

// ─── ADMISSION LANDING PAGE ─────────────────────────────────────────────────
const AdmissionLandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('exams');
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const programs = {
    exams: [
      {
        name: 'IELTS',
        icon: Globe,
        students: '1,500+',
        passRate: '94%',
        duration: '8 weeks',
      },
      {
        name: 'GMAT',
        icon: TrendingUp,
        students: '800+',
        passRate: '91%',
        duration: '10 weeks',
      },
      {
        name: 'SAT',
        icon: Award,
        students: '1,200+',
        passRate: '93%',
        duration: '8 weeks',
      },
      {
        name: 'GRE',
        icon: Target,
        students: '600+',
        passRate: '90%',
        duration: '10 weeks',
      },
      {
        name: 'GCSE',
        icon: BookOpen,
        students: '900+',
        passRate: '95%',
        duration: '12 weeks',
      },
      {
        name: 'TOEFL',
        icon: Globe,
        students: '1,100+',
        passRate: '92%',
        duration: '8 weeks',
      },
    ],
    programming: [
      {
        name: 'Scratch',
        icon: Code,
        level: 'Beginner',
        age: '8-12 years',
        duration: '6 weeks',
      },
      {
        name: 'Python',
        icon: Code,
        level: 'Beginner to Advanced',
        age: '13+ years',
        duration: '12 weeks',
      },
      {
        name: 'Web Development',
        icon: Laptop,
        level: 'Intermediate',
        skills: 'HTML, CSS, JavaScript',
        duration: '14 weeks',
      },
    ],
  };

  const features = [
    {
      icon: Users,
      title: 'Expert Instructors',
      description:
        'Learn from certified professionals with years of teaching experience',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description:
        'Choose between weekday, weekend, or online classes that fit your routine',
    },
    {
      icon: Target,
      title: 'High Success Rate',
      description:
        '94% of our students achieve their target scores on first attempt',
    },
    {
      icon: Award,
      title: 'Certified Training',
      description:
        'Official test preparation materials and recognized certificates',
    },
  ];

  const stats = [
    { label: 'Students Trained', value: '5000+' },
    { label: 'Qualified Tutors', value: '25+' },
    { label: 'Success Rate', value: '94%' },
    { label: 'Years Experience', value: '15+' },
  ];

  const testimonials = [
    {
      name: 'Blessing Udom',
      program: 'IELTS',
      score: 'Band 7.5',
      text: 'I passed my IELTS on the first attempt thanks to AOCA. The instructors were patient and the materials were comprehensive.',
    },
    {
      name: 'Michael Okonkwo',
      program: 'Python Programming',
      text: 'From zero coding experience to building my own web applications in 3 months. The practical approach really works!',
    },
    {
      name: 'Chioma Eze',
      program: 'GMAT',
      score: '720',
      text: 'The GMAT prep course was intense but worth it. I got into my dream business school with a scholarship!',
    },
  ];

  const faqs = [
    {
      q: 'What are the admission requirements?',
      a: 'Admission requirements vary by program. For exam prep courses, you need basic English proficiency. For programming, no prior experience is needed for Scratch and Python beginners.',
    },
    {
      q: 'Do you offer online classes?',
      a: 'Yes! We offer both physical classes in Lagos and Port Harcourt, as well as live online classes with the same quality instruction.',
    },
    {
      q: 'What is the class size?',
      a: 'We maintain small class sizes (maximum 15 students) to ensure personalized attention for every student.',
    },
    {
      q: 'Do you provide study materials?',
      a: 'Yes, all course materials, practice tests, and resources are included in your tuition fee.',
    },
    {
      q: 'Can I switch from online to physical classes?',
      a: 'Absolutely! You can switch between online and physical classes based on your convenience, subject to availability.',
    },
  ];

  return (
    <>
      <AdmissionPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />

      {/* Hero Section */}
      <section className='relative min-h-screen flex items-center overflow-hidden'>
        {/* Background Image with Overlay */}
        <div className='absolute inset-0'>
          <img
            src='/study-group.jpg'
            alt='African students studying in a library'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/70' />
        </div>

        <div className='relative container mx-auto px-6 py-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className='inline-block bg-emerald-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-emerald-500/30'>
                <span className='text-sm font-medium text-emerald-400'>
                  Admissions Open for 2026
                </span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'>
                THE <span className='text-emerald-400'>INTAKE</span>
              </h1>

              <p className='text-xl text-gray-200 mb-8 leading-relaxed'>
                Smart students are choosing AOCA for their future. Join
                Nigeria's most trusted educational institute for exam
                preparation and programming skills.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 mb-12'>
                <button
                  onClick={() => setShowPopup(true)}
                  className='px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 group'
                >
                  Apply Now
                  <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </button>
                <a
                  href='#programs'
                  className='px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-semibold hover:bg-white/20 transition-all text-center'
                >
                  View Programs
                </a>
              </div>

              <div className='grid grid-cols-2 sm:grid-cols-4 gap-6'>
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className='text-2xl font-bold text-white mb-1'>
                      {stat.value}
                    </div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider'>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id='programs' className='py-24 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <span className='text-emerald-600 font-semibold uppercase tracking-wider text-sm block mb-4'>
              Our Programs
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Choose Your Path to Success
            </h2>
            <p className='text-xl text-gray-600'>
              Whether you're preparing for professional exams or learning to
              code, we have the right program for you.
            </p>
          </div>

          {/* Program Tabs */}
          <div className='flex justify-center gap-4 mb-12'>
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-8 py-4 rounded-full font-semibold transition-all ${
                activeTab === 'exams'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Professional Exams
            </button>
            <button
              onClick={() => setActiveTab('programming')}
              className={`px-8 py-4 rounded-full font-semibold transition-all ${
                activeTab === 'programming'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Computer Programming
            </button>
          </div>

          {/* Programs Grid */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            >
              {activeTab === 'exams'
                ? programs.exams.map((program, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4 }}
                      className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all'
                    >
                      <div className='w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6'>
                        <program.icon className='h-7 w-7 text-emerald-600' />
                      </div>
                      <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                        {program.name}
                      </h3>
                      <div className='space-y-2 mb-6'>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <Users className='h-4 w-4' />
                          <span>{program.students} students</span>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <TrendingUp className='h-4 w-4' />
                          <span>{program.passRate} pass rate</span>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <Clock className='h-4 w-4' />
                          <span>{program.duration}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPopup(true)}
                        className='w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-emerald-600 transition-colors'
                      >
                        Enroll Now
                      </button>
                    </motion.div>
                  ))
                : programs.programming.map((program, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4 }}
                      className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all'
                    >
                      <div className='w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6'>
                        <program.icon className='h-7 w-7 text-emerald-600' />
                      </div>
                      <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                        {program.name}
                      </h3>
                      <div className='space-y-2 mb-6'>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <Target className='h-4 w-4' />
                          <span>Level: {program.level}</span>
                        </div>
                        {program.age && (
                          <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <Users className='h-4 w-4' />
                            <span>Ages: {program.age}</span>
                          </div>
                        )}
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <Clock className='h-4 w-4' />
                          <span>{program.duration}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPopup(true)}
                        className='w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-emerald-600 transition-colors'
                      >
                        Enroll Now
                      </button>
                    </motion.div>
                  ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <span className='text-emerald-600 font-semibold uppercase tracking-wider text-sm block mb-4'>
              Why Choose Us
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              The AOCA Advantage
            </h2>
            <p className='text-xl text-gray-600'>
              We provide more than just classes – we offer a complete learning
              experience designed for your success.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='text-center'
              >
                <div className='w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                  <feature.icon className='h-8 w-8 text-emerald-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className='py-16 bg-emerald-600'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center text-white'>
                <div className='text-4xl md:text-5xl font-bold mb-2'>
                  {stat.value}
                </div>
                <p className='text-sm uppercase tracking-wider opacity-90'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-24 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <span className='text-emerald-600 font-semibold uppercase tracking-wider text-sm block mb-4'>
              Success Stories
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              What Our Students Say
            </h2>
            <p className='text-xl text-gray-600'>
              Real stories from real students who achieved their goals with
              AOCA.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='bg-white p-8 rounded-2xl shadow-lg'
              >
                <div className='flex items-center gap-2 mb-4'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className='h-5 w-5 fill-emerald-500 text-emerald-500'
                    />
                  ))}
                </div>
                <p className='text-gray-700 mb-6 italic'>
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className='font-bold text-gray-900'>
                    {testimonial.name}
                  </h4>
                  <p className='text-sm text-emerald-600 font-medium'>
                    {testimonial.program}
                    {testimonial.score && ` • ${testimonial.score}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <span className='text-emerald-600 font-semibold uppercase tracking-wider text-sm block mb-4'>
              Got Questions?
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Frequently Asked Questions
            </h2>
            <p className='text-xl text-gray-600'>
              Find answers to common questions about our programs and
              admissions.
            </p>
          </div>

          <div className='max-w-3xl mx-auto'>
            {faqs.map((faq, index) => (
              <div key={index} className='mb-4'>
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className='w-full p-6 bg-gray-50 rounded-2xl text-left flex items-center justify-between hover:bg-gray-100 transition-colors'
                >
                  <span className='font-semibold text-gray-900'>{faq.q}</span>
                  <ChevronRight
                    className={`h-5 w-5 text-emerald-600 transition-transform ${
                      faqOpen === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {faqOpen === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className='overflow-hidden'
                    >
                      <p className='p-6 text-gray-600'>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-emerald-600'>
        <div className='container mx-auto px-6 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='max-w-3xl mx-auto'
          >
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
              Ready to Start Your Journey?
            </h2>
            <p className='text-xl text-white/90 mb-8'>
              Join thousands of successful students who chose AOCA for their
              educational goals. Limited seats available for the 2026 intake.
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className='px-12 py-5 bg-white text-emerald-600 rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2 group'
            >
              Apply Now
              <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
            </button>
            <p className='text-sm text-white/80 mt-4'>
              No application fee • Free consultation included
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AdmissionLandingPage;

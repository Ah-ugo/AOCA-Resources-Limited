/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getJobDetails,
  applyForJob,
  uploadResume,
} from '../services/career-service';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt,
  FaGraduationCap,
  FaDollarSign,
  FaClock,
  FaUser,
  FaFileAlt,
  FaUpload,
  FaLinkedin,
  FaGlobe,
  FaArrowLeft,
  FaShareAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaSpinner,
  FaTimes,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaLink,
  FaChevronDown,
  FaPaperPlane,
  FaRegClock,
  FaRegBuilding,
  FaRegUser,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';

const CareerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');

  const [applicationData, setApplicationData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume_url: '',
    linkedin_url: '',
    portfolio_url: '',
    referral: '',
    additional_info: '',
  });

  // Mock user state - replace with your actual auth state
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchJobDetails();
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
      setApplicationData((prev) => ({
        ...prev,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
      }));
    }
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const data = await getJobDetails(id);
      setJob(data);
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError(
        `Failed to load job details: ${
          err.message || 'Unknown error'
        }. Please try again later.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlertMessage('File too large. Maximum size is 5MB', 'error');
        e.target.value = null;
        return;
      }
      setResumeFile(file);
    }
  };

  const showAlertMessage = (message, type = 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);

    if (type === 'success') {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  const validateForm = () => {
    if (!applicationData.first_name?.trim()) {
      showAlertMessage('First name is required', 'error');
      return false;
    }
    if (!applicationData.last_name?.trim()) {
      showAlertMessage('Last name is required', 'error');
      return false;
    }
    if (!applicationData.email?.trim()) {
      showAlertMessage('Email is required', 'error');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      showAlertMessage('Please enter a valid email address', 'error');
      return false;
    }
    if (!applicationData.phone?.trim()) {
      showAlertMessage('Phone number is required', 'error');
      return false;
    }
    if (!resumeFile && !applicationData.resume_url) {
      showAlertMessage('Please upload your resume', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setShowAlert(false);

    try {
      let resumeUrl = applicationData.resume_url;

      if (resumeFile) {
        try {
          const uploadResult = await uploadResume(resumeFile);
          resumeUrl = uploadResult.url;
        } catch (uploadErr) {
          console.error('Resume upload error:', uploadErr);
          showAlertMessage(
            uploadErr.message || 'Failed to upload resume. Please try again.',
            'error',
          );
          setIsSubmitting(false);
          return;
        }
      }

      const submissionData = {
        ...applicationData,
        resume_url: resumeUrl,
        job_id: id,
      };

      await applyForJob(id, submissionData);

      showAlertMessage('Application submitted successfully!', 'success');
      setApplicationSuccess(true);

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setApplicationSuccess(false);
        setApplicationData({
          first_name: user?.first_name || '',
          last_name: user?.last_name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          cover_letter: '',
          resume_url: '',
          linkedin_url: '',
          portfolio_url: '',
          referral: '',
          additional_info: '',
        });
        setResumeFile(null);
      }, 3000);
    } catch (err) {
      console.error('Error submitting application:', err);
      showAlertMessage(
        err.message || 'Failed to submit application. Please try again.',
        'error',
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSalary = () => {
    if (!job) return 'Competitive';
    if (job.salary_min && job.salary_max) {
      return `${job.salary_currency || '$'}${job.salary_min.toLocaleString()} - ${job.salary_currency || '$'}${job.salary_max.toLocaleString()}`;
    } else if (job.salary_min) {
      return `From ${job.salary_currency || '$'}${job.salary_min.toLocaleString()}`;
    } else if (job.salary_max) {
      return `Up to ${job.salary_currency || '$'}${job.salary_max.toLocaleString()}`;
    }
    return 'Competitive';
  };

  const formatEmploymentType = (type) => {
    if (!type) return 'Full-time';
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Social Media Share Functions
  const getShareText = () => {
    return encodeURIComponent(
      `Check out this ${job?.title} position at ${job?.company}!`,
    );
  };

  const getShareUrl = () => {
    return encodeURIComponent(window.location.href);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${getShareUrl()}`,
      '_blank',
      'width=600,height=400',
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${getShareText()}&url=${getShareUrl()}`,
      '_blank',
      'width=600,height=400',
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${getShareUrl()}`,
      '_blank',
      'width=600,height=400',
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${getShareText()}%20${getShareUrl()}`,
      '_blank',
    );
  };

  const shareOnTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${getShareUrl()}&text=${getShareText()}`,
      '_blank',
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    showAlertMessage('Job link copied to clipboard!', 'success');
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-luxury-cream flex items-center justify-center'>
        <div className='text-center'>
          <FaSpinner className='animate-spin text-emerald-600 text-5xl mx-auto mb-4' />
          <p className='text-gray-500 font-light text-lg'>
            Loading opportunity...
          </p>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className='min-h-screen bg-luxury-cream flex items-center justify-center'>
        <div className='text-center max-w-md px-6'>
          <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <FaExclamationCircle className='text-red-500 text-4xl' />
          </div>
          <h2 className='text-3xl font-serif font-bold text-luxury-black mb-4'>
            Opportunity Not Found
          </h2>
          <p className='text-gray-500 font-light mb-8'>{error}</p>
          <Link
            to='/careers'
            className='inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20'
          >
            <FaArrowLeft className='text-sm' />
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className='min-h-screen bg-luxury-cream'>
      {/* Alert Modal */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 flex items-center justify-center z-50 px-4'
          >
            <div
              className='absolute inset-0 bg-black/50 backdrop-blur-sm'
              onClick={() => setShowAlert(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 ${
                alertType === 'error'
                  ? 'border-l-8 border-red-500'
                  : 'border-l-8 border-emerald-500'
              }`}
            >
              <button
                onClick={() => setShowAlert(false)}
                className='absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FaTimes />
              </button>
              <div className='flex items-start gap-4'>
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    alertType === 'error' ? 'bg-red-100' : 'bg-emerald-100'
                  }`}
                >
                  {alertType === 'error' ? (
                    <FaExclamationCircle className='text-red-500 text-2xl' />
                  ) : (
                    <FaCheckCircle className='text-emerald-500 text-2xl' />
                  )}
                </div>
                <div className='flex-1'>
                  <h3
                    className={`text-xl font-serif font-bold mb-2 ${
                      alertType === 'error'
                        ? 'text-red-800'
                        : 'text-emerald-800'
                    }`}
                  >
                    {alertType === 'error' ? 'Error' : 'Success'}
                  </h3>
                  <p
                    className={`text-base mb-6 ${
                      alertType === 'error'
                        ? 'text-red-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {alertMessage}
                  </p>
                  <button
                    onClick={() => setShowAlert(false)}
                    className={`w-full py-3 rounded-full font-bold uppercase tracking-widest text-sm text-white transition-all ${
                      alertType === 'error'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-emerald-600 hover:bg-emerald-500'
                    }`}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {applicationSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 flex items-center justify-center z-50 px-4'
          >
            <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className='relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center'
            >
              <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <FaCheckCircle className='text-emerald-600 text-4xl' />
              </div>
              <h3 className='text-2xl font-serif font-bold text-luxury-black mb-3'>
                Application Submitted!
              </h3>
              <p className='text-gray-500 font-light mb-8'>
                Your application has been successfully submitted. We'll review
                it and get back to you soon.
              </p>
              <button
                onClick={() => {
                  setApplicationSuccess(false);
                  navigate('/careers');
                }}
                className='w-full py-4 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20'
              >
                Continue Browsing
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <nav className='bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <Link
              to='/careers'
              className='flex items-center gap-3 text-gray-600 hover:text-emerald-600 transition-colors group'
            >
              <div className='w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors'>
                <FaArrowLeft className='text-emerald-600 text-sm' />
              </div>
              <span className='font-medium'>Back to Opportunities</span>
            </Link>
            <div className='flex items-center gap-3'>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'
              >
                {isSaved ? (
                  <FaHeart className='text-red-500' />
                ) : (
                  <FaRegHeart className='text-gray-600' />
                )}
              </button>
              <div className='relative'>
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors'
                >
                  <FaShareAlt className='text-gray-600' />
                </button>
                <AnimatePresence>
                  {showShareMenu && (
                    <>
                      <div
                        className='fixed inset-0 z-40'
                        onClick={() => setShowShareMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className='absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl z-50 border border-gray-100 overflow-hidden'
                      >
                        <div className='p-4'>
                          <p className='text-sm font-medium text-gray-500 mb-3'>
                            Share this opportunity
                          </p>
                          <div className='grid grid-cols-4 gap-2'>
                            <button
                              onClick={shareOnFacebook}
                              className='flex flex-col items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors'
                            >
                              <FaFacebookF className='text-blue-600 text-xl mb-1' />
                              <span className='text-xs text-gray-600'>
                                Facebook
                              </span>
                            </button>
                            <button
                              onClick={shareOnTwitter}
                              className='flex flex-col items-center p-3 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors'
                            >
                              <FaTwitter className='text-sky-400 text-xl mb-1' />
                              <span className='text-xs text-gray-600'>
                                Twitter
                              </span>
                            </button>
                            <button
                              onClick={shareOnLinkedIn}
                              className='flex flex-col items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors'
                            >
                              <FaLinkedin className='text-blue-700 text-xl mb-1' />
                              <span className='text-xs text-gray-600'>
                                LinkedIn
                              </span>
                            </button>
                            <button
                              onClick={shareOnWhatsApp}
                              className='flex flex-col items-center p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors'
                            >
                              <FaWhatsapp className='text-green-500 text-xl mb-1' />
                              <span className='text-xs text-gray-600'>
                                WhatsApp
                              </span>
                            </button>
                            <button
                              onClick={shareOnTelegram}
                              className='flex flex-col items-center p-3 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors'
                            >
                              <FaTelegramPlane className='text-sky-500 text-xl mb-1' />
                              <span className='text-xs text-gray-600'>
                                Telegram
                              </span>
                            </button>
                            <button
                              onClick={copyToClipboard}
                              className='col-span-3 flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors'
                            >
                              <FaLink className='text-gray-600' />
                              <span className='text-sm text-gray-600'>
                                Copy Link
                              </span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative pt-20 pb-32 bg-luxury-black text-white overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000'
            alt='Career Hero'
            className='w-full h-full object-cover opacity-20'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-luxury-black' />
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-4xl'
          >
            <div className='flex flex-wrap gap-3 mb-6'>
              <span className='px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest'>
                {job.category || 'General'}
              </span>
              <span className='px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest'>
                {formatEmploymentType(job.employment_type)}
              </span>
              {job.location?.remote && (
                <span className='px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest'>
                  Remote Available
                </span>
              )}
            </div>
            <h1 className='text-5xl md:text-7xl font-serif font-bold mb-6'>
              {job.title}
            </h1>
            <div className='flex flex-wrap items-center gap-6 text-white/60'>
              <div className='flex items-center gap-2'>
                <FaBuilding className='text-emerald-500' />
                <span>{job.company}</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaMapMarkerAlt className='text-emerald-500' />
                <span>
                  {job.location?.city || 'Various'},{' '}
                  {job.location?.country || 'Nigeria'}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <FaCalendarAlt className='text-emerald-500' />
                <span>Posted {formatDate(job.created_at)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-20'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Left Column - Main Content */}
            <div className='lg:col-span-2 space-y-8'>
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='grid grid-cols-2 md:grid-cols-4 gap-4'
              >
                <div className='bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow'>
                  <div className='w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                    <FaBriefcase className='text-emerald-600 text-xl' />
                  </div>
                  <p className='text-sm text-gray-500 mb-1'>Job Type</p>
                  <p className='font-serif font-bold text-luxury-black'>
                    {formatEmploymentType(job.employment_type)}
                  </p>
                </div>
                <div className='bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow'>
                  <div className='w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                    <FaRegUser className='text-emerald-600 text-xl' />
                  </div>
                  <p className='text-sm text-gray-500 mb-1'>Experience</p>
                  <p className='font-serif font-bold text-luxury-black'>
                    {job.experience_level || 'Mid'}
                  </p>
                </div>
                <div className='bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow'>
                  <div className='w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                    <FaDollarSign className='text-emerald-600 text-xl' />
                  </div>
                  <p className='text-sm text-gray-500 mb-1'>Salary</p>
                  <p className='font-serif font-bold text-luxury-black'>
                    {formatSalary()}
                  </p>
                </div>
                <div className='bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow'>
                  <div className='w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                    <FaRegClock className='text-emerald-600 text-xl' />
                  </div>
                  <p className='text-sm text-gray-500 mb-1'>Deadline</p>
                  <p className='font-serif font-bold text-luxury-black'>
                    {job.application_deadline
                      ? formatDate(job.application_deadline)
                      : 'Rolling'}
                  </p>
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='bg-white rounded-3xl shadow-sm overflow-hidden'
              >
                <div className='border-b border-gray-100'>
                  <div className='flex'>
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`flex-1 py-5 px-6 text-sm font-bold uppercase tracking-widest transition-all relative ${
                        activeTab === 'description'
                          ? 'text-emerald-600'
                          : 'text-gray-400 hover:text-luxury-black'
                      }`}
                    >
                      Description
                      {activeTab === 'description' && (
                        <motion.div
                          layoutId='activeTab'
                          className='absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600'
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('requirements')}
                      className={`flex-1 py-5 px-6 text-sm font-bold uppercase tracking-widest transition-all relative ${
                        activeTab === 'requirements'
                          ? 'text-emerald-600'
                          : 'text-gray-400 hover:text-luxury-black'
                      }`}
                    >
                      Requirements
                      {activeTab === 'requirements' && (
                        <motion.div
                          layoutId='activeTab'
                          className='absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600'
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('responsibilities')}
                      className={`flex-1 py-5 px-6 text-sm font-bold uppercase tracking-widest transition-all relative ${
                        activeTab === 'responsibilities'
                          ? 'text-emerald-600'
                          : 'text-gray-400 hover:text-luxury-black'
                      }`}
                    >
                      Responsibilities
                      {activeTab === 'responsibilities' && (
                        <motion.div
                          layoutId='activeTab'
                          className='absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600'
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div className='p-8'>
                  <AnimatePresence mode='wait'>
                    {activeTab === 'description' && (
                      <motion.div
                        key='description'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className='prose prose-lg max-w-none'
                      >
                        <p className='text-gray-600 leading-relaxed text-lg'>
                          {job.description}
                        </p>
                      </motion.div>
                    )}

                    {activeTab === 'requirements' && (
                      <motion.div
                        key='requirements'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <ul className='space-y-4'>
                          {job.requirements.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className='flex items-start gap-4'
                            >
                              <div className='w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1'>
                                <div className='w-2 h-2 rounded-full bg-emerald-600' />
                              </div>
                              <span className='text-gray-600'>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {activeTab === 'responsibilities' && (
                      <motion.div
                        key='responsibilities'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <ul className='space-y-4'>
                          {job.responsibilities.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className='flex items-start gap-4'
                            >
                              <div className='w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1'>
                                <div className='w-2 h-2 rounded-full bg-emerald-600' />
                              </div>
                              <span className='text-gray-600'>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='bg-white rounded-3xl p-8 shadow-sm'
                >
                  <h3 className='text-2xl font-serif font-bold text-luxury-black mb-6'>
                    Required Skills
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                    {job.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className='px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors'
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='bg-white rounded-3xl p-8 shadow-sm'
                >
                  <h3 className='text-2xl font-serif font-bold text-luxury-black mb-6'>
                    Benefits
                  </h3>
                  <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {job.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className='flex items-center gap-3'
                      >
                        <div className='w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0'>
                          <FaCheckCircle className='text-emerald-600 text-sm' />
                        </div>
                        <span className='text-gray-600'>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Application Form */}
              <motion.div
                id='apply-section'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='bg-white rounded-3xl p-8 shadow-sm scroll-mt-24'
              >
                <h3 className='text-2xl font-serif font-bold text-luxury-black mb-2'>
                  Apply for this position
                </h3>
                <p className='text-gray-500 font-light mb-8'>
                  Take the next step in your career journey with AOCA Resources
                </p>

                {showLoginPrompt ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center py-12 bg-gradient-to-br from-emerald-50 to-luxury-cream rounded-2xl'
                  >
                    <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                      <FaUser className='text-emerald-600 text-3xl' />
                    </div>
                    <h4 className='text-xl font-serif font-bold text-luxury-black mb-3'>
                      Login Required
                    </h4>
                    <p className='text-gray-500 font-light mb-8 max-w-sm mx-auto'>
                      Please login or create an account to apply for this
                      position
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                      <Link
                        to='/login'
                        className='px-8 py-4 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20'
                      >
                        Login
                      </Link>
                      <Link
                        to='/register'
                        className='px-8 py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-50 transition-all'
                      >
                        Create Account
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      {/* First Name */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          First Name <span className='text-emerald-600'>*</span>
                        </label>
                        <input
                          type='text'
                          name='first_name'
                          className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                          placeholder='John'
                          value={applicationData.first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Last Name <span className='text-emerald-600'>*</span>
                        </label>
                        <input
                          type='text'
                          name='last_name'
                          className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                          placeholder='Doe'
                          value={applicationData.last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Email Address{' '}
                          <span className='text-emerald-600'>*</span>
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <FaEnvelope className='text-gray-400' />
                          </div>
                          <input
                            type='email'
                            name='email'
                            className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                            placeholder='johndoe@example.com'
                            value={applicationData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Phone Number{' '}
                          <span className='text-emerald-600'>*</span>
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <FaPhone className='text-gray-400' />
                          </div>
                          <input
                            type='tel'
                            name='phone'
                            className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                            placeholder='+234 123 456 7890'
                            value={applicationData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Resume Upload */}
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Resume/CV <span className='text-emerald-600'>*</span>
                        </label>
                        <label className='flex flex-col items-center justify-center w-full h-48 px-4 transition bg-white border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 group'>
                          <div className='flex flex-col items-center space-y-3 text-center'>
                            {resumeFile ? (
                              <>
                                <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors'>
                                  <FaFileAlt className='text-emerald-600 text-2xl' />
                                </div>
                                <div>
                                  <p className='font-medium text-luxury-black'>
                                    {resumeFile.name}
                                  </p>
                                  <p className='text-sm text-gray-500'>
                                    {(resumeFile.size / 1024 / 1024).toFixed(2)}{' '}
                                    MB
                                  </p>
                                </div>
                                <p className='text-xs text-emerald-600'>
                                  Click to change file
                                </p>
                              </>
                            ) : (
                              <>
                                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors'>
                                  <FaUpload className='text-gray-400 group-hover:text-emerald-600 text-2xl transition-colors' />
                                </div>
                                <div>
                                  <p className='font-medium text-luxury-black'>
                                    Drop your resume here or click to browse
                                  </p>
                                  <p className='text-sm text-gray-500'>
                                    PDF, DOC, DOCX (Max 5MB)
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                          <input
                            type='file'
                            name='resume'
                            className='hidden'
                            accept='.pdf,.doc,.docx'
                            onChange={handleResumeChange}
                            required={!applicationData.resume_url}
                          />
                        </label>
                      </div>

                      {/* Cover Letter */}
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Cover Letter
                        </label>
                        <textarea
                          name='cover_letter'
                          rows='5'
                          className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none'
                          placeholder="Tell us why you're the perfect fit for this role..."
                          value={applicationData.cover_letter}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          LinkedIn Profile
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <FaLinkedin className='text-gray-400' />
                          </div>
                          <input
                            type='url'
                            name='linkedin_url'
                            className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                            placeholder='https://linkedin.com/in/yourprofile'
                            value={applicationData.linkedin_url}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Portfolio */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Portfolio/Website
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <FaGlobe className='text-gray-400' />
                          </div>
                          <input
                            type='url'
                            name='portfolio_url'
                            className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                            placeholder='https://yourportfolio.com'
                            value={applicationData.portfolio_url}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Referral */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          How did you hear about us?
                        </label>
                        <input
                          type='text'
                          name='referral'
                          className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                          placeholder='LinkedIn, Friend, Website, etc.'
                          value={applicationData.referral}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Additional Info */}
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Additional Information
                        </label>
                        <textarea
                          name='additional_info'
                          rows='3'
                          className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none'
                          placeholder="Anything else you'd like us to know..."
                          value={applicationData.additional_info}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className='border-t border-gray-100 pt-6'>
                      <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                          <input
                            id='terms'
                            name='terms'
                            type='checkbox'
                            className='w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500'
                            required
                          />
                        </div>
                        <div className='ml-3'>
                          <label
                            htmlFor='terms'
                            className='text-sm text-gray-600'
                          >
                            I agree to the{' '}
                            <a
                              href='/privacy-policy'
                              className='text-emerald-600 hover:text-emerald-700 font-medium underline'
                            >
                              Privacy Policy
                            </a>{' '}
                            and consent to the processing of my personal data
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30'
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className='animate-spin' />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className='space-y-6'>
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className='bg-white rounded-3xl p-8 shadow-sm'
              >
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold'>
                    {job.company?.charAt(0)}
                  </div>
                  <div>
                    <h4 className='text-xl font-serif font-bold text-luxury-black'>
                      {job.company}
                    </h4>
                    <p className='text-sm text-gray-500'>Industry Leader</p>
                  </div>
                </div>
                <p className='text-gray-600 font-light mb-6'>
                  {job.company_description ||
                    `${job.company} is a leading organization in the ${job.category} industry, dedicated to excellence and innovation.`}
                </p>
                {job.company_website && (
                  <a
                    href={job.company_website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block text-center py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-50 transition-all'
                  >
                    Visit Website
                  </a>
                )}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className='bg-white rounded-3xl p-8 shadow-sm'
              >
                <h4 className='text-lg font-serif font-bold text-luxury-black mb-4'>
                  Quick Actions
                </h4>
                <div className='space-y-3'>
                  <a
                    href='#apply-section'
                    className='flex items-center justify-between w-full p-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl hover:from-emerald-500 hover:to-emerald-400 transition-all group'
                  >
                    <span className='font-medium'>Apply Now</span>
                    <FaChevronDown className='transform -rotate-90 group-hover:translate-x-1 transition-transform' />
                  </a>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className='flex items-center justify-between w-full p-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-emerald-600 hover:bg-emerald-50/50 transition-all group'
                  >
                    <span className='font-medium'>
                      {isSaved ? 'Saved' : 'Save for Later'}
                    </span>
                    {isSaved ? (
                      <FaHeart className='text-red-500' />
                    ) : (
                      <FaRegHeart className='group-hover:text-emerald-600' />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Job Details Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className='bg-white rounded-3xl p-8 shadow-sm'
              >
                <h4 className='text-lg font-serif font-bold text-luxury-black mb-4'>
                  Job Overview
                </h4>
                <div className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <FaBriefcase className='text-emerald-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Job Type</p>
                      <p className='font-medium text-luxury-black'>
                        {formatEmploymentType(job.employment_type)}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <FaRegUser className='text-emerald-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Experience Level</p>
                      <p className='font-medium text-luxury-black'>
                        {job.experience_level || 'Mid Level'}
                      </p>
                    </div>
                  </div>

                  {job.education && (
                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                        <FaGraduationCap className='text-emerald-600' />
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Education</p>
                        <p className='font-medium text-luxury-black'>
                          {job.education}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <FaDollarSign className='text-emerald-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Salary Range</p>
                      <p className='font-medium text-luxury-black'>
                        {formatSalary()}
                      </p>
                    </div>
                  </div>

                  {job.application_deadline && (
                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                        <FaRegClock className='text-emerald-600' />
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>
                          Application Deadline
                        </p>
                        <p className='font-medium text-luxury-black'>
                          {formatDate(job.application_deadline)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className='bg-white rounded-3xl p-8 shadow-sm'
              >
                <h4 className='text-lg font-serif font-bold text-luxury-black mb-4'>
                  Location
                </h4>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 text-gray-600'>
                    <FaMapMarkerAlt className='text-emerald-600' />
                    <span>
                      {job.location?.city || 'Various'},{' '}
                      {job.location?.country || 'Nigeria'}
                    </span>
                  </div>
                  {job.location?.remote && (
                    <div className='flex items-center gap-3 text-emerald-600'>
                      <FaCheckCircle className='text-emerald-600' />
                      <span>Remote work available</span>
                    </div>
                  )}
                  {job.location?.hybrid && (
                    <div className='flex items-center gap-3 text-emerald-600'>
                      <FaCheckCircle className='text-emerald-600' />
                      <span>Hybrid work model</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerDetail;

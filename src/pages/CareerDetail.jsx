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
  Briefcase,
  MapPin,
  Building2,
  Calendar,
  GraduationCap,
  DollarSign,
  Clock,
  User,
  FileText,
  Upload,
  Linkedin,
  Globe,
  ArrowLeft,
  Share2,
  AlertCircle,
  CheckCircle2,
  Mail,
  Phone,
  Loader2,
  X,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Send,
  Link as LinkIcon,
  ChevronDown,
  Heart,
  Trash2,
} from 'lucide-react';

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchJobDetails();
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
      <main className="w-full bg-surface overflow-x-hidden">
        <div className="min-h-screen bg-surface flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-on-surface-variant font-body-lg">
              Loading opportunity...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !job) {
    return (
      <main className="w-full bg-surface overflow-x-hidden">
        <div className="min-h-screen bg-surface flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-500 h-12 w-12" />
            </div>
            <h2 className="font-headline-lg text-on-surface font-bold mb-4">
              Opportunity Not Found
            </h2>
            <p className="font-body-md text-on-surface-variant mb-8">{error}</p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse All Jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!job) return null;

  return (
    <main className="w-full bg-surface overflow-x-hidden">
      {/* Alert Modal */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowAlert(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative bg-surface-container-lowest rounded-3xl shadow-2xl max-w-md w-full p-8 ${
                alertType === 'error'
                  ? 'border-l-8 border-red-500'
                  : 'border-l-8 border-primary'
              }`}
            >
              <button
                onClick={() => setShowAlert(false)}
                className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X />
              </button>
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    alertType === 'error' ? 'bg-red-50' : 'bg-primary/5'
                  }`}
                >
                  {alertType === 'error' ? (
                    <AlertCircle className="text-red-500 text-2xl" />
                  ) : (
                    <CheckCircle2 className="text-primary text-2xl" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-headline-md text-on-surface font-bold mb-2 ${
                      alertType === 'error' ? 'text-red-800' : 'text-primary'
                    }`}
                  >
                    {alertType === 'error' ? 'Error' : 'Success'}
                  </h3>
                  <p
                    className={`font-body-md mb-6 ${
                      alertType === 'error' ? 'text-red-600' : 'text-primary'
                    }`}
                  >
                    {alertMessage}
                  </p>
                  <button
                    onClick={() => setShowAlert(false)}
                    className={`w-full py-3 rounded-full font-label-caps font-bold uppercase tracking-widest text-sm text-on-primary transition-all ${
                      alertType === 'error'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-primary hover:bg-primary-container'
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
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-surface-container-lowest rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-primary text-4xl" />
              </div>
              <h3 className="font-headline-md text-on-surface font-bold mb-3">
                Application Submitted!
              </h3>
              <p className="font-body-md text-on-surface-variant mb-8">
                Your application has been successfully submitted. We'll review
                it and get back to you soon.
              </p>
              <button
                onClick={() => {
                  setApplicationSuccess(false);
                  navigate('/careers');
                }}
                className="w-full py-4 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
              >
                Continue Browsing
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub Navigation Bar */}
      <nav className="bg-surface-container-lowest/80 backdrop-blur-md sticky top-[88px] z-30 border-b border-outline-variant/30">
        <div className="max-w-7xl pt-15 mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/careers"
              className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ArrowLeft className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Back to Opportunities</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                {isSaved ? (
                  <Heart className="text-red-500" fill="currentColor" />
                ) : (
                  <Heart className="text-on-surface-variant" />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <Share2 className="text-on-surface-variant" />
                </button>
                <AnimatePresence>
                  {showShareMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowShareMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-72 bg-surface-container-lowest rounded-2xl shadow-xl z-50 border border-outline-variant/30 overflow-hidden"
                      >
                        <div className="p-4">
                          <p className="text-sm font-medium text-on-surface-variant mb-3">
                            Share this opportunity
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            <button
                              onClick={shareOnFacebook}
                              className="flex flex-col items-center p-3 bg-surface rounded-xl hover:bg-surface-container transition-colors"
                            >
                              <Facebook className="text-primary text-xl mb-1" />
                              <span className="text-xs text-on-surface-variant">
                                Facebook
                              </span>
                            </button>
                            <button
                              onClick={shareOnTwitter}
                              className="flex flex-col items-center p-3 bg-surface rounded-xl hover:bg-surface-container transition-colors"
                            >
                              <Twitter className="text-primary text-xl mb-1" />
                              <span className="text-xs text-on-surface-variant">
                                Twitter
                              </span>
                            </button>
                            <button
                              onClick={shareOnLinkedIn}
                              className="flex flex-col items-center p-3 bg-surface rounded-xl hover:bg-surface-container transition-colors"
                            >
                              <Linkedin className="text-primary text-xl mb-1" />
                              <span className="text-xs text-on-surface-variant">
                                LinkedIn
                              </span>
                            </button>
                            <button
                              onClick={shareOnWhatsApp}
                              className="flex flex-col items-center p-3 bg-surface rounded-xl hover:bg-surface-container transition-colors"
                            >
                              <MessageCircle className="text-primary text-xl mb-1" />
                              <span className="text-xs text-on-surface-variant">
                                WhatsApp
                              </span>
                            </button>
                            <button
                              onClick={shareOnTelegram}
                              className="flex flex-col items-center p-3 bg-surface rounded-xl hover:bg-surface-container transition-colors"
                            >
                              <Send className="text-primary text-xl mb-1" />
                              <span className="text-xs text-on-surface-variant">
                                Telegram
                              </span>
                            </button>
                            <button
                              onClick={copyToClipboard}
                              className="col-span-3 flex items-center justify-center gap-2 p-3 bg-surface rounded-xl hover:bg-surface-container transition-colors"
                            >
                              <LinkIcon className="text-on-surface-variant" />
                              <span className="text-sm text-on-surface-variant">
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

      {/* Full-Screen Hero */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/study-group.jpg"
            alt="Career opportunity"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-24 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-label-caps font-bold uppercase tracking-wider border border-white/20">
                {job.category || 'General'}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-[11px] font-label-caps font-bold uppercase tracking-wider border border-white/20">
                {formatEmploymentType(job.employment_type)}
              </span>
              {job.location?.remote && (
                <span className="px-3.5 py-1.5 rounded-full bg-secondary-fixed/90 text-on-secondary-fixed text-[11px] font-label-caps font-bold uppercase tracking-wider">
                  Remote Available
                </span>
              )}
            </div>
            <h1 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl text-white font-bold mb-6 leading-none">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-secondary-fixed" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary-fixed" />
                <span>
                  {job.location?.city || 'Various'},{' '}
                  {job.location?.country || 'Nigeria'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-secondary-fixed" />
                <span>Posted {formatDate(job.created_at)}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="font-label-caps text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-sm border border-outline-variant/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">
                    Job Type
                  </p>
                  <p className="font-headline-sm text-on-surface font-bold">
                    {formatEmploymentType(job.employment_type)}
                  </p>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-sm border border-outline-variant/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">
                    Experience
                  </p>
                  <p className="font-headline-sm text-on-surface font-bold">
                    {job.experience_level || 'Mid'}
                  </p>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-sm border border-outline-variant/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">Salary</p>
                  <p className="font-headline-sm text-on-surface font-bold">
                    {formatSalary()}
                  </p>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-sm border border-outline-variant/30">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">
                    Deadline
                  </p>
                  <p className="font-headline-sm text-on-surface font-bold">
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
                className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/30 overflow-hidden"
              >
                <div className="border-b border-outline-variant/30">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`flex-1 py-5 px-6 text-sm font-label-caps font-bold uppercase tracking-widest transition-all relative ${
                        activeTab === 'description'
                          ? 'text-primary'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Description
                      {activeTab === 'description' && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('requirements')}
                      className={`flex-1 py-5 px-6 text-sm font-label-caps font-bold uppercase tracking-widest transition-all relative ${
                        activeTab === 'requirements'
                          ? 'text-primary'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Requirements
                      {activeTab === 'requirements' && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('responsibilities')}
                      className={`flex-1 py-5 px-6 text-sm font-label-caps font-bold uppercase tracking-widest transition-all relative ${
                        activeTab === 'responsibilities'
                          ? 'text-primary'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Responsibilities
                      {activeTab === 'responsibilities' && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {activeTab === 'description' && (
                      <motion.div
                        key="description"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="prose prose-lg max-w-none"
                      >
                        <p className="font-body-lg text-on-surface-variant leading-relaxed">
                          {job.description}
                        </p>
                      </motion.div>
                    )}

                    {activeTab === 'requirements' && (
                      <motion.div
                        key="requirements"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <ul className="space-y-4">
                          {job.requirements.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-4"
                            >
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <span className="font-body-md text-on-surface-variant">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {activeTab === 'responsibilities' && (
                      <motion.div
                        key="responsibilities"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <ul className="space-y-4">
                          {job.responsibilities.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-4"
                            >
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <span className="font-body-md text-on-surface-variant">
                                {item}
                              </span>
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
                  className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/30"
                >
                  <h3 className="font-headline-md text-on-surface font-bold mb-6">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {job.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-5 py-2.5 bg-primary/5 text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
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
                  className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/30"
                >
                  <h3 className="font-headline-md text-on-surface font-bold mb-6">
                    Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-body-md text-on-surface-variant">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Application Form */}
              <motion.div
                id="apply-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/30 scroll-mt-24"
              >
                <h3 className="font-headline-md text-on-surface font-bold mb-2">
                  Apply for this position
                </h3>
                <p className="font-body-md text-on-surface-variant mb-8">
                  Take the next step in your career journey with AOCA Resources
                </p>

                {showLoginPrompt ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12 bg-gradient-to-br from-primary/5 to-surface rounded-2xl"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <User className="text-primary text-3xl" />
                    </div>
                    <h4 className="font-headline-md text-on-surface font-bold mb-3">
                      Login Required
                    </h4>
                    <p className="font-body-md text-on-surface-variant mb-8 max-w-sm mx-auto">
                      Please login or create an account to apply for this
                      position
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/login"
                        className="px-8 py-4 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="px-8 py-4 bg-surface border-2 border-primary text-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary/5 transition-all"
                      >
                        Create Account
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          First Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          className="w-full px-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="John"
                          value={applicationData.first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          Last Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          className="w-full px-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Doe"
                          value={applicationData.last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="text-on-surface-variant" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            className="w-full pl-11 pr-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="johndoe@example.com"
                            value={applicationData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="text-on-surface-variant" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            className="w-full pl-11 pr-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="+234 123 456 7890"
                            value={applicationData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Resume Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          Resume/CV <span className="text-primary">*</span>
                        </label>
                        <label className="flex flex-col items-center justify-center w-full h-48 px-4 transition bg-surface border-2 border-outline-variant/30 border-dashed rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 group">
                          <div className="flex flex-col items-center space-y-3 text-center">
                            {resumeFile ? (
                              <>
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <FileText className="text-primary text-2xl" />
                                </div>
                                <div>
                                  <p className="font-medium text-on-surface">
                                    {resumeFile.name}
                                  </p>
                                  <p className="text-sm text-on-surface-variant">
                                    {(resumeFile.size / 1024 / 1024).toFixed(2)}{' '}
                                    MB
                                  </p>
                                </div>
                                <p className="text-xs text-primary">
                                  Click to change file
                                </p>
                              </>
                            ) : (
                              <>
                                <div className="w-16 h-16 bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                  <Upload className="text-on-surface-variant group-hover:text-primary text-2xl transition-colors" />
                                </div>
                                <div>
                                  <p className="font-medium text-on-surface">
                                    Drop your resume here or click to browse
                                  </p>
                                  <p className="text-sm text-on-surface-variant">
                                    PDF, DOC, DOCX (Max 5MB)
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                          <input
                            type="file"
                            name="resume"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            required={!applicationData.resume_url}
                          />
                        </label>
                      </div>

                      {/* Cover Letter */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          Cover Letter
                        </label>
                        <textarea
                          name="cover_letter"
                          rows="5"
                          className="w-full px-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                          placeholder="Tell us why you're the perfect fit for this role..."
                          value={applicationData.cover_letter}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          LinkedIn Profile
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Linkedin className="text-on-surface-variant" />
                          </div>
                          <input
                            type="url"
                            name="linkedin_url"
                            className="w-full pl-11 pr-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={applicationData.linkedin_url}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Portfolio */}
                      <div>
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          Portfolio/Website
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Globe className="text-on-surface-variant" />
                          </div>
                          <input
                            type="url"
                            name="portfolio_url"
                            className="w-full pl-11 pr-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="https://yourportfolio.com"
                            value={applicationData.portfolio_url}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Referral */}
                      <div>
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          How did you hear about us?
                        </label>
                        <input
                          type="text"
                          name="referral"
                          className="w-full px-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="LinkedIn, Friend, Website, etc."
                          value={applicationData.referral}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Additional Info */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-label-caps text-on-surface-variant mb-2">
                          Additional Information
                        </label>
                        <textarea
                          name="additional_info"
                          rows="3"
                          className="w-full px-4 py-3 border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                          placeholder="Anything else you'd like us to know..."
                          value={applicationData.additional_info}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="border-t border-outline-variant/30 pt-6">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="w-5 h-5 text-primary border-outline-variant/30 rounded focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="ml-3">
                          <label
                            htmlFor="terms"
                            className="text-sm text-on-surface-variant"
                          >
                            I agree to the{' '}
                            <a
                              href="/privacy-policy"
                              className="text-primary hover:text-primary-container font-medium underline"
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
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 text-sm font-label-caps uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <Send />
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/30"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-2xl flex items-center justify-center text-on-primary text-2xl font-bold">
                    {job.company?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-headline-md text-on-surface font-bold">
                      {job.company}
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      Industry Leader
                    </p>
                  </div>
                </div>
                <p className="font-body-md text-on-surface-variant mb-6">
                  {job.company_description ||
                    `${job.company} is a leading organization in the ${job.category} industry, dedicated to excellence and innovation.`}
                </p>
                {job.company_website && (
                  <a
                    href={job.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3 border-2 border-primary text-primary rounded-xl font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary/5 transition-all"
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
                className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/30"
              >
                <h4 className="font-headline-sm text-on-surface font-bold mb-4">
                  Quick Actions
                </h4>
                <div className="space-y-3">
                  <a
                    href="#apply-section"
                    className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl hover:from-primary-container hover:to-primary transition-all group"
                  >
                    <span className="font-medium">Apply Now</span>
                    <ChevronDown className="transform -rotate-90 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="flex items-center justify-between w-full p-4 border-2 border-outline-variant/30 text-on-surface rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <span className="font-medium">
                      {isSaved ? 'Saved' : 'Save for Later'}
                    </span>
                    {isSaved ? (
                      <Heart className="text-red-500" fill="currentColor" />
                    ) : (
                      <Heart className="group-hover:text-primary" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Job Details Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/30"
              >
                <h4 className="font-headline-sm text-on-surface font-bold mb-4">
                  Job Overview
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">
                        Job Type
                      </p>
                      <p className="font-medium text-on-surface">
                        {formatEmploymentType(job.employment_type)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">
                        Experience Level
                      </p>
                      <p className="font-medium text-on-surface">
                        {job.experience_level || 'Mid Level'}
                      </p>
                    </div>
                  </div>

                  {job.education && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-on-surface-variant">
                          Education
                        </p>
                        <p className="font-medium text-on-surface">
                          {job.education}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">
                        Salary Range
                      </p>
                      <p className="font-medium text-on-surface">
                        {formatSalary()}
                      </p>
                    </div>
                  </div>

                  {job.application_deadline && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-on-surface-variant">
                          Application Deadline
                        </p>
                        <p className="font-medium text-on-surface">
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
                className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/30"
              >
                <h4 className="font-headline-sm text-on-surface font-bold mb-4">
                  Location
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>
                      {job.location?.city || 'Various'},{' '}
                      {job.location?.country || 'Nigeria'}
                    </span>
                  </div>
                  {job.location?.remote && (
                    <div className="flex items-center gap-3 text-primary">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Remote work available</span>
                    </div>
                  )}
                  {job.location?.hybrid && (
                    <div className="flex items-center gap-3 text-primary">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Hybrid work model</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareerDetail;

/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaLink,
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

  // Alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error'); // 'error' or 'success'

  const [applicationData, setApplicationData] = useState({
    // REQUIRED FIELDS
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    // Optional fields
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
    // Check if user is logged in - replace with your actual auth check
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
      // Pre-fill user data if available
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
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        showAlertMessage('File too large. Maximum size is 5MB', 'error');
        e.target.value = null; // Clear the file input
        return;
      }
      setResumeFile(file);
    }
  };

  const showAlertMessage = (message, type = 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);

    // Auto-hide after 5 seconds for success messages
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

      // Upload resume if provided
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

      // Prepare submission data - INCLUDE job_id in the body
      const submissionData = {
        ...applicationData,
        resume_url: resumeUrl,
        job_id: id, // Include job_id in the body
      };

      console.log('Submitting application with data:', submissionData);

      // Submit application
      await applyForJob(id, submissionData);

      // Show success message
      showAlertMessage('Application submitted successfully!', 'success');
      setApplicationSuccess(true);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Reset form after 2 seconds
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

      // Handle specific error messages
      if (err.message.includes('File too large')) {
        showAlertMessage('File too large. Maximum size is 5MB', 'error');
      } else if (err.message.includes('Missing required fields')) {
        showAlertMessage('Please fill in all required fields', 'error');
      } else {
        showAlertMessage(
          err.message || 'Failed to submit application. Please try again.',
          'error',
        );
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL, so we copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    showAlertMessage(
      'Link copied! You can now share it on Instagram.',
      'success',
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    showAlertMessage('Job link copied to clipboard!', 'success');
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-5xl mx-auto'>
          <div className='flex items-center justify-center py-12'>
            <FaSpinner className='animate-spin text-green-600 text-4xl' />
            <span className='ml-2 text-xl font-medium text-gray-700'>
              Loading job details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-5xl mx-auto text-center'>
          <FaExclamationCircle className='text-red-500 text-5xl mx-auto mb-4' />
          <h2 className='text-2xl font-bold mb-4'>Job Not Found</h2>
          <p className='text-gray-600 mb-8'>{error}</p>
          <Link
            to='/careers'
            className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300'
          >
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className='bg-gray-50 min-h-screen relative'>
      {/* Overlay Alert */}
      {showAlert && (
        <div className='fixed inset-0 flex items-center justify-center z-50 px-4'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black bg-opacity-50 transition-opacity'
            onClick={() => setShowAlert(false)}
          ></div>

          {/* Alert Modal */}
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all ${
              alertType === 'error'
                ? 'border-l-4 border-red-500'
                : 'border-l-4 border-green-500'
            }`}
          >
            <button
              onClick={() => setShowAlert(false)}
              className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
            >
              <FaTimes />
            </button>

            <div className='flex items-start'>
              <div
                className={`flex-shrink-0 ${
                  alertType === 'error' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {alertType === 'error' ? (
                  <FaExclamationCircle className='h-6 w-6' />
                ) : (
                  <FaCheckCircle className='h-6 w-6' />
                )}
              </div>
              <div className='ml-3 flex-1'>
                <h3
                  className={`text-lg font-medium ${
                    alertType === 'error' ? 'text-red-800' : 'text-green-800'
                  }`}
                >
                  {alertType === 'error' ? 'Error' : 'Success'}
                </h3>
                <div
                  className={`mt-2 text-sm ${
                    alertType === 'error' ? 'text-red-700' : 'text-green-700'
                  }`}
                >
                  <p>{alertMessage}</p>
                </div>
                <div className='mt-4'>
                  <button
                    type='button'
                    onClick={() => setShowAlert(false)}
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white ${
                      alertType === 'error'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    } border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      alertType === 'error'
                        ? 'focus-visible:ring-red-500'
                        : 'focus-visible:ring-green-500'
                    }`}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Overlay */}
      {applicationSuccess && (
        <div className='fixed inset-0 flex items-center justify-center z-50 px-4'>
          <div className='absolute inset-0 bg-black bg-opacity-50 transition-opacity'></div>
          <div className='relative bg-white rounded-lg shadow-xl max-w-md w-full p-8 transform transition-all border-l-4 border-green-500'>
            <div className='text-center'>
              <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4'>
                <FaCheckCircle className='h-6 w-6 text-green-600' />
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                Application Submitted!
              </h3>
              <p className='text-sm text-gray-500 mb-4'>
                Your application has been successfully submitted. We'll review
                it and get back to you soon.
              </p>
              <button
                onClick={() => {
                  setApplicationSuccess(false);
                  setShowAlert(false);
                }}
                className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500'
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-5xl mx-auto'>
          {/* Back Button */}
          <Link
            to='/careers'
            className='inline-flex items-center text-green-600 hover:text-green-800 mb-6'
          >
            <FaArrowLeft className='mr-2' />
            Back to Jobs
          </Link>

          {/* Job Header */}
          <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
            <div className='flex flex-wrap justify-between items-start gap-4 mb-4'>
              <div>
                <h1 className='text-3xl font-bold mb-2 text-gray-900'>
                  {job.title}
                </h1>
                <div className='flex flex-wrap items-center gap-4 text-gray-600'>
                  <div className='flex items-center'>
                    <FaBuilding className='mr-2 text-green-600' />
                    {job.company}
                  </div>
                  <div className='flex items-center'>
                    <FaMapMarkerAlt className='mr-2 text-green-600' />
                    {job.location.city}, {job.location.country}
                    {job.location.remote && ' (Remote)'}
                  </div>
                  <div className='flex items-center'>
                    <FaCalendarAlt className='mr-2 text-green-600' />
                    Posted {formatDate(job.created_at)}
                  </div>
                </div>
              </div>

              <div className='flex gap-2'>
                {job.is_featured && (
                  <span className='bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-1 rounded-full'>
                    Featured
                  </span>
                )}
                <span className='bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full'>
                  {job.employment_type}
                </span>
              </div>
            </div>

            {/* Quick Apply and Share Buttons */}
            <div className='mt-6 flex flex-col sm:flex-row gap-4'>
              <a
                href='#apply-section'
                className='bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 text-center flex-1'
              >
                Apply Now
              </a>
              <div className='relative flex-1'>
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className='w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-md transition duration-300 text-center flex items-center justify-center'
                >
                  <FaShareAlt className='mr-2' />
                  Share Job
                </button>

                {/* Share Menu Dropdown */}
                {showShareMenu && (
                  <>
                    {/* Backdrop */}
                    <div
                      className='fixed inset-0 z-40'
                      onClick={() => setShowShareMenu(false)}
                    ></div>

                    {/* Share Menu */}
                    <div className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 border border-gray-200'>
                      <div className='p-2'>
                        <div className='text-sm font-medium text-gray-700 px-3 py-2 border-b'>
                          Share via
                        </div>
                        <div className='grid grid-cols-2 gap-1 mt-2'>
                          <button
                            onClick={shareOnFacebook}
                            className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors'
                          >
                            <FaFacebook className='mr-2 text-blue-600' />
                            Facebook
                          </button>
                          <button
                            onClick={shareOnTwitter}
                            className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors'
                          >
                            <FaTwitter className='mr-2 text-blue-400' />
                            Twitter
                          </button>
                          <button
                            onClick={shareOnLinkedIn}
                            className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors'
                          >
                            <FaLinkedin className='mr-2 text-blue-700' />
                            LinkedIn
                          </button>
                          <button
                            onClick={shareOnWhatsApp}
                            className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md transition-colors'
                          >
                            <FaWhatsapp className='mr-2 text-green-500' />
                            WhatsApp
                          </button>
                          <button
                            onClick={shareOnTelegram}
                            className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors'
                          >
                            <FaTelegram className='mr-2 text-blue-500' />
                            Telegram
                          </button>
                          <button
                            onClick={shareOnInstagram}
                            className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 rounded-md transition-colors'
                          >
                            <FaInstagram className='mr-2 text-pink-600' />
                            Instagram
                          </button>
                          <button
                            onClick={copyToClipboard}
                            className='flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors col-span-2'
                          >
                            <FaLink className='mr-2 text-gray-600' />
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Left Column - Job Details */}
            <div className='md:col-span-2 space-y-8'>
              {/* Job Description */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <div className='space-y-6'>
                  <div>
                    <h2 className='text-xl font-semibold mb-3 text-gray-800'>
                      Description
                    </h2>
                    <p className='text-gray-700 leading-relaxed'>
                      {job.description}
                    </p>
                  </div>

                  <div>
                    <h2 className='text-xl font-semibold mb-3 text-gray-800'>
                      Responsibilities
                    </h2>
                    <ul className='list-disc pl-5 space-y-2 text-gray-700'>
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className='text-xl font-semibold mb-3 text-gray-800'>
                      Requirements
                    </h2>
                    <ul className='list-disc pl-5 space-y-2 text-gray-700'>
                      {job.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {job.benefits && job.benefits.length > 0 && (
                    <div>
                      <h2 className='text-xl font-semibold mb-3 text-gray-800'>
                        Benefits
                      </h2>
                      <ul className='list-disc pl-5 space-y-2 text-gray-700'>
                        {job.benefits.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h2 className='text-xl font-semibold mb-3 text-gray-800'>
                      Skills
                    </h2>
                    <div className='flex flex-wrap gap-2'>
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className='bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div
                id='apply-section'
                className='bg-white rounded-lg shadow-md p-6 scroll-mt-24'
              >
                <h2 className='text-xl font-semibold mb-6 text-gray-800'>
                  Apply for this position
                </h2>

                {showLoginPrompt ? (
                  <div className='text-center py-8 bg-gray-50 rounded-lg border border-gray-200'>
                    <FaUser className='text-green-500 text-4xl mx-auto mb-4' />
                    <h3 className='text-lg font-semibold mb-2'>
                      Login Required
                    </h3>
                    <p className='text-gray-600 mb-6'>
                      Please login to apply for this position
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                      <Link
                        to='/login'
                        className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300'
                      >
                        Login
                      </Link>
                      <Link
                        to='/register'
                        className='bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-md transition duration-300'
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      {/* First Name */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          First Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          name='first_name'
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                          placeholder='John'
                          value={applicationData.first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Last Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          name='last_name'
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                          placeholder='Doe'
                          value={applicationData.last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Email Address <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <FaEnvelope className='text-gray-400' />
                          </div>
                          <input
                            type='email'
                            name='email'
                            className='w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='johndoe@example.com'
                            value={applicationData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Phone Number <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <FaPhone className='text-gray-400' />
                          </div>
                          <input
                            type='tel'
                            name='phone'
                            className='w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='+1 (555) 123-4567'
                            value={applicationData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Resume Upload */}
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Resume/CV <span className='text-red-500'>*</span>
                        </label>
                        <div className='flex items-center gap-4'>
                          <div className='flex-grow'>
                            <label className='flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-500 focus:outline-none'>
                              <span className='flex flex-col items-center space-y-2'>
                                {resumeFile ? (
                                  <>
                                    <FaFileAlt className='text-green-500 text-2xl' />
                                    <span className='font-medium text-gray-600'>
                                      {resumeFile.name}
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                      Click to change file
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FaUpload className='text-gray-400 text-2xl' />
                                    <span className='font-medium text-gray-600'>
                                      Drop files to upload or click
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                      PDF, DOC, DOCX (Max 5MB)
                                    </span>
                                  </>
                                )}
                              </span>
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
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Cover Letter
                        </label>
                        <textarea
                          name='cover_letter'
                          rows='5'
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                          placeholder="Tell us why you're a good fit for this position"
                          value={applicationData.cover_letter}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          LinkedIn Profile
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <FaLinkedin className='text-gray-400' />
                          </div>
                          <input
                            type='url'
                            name='linkedin_url'
                            className='w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='https://linkedin.com/in/yourprofile'
                            value={applicationData.linkedin_url}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Portfolio */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Portfolio/Website
                        </label>
                        <div className='relative'>
                          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <FaGlobe className='text-gray-400' />
                          </div>
                          <input
                            type='url'
                            name='portfolio_url'
                            className='w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='https://yourportfolio.com'
                            value={applicationData.portfolio_url}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Referral */}
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Referral (if any)
                        </label>
                        <input
                          type='text'
                          name='referral'
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                          placeholder='How did you hear about this position?'
                          value={applicationData.referral}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Additional Info */}
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Additional Information
                        </label>
                        <textarea
                          name='additional_info'
                          rows='3'
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                          placeholder="Any additional information you'd like to share"
                          value={applicationData.additional_info}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className='border-t border-gray-200 pt-4'>
                      <div className='flex items-start mb-4'>
                        <div className='flex items-center h-5'>
                          <input
                            id='terms'
                            name='terms'
                            type='checkbox'
                            className='focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded'
                            required
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label htmlFor='terms' className='text-gray-700'>
                            I agree to the{' '}
                            <a
                              href='/privacy-policy'
                              className='text-green-600 hover:text-green-800'
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
                      className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 disabled:opacity-50 flex items-center justify-center'
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className='animate-spin mr-2' />
                          Submitting Application...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column - Job Info */}
            <div className='space-y-6'>
              {/* Job Details Card */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  Job Details
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-start'>
                    <FaBriefcase className='text-green-500 mt-1 mr-3' />
                    <div>
                      <p className='text-sm font-medium text-gray-700'>
                        Job Type
                      </p>
                      <p className='text-gray-600'>{job.employment_type}</p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <FaUser className='text-green-500 mt-1 mr-3' />
                    <div>
                      <p className='text-sm font-medium text-gray-700'>
                        Experience Level
                      </p>
                      <p className='text-gray-600'>{job.experience_level}</p>
                    </div>
                  </div>

                  {job.education && (
                    <div className='flex items-start'>
                      <FaGraduationCap className='text-green-500 mt-1 mr-3' />
                      <div>
                        <p className='text-sm font-medium text-gray-700'>
                          Education
                        </p>
                        <p className='text-gray-600'>{job.education}</p>
                      </div>
                    </div>
                  )}

                  {(job.salary_min || job.salary_max) && (
                    <div className='flex items-start'>
                      <FaDollarSign className='text-green-500 mt-1 mr-3' />
                      <div>
                        <p className='text-sm font-medium text-gray-700'>
                          Salary
                        </p>
                        <p className='text-gray-600'>
                          {job.salary_min && job.salary_max
                            ? `${
                                job.salary_currency
                              } ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
                            : job.salary_min
                              ? `From ${
                                  job.salary_currency
                                } ${job.salary_min.toLocaleString()}`
                              : job.salary_max
                                ? `Up to ${
                                    job.salary_currency
                                  } ${job.salary_max.toLocaleString()}`
                                : 'Not specified'}
                        </p>
                      </div>
                    </div>
                  )}

                  {job.application_deadline && (
                    <div className='flex items-start'>
                      <FaClock className='text-green-500 mt-1 mr-3' />
                      <div>
                        <p className='text-sm font-medium text-gray-700'>
                          Application Deadline
                        </p>
                        <p className='text-gray-600'>
                          {formatDate(job.application_deadline)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Info */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  About {job.company}
                </h3>
                <p className='text-gray-600 mb-4'>
                  {job.company_description ||
                    `${job.company} is a leading organization in the ${job.category} industry.`}
                </p>
                {job.company_website && (
                  <a
                    href={job.company_website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block text-center bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-4 rounded-md transition duration-300'
                  >
                    Visit Company Website
                  </a>
                )}
              </div>

              {/* Quick Share Card */}
              <div className='bg-white rounded-lg shadow-md p-6'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  Quick Share
                </h3>
                <div className='grid grid-cols-4 gap-2'>
                  <button
                    onClick={shareOnFacebook}
                    className='flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                    title='Share on Facebook'
                  >
                    <FaFacebook className='text-blue-600 text-xl mb-1' />
                    <span className='text-xs text-gray-600'>Facebook</span>
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className='flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                    title='Share on Twitter'
                  >
                    <FaTwitter className='text-blue-400 text-xl mb-1' />
                    <span className='text-xs text-gray-600'>Twitter</span>
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className='flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                    title='Share on LinkedIn'
                  >
                    <FaLinkedin className='text-blue-700 text-xl mb-1' />
                    <span className='text-xs text-gray-600'>LinkedIn</span>
                  </button>
                  <button
                    onClick={shareOnWhatsApp}
                    className='flex flex-col items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'
                    title='Share on WhatsApp'
                  >
                    <FaWhatsapp className='text-green-500 text-xl mb-1' />
                    <span className='text-xs text-gray-600'>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Similar Jobs */}
              {job.similar_jobs && job.similar_jobs.length > 0 && (
                <div className='bg-white rounded-lg shadow-md p-6'>
                  <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                    Similar Jobs
                  </h3>
                  <div className='space-y-3'>
                    {job.similar_jobs.map((similarJob) => (
                      <Link
                        key={similarJob._id}
                        to={`/careers/${similarJob._id}`}
                        className='block p-3 border border-gray-200 rounded-md hover:bg-green-50 transition duration-300'
                      >
                        <h4 className='font-medium text-gray-900'>
                          {similarJob.title}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {similarJob.company}
                        </p>
                        <div className='flex items-center text-xs text-gray-500 mt-1'>
                          <FaMapMarkerAlt className='mr-1' />
                          <span>
                            {similarJob.location.city},{' '}
                            {similarJob.location.country}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;

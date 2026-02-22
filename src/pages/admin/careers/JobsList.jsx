/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiEdit,
  FiEye,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiUsers,
  FiShare2,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiCopy,
  FiMail,
  FiGrid,
  FiList,
} from 'react-icons/fi';
import {
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaTimes,
  FaCheckCircle,
} from 'react-icons/fa';
import { adminService } from '../../../services/admin-service';
import { formatDate } from '../../../utils/formatters';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [publishedFilter, setPublishedFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, [currentPage, categoryFilter, publishedFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        category: categoryFilter || undefined,
        search: searchTerm || undefined,
        is_published: publishedFilter || undefined,
      };
      const data = await adminService.getJobs(params);
      setJobs(data.jobs || []);
      setTotalJobs(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await adminService.getJobCategories();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchJobs();
    setMobileMenuOpen(false);
  };

  const handleDelete = async (jobId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this job? This action cannot be undone.',
      )
    ) {
      try {
        await adminService.deleteJob(jobId);
        setJobs(jobs.filter((job) => job._id !== jobId));
        alert('Job deleted successfully');
      } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  // Share functions
  const openShareModal = (job) => {
    setSelectedJob(job);
    setShowShareModal(true);
    setShareSuccess(false);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setSelectedJob(null);
    setShareSuccess(false);
  };

  const getShareText = (job) => {
    return encodeURIComponent(
      `Check out this ${job?.title} position at ${job?.company}!`,
    );
  };

  const getShareUrl = (job) => {
    return encodeURIComponent(
      `${window.location.origin}/career/jobs/${job?._id}`,
    );
  };

  const shareOnFacebook = (job) => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${getShareUrl(job)}`,
      '_blank',
      'width=600,height=400',
    );
    closeShareModal();
  };

  const shareOnTwitter = (job) => {
    window.open(
      `https://twitter.com/intent/tweet?text=${getShareText(job)}&url=${getShareUrl(job)}`,
      '_blank',
      'width=600,height=400',
    );
    closeShareModal();
  };

  const shareOnLinkedIn = (job) => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${getShareUrl(job)}`,
      '_blank',
      'width=600,height=400',
    );
    closeShareModal();
  };

  const shareOnWhatsApp = (job) => {
    window.open(
      `https://wa.me/?text=${getShareText(job)}%20${getShareUrl(job)}`,
      '_blank',
    );
    closeShareModal();
  };

  const shareOnTelegram = (job) => {
    window.open(
      `https://t.me/share/url?url=${getShareUrl(job)}&text=${getShareText(job)}`,
      '_blank',
    );
    closeShareModal();
  };

  const shareOnInstagram = (job) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/careers/jobs/${job?._id}`,
    );
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      closeShareModal();
    }, 2000);
  };

  const copyToClipboard = (job) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/careers/jobs/${job?._id}`,
    );
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      closeShareModal();
    }, 2000);
  };

  const shareViaEmail = (job) => {
    const subject = encodeURIComponent(
      `Job Opportunity: ${job?.title} at ${job?.company}`,
    );
    const body = encodeURIComponent(
      `Check out this job opportunity:\n\n` +
        `Position: ${job?.title}\n` +
        `Company: ${job?.company}\n` +
        `Location: ${job?.location?.city}, ${job?.location?.country}\n` +
        `Type: ${job?.employment_type}\n\n` +
        `View details: ${window.location.origin}/careers/jobs/${job?._id}`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    closeShareModal();
  };

  // Mobile filter toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Share Modal */}
      {showShareModal && selectedJob && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75'
              onClick={closeShareModal}
            ></div>

            <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full max-w-md mx-4'>
              <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                    <FiShare2 className='w-6 h-6 text-green-600' />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Share Job
                    </h3>
                    <p className='mt-2 text-sm text-gray-500 break-words'>
                      {selectedJob.title} at {selectedJob.company}
                    </p>

                    {shareSuccess ? (
                      <div className='mt-6 flex flex-col items-center justify-center py-8'>
                        <FaCheckCircle className='w-16 h-16 text-green-500 mb-4' />
                        <p className='text-green-600 font-medium'>
                          Link copied successfully!
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className='mt-6 grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3'>
                          <button
                            onClick={() => shareOnFacebook(selectedJob)}
                            className='flex flex-col items-center p-2 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                          >
                            <FiFacebook className='text-blue-600 text-xl sm:text-2xl mb-1 sm:mb-2' />
                            <span className='text-xs text-gray-600 truncate w-full text-center'>
                              FB
                            </span>
                          </button>

                          <button
                            onClick={() => shareOnTwitter(selectedJob)}
                            className='flex flex-col items-center p-2 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                          >
                            <FiTwitter className='text-blue-400 text-xl sm:text-2xl mb-1 sm:mb-2' />
                            <span className='text-xs text-gray-600 truncate w-full text-center'>
                              X
                            </span>
                          </button>

                          <button
                            onClick={() => shareOnLinkedIn(selectedJob)}
                            className='flex flex-col items-center p-2 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                          >
                            <FiLinkedin className='text-blue-700 text-xl sm:text-2xl mb-1 sm:mb-2' />
                            <span className='text-xs text-gray-600 truncate w-full text-center'>
                              IN
                            </span>
                          </button>

                          <button
                            onClick={() => shareOnWhatsApp(selectedJob)}
                            className='flex flex-col items-center p-2 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'
                          >
                            <FaWhatsapp className='text-green-500 text-xl sm:text-2xl mb-1 sm:mb-2' />
                            <span className='text-xs text-gray-600 truncate w-full text-center'>
                              WA
                            </span>
                          </button>

                          <button
                            onClick={() => shareOnTelegram(selectedJob)}
                            className='flex flex-col items-center p-2 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                          >
                            <FaTelegram className='text-blue-500 text-xl sm:text-2xl mb-1 sm:mb-2' />
                            <span className='text-xs text-gray-600 truncate w-full text-center'>
                              TG
                            </span>
                          </button>

                          <button
                            onClick={() => shareOnInstagram(selectedJob)}
                            className='flex flex-col items-center p-2 sm:p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors'
                          >
                            <FaInstagram className='text-pink-600 text-xl sm:text-2xl mb-1 sm:mb-2' />
                            <span className='text-xs text-gray-600 truncate w-full text-center'>
                              IG
                            </span>
                          </button>

                          <button
                            onClick={() => copyToClipboard(selectedJob)}
                            className='flex flex-col items-center p-2 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                          >
                            <FiCopy className='text-gray-600 text-xl sm:text-2xl mb-1 sm:mb-2' />
                            <span className='text-xs text-gray-600 truncate w-full text-center'>
                              Copy
                            </span>
                          </button>

                          <button
                            onClick={() => shareViaEmail(selectedJob)}
                            className='flex flex-col items-center p-2 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                          >
                            <FiMail className='text-gray-600 text-xl sm:text-2xl mb-1 sm:mb-2' />
                            <span className='text-xs text-gray-600 truncate w-full text-center'>
                              Email
                            </span>
                          </button>
                        </div>

                        <div className='mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg'>
                          <h4 className='text-xs sm:text-sm font-medium text-gray-700 mb-2'>
                            Job Summary
                          </h4>
                          <p className='text-xs sm:text-sm text-gray-600 mb-1 break-words'>
                            <span className='font-medium'>Title:</span>{' '}
                            {selectedJob.title}
                          </p>
                          <p className='text-xs sm:text-sm text-gray-600 mb-1 break-words'>
                            <span className='font-medium'>Company:</span>{' '}
                            {selectedJob.company}
                          </p>
                          <p className='text-xs sm:text-sm text-gray-600 break-words'>
                            <span className='font-medium'>Location:</span>{' '}
                            {selectedJob.location?.city},{' '}
                            {selectedJob.location?.country}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  onClick={closeShareModal}
                  className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm'
                >
                  <FaTimes className='w-4 h-4 mr-2' />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className='bg-white border-b sticky top-0 z-30'>
        <div className='px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                Job Listings
              </h1>
              <p className='text-sm text-gray-600 mt-1'>
                Manage all job postings
              </p>
            </div>

            <div className='flex items-center gap-2'>
              {/* View toggle - hidden on mobile */}
              <div className='hidden sm:flex items-center bg-gray-100 rounded-lg p-1'>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white shadow text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title='Table View'
                >
                  <FiList className='w-5 h-5' />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white shadow text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title='Grid View'
                >
                  <FiGrid className='w-5 h-5' />
                </button>
              </div>

              <button
                onClick={() => navigate('/admin/careers/jobs/new')}
                className='bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md flex items-center text-sm sm:text-base'
              >
                <FiPlus className='mr-2' />
                <span className='hidden sm:inline'>Add New Job</span>
                <span className='sm:hidden'>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className='sm:hidden bg-white border-b px-4 py-2 sticky top-[73px] z-20'>
        <button
          onClick={toggleMobileMenu}
          className='w-full flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg'
        >
          <span className='flex items-center text-gray-700'>
            <FiFilter className='mr-2' />
            Filters & Search
          </span>
          <span
            className={`transform transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
          >
            ▼
          </span>
        </button>
      </div>

      {/* Filters - Desktop always visible, Mobile toggleable */}
      <div
        className={`px-4 sm:px-6 lg:px-8 py-4 ${mobileMenuOpen ? 'block' : 'hidden sm:block'}`}
      >
        <div className='bg-white rounded-lg shadow-md p-4 sm:p-6'>
          <form onSubmit={handleSearch} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='lg:col-span-2'>
                <div className='relative'>
                  <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Search jobs, companies, locations...'
                    className='w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className='relative'>
                <FiFilter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10' />
                <select
                  className='w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white text-sm'
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value=''>All Categories</option>
                  {categories.map((category) => (
                    <option
                      key={category._id || category.id}
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='relative'>
                <FiFilter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10' />
                <select
                  className='w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white text-sm'
                  value={publishedFilter}
                  onChange={(e) => setPublishedFilter(e.target.value)}
                >
                  <option value=''>All Status</option>
                  <option value='true'>Published</option>
                  <option value='false'>Draft</option>
                </select>
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm'
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className='px-4 sm:px-6 lg:px-8 mt-4'>
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
            role='alert'
          >
            <strong className='font-bold'>Error!</strong>
            <span className='block sm:inline'> {error}</span>
          </div>
        </div>
      )}

      {/* Jobs display */}
      <div className='px-4 sm:px-6 lg:px-8 py-4'>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
          </div>
        ) : jobs.length > 0 ? (
          <>
            {/* Table View (Desktop default) */}
            {viewMode === 'table' ? (
              <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Job Title
                        </th>
                        <th className='hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Company
                        </th>
                        <th className='hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Category
                        </th>
                        <th className='hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Location
                        </th>
                        <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Status
                        </th>
                        <th className='hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Apps
                        </th>
                        <th className='px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {jobs.map((job) => (
                        <tr key={job._id} className='hover:bg-gray-50'>
                          <td className='px-4 sm:px-6 py-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {job.title}
                            </div>
                            <div className='text-xs text-gray-500 sm:hidden mt-1'>
                              {job.company} • {job.location?.city}
                            </div>
                            <div className='text-xs text-gray-400'>
                              {formatDate(job.created_at)}
                            </div>
                          </td>
                          <td className='hidden sm:table-cell px-4 sm:px-6 py-4'>
                            <div className='text-sm text-gray-900'>
                              {job.company}
                            </div>
                          </td>
                          <td className='hidden md:table-cell px-4 sm:px-6 py-4'>
                            <div className='text-sm text-gray-900'>
                              {job.category}
                            </div>
                          </td>
                          <td className='hidden lg:table-cell px-4 sm:px-6 py-4'>
                            <div className='text-sm text-gray-900'>
                              {job.location?.city}, {job.location?.country}
                              {job.location?.remote && (
                                <span className='ml-1 text-green-600 text-xs'>
                                  (Remote)
                                </span>
                              )}
                            </div>
                          </td>
                          <td className='px-4 sm:px-6 py-4'>
                            <div className='flex flex-col gap-1'>
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full w-fit ${
                                  job.is_published
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {job.is_published ? 'Published' : 'Draft'}
                              </span>
                              {job.is_featured && (
                                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 w-fit'>
                                  Featured
                                </span>
                              )}
                            </div>
                          </td>
                          <td className='hidden md:table-cell px-4 sm:px-6 py-4'>
                            <div className='flex items-center'>
                              <FiUsers className='mr-1 h-4 w-4 text-gray-500' />
                              <span className='text-sm text-gray-900'>
                                {job.applications_count || 0}
                              </span>
                            </div>
                          </td>
                          <td className='px-4 sm:px-6 py-4'>
                            <div className='flex flex-wrap items-center gap-2'>
                              <button
                                onClick={() =>
                                  navigate(`/careers/jobs/${job._id}`)
                                }
                                className='text-green-600 hover:text-green-900 p-1'
                                title='View Job'
                              >
                                <FiEye className='h-4 w-4 sm:h-5 sm:w-5' />
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/careers/jobs/${job._id}/edit`,
                                  )
                                }
                                className='text-blue-600 hover:text-blue-900 p-1'
                                title='Edit Job'
                              >
                                <FiEdit className='h-4 w-4 sm:h-5 sm:w-5' />
                              </button>
                              <button
                                onClick={() => openShareModal(job)}
                                className='text-purple-600 hover:text-purple-900 p-1'
                                title='Share Job'
                              >
                                <FiShare2 className='h-4 w-4 sm:h-5 sm:w-5' />
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/careers/applications?job_id=${job._id}`,
                                  )
                                }
                                className='text-indigo-600 hover:text-indigo-900 p-1'
                                title='View Applications'
                              >
                                <FiUsers className='h-4 w-4 sm:h-5 sm:w-5' />
                              </button>
                              <button
                                onClick={() => handleDelete(job._id)}
                                className='text-red-600 hover:text-red-900 p-1'
                                title='Delete Job'
                              >
                                <FiTrash2 className='h-4 w-4 sm:h-5 sm:w-5' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Grid View (Alternative) */
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className='bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow'
                  >
                    <div className='flex justify-between items-start mb-3'>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {job.title}
                        </h3>
                        <p className='text-sm text-gray-600'>{job.company}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          job.is_published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {job.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    <div className='space-y-2 mb-4'>
                      <p className='text-sm text-gray-500'>
                        📍 {job.location?.city}, {job.location?.country}
                        {job.location?.remote && ' (Remote)'}
                      </p>
                      <p className='text-sm text-gray-500'>
                        📂 {job.category} • {job.employment_type}
                      </p>
                      <p className='text-sm text-gray-500'>
                        📅 Posted {formatDate(job.created_at)}
                      </p>
                      <p className='text-sm text-gray-500 flex items-center'>
                        <FiUsers className='mr-1' />{' '}
                        {job.applications_count || 0} applications
                      </p>
                    </div>

                    {job.is_featured && (
                      <span className='inline-block mb-3 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800'>
                        Featured
                      </span>
                    )}

                    <div className='flex flex-wrap items-center gap-2 pt-3 border-t'>
                      <button
                        onClick={() => navigate(`/careers/jobs/${job._id}`)}
                        className='flex-1 min-w-[40px] p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors'
                        title='View'
                      >
                        <FiEye className='h-4 w-4 mx-auto' />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/careers/jobs/${job._id}/edit`)
                        }
                        className='flex-1 min-w-[40px] p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                        title='Edit'
                      >
                        <FiEdit className='h-4 w-4 mx-auto' />
                      </button>
                      <button
                        onClick={() => openShareModal(job)}
                        className='flex-1 min-w-[40px] p-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors'
                        title='Share'
                      >
                        <FiShare2 className='h-4 w-4 mx-auto' />
                      </button>
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/careers/applications?job_id=${job._id}`,
                          )
                        }
                        className='flex-1 min-w-[40px] p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors'
                        title='Applications'
                      >
                        <FiUsers className='h-4 w-4 mx-auto' />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className='flex-1 min-w-[40px] p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors'
                        title='Delete'
                      >
                        <FiTrash2 className='h-4 w-4 mx-auto' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination - Responsive */}
            <div className='mt-6 bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg shadow'>
              <div className='text-sm text-gray-700 order-2 sm:order-1'>
                Page <span className='font-medium'>{currentPage}</span> of{' '}
                <span className='font-medium'>{totalPages}</span> ({totalJobs}{' '}
                total jobs)
              </div>
              <div className='flex items-center gap-2 order-1 sm:order-2'>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border text-sm ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <div className='flex gap-1'>
                  {[...Array(Math.min(3, totalPages)).keys()].map((i) => {
                    const pageNumber =
                      currentPage > 2 ? currentPage - 2 + i + 1 : i + 1;
                    if (pageNumber <= totalPages && pageNumber > 0) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`hidden sm:block px-3 py-1 rounded-md border text-sm ${
                            currentPage === pageNumber
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border text-sm ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className='bg-white rounded-lg shadow-md p-8 sm:p-12 text-center'>
            <FiSearch className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-500 text-lg'>No jobs found</p>
            <p className='text-gray-400 text-sm mt-2'>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => navigate('/admin/careers/jobs/new')}
              className='mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center mx-auto'
            >
              <FiPlus className='mr-2' />
              Add New Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;

/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Download,
  ChevronLeft,
  Calendar,
  Link as LinkIcon,
  Phone,
  Mail,
  Save,
  Loader,
  User,
  FileText,
  Send,
  X,
} from 'lucide-react';
import { toast } from 'react-toastify';
import {
  getApplicationById,
  updateApplication,
} from '../../../services/admin-service';
import { formatDate } from '../../../utils/formatters';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    status: 'applied',
    admin_notes: '',
    interview_date: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // State for interview email prompt
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [previousInterviewDate, setPreviousInterviewDate] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const data = await getApplicationById(id);
        console.log('Fetched application details:', data);
        setApplication(data);
        setFormData({
          status: data.status,
          admin_notes: data.admin_notes || '',
          interview_date: data.interview_date || '',
        });
        setPreviousInterviewDate(data.interview_date || '');
      } catch (err) {
        setError(err.message || 'Failed to fetch application');
        toast.error('Failed to fetch application details');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    // Check if interview date is being set (changed from empty to value)
    const isInterviewDateBeingSet =
      formData.interview_date && !previousInterviewDate;

    try {
      setLoading(true);
      await updateApplication(id, formData);
      const updatedData = await getApplicationById(id);
      setApplication(updatedData);

      // Update previous interview date
      setPreviousInterviewDate(formData.interview_date);

      // Show email prompt if interview date was set
      if (isInterviewDateBeingSet) {
        setShowEmailPrompt(true);
      }

      setIsEditing(false);
      toast.success('Application updated successfully');
    } catch (err) {
      toast.error('Failed to update application');
      console.error('Error updating application:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = () => {
    if (application?.resume_url) {
      window.open(application.resume_url, '_blank');
    } else {
      toast.error('No resume URL available');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'applied':
        return 'Applied';
      case 'reviewing':
        return 'Reviewing';
      case 'interview':
        return 'Interview';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const formatInterviewDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openEmailClient = () => {
    const subject = encodeURIComponent(
      `Interview Invitation: ${application.job?.title} position`,
    );
    const body = encodeURIComponent(
      `Dear ${application.first_name} ${application.last_name},\n\n` +
        `We are pleased to invite you for an interview for the ${application.job?.title} position at ${application.job?.company}.\n\n` +
        `Interview Details:\n` +
        `Date: ${formatInterviewDate(formData.interview_date)}\n\n` +
        `Please let us know if this time works for you. If you have any questions or need to reschedule, feel free to reply to this email.\n\n` +
        `Best regards,\n` +
        `The Recruitment Team\n` +
        `${application.job?.company}`,
    );

    window.location.href = `mailto:${application.email}?subject=${subject}&body=${body}`;
    setShowEmailPrompt(false);
    toast.info('Email client opened - please send the interview invitation');
  };

  if (loading && !application) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='h-12 w-12 text-green-600 animate-spin' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6'>
        <div className='bg-white rounded-lg shadow-md p-6 text-center'>
          <p className='text-red-500'>{error}</p>
          <Link
            to='/admin/careers/applications'
            className='text-green-600 mt-4 inline-block hover:underline'
          >
            Back to applications
          </Link>
        </div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div className='p-6 max-w-7xl mx-auto relative'>
      {/* Email Prompt Modal */}
      {showEmailPrompt && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            {/* Background overlay */}
            <div
              className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75'
              onClick={() => setShowEmailPrompt(false)}
            ></div>

            {/* Modal panel */}
            <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                    <Calendar className='w-6 h-6 text-green-600' />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Send Interview Invitation
                    </h3>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        You have scheduled an interview for{' '}
                        <span className='font-semibold text-gray-700'>
                          {application.first_name} {application.last_name}
                        </span>
                        .
                      </p>
                      <p className='mt-2 text-sm text-gray-500'>
                        <span className='font-semibold'>Interview Date:</span>{' '}
                        {formatInterviewDate(formData.interview_date)}
                      </p>
                      <p className='mt-4 text-sm text-gray-500'>
                        Would you like to send an email invitation to the
                        candidate?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  onClick={openEmailClient}
                  className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  <Send className='w-4 h-4 mr-2' />
                  Send Email
                </button>
                <button
                  type='button'
                  onClick={() => setShowEmailPrompt(false)}
                  className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  <X className='w-4 h-4 mr-2' />
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mb-6'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center text-green-600 hover:text-green-800 hover:underline'
        >
          <ChevronLeft className='h-5 w-5 mr-1' />
          Back to Applications
        </button>
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Main Content */}
        <div className='flex-1'>
          <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
            <div className='p-6 border-b flex justify-between items-center flex-wrap gap-4'>
              <div>
                <h1 className='text-2xl font-bold text-gray-800'>
                  {application.job?.title || 'N/A'}
                </h1>
                <p className='text-gray-600'>
                  {application.job?.company || 'N/A'}
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <button
                  onClick={downloadResume}
                  className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                  disabled={!application.resume_url}
                >
                  <Download className='h-4 w-4 mr-2' />
                  Download Resume
                </button>
              </div>
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div>
                  <h2 className='text-lg font-semibold text-gray-800 mb-4'>
                    Application Details
                  </h2>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm text-gray-500'>Application ID</p>
                      <p className='text-gray-800 font-mono text-sm'>
                        {application._id}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Applied On</p>
                      <p className='text-gray-800'>
                        {formatDate(application.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Status</p>
                      {isEditing ? (
                        <select
                          name='status'
                          value={formData.status}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md ${
                            formData.status === 'applied'
                              ? 'bg-blue-100 text-blue-800'
                              : formData.status === 'reviewing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : formData.status === 'interview'
                                  ? 'bg-purple-100 text-purple-800'
                                  : formData.status === 'accepted'
                                    ? 'bg-green-100 text-green-800'
                                    : formData.status === 'rejected'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value='applied'>Applied</option>
                          <option value='reviewing'>Reviewing</option>
                          <option value='interview'>Interview</option>
                          <option value='accepted'>Accepted</option>
                          <option value='rejected'>Rejected</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            application.status,
                          )}`}
                        >
                          {getStatusDisplay(application.status)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Referral Source</p>
                      <p className='text-gray-800'>
                        {application.referral || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className='text-lg font-semibold text-gray-800 mb-4'>
                    Candidate Information
                  </h2>
                  <div className='space-y-4'>
                    {/* Candidate Name */}
                    <div className='flex items-start'>
                      <div className='flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-green-100 flex items-center justify-center'>
                        <User className='h-5 w-5 text-green-600' />
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm font-medium text-gray-900'>
                          {application.first_name} {application.last_name}
                        </p>
                        <p className='text-sm text-gray-500 flex items-center'>
                          <Mail className='h-3 w-3 mr-1' />
                          {application.email}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <p className='text-sm text-gray-500'>Phone</p>
                      <p className='text-gray-800 flex items-center'>
                        <Phone className='h-4 w-4 mr-2 text-gray-400' />
                        {application.phone || 'Not provided'}
                      </p>
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <p className='text-sm text-gray-500'>LinkedIn</p>
                      <p className='text-gray-800'>
                        {application.linkedin_url ? (
                          <a
                            href={application.linkedin_url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-green-600 hover:underline flex items-center'
                          >
                            <LinkIcon className='h-4 w-4 mr-2' />
                            View Profile
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    </div>

                    {/* Portfolio */}
                    <div>
                      <p className='text-sm text-gray-500'>Portfolio</p>
                      <p className='text-gray-800'>
                        {application.portfolio_url ? (
                          <a
                            href={application.portfolio_url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-green-600 hover:underline flex items-center'
                          >
                            <LinkIcon className='h-4 w-4 mr-2' />
                            View Portfolio
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              {application.cover_letter && (
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                    <FileText className='h-5 w-5 mr-2 text-gray-500' />
                    Cover Letter
                  </h2>
                  <div className='bg-gray-50 p-4 rounded-md'>
                    <p className='whitespace-pre-line text-gray-700'>
                      {application.cover_letter}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {application.additional_info && (
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-4'>
                    Additional Information
                  </h2>
                  <div className='bg-gray-50 p-4 rounded-md'>
                    <p className='whitespace-pre-line text-gray-700'>
                      {application.additional_info}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='lg:w-80'>
          {/* Job Details Card */}
          <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
            <div className='p-6 border-b'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Job Details
              </h2>
            </div>
            <div className='p-6'>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Location</p>
                  <p className='text-gray-800'>
                    {application.job?.location?.city || 'N/A'},{' '}
                    {application.job?.location?.state || 'N/A'}
                    {application.job?.location?.country &&
                      `, ${application.job.location.country}`}
                    {application.job?.location?.remote && ' (Remote)'}
                    {application.job?.location?.hybrid && ' (Hybrid)'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Employment Type</p>
                  <p className='text-gray-800 capitalize'>
                    {application.job?.employment_type?.replace('-', ' ') ||
                      'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Salary Range</p>
                  <p className='text-gray-800'>
                    {application.job?.salary_currency || ''}{' '}
                    {application.job?.salary_min?.toLocaleString() || 'N/A'} -{' '}
                    {application.job?.salary_max?.toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Experience Level</p>
                  <p className='text-gray-800 capitalize'>
                    {application.job?.experience_level || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Category</p>
                  <p className='text-gray-800 capitalize'>
                    {application.job?.category || 'N/A'}
                  </p>
                </div>
                {application.job?.education && (
                  <div>
                    <p className='text-sm text-gray-500'>Education</p>
                    <p className='text-gray-800'>{application.job.education}</p>
                  </div>
                )}
                <div>
                  <p className='text-sm text-gray-500'>Application Deadline</p>
                  <p className='text-gray-800'>
                    {application.job?.application_deadline
                      ? formatDate(application.job.application_deadline)
                      : 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          {application.job?.skills && application.job.skills.length > 0 && (
            <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
              <div className='p-6 border-b'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  Required Skills
                </h2>
              </div>
              <div className='p-6'>
                <div className='flex flex-wrap gap-2'>
                  {application.job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className='bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Admin Section */}
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='p-6 border-b flex justify-between items-center'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Admin Section
              </h2>
              {isEditing ? (
                <button
                  onClick={handleSaveChanges}
                  disabled={loading}
                  className='flex items-center justify-center px-3 py-1 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50'
                >
                  {loading ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className='h-4 w-4 mr-1' />
                      Save
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className='px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200'
                >
                  Edit
                </button>
              )}
            </div>
            <div className='p-6'>
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='interview_date'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Interview Date
                  </label>
                  {isEditing ? (
                    <div className='relative rounded-md shadow-sm'>
                      <input
                        type='datetime-local'
                        id='interview_date'
                        name='interview_date'
                        value={formData.interview_date}
                        onChange={handleInputChange}
                        className='focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md'
                      />
                      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                        <Calendar className='h-5 w-5 text-gray-400' />
                      </div>
                    </div>
                  ) : (
                    <div>
                      {application.interview_date ? (
                        <p className='text-gray-800 bg-purple-50 p-3 rounded-md border border-purple-200'>
                          <span className='font-semibold text-purple-700'>
                            Scheduled:
                          </span>{' '}
                          {formatInterviewDate(application.interview_date)}
                        </p>
                      ) : (
                        <p className='text-gray-500 italic'>Not scheduled</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='admin_notes'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Notes
                  </label>
                  {isEditing ? (
                    <textarea
                      id='admin_notes'
                      name='admin_notes'
                      rows='4'
                      className='shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                      value={formData.admin_notes}
                      onChange={handleInputChange}
                      placeholder='Add internal notes about this candidate...'
                    />
                  ) : (
                    <p className='whitespace-pre-line text-gray-800 bg-gray-50 p-3 rounded-md'>
                      {application.admin_notes || 'No notes added'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;

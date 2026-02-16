/** @format */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiSave,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiImage,
  FiUpload,
  FiInfo,
  FiPlus,
  FiX,
  FiList,
  FiCode,
} from 'react-icons/fi';
import AdminLayout from '../../../components/admin/AdminLayout';
import { adminService } from '../../../services/admin-service';

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const fileInputRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: '',
    description: '',
    requirements: [], // Changed to array
    responsibilities: [], // Changed to array
    skills: [], // Added skills array
    employment_type: 'full_time',
    experience_level: 'entry',
    salary_min: '',
    salary_max: '',
    salary_currency: 'NGN',
    salary_period: 'year',
    location: {
      city: '',
      country: '',
      remote: false,
    },
    application_deadline: '',
    is_published: false,
    is_featured: false,
    company_logo: '',
  });

  // Temporary input states for adding new items
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    // Fetch categories for suggestions (optional)
    const fetchCategories = async () => {
      try {
        const data = await adminService.getJobCategories();
        console.log('Fetched categories:', data);

        // Handle different response structures
        let categoriesArray = [];
        if (Array.isArray(data)) {
          categoriesArray = data;
        } else if (data && data.categories) {
          categoriesArray = data.categories;
        }

        setCategories(categoriesArray);
      } catch (err) {
        console.error('Error fetching job categories:', err);
        setCategories([]);
      }
    };

    fetchCategories();

    // If in edit mode, fetch job data
    if (isEditMode) {
      const fetchJobData = async () => {
        try {
          setLoading(true);
          const jobData = await adminService.getJobById(id);

          // Format application_deadline if it exists
          if (jobData.application_deadline) {
            jobData.application_deadline = new Date(
              jobData.application_deadline,
            )
              .toISOString()
              .split('T')[0];
          }

          // Ensure requirements, responsibilities, and skills are arrays
          if (jobData.requirements && !Array.isArray(jobData.requirements)) {
            jobData.requirements = jobData.requirements
              .split('\n')
              .filter((item) => item.trim() !== '');
          }

          if (
            jobData.responsibilities &&
            !Array.isArray(jobData.responsibilities)
          ) {
            jobData.responsibilities = jobData.responsibilities
              .split('\n')
              .filter((item) => item.trim() !== '');
          }

          if (jobData.skills && !Array.isArray(jobData.skills)) {
            jobData.skills = jobData.skills
              .split(',')
              .map((skill) => skill.trim())
              .filter((item) => item !== '');
          }

          setFormData(jobData);
        } catch (err) {
          console.error('Error fetching job data:', err);
          setError('Failed to load job data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchJobData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      // Handle nested objects (e.g., location.city)
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    // Clear validation error when field is changed
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Responsibilities handlers
  const handleAddResponsibility = () => {
    if (newResponsibility.trim()) {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility.trim()],
      }));
      setNewResponsibility('');
    }
  };

  const handleRemoveResponsibility = (index) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const handleResponsibilityKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddResponsibility();
    }
  };

  // Requirements handlers
  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleRequirementKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRequirement();
    }
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, WEBP, SVG)');
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError('File size must be less than 2MB');
      return;
    }

    try {
      setUploadingLogo(true);
      setError(null);

      const response = await adminService.uploadImage(file);

      console.log('Upload response:', response);

      // Handle different response structures
      let imageUrl;
      if (response.url) {
        imageUrl = response.url;
      } else if (response.data && response.data.url) {
        imageUrl = response.data.url;
      } else if (typeof response === 'string') {
        imageUrl = response;
      } else {
        console.error('Unexpected response format:', response);
        throw new Error('Unexpected response format from server');
      }

      setFormData((prev) => ({
        ...prev,
        company_logo: imageUrl,
      }));

      // Clear the file input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading logo:', error);
      setError(
        error.message || 'Failed to upload company logo. Please try again.',
      );
    } finally {
      setUploadingLogo(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title?.trim()) errors.title = 'Job title is required';
    if (!formData.company?.trim()) errors.company = 'Company name is required';
    if (!formData.category?.trim()) errors.category = 'Category is required';
    if (!formData.description?.trim())
      errors.description = 'Description is required';
    if (formData.responsibilities.length === 0)
      errors.responsibilities = 'At least one responsibility is required';
    if (formData.requirements.length === 0)
      errors.requirements = 'At least one requirement is required';
    if (formData.skills.length === 0)
      errors.skills = 'At least one skill is required';

    // Validate salary if provided
    if (
      formData.salary_min &&
      formData.salary_max &&
      Number(formData.salary_min) > Number(formData.salary_max)
    ) {
      errors.salary_min =
        'Minimum salary cannot be greater than maximum salary';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (submitting) {
      console.log('Already submitting, please wait...');
      return;
    }

    console.log('Submit clicked', { submitting, formData });

    if (!validateForm()) {
      console.log('Validation failed', formErrors);
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Format the data for submission
      const submissionData = {
        ...formData,
        salary_min: formData.salary_min ? Number(formData.salary_min) : null,
        salary_max: formData.salary_max ? Number(formData.salary_max) : null,
      };

      console.log('Submitting formatted data:', submissionData);

      let response;
      if (isEditMode) {
        response = await adminService.updateJob(id, submissionData);
        console.log('Update response:', response);
        alert('Job updated successfully');
      } else {
        response = await adminService.createJob(submissionData);
        console.log('Create response:', response);
        alert('Job created successfully');
      }

      navigate('/admin/careers/jobs');
    } catch (err) {
      console.error('Error saving job:', err);

      // Better error handling
      let errorMessage = `Failed to ${isEditMode ? 'update' : 'create'} job.`;

      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          errorMessage = err.response.data.detail.map((d) => d.msg).join(', ');
        } else {
          errorMessage = err.response.data.detail;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500'></div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='mb-6'>
        <button
          onClick={() => navigate('/admin/careers/jobs')}
          className='flex items-center text-gray-600 hover:text-gray-900'
          type='button'
        >
          <FiArrowLeft className='mr-2' />
          Back to Jobs List
        </button>
      </div>

      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>
          {isEditMode ? 'Edit Job' : 'Create New Job'}
        </h1>
      </div>

      {error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6'
          role='alert'
        >
          <strong className='font-bold'>Error!</strong>
          <span className='block sm:inline'> {error}</span>
        </div>
      )}

      <div className='bg-white rounded-lg shadow-md p-6'>
        <form onSubmit={handleSubmit}>
          {/* Company Logo Upload Section */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Company Logo
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='company_logo'
                >
                  <div className='flex items-center'>
                    <FiImage className='mr-1' />
                    Logo URL
                  </div>
                </label>
                <input
                  id='company_logo'
                  name='company_logo'
                  type='text'
                  value={formData.company_logo}
                  onChange={handleChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter logo URL or upload below'
                />
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Upload Logo
                </label>
                <div className='flex items-center'>
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept='image/*'
                    className='hidden'
                  />
                  <button
                    type='button'
                    onClick={() => fileInputRef.current.click()}
                    className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center'
                    disabled={uploadingLogo}
                  >
                    <FiUpload className='mr-2' />
                    {uploadingLogo ? 'Uploading...' : 'Choose Logo'}
                  </button>
                </div>
              </div>
            </div>

            {formData.company_logo && (
              <div className='mt-4'>
                <p className='text-sm font-medium text-gray-700 mb-2'>
                  Logo Preview:
                </p>
                <img
                  src={formData.company_logo || '/placeholder.svg'}
                  alt='Company logo'
                  className='max-w-xs h-24 object-contain rounded-md'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.svg?height=96&width=192';
                  }}
                />
              </div>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Basic Information */}
            <div>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Basic Information
              </h2>

              <div className='mb-4'>
                <label
                  htmlFor='title'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Job Title *
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FiBriefcase className='text-gray-400' />
                  </div>
                  <input
                    type='text'
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      formErrors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='e.g. Senior Software Engineer'
                  />
                </div>
                {formErrors.title && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.title}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='company'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Company Name *
                </label>
                <input
                  type='text'
                  id='company'
                  name='company'
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.company ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='e.g. Acme Corporation'
                />
                {formErrors.company && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.company}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <div className='flex items-center mb-2'>
                  <label
                    htmlFor='category'
                    className='block text-gray-700 font-medium'
                  >
                    Category *
                  </label>
                  <div className='relative ml-2'>
                    <FiInfo
                      className='text-gray-400 cursor-help hover:text-gray-600'
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    />
                    {showTooltip && (
                      <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded whitespace-nowrap z-10'>
                        Enter the job category (e.g., Engineering, Marketing,
                        Sales, Design, etc.)
                        <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800'></div>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  type='text'
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='e.g. Engineering, Marketing, Sales, Design'
                  list='category-suggestions'
                />
                {/* Optional datalist for suggestions */}
                <datalist id='category-suggestions'>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name || category} />
                  ))}
                </datalist>
                {formErrors.category && (
                  <p className='text-red-500 text-sm mt-1'>
                    {formErrors.category}
                  </p>
                )}
                <p className='text-gray-500 text-xs mt-1'>
                  Common categories: Engineering, Marketing, Sales, Design,
                  Product, HR, Finance, Operations
                </p>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='employment_type'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Employment Type
                </label>
                <select
                  id='employment_type'
                  name='employment_type'
                  value={formData.employment_type}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                >
                  <option value='full_time'>Full-time</option>
                  <option value='part_time'>Part-time</option>
                  <option value='contract'>Contract</option>
                  <option value='temporary'>Temporary</option>
                  <option value='internship'>Internship</option>
                  <option value='volunteer'>Volunteer</option>
                </select>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='experience_level'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Experience Level
                </label>
                <select
                  id='experience_level'
                  name='experience_level'
                  value={formData.experience_level}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                >
                  <option value='entry'>Entry Level</option>
                  <option value='mid'>Mid Level</option>
                  <option value='senior'>Senior Level</option>
                  <option value='executive'>Executive Level</option>
                </select>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='application_deadline'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Application Deadline
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FiCalendar className='text-gray-400' />
                  </div>
                  <input
                    type='date'
                    id='application_deadline'
                    name='application_deadline'
                    value={formData.application_deadline}
                    onChange={handleChange}
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  />
                </div>
              </div>
            </div>

            {/* Location and Salary */}
            <div>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Location and Salary
              </h2>

              <div className='mb-4'>
                <label
                  htmlFor='location.city'
                  className='block text-gray-700 font-medium mb-2'
                >
                  City
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FiMapPin className='text-gray-400' />
                  </div>
                  <input
                    type='text'
                    id='location.city'
                    name='location.city'
                    value={formData.location.city}
                    onChange={handleChange}
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    placeholder='e.g. New York'
                  />
                </div>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='location.country'
                  className='block text-gray-700 font-medium mb-2'
                >
                  Country
                </label>
                <input
                  type='text'
                  id='location.country'
                  name='location.country'
                  value={formData.location.country}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  placeholder='e.g. United States'
                />
              </div>

              <div className='mb-4'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='location.remote'
                    name='location.remote'
                    checked={formData.location.remote}
                    onChange={handleChange}
                    className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='location.remote'
                    className='ml-2 block text-gray-700'
                  >
                    Remote Work Available
                  </label>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                  <label
                    htmlFor='salary_min'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Minimum Salary
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <FiDollarSign className='text-gray-400' />
                    </div>
                    <input
                      type='number'
                      id='salary_min'
                      name='salary_min'
                      value={formData.salary_min}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        formErrors.salary_min
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder='e.g. 50000'
                    />
                  </div>
                  {formErrors.salary_min && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.salary_min}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor='salary_max'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Maximum Salary
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <FiDollarSign className='text-gray-400' />
                    </div>
                    <input
                      type='number'
                      id='salary_max'
                      name='salary_max'
                      value={formData.salary_max}
                      onChange={handleChange}
                      className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                      placeholder='e.g. 80000'
                    />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                  <label
                    htmlFor='salary_currency'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Currency
                  </label>
                  <select
                    id='salary_currency'
                    name='salary_currency'
                    value={formData.salary_currency}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  >
                    <option value='NGN'>NGN</option>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                    <option value='GBP'>GBP</option>
                    <option value='CAD'>CAD</option>
                    <option value='AUD'>AUD</option>
                    <option value='JPY'>JPY</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='salary_period'
                    className='block text-gray-700 font-medium mb-2'
                  >
                    Period
                  </label>
                  <select
                    id='salary_period'
                    name='salary_period'
                    value={formData.salary_period}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                  >
                    <option value='year'>Per Year</option>
                    <option value='month'>Per Month</option>
                    <option value='week'>Per Week</option>
                    <option value='hour'>Per Hour</option>
                  </select>
                </div>
              </div>

              <div className='mb-4'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='is_published'
                    name='is_published'
                    checked={formData.is_published}
                    onChange={handleChange}
                    className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='is_published'
                    className='ml-2 block text-gray-700'
                  >
                    Publish Job (visible to applicants)
                  </label>
                </div>
              </div>

              <div className='mb-4'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='is_featured'
                    name='is_featured'
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='is_featured'
                    className='ml-2 block text-gray-700'
                  >
                    Feature this Job (highlighted in listings)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Responsibilities Section */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
              <FiList className='mr-2' />
              Responsibilities *
            </h2>

            {/* List of responsibilities */}
            <div className='mb-4 space-y-2'>
              {formData.responsibilities.map((resp, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200'
                >
                  <span className='text-gray-700'>{resp}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveResponsibility(index)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new responsibility */}
            <div className='flex gap-2'>
              <input
                type='text'
                id='responsibilities'
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                onKeyPress={handleResponsibilityKeyPress}
                placeholder='Enter a responsibility and press Enter or click Add'
                className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <button
                type='button'
                onClick={handleAddResponsibility}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center'
              >
                <FiPlus className='mr-2' />
                Add
              </button>
            </div>
            {formErrors.responsibilities && (
              <p className='text-red-500 text-sm mt-1'>
                {formErrors.responsibilities}
              </p>
            )}
            <p className='text-gray-500 text-xs mt-2'>
              Add each responsibility as a separate item. Press Enter to quickly
              add.
            </p>
          </div>

          {/* Requirements Section */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
              <FiList className='mr-2' />
              Requirements *
            </h2>

            {/* List of requirements */}
            <div className='mb-4 space-y-2'>
              {formData.requirements.map((req, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200'
                >
                  <span className='text-gray-700'>{req}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveRequirement(index)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new requirement */}
            <div className='flex gap-2'>
              <input
                type='text'
                id='requirements'
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={handleRequirementKeyPress}
                placeholder='Enter a requirement and press Enter or click Add'
                className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <button
                type='button'
                onClick={handleAddRequirement}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center'
              >
                <FiPlus className='mr-2' />
                Add
              </button>
            </div>
            {formErrors.requirements && (
              <p className='text-red-500 text-sm mt-1'>
                {formErrors.requirements}
              </p>
            )}
            <p className='text-gray-500 text-xs mt-2'>
              Add each requirement as a separate item. Press Enter to quickly
              add.
            </p>
          </div>

          {/* Skills Section - NEW */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
              <FiCode className='mr-2' />
              Required Skills *
            </h2>

            {/* List of skills */}
            <div className='mb-4 flex flex-wrap gap-2'>
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className='flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200'
                >
                  <span>{skill}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveSkill(index)}
                    className='ml-2 text-blue-500 hover:text-blue-700'
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new skill */}
            <div className='flex gap-2'>
              <input
                type='text'
                id='skills'
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleSkillKeyPress}
                placeholder='Enter a skill and press Enter or click Add (e.g., JavaScript, Python, Project Management)'
                className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <button
                type='button'
                onClick={handleAddSkill}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center'
              >
                <FiPlus className='mr-2' />
                Add
              </button>
            </div>
            {formErrors.skills && (
              <p className='text-red-500 text-sm mt-1'>{formErrors.skills}</p>
            )}
            <p className='text-gray-500 text-xs mt-2'>
              Add each required skill as a separate item. Press Enter to quickly
              add.
            </p>
          </div>

          {/* Job Description */}
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Job Description *
            </h2>

            <div className='mb-4'>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  formErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Provide a detailed description of the job...'
              ></textarea>
              {formErrors.description && (
                <p className='text-red-500 text-sm mt-1'>
                  {formErrors.description}
                </p>
              )}
            </div>
          </div>

          <div className='flex justify-end'>
            <button
              type='button'
              onClick={() => navigate('/admin/careers/jobs')}
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2'
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={submitting || uploadingLogo}
              className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center ${
                submitting || uploadingLogo
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <FiSave className='mr-2' />
              {submitting ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;

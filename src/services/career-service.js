/** @format */

import axios from 'axios';
import apiClient from './api-client';

// Create a separate client for public endpoints (no auth)
const publicClient = axios.create({
  baseURL: 'https://aoca-resources-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get job listings
export const getJobListings = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.skip) queryParams.append('skip', params.skip);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.category) queryParams.append('category', params.category);
    if (params.location) queryParams.append('location', params.location);
    if (params.remote !== undefined)
      queryParams.append('remote', params.remote);
    if (params.employment_type)
      queryParams.append('employment_type', params.employment_type);
    if (params.experience_level)
      queryParams.append('experience_level', params.experience_level);
    if (params.search) queryParams.append('search', params.search);
    if (params.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params.sort_order) queryParams.append('sort_order', params.sort_order);

    const url = `/careers/jobs?${queryParams.toString()}`;
    const response = await publicClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Get job listings error:', error);
    throw error;
  }
};

// Function to get job details
export const getJobDetails = async (jobId) => {
  try {
    const response = await publicClient.get(`/careers/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Get job details error:', error);
    throw error;
  }
};

// Function to get job categories
export const getJobCategories = async () => {
  try {
    const response = await publicClient.get('/careers/categories');
    return response.data;
  } catch (error) {
    console.error('Get job categories error:', error);
    throw error;
  }
};

// Function to apply for a job
export const applyForJob = async (jobId, applicationData) => {
  try {
    // Validate required fields
    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'phone',
      'resume_url',
    ];
    const missingFields = requiredFields.filter(
      (field) => !applicationData[field],
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    console.log('Sending application data:', applicationData);

    const response = await publicClient.post(
      `/careers/jobs/${jobId}/apply`,
      applicationData, // This now includes job_id in the body
    );

    return response.data;
  } catch (error) {
    console.error('Apply for job error:', error);

    // Handle specific error messages
    if (error.response?.data?.detail) {
      if (Array.isArray(error.response.data.detail)) {
        // Handle validation errors
        const validationErrors = error.response.data.detail
          .map((err) => {
            if (err.msg === 'Field required') {
              return `${err.loc[err.loc.length - 1]} is required`;
            }
            return err.msg;
          })
          .join(', ');
        throw new Error(validationErrors);
      } else if (typeof error.response.data.detail === 'string') {
        // Handle string error messages
        if (error.response.data.detail.includes('File too large')) {
          throw new Error('File too large. Maximum size is 5MB');
        }
        throw new Error(error.response.data.detail);
      }
    } else if (error.message) {
      throw new Error(error.message);
    }

    throw new Error('Failed to submit application. Please try again.');
  }
};

// Function to upload resume
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await publicClient.post(
      '/careers/upload/resume',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Upload resume error:', error);

    // Handle file size error
    if (error.response?.data?.detail?.includes('File too large')) {
      throw new Error('File too large. Maximum size is 5MB');
    }

    throw new Error(error.response?.data?.detail || 'Failed to upload resume');
  }
};

// Function to get user applications - REQUIRES AUTH
export const getUserApplications = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.skip) queryParams.append('skip', params.skip);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.status) queryParams.append('status', params.status);

    const url = `/careers/applications?${queryParams.toString()}`;
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Get user applications error:', error);
    throw error;
  }
};

// Function to get application details - REQUIRES AUTH
export const getApplicationDetails = async (applicationId) => {
  try {
    const response = await apiClient.get(
      `/careers/applications/${applicationId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Get application details error:', error);
    throw error;
  }
};

// Function to withdraw application - REQUIRES AUTH
export const withdrawApplication = async (applicationId) => {
  try {
    await apiClient.delete(`/careers/applications/${applicationId}`);
    return { success: true };
  } catch (error) {
    console.error('Withdraw application error:', error);
    throw error;
  }
};

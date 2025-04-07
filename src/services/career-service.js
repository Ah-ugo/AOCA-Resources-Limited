import apiClient from "./api-client";

// Function to get job listings
export const getJobListings = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.skip) queryParams.append("skip", params.skip);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.category) queryParams.append("category", params.category);
    if (params.location) queryParams.append("location", params.location);
    if (params.remote !== undefined)
      queryParams.append("remote", params.remote);
    if (params.employment_type)
      queryParams.append("employment_type", params.employment_type);
    if (params.experience_level)
      queryParams.append("experience_level", params.experience_level);
    if (params.search) queryParams.append("search", params.search);
    if (params.sort_by) queryParams.append("sort_by", params.sort_by);
    if (params.sort_order) queryParams.append("sort_order", params.sort_order);

    // Fix the API endpoint URL
    const url = `/careers/jobs?${queryParams.toString()}`;
    const response = await apiClient.get(url);

    return response.data;
  } catch (error) {
    console.error("Get job listings error:", error);
    throw error;
  }
};

// Function to get job details
export const getJobDetails = async (jobId) => {
  try {
    // Fix the API endpoint URL
    const response = await apiClient.get(`/careers/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Get job details error:", error);
    throw error;
  }
};

// Function to get job categories
export const getJobCategories = async () => {
  try {
    // Fix the API endpoint URL
    const response = await apiClient.get("/careers/categories");
    return response.data;
  } catch (error) {
    console.error("Get job categories error:", error);
    throw error;
  }
};

// Function to apply for a job
export const applyForJob = async (jobId, applicationData) => {
  try {
    // Fix the API endpoint URL
    const response = await apiClient.post(
      `/careers/jobs/${jobId}/apply`,
      applicationData
    );
    return response.data;
  } catch (error) {
    console.error("Apply for job error:", error);
    throw error;
  }
};

// Function to get user applications
export const getUserApplications = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.skip) queryParams.append("skip", params.skip);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.status) queryParams.append("status", params.status);

    // Fix the API endpoint URL
    const url = `/careers/applications?${queryParams.toString()}`;
    const response = await apiClient.get(url);

    return response.data;
  } catch (error) {
    console.error("Get user applications error:", error);
    throw error;
  }
};

// Function to get application details
export const getApplicationDetails = async (applicationId) => {
  try {
    // Fix the API endpoint URL
    const response = await apiClient.get(
      `/careers/applications/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Get application details error:", error);
    throw error;
  }
};

// Function to withdraw application
export const withdrawApplication = async (applicationId) => {
  try {
    // Fix the API endpoint URL
    await apiClient.delete(`/careers/applications/${applicationId}`);
    return { success: true };
  } catch (error) {
    console.error("Withdraw application error:", error);
    throw error;
  }
};

// Function to upload resume
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Fix the API endpoint URL
    const response = await apiClient.post("/careers/upload/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload resume error:", error);
    throw error;
  }
};

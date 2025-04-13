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
    // Log the data being sent for debugging
    console.log("API call - applying for job:", jobId);
    console.log("Application data:", applicationData);

    // Make sure we have all required fields
    if (!applicationData.resume_url) {
      throw new Error("Resume URL is required");
    }

    if (!applicationData.phone) {
      throw new Error("Phone number is required");
    }

    // Make sure job_id is correctly set
    const payload = {
      ...applicationData,
      job_id: jobId, // Ensure correct job ID
    };

    // Send the application
    const response = await apiClient.post(
      `/careers/jobs/${jobId}/apply`,
      payload
    );

    console.log("Application submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Apply for job error:", error);

    // Extract and log detailed error information
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error("Server error response:", error.response.data);
      console.error("Status code:", error.response.status);

      // Return a more descriptive error message if available
      if (error.response.data && error.response.data.message) {
        throw new Error(`Server error: ${error.response.data.message}`);
      }
    }

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

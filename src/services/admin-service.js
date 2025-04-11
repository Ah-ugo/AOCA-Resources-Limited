import apiClient from "./api-client";

// Dashboard
export const getAdminStats = async () => {
  try {
    const response = await apiClient.get("/admin/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
};

export const getRecentUsers = async (limit = 5) => {
  try {
    const response = await apiClient.get(`/admin/users?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent users:", error);
    throw error;
  }
};

export const getRecentApplications = async (limit = 5) => {
  try {
    const response = await apiClient.get(
      `/admin/careers/applications?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    throw error;
  }
};

// Users
export const getUsers = async (page = 1, role = "", search = "") => {
  try {
    const response = await apiClient.get("/admin/users", {
      params: { page, role, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/admin/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`/admin/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};

// Jobs
export const getJobs = async (page = 1, category = "", search = "") => {
  try {
    const response = await apiClient.get("/admin/careers/jobs", {
      params: { page, category, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getJobById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/careers/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await apiClient.post("/admin/careers/jobs", jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const response = await apiClient.put(
      `/api/admin/careers/jobs/${id}`,
      jobData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating job ${id}:`, error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/careers/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting job ${id}:`, error);
    throw error;
  }
};

// Applications
export const getApplications = async (page = 1, status = "", search = "") => {
  try {
    const response = await apiClient.get("/admin/careers/applications", {
      params: { page, status, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

export const getApplicationById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/careers/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching application ${id}:`, error);
    throw error;
  }
};

export const updateApplicationStatus = async (id, status) => {
  try {
    const response = await apiClient.put(
      `/admin/careers/applications/${id}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating application ${id} status:`, error);
    throw error;
  }
};

// Blog
export const getBlogPosts = async (page = 1, category = "", search = "") => {
  try {
    const response = await apiClient.get("/blog/posts", {
      params: { page, category, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

export const getBlogPostById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/blog/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    throw error;
  }
};

export const createBlogPost = async (postData) => {
  try {
    const response = await apiClient.post("/admin/blog/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};

export const updateBlogPost = async (id, postData) => {
  try {
    const response = await apiClient.put(`/admin/blog/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog post ${id}:`, error);
    throw error;
  }
};

export const deleteBlogPost = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/blog/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog post ${id}:`, error);
    throw error;
  }
};

// Blog Categories
export const getBlogCategories = async () => {
  try {
    const response = await apiClient.get("/admin/blog/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    throw error;
  }
};

// Job Categories
export const getJobCategories = async () => {
  try {
    const response = await apiClient.get("/admin/careers/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching job categories:", error);
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const response = await apiClient.get("/admin/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching job categories:", error);
    throw error;
  }
};

export const getClasses = async () => {
  try {
    const response = await apiClient.get("/admin/classes");
    return response.data;
  } catch (error) {
    console.error("Error fetching job categories:", error);
    throw error;
  }
};

const adminService = {
  getAdminStats,
  getRecentUsers,
  getRecentApplications,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogCategories,
  getJobCategories,
  getCourses,
  getClasses,
};

export { adminService };

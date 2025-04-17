import apiClient from "./api-client";

// Dashboard
export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get("/admin/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    throw error;
  }
};

// User Management
export const getUsers = async (params = {}) => {
  try {
    const response = await apiClient.get("/admin/users", { params });
    console.log(response.data, "users====");
    return response.data;
  } catch (error) {
    console.error("Get users error:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get user by ID error:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/admin/users", userData);
    return response.data;
  } catch (error) {
    console.error("Create user error:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
};

// Job Management
export const getJobs = async (params = {}) => {
  try {
    const response = await apiClient.get("/admin/careers/jobs", { params });
    return response.data;
  } catch (error) {
    console.error("Get jobs error:", error);
    throw error;
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await apiClient.get(`/admin/careers/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Get job by ID error:", error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await apiClient.post("/admin/careers/jobs", jobData);
    return response.data;
  } catch (error) {
    console.error("Create job error:", error);
    throw error;
  }
};

export const updateJob = async (jobId, jobData) => {
  try {
    const response = await apiClient.put(
      `/admin/careers/jobs/${jobId}`,
      jobData
    );
    return response.data;
  } catch (error) {
    console.error("Update job error:", error);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const response = await apiClient.delete(`/admin/careers/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Delete job error:", error);
    throw error;
  }
};

// Application Management
export const getApplications = async (params = {}) => {
  try {
    const response = await apiClient.get("/admin/careers/applications");
    console.log(response, "application");
    return response.data;
  } catch (error) {
    console.error("Get applications error:", error);
    throw error;
  }
};

export const careerStats = async (params = {}) => {
  try {
    const response = await apiClient.get("/admin/careers/stats");
    console.log(response, "application stats");
    return response.data;
  } catch (error) {
    console.error("Get applications error:", error);
    throw error;
  }
};

export const getApplicationById = async (applicationId) => {
  try {
    const response = await apiClient.get(
      `/admin/careers/applications/${applicationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Get application by ID error:", error);
    throw error;
  }
};

export const updateApplication = async (applicationId, data) => {
  try {
    const response = await apiClient.put(
      `/admin/careers/applications/${applicationId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Update application error:", error);
    throw error;
  }
};

// services/admin-service.js
// export const getApplicationById = async (id) => {
//   const response = await fetch(`https://aoca-resources-backend.onrender.com/admin/careers/applications/${id}`, {
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       'accept': 'application/json'
//     }
//   });
//   if (!response.ok) throw new Error('Failed to fetch application');
//   return await response.json();
// };

// export const updateApplication = async (id, data) => {
//   const response = await fetch(`https://aoca-resources-backend.onrender.com/admin/careers/applications/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       'Content-Type': 'application/json',
//       'accept': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });
//   if (!response.ok) throw new Error('Failed to update application');
//   return await response.json();
// };

// Job Categories
export const getJobCategories = async () => {
  try {
    const response = await apiClient.get("/admin/careers/categories");
    return response.data;
  } catch (error) {
    console.error("Get job categories error:", error);
    throw error;
  }
};

export const createJobCategory = async (categoryData) => {
  try {
    const response = await apiClient.post(
      "/admin/careers/categories",
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Create job category error:", error);
    throw error;
  }
};

export const updateJobCategory = async (categoryId, categoryData) => {
  try {
    const response = await apiClient.put(
      `/admin/careers/categories/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Update job category error:", error);
    throw error;
  }
};

export const deleteJobCategory = async (categoryId) => {
  try {
    const response = await apiClient.delete(
      `/admin/careers/categories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Delete job category error:", error);
    throw error;
  }
};

// Blog Management
export const getBlogs = async (params = {}) => {
  try {
    const response = await apiClient.get("/blog/posts", { params });
    return response.data;
  } catch (error) {
    console.error("Get blogs error:", error);
    throw error;
  }
};

const getBlogPosts = getBlogs;

export const getBlogById = async (blogId) => {
  try {
    const response = await apiClient.get(`/blog/posts/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("Get blog by ID error:", error);
    throw error;
  }
};

export const getBlogPostById = getBlogById;

export const createBlog = async (blogData) => {
  try {
    // Transform data to match backend expectations
    const formattedData = {
      title: blogData.title,
      slug: blogData.title.toLowerCase().replace(/\s+/g, "-"), // Generate slug from title
      excerpt: blogData.excerpt,
      content: blogData.content.split("*")[0].trim(), // Clean up content
      category: blogData.category,
      tags: blogData.tags,
      featured_image: blogData.featured_image,
      is_published: blogData.status === "published", // Convert status to boolean
    };

    const response = await apiClient.post("/blog/posts", formattedData);
    return response.data;
  } catch (error) {
    console.error(
      "Create blog error:",
      error.response?.data?.detail || error.message
    );
    throw error;
  }
};

export const createBlogPost = createBlog;

export const updateBlog = async (blogId, blogData) => {
  try {
    const response = await apiClient.put(`/blog/posts/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    console.error("Update blog error:", error);
    throw error;
  }
};

export const updateBlogPost = updateBlog;

export const deleteBlog = async (blogId) => {
  try {
    const response = await apiClient.delete(`/blog/posts/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("Delete blog error:", error);
    throw error;
  }
};

export const deleteBlogPost = deleteBlog;

// Blog Categories
export const getBlogCategories = async () => {
  try {
    const response = await apiClient.get("/admin/blog/categories");
    console.log(response.data, "blog category");
    return response.data;
  } catch (error) {
    console.error("Get blog categories error:", error);
    throw error;
  }
};

export const createBlogCategory = async (categoryData) => {
  try {
    const response = await apiClient.post(
      "/admin/blog/categories",
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Create blog category error:", error);
    throw error;
  }
};

export const updateBlogCategory = async (oldName, categoryData) => {
  try {
    const response = await apiClient.put(
      `/admin/blog/categories/${oldName}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Update blog category error:", error);
    throw error;
  }
};

export const deleteBlogCategory = async (name) => {
  try {
    const response = await apiClient.delete(`/admin/blog/categories/${name}`);
    return response.data;
  } catch (error) {
    console.error("Delete blog category error:", error);
    throw error;
  }
};

// Course Management
export const getCourses = async (params = {}) => {
  try {
    const response = await apiClient.get("/admin/courses", { params });
    return response.data;
  } catch (error) {
    console.error("Get courses error:", error);
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await apiClient.get(`/admin/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Get course by ID error:", error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await apiClient.post("/admin/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Create course error:", error);
    throw error;
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await apiClient.put(
      `/admin/courses/${courseId}`,
      courseData
    );
    return response.data;
  } catch (error) {
    console.error("Update course error:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await apiClient.delete(`/admin/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Delete course error:", error);
    throw error;
  }
};

export const enrollUserInCourse = async (courseId, userId) => {
  try {
    const response = await apiClient.post(
      `/admin/courses/${courseId}/enroll/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Enroll user in course error:", error);
    throw error;
  }
};

export const removeUserFromCourse = async (courseId, userId) => {
  try {
    const response = await apiClient.delete(
      `/admin/courses/${courseId}/enroll/${userId}`
    );
    console.log(response, "remove user", userId, " ", courseId);
    return response.data;
  } catch (error) {
    console.error("Remove user from course error:", error);
    throw error;
  }
};

// services/admin-service.js
export const getCourseStudents = async (courseId, skip = 0, limit = 100) => {
  const response = await fetch(
    `https://aoca-resources-backend.onrender.com/admin/courses/${courseId}/students?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        accept: "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch course students");
  return await response.json();
};

// Class Management
export const getClasses = async (params = {}) => {
  try {
    const response = await apiClient.get("/admin/classes", { params });
    console.log(response.data, "lessons");
    return response.data;
  } catch (error) {
    console.error("Get classes error:", error);
    throw error;
  }
};

export const getLessons = getClasses;

export const getClassById = async (classId) => {
  try {
    const response = await apiClient.get(`/admin/classes/${classId}`);
    return response.data;
  } catch (error) {
    console.error("Get class by ID error:", error);
    throw error;
  }
};

export const createClass = async (classData) => {
  try {
    const response = await apiClient.post("/admin/classes", classData);
    return response.data;
  } catch (error) {
    console.error("Create class error:", error);
    throw error;
  }
};

export const updateClass = async (classId, classData) => {
  try {
    const response = await apiClient.put(
      `/admin/classes/${classId}`,
      classData
    );
    return response.data;
  } catch (error) {
    console.error("Update class error:", error);
    throw error;
  }
};

export const deleteClass = async (classId) => {
  try {
    const response = await apiClient.delete(`/admin/classes/${classId}`);
    return response.data;
  } catch (error) {
    console.error("Delete class error:", error);
    throw error;
  }
};

// Assignment Management
export const getAssignments = async (params = {}) => {
  try {
    const response = await apiClient.get("/admin/assignments", { params });
    return response.data;
  } catch (error) {
    console.error("Get assignments error:", error);
    throw error;
  }
};

export const getAssignmentById = async (assignmentId) => {
  try {
    const response = await apiClient.get(`/admin/assignments/${assignmentId}`);
    return response.data;
  } catch (error) {
    console.error("Get assignment by ID error:", error);
    throw error;
  }
};

export const createAssignment = async (assignmentData) => {
  try {
    const response = await apiClient.post("/admin/assignments", assignmentData);
    return response.data;
  } catch (error) {
    console.error("Create assignment error:", error);
    throw error;
  }
};

export const updateAssignment = async (assignmentId, assignmentData) => {
  try {
    const response = await apiClient.put(
      `/admin/assignments/${assignmentId}`,
      assignmentData
    );
    return response.data;
  } catch (error) {
    console.error("Update assignment error:", error);
    throw error;
  }
};

export const deleteAssignment = async (assignmentId) => {
  try {
    const response = await apiClient.delete(
      `/admin/assignments/${assignmentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Delete assignment error:", error);
    throw error;
  }
};

export const getAssignmentSubmissions = async (assignmentId) => {
  try {
    const response = await apiClient.get(
      `/admin/assignments/${assignmentId}/submissions`
    );
    return response.data;
  } catch (error) {
    console.error("Get assignment submissions error:", error);
    throw error;
  }
};

export const gradeAssignmentSubmission = async (
  assignmentId,
  userId,
  gradeData
) => {
  try {
    const response = await apiClient.post(
      `/admin/assignments/${assignmentId}/grade/${userId}`,
      gradeData
    );
    return response.data;
  } catch (error) {
    console.error("Grade assignment submission error:", error);
    throw error;
  }
};

// Resource Management
export const getResources = async (params = {}) => {
  try {
    const response = await apiClient.get("/admin/resources", { params });
    return response.data;
  } catch (error) {
    console.error("Get resources error:", error);
    throw error;
  }
};

export const getResourceById = async (resourceId) => {
  try {
    const response = await apiClient.get(`/admin/resources/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error("Get resource by ID error:", error);
    throw error;
  }
};

export const createResource = async (resourceData) => {
  try {
    const response = await apiClient.post("/admin/resources", resourceData);
    return response.data;
  } catch (error) {
    console.error("Create resource error:", error);
    throw error;
  }
};

export const updateResource = async (resourceId, resourceData) => {
  try {
    const response = await apiClient.put(
      `/admin/resources/${resourceId}`,
      resourceData
    );
    return response.data;
  } catch (error) {
    console.error("Update resource error:", error);
    throw error;
  }
};

export const deleteResource = async (resourceId) => {
  try {
    const response = await apiClient.delete(`/admin/resources/${resourceId}`);
    return response.data;
  } catch (error) {
    console.error("Delete resource error:", error);
    throw error;
  }
};

// File Upload
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload image error:", error);
    throw error;
  }
};

export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

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
export const getAdminStats = getDashboardStats;
export const getRecentUsers = getUsers;

// Export all services
const adminService = {
  // Dashboard
  getDashboardStats,
  getAdminStats,

  // User Management
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,

  // Job Management
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,

  // Application Management
  getApplications,
  getApplicationById,
  updateApplication,
  careerStats,

  // Job Categories
  getJobCategories,
  createJobCategory,
  updateJobCategory,
  deleteJobCategory,

  // Blog Management
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  createBlogPost,

  // Blog Categories
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,

  // Course Management
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollUserInCourse,
  removeUserFromCourse,
  getCourseStudents,

  // Class Management
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getLessons,

  // Assignment Management
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentSubmissions,
  gradeAssignmentSubmission,

  // Resource Management
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,

  // File Upload
  uploadImage,
  uploadResume,
};

export { adminService };

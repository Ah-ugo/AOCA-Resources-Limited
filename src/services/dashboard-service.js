/** @format */

// import apiClient from "./api-client";

// // Function to get user dashboard data
// export const getUserDashboard = async () => {
//   try {
//     const response = await apiClient.get("/dashboard/overview");
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Get user dashboard error:", error);
//     throw error;
//   }
// };

// // Function to get assignments
// export const getAssignments = async (status = null) => {
//   try {
//     let url = "/dashboard/assignments";
//     if (status && status !== "all") {
//       url += `?status=${status}`;
//     }
//     const response = await apiClient.get(url);
//     return { assignments: response.data };
//   } catch (error) {
//     console.error("Get assignments error:", error);
//     throw error;
//   }
// };

// // Function to get assignment details
// export const getAssignmentDetails = async (assignmentId) => {
//   try {
//     const response = await apiClient.get(
//       `/dashboard/assignments/${assignmentId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Get assignment details error:", error);
//     throw error;
//   }
// };

// // Function to submit assignment
// export const submitAssignment = async (assignmentId, data) => {
//   try {
//     const response = await apiClient.post(
//       `/dashboard/assignments/${assignmentId}/submit`,
//       data
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Submit assignment error:", error);
//     throw error;
//   }
// };

// // Function to get classes
// export const getClasses = async (type = "upcoming") => {
//   try {
//     const upcoming = type === "upcoming";
//     const response = await apiClient.get(
//       `/dashboard/classes?upcoming=${upcoming}`
//     );
//     console.log(response.data);
//     return { classes: response.data };
//   } catch (error) {
//     console.error("Get classes error:", error);
//     throw error;
//   }
// };

// // Function to get resources
// export const getResources = async (category = null, search = null) => {
//   try {
//     let url = "/dashboard/resources";
//     const params = new URLSearchParams();

//     if (category && category !== "all") {
//       params.append("category", category);
//     }

//     if (search) {
//       params.append("search", search);
//     }

//     if (params.toString()) {
//       url += `?${params.toString()}`;
//     }

//     const response = await apiClient.get(url);
//     return { resources: response.data };
//   } catch (error) {
//     console.error("Get resources error:", error);
//     throw error;
//   }
// };

// // Function to get resource categories
// export const getResourceCategories = async () => {
//   try {
//     // This endpoint doesn't exist in the API, so we'll return a mock response
//     return {
//       categories: [
//         { id: "grammar", name: "Grammar" },
//         { id: "vocabulary", name: "Vocabulary" },
//         { id: "pronunciation", name: "Pronunciation" },
//         { id: "conversation", name: "Conversation" },
//         { id: "exam", name: "Exam Prep" },
//         { id: "culture", name: "Culture" },
//       ],
//     };
//   } catch (error) {
//     console.error("Get resource categories error:", error);
//     throw error;
//   }
// };

// // Function to get user profile
// export const getUserProfile = async () => {
//   try {
//     const response = await apiClient.get("/dashboard/profile");
//     return { user: response.data };
//   } catch (error) {
//     console.error("Get user profile error:", error);
//     throw error;
//   }
// };

// // Function to update user profile
// export const updateUserProfile = async (data) => {
//   try {
//     const response = await apiClient.put("/dashboard/profile", data);
//     return { user: response.data };
//   } catch (error) {
//     console.error("Update user profile error:", error);
//     throw error;
//   }
// };

// // Function to get user courses
// export const getUserCourses = async () => {
//   try {
//     const response = await apiClient.get("/dashboard/courses");
//     return response.data;
//   } catch (error) {
//     console.error("Get user courses error:", error);
//     throw error;
//   }
// };

// // Function to upload image
// export const uploadImage = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);

//     const response = await apiClient.post("/upload/image", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Upload image error:", error);
//     throw error;
//   }
// };

/** @format */

const API = 'https://aoca-resources-backend.onrender.com';

function getToken() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.access_token || localStorage.getItem('token') || '';
  } catch {
    return '';
  }
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

// ── Dashboard home ──────────────────────────────────────────────────────────
// FIX #1 + #15: was calling /dashboard/overview, correct endpoint is /dashboard
export async function getUserDashboard() {
  return apiFetch('/dashboard');
}

// ── Courses ─────────────────────────────────────────────────────────────────
export async function getUserCourses() {
  // Returns array directly from /dashboard/courses
  const data = await apiFetch('/dashboard/courses');
  // Normalise: backend may return array OR {courses:[]}
  if (Array.isArray(data)) return { courses: data };
  return data;
}

export async function getUserProfile() {
  const data = await apiFetch('/dashboard/profile');
  // Wrap in {user:...} if backend returns bare user object
  if (data && !data.user) return { user: data };
  return data;
}

// FIX #19: strip email + read-only fields before sending
export async function updateUserProfile(formData) {
  const { email, ...safeFields } = formData; // email not updatable via this endpoint
  const data = await apiFetch('/dashboard/profile', {
    method: 'PUT',
    body: JSON.stringify(safeFields),
  });
  if (data && !data.user) return { user: data };
  return data;
}

// ── Assignments ──────────────────────────────────────────────────────────────
// FIX #3 + #16: pass status as proper query param, normalise response shape
export async function getAssignments(status = 'all') {
  const param = status && status !== 'all' ? `?status=${status}` : '';
  const data = await apiFetch(`/dashboard/assignments${param}`);
  // Backend returns array; wrap it
  if (Array.isArray(data)) return { assignments: data };
  // Backend already returns {assignments:[]}
  return data;
}

export async function getAssignmentById(id) {
  return apiFetch(`/dashboard/assignments/${id}`);
}

// ── Classes ──────────────────────────────────────────────────────────────────
// FIX #4 + #17: was passing 'upcoming'/'past' string, API expects upcoming=true/false
export async function getClasses(tab = 'upcoming') {
  const upcoming = tab === 'upcoming';
  const data = await apiFetch(`/dashboard/classes?upcoming=${upcoming}`);
  if (Array.isArray(data)) return { classes: data };
  return data;
}

// ── Resources ───────────────────────────────────────────────────────────────
// FIX #5 + #18: correct param name is 'category', wrap response
export async function getResources(category = null, search = null) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (search) params.set('search', search);
  const qs = params.toString() ? `?${params}` : '';
  const data = await apiFetch(`/dashboard/resources${qs}`);
  if (Array.isArray(data)) return { resources: data };
  return data;
}

export async function getResourceCategories() {
  const data = await apiFetch('/dashboard/resources/categories');
  if (Array.isArray(data)) return { categories: data };
  return data;
}

// ── Student enrollment ───────────────────────────────────────────────────────
export async function getMyEnrollments() {
  return apiFetch('/students/my-enrollments');
}

export async function applyForCourse(courseId, message = '') {
  return apiFetch('/students/apply', {
    method: 'POST',
    body: JSON.stringify({ course_id: courseId, message }),
  });
}

// ── Progress ─────────────────────────────────────────────────────────────────
export async function getCourseProgress(courseId) {
  return apiFetch(`/dashboard/progress/${courseId}`);
}

export async function markLessonComplete(lessonId, courseId) {
  return apiFetch(`/dashboard/progress/lesson/${lessonId}/complete`, {
    method: 'POST',
    body: JSON.stringify({ course_id: courseId }),
  });
}

export async function getResumeState(courseId) {
  return apiFetch(`/dashboard/courses/${courseId}/resume`);
}

// ── Public course catalog ────────────────────────────────────────────────────
// FIX #22: use public endpoint, not admin-protected one
export async function getPublicCourse(courseId) {
  return apiFetch(`/courses/${courseId}`);
}

export async function getPublicCourses(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return apiFetch(`/courses${qs ? `?${qs}` : ''}`);
}

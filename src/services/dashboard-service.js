import apiClient from "./api-client";

// Function to get user dashboard data
export const getUserDashboard = async () => {
  try {
    const response = await apiClient.get("/dashboard/overview");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get user dashboard error:", error);
    throw error;
  }
};

// Function to get assignments
export const getAssignments = async (status = null) => {
  try {
    let url = "/dashboard/assignments";
    if (status && status !== "all") {
      url += `?status=${status}`;
    }
    const response = await apiClient.get(url);
    return { assignments: response.data };
  } catch (error) {
    console.error("Get assignments error:", error);
    throw error;
  }
};

// Function to get assignment details
export const getAssignmentDetails = async (assignmentId) => {
  try {
    const response = await apiClient.get(
      `/dashboard/assignments/${assignmentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Get assignment details error:", error);
    throw error;
  }
};

// Function to submit assignment
export const submitAssignment = async (assignmentId, data) => {
  try {
    const response = await apiClient.post(
      `/dashboard/assignments/${assignmentId}/submit`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Submit assignment error:", error);
    throw error;
  }
};

// Function to get classes
export const getClasses = async (type = "upcoming") => {
  try {
    const upcoming = type === "upcoming";
    const response = await apiClient.get(
      `/dashboard/classes?upcoming=${upcoming}`
    );
    console.log(response.data);
    return { classes: response.data };
  } catch (error) {
    console.error("Get classes error:", error);
    throw error;
  }
};

// Function to get resources
export const getResources = async (category = null, search = null) => {
  try {
    let url = "/dashboard/resources";
    const params = new URLSearchParams();

    if (category && category !== "all") {
      params.append("category", category);
    }

    if (search) {
      params.append("search", search);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await apiClient.get(url);
    return { resources: response.data };
  } catch (error) {
    console.error("Get resources error:", error);
    throw error;
  }
};

// Function to get resource categories
export const getResourceCategories = async () => {
  try {
    // This endpoint doesn't exist in the API, so we'll return a mock response
    return {
      categories: [
        { id: "grammar", name: "Grammar" },
        { id: "vocabulary", name: "Vocabulary" },
        { id: "pronunciation", name: "Pronunciation" },
        { id: "conversation", name: "Conversation" },
        { id: "exam", name: "Exam Prep" },
        { id: "culture", name: "Culture" },
      ],
    };
  } catch (error) {
    console.error("Get resource categories error:", error);
    throw error;
  }
};

// Function to get user profile
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/dashboard/profile");
    return { user: response.data };
  } catch (error) {
    console.error("Get user profile error:", error);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (data) => {
  try {
    const response = await apiClient.put("/dashboard/profile", data);
    return { user: response.data };
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
};

// Function to get user courses
export const getUserCourses = async () => {
  try {
    const response = await apiClient.get("/dashboard/courses");
    return response.data;
  } catch (error) {
    console.error("Get user courses error:", error);
    throw error;
  }
};

// Function to upload image
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

import apiClient from "./api-client";

// Function to login user
export const loginUser = async (credentials) => {
  try {
    // The backend expects username/password in form data format for token endpoint
    const formData = new FormData();
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await apiClient.post("/token", formData);

    // Store token and user data in localStorage
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);

      // Fetch user details
      const userResponse = await apiClient.get("/dashboard/profile");
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      localStorage.setItem("isAuthenticated", "true");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Function to register user
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

// Function to logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// Function to get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    console.log(userStr, "hello===");
    return JSON.parse(userStr);
  }
  return null;
};

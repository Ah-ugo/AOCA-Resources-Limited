import apiClient from "./api-client";

// Create an authService object with all auth-related functions
export const authService = {
  // Function to login user
  loginUser: async (credentials) => {
    try {
      // The backend expects username/password in form data format for token endpoint
      const formData = new URLSearchParams();
      formData.append("username", credentials.email);
      formData.append("password", credentials.password);

      const response = await apiClient.post("/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Store token and user data in localStorage
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);

        // Fetch user details
        const userResponse = await apiClient.get("/dashboard/profile");
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        localStorage.setItem("isAuthenticated", "true");

        return userResponse.data;
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Function to register user
  registerUser: async (userData) => {
    try {
      const response = await apiClient.post("/register", userData);
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },

  // Function to logout user
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  },

  // Function to check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem("isAuthenticated") === "true";
  },

  // Function to get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
};

export const getCurrentUser = authService.getCurrentUser;
export const isAuthenticated = authService.isAuthenticated;
export const logoutUser = authService.logout;

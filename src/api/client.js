import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:800';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getStoredToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('access_token');
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const hasToken = !!getStoredToken();
      if (hasToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
    return Promise.reject(error);
  },
);

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/api-client';

const AuthContext = createContext(null);

const normalizeRole = (role) => {
  if (typeof role !== 'string') return role;
  return role.trim().toLowerCase();
};

const normalizeUser = (userData) => {
  if (!userData) return userData;
  return {
    ...userData,
    role: normalizeRole(userData.role) || 'student',
  };
};

const getStoredToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('access_token');
};

const setStoredToken = (token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('access_token', token);
};

const clearAuthStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get('/dashboard/profile');
        const userData = normalizeUser(response.data.user || response.data);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
      } catch (error) {
        console.error('Failed to fetch user:', error);
        clearAuthStorage();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await apiClient.post('/token', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const token = response.data.access_token;
    if (!token) {
      throw new Error('Authentication token was not returned by the server.');
    }

    setStoredToken(token);
    localStorage.setItem('isAuthenticated', 'true');

    const userResponse = await apiClient.get('/dashboard/profile');
    const userData = normalizeUser(userResponse.data.user || userResponse.data);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    const response = await apiClient.post('/register', userData);
    return response.data;
  };

  const logout = () => {
    clearAuthStorage();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

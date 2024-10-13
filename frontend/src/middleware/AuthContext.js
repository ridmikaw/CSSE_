import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(API_ENDPOINTS.CHECK_AUTH, {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
        });
        console.log(token);
        setUser(response.data.user); // Set the user if token is valid
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token'); // Remove token if invalid
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(API_ENDPOINTS.SIGN_IN, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Sign in error:', error.response);
      throw new Error(
        error.response?.data.message || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

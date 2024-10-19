import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import to decode JWT tokens
import API_ENDPOINTS from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      // Check if the token's expiry is in the past
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Consider the token expired in case of an error
    }
  };

  // Sign-out function to clear user state and remove the token
  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Optionally redirect to sign-in page after signing out
  };

  // Function to load the user based on the token from local storage
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (token && !isTokenExpired(token)) {
      try {
        const response = await axios.get(API_ENDPOINTS.CHECK_AUTH, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user); // Set the user data if the token is valid
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null); // Clear user state if token validation fails
        if (error.response?.status === 401) {
          console.log('Token expired or invalid');
          signOut(); // Sign out if token is invalid or expired
        }
      }
    } else {
      console.log('No valid token found or token expired');
      signOut(); // Sign out if token is expired or not found
    }
    setLoading(false);
  }, []);

  // Automatically load user information when the app starts
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Sign-in function to authenticate user and store the token
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(API_ENDPOINTS.SIGN_IN, {
        email,
        password,
      });
      const token = response.data.token;

      if (isTokenExpired(token)) {
        throw new Error('Token is already expired');
      }

      localStorage.setItem('token', token);
      setUser(response.data.user); // Set user state after successful sign-in
      return response.data.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error(
        error.response?.data.message || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

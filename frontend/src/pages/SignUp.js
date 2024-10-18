import React, { useState } from 'react';
import axios from 'axios'; // For making API calls
import { useNavigate } from 'react-router-dom'; // For navigation
import API_ENDPOINTS from '../config'; // Import API endpoints from config

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading state to true
  
    try {
      // Use the sign-up endpoint from the config
      const response = await axios.post(API_ENDPOINTS.SIGN_UP, { name, email, password });
      
      // Log user details in the browser console
      console.log('User signed up:', response.data); // Log the response data
  
      navigate('/signin'); // Redirect to sign-in page after successful registration
    } catch (err) {
      setError('Error signing up, please try again'); // Display error message
      console.error('Sign up error:', err); // Log error to the console
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="signup-container flex bg-white p-8 border border-gray-300 rounded-lg shadow-lg max-w-4xl h-auto"> {/* Adjust height here */}
        {/* Form on the left - 50% width */}
        <div className="w-1/2 pr-8 flex flex-col justify-center"> {/* Flex container for vertical alignment */}
          <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
          {error && (
            <p className="error-message text-red-500 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mb-3 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-3 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="submit"
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <a href="/signin" className="text-blue-500">
              Sign In
            </a>
          </p>
        </div>

        {/* Image on the right - 50% width */}
        <div className="w-1/2 flex justify-center items-center">
          <img 
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" 
            alt="signup form" 
            className="w h-auto" // Set width to 50% and maintain aspect ratio
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

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
      await axios.post(API_ENDPOINTS.SIGN_UP, { name, email, password });
      navigate('/signin'); // Redirect to sign-in page after successful registration
    } catch (err) {
      setError('Error signing up, please try again'); // Display error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="signup-container max-w-md mx-auto my-8 p-6 border border-gray-300 rounded-lg shadow-lg">
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
  );
};

export default SignUp;

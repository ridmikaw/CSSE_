import React, { useState } from 'react';
import { useAuth } from '../middleware/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, loadUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      await loadUser(); // Reload user data after successful sign in
      navigate('/collections');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container max-w-md mx-auto my-8 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
      {error && (
        <p className="error-message text-red-500 text-center">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <a href="/signup" className="text-blue-500">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SignIn;

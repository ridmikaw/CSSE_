const BASE_URL = 'http://localhost:4000/api'; // Replace with your production URL if necessary

const API_ENDPOINTS = {
  GET_BINS: `${BASE_URL}/bins`, // Fetch all bins
  ADD_BIN: `${BASE_URL}/bins`,
  SIGN_IN: `${BASE_URL}/login`,
  SIGN_UP: `${BASE_URL}/signup`,
  GET_USER_PROFILE: `${BASE_URL}/users/profile`,
  CHECK_AUTH: `${BASE_URL}/auth/check`, // Use the new /auth/check endpoint
  VERIFY_BIN: (binId) => `${BASE_URL}/bins/${binId}`, // Generate URL for verifying a bin
  REJECT_BIN: (binId) => `${BASE_URL}/bins/${binId}/reject`, // Generate URL for rejecting a bin
};

export default API_ENDPOINTS;

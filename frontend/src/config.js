const BASE_URL = 'http://localhost:4000/api'; // Replace with your production URL if necessary

const API_ENDPOINTS = {
  GET_BINS: `${BASE_URL}/bins`,
  ADD_BIN: `${BASE_URL}/bins`,
  SIGN_IN: `${BASE_URL}/login`,
  SIGN_UP: `${BASE_URL}/signup`,
  GET_USER_PROFILE: `${BASE_URL}/users/profile`,
};

export default API_ENDPOINTS;

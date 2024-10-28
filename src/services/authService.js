import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const loginUser = async (userName, password) => {
  try {
    const response = await axios.post(BACKEND_URL + '/login', {
      userName,
      password,
    });

    const { access_token } = response.data;
    localStorage.setItem('token', access_token); // Save token to localStorage

    return access_token;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw new Error('Authentication failed. Please check your credentials.');
  }
};

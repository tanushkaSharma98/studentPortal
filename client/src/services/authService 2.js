// src/services/authService.js
import axios from 'axios';

const API_URL =  'http://localhost:5000/api/auth/login'; // Or use your actual API URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
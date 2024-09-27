const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const { getUserByEmail, blacklistToken, storeToken } = require('../models/userModel');
const { logUserLogin, logUserLogout } = require('../models/userLogModel');
require('dotenv').config({ path: 'src/.env' });

// Login Service
exports.login = async (email, password) => {
  try {
      // Fetch user by email with decrypted password
      const user = await getUserByEmail(email);
      if (!user) {
          return null; // User not found
      }

      // Verify decrypted password matches provided password
      if (user.decrypted_password !== password) {
          return null; // Invalid password
      }

      // Generate JWT Token
      const token = jwt.sign(
          { user_id: user.user_id, user_type: user.user_type }, 
          process.env.JWT_SECRET, 
          { expiresIn: '1h' }
      );

      // Get the current time in Asia/Kolkata timezone
      const createdAt = moment.tz(Date.now(), 'Asia/Kolkata').toDate(); // Current time for created_at
      const expiresAt = moment.tz(Date.now(), 'Asia/Kolkata').add(1, 'hour').toDate(); // Expiration time

      // Store the generated token in the token_blacklist table with Asia/Kolkata times
      await storeToken(user.user_id, token, expiresAt, createdAt, false); // Store token with created_at and is_blacklisted = false

      // Log the user login action
      await logUserLogin(user.user_id, new Date());

      return token;
  } catch (error) {
      console.error('Login Service Error:', error);
      throw new Error('Login Service Error');
  }
};

// Logout Service
exports.logout = async (token) => {
  try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Mark the token as blacklisted in the database
      await blacklistToken(token); // Update the token to set is_blacklisted = true

      // Log the user logout action
      await logUserLogout(decoded.user_id, new Date());

      return { success: true, message: 'Logged out successfully' }; // Successful logout
  } catch (error) {
      console.error('Logout Service Error:', error);
      throw new Error(`Logout Service Error: ${error.message}`); // Handle errors
  }
};

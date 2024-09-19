import React, { useState } from 'react';

import { loginUser } from '../../../services/authService.js';

import { useNavigate } from 'react-router-dom';

import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Debugging log: Check email and password
//     console.log('Attempting login with', email, password);

//     if (!email || !password) {
//       setMessage('Email and password are required.');
//       return;
//     }

//     // Mock validation logic
//     if (email !== 'user@example.com') {
//       setMessage('Email not found.');
//     } else if (password !== 'password123') {
//       setMessage('Incorrect password.');
//     } else {
//       setMessage('Login successful!');
      
//       // Debugging log: Confirm login success and navigation
//       console.log('Login successful, navigating to /student-dashboard');
      
//       // Navigate after a short delay to show success message
//       setTimeout(() => {
//         console.log('Navigating to /student-dashboard');
//         navigate('/student-dashboard');
//       }, 1000);
//     }
//   };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      // Handle successful login
      console.log('Login successful:', data);
    } catch (error) {
      setError('Invalid email or password');
    }
  };


  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import './login.css';
import loginLogo from '/src/assets/login-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message on new attempt

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        handleLoginSuccess(result.token);
      } else {
        handleLoginError(result.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  const handleLoginSuccess = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      console.log('User ID:', decodedToken.user_id); // Log user ID
      setMessage('Login successful!');
      setTimeout(() => navigate('/student-dashboard'), 1000);
    } else {
      setMessage('Login failed: No token received.');
    }
  };

  const handleLoginError = (errorMessage) => {
    setMessage(errorMessage || 'Login failed. Please check your credentials.');
  };

  return (
    <div className='slogin-page'>
      <div className="ssidebar-section">
          <div className="sprofile-image-container">
            <img
              src={loginLogo}
              alt="Profile"
              className="sprofile-image"
            />
          </div>
        </div>
      <div className="login-container">
        <div className='sform'>
        <h1 className='login-h1'>Login</h1>
      <form onSubmit={onSubmitForm}>
        <div className="input-group">
          <label className='slabel'>Email:</label>
          <input className='input'
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className='slabel'>Password:</label>
          <input className='input'
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-login-button">Login</button>
      </form>
      {message && (
        <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
        </div>
      
    </div>
    
  );
};

export default Login;

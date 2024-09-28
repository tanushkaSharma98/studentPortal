import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

import './login.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const result = await response.json();
      console.log(result); // Log the entire response for inspection

      if (response.ok) {
        // Get the token from the response
        const token = result.token;
        console.log('Token:', token); // Log the token for debugging

        if (token) {
          // Store the token in local storage
          localStorage.setItem('token', token);
          
          // Decode the token to get user_id
          const decodedToken = jwtDecode(token);
          console.log('User ID:', decodedToken.user_id); 
          console.log('User Type:', decodedToken.user_type);// Log the user_id

         // Check if user_type is 0 or 3
         if (decodedToken.user_type === 0 || decodedToken.user_type === 3) {
          setMessage('Login successful!');
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          // Display message if user is not authorized
          setMessage('Not authorized to access the dashboard.');
        }
      } else {
        setMessage('Token not received.');
      }
    } else {
      // Set the error message based on API response
      setMessage(result.message || 'Login failed.');
    }
  } catch (err) {
    console.error(err.message);
    setMessage('An error occurred during login.');
  }
  };

  return (
    <div className="adlogin-page-container">
      {/* Navbar */}
      <nav className="adnavbar-container">
        <div className="adnavbar-title">XYZ UNIVERSITY</div>
      </nav>
      
      {/* Container for Sidebar and Login Form */}
      <div className="adcontent-wrapper">
        {/* Sidebar */}
        <div className="adsidebar-section">
          <div className="adprofile-image-container">
            <img
              src="https://media.licdn.com/dms/image/C4E03AQGO448nAOrvfw/profile-displayphoto-shrink_200_200/0/1516929476180?e=2147483647&v=beta&t=u56K1TETkVUMImyKVck5Fg8V1tNKX2LX50F5144oTkw"
              alt="Profile"
              className="adprofile-image"
            />
          </div>
          <div className="adsidebar-title">
            <h2>ADMIN PANEL</h2>
          </div>
        </div>
        
        {/* Login Form */}
        <div className="adlogin-form-container">
          <h1 className="adlogin-heading">Login</h1>
          <form onSubmit={onSubmitForm}>
            <div className="adinput-group">
              <label className="adinput-label">Email:</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="adinput-field"
              />
            </div>
            <div className="adinput-group">
              <label className="adinput-label">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="adinput-field"
              />
            </div>
            <button type="submit" className="adlogin-button">Login</button>
          </form>
          {message && <p className={message.includes('successful') ? 'adsuccess-message' : 'aderror-message'}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

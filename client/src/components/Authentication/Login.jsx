import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Reset message
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
          console.log('User ID:', decodedToken.user_id); // Log the user_id

          setMessage('Login successful!');
          setTimeout(() => {
            navigate('/student-dashboard');
          }, 1000);
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
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

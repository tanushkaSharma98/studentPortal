import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

      if (response.ok) {
        // Assuming API sends a token or success message
        setMessage('Login successful!');
        setTimeout(() => {
          navigate('/student-dashboard');
        }, 1000);
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

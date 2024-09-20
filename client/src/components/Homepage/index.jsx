import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Index = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  // Check for token in localStorage when the component mounts
   // Dependency array includes 'navigate' to avoid stale closure

  const handleLoginClick = () => {

      const token = localStorage.getItem('token');
    
      if (token) {
        // If token is present, redirect to the student dashboard
        navigate('/student-dashboard');
      } else 
        navigate('/login');
     // Navigate to the login page if the user clicks the login button
  };

  return (
    <div className="centered-container">
      <div>
        <h1 className="large-text">Welcome to</h1>
        <h1 className="text">XYZ UNIVERSITY</h1>
        <button className="button" onClick={handleLoginClick}>LOGIN</button>
      </div>
    </div>
  );
};

export default Index;

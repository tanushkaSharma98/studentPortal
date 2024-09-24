import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutUs from './about-us/AboutUs.jsx';
import Contact from './contact-us/Contact.jsx';
import './index.css';

const Index = () => {
  const aboutRef = useRef(null);  // Ref for About Us section
  const contactRef = useRef(null);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Redirect to student dashboard if token exists
      navigate('/student-dashboard');
    } else {
      // Navigate to login page if no token
      navigate('/login');
    }
  };

  return (
    <div className="homepage-container">
      <div id="top" className="centered-container">
        <h1 className="large-text">Welcome to</h1>
        <h1 className="text">XYZ UNIVERSITY</h1>
        <button className="button" onClick={handleLoginClick}>LOGIN</button>
      </div>
      
      <div ref={aboutRef} id="about-us">
        <AboutUs />
      </div>

      <div ref={contactRef} id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Index;

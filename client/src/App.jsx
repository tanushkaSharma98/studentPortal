import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Common/navbar/Navbar.jsx';
import Index from './components/Homepage/index.jsx';
import AboutUs from './components/Homepage/about-us/AboutUs.jsx';
import Contact from './components/Homepage/contact-us/Contact.jsx';
import Login from './components/Authentication/Login.jsx';
import StudentDashboard from './components/Student/StudentDashboard/StudentDashboard.jsx';

function App() {
  const location = useLocation();

  // Check if the current route starts with '/admin'
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {/* Render Navbar only if it's not an admin route */}
      {!isAdminRoute && <Navbar />}
      <div style={{ paddingTop: isAdminRoute ? '0' : '60px' }}> {/* Adjust padding based on navbar height */}
        <Routes>
          {/* Route for home page */}
          <Route path="/" element={<Index />} />

          {/* Route for login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for About Us page */}
          <Route path="/about-us" element={<AboutUs />} />

          {/* Route for Contact Us page */}
          <Route path="/contact" element={<Contact />} />

          {/* Student Dashboard */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

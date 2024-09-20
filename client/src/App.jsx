import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Common/navbar/Navbar.jsx';
import Index from './components/Homepage/index.jsx';
import AboutUs from './components/Homepage/about-us/AboutUs.jsx';
import Contact from './components/Homepage/contact-us/Contact.jsx';
import Login from './components/Authentication/Login/Login.jsx';
import StudentDashboard from './components/Student/StudentDashboard/StudentDashboard.jsx';
function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '60px' }}> {/* Adjust padding based on navbar height */}
        <Routes>
          {/* Route for home page */}
          <Route path="/" element={<Index />} />

          {/* Route for login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for About Us page */}
          <Route path="/about-us" element={<AboutUs />} />

          {/* Route for Contact Us page */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

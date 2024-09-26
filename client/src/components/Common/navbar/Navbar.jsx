import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'; // For routing
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const location = useLocation(); // Get the current path
  const [showLogout, setShowLogout] = useState(false); // State to show/hide logout button
  const navigate = useNavigate(); // For navigation after logout

  // Determine if we are on the home page
  const isHomePage = location.pathname === '/';

  // Function to handle clicking on the profile image
  const toggleLogout = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // If not on the homepage, redirect the user to the login page
    if (!isHomePage) {
      navigate('/login');
    }
  };

  return (
    <nav>
      <ul>
        <li className="logo">XYZ UNIVERSITY</li>

        {/* Home Link: Use react-scroll or react-router-dom based on the page */}
        <li>
          {isHomePage ? (
            <ScrollLink to="top" smooth={true} duration={500} className="nav-link">
              Home
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="nav-link">
              Home
            </RouterLink>
          )}
        </li>

        {/* About Us Link: Use react-scroll Link for smooth scrolling */}
        {isHomePage ? (
          <li>
            <ScrollLink to="about-us" smooth={true} duration={500} className="nav-link">
              About Us
            </ScrollLink>
          </li>
        ) : (
          <li>
            <RouterLink to="/about-us" className="nav-link">
              About Us
            </RouterLink>
          </li>
        )}

        {/* Contact Link: Use react-scroll Link for smooth scrolling */}
        {isHomePage ? (
          <li>
            <ScrollLink to="contact" smooth={true} duration={500} className="nav-link">
              Contact
            </ScrollLink>
          </li>
        ) : (
          <li>
            <RouterLink to="/contact" className="nav-link">
              Contact
            </RouterLink>
          </li>
        )}

        {/* Profile */}
        <li className="profile-container" onClick={toggleLogout}>
          <img
            src="https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"
            alt="Profile"
            className="profile-img"
          />
          {/* Conditionally render the logout button */}
          {showLogout && (
            <button onClick={handleLogout} className="button logout-button">
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

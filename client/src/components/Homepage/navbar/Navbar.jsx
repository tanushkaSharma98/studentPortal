import React from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll for smooth scrolling
import { Link as RouterLink, useLocation } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const location = useLocation(); // Get the current path

  // Determine if we are on the home page
  const isHomePage = location.pathname === '/';

  return (
    <nav>
      <ul>
        <li>XYZ UNIVERSITY</li>

        {/* Home Link: Use react-router-dom Link for routing */}
        <li>
          <RouterLink to="/" className="nav-link">
            Home
          </RouterLink>
        </li>

        {/* About Us Link: Use react-router-dom Link for routing */}
        <li>
          <RouterLink to="/about-us" className="nav-link">
            About Us
          </RouterLink>
        </li>

        {/* Contact Link: Use react-router-dom Link for routing */}
        <li>
          <RouterLink to="/contact" className="nav-link">
            Contact
          </RouterLink>
        </li>

        {/* Profile */}
        <li className="profile-container">
          <img
            src="https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"
            alt="Profile"
            className="profile-img"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

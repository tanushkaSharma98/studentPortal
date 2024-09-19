import React from 'react';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>XYZ UNIVERSITY</li>

        <li>
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="nav-link"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="nav-link"
          >
            About Us
          </Link>
        </li>

        <li>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="nav-link"
          >
            Contact
          </Link>
        </li>

        <li  className="profile-container">
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


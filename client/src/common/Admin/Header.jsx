import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';  // Use NavLink for active class
import './Header.css';  // Import specific styles for Header

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);  // State to toggle menu visibility on mobile

  const toggleMenu = () => {
    setShowMenu(!showMenu);  // Toggle the menu on profile image click
  };

  return (
    <div className="navbar">
      <h2>XYZ UNIVERSITY</h2>
      <div className="navbar-right">
        
        {/* Menu options for larger screens or when profile image is clicked on mobile */}
        <div className={`menu-options ${showMenu ? 'show' : ''}`}>
          <NavLink 
            to="/admin/manage-admin" 
            className={({ isActive }) => isActive ? 'navbar-btn active-link' : 'navbar-btn'}>
            Manage Admin
          </NavLink>
          <NavLink 
            to="/admin/change-password" 
            className={({ isActive }) => isActive ? 'navbar-btn active-link' : 'navbar-btn'}>
            Change Password
          </NavLink>
          <NavLink 
            to="/admin/admin-login" 
            className={({ isActive }) => isActive ? 'navbar-btn active-link' : 'navbar-btn'}>
            Logout
          </NavLink>
        </div>
        <img
          src="https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"
          alt="Profile"
          className="profile-img"
          onClick={toggleMenu}  // Toggle menu when the profile image is clicked
        />
      </div>
    </div>
  );
};

export default Header;
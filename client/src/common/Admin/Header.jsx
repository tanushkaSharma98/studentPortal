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
            to="/manage-admin" 
            className={({ isActive }) => isActive ? 'navbar-btn active-link' : 'navbar-btn'}>
            <img src="https://cdn0.iconfinder.com/data/icons/admin-panel-linear-black/2048/Manage-512.png" alt="Manage Admin Icon" className="icon" />
            Manage Admin
          </NavLink>
          <NavLink 
            to="/change-password" 
            className={({ isActive }) => isActive ? 'navbar-btn active-link' : 'navbar-btn'}>
            <img src="https://cdn0.iconfinder.com/data/icons/cyber-security-line-threat-protection/512/Change_password-512.png" alt="Change Password Icon" className="icon" />
            Change Password
          </NavLink>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'navbar-btn active-link' : 'navbar-btn'}>
            {/* Icon added in front of the Logout text */}
            <img src="https://cdn3.iconfinder.com/data/icons/remixicon-system/24/logout-circle-r-line-512.png" alt="Logout Icon" className="icon" />
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
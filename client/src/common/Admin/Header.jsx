import React from 'react';
import { NavLink } from 'react-router-dom';  // Use NavLink for active class
import './Header.css';  // Import specific styles for Header

const Header = () => {
  return (
    <div className="adnavbar">
      <h2>XYZ UNIVERSITY</h2>
      <div className="adnavbar-right">
        <NavLink 
          to="/admin/manage-admin" 
          className={({ isActive }) => isActive ? 'adnavbar-btn active-link' : 'adnavbar-btn'}>
          Manage Admin
        </NavLink>
        <NavLink 
          to="/admin/change-password" 
          className={({ isActive }) => isActive ? 'adnavbar-btn active-link' : 'adnavbar-btn'}>
          Change Password
        </NavLink>
        <NavLink 
          to="/admin/admin-login" 
          className={({ isActive }) => isActive ? 'adnavbar-btn active-link' : 'adnavbar-btn'}>
          Logout
        </NavLink>
        <img
          src="https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"
          alt="Profile"
          className="adprofile-img"
        />
      </div>
    </div>
  );
};

export default Header;

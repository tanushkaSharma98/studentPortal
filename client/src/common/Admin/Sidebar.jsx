import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';  // Import specific styles for Sidebar

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);  // State to toggle sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);  // Toggle sidebar visibility
  };

  return (
    <div>
      {/* Hamburger button for mobile screens */}
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776; {/* Unicode character for hamburger icon */}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3>Main Menu</h3>
        <nav>
          <ul>
            <li><NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink></li>
            <li>
              Users
              <ul>
                <li><NavLink to="/admin/students" className={({ isActive }) => isActive ? 'active-link' : ''}>Students</NavLink></li>
                <li><NavLink to="/admin/teachers" className={({ isActive }) => isActive ? 'active-link' : ''}>Teachers</NavLink></li>
              </ul>
            </li>
            <li><NavLink to="/admin/subjects" className={({ isActive }) => isActive ? 'active-link' : ''}>Subject</NavLink></li>
            <li><NavLink to="admin//branches" className={({ isActive }) => isActive ? 'active-link' : ''}>Branch</NavLink></li>
            <li><NavLink to="/admin/exams" className={({ isActive }) => isActive ? 'active-link' : ''}>Exam</NavLink></li>
            <li><NavLink to="/admin/activity" className={({ isActive }) => isActive ? 'active-link' : ''}>User Activity</NavLink></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
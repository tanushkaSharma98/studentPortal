import React from 'react';
// import { Link } from 'react-router-dom';  // Use Link for navigation
import { NavLink } from 'react-router-dom';
import './Sidebar.css';  // Import specific styles for Sidebar

const Sidebar = () => {
  return (
    <div className="adsidebar">
      <h3>Main Menu</h3>
      <nav>
        <ul>
          <li><NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'adactive-link' : ''}>Dashboard</NavLink></li>
          <li>
            Users
            <ul>
              <li><NavLink to="/admin/students" className={({ isActive }) => isActive ? 'adactive-link' : ''}>Students</NavLink></li>
              <li><NavLink to="/admin/teachers" className={({ isActive }) => isActive ? 'adactive-link' : ''}>Teachers</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/admin/subjects" className={({ isActive }) => isActive ? 'adactive-link' : ''}>Subject</NavLink></li>
          <li><NavLink to="/admin/branches" className={({ isActive }) => isActive ? 'adactive-link' : ''}>Branch</NavLink></li>
          <li><NavLink to="/admin/exams" className={({ isActive }) => isActive ? 'adactive-link' : ''}>Exam</NavLink></li>
          <li><NavLink to="/admin/activity" className={({ isActive }) => isActive ? 'adactive-link' : ''}>User Activity</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

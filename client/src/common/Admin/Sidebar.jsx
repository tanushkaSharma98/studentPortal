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
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>
                <img src="https://cdn1.iconfinder.com/data/icons/tiny-iconz-line-vol-09/20/dashboard_panel_admin-1024.png" alt="Dashboard Icon" className="icon" />
                Dashboard
              </NavLink>
            </li>
            <li>
            <img src="https://cdn4.iconfinder.com/data/icons/office-166/16/office_users-group-male-512.png" alt="Student Icon" className="icon" />
              Users
              <ul>
                <li>
                  <NavLink to="/students" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    <img src="https://cdn2.iconfinder.com/data/icons/learning-6/64/Student-Graduate-512.png" alt="Student Icon" className="icon" />
                    Students
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/teachers" className={({ isActive }) => isActive ? 'active-link' : ''}>
                    <img src="https://cdn0.iconfinder.com/data/icons/business-man-line/512/induction_class_teach_teaching-512.png" alt="Teacher Icon" className="icon" />
                    Teachers
                  </NavLink>
                </li>
              </ul>
            </li>
<<<<<<< HEAD
            <li>
              <NavLink to="/subjects" className={({ isActive }) => isActive ? 'active-link' : ''}>
                <img src="https://cdn4.iconfinder.com/data/icons/content1-1/24/Dossiers-2-512.png" alt="Subject Icon" className="icon" />
                Subject
              </NavLink>
            </li>
            <li>
              <NavLink to="/branches" className={({ isActive }) => isActive ? 'active-link' : ''}>
                <img src="https://cdn0.iconfinder.com/data/icons/artificial-intelligence-8/48/1-Artificial_intelligence-512.png" alt="Branch Icon" className="icon" />
                Branch
              </NavLink>
            </li>
            <li>
              <NavLink to="/exams" className={({ isActive }) => isActive ? 'active-link' : ''}>
                <img src="https://cdn0.iconfinder.com/data/icons/team-work-42/50/29_daily_plans_testing_sampling_interview_exams-512.png" alt="Exam Icon" className="icon" />
                Exam
              </NavLink>
            </li>
            <li>
              <NavLink to="/activity" className={({ isActive }) => isActive ? 'active-link' : ''}>
                <img src="https://cdn0.iconfinder.com/data/icons/business-man-line/512/interaction_change_positioning_head_hunter-512.png" alt="User Activity Icon" className="icon" />
                User Activity
              </NavLink>
            </li>
=======
            <li><NavLink to="/admin/subjects" className={({ isActive }) => isActive ? 'active-link' : ''}>Subject</NavLink></li>
            <li><NavLink to="/admin/branches" className={({ isActive }) => isActive ? 'active-link' : ''}>Branch</NavLink></li>
            <li><NavLink to="/admin/exams" className={({ isActive }) => isActive ? 'active-link' : ''}>Exam</NavLink></li>
            <li><NavLink to="/admin/activity" className={({ isActive }) => isActive ? 'active-link' : ''}>User Activity</NavLink></li>
>>>>>>> feda459f8e31f877b51d18a720af7437d9039c84
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
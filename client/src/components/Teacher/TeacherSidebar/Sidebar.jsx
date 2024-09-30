import React from 'react';
import './Sidebar.css';

const Sidebar = ({ handleScrollToSection }) => {
  return (
    <div className="teacher-sidebar">
      <button onClick={() => handleScrollToSection('teacher-dashboard')}>DASHBOARD</button>
      <button onClick={() => handleScrollToSection('teacher-scoreboard')}>SCOREBOARD</button>
      <button onClick={() => handleScrollToSection('teacher-attendance')}>ATTENDANCE</button>
      <button onClick={() => handleScrollToSection('teacher-student-record')}>STUDENT RECORD</button>
    </div>
  );
};

export default Sidebar;

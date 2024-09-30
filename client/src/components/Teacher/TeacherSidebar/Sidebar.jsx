import React from 'react';
import './Sidebar.css';

const Sidebar = ({ handleScrollToSection }) => {
  return (
    <div className="sidebar">
      <button onClick={() => handleScrollToSection('dashboard')}>DASHBOARD</button>
      <button onClick={() => handleScrollToSection('scoreboard')}>SCOREBOARD</button>
      <button onClick={() => handleScrollToSection('attendance')}>ATTENDANCE</button>
      <button onClick={() => handleScrollToSection('student-record')}>STUDENT RECORD</button>
    </div>
  );
};

export default Sidebar;

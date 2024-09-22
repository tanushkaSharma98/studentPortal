// src/components/Student/StudentSidebar/StudentSidebar.jsx
import React from 'react';
import './StudentSidebar.css';

const StudentSidebar = ({ onScroll }) => {
  return (
    <div className="sidebar">
      <button onClick={() => onScroll('dashboard')}>Dashboard</button>
      <button onClick={() => onScroll('scoreboard')}>Scoreboard</button>
      <button onClick={() => onScroll('attendance')}>Attendance</button>
    </div>
  );
};

export default StudentSidebar;

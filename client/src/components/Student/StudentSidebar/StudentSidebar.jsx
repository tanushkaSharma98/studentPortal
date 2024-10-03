import React from 'react';
import './StudentSidebar.css';
import dashboard from '/src/assets/TeacherSidebar_icon/dashboard.png'
import scoreboard from  '/src/assets/TeacherSidebar_icon/scoreboard.png' 
import attendance from  '/src/assets/TeacherSidebar_icon/attendant.png'

const StudentSidebar = ({ onScroll }) => {
  return (
    <div className="Sidebar">
      <button onClick={() => onScroll('dashboard')}>
        <img src={dashboard} alt="Dashboard Icon" className="icon" />
        Dashboard
      </button>
      <button onClick={() => onScroll('scoreboard')}>
        <img src={scoreboard} alt="Scoreboard Icon" className="icon" />
        Scoreboard
      </button>
      <button onClick={() => onScroll('attendance')}>
        <img src={attendance} alt="Attendance Icon" className="icon" />
        Attendance
      </button>
    </div>
  );
};

export default StudentSidebar;

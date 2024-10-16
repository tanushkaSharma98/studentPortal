import React from 'react';
import './Sidebar.css';
import dashboard from '/src/assets/TeacherSidebar_icon/dashboard.png'
import scoreboard from  '/src/assets/TeacherSidebar_icon/scoreboard.png' 
import attendance from  '/src/assets/TeacherSidebar_icon/attendant.png'
import studentrecoard from  '/src/assets/TeacherSidebar_icon/student_recoard.png'



const Sidebar = ({ handleScrollToSection }) => {
  return (
    <div className="teacher-sidebar">
      <button onClick={() => handleScrollToSection('teacher-dashboard')}>
        <img src={dashboard} alt="Dashboard Icon" className="icon" />
        DASHBOARD
      </button>
      <button onClick={() => handleScrollToSection('teacher-scoreboard')}>
        <img src={scoreboard} alt="Scoreboard Icon" className="icon" />
        SCOREBOARD
      </button>
      <button onClick={() => handleScrollToSection('teacher-attendance')}>
        <img src={attendance} alt="Attendance Icon" className="icon" />
        ATTENDANCE
      </button>
      <button onClick={() => handleScrollToSection('teacher-student-record')}>
        <img src={studentrecoard} alt="Student Record Icon" className="icon" />
        STUDENT RECORD
      </button>
    </div>
  );
};

export default Sidebar;

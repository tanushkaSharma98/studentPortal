import React, { useEffect, useState } from 'react';
import TeacherProfile from '../TeacherProfile.jsx';
import './TeacherDashboard.css';
import Sidebar from '../TeacherSidebar/Sidebar.jsx'; // Import the Sidebar component
import TeacherScoreboard from '../TeacherScoreboard/TeacherScoreboard.jsx';
import TeacherAttendance from '../TeacherAttendance/TeacherAttendance.jsx';
import StudentRecord from '../StudentRecord/StudentRecord.jsx';



function TeacherDashboard() {
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    // Fetch teacher profile data from API
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      fetch('http://localhost:3000/api/teachers/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Parse response as JSON
        })
        .then(data => {
          setTeacherData(data); // Update state with fetched data
        })
        .catch(error => {
          console.error('Error fetching teacher profile data', error);
        });
    }
  }, []);

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="teacher-teacher-dashboard">
      <Sidebar handleScrollToSection={handleScrollToSection} /> {/* Use Sidebar component */}
      <div className="teacher-content">
        <div id="teacher-dashboard" className="teacher-section">
          <h2>Dashboard</h2>
          {/* Add dashboard content here */}
        </div>
        <div className="teacher-profile-section">
          {teacherData ? (
            <TeacherProfile data={teacherData} />
          ) : (
            <p>Loading teacher profile...</p>
          )}
        </div>
        
        <div id="teacher-scoreboard" className="teacher-section">
          <h2>Scoreboard</h2>
          {/* Add scoreboard content here */}
        </div>
        <div><TeacherScoreboard/></div>
        <div id="teacher-attendance" className="teacher-section">
          <h2>Attendance</h2>
          {/* Add attendance content here */}
        </div>
        <div><TeacherAttendance/></div>
        <div id="teacher-student-record" className="teacher-section">
          <h2>Student Record</h2>
          {/* Add student record content here */}
         
        </div>
        <div><StudentRecord/></div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

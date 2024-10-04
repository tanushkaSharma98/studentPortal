import React, { useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import { Link } from 'react-router-dom';
import './StudentProfile.css';  // Custom CSS for Student Profile

const StudentProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar toggle state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle sidebar state
  };

  const [student, setStudent] = useState({
    name: 'Jane Doe',
    enrollment: '123456789',
    branch: 'Computer Science',
    semester: '6',
    email: 'jane.doe@example.com',
    contact: '9876543210',
  });

  const handleEdit = () => {
    // Logic to edit student's profile
    alert('Edit profile functionality to be implemented');
  };

  return (
    <div className="adstudent-profile">
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`student-main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="stprofile-container">
          <div className="stprofile-header">
            <Link to="/admin/students">
              <button className="back-button">←</button>
            </Link>
            <div className="stprofile-picture">
              {/* Profile picture placeholder */}
              <span className="stprofile-icon">👤</span>
            </div>
            <div className="stprofile-info">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Enrollment No:</strong> {student.enrollment}</p>
              <p><strong>Branch:</strong> {student.branch}</p>
              <p><strong>Semester:</strong> {student.semester}</p>
              <p><strong>Email Id:</strong> {student.email}</p>
              <p><strong>Contact No.:</strong> {student.contact}</p>
              <button className="edit-button" onClick={handleEdit}>Edit</button>
            </div>
          </div>
          <div className="stprofile-actions">
          <Link to="/admin/student-scoreboard">
            <button className="staction-button">View Marks</button>
          </Link>
          <Link to="/admin/student-attendance">
            <button className="staction-button">View Attendance</button>
         </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
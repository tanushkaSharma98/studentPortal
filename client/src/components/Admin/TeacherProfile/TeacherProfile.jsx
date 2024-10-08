import React, { useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import { Link } from 'react-router-dom';
import './TeacherProfile.css';  // Custom CSS for Teacher Profile

const TeacherProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar toggle state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle sidebar state
  };

  const [teacher, setTeacher] = useState({
    name: 'John Doe',
    designation: 'Assistant Professor',
    subjects: 'Mathematics, Physics',
    contact: '1234567890'
  });

  const handleEdit = () => {
    // Logic to edit teacher's profile
    alert('Edit profile functionality to be implemented');
  };

  return (
    <div className="teacher-profile">
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`teachermain-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="profile-container">
          <div className="profile-header">
            <Link to="/admin/teachers">
              <button className="back-button">←</button>
            </Link>
            <div className="profile-picture"> J
            </div>
            <div className="profile-info">
              <p><strong>Name:</strong> {teacher.name}</p>
              <p><strong>Designation:</strong> {teacher.designation}</p>
              <p><strong>Subjects:</strong> {teacher.subjects}</p>
              <p><strong>Contact No.:</strong> {teacher.contact}</p>
              <button className="edit-button" onClick={handleEdit}>Edit</button>
            </div>
          </div>
          <div className="profile-actions">
            <Link to="/admin/attendance-record">
              <button className="action-button">Attendance Record</button>
            </Link>
            <Link to="/admin/student-record">
              <button className="action-button">Student Record</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
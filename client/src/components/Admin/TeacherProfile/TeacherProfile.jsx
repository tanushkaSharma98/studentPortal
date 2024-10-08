import React, { useEffect, useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import { Link, useParams } from 'react-router-dom';
import './TeacherProfile.css';  // Custom CSS for Teacher Profile
import axios from 'axios';

const TeacherProfile = () => {
  const { userId } = useParams();  // Get userId from URL parameters
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar toggle state
  const [teacher, setTeacher] = useState(null);  // State for teacher data

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle sidebar state
  };

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const token = localStorage.getItem('token');  // Get token from local storage
        const response = await axios.get(`http://localhost:3000/api/admin/teachers/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the request
          },
        });
        setTeacher(response.data);  // Set the teacher data to state
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
      }
    };

    fetchTeacherProfile();
  }, [userId]);

  const handleEdit = () => {
    // Logic to edit teacher's profile
    alert('Edit profile functionality to be implemented');
  };

  if (!teacher) {
    return <div>Loading...</div>;  // Show loading state while fetching
  }

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
            <div className="profile-picture">
              {/* Profile picture placeholder */}
              <span className="profile-icon">👤</span>
            </div>
            <div className="profile-info">
              <p><strong>Name:</strong> {teacher.teacher_name}</p>
              <p><strong>Designation:</strong> {teacher.designation}</p>
              <p><strong>Subjects:</strong> {teacher.subjects.join(', ')}</p> {/* Assuming subjects is an array */}
              <p><strong>Contact No.:</strong> {teacher.contact_no}</p>
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

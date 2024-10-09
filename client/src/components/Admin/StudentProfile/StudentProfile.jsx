import React, { useEffect, useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import { Link, useParams } from 'react-router-dom';
import './StudentProfile.css';  // Custom CSS for Student Profile
import axios from 'axios';

const StudentProfile = () => {
  const { userId } = useParams();  // Get userId from URL parameters
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar toggle state
  const [student, setStudent] = useState(null);  // State to hold student data
  const [error, setError] = useState(null);  // State to hold error messages

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle sidebar state
  };

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get(`http://localhost:3000/api/admin/students/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token to headers
          },
        });
        
        // Set student data from response
        setStudent({
          name: response.data.student_name,
          enrollment: response.data.enrollment_no,
          branch: response.data.branch_name,
          semester: response.data.semester,
          email: response.data.email,
          contact: response.data.contact_no,
        });
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching student profile');
      }
    };

    fetchStudentProfile();  // Call the fetch function
  }, [userId]);  // Dependency on userId

  const handleEdit = () => {
    // Logic to edit student's profile
    alert('Edit profile functionality to be implemented');
  };

  // Loading and error states
  if (!student) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

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

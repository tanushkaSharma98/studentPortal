import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarChart from '../ScoreBoard/BarChart';

const StudentData = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's navigation hook for redirecting

  useEffect(() => {
    // Fetch the student data from the API using fetch
    const fetchStudentData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      try {
        const response = await fetch('http://localhost:3000/api/students/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStudentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect the user to the login page
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Student Information</h2>
      {studentData ? (
        <>
          <table>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{studentData.student_name}</td>
              </tr>
              <tr>
                <td><strong>College ID:</strong></td>
                <td>{studentData.enrollment_no}</td>
              </tr>
              <tr>
                <td><strong>Branch:</strong></td>
                <td>{studentData.branch_name}</td>
              </tr>
              <tr>
                <td><strong>Semester:</strong></td>
                <td>{studentData.semester}</td>
              </tr>
            </tbody>
          </table>

          {/* Logout Button */}
          <button onClick={handleLogout} className="button logout-button">Logout</button>
        </>
      ) : (
        <div>No student data available</div>
      )}
      <BarChart />
    </div>
  );
};

export default StudentData;

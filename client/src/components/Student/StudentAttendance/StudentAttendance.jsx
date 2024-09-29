import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './StudentAttendance.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
ChartJS.register(ArcElement, Tooltip, Legend);

const StudentAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [openSubjects, setOpenSubjects] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate


  const toggleSubject = (code) => {
    setOpenSubjects((prevState) => ({
      ...prevState,
      [code]: !prevState[code],
    }));
  };
    // Navigate to the Daily Attendance page when the button is clicked
    const handleViewDailyAttendance = () => {
      navigate('/daily-attendance');
    };
  

  // Function to generate pie chart data for attendance
  const getPieChartData = (attendedLectures, totalClasses) => {
    return {
      labels: ['Classes Attended', 'Classes Missed'],
      datasets: [
        {
          data: [attendedLectures, totalClasses - attendedLectures],
          backgroundColor: ['#555555', '#cccccc'], // Grey shades
          hoverBackgroundColor: ['#444444', '#bbbbbb'],
        },
      ],
    };
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Maintain aspect ratio based on the container size
  };

  // Fetch attendance data from the API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await fetch('http://localhost:3000/api/students/attendance', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Transform the API response to fit your subjects array structure
        const formattedSubjects = data.map((item) => ({
          code: item.subject_code,
          name: item.subject_name,
          totalClasses: item.total_lectures, // Use the total lectures from the API response
          classesAttended: item.attended_lecture,
          updatedTill: new Date(item.date).toLocaleDateString(), // Format the date
        }));
        setSubjects(formattedSubjects);
      } else {
        console.error('Failed to fetch attendance data');
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div className="attendance-section">
              <h1> Attendance</h1>
      <div className="attendance-header">
       <button className="daily-attendance-button" onClick={handleViewDailyAttendance}>View Daily Attendance</button>
      </div>

      {subjects.map((subject) => (
        <div key={subject.code} className="subject-bar">
          <div className="subject-header" onClick={() => toggleSubject(subject.code)}>
            <span>{subject.code}</span>
            <button className="dropdown-button">
              {openSubjects[subject.code] ? '▲' : '▼'}
            </button>
          </div>
          {openSubjects[subject.code] && (
            <div className="subject-details">
              <div className="subject-info">
                <div className="info-left">
                  <p>Subject Name: {subject.name}</p>
                  <p>Total Classes: {subject.totalClasses}</p>
                  <p>Classes Attended: {subject.classesAttended}</p>
                  <p>Updated Till: {subject.updatedTill}</p>
                </div>
                <div className="info-right">
                  <div className="pie-chart-container">
                    <Pie
                      data={getPieChartData(subject.classesAttended, subject.totalClasses)}
                      options={pieChartOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentAttendance;

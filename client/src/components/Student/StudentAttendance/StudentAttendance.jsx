import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './StudentAttendance.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentAttendance = () => {
  // Sample data for subjects and their attendance
  const subjects = [
    { code: 'CS101', name: 'Computer Science', totalClasses: 40, classesAttended: 35, updatedTill: '2023-09-20' },
    { code: 'MATH201', name: 'Mathematics', totalClasses: 40, classesAttended: 30, updatedTill: '2023-09-20' },
    { code: 'PHY301', name: 'Physics', totalClasses: 40, classesAttended: 28, updatedTill: '2023-09-20' },
    { code: 'CHEM401', name: 'Chemistry', totalClasses: 40, classesAttended: 32, updatedTill: '2023-09-20' },
  ];

  const [openSubjects, setOpenSubjects] = useState({});

  const toggleSubject = (code) => {
    setOpenSubjects((prevState) => ({
      ...prevState,
      [code]: !prevState[code],
    }));
  };

  // Function to generate pie chart data for attendance
  const getPieChartData = (classesAttended, totalClasses) => {
    return {
      labels: ['Classes Attended', 'Classes Missed'],
      datasets: [
        {
          data: [classesAttended, totalClasses - classesAttended],
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

  return (
    <div className="attendance-section">
      <h1>Student Attendance</h1>
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
                    <Pie data={getPieChartData(subject.classesAttended, subject.totalClasses)} options={pieChartOptions} />
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

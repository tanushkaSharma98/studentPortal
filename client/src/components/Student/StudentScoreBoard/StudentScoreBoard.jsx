import React, { useState } from 'react';
import './StudentScoreboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StudentScoreboard = () => {
  const subjects = [
    { code: 'CS101', name: 'Computer Science', marksObtained: 85, maxMarks: 100 },
    { code: 'MATH201', name: 'Mathematics', marksObtained: 90, maxMarks: 100 },
    { code: 'PHY301', name: 'Physics', marksObtained: 75, maxMarks: 100 },
    { code: 'CHEM401', name: 'Chemistry', marksObtained: 80, maxMarks: 100 },
  ];

  const [openSubjects, setOpenSubjects] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSubject = (code) => {
    setOpenSubjects((prevState) => ({
      ...prevState,
      [code]: !prevState[code],
    }));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getPieChartData = (marksObtained, maxMarks) => {
    return {
      labels: ['Marks Obtained', 'Remaining Marks'],
      datasets: [
        {
          data: [marksObtained, maxMarks - marksObtained],
          backgroundColor: ['#a8a8a8', '#d9d9d9'],
          hoverBackgroundColor: ['#a8a8a8', '#d9d9d9'],
        },
      ],
    };
  };

  
  return (
    <div className="scoreboard-section">
      <div className="header">
        <h1>Student Scoreboard</h1>
        <div className="exam-bar" onClick={toggleDropdown}>
          <span>Exam</span>
          <button className="dropdown-button">
            {dropdownOpen ? '▲' : '▼'}
          </button>
          {dropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-option">Mid Term 1</div>
              <div className="dropdown-option">Mid Term 2</div>
            </div>
          )}
        </div>
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
                <p>Subject Name: {subject.name}</p>
                <p>Marks Obtained: {subject.marksObtained}</p>
                <p>Maximum Marks: {subject.maxMarks}</p>
                <p>
                  Percentage: {((subject.marksObtained / subject.maxMarks) * 100).toFixed(2)}%
                </p>
              </div>
              <div className="subject-chart">
                <Pie data={getPieChartData(subject.marksObtained, subject.maxMarks)} />
              </div>
            </div>
          )}
        </div>
      ))}

      
    </div>
  );
};

export default StudentScoreboard;

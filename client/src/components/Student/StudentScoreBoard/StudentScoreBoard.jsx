import React, { useState, useEffect } from 'react';
import './StudentScoreboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentScoreboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [openSubjects, setOpenSubjects] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [examId, setExamId] = useState(1);
  const [exam, setExam] = useState('Mid Term 1'); // Correctly set the initial exam

  // Function to fetch marks for all subjects
  const fetchMarks = async () => {
    const token = localStorage.getItem('token');
    const subjectIds = [1, 2, 3]; // Default subject IDs
    const promises = subjectIds.map((subjectId) =>
      fetch(`http://localhost:3000/api/students/marks/${subjectId}/${examId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json())
    );

    const results = await Promise.all(promises);
    // Flatten the array and set state
    setSubjects(results.flat());
  };

  useEffect(() => {
    fetchMarks();
  }, [examId]); // Re-fetch when examId changes

  const toggleSubject = (code) => {
    setOpenSubjects((prevState) => ({
      ...prevState,
      [code]: !prevState[code],
    }));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleExamChange = (selectedExam) => {
    const selectedId = selectedExam === 'Mid Term 1' ? 1 : 2;
    setExamId(selectedId);
    setExam(selectedExam); // Update the exam name
    fetchMarks(); // Re-fetch marks for the new exam
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
       
        <div className="exam-bar" onClick={toggleDropdown}>
          <span>Exam: {exam}</span> {/* Display current exam */}
          <button className="dropdown-button">
            {dropdownOpen ? '▲' : '▼'}
          </button>
          {dropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-option" onClick={() => handleExamChange('Mid Term 1')}>
                Mid Term 1
              </div>
              <div className="dropdown-option" onClick={() => handleExamChange('Mid Term 2')}>
                Mid Term 2
              </div>
            </div>
          )}
        </div>
      </div>
      {Array.isArray(subjects) && subjects.length > 0 ? (
        subjects.map((subject) => (
          <div key={subject.subject_code} className="subject-bar">
            <div className="subject-header" onClick={() => toggleSubject(subject.subject_code)}>
              <span>{subject.subject_code}</span>
              <button className="dropdown-button">
                {openSubjects[subject.subject_code] ? '▲' : '▼'}
              </button>
            </div>
            {openSubjects[subject.subject_code] && (
              <div className="subject-details">
                <div className="subject-info">
                  <p>Subject Name: {subject.subject_name}</p>
                  <p>Marks Obtained: {subject.marks_obtained}</p>
                  <p>Maximum Marks: {subject.maximum_marks}</p>
                  <p>Percentage: {subject.percentage}%</p>
                </div>
                <div className="subject-chart">
                  <Pie data={getPieChartData(subject.marks_obtained, subject.maximum_marks)} />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No marks data available.</p>
      )}
    </div>
  );
};

export default StudentScoreboard;

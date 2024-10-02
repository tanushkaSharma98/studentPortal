import React, { useState, useEffect } from 'react';
import './StudentScoreboard.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentScoreboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [openSubjects, setOpenSubjects] = useState({});
  const [examId, setExamId] = useState(1);
  const [exam, setExam] = useState('Mid Term 1'); // Correctly set the initial exam

  const exams = ['Mid Term 1', 'Mid Term 2']; // List of exams

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

  const handleExamChange = (e) => {
    const selectedExam = e.target.value;
    const selectedId = selectedExam === 'Mid Term 1' ? 1 : 2;
    setExamId(selectedId);
    setExam(selectedExam); // Update the exam name
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
    <div className="Student-scoreboard-section">
      <div className="student-header">
        {/* Exam Dropdown */}
        <div className="student-exam-dropdown">
          <select id="student-exam-select" value={exam} onChange={handleExamChange}>
            <option value=""> Exam</option>
            {exams.map((examOption, index) => (
              <option key={index} value={examOption}>
                {examOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      {Array.isArray(subjects) && subjects.length > 0 ? (
        subjects.map((subject) => (
          <div key={subject.subject_code} className="student-subject-bar">
            <div className="student-subject-header" onClick={() => toggleSubject(subject.subject_code)}>
              <span>{subject.subject_code}</span>
              <button className="student-dropdown-button">
                {openSubjects[subject.subject_code] ? '▲' : '▼'}
              </button>
            </div>
            {openSubjects[subject.subject_code] && (
              <div className="student-subject-details">
                <div className="student-subject-info">
                  <p>Subject Name: {subject.subject_name}</p>
                  <p>Marks Obtained: {subject.marks_obtained}</p>
                  <p>Maximum Marks: {subject.maximum_marks}</p>
                  <p>Percentage: {subject.percentage}%</p>
                </div>
                <div className="student-subject-chart">
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

import { useState } from 'react';
import './TeacherScoreboard.css';
import Table from './Table.jsx';

const TeacherScoreboard = () => {
  // State to manage selected values
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');

  const subjects = ['Maths', 'Physics', 'Chemistry']; // List of subjects
  const exams = ['Midterm-1', 'Midterm-2']; // List of exams

  // Function to handle subject change
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Function to handle exam change
  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  // Function to handle save
  const handleSave = () => {
    console.log('Data saved'); // Replace this with actual saving logic
  };

  return (
    <div className="teacher-scoreboard-container">
      <div className="teacher-top-buttons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value=""> Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Dropdown */}
        <div className="teacher-exam-dropdown">
          <select value={selectedExam} onChange={handleExamChange}>
            <option value=""> Exam</option>
            {exams.map((exam, index) => (
              <option key={index} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Branch, Semester, Subject, Exam in a single row */}
      <div className="teacher-info-row">
        <span>Branch : Computer Science</span>
        <span>Semester : 7</span>
        <span>Subject : {selectedSubject}</span>
        <span>Exam : {selectedExam}</span>
      </div>

      <div className="teacher-maxmarks">
        <span>Maximum marks : 30</span>
      </div>

      <div>
        <Table />
      </div>

      {/* Save Button */}
      <div className="teacherScoreboard-save-button-container">
        <button className="teacher-save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TeacherScoreboard;

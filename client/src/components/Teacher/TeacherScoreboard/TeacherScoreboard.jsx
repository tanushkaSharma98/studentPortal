import React, { useState } from 'react';
import './TeacherScoreboard.css';
import Table from './Table.jsx';

const TeacherScoreboard = () => {
  // State to manage dropdown visibility and selected values
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [examDropdown, setExamDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject'); // Default value
  const [selectedExam, setSelectedExam] = useState('Exam'); // Default value

  const toggleSubjectDropdown = () => setSubjectDropdown(!subjectDropdown);
  const toggleExamDropdown = () => setExamDropdown(!examDropdown);

  // Function to handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject); // Update the button text with selected subject
    setSubjectDropdown(false); // Close the dropdown
  };

  // Function to handle exam selection
  const handleExamSelect = (exam) => {
    setSelectedExam(exam); // Update the button text with selected exam
    setExamDropdown(false); // Close the dropdown
  };

  // Function to handle save
  const handleSave = () => {
    // Logic to save the data
    console.log('Data saved'); // Replace this with actual saving logic
  };

  return (
    <div className="teacher-scoreboard-container">
      <div className="teacher-top-buttons">
        {/* Subject Button */}
        <div className="teacher-dropdown">
          <button className="teacher-dropdown-btn" onClick={toggleSubjectDropdown}>
            {selectedSubject} <span className="teacher-arrow">&#x25BC;</span>
          </button>
          {subjectDropdown && (
            <div className="teacher-dropdown-content">
              <a href="#" onClick={(e) => { e.preventDefault(); handleSubjectSelect('Math'); }}>Math</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSubjectSelect('Physics'); }}>Physics</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSubjectSelect('Chemistry'); }}>Chemistry</a>
            </div>
          )}
        </div>

        {/* Exam Button */}
        <div className="teacher-dropdown">
          <button className="teacher-dropdown-btn" onClick={toggleExamDropdown}>
            {selectedExam} <span className="teacher-arrow">&#x25BC;</span>
          </button>
          {examDropdown && (
            <div className="teacher-dropdown-content">
              <a href="#" onClick={(e) => { e.preventDefault(); handleExamSelect('Midterm-1'); }}>Midterm-1</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleExamSelect('Midterm-2'); }}>Midterm-2</a>
            </div>
          )}
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
      <div className="teacher-save-button-container">
        <button className="teacher-save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TeacherScoreboard;

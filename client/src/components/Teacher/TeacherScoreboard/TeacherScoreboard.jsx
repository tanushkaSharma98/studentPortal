import { useState, useEffect } from 'react';
import './TeacherScoreboard.css';
import Table from './Table.jsx';

//
import axios from 'axios'; // Import Axios
import {jwtDecode} from 'jwt-decode'; // Correct import


const TeacherScoreboard = () => {
  // State to manage dropdown visibility and selected values
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [examDropdown, setExamDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject'); // Default value
  const [selectedExam, setSelectedExam] = useState('Exam'); // Default value

  const subjects = ['Maths', 'Physics', 'Chemistry']; // List of subjects
  const exams = ['Midterm-1', 'Midterm-2']; // List of exams

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
    console.log('Data saved'); // Replace this with actual saving logic
  };

  const toggleExamDropdown = (selected) => {
    setExamDropdown(selected); // Update the state
  }

  return (
    <div className="teacher-scoreboard-container">
      <div className="teacher-top-buttons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
          <select value={selectedSubject} onChange={handleSubjectSelect}>
            <option value=""> Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Button */}
        <div className="teacher-dropdown">
          <button className="teacher-dropdown-btn" onClick={toggleExamDropdown}>
            {selectedExam} <span className="teacher-arrow"></span>
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
      <div className="teacherScoreboard-save-button-container">
        <button className="teacher-save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TeacherScoreboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './StudentRecord.css'; // Create a new CSS file for custom styles
import StudentRecordTable from './StudentRecordTable';

const StudentRecord = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [marksBelowDropdown, setMarksBelowDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject');
  const [selectedMarksBelow, setSelectedMarksBelow] = useState('Marks Below');

  const toggleSubjectDropdown = () => setSubjectDropdown(!subjectDropdown);
  const toggleMarksBelowDropdown = () => setMarksBelowDropdown(!marksBelowDropdown);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSubjectDropdown(false);
  };

  const handleMarksBelowSelect = (marks) => {
    setSelectedMarksBelow(marks);
    setMarksBelowDropdown(false);
  };

  const subjects = ['Maths', 'Physics', 'Chemistry'];
  const marksBelowOptions = ['Below 10', 'Below 20'];

  const handleExpandAttendance = () => {
    navigate('/daily-attendance-record'); // Navigate to Daily Attendance Record page
  };

  return (
    <div className="attendanceContainer">
      <div className="topButtons">
        {/* Subject Dropdown */}
        <div className="Dropdown">
          <button className="DropdownBtn" onClick={toggleSubjectDropdown}>
            {selectedSubject} <span className="arrow">&#x25BC;</span>
          </button>
          {subjectDropdown && (
            <div className="DropdownContent">
              {subjects.map((subject, index) => (
                <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleSubjectSelect(subject); }}>
                  {subject}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Marks Below Dropdown */}
        <div className="Dropdown" style={{ marginLeft: 'auto' }}>
          <button className="DropdownBtn" onClick={toggleMarksBelowDropdown}>
            {selectedMarksBelow} <span className="arrow">&#x25BC;</span>
          </button>
          {marksBelowDropdown && (
            <div className="DropdownContent">
              {marksBelowOptions.map((marks, index) => (
                <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleMarksBelowSelect(marks); }}>
                  {marks}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Record details below buttons */}
      <div className="RecordDetails">
        <span className="UpdatedLast">Updated Last: Yesterday</span>
        <span className="TotalLecture">Total Lecture: 10</span>
      </div>
      <div><StudentRecordTable /></div>
     
    </div>
  );
};

export default StudentRecord;

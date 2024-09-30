import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherAttendance.css';
import AttendanceTable from './AttendanceTable';

const TeacherAttendance = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject');
  const [date, setDate] = useState('');
  const [lecture, setLecture] = useState('');

  const toggleSubjectDropdown = () => setSubjectDropdown(!subjectDropdown);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSubjectDropdown(false);
  };

  const handleLectureChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === '') {  // Allow only non-negative numbers or empty input
      setLecture(value);
    }
  };

  const subjects = ['Maths', 'Physics', 'Chemistry'];
  const handleSave = () => {
    console.log('Data saved');
  };

  return (
    <div className="attendance-container">
      <div className="top-buttons">
        <div className="dropdown">
          <button className="dropdown-btn" onClick={toggleSubjectDropdown}>
            {selectedSubject} <span className="arrow">&#x25BC;</span>
          </button>
          {subjectDropdown && (
            <div className="dropdown-content">
              {subjects.map((subject, index) => (
                <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleSubjectSelect(subject); }}>
                  {subject}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="attendance-details">
        <p className="UpdatedLast">Updated Last: Yesterday</p>

        <div className="input-row">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <span className="total-lecture">Total Lecture: 10</span>
        </div>

        <div className="input-row">
          <label htmlFor="lecture">Lecture:</label>
          <input
            type="number"
            id="lecture"
            value={lecture}
            onChange={handleLectureChange}
            placeholder="Enter lecture number"
            min="0" // Minimum value for lecture is set to 0
          />
        </div>
        <AttendanceTable />
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-buttons">
        <button className="daily-record-btn" onClick={() => navigate('/daily-attendance-record')}>Daily Attendance Record</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default TeacherAttendance;

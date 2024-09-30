import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './DailyAttendanceRecord.css'; // Import CSS for custom styles
import DailyAttendanceRecordTable from './DailyAttReTable';

const DailyAttendanceRecord = () => {
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [attendanceDropdown, setAttendanceDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject');
  const [selectedAttendance, setSelectedAttendance] = useState('Attendance Below %');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const toggleSubjectDropdown = () => setSubjectDropdown(!subjectDropdown);
  const toggleAttendanceDropdown = () => setAttendanceDropdown(!attendanceDropdown);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSubjectDropdown(false);
  };

  const handleAttendanceSelect = (attendance) => {
    setSelectedAttendance(attendance);
    setAttendanceDropdown(false);
  };

  const subjects = ['Maths', 'Physics', 'Chemistry'];
  const attendanceOptions = ['Below 50%', 'Below 60%', 'Below 70%', 'Below 75%', 'Below 80%'];

  return (
    <div className="dailyAttendanceContainer">
      <Link to="/teacher-dashboard">
        <button className="back-button">←</button>
      </Link>
      {/* Top Section: Subject and Attendance Dropdowns */}
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

        {/* Attendance Below Dropdown */}
        <div className="Dropdown" style={{ marginLeft: 'auto' }}>
          <button className="DropdownBtn" onClick={toggleAttendanceDropdown}>
            {selectedAttendance} <span className="arrow">&#x25BC;</span>
          </button>
          {attendanceDropdown && (
            <div className="DropdownContent">
              {attendanceOptions.map((attendance, index) => (
                <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleAttendanceSelect(attendance); }}>
                  {attendance}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Record Details Section */}
      <div className="recordDetails">
        <span className="UpdatedLast">Updated Last: Yesterday</span>
        <span className="TotalLecture">Total Lecture: 10</span>
      </div>

      {/* Add your attendance record table or content below */}
      <div className="attendanceContent">
        <DailyAttendanceRecordTable />
      </div>
    </div>
  );
};

export default DailyAttendanceRecord;

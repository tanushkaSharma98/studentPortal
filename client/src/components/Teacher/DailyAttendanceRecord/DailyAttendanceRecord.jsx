import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './DailyAttendanceRecord.css'; // Import CSS for custom styles
import DailyAttendanceRecordTable from './DailyAttReTable';

const DailyAttendanceRecord = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState('');

  const subjects = ['Maths', 'Physics', 'Chemistry'];
  const attendanceOptions = ['Below 50%', 'Below 60%', 'Below 70%', 'Below 75%', 'Below 80%'];

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleAttendanceChange = (e) => {
    setSelectedAttendance(e.target.value);
  };

  return (
    <div className="teacher-dailyAttendanceContainer">
      <Link to="/teacher-dashboard">
        <button className="teacher-back-button">←</button>
      </Link>
      <h1 className="Daily-att">Daily Attendance Record</h1>
      
      {/* Top Section: Subject and Attendance Dropdowns */}
      <div className="Teacher-TopButtons">
        {/* Subject Dropdown */}
        <div className="Teacher-Dropdown">
          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Below Dropdown */}
        <div className="Teacher-Dropdown" style={{ marginLeft: 'auto' }}>
          <select value={selectedAttendance} onChange={handleAttendanceChange}>
            <option value="">Attendance Below</option>
            {attendanceOptions.map((attendance, index) => (
              <option key={index} value={attendance}>
                {attendance}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Record Details Section */}
      <div className="teacher-recordDetails">
        <span className="teacher-Updated-Last">Updated Last: Yesterday</span>
        <span className="teacher-Total-Lecture">Total Lecture: 10</span>
      </div>

      {/* Attendance record table */}
      <div className="teacher-attendanceContent">
        <DailyAttendanceRecordTable />
      </div>
    </div>
  );
};

export default DailyAttendanceRecord;

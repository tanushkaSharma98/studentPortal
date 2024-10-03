import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './DailyAttendanceRecord.css'; // Import CSS for custom styles
import DailyAttendanceRecordTable from './DailyAttReTable';
import axios from 'axios';

const DailyAttendanceRecord = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState('');
  const [subjectList, setSubjectList] = useState([]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      const fetchSubjects = async () => {
        try {
          // Fetch subjects based on teacherId
          const subjectResponse = await axios.get('http://localhost:3000/api/teachers/subjects', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setSubjectList(subjectResponse.data);
        } catch (error) {
          console.error('Error fetching subjects :', error);
        }
      };

      fetchSubjects();
    }
  }, [token]);


  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const handleAttendanceChange = (e) => {
    setSelectedAttendance(e.target.value);
  };

  return (
    <div className="teacher-dailyAttendanceContainer">
      <Link to="/teacher-dashboard">
        <button className="Teacher-back-button">⬅</button>
      </Link>
      <h1 className="Daily-att">Daily Attendance Record</h1>
      
      {/* Top Section: Subject and Attendance Dropdowns */}
      <div className="Teacher-Top-Buttons">
        {/* Subject Dropdown */}
        <div className="Teacher-Drop-down">
        <select
            className='Portal-select'
            value={selectedSubject}
            onChange={(e) => handleSubjectSelect(e.target.value)}
          >
            <option value="">Subject</option>
            {subjectList.length > 0 ? (
              subjectList.map((subject, index) => (
                <option key={index} value={subject.subject_name}>
                  {subject.subject_name}
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>

        {/* Attendance Below Dropdown
        <div className="Teacher-Dropdown" style={{ marginLeft: 'auto' }}>
          <select className='portalselect' value={selectedAttendance} onChange={handleAttendanceChange}>
            <option value="">Attendance Below</option>
            {attendanceOptions.map((attendance, index) => (
              <option key={index} value={attendance}>
                {attendance}
              </option>
            ))}
          </select>
        </div> */}
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

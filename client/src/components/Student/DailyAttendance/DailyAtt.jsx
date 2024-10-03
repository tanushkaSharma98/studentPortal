import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './DailyAtt.css';

const DailyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch attendance data from the API
  const fetchAttendanceData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await fetch('http://localhost:3000/api/students/attendance-daily-record', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // Group attendance data by subject
  const groupedData = attendanceData.reduce((acc, record) => {
    const { subject_code, subject_name, date, status } = record;

    if (!acc[subject_code]) {
      acc[subject_code] = {
        subject_name,
        totalLectures: 0,
        attendance: {},
      };
    }

    acc[subject_code].totalLectures++;
    acc[subject_code].attendance[date] = status === 'Present' ? 'P' : 'A';

    return acc;
  }, {});

  const attendanceEntries = Object.values(groupedData);

  return (
    <div className="Daily">
      <h1>Daily Attendance Record</h1>

      {/* Attendance details section */}
      <div className="Attendance-Details">
        <span>Name : Rohan Tomar </span>
        <span>Enrollment No. : 21CS038</span>
      </div>

      {attendanceEntries.map((entry, index) => (
        <div key={index} className='student-attendance-container'>
          <div className="Sub1">
            <span>Subject : {entry.subject_name}</span>
          </div>

          {/* Attendance table for each subject */}
          <table className="Attendance-Table">
            <thead>
              <tr>
                <th>Total Lectures</th>
                <th>Percentage (%)</th>
                {/* Render dynamic date headers */}
                {Object.keys(entry.attendance).map((date) => (
                  <th key={date}>{date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{entry.totalLectures}</td>
                <td>{((Object.values(entry.attendance).filter(a => a === 'P').length / entry.totalLectures) * 100).toFixed(2)}</td>
                {/* Render attendance statuses for each date */}
                {Object.keys(entry.attendance).map((date) => (
                  <td key={date}>{entry.attendance[date]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <div className="Backbtn">
        <Link to="/Student-dashboard">
          <button className="Back-button">⬅</button>
        </Link>
      </div>
    </div>
  );
};

export default DailyAttendance;

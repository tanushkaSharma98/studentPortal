import { Link } from 'react-router-dom';
import React from 'react';
import './DailyAtt.css';

const DailyAttendance = () => {
  // Example data for the first attendance table
  const attendanceData1 = [
    {
      totalLectures: 10,
      percentage: 80,
      attendance: ['P', 'P', 'P', 'A', 'P'], // Correct field name is 'attendance'
    },
  ];

  // Example data for the second attendance table (for another subject)
  const attendanceData2 = [
    {
      totalLectures: 8,
      percentage: 75,
      attendance: ['P', 'A', 'P', 'P', 'P'],
    },
  ];
  
  return (
    <div className="Daily">
      <h1>Daily Attendance Record</h1>

      {/* Attendance details section */}
      <div className="Attendance-Details">
        <span>Name : Rohan Tomar </span>
        <span>Enrollment No. : 21CS038</span>
      </div>
      <div className="Sub1">
      <span>Subject : Science</span>  
      </div>
                                      
      {/* First Attendance table */}
      <table className="Attendance-Table">
        
        <thead>
      
          <tr>
            <th>Total Lectures</th>
            <th>Percentage (%)</th>
            <th>01/08/2024</th>
            <th>01/09/2024</th>
            <th>01/10/2024</th>
            <th>01/11/2024</th>
            <th>01/12/2024</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData1.map((data, index) => (
            <tr key={index}>
              <td>{data.totalLectures}</td>
              <td>{data.percentage}</td>
              {data.attendance.map((status, i) => (
                <td key={i}>{status}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="Sub1">
      <span >Subject : Maths</span> 
      </div>
     
      {/* Second Attendance table with space */}
      <table className="Attendance-Table Second-Table">
        <thead>
        
          <tr>
            <th>Total Lectures</th>
            <th>Percentage (%)</th>
            <th>01/08/2024</th>
            <th>01/09/2024</th>
            <th>01/10/2024</th>
            <th>01/11/2024</th>
            <th>01/12/2024</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData2.map((data, index) => (
            <tr key={index}>
              <td>{data.totalLectures}</td>
              <td>{data.percentage}</td>
              {data.attendance.map((status, i) => (
                <td key={i}>{status}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="backbtn">
        <Link to="/Student-dashboard">
          <button className="back-button">←</button>
        </Link>
      </div>
    </div>
  );
};

export default DailyAttendance;

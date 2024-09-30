import React, { useState } from 'react';
import './DailyAttReTable.css'; // Link to the CSS file

const initialRecords = [
  { sNo: 1, name: 'Aditya', enrollmentNo: '001', percentage: '80%', attendance: ['P', 'A', 'P', 'P', 'A', 'P'] },
  { sNo: 2, name: 'Deeksha', enrollmentNo: '002', percentage: '90%', attendance: ['P', 'P', 'P', 'P', 'P', 'P'] },
  { sNo: 3, name: 'Tanushka', enrollmentNo: '003', percentage: '100%', attendance: ['P', 'P', 'P', 'P', 'P', 'P'] },
  { sNo: 4, name: 'Tanmay', enrollmentNo: '004', percentage: '70%', attendance: ['A', 'P', 'P', 'A', 'P', 'A'] },
  { sNo: 5, name: 'Rohan', enrollmentNo: '005', percentage: '60%', attendance: ['P', 'A', 'A', 'P', 'A', 'P'] },
  { sNo: 6, name: 'Surbhi', enrollmentNo: '006', percentage: '100%', attendance: ['P', 'P', 'P', 'P', 'P', 'P'] },
];

const DailyAttendanceRecordTable = () => {
  const [students, setStudents] = useState(initialRecords);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dateColumns, setDateColumns] = useState([]);

  const handleDateChange = () => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const tempDateColumns = [];

    while (start <= end) {
      tempDateColumns.push(start.toLocaleDateString());
      start.setDate(start.getDate() + 1); // Increment the date by one
    }

    setDateColumns(tempDateColumns);
  };

  return (
    <div className="teacher-daily-attendance-record-table">
      <div className="teacher-topButtons">
        {/* Combined Date Selection */}
        <div className="teacher-date-selection">
          <label>
            From:
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </label>
          <label>
            To:
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </label>
          <div className="teacher-Show-dates"> <button className="teacher-ShowDates" onClick={handleDateChange}>Show Dates</button></div>
        </div >
        
         
        
       
      </div>

      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Enrollment No.</th>
            <th>Percentage (%)</th>
            {dateColumns.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.sNo}</td>
              <td>{student.name}</td>
              <td>{student.enrollmentNo}</td>
              <td>{student.percentage}</td>
              {student.attendance.slice(0, dateColumns.length).map((att, idx) => (
                <td key={idx}>{att}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyAttendanceRecordTable;

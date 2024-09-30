import React, { useState } from 'react';
import './StudentRecordTable.css'; // Link to the CSS file

const initialRecords = [
  { sNo: 1, name: 'Aditya', enrollmentNo: '001', classesAttended: 8, attendancePercent: '80%', midterm1: 20, midterm2: 21 },
  { sNo: 2, name: 'Deeksha', enrollmentNo: '002', classesAttended: 9, attendancePercent: '90%', midterm1: 28, midterm2: 21 },
  { sNo: 3, name: 'Tanushka', enrollmentNo: '003', classesAttended: 10, attendancePercent: '100%', midterm1: 22, midterm2: 25 },
  { sNo: 4, name: 'Tanmay', enrollmentNo: '004', classesAttended: 7, attendancePercent: '70%', midterm1: 25, midterm2: 20 },
  { sNo: 5, name: 'Rohan', enrollmentNo: '005', classesAttended: 6, attendancePercent: '60%', midterm1: 20, midterm2: 15 },
  { sNo: 6, name: 'Surbhi', enrollmentNo: '006', classesAttended: 10, attendancePercent: '100%', midterm1: 25, midterm2: 27 },
];

const StudentRecordTable = () => {
  const [students, setStudents] = useState(initialRecords);

  return (
    <div className="student-record-table">
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Enrollment No.</th>
            <th>Classes Attended</th>
            <th>Attendance %</th>
            <th>Midterm-1 Marks</th>
            <th>Midterm-2 Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.sNo}</td>
              <td>{student.name}</td>
              <td>{student.enrollmentNo}</td>
              <td>{student.classesAttended}</td>
              <td>{student.attendancePercent}</td>
              <td>{student.midterm1}</td>
              <td>{student.midterm2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRecordTable;

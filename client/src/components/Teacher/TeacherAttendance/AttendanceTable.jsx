import React, { useState, useRef } from 'react';
import './AttendanceTable.css'; // Link to the CSS file

const initialAttendance = [
  { sNo: 1, name: 'Aditya', enrollmentNo: '001', status: 'Mark', percentage: '80%' },
  { sNo: 2, name: 'Deeksha', enrollmentNo: '002', status: 'Mark', percentage: '88%' },
  { sNo: 3, name: 'Tanushka', enrollmentNo: '003', status: 'Mark', percentage: '92%' },
  { sNo: 4, name: 'Tanmay', enrollmentNo: '004', status: 'Mark', percentage: '76%' },
  { sNo: 5, name: 'Rohan', enrollmentNo: '005', status: 'Mark', percentage: '72%' },
  { sNo: 6, name: 'Surbhi', enrollmentNo: '006', status: 'Mark', percentage: '100%' },
];

const AttendanceTable = () => {
  const [students, setStudents] = useState(initialAttendance);
  
  // To store refs for each "Mark" button
  const buttonRefs = useRef([]);

  // Function to handle attendance toggle (used both for click and Enter key)
  const toggleAttendance = (index) => {
    const updatedStudents = [...students];
    const currentStatus = updatedStudents[index].status;

    // Toggle between 'Mark', 'Present', and 'Absent'
    if (currentStatus === 'Mark') {
      updatedStudents[index].status = 'Present';
    } else if (currentStatus === 'Present') {
      updatedStudents[index].status = 'Absent';
    } else {
      updatedStudents[index].status = 'Present';
    }

    setStudents(updatedStudents);
  };

  // Function to handle arrow key and Enter key navigation
  const handleKeyDown = (e, index) => {
    e.preventDefault();
    
    // Handle the 'ArrowUp' and 'ArrowDown' navigation
    if (e.key === 'ArrowUp') {
      if (index > 0) {
        buttonRefs.current[index - 1].focus(); // Focus on the previous button
      }
    } else if (e.key === 'ArrowDown') {
      if (index < students.length - 1) {
        buttonRefs.current[index + 1].focus(); // Focus on the next button
      }
    } 
    
    // Handle the 'Enter' key for toggling attendance
    else if (e.key === 'Enter') {
      toggleAttendance(index); // Change the status of the current button
    }
  };

  return (
    <div className="attendance-table">
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Enrollment No.</th> {/* New column for Enrollment No. */}
            <th>Updated Attendance</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.sNo}</td>
              <td>{student.name}</td>
              <td>{student.enrollmentNo}</td> {/* New cell for Enrollment No. */}
              <td>
                <button
                  className={`attendance-button ${student.status.toLowerCase()}`} // Add dynamic class for status
                  onClick={() => toggleAttendance(index)} // Toggle on click
                  tabIndex="0" // Make the button focusable
                  ref={(el) => (buttonRefs.current[index] = el)} // Store the button ref
                  onKeyDown={(e) => handleKeyDown(e, index)} // Handle arrow key and enter key
                >
                  {student.status}
                </button>
              </td>
              <td>{student.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;

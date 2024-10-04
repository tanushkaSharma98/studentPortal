import React, { useState } from 'react';
import './Table.css'; // Link to the CSS file

const StudentTable = ({ students = [] }) => {
  // const [studentData, setStudentData] = useState(students); // Use the students prop

  const handleInputChange = (index, value) => {
    // Ensure the input is an integer or empty
    if (value === '' || /^\d+$/.test(value)) {
      const updatedStudents = [...studentData];
      updatedStudents[index].Marks_Obtained = value;
      setStudentData(updatedStudents);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      // Prevent default form submission (if in a form context)
      e.preventDefault();

      // Focus on the next input, if exists
      const nextInput = document.querySelector(`#marks-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSave = () => {
    console.log('Data saved');
  };

  return (
    <div className="teacher-student-table">
      <table>
        <thead>
          <tr>
            <th>S. no</th>
            <th>Name</th>
            <th>Enrollment No.</th>
            <th>Marks Obtained</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.student_name || 'N/A'}</td>
                <td>{student.enrollment_no || 'N/A'}</td>
                <td>
                <input
                  id={`marks-input-${index}`} // Unique ID for each input
                  type="text"
                  value={student.Marks_Obtained}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)} // Handle key down event
                  placeholder="Enter marks"
                  style={{ width: '60px', textAlign: 'center' }} // Optional styling for the input box
                />
              </td>
              <td>{student.percentage}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No students available</td>
          </tr>
        )}
      </tbody>
      </table>
      {/* Save Button */}
      <div className="teacher-marks-bottom-buttons">
        <button className="teacher-marks-save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default StudentTable;

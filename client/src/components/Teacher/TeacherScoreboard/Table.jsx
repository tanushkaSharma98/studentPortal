import React, { useState } from 'react';
import './Table.css'; // Link to the CSS file

const initialStudents = [
  { sNo: 1, name: 'Aditya', enrollment: '001', Marks_Obtained: '21', percentage: '81%' },
  { sNo: 2, name: 'Deeksha', enrollment: '002', Marks_Obtained: '25', percentage: '85%' },
  { sNo: 3, name: 'Tanushka', enrollment: '003', Marks_Obtained: '26', percentage: '86%' },
  { sNo: 4, name: 'Tanmay', enrollment: '004', Marks_Obtained: '20', percentage: '80%' },
  { sNo: 5, name: 'Rohan', enrollment: '005', Marks_Obtained: '23', percentage: '69%' },
  { sNo: 6, name: 'Surbhi', enrollment: '005', Marks_Obtained: '27', percentage: '93%' },
  // Add more student data here
];

const StudentTable = () => {
  const [students, setStudents] = useState(initialStudents);

  const handleInputChange = (index, value) => {
    // Ensure the input is an integer or empty
    if (value === '' || /^\d+$/.test(value)) {
      const updatedStudents = [...students];
      updatedStudents[index].Marks_Obtained = value;
      setStudents(updatedStudents);
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
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.sNo}</td>
              <td>{student.name}</td>
              <td>{student.enrollment}</td>
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
          ))}
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

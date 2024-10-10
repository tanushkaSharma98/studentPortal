import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AttendanceTable.css';

const AttendanceTable = ({ students = [], onAttendanceChange, onSave, isUpdating }) => {
  const buttonRefs = useRef([]);
  const navigate = useNavigate();

  const toggleAttendance = (index) => {
    const updatedStudents = [...students];
    const currentStatus = updatedStudents[index].status;

    const attendanceStatus = currentStatus === 'Present' ? false : true;
    onAttendanceChange(updatedStudents[index].enrollment_no, attendanceStatus);

    updatedStudents[index].status = attendanceStatus ? 'Present' : 'Absent';
  };

  const handleKeyDown = (e, index) => {
    e.preventDefault();

    if (e.key === 'ArrowUp' && index > 0) {
      buttonRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowDown' && index < students.length - 1) {
      buttonRefs.current[index + 1].focus();
    } else if (e.key === 'Enter') {
      toggleAttendance(index);
    }
  };

  return (
    <div className="teacher-attendance-table">
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Enrollment No.</th>
            <th>Updated Attendance</th>
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
                  <button
                    className={`teacher-attendance-button ${student.status ? student.status.toLowerCase() : 'mark'}`}
                    onClick={() => toggleAttendance(index)}
                    tabIndex="0"
                    ref={(el) => (buttonRefs.current[index] = el)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  >
                    {student.status || 'Mark'}
                  </button>
                </td>
                <td>{student.percentage || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No students available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="teacher-bottom-buttons">
        <button className="teacher-daily-record-btn" onClick={() => navigate('/daily-attendance-record')}>
          Daily Attendance Record
        </button>

        <button className="teacher-save-btn" onClick={onSave}>
          {isUpdating ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;

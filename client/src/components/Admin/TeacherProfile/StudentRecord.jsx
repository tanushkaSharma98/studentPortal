import React from 'react';
import { Link } from 'react-router-dom';
import './StudentRecord.css';

const StudentRecord = () => {
  return (
    <div className="student-container">
      <Link to="/admin/teacher-profile">
        <button className="back-button">←</button>
      </Link>
      <h2 className="student-title">STUDENT RECORD</h2>
      
      <div className="filters">
        <div className="filter-left">
          <select className="subject-dropdown">
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="history">History</option>
            {/* Add more subjects as needed */}
          </select>
        </div>
        <div className="filter-right">
          <select className="marks-dropdown">
            <option value="">Marks Below</option>
            <option value="30">Below 30</option>
            <option value="50">Below 50</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      <div className="student-table-container">
        <div className="student-info">
          <div className="updated-last">
            <label>Updated Last:</label>
            <input type="date" />
          </div>
            <div className="lectures-total">
                <label>Total Lectures:</label>
                <span className="total-lectures-value">10</span>
            </div>
        </div>

        <table className="student-table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Name</th>
              <th>Enrollment No.</th>
              <th>Classes Attendance</th>
              <th>%</th>
              <th>Midterm 1 Marks</th>
              <th>Midterm 2 Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rakshita</td>
              <td>21CS000</td>
              <td>5</td>
              <td>50%</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Tanu</td>
              <td>21CS000</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
        <Link to="/admin/attendance-record">
            <button className="expand-attendance">Expand Attendance</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentRecord;

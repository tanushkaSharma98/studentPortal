import React from 'react';
import { Link } from 'react-router-dom';
import './AttendanceRecord.css';

const AttendanceRecord = () => {
  return (
    <div className="attendance-container">
        <Link to="/admin/teacher-profile">
            <button className="back-button">←</button>
        </Link>
      <h2 className="attendance-title">ATTENDANCE RECORD</h2>
      
      <div className="filters">
        <div className="filter-left">
            <select className="subject-dropdown">
                <option value="">Subject</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
                {/* Add more subjects as needed */}
            </select>
        </div>
        <div className="filter-right">
            <select className="attendance-dropdown">
                <option value="">Attendance Below %</option>
                <option value="30">Below 30%</option>
                <option value="50">Below 50%</option>
                {/* Add more options as needed */}
            </select>
        </div>
      </div>

      <div className="attendance-table-container">
        <div className="attendance-info">
          <div className="updated-last">
            <label>Updated Last:</label>
            <input type="date" />
          </div>
          <div className="lectures-total">
              <label>Total Lectures:</label>
              <span className="total-lectures-value">10</span>
            </div>
          <div className="date-filters">
            <label>From:</label>
            <input type="date" />
          </div>
          <div className="date-filters">  
            <label>To:</label>
            <input type="date" />
          </div>
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Name</th>
              <th>Enrollment No.</th>
              <th>%</th>
              <th>Date 1</th>
              <th>Date 2</th>
              <th>Date 3</th>
              <th>Date 4</th>
              <th>Date 5</th>
              <th>Date 6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rakshita</td>
              <td>21CS000</td>
              <td>70%</td>
              <td>P</td>
              <td>P</td>
              <td>P</td>
              <td>P</td>
              <td>A</td>
              <td>A</td>
            </tr>
            <tr>
              <td>2</td>
              <td style={{ color: 'red' }}>Tanu</td>
              <td>21CS000</td>
              <td style={{ color: 'red' }}>40%</td>
              <td>P</td>
              <td>P</td>
              <td>A</td>
              <td>P</td>
              <td>A</td>
              <td>A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceRecord;

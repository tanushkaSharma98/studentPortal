import React, { useState } from 'react';
import './StudentTable.css';
import { Link } from 'react-router-dom';

const StudentTable = ({ students }) => {
  const [deletedRows, setDeletedRows] = useState([]);

  const handleDelete = (index) => {
    setDeletedRows((prevDeletedRows) => [...prevDeletedRows, index]);
  };

  const handleAdd = (index) => {
    setDeletedRows((prevDeletedRows) => prevDeletedRows.filter((i) => i !== index));
  };

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Name</th>
          <th>Enrollment No.</th>
          <th>Email</th>
          <th>Password</th>
          <th>View</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => {
          const isDeleted = deletedRows.includes(index);

          return (
            <tr key={index} className={isDeleted ? 'row-deleted' : ''}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.enrollmentNumber}</td>
              <td>{student.email}</td>
              <td>{student.password}</td>
              <td>
              <Link to="/admin/student-profile">
                <button 
                  className="view-btn" 
                  disabled={isDeleted} 
                  style={{ backgroundColor: isDeleted ? 'grey' : '#007bff', cursor: isDeleted ? 'not-allowed' : 'pointer' }}
                >
                  View
                </button>
                </Link>
              </td>
              <td>
                {isDeleted ? (
                  <button 
                    className="add-btn" 
                    onClick={() => handleAdd(index)} 
                  >
                    ✓
                  </button>
                ) : (
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(index)} 
                  >
                    ✗
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StudentTable;

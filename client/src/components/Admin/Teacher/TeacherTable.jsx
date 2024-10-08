import React from 'react';
import { Link } from 'react-router-dom';

const TeacherTable = ({ teachers, setTeachers }) => {
  const toggleTeacherStatus = async (user_id, currentStatus, index) => {
    const updatedTeachers = [...teachers];
    const newIsActiveStatus = !currentStatus; // Toggle active status

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/admin/teachers/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,  // Ensure user_id is passed here
          is_active: newIsActiveStatus,  // Send the toggled is_active status
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update teacher's status");
      }

      // Update the local teachers state with the new is_active status
      updatedTeachers[index].is_active = newIsActiveStatus;
      setTeachers(updatedTeachers);
    } catch (error) {
      console.error("Error updating teacher's status:", error);
    }
  };

  return (
    <div className="teacher-table">
      <table>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th className="hide">UserId</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => {
            const isDeleted = !teacher.is_active; // Invert the condition, row is 'deleted' if is_active is false

            return (
              <tr key={index} className={isDeleted ? 'row-deleted' : ''}>
                <td>{index + 1}</td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.password}</td>
                <td className="hide">{teacher.userId}</td>
                <td>
                  <Link to={`/admin/teacher-profile/${teacher.userId}`}>
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
                  <button 
                    className={`delete-btn ${isDeleted ? 'add-btn' : ''}`} 
                    onClick={() => toggleTeacherStatus(teacher.user_id, teacher.is_active, index)} // Pass is_active state
                  >
                    {isDeleted ? '✓' : '✗'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;

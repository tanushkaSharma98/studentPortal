import React from 'react';
import { Link } from 'react-router-dom';

const TeacherTable = ({ teachers = [] , setTeachers}) => {
  const handleDelete = (index) => {
    const updatedTeachers = [...teachers];
    updatedTeachers[index].isDeleted = !updatedTeachers[index].isDeleted;
    setTeachers(updatedTeachers);
  };

  return (
    <div className="teacher-table">
      <table>
        <thead>
          <tr>
            <th>S. no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index} className={teacher.isDeleted ? 'deleted' : ''}>
              <td>{index + 1}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.password}</td>
              <td>
              <Link to="/admin/teacher-profile">
                <button className="view-btn" disabled={teacher.isDeleted}>
                  View
                </button>
              </Link>
              </td>
              <td>
                <button
                  className={`delete-btn ${teacher.isDeleted ? 'add-btn' : ''}`}
                  onClick={() => handleDelete(index)}
                >
                  {teacher.isDeleted ? '✓' : '✗'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;

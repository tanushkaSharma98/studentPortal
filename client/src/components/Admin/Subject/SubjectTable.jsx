import React from 'react';

const SubjectTable = ({ subjects, setSubjects }) => {
  const handleDelete = (index) => {
    // Toggle the 'isDeleted' status for the subject
    const updatedSubjects = [...subjects];
    updatedSubjects[index].isDeleted = !updatedSubjects[index].isDeleted;
    setSubjects(updatedSubjects);  // Update the state in the parent component
  };

  return (
    <div className="subject-table">
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Subject Name</th>
            <th>Subject Code</th>
            <th>Abb. Subject Name</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className={subject.isDeleted ? 'deleted' : ''}>
              <td>{index + 1}</td>
              <td>{subject.subject_name}</td>
              <td>{subject.subject_code}</td>
              <td>{subject.sub_initials}</td>
              <td>{subject.branch}</td>
              <td>{subject.semester}</td>
              <td>{subject.teacher}</td>
              <td>
                <button
                  className={`delete-btn ${subject.isDeleted ? 'add-btn' : ''}`}
                  onClick={() => handleDelete(index)}
                >
                  {subject.isDeleted ? '✓' : '✗'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectTable;

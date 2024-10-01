import React from 'react';

const BranchTable = ({ branches, setBranches }) => {
  const handleDelete = (index) => {
    const updatedBranches = [...branches];
    updatedBranches[index].isDeleted = !updatedBranches[index].isDeleted;
    setBranches(updatedBranches);
  };

  return (
    <div className="branch-table">
      {branches.length === 0 ? (
        <div className="no-branches">No branches found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>S. No</th>
              <th>Branch Name</th>
              <th>No. of Students</th>
              <th>No. of Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={branch.id || index} className={branch.isDeleted ? 'deleted' : ''}>
                <td>{index + 1}</td>
                <td>{branch.branch_name}</td>
                <td>{branch.student_count}</td>
                <td>{branch.subject_count}</td>
                <td>
                  <button
                    className={`delete-btn ${branch.isDeleted ? 'restore-btn' : 'delete-btn'}`}
                    onClick={() => handleDelete(index)}
                    aria-label={branch.isDeleted ? 'Restore Branch' : 'Delete Branch'}
                  >
                    {branch.isDeleted ? 'Restore' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BranchTable;

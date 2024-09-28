import React, { useState, useEffect } from 'react';

const BranchTable = () => {
  const [branches, setBranches] = useState([]);

  // Fetch branch data from API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem('token'); // Use token if needed
        const response = await fetch('http://localhost:3000/api/admin/branches', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Include the token if required
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Map API data to match your component's structure
        const formattedBranches = data.map((branch, index) => ({
          sNo: index + 1,
          branchname: branch.branch_name,
          noofstudent: branch.student_count,
          noofsub: branch.subject_count,
          isDeleted: false,
        }));

        setBranches(formattedBranches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleDelete = (index) => {
    const updatedBranches = [...branches];
    updatedBranches[index].isDeleted = !updatedBranches[index].isDeleted;  // Toggle delete status
    setBranches(updatedBranches);
  };

  return (
    <div className="branch-table">
      <table>
        <thead>
          <tr>
            <th>S. no</th>
            <th>Branch Name</th>
            <th>No. of Students</th>
            <th>No. of Subjects</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr key={index} className={branch.isDeleted ? 'deleted' : ''}>
              <td>{branch.sNo}</td>
              <td>{branch.branchname}</td>
              <td>{branch.noofstudent}</td>
              <td>{branch.noofsub}</td>
              <td>
                <button 
                  className={`delete-btn ${branch.isDeleted ? 'add-btn' : ''}`}
                  onClick={() => handleDelete(index)}
                >
                  {branch.isDeleted ? '✓' : '✗'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchTable;

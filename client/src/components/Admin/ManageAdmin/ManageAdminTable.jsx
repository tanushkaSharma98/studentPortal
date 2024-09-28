import React, { useState, useEffect } from 'react';

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);

  // Fetch admin data from the API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
        const response = await fetch('http://localhost:3000/api/admin/admins', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Pass token if required
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admins');
        }

        const data = await response.json();
        const formattedAdmins = data.map((admin, index) => ({
          sNo: index + 1,
          adminname: admin.admin_name,
          email: admin.email,
          password: admin.password,
          is_active: admin.is_active
        }));

        setAdmins(formattedAdmins);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  // Handle toggle delete (active/inactive)
  const handleDelete = (index) => {
    const updatedAdmins = [...admins];
    updatedAdmins[index].is_active = !updatedAdmins[index].is_active;  // Toggle active status
    setAdmins(updatedAdmins);
  };

  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Admin Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Is Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index} className={!admin.is_active ? 'deleted' : ''}>
              <td>{admin.sNo}</td>
              <td>{admin.adminname}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td>{admin.is_active ? 'True' : 'False'}</td>
              <td>
                <button 
                  className={`delete-btn ${!admin.is_active ? 'add-btn' : ''}`}
                  onClick={() => handleDelete(index)}
                >
                  {admin.is_active ? '✗' : '✓'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;

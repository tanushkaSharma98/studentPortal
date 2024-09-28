import React, { useEffect, useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import './AddNewStudent.css';

const AddNewStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNo: '',
    email: '',
    password: '',
    branch: '',
    semester: '',
    contactNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    // Reset form or redirect
    setFormData({
      name: '',
      enrollmentNo: '',
      email: '',
      password: '',
      branch: '',
      semester: '',
      contactNo: '',
    });
  };

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
        
        // Make the API call with the token in the Authorization header
        const res = await fetch('http://localhost:3000/api/admin/branches', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Include the token here
            'Content-Type': 'application/json'
          }
        });

        // Check if the response is not OK (e.g., unauthorized or forbidden)
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the response JSON
        const data = await res.json();

        // Ensure the data is an array and process it
        if (Array.isArray(data)) {
          const activeBranches = data
            .filter(branch => branch.is_active)
            .map(branch => branch.branch_name);
          setBranches(activeBranches);  // Set the branches in state
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();  // Call the async function
  }, []);

  return (
    <div className="add-student-container">
         <Header />
         <Sidebar />
      <main className="stuform-container">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input className="input" type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Enrollment No:</label>
            <input className="input" type="text" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Branch:</label>
            <select className="select" name="branch" value={formData.branch} onChange={handleChange} required>
              <option value="">Branch</option>
                {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Semester:</label>
            <input className="input" type="number" name="semester" value={formData.semester} onChange={handleChange} min="1" max="8" required />
          </div>
          <div className="form-group">
            <label>Contact No:</label>
            <input className="input" type="tel" name="contactNo" maxLength="10"  value={formData.contactNo} onChange={handleChange} required />
          </div>
          <div className="form-buttons">
            <button className="btn" type="button" onClick={handleCancel}>Cancel</button>
            <button className="btn" type="submit">Submit</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewStudent;

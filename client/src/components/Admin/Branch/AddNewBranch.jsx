import React, { useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import './AddNewBranch.css';

const AddNewBranch = () => {
  const [formData, setFormData] = useState({
    Branchname: '',
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
        Branchname: '',
    });
  };

  return (
    <div className="add-branch-container">
         <Header />
         <Sidebar />
      <main className="form-container">
        <h2>Add New Branch</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Branch Name:</label>
            <input className="input" type="text" name="Branchname" value={formData.Branchname} onChange={handleChange} required />
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

export default AddNewBranch;

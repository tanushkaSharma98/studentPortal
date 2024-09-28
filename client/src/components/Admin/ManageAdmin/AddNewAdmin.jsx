import React, { useState } from 'react';
import './AddNewAdmin.css';

const AddNewAdmin = () => {
  const [formData, setFormData] = useState({
    Adminname: '',
    Email: '',
    Password: '',
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
      Adminname: '',
      Email: '',
      Password: '',
    });
  };

  return (
    <div className="add-admin-container">
      <main className="form-container">
        <h2>Add New Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Name:</label>
            <input
              className="input"
              type="text"
              name="Adminname"
              value={formData.Adminname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              className="input"
              type="email"
              name="Email"  
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              className="input"
              type="password"
              name="Password"  
              value={formData.Password}
              onChange={handleChange}
              required
            />
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

export default AddNewAdmin;

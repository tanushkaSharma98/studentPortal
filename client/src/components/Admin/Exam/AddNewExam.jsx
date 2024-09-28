import React, { useState } from 'react';
import './AddNewExam.css';

const AddNewExam = () => {
  const [formData, setFormData] = useState({
    Examname: '',
    MaxMarks: '',
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
      Examname: '',
      MaxMarks: '',
    });
  };

  return (
    <div className="add-exam-container">
      <main className="form-container">
        <h2>Add New Exam</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Exam Name:</label>
            <input
              className="input"
              type="text"
              name="Examname"
              value={formData.Examname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Max Marks:</label>
            <input
              className="input"
              type="number"
              name="MaxMarks"  
              value={formData.MaxMarks}
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

export default AddNewExam;

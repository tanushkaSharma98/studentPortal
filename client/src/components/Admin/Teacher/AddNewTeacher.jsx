import React, { useState, useEffect } from 'react';
import Select from 'react-select';  // import react-select
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import './AddNewTeacher.css';

const AddNewTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    designation: '',
    contactNo: '',
    subjects: [],
  });

  const [subjectOptions, setSubjectOptions] = useState([]);

  // Function to fetch subjects from the API
  const fetchSubjects = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      // Make the API call with the token in the Authorization header
      const res = await fetch('http://localhost:3000/api/admin/subjects', {
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

      // Transform the data into the format: subject_name (subject_code)
      const formattedSubjects = data.map(subject => ({
        value: subject.subject_code,
        label: `${subject.subject_name} (${subject.subject_code})`
      }));

      // Set the options for the select dropdown
      setSubjectOptions(formattedSubjects);
    } catch (error) {
      console.error('Error fetching subjects:', error.message);
    }
  };

  // Fetch subjects when the component mounts
  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleChange = (selectedOptions, { name }) => {
    if (name === 'subjects') {
      const subjects = selectedOptions.map(option => option.value);
      setFormData({ ...formData, subjects });
    } else {
      setFormData({ ...formData, [name]: selectedOptions.target.value });
    }
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
      email: '',
      password: '',
      designation: '',
      contactNo: '',
      subjects: [], 
    });
  };

  return (
    <div className="add-teacher-container">
      <Header />
      <Sidebar />
      <main className="teaform-container">
        <h2>Add New Teacher</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input className="input" type="text" name="name" value={formData.name} onChange={handleChange} required />
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
            <label>Designation:</label>
            <select className="select" name="designation" value={formData.designation} onChange={handleChange} required>
              <option value="">Select Designation</option>
              <option value="HOD">HOD</option>
              <option value="Professor">Professor</option>
              <option value="Assistant Prof.">Assistant Prof.</option>
              {/* Add more designations as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Contact No:</label>
            <input className="input" type="tel" name="contactNo" maxLength="10" value={formData.contactNo} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Subjects:</label>
            <Select
              isMulti
              name="subjects"
              options={subjectOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) => handleChange(selectedOptions, { name: 'subjects' })}
              value={subjectOptions.filter(option => formData.subjects.includes(option.value))}
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

export default AddNewTeacher;

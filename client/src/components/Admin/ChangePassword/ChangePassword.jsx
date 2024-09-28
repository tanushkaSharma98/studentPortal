import React, { useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import './ChangePassword.css';  

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        Email: '',
        OldPassword: '',
        NewPassword: '',
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
            Email: '',
            OldPassword: '',
            NewPassword: '',
        });
      };
  return (
    <div className="changepassword-list">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="container">
            <main className="form-container">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
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
                        <label>Old Password:</label>
                        <input
                            className="input"
                            type="password"
                            name="OldPassword"  
                            value={formData.OldPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                        className="input"
                        type="password"
                        name="NewPassword"  
                        value={formData.NewPassword}
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
        </div>
    </div>
  );
};

export default ChangePassword;

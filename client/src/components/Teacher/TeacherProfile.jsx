import React from 'react';
import './TeacherProfile.css';

function TeacherProfile({ data }) {
  return (
    <div className="teacher-teacher-profile">
      <div className="teacher-profile-header">
    <span className="teacher-logo-circle">
      {data.teacher_name.charAt(0).toUpperCase()}
    </span>
    <div className="teacher-welcome-message">
      <h1>WELCOME</h1>
      <h1>{data.teacher_name}</h1>
    </div>
  </div>
      <p><strong>Subject:</strong> {data.subjects.join(', ')}</p>
      <p><strong>Designation:</strong> {data.designation}</p>
      <p><strong>Email Id:</strong> {data.email}</p>
      <p><strong>Contact No.:</strong> {data.contact_no}</p>
    </div>
  );
}

export default TeacherProfile;

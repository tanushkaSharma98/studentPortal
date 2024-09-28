import React, { useState, useEffect } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import SearchBar from './SearchBar'; 
import SubjectTable from './SubjectTable'; 
import './SubjectList.css';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async (filters) => {
    try {
      const token = localStorage.getItem('token');
  
      const params = new URLSearchParams();
  
      if (filters.branch_name) {
        params.append('branch_name', filters.branch_name);
      }
      if (filters.semester) {
        params.append('semester', filters.semester);
      }
      if (filters.subject_name) {
        params.append('subject_name', filters.subject_name);
      }

      const apiUrl = `http://localhost:3000/api/admin/subjects?${params.toString()}`;
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch subjects');
      }

      const data = await res.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects({});  // Fetch all subjects initially
  }, []);

  const handleFilter = (filters) => {
    fetchSubjects(filters);
  };

  return (
    <div className="subject-list">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <SearchBar onFilter={handleFilter} />
          {/* Pass setSubjects to SubjectTable */}
          <SubjectTable subjects={subjects} setSubjects={setSubjects} />
        </div>
      </div>
    </div>
  );
};

export default SubjectList;

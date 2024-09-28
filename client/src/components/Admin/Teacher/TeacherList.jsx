import React, { useEffect, useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import SearchBar from './SearchBar'; 
import TeacherTable from './TeacherTable'; 
import './TeacherList.css';  // Import specific styles for TeacherList

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  // Fetch all teachers initially
  const fetchInitialTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/admin/teachers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }

      const data = await response.json();
      const formattedData = data.map(teacher => ({
        name: teacher.teacher_name,
        email: teacher.email,
        password: teacher.decrypted_password,
      }));

      setTeachers(formattedData);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchInitialTeachers(); // Fetch teachers on mount
  }, []);

  const handleSearch = (searchResults) => {
    setTeachers(searchResults); // Update teachers state with search results
  };

  return (
    <div className="teacher-list">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <SearchBar onSearch={handleSearch} fetchInitialTeachers={fetchInitialTeachers} />
          <TeacherTable teachers={teachers} setTeachers={setTeachers}/>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;

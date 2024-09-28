import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import { Link } from 'react-router-dom';

const SearchBar = ({ onFilter }) => {
  const [branches, setBranches] = useState([]);
  const [filters, setFilters] = useState({ branch_name: '', semester: '', subject_name: '' });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/admin/branches', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          const activeBranches = data.filter(branch => branch.is_active).map(branch => branch.branch_name);
          setBranches(activeBranches);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  // Handle the search when the button is clicked
  const handleSearch = () => {
    console.log('Filters applied:', filters);
    onFilter(filters);  // Pass the filters object
  };

  // Update the filters state when input changes
  const handleChange = (e) => {
    const updatedFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    console.log('Updated filters:', updatedFilters);  // Log the filters after change
    setFilters(updatedFilters);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search Subject Name"
          name="subject_name"  // Add name attribute
          value={filters.subject_name}
          onChange={handleChange}  // Use handleChange to update filters
        />
        <button onClick={handleSearch}>Search</button>
        <Link to="/admin/add-subject">
          <button className="add-subject-btn">Add New Subject</button>
        </Link>
      </div>

      <div className="filter-options">
        <select
          name="branch_name"  // Add name attribute
          value={filters.branch_name}
          onChange={handleChange}  // Use handleChange to update filters
        >
          <option value="">Branch</option>
          {branches.map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <select
          name="semester"  // Add name attribute
          value={filters.semester}
          onChange={handleChange}  // Use handleChange to update filters
        >
          <option value="">Semester</option>
          {[...Array(8).keys()].map(i => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;

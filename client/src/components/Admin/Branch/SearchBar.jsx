import React from 'react';
import './SearchBar.css';
import { Link } from 'react-router-dom'; // Import the styles for the search bar

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input type="text" placeholder="Search Branch Name" />
        <button>Search</button>
        <Link to="/admin/add-branch">
          <button className="add-branch-btn">Add New branch</button>
        </Link>
      </div>

      <div className="filter-options">
        <select>
          <option>Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;

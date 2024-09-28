import React from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import SearchBar from './SearchBar'; 
import BranchTable from './BranchTable'; 
import './BranchList.css';  

const BranchList = () => {
  return (
    <div className="branch-list">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <SearchBar />
          <BranchTable />
        </div>
      </div>
    </div>
  );
};

export default BranchList;

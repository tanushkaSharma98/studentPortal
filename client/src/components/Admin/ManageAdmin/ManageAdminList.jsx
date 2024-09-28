import React from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import ManageAdminTable from './ManageAdminTable'; 
import AddNewAdmin from './AddNewAdmin'; 
import './ManageAdminList.css';  

const ManageAdmin = () => {
  return (
    <div className="ManageAdmin-list">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <ManageAdminTable />
          <AddNewAdmin />
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;

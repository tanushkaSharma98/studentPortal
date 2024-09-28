import React from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import ExamTable from './ExamTable'; 
import AddNewExam from './AddNewExam'; 
import './ExamList.css';  

const Exam = () => {
  return (
    <div className="Exam-list">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <ExamTable />
          <AddNewExam />
        </div>
      </div>
    </div>
  );
};

export default Exam;

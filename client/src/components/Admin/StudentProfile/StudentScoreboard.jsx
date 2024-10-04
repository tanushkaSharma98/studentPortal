import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './StudentScoreboard.css';
import Header from '../../../common/Admin/Header';

// Dummy data for subjects
const data = [
  {
    subjectCode: 'CS101',
    subjectName: 'Computer Science',
    marksObtained: 85,
    maxMarks: 100,
    percentage: 85,
  },
  {
    subjectCode: 'MATH102',
    subjectName: 'Mathematics',
    marksObtained: 90,
    maxMarks: 100,
    percentage: 90,
  },
  {
    subjectCode: 'PHY103',
    subjectName: 'Physics',
    marksObtained: 70,
    maxMarks: 100,
    percentage: 70,
  },
];

// Color scheme for pie charts
const COLORS = ['#CD84A3', '#CBDEE6'];

const StudentScoreboard = () => {
  const [openAccordions, setOpenAccordions] = useState([]); // Track open accordions in an array

  const toggleAccordion = (index) => {
    if (openAccordions.includes(index)) {
      setOpenAccordions(openAccordions.filter((i) => i !== index)); // Remove index if it's already open
    } else {
      setOpenAccordions([...openAccordions, index]); // Add index if it's not open
    }
  };

  // Data for pie chart (for each subject)
  const getPieChartData = (marksObtained, maxMarks) => [
    { name: 'Obtained', value: marksObtained },
    { name: 'Remaining', value: maxMarks - marksObtained },
  ];

  // Data for the bar chart
  const barChartData = data.map((subject) => ({
    name: subject.subjectName,
    percentage: subject.percentage,
  }));

  return (
    <div className='st-marks'>
        <Header />
        <div className="stscoreboard-container">
           
      <div className="stscoreboard-header">
      <Link to="/admin/student-profile">
        <button className="back-button">←</button>
      </Link> 
        <h1 className="st-title">SCOREBOARD</h1>
        <div className="stexam-dropdown">
          <select>
            <option value="exam">Exam</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
          </select>
        </div>
      </div>

      {/* Accordions */}
      {data.map((item, index) => (
        <div key={index} className={`staccordion ${openAccordions.includes(index) ? 'open' : ''}`}>
          <div className="staccordion-header" onClick={() => toggleAccordion(index)}>
            <p>{item.subjectName} ({item.subjectCode})</p>
            <span className="staccordion-arrow">{openAccordions.includes(index) ? '⌄' : '⌄'}</span>
          </div>
          {openAccordions.includes(index) && (
            <div className="staccordion-content">
              <div className="staccordion-details">
                <p><strong>Subject Code:</strong> {item.subjectCode}</p>
                <p><strong>Subject Name:</strong> {item.subjectName}</p>
                <p><strong>Marks Obtained:</strong> {item.marksObtained}</p>
                <p><strong>Maximum Marks:</strong> {item.maxMarks}</p>
                <p><strong>Percentage Obtained:</strong> {item.percentage}%</p>
              </div>
              <div className="staccordion-chart">
                <PieChart width={120} height={120}>
                  <Pie
                    data={getPieChartData(item.marksObtained, item.maxMarks)}
                    dataKey="value"
                    outerRadius={40}
                    fill="#8884d8"
                  >
                    {getPieChartData(item.marksObtained, item.maxMarks).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Bar Chart for all subjects */}
      <div className="stall-subjects-chart">
        <h3>All Subjects Performance:</h3>
        <BarChart className='st-barchart'
          width={400}
          height={300}
          data={barChartData}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="percentage" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
    </div>
    
  );
};

export default StudentScoreboard;
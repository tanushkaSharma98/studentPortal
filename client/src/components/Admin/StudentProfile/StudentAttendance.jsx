import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './StudentAttendance.css';
import Header from '../../../common/Admin/Header';

// Dummy data for subjects attendance
const data = [
  {
    subjectCode: 'CS101',
    subjectName: 'Computer Science',
    totalClasses: 50,
    attendedClasses: 40,
    updatedTill: '2024-10-01',
  },
  {
    subjectCode: 'MATH102',
    subjectName: 'Mathematics',
    totalClasses: 60,
    attendedClasses: 30,
    updatedTill: '2024-10-01',
  },
  {
    subjectCode: 'PHY103',
    subjectName: 'Physics',
    totalClasses: 40,
    attendedClasses: 20,
    updatedTill: '2024-10-01',
  },
];

// Color scheme for pie charts
const COLORS = ['#CD84A3', '#CBDEE6'];

const StudentAttendance = () => {
  const [activeAccordions, setActiveAccordions] = useState([]);

  const toggleAccordion = (index) => {
    if (activeAccordions.includes(index)) {
      setActiveAccordions(activeAccordions.filter((i) => i !== index));
    } else {
      setActiveAccordions([...activeAccordions, index]);
    }
  };

  // Data for pie chart (attendance percentage for each subject)
  const getPieChartData = (attendedClasses, totalClasses) => [
    { name: 'Attended', value: attendedClasses },
    { name: 'Missed', value: totalClasses - attendedClasses },
  ];

  const calculateAttendancePercentage = (attended, total) =>
    ((attended / total) * 100).toFixed(0);

  // Prepare data for bar chart
  const barChartData = data.map((item) => ({
    subjectName: item.subjectName,
    attendancePercentage: calculateAttendancePercentage(item.attendedClasses, item.totalClasses),
  }));

  return (
    <div className='st-atten'>
        <Header />
        <div className="stattendance-container">
      <div className="stattendance-header">
      <Link to="/admin/student-profile">
        <button className="back-button">←</button>
        </Link>
        <h1 className="stattendance-title">ATTENDANCE</h1>
      </div>

      {/* Accordions */}
      {data.map((item, index) => (
        <div key={index} className={`stattendance-accordion ${activeAccordions.includes(index) ? 'open' : ''}`}>
          <div className="stattendance-accordion-header" onClick={() => toggleAccordion(index)}>
            <p>{item.subjectName} ({item.subjectCode})</p>
            <span className="stattendance-accordion-arrow">{activeAccordions.includes(index) ? '⌃' : '⌄'}</span>
          </div>
          {activeAccordions.includes(index) && (
            <div className="stattendance-accordion-content">
              <div className="stattendance-details">
                <p><strong>Subject Code:</strong> {item.subjectCode}</p>
                <p><strong>Subject Name:</strong> {item.subjectName}</p>
                <p><strong>Total Classes:</strong> {item.totalClasses}</p>
                <p><strong>Classes Attended:</strong> {item.attendedClasses}</p>
                <p><strong>Updated Till:</strong> {item.updatedTill}</p>
              </div>
              <div className="stattendance-chart">
                <PieChart width={120} height={120}>
                  <Pie
                    data={getPieChartData(item.attendedClasses, item.totalClasses)}
                    dataKey="value"
                    outerRadius={40}
                    fill="#8884d8"
                  >
                    {getPieChartData(item.attendedClasses, item.totalClasses).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="stattendance-percentage">
                  <p>{calculateAttendancePercentage(item.attendedClasses, item.totalClasses)}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Bar chart for attendance percentage comparison */}
      <div className="stattendance-bar-chart">
        <h3>All Subjects Attendance Percentage:</h3>
        <BarChart width={500} height={300} data={barChartData}>
          <XAxis dataKey="subjectName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="attendancePercentage" fill="#9bbace" />
        </BarChart>
      </div>
    </div>
    </div>
    
  );
};

export default StudentAttendance;
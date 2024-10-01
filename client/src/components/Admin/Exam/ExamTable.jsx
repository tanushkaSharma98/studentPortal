import React, { useState, useEffect } from 'react';

const ExamTable = () => {
  const [exams, setExams] = useState([]);

  // Fetch exams from the API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/admin/exams', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Include token if required
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }

        const data = await response.json();
        const formattedExams = data.map((exam, index) => ({
          sNo: index + 1,
          examname: exam.exam_name,
          maxmarks: exam.maximum_marks,
          isDeleted: false
        }));

        setExams(formattedExams);  // Set the fetched data into the state
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  // Handle delete toggle
  const handleDelete = (index) => {
    const updatedExams = [...exams];
    updatedExams[index].isDeleted = !updatedExams[index].isDeleted;  // Toggle delete status
    setExams(updatedExams);
  };

  return (
    <div className="exam-table">
      <table>
        <thead>
          <tr>
            <th>S. no</th>
            <th>Exam Name</th>
            <th>Max Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={index} className={exam.isDeleted ? 'deleted' : ''}>
              <td>{exam.sNo}</td>
              <td>{exam.examname}</td>
              <td>{exam.maxmarks}</td>
              <td>
                <button 
                  className={`delete-btn ${exam.isDeleted ? 'add-btn' : ''}`}
                  onClick={() => handleDelete(index)}
                >
                  {exam.isDeleted ? '✓' : '✗'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;

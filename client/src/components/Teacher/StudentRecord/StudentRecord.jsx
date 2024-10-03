import { useState, useEffect } from 'react';
import './StudentRecord.css';
import StudentRecordTable from './StudentRecordTable';
import axios from 'axios';


const StudentRecord = () => {
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [marksBelowDropdown, setMarksBelowDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject');
  const [selectedMarksBelow, setSelectedMarksBelow] = useState('Marks Below');
  const [threshold, setThreshold] = useState(null); // Correctly define threshold and setThreshold
  const [students, setStudents] = useState([]); // State for storing fetched student records
  const [loading, setLoading] = useState(false); // State to manage loading
  const [subjectList, setSubjectList] = useState([]);

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   // You can add logic here to fetch subjects from the server if needed
  // }, []);

  useEffect(() => {
    if (token) {
      const fetchSubjects = async () => {
        try {
          // Fetch subjects based on teacherId
          const subjectResponse = await axios.get('http://localhost:3000/api/teachers/subjects', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setSubjectList(subjectResponse.data);
        } catch (error) {
          console.error('Error fetching subjects :', error);
        }
      };

      fetchSubjects();
    }
  }, [token]);

  const handleSubjectSelect = (e) => {
    setSelectedSubject(e.target.value);
    setSubjectDropdown(false);
    // You can add logic here to filter students by the selected subject
  };

  const handleMarksBelowChange = (e) => {
    setSelectedMarksBelow(e.target.value);

    // Set the threshold value based on the selected option
    const threshold = e.target.value === 'Below 10' ? 10 : e.target.value === 'Below 20' ? 20 : null;

    // Fetch students when a marks threshold is selected
    fetchStudents(marks === 'Below 10' ? 10 : marks === 'Below 20' ? 20 : null);

    // Close the dropdown after selection
    setMarksBelowDropdown(false);
  };

  const handleExpandAttendance = () => {
    navigate('/daily-attendance-record'); // Navigate to Daily Attendance Record page
  };

return (
  
    <div className="teacher-attendanceContainer">
      <div className="teacher-TopButtons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
          <select
           className='portalselect'
            value={selectedSubject}
            onChange={(e) => handleSubjectSelect(e.target.value)}
          >
            <option value="">Subject</option>
            {subjectList.length > 0 ? (
              subjectList.map((subject, index) => (
                <option key={index} value={subject.subject_name}>
                  {subject.subject_name}
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>


        {/* Marks Below Dropdown */}
        <div className="teacher-MarksDropdown">
          <select className='portalselect' value={selectedMarksBelow} onChange={handleMarksBelowChange}>
            <option value="">Marks below</option>
            <option value="Below 10">Below 10</option>
            <option value="Below 20">Below 20</option>
          </select>
        </div>
      </div>

      {/* Record details below buttons */}
      <div className="teacher-RecordDetails">
        <span className="teacher-UpdatedLast">Updated Last: Yesterday</span>
        <span className="teacher-TotalLecture">Total Lecture: 10</span>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <StudentRecordTable students={students} />
        </div>
      )}
    </div>
  );
};

export default StudentRecord;

import { useState, useEffect } from 'react';
import './StudentRecord.css';
import axios from 'axios';
import StudentRecordTable from './StudentRecordTable'; 

const StudentRecord = () => {
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [marksBelowDropdown, setMarksBelowDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject');
  const [selectedMarksBelow, setSelectedMarksBelow] = useState('Marks Below');
  const [threshold, setThreshold] = useState(null); // Correctly define threshold and setThreshold
  const [students, setStudents] = useState([]); // State for storing fetched student records
  const [loading, setLoading] = useState(false); // State to manage loading
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState([]); 

  const token = localStorage.getItem('token');

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

  const handleSubjectChange = async (subject) => {
    setSelectedSubject(subject);
    try {
      const studentResponse = await axios.get(
        `http://localhost:3000/api/teachers/subject-students?subjectCode=${subject}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentList(studentResponse.data); // Update student list
    } catch (error) {
      console.error('Error fetching students:', error);
    }
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
        <div className="teacherSub-Dropdown">
        <select
          className='PortalSelect'
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Subject</option>
            {subjectList.length > 0 ? (
              subjectList.map((subject, index) => (
                <option 
                  key={index} 
                  value={subject.subject_code} // Display initials and code
                >
                  {`${subject.sub_initials}(${subject.subject_code})`} {/* Show sub_initials(subject_code) */}
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>


        {/* Marks Below Dropdown */}
        <div className="teacherMarks-Dropdown">
          <select className='PortalSelect' value={selectedMarksBelow} onChange={handleMarksBelowChange}>
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
      <StudentRecordTable students= {studentList} />
      
    </div>
  );
};

export default StudentRecord;

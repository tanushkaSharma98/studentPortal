import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherAttendance.css';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';

const TeacherAttendance = () => {
  const navigate = useNavigate(); 
  const [selectedSubject, setSelectedSubject] = useState('');
  const [date, setDate] = useState('');
  const [lecture, setLecture] = useState('');
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState([]); // State for student list

  const token = localStorage.getItem('token');

  // Fetch subjects on mount
  useEffect(() => {
    if (token) {
      const fetchSubjects = async () => {
        try {
          const subjectResponse = await axios.get('http://localhost:3000/api/teachers/subjects', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          setSubjectList(subjectResponse.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };
      fetchSubjects();
    }
  }, [token]);

  // Fetch students when a subject is selected
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

  const handleLectureChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === '') {
      setLecture(value);
    }
  };

  return (
    <div className="teacher-attendance-container">
      <div className="teacher-top-buttons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
          <select
            className="portalselect"
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Subject</option>
            {subjectList.length > 0 ? (
              subjectList.map((subject, index) => (
                <option key={index} value={subject.subject_code}>
                  {`${subject.sub_initials} (${subject.subject_code})`}
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>
      </div>

      <div className="teacher-attendance-details">
        <p className="teacher-updated-last">Updated Last: Yesterday</p>
        <div className="teacher-input-row">
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="teacher-input-row">
          <label htmlFor="lecture">Lecture: </label>
          <input
            type="number"
            id="lecture"
            value={lecture}
            onChange={handleLectureChange}
            placeholder="Enter lecture number"
            min="0"
          />
        </div>

        {/* Pass the fetched students list to AttendanceTable */}
        <AttendanceTable students={studentList} />
      </div>
    </div>
  );
};

export default TeacherAttendance;

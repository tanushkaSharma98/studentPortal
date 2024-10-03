import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherAttendance.css';
import AttendanceTable from './AttendanceTable';
import axios from 'axios';

const TeacherAttendance = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [selectedSubject, setSelectedSubject] = useState('');
  const [date, setDate] = useState('');
  const [lecture, setLecture] = useState('');
  const [subjectList, setSubjectList] = useState([]);

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

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSubjectDropdown(false);
  };

  const handleLectureChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === '') {
      setLecture(value);
    }
  };

  const handleSave = () => {
    console.log('Data saved');
  };

  return (
    <div className="teacher-attendance-container">
      <div className="teacher-top-buttons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
        <select
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
          <span className="teacher-total-lecture">Total Lecture: 10</span>
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
        <AttendanceTable />
      </div>

      {/* Bottom Buttons */}
      <div className="teacher-bottom-buttons">
        <button className="teacher-daily-record-btn" onClick={() => navigate('/daily-attendance-record')}>
          Daily Attendance Record
        </button>
        <button className="teacher-save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TeacherAttendance;

import { useState, useEffect } from 'react';
import './TeacherScoreboard.css';
import Table from './Table.jsx';

//
import axios from 'axios'; // Import Axios
import {jwtDecode} from 'jwt-decode'; // Correct import


const TeacherScoreboard = () => {
  // State to manage dropdown visibility and selected values
  const [subjectDropdown, setSubjectDropdown] = useState(false);
  const [examDropdown, setExamDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject'); // Default value
  const [selectedExam, setSelectedExam] = useState('Exam'); // Default value

  //
  const [examList, setExamList] = useState([]); // State for exam list
  const [setSubjectList] = useState([]); // State for subject list
  const [userId, setUserId] = useState(null); // State for teacherId


  //
   // Fetch the token from localStorage
   const token = localStorage.getItem('token');
   console.log('Auth Token:', token);

//
  // Decode the token to get teacherId
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        const fetchedUserId = decodedToken.userId; // Assuming 'teacherId' is part of the token
        setUserId(fetchedUserId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('No token found');
    }
  }, [token]);

  // Fetch exam names from the backend API
  useEffect(() => {
    console.log('Fetching exams');
    const fetchExams = async () => {
      if (!token) return; // Don't make the API call if token isn't set
      try {
        const response = await axios.get('http://localhost:3000/api/exams', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExamList(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams(); // Fetch exams when component mounts
  }, [token]);

  // Fetch subjects when teacherId is available
  useEffect(() => {
    // console.log('USERS');
    if (userId) {
      // console.log('USERS');
      console.log('Fetching subjects for user:', userId);
      const fetchSubjects = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/teacher/subjects', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              user_id: userId,
            },
          });
          console.log('Fetched Subjects:', response.data);
          setSubjectList(response.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };

      fetchSubjects(); // Fetch subjects once teacherId is set
    }
  }, [userId, token, setSubjectList]); // Only run this effect when teacherId changes



  const toggleSubjectDropdown = () => setSubjectDropdown(!subjectDropdown);
  const toggleExamDropdown = () => setExamDropdown(!examDropdown);

  // Function to handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject.subject_name); // Update the button text with selected subject
    setSubjectDropdown(false); // Close the dropdown
  };

  // Function to handle exam selection
  const handleExamSelect = (exam) => {
    setSelectedExam(exam.exam_name); // Update the button text with selected exam
    setExamDropdown(false); // Close the dropdown
  };

  // Function to handle save
  const handleSave = () => {
    // Logic to save the data
    console.log('Data saved'); // Replace this with actual saving logic
  };

  return (
    <div className="teacher-scoreboard-container">
      <div className="teacher-top-buttons">
        {/* Subject Button */}
        <div className="teacher-dropdown">
          <button className="teacher-dropdown-btn" onClick={toggleSubjectDropdown}>
            {selectedSubject} <span className="teacher-arrow"></span>
          </button>
          {subjectDropdown && (
            <div className="teacher-dropdown-content">
              <a href="#" onClick={(e) => { e.preventDefault(); handleSubjectSelect('Math'); }}>Math</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSubjectSelect('Physics'); }}>Physics</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSubjectSelect('Chemistry'); }}>Chemistry</a>
            </div>
          )}
        </div>

        {/* Exam Button */}
        <div className="teacher-dropdown">
          <button className="teacher-dropdown-btn" onClick={toggleExamDropdown}>
            {selectedExam} <span className="teacher-arrow"></span>
          </button>
          {examDropdown && (
             <div className="teacher-dropdown-content">
             {examList.length > 0 ? (
               examList.map((exam, index) => (
                 <a href="#" key={index} onClick={(e) => { e.preventDefault(); handleExamSelect(exam); }}>
                   {exam.exam_name}
                 </a>
               ))
               ) : ( 
                <p>No exams available</p>
          )}
        </div>
         )}
      </div>
      </div>

      {/* Branch, Semester, Subject, Exam in a single row */}
      <div className="teacher-info-row">
        <span>Branch : Computer Science</span>
        <span>Semester : 7</span>
        <span>Subject : {selectedSubject}</span>
        <span>Exam : {selectedExam}</span>
      </div>

      <div className="teacher-maxmarks">
        <span>Maximum marks : 30</span>
      </div>

      <div>
        <Table />
      </div>

      {/* Save Button */}
      <div className="teacherScoreboard-save-button-container">
        <button className="teacher-save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TeacherScoreboard;

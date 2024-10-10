import { useState, useEffect } from 'react';
import './TeacherScoreboard.css';
import axios from 'axios';
import StudentTable from './Table'; // Import StudentTable component

const TeacherScoreboard = () => {
  const [examDropdown, setExamDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('Exam');
  const [examList, setExamList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState([]); // State for student list

  const token = localStorage.getItem('token');

  // Fetch subjects and exams
  useEffect(() => {
    if (token) {
      const fetchSubjectsAndExams = async () => {
        try {
          // Fetch subjects based on teacherId
          const subjectResponse = await axios.get('http://localhost:3000/api/teachers/subjects', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setSubjectList(subjectResponse.data);

          // Fetch exams
          const examResponse = await axios.get('http://localhost:3000/api/admin/exams', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setExamList(examResponse.data);
        } catch (error) {
          console.error('Error fetching subjects or exams:', error);
        }
      };

      fetchSubjectsAndExams();
    }
  }, [token]);

  // Fetch students based on the selected subject
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
      const studentsWithMarks = studentResponse.data.map(student => ({
        ...student,
        Marks_Obtained: student.Marks_Obtained || 0 // Initialize marks if missing
      }));
      setStudentList(studentsWithMarks); // Update student list with default marks
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Handle exam selection
  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setExamDropdown(false);
  };

  // Handle save button to post marks to the API
//   const handleSaveMarks = async () => {
//     const payload = studentList.map((student) => ({
//       student_id: student.student_id,
//       Marks_Obtained: student.Marks_Obtained,
//       subject_id: selectedSubject,
//       exam_id: Number(selectedExam) 
      
//     })).filter(item => item.Marks_Obtained !== undefined && item.student_id); // Ensure we only send valid entries
//     console.log('Payload:', payload);
//     if (payload.length === 0) {
//       alert("No valid marks to upload.");
//       return; // Early exit if there are no valid marks
//   }


//   try {
//     const response = await axios.post('http://localhost:3000/api/marks/upload', testPayload, {
//         headers: {
//             Authorization: `Bearer ${token}`, // Replace with actual token if required
//             'Content-Type': 'application/json',
//         },
//     });
//     console.log('Marks uploaded successfully:', response.data);
// } catch (error) {
//     console.error('Error uploading marks:', error.response?.data);
// }

//   };
const handleSaveMarks = async () => {
  const payload = studentList.map((student) => ({
      student_id: student.student_id,
      Marks_Obtained: student.Marks_Obtained,
      subject_id: selectedSubject,
      exam_id: Number(selectedExam)
  })).filter(item => item.Marks_Obtained !== undefined && item.student_id);

  console.log('Payload:', payload);
  if (payload.length === 0) {
      alert("No valid marks to upload.");
      return;
  }

  try {
      const response = await axios.post('http://localhost:3000/api/teachers/marks/upload', payload, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });
      console.log('Marks uploaded successfully:', response.data);
  } catch (error) {
      // Enhanced error logging
      if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
          // Request was made but no response was received
          console.error('Error request data:', error.request);
      } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
  }
};


  return (
    <div className="teacher-scoreboard-container">
      <div className="teacher-top-buttons">
        {/* Subject Dropdown */}
        <div className="teacher-subject-dropdown">
          <select
            className='portal-select'
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Subject</option>
            {subjectList.length > 0 ? (
              subjectList.map((subject, index) => (
                <option 
                  key={index} 
                  value={subject.subject_code} // Use subject_code for API call
                >
                  {`${subject.sub_initials} (${subject.subject_code})`} 
                </option>
              ))
            ) : (
              <option value="">No subjects available</option>
            )}
          </select>
        </div>

        {/* Exam Dropdown */}
        <div className="teacher-exam-dropdown">
          <select
            className='portal-select'
            value={selectedExam}
            onChange={(e) => handleExamSelect(e.target.value)}
          >
            <option value="">Exam</option>
            {examList.length > 0 ? (
              examList.map((exam, index) => (
                <option key={index} value={exam.exam_name}>
                  {exam.exam_name}
                </option>
              ))
            ) : (
              <option value="">No exams available</option>
            )}
          </select>
        </div>
      </div>

      {/* Branch, Semester, Subject, Exam in a single row */}
      <div className="teacher-info-row">
        <span>Branch: Computer Science</span>
        <span>Semester: 7</span>
        <span>Subject: {selectedSubject}</span>
        <span>Exam: {selectedExam}</span>
      </div>

      <div className="teacher-maxmarks">
        <span>Maximum marks: 30</span>
      </div>

      {/* Render StudentTable with the fetched student list */}
      {selectedSubject && selectedExam && (
        <StudentTable 
          students={studentList} 
          setStudents={setStudentList} 
          onSave={handleSaveMarks} // Pass the handleSaveMarks function to the StudentTable
        />
      )}
    </div>
  );
};

export default TeacherScoreboard;
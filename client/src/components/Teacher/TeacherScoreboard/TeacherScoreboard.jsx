import { useState, useEffect } from 'react';
import './TeacherScoreboard.css';
import StudentTable from './Table'; // Import StudentTable component

const TeacherScoreboard = () => {
  const [examDropdown, setExamDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [examList, setExamList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState([]); // State for student list
  const [maxMarks, setMaxMarks] = useState(null); // State for maximum marks
  const [isUpdateMode, setIsUpdateMode] = useState(false); // To track if it's update mode

  const token = localStorage.getItem('token');

  // Fetch subjects and exams
  useEffect(() => {
    if (token) {
      const fetchSubjectsAndExams = async () => {
        try {
          // Fetch subjects based on teacherId
          const subjectResponse = await fetch('http://localhost:3000/api/teachers/subjects', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const subjectData = await subjectResponse.json();
          setSubjectList(subjectData);

          // Fetch exams
          const examResponse = await fetch('http://localhost:3000/api/admin/exams', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const examData = await examResponse.json();
          setExamList(examData);
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
    setSelectedExam(''); // Reset selected exam
    setStudentList([]); // Clear student list before fetching new data
    try {
      // Fetch students based on the selected subject
      const studentResponse = await fetch(`http://localhost:3000/api/teachers/subject-students?subjectCode=${subject}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const studentData = await studentResponse.json();

      // Log the student data to check its structure
      console.log('Fetched Student Data:', studentData);

      // Set the fetched student data directly to the studentList state
      setStudentList(studentData); // Use the API response as it is

      setIsUpdateMode(false); // Reset update mode since it's a new selection
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch marks data when selectedExam is present
  useEffect(() => {
    const fetchMarksData = async () => {
      if (!selectedExam || studentList.length === 0) return; // Early return if no exam or students

      try {
        const marksResponse = await fetch(
          `http://localhost:3000/api/teachers/marks?subjectCode=${selectedSubject}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const marksData = await marksResponse.json();

        // Check if there's data and filter based on selected exam ID
        const updatedStudents = studentList.map(student => {
          const studentMarks = marksData.find(
            mark => mark.student_id === student.student_id && mark.exam_id === Number(selectedExam)
          );
          return {
            ...student,
            Marks_Obtained: studentMarks ? studentMarks.marks_obtained : undefined,
            percentage: studentMarks ? studentMarks.percentage : undefined,
          };
        });

        setStudentList(updatedStudents);
        setIsUpdateMode(true); // Change mode to update if marks are present
      } catch (error) {
        console.error('Error fetching marks data:', error);
      }
    };

    fetchMarksData();
  }, [selectedExam, selectedSubject, token, studentList.length]); // Update dependencies

  // Handle exam selection and update maximum marks
  const handleExamSelect = (examId) => {
    setSelectedExam(examId);

    // Find the selected exam and update max marks
    const selectedExamObj = examList.find(exam => exam.exam_id === Number(examId));
    if (selectedExamObj) {
      setMaxMarks(selectedExamObj.maximum_marks);
    }
  };

  // Save or update marks
  const handleSaveMarks = async () => {
    const payload = {
      exam_id: Number(selectedExam),
      marks: studentList.map((student) => ({
        student_id: student.student_id,
        enrollment_no: student.enrollment_no, // Include enrollment number in the payload
        marks_obtained: student.Marks_Obtained,
        subject_code: selectedSubject
      })).filter(item => item.marks_obtained !== undefined && item.student_id)
    };

    if (payload.marks.length === 0) {
      alert("No valid marks to upload.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/teachers/marks/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log('Marks uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading marks:', error);
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
                  value={subject.subject_code}
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
              examList.map((exam) => (
                <option key={exam.exam_id} value={exam.exam_id}>
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
        <span>Exam: {examList.find(exam => exam.exam_id === Number(selectedExam))?.exam_name || 'N/A'}</span>
      </div>

      {/* Dynamic Maximum Marks */}
      <div className="teacher-maxmarks">
        <span>Maximum marks: {maxMarks ? maxMarks : 'N/A'}</span>
      </div>

      {/* Render StudentTable with the fetched student list */}
      {selectedSubject && (
        <StudentTable 
          students={studentList} 
          setStudents={setStudentList} 
          onSave={handleSaveMarks} // Pass the handleSaveMarks function to the StudentTable
          buttonText={isUpdateMode ? 'Update Marks' : 'Save Marks'} // Change button text
        />
      )}
    </div>
  );
};

export default TeacherScoreboard;

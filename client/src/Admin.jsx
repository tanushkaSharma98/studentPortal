import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './components/Admin/Login/Login.jsx';
import Dashboard from './components/Admin/Dashboard/Dashboard.jsx';
import StudentList from './components/Admin/Student/StudentList.jsx';
import AddNewStudent from './components/Admin/Student/AddNewStudent.jsx';
import TeacherList from './components/Admin/Teacher/TeacherList.jsx';
import AddNewTeacher from './components/Admin/Teacher/AddNewTeacher.jsx';
import SubjectList from './components/Admin/Subject/SubjectList.jsx';
import AddNewSubject from './components/Admin/Subject/AddNewSubject.jsx';
import ExamList from './components/Admin/Exam/ExamList.jsx';
import BranchList from './components/Admin/Branch/BranchList.jsx';
import AddNewBranch from './components/Admin/Branch/AddNewBranch.jsx';
import ManageAdminList from './components/Admin/ManageAdmin/ManageAdminList.jsx';
import UserActivityList from './components/Admin/UserActivity/UserActivityList.jsx';
import ChangePassword from './components/Admin/ChangePassword/ChangePassword.jsx';
import TeacherProfile from './components/Admin/TeacherProfile/TeacherProfile.jsx';
import AttendanceRecord from './components/Admin/TeacherProfile/AttendanceRecord.jsx';
import StudentRecord from './components/Admin/TeacherProfile/StudentRecord.jsx';
import StudentProfile from './components/Admin/StudentProfile/StudentProfile.jsx'; 
import StudentScoreboard from './components/Admin/StudentProfile/StudentScoreboard.jsx'; 
import StudentAttendance from './components/Admin/StudentProfile/StudentAttendance.jsx'; 
import AuthRoute from './routes/AuthRoute.jsx';

const Admin = () => {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
      <Route path="/students" element={<AuthRoute><StudentList /></AuthRoute>} />
      <Route path="/add-student" element={<AuthRoute><AddNewStudent /></AuthRoute>} />
      <Route path="/teachers" element={<AuthRoute><TeacherList /></AuthRoute>} />
      <Route path="/add-teacher" element={<AuthRoute><AddNewTeacher /></AuthRoute>} />
      <Route path="/subjects" element={<AuthRoute><SubjectList /></AuthRoute>} />
      <Route path="/add-subject" element={<AuthRoute><AddNewSubject /></AuthRoute>} />
      <Route path="/exams" element={<AuthRoute><ExamList /></AuthRoute>} />
      <Route path="/branches" element={<AuthRoute><BranchList /></AuthRoute>} />
      <Route path="/add-branch" element={<AuthRoute><AddNewBranch /></AuthRoute>} />
      <Route path="/manage-admin" element={<AuthRoute><ManageAdminList /></AuthRoute>} />
      <Route path="/activity" element={<AuthRoute><UserActivityList /></AuthRoute>} />
      <Route path="/change-password" element={<AuthRoute><ChangePassword /></AuthRoute>} />
      <Route path="/teacher-profile/:userId" element={<AuthRoute><TeacherProfile /></AuthRoute>} />
      <Route path="/attendance-record" element={<AuthRoute><AttendanceRecord /></AuthRoute>} />
      <Route path="/student-record" element={<AuthRoute><StudentRecord /></AuthRoute>} />
      <Route path="/student-profile/:userId" element={<AuthRoute><StudentProfile /></AuthRoute>} />
      <Route path="/student-scoreboard/:userId" element={<AuthRoute><StudentScoreboard /></AuthRoute>} />
      <Route path="/student-attendance/:userId" element={<AuthRoute><StudentAttendance /></AuthRoute>} />
    </Routes>
  );
};

export default Admin;

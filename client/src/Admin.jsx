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

const Admin = () => {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/add-student" element={<AddNewStudent />} />
      <Route path="/teachers" element={<TeacherList />} />
      <Route path="/add-teacher" element={<AddNewTeacher />} />
      <Route path="/subjects" element={<SubjectList />} />
      <Route path="/add-subject" element={<AddNewSubject />} />
      <Route path="/exams" element={<ExamList />} />
      <Route path="/branches" element={<BranchList />} />
      <Route path="/add-branch" element={<AddNewBranch />} />
      <Route path="/manage-admin" element={<ManageAdminList />} />
      <Route path="/activity" element={<UserActivityList />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/teacher-profile" element={<TeacherProfile />} />
      <Route path="/attendance-record" element={<AttendanceRecord />} />
      <Route path="/student-record" element={<StudentRecord />} />
    </Routes>
  );
};

export default Admin;

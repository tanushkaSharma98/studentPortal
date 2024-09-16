const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging middleware for dev environment
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentManagementRoutes = require('./routes/studentManagementRoutes');
const teacherManagementRoutes = require('./routes/teacherManagementRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const branchRoutes = require('./routes/branchRoutes');
const examRoutes = require('./routes/examRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);
<<<<<<< Updated upstream
app.use('/api/subjects', subjectRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/exams', examRoutes);
=======
app.use('/api/admin/students', studentManagementRoutes);
app.use('/api/admin/teacher', teacherManagementRoutes);
app.use('/api/admin/subjects', subjectRoutes);
app.use('/api/admin/branches', branchRoutes);
app.use('/api/admin/exams', examRoutes);
>>>>>>> Stashed changes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

// Handle 404 - Resource Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
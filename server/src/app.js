const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authenticate } = require('./middleware/authMiddleware.js');
const scheduler = require('./scheduler/scheduler');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging middleware for dev environment
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Import routes
const authRoutes = require('./routes/authRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const teacherRoutes = require('./routes/teacherRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const studentManagementRoutes = require('./routes/studentManagementRoutes.js');
const teacherManagementRoutes = require('./routes/teacherManagementRoutes.js');
const subjectRoutes = require('./routes/subjectRoutes.js');
const branchRoutes = require('./routes/branchRoutes.js');
const examRoutes = require('./routes/examRoutes.js');
const marksRoutes = require('./routes/marksBelowRoutes');
const branchSemSubRoutes = require('./routes/branchSemSubRoutes');

// // Use routes
app.get('/', (req, res) => res.send('Server is Running'));
app.use('/api/auth', authRoutes);
app.use(authenticate);
// Authenticate middleware;
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);  // All teacher-related routes, including /marks/upload
app.use('/api/admin', adminRoutes);
app.use('/api/admin/students', studentManagementRoutes);
app.use('/api/admin/teachers', teacherManagementRoutes);
app.use('/api/admin/subjects', subjectRoutes);
app.use('/api/admin/branches', branchRoutes);
app.use('/api/admin/exams', examRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api', branchSemSubRoutes);

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

scheduler;

module.exports = app;

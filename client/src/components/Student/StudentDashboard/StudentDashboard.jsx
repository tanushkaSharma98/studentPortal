import React, { useState } from 'react';
import Navbar from '../../Common/navbar/Navbar.jsx';
import './StudentDashboard.css';
import { Line } from 'react-chartjs-2'; // for charts, install Chart.js: npm install react-chartjs-2 chart.js

// Import required Chart.js components
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const StudentDashboard = () => {
    // State to manage which section to display
    const [view, setView] = useState('dashboard');

    const profileData = {
        name: "John Doe",
        id: "20221001",
        email: "john.doe@example.com",
        contact: "9876543210",
        branch: "Computer Science",
        semester: "6",
        profilePicture: "https://via.placeholder.com/150"
    };

    const marksData = [
        { subject: "Mathematics", marks: 85 },
        { subject: "Physics", marks: 78 },
        { subject: "Chemistry", marks: 88 },
        { subject: "Computer Science", marks: 90 }
    ];

    const attendanceData = [
        { subject: "Mathematics", attendance: 75 },
        { subject: "Physics", attendance: 80 },
        { subject: "Chemistry", attendance: 60 },
        { subject: "Computer Science", attendance: 95 }
    ];

    const performanceData = {
        labels: ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"],
        datasets: [
            {
                label: 'Marks',
                data: [75, 80, 85, 82, 88, 90],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    // Function to render selected view
    const renderView = () => {
        switch(view) {
            case 'dashboard':
                return (
                    <div className="profile-section">
                        <img src={profileData.profilePicture} alt="Profile" />
                        <h2>{profileData.name}</h2>
                        <p><strong>ID:</strong> {profileData.id}</p>
                        <p><strong>Email:</strong> {profileData.email}</p>
                        <p><strong>Contact:</strong> {profileData.contact}</p>
                        <p><strong>Branch:</strong> {profileData.branch}</p>
                        <p><strong>Semester:</strong> {profileData.semester}</p>
                    </div>
                );
            case 'scoreboard':
                return (
                    <div className="marks-section">
                        <h2>Scoreboard</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marksData.map((subject, index) => (
                                    <tr key={index}>
                                        <td>{subject.subject}</td>
                                        <td>{subject.marks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'attendance':
                return (
                    <div className="attendance-section">
                        <h2>Attendance</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((subject, index) => (
                                    <tr key={index} className={subject.attendance < 75 ? 'low-attendance' : ''}>
                                        <td>{subject.subject}</td>
                                        <td>{subject.attendance}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="warning-message">* Warning: Below 75% attendance</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="student-dashboard">
            {/* Navbar */}
            <Navbar />

            {/* Options to switch between Dashboard, Scoreboard, and Attendance */}
            <div className="navigation-buttons">
                <button onClick={() => setView('dashboard')}>Dashboard</button>
                <button onClick={() => setView('scoreboard')}>Scoreboard</button>
                <button onClick={() => setView('attendance')}>Attendance</button>
            </div>

            {/* Render the selected view */}
            <div className="content-section">
                {renderView()}
            </div>

            {/* Performance Trends Section */}
            <div className="performance-section">
                <h2>Performance Trends</h2>
                <Line data={performanceData} />
            </div>
        </div>
    );
};

export default StudentDashboard;

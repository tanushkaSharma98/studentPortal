import React, { useState } from 'react';
import Sidebar from '../../../common/Admin/Sidebar';
import Header from '../../../common/Admin/Header';
import UserActivityTable from './UserActivityTable';
import './UserActivityList.css'; // Custom CSS for User Activity List

const UserActivityList = () => {
    const [userType, setUserType] = useState('');
    const [date, setDate] = useState('');

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    return (
        <div className="user-activity-list">
            <Header />
            <Sidebar />
            <div className="main-content">
                <div className="container">
                    <div className="filter-section">
                        <select className="user-type-dropdown" value={userType} onChange={handleUserTypeChange}>
                            <option value="">User Type</option>
                            <option value="Admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option> {/* Added Student option */}
                        </select>
                        <div className="date-picker">
                            <label htmlFor="date">Date: </label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <UserActivityTable userType={userType} date={date} /> {/* Pass date as prop */}
                </div>
            </div>
        </div>
    );
};

export default UserActivityList;

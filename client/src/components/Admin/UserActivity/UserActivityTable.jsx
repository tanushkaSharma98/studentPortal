import React, { useEffect, useState } from 'react';
import './UserActivityTable.css'; // Custom CSS for User Activity Table

const UserActivityTable = ({ userType, date }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:3000/api/admin/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (result.success) {
                    setActivities(result.data);
                }
            } catch (error) {
                console.error('Error fetching user activities:', error);
            }
        };

        fetchActivities();
    }, []);

    const filteredActivities = activities.filter((activity) => {
        // Filter by user type
        let isUserTypeMatch = true;
        if (userType === 'Teacher') {
            isUserTypeMatch = activity.user_type === 2;
        } else if (userType === 'Admin') {
            isUserTypeMatch = activity.user_type === 0 || activity.user_type === 3;
        } else if (userType === 'Student') {
            isUserTypeMatch = activity.user_type === 1;
        }

        // Filter by date
        let isDateMatch = true;
        if (date) {
            const activityDate = new Date(activity.timestamp).toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
            isDateMatch = activityDate === date;
        }

        return isUserTypeMatch && isDateMatch; // Return true if both filters match
    });

    return (
        <div className="user-activity-table">
            <h3>User Type: {userType}</h3>
            <table>
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Name</th>
                        <th>Timestamp</th>
                        <th>Event Type</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActivities.map((activity, index) => (
                        <tr key={activity.id}>
                            <td>{index + 1}</td>
                            <td>{activity.user_name}</td>
                            <td>{new Date(activity.timestamp).toLocaleString()}</td>
                            <td>{activity.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserActivityTable;

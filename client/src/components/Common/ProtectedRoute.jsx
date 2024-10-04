import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  const currentTime = new Date().getTime();

  // Check if token or expiration time is missing or expired
  if (!token || !tokenExpiration || currentTime > tokenExpiration) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    return <Navigate to="/login" state={{ message: 'Session expired. Please log in again.' }} />;
  }

  return element; // If token exists and is valid, return the element (page/component)
};

export default ProtectedRoute;

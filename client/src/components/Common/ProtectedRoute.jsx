// src/components/Common/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  // If token is not present, redirect to homepage
  if (!token) {
    return <Navigate to="/login" state={{ message: 'Token expired' }} />;
  }

  return element; // If token exists, return the element (page/component)
};

export default ProtectedRoute;

// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

  // Si no hay token, redirige al login
    if (!token) {
    return <Navigate to="/login" />;
    }

  // Si hay token, muestra el contenido
    return children;
}

export default ProtectedRoute;

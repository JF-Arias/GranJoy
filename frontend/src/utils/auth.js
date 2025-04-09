// src/utils/auth.js

// Verifica si hay un token almacenado
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // true si existe, false si no
    };
    
  // Elimina el token de autenticación
    export const logout = () => {
    localStorage.removeItem('token');
    };
    
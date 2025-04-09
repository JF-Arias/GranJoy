export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // true si hay token, false si no
    };
    
    // src/utils/auth.js

export const logout = () => {
    localStorage.removeItem('token');
    };  
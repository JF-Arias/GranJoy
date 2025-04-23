import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AvicolaPage from './pages/AvicolaPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserProfilePage from './pages/UserProfilePage';
import RecursosPage from './pages/RecursosPage'; 
import ProtectedRoute from './components/ProtectedRoute';
import ManageResourcesPage from './pages/ManageResourcesPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user-profile" 
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/avicola" 
          element={
            <ProtectedRoute>
              <AvicolaPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/recursos" 
          element={
            <ProtectedRoute>
              <RecursosPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manage-resources" 
          element={
            <ProtectedRoute>
              <ManageResourcesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

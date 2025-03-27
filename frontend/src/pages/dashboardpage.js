import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const navigate = useNavigate();

    const handleAvicultureClick = () => {
        alert('Navegando a Avicultura... (en desarrollo)');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Barra superior */}
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <button 
                    onClick={() => navigate('/user-profile')} 
                    className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
                    Usuario
                </button>
            </nav>

            {/* Contenido principal */}
            <div className="flex flex-col items-center justify-center h-full p-6">
                <h2 className="text-3xl font-bold mb-6">Panel de Usuario</h2>
                <button 
                    onClick={handleAvicultureClick} 
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
                    Avicultura
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;

import React from 'react';
//import { useNavigate } from 'react-router-dom';

function DashboardPage() {
//    const navigate = useNavigate();

    const handleAvicultureClick = () => {
    alert('Navegando a Avicultura... (en desarrollo)');
    };

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Panel de Usuario</h1>
        <div className="space-y-4">
        <button 
            onClick={handleAvicultureClick} 
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
            Avicultura
        </button>
        {/* Espacio para futuras expansiones */}
        </div>
    </div>
    );
}

export default DashboardPage;

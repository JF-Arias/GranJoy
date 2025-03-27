import React, { useState } from 'react';

function DashboardPage() {
    const [showMenu, setShowMenu] = useState(false);

    const handleAvicultureClick = () => {
        alert('Navegando a Avicultura... (en desarrollo)');
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        alert('Cerrando sesión...');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Barra superior */}
            <div className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="relative">
                    <button onClick={toggleMenu} className="px-4 py-2 bg-blue-700 rounded-full">👤</button>
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Ver Perfil</button>
                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Configurar Datos</button>
                            <button className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left">Eliminar Perfil</button>
                            <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Cerrar Sesión</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col items-center justify-center flex-grow p-4">
                <h2 className="text-3xl font-bold mb-6">Panel de Usuario</h2>
                <button 
                    onClick={handleAvicultureClick} 
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                    Avicultura
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;

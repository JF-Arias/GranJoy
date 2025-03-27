import React, { useEffect, useState } from 'react';

function UserProfilePage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token
                if (!token) {
                    setError('No hay token de autenticación.');
                    return;
                }

                const response = await fetch('http://localhost:3000/user-profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setUserData(data);
                } else {
                    setError(data.message || 'Error al obtener los datos.');
                }
            } catch (err) {
                setError('Error al conectar con el servidor.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
            {error && <p className="text-red-500">{error}</p>}
            {userData ? (
                <div className="bg-white p-6 rounded-lg shadow-md w-96">
                    {Object.entries(userData).map(([key, value]) => (
                        <p key={key} className="mb-2">
                            <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}
                        </p>
                    ))}
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
}

export default UserProfilePage;

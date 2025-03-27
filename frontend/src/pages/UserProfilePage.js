import React, { useEffect, useState } from 'react';

function UserProfilePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Aquí deberías hacer una petición al backend para obtener la info del usuario
        const fakeUser = {
            nombres: 'Juan',
            apellidos: 'Pérez',
            edad: 30,
            documento_identidad: '12345678',
            correo_electronico: 'juan.perez@example.com',
            telefono: '3001234567',
            departamento: 'Cundinamarca',
            municipio: 'Bogotá'
        };

        setUserData(fakeUser);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
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

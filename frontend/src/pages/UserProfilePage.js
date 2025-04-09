import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfilePage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ nombres: '', apellidos: '', correo_electronico: '', telefono: '' });
    const navigate = useNavigate(); // para redirigir

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("Token en frontend:", token);
                if (!token) {
                    setError('No hay token de autenticación.');
                    return;
                }

                const response = await fetch('http://localhost:3000/user/profile', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                if (response.ok) {
                    setUserData(data);
                    setFormData(data);
                } else {
                    setError(data.message || 'Error al obtener los datos.');
                }
            } catch (err) {
                setError('Error al conectar con el servidor.');
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/user/profile', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setUserData(formData);
                setEditMode(false);
            } else {
                setError(data.message || 'Error al actualizar.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/user/profile', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();
            if (response.ok) {
                alert('Cuenta eliminada correctamente.');
                localStorage.removeItem('token');
                navigate('/');
            } else {
                setError(data.message || 'Error al eliminar la cuenta.');
            }
        } catch (err) {
            setError('Error al conectar con el servidor.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirige a inicio
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
            {error && <p className="text-red-500">{error}</p>}
            {userData ? (
                editMode ? (
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Nombres" />
                        <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Apellidos" />
                        <input type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Correo Electrónico" />
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Teléfono" />
                        <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">Guardar</button>
                        <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancelar</button>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        {Object.entries(userData).map(([key, value]) => (
                            <p key={key} className="mb-2"><strong>{key.replace('_', ' ').toUpperCase()}:</strong> {value}</p>
                        ))}
                        <div className="flex flex-col gap-2">
                            <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Editar</button>
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">Eliminar Cuenta</button>
                            <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded-lg">Cerrar Sesión</button>
                        </div>
                    </div>
                )
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
}

export default UserProfilePage;

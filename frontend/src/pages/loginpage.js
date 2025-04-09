// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [formData, setFormData] = useState({
        correo_electronico: '',
        contrasena: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:3000/auth/validate-token', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    // Token válido → redirigir al dashboard
                    navigate('/dashboard', { replace: true });
                } else {
                    // Token inválido → eliminar y quedarse en login
                    localStorage.removeItem('token');
                }
            } catch (err) {
                console.error('Error al validar token:', err);
                localStorage.removeItem('token');
            }
        };

        validateToken();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Inicio de sesión exitoso');
                localStorage.setItem('token', data.token);
                navigate('/dashboard', { replace: true });
            } else {
                alert(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                <div className="mb-4">
                    <label className="block mb-1">Correo Electrónico:</label>
                    <input
                        type="email"
                        name="correo_electronico"
                        value={formData.correo_electronico}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contraseña:</label>
                    <input
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default LoginPage;

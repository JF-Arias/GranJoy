import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Asegúrate de que esta función retorne true si hay token

function LoginPage() {
    const [formData, setFormData] = useState({
    correo_electronico: '',
    contrasena: '',
    });

    const navigate = useNavigate();

  // Redirige inmediatamente si ya hay sesión activa
    useEffect(() => {
    if (isAuthenticated()) {
        navigate('/dashboard', { replace: true });
    }
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

  // Si ya está autenticado, no renderices el formulario
    if (isAuthenticated()) {
    return null; // o <p>Redirigiendo...</p>
    }

    return (
    <div>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Correo Electrónico:</label>
            <input
            type="email"
            name="correo_electronico"
            value={formData.correo_electronico}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label>Contraseña:</label>
            <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
            />
        </div>
        <button type="submit">Iniciar Sesión</button>
        </form>
    </div>
    );
}

export default LoginPage;

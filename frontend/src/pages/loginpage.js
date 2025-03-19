import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [formData, setFormData] = useState({
    correo_electronico: '',
    contrasena: '',
    });

    const navigate = useNavigate();

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
        localStorage.setItem('token', data.token); // Guardar el token en localStorage
        navigate('/dashboard');
        } else {
        alert(data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
    };

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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function RegisterPage() {
    const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    edad: '',
    documento_identidad: '',
    correo_electronico: '',
    contrasena: '',
    telefono: '',
    departamento: '',
    municipio: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Enviando a:', 'http://localhost:3000/auth/register');
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
        alert('Usuario registrado exitosamente');
        navigate('/login');
        } else {
        alert(data.message || 'Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
    };

    return (
    <div className="container">
        <h1>Registro de Usuario</h1>
        <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
            <div key={key}>
            <label>{key.replace('_', ' ').toUpperCase()}:</label>
            <input
                type={key === 'contrasena' ? 'password' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
            />
            </div>
        ))}
        <button type="submit">Registrarse</button>
        </form>
    </div>
    );
}

export default RegisterPage;

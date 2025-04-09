// src/pages/AvicolaPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AvicolaPage() {
    const [formData, setFormData] = useState({ nombre: '', direccion: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/granjas', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Granja registrada correctamente');
                navigate('/dashboard');
            } else {
                setError(data.message || 'Error al registrar la granja');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Registrar Granja Avícola</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre de la Granja"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border mb-4 rounded"
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border mb-4 rounded"
                />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Registrar
                </button>
            </form>
        </div>
    );
}

export default AvicolaPage;


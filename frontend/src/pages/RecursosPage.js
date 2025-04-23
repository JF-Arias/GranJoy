// src/pages/RecursosPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecursosPage() {
    const [granjas, setGranjas] = useState([]);
    const [formData, setFormData] = useState({
        grj_id: '',
        numero_gallinas: '',
        raza_gallinas: '',
        semanas_vida: '',
        estado: '1' // Por defecto activo
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const razasGallinas = [
        'Barrada', 'Blanca', 'Cuello Pelado', 'Hembra Campera',
        'Isazul', 'Isazul Morisca', 'Negra', 'Negra Nevada',
        'Roja', 'Sussex'
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('http://localhost:3000/granjas/mis-granjas', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                setGranjas(data);
            } else {
                setError('No se pudieron cargar las granjas');
            }
        })
        .catch(() => setError('Error al cargar las granjas'));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const payload = {
                ...formData,
                estado: parseInt(formData.estado) // convertir a número
            };

            const response = await fetch('http://localhost:3000/recursos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Recurso registrado correctamente');
                setFormData({
                    grj_id: '',
                    numero_gallinas: '',
                    raza_gallinas: '',
                    semanas_vida: '',
                    estado: '1'
                });
                navigate('/dashboard');
            } else {
                setError(data.message || 'Error al registrar recurso');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Registrar Recurso Avícola</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label className="block mb-2">Granja</label>
                <select
                    name="grj_id"
                    value={formData.grj_id}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border mb-4 rounded"
                >
                    <option value="">Selecciona una granja</option>
                    {granjas.map((granja) => (
                        <option key={granja.grj_id} value={granja.grj_id}>
                            {granja.nombre}
                        </option>
                    ))}
                </select>

                <label className="block mb-2">Número de Gallinas</label>
                <input
                    type="number"
                    name="numero_gallinas"
                    value={formData.numero_gallinas}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full p-2 border mb-4 rounded"
                />

                <label className="block mb-2">Raza de Gallinas</label>
                <select
                    name="raza_gallinas"
                    value={formData.raza_gallinas}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border mb-4 rounded"
                >
                    <option value="">Selecciona una raza</option>
                    {razasGallinas.map((raza, index) => (
                        <option key={index} value={raza}>{raza}</option>
                    ))}
                </select>

                <label className="block mb-2">Semanas de Vida</label>
                <input
                    type="number"
                    name="semanas_vida"
                    value={formData.semanas_vida}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full p-2 border mb-4 rounded"
                />

                <label className="block mb-2">Estado</label>
                <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border mb-4 rounded"
                >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Registrar Recurso
                </button>
            </form>
        </div>
    );
}

export default RecursosPage;

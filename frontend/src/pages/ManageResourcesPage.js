// src/pages/ManageResourcesPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageResourcesPage() {
    const [granjas, setGranjas] = useState([]);
    const [recursos, setRecursos] = useState([]);
    const [formData, setFormData] = useState({
        grj_id: '',
        numero_gallinas: '',
        raza_gallinas: '',
        semanas_vida: '',
        estado: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Obtener granjas
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

        // Obtener recursos avícolas
        fetch('http://localhost:3000/recursos', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setRecursos(data);
        })
        .catch(() => setError('Error al cargar los recursos'));
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar envío del formulario para agregar un nuevo recurso
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/recursos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Recurso registrado correctamente');
                setRecursos([...recursos, data]); // Añadir el nuevo recurso a la lista
                setFormData({
                    grj_id: '',
                    numero_gallinas: '',
                    raza_gallinas: '',
                    semanas_vida: '',
                    estado: ''
                });
            } else {
                setError(data.message || 'Error al registrar recurso');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    // Función para eliminar un recurso
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/recursos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setRecursos(recursos.filter(recurso => recurso.rcs_id !== id)); // Filtrar el recurso eliminado
                alert('Recurso eliminado correctamente');
            } else {
                setError('Error al eliminar el recurso');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Gestión de Recursos Avícolas</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Formulario para agregar recurso */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-bold mb-4">Registrar Recurso Avícola</h3>

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
                    <input
                        type="text"
                        name="raza_gallinas"
                        value={formData.raza_gallinas}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border mb-4 rounded"
                    />

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
                    <input
                        type="text"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border mb-4 rounded"
                    />

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Registrar Recurso
                    </button>
                </form>

                {/* Lista de recursos avícolas registrados */}
                <h3 className="text-xl font-bold mb-4">Recursos Registrados</h3>
                <div>
                    {recursos.length > 0 ? (
                        recursos.map((recurso) => (
                            <div key={recurso.rcs_id} className="mb-4 p-4 border rounded">
                                <h4 className="text-lg font-semibold">{recurso.raza_gallinas} - {recurso.numero_gallinas} Gallinas</h4>
                                <p><strong>Semanas de vida:</strong> {recurso.semanas_vida}</p>
                                <p><strong>Estado:</strong> {recurso.estado ? 'Activo' : 'Inactivo'}</p>
                                <p><strong>Granja:</strong> {recurso.grj_nombre}</p>

                                {/* Opciones: Editar y Eliminar */}
                                <div className="mt-2">
                                    <button
                                        onClick={() => navigate(`/edit-recurso/${recurso.rcs_id}`)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(recurso.rcs_id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay recursos registrados.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageResourcesPage;

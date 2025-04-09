// controllers/granjaController.js
const db = require('../db'); // Asegúrate de que este archivo exista y se conecte a tu BD

// Crear nueva granja
exports.crearGranja = async (req, res) => {
    try {
    const { usr_id, nombre, direccion } = req.body;

    if (!usr_id || !nombre || !direccion) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const query = `
        INSERT INTO Granjas (usr_id, nombre, direccion)
        VALUES (?, ?, ?)
    `;
    await db.query(query, [usr_id, nombre, direccion]);

    res.status(201).json({ message: 'Granja registrada exitosamente' });
    } catch (error) {
    console.error('Error al registrar granja:', error);
    res.status(500).json({ message: 'Error en el servidor' });
    }
};

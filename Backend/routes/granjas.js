const express = require('express');
const router = express.Router();
const { registrarGranja } = require('../controllers/granjaController'); // controlador para registrar granja
const pool = require('../db'); // conexión a la BD
const authMiddleware = require('../middlewares/authMiddleware'); // si usas auth

// Ruta para registrar una granja
router.post('/', authMiddleware, async (req, res) => {
    const { nombre, direccion } = req.body;
    const usr_id = req.user.usr_id; // asumimos que el middleware auth lo extrae del token

    if (!nombre || !direccion) {
        return res.status(400).json({ message: 'Nombre y dirección son requeridos.' });
    }

    try {
        const query = `
            INSERT INTO Granjas (usr_id, nombre, direccion)
            VALUES (?, ?, ?)
        `;
        await pool.query(query, [usr_id, nombre, direccion]);

        res.status(201).json({ message: 'Granja registrada correctamente.' });
    } catch (error) {
        console.error('Error al registrar granja:', error);
        res.status(500).json({ message: 'Error al registrar la granja.' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para autenticar
const pool = require('../db'); // Conexión a la BD

// Ruta para obtener el perfil del usuario
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extrae el ID del usuario autenticado
        const result = await pool.query('SELECT nombres, apellidos, correo_electronico, telefono FROM usuarios WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticación

// Obtener perfil del usuario autenticado
router.get('/user-profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.usr_id; // El ID del usuario viene del token

        const [user] = await pool.query('SELECT nombres, apellidos, edad, documento_identidad, correo_electronico, telefono, departamento, municipio FROM Usuarios WHERE usr_id = ?', [userId]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user[0]); // Enviar los datos del usuario
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos del usuario', error: error.message });
    }
});

module.exports = router;

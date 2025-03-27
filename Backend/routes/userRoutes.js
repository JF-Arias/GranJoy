const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para autenticar
const pool = require('../db'); // Conexión a la BD

// Ruta para obtener el perfil del usuario
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.usr_id; // Extrae el usr_id del usuario autenticado
        
        // Asegurarse de que el ID existe antes de hacer la consulta
        if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no proporcionado' });
        }

        // Corrección: usar usr_id en la consulta
        const result = await pool.query(
            'SELECT nombres, apellidos, correo_electronico, telefono FROM usuarios WHERE usr_id = ?', 
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]); // Retornar los datos del usuario
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
});

module.exports = router;

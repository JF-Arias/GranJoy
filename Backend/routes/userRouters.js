const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para obtener el perfil del usuario autenticado
router.get('/user-profile', authMiddleware, async (req, res) => {
    try {
        const [user] = await pool.query('SELECT * FROM Usuarios WHERE usr_id = ?', [req.user.usr_id]);
        
        if (!user.length) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user[0]); // Enviar los datos del usuario autenticado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener perfil de usuario' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../db');

// Ruta para obtener el perfil del usuario
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.usr_id; // Asegúrate de que el token contiene usr_id

        console.log("ID del usuario autenticado:", userId); // 🔍 Para depuración

        const [rows] = await pool.query(
            'SELECT nombres, apellidos, correo_electronico, telefono FROM usuarios WHERE usr_id = ?', 
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
});


router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.usr_id; // ID del usuario autenticado
        const { nombres, apellidos, correo_electronico, telefono } = req.body;

        const [result] = await pool.query(
            'UPDATE usuarios SET nombres = ?, apellidos = ?, correo_electronico = ?, telefono = ? WHERE usr_id = ?',
            [nombres, apellidos, correo_electronico, telefono, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o sin cambios' });
        }

        res.json({ message: 'Perfil actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
    }
});


router.delete('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.usr_id;

        const [result] = await pool.query('DELETE FROM usuarios WHERE usr_id = ?', [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Cuenta eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la cuenta', error: error.message });
    }
});


module.exports = router;
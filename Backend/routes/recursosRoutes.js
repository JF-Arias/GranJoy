// routes/recursosRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../db');

// Registrar recurso avícola
router.post('/', authMiddleware, async (req, res) => {
    const { grj_id, numero_gallinas, raza_gallinas, semanas_vida, estado } = req.body;

    if (!grj_id || !numero_gallinas || !raza_gallinas || !semanas_vida || estado === undefined) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const query = `
            INSERT INTO recursos (grj_id, numero_gallinas, raza_gallinas, semanas_vida, estado)
            VALUES (?, ?, ?, ?, ?)
        `;
        await pool.query(query, [grj_id, numero_gallinas, raza_gallinas, semanas_vida, estado]);

        res.status(201).json({ message: 'Recurso registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar recurso:', error);
        res.status(500).json({ message: 'Error al registrar el recurso' });
    }
});

module.exports = router;

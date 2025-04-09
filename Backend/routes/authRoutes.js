const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); // 

/* Rutas de autenticación */
router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta para validar si el token es válido
router.get('/validate-token', authMiddleware, (req, res) => {
    res.json({ valid: true, user: req.user });
});

module.exports = router;

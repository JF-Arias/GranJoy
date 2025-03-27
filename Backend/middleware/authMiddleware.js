const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token faltante' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guarda los datos del usuario en la solicitud
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
console.log("Encabezados recibidos:", req.headers);

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decodificado:", decoded); // 👀 Ver qué contiene el token
        
        if (!decoded.usr_id) {
            return res.status(401).json({ message: 'Token inválido: No contiene usr_id' });
        }

        req.user = decoded; // Asegurar que req.user tiene usr_id
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido', error: error.message });
    }
};

const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    const { nombres, apellidos, edad, documento_identidad, correo_electronico, contrasena, telefono, departamento, municipio } = req.body;

    try {
    // Verifica si el correo ya está registrado
    const [existingUser] = await pool.query('SELECT * FROM Usuarios WHERE correo_electronico = ?', [correo_electronico]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Inserta el nuevo usuario
    await pool.query(
        `INSERT INTO Usuarios (nombres, apellidos, edad, documento_identidad, correo_electronico, contrasena, telefono, departamento, municipio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombres, apellidos, edad, documento_identidad, correo_electronico, hashedPassword, telefono, departamento, municipio]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;

    try {
    // Busca el usuario por correo
    const [user] = await pool.query('SELECT * FROM Usuarios WHERE correo_electronico = ?', [correo_electronico]);
    if (user.length === 0) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Verifica la contraseña
    const validPassword = await bcrypt.compare(contrasena, user[0].contrasena);
    if (!validPassword) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Genera el token
    const token = jwt.sign({ usr_id: user[0].usr_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

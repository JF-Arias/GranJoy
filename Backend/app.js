require('dotenv').config();
const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;
const authRoutes = require('./routes/authRoutes');



app.use(express.json());

// Rutas
app.use('/auth', authRoutes);

// Ruta de prueba de conexión
//app.get('/test', async (req, res) => {
//    try {
//    const [rows] = await pool.query('SELECT 1 + 1 AS result');
//    res.json({ message: 'Conexión exitosa', result: rows[0].result });
//    } catch (error) {
//    res.status(500).json({ message: 'Error de conexión', error });
//    }
//});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

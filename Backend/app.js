require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 3000;
const authRoutes = require('./routes/authRoutes');

// Habilita CORS para que el frontend pueda comunicarse con el backend
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

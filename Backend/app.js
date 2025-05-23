require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 3000;
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const granjasRoutes = require('./routes/granjas');
const recursosRoutes = require('./routes/recursosRoutes'); // Asegúrate de tener este archivo creado



// Habilita CORS para que el frontend pueda comunicarse con el backend
app.use(cors({
    origin: 'http://localhost:3001', // Cambia esto por la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/granjas',granjasRoutes);
app.use('/recursos', recursosRoutes); // Asegúrate de tener este archivo creado


// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');

const commerceRoutes = require('./routes/commerce.routes');

const app = express();

// ✅ Railway usa el puerto por variable de entorno
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz (Railway la agradece)
app.get('/', (req, res) => {
    res.status(200).send('API OK 🚀');
});

// Rutas
app.use('/api/commerce', commerceRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

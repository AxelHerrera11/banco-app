const express = require('express');
const app = express();

app.use(express.json());

// importar rutas
const clienteRoutes = require('./routes/clienteRoutes');

app.use('/api', clienteRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});
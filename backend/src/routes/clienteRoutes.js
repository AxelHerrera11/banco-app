const express = require('express');
const router = express.Router();
const { getClientes } = require('../controllers/clienteController');

router.get('/clientes', getClientes);

module.exports = router;
const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuentaController');

router.post('/movimiento', cuentaController.movimientoCuenta);
router.post('/transferencia', cuentaController.transferencia);

module.exports = router;
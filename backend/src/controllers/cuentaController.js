const { pool, sql, poolConnect } = require('../config/db');

const movimientoCuenta = async (req, res) => {
    try {
        const { id_cuenta, monto, tipo } = req.body;

        await poolConnect;

        await pool.request()
            .input('Id_Cuenta', sql.VarChar, id_cuenta)
            .input('Monto', sql.Decimal(18,2), monto)
            .input('TipoMov', sql.Int, tipo)
            .execute('sp_MovimientoCuenta');

        res.json({
            mensaje: 'Transacción realizada correctamente'
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

const transferencia = async (req, res) => {
    try {
        const { cuenta_origen, cuenta_destino, monto } = req.body;

        await poolConnect;

        await pool.request()
            .input('Cuenta_Origen', sql.VarChar, cuenta_origen)
            .input('Cuenta_Destino', sql.VarChar, cuenta_destino)
            .input('Monto', sql.Decimal(18,2), monto)
            .execute('sp_Transferencia');

        res.json({
            mensaje: 'Transferencia realizada correctamente'
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

module.exports = {
    movimientoCuenta
};
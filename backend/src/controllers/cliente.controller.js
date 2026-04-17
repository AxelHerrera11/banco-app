const { pool, poolConnect, sql } = require('../config/db');

// ==========================
// CREATE
// ==========================
const createCliente = async (req, res) => {
    const { id, nombre, apellido, direccion, telefono, fecha_nac } = req.body;

    try {
        await poolConnect;

        await pool.request()
            .input('Id_Cliente', sql.Int, id)
            .input('Nombre', sql.VarChar, nombre)
            .input('Apellido', sql.VarChar, apellido)
            .input('Direccion', sql.VarChar, direccion)
            .input('Telefono', sql.VarChar, telefono)
            .input('Fecha_Nac', sql.Date, fecha_nac)
            .execute('sp_Cliente_Create');

        res.json({ message: 'Cliente creado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
};

// ==========================
// GET ALL
// ==========================
const getClientes = async (req, res) => {
    try {
        await poolConnect;

        const result = await pool.request()
            .execute('sp_Cliente_GetAll');

        res.json(result.recordset);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};

// ==========================
// GET BY ID
// ==========================
const getCliente = async (req, res) => {
    const { id } = req.params;

    try {
        await poolConnect;

        const result = await pool.request()
            .input('Id_Cliente', sql.Int, id)
            .execute('sp_Cliente_GetById');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(result.recordset[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener cliente' });
    }
};

// ==========================
// UPDATE
// ==========================
const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, direccion, telefono, fecha_nac } = req.body;

    try {
        await poolConnect;

        await pool.request()
            .input('Id_Cliente', sql.Int, id)
            .input('Nombre', sql.VarChar, nombre)
            .input('Apellido', sql.VarChar, apellido)
            .input('Direccion', sql.VarChar, direccion)
            .input('Telefono', sql.VarChar, telefono)
            .input('Fecha_Nac', sql.Date, fecha_nac)
            .execute('sp_Cliente_Update');

        res.json({ message: 'Cliente actualizado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
};

// ==========================
// DELETE (soft)
// ==========================
const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        await poolConnect;

        await pool.request()
            .input('Id_Cliente', sql.Int, id)
            .execute('sp_Cliente_Delete');

        res.json({ message: 'Cliente desactivado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
};

// ==========================
// RESTORE
// ==========================
const restoreCliente = async (req, res) => {
    const { id } = req.params;

    try {
        await poolConnect;

        await pool.request()
            .input('Id_Cliente', sql.Int, id)
            .execute('sp_Cliente_Restore');

        res.json({ message: 'Cliente reactivado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al reactivar cliente' });
    }
};

module.exports = {
    createCliente,
    getClientes,
    getCliente,
    updateCliente,
    deleteCliente,
    restoreCliente
};
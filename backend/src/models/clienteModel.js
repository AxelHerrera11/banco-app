const { pool, poolConnect } = require('../config/db');

const obtenerClientes = async () => {
    await poolConnect;
    const result = await pool.request().query('SELECT * FROM Cliente');
    return result.recordset;
};

const crearCliente = async (cliente) => {
    const { nombre, apellido, direccion, telefono } = cliente;

    await poolConnect;

    const result = await pool.request()
        .input('Nombre', nombre)
        .input('Apellido', apellido)
        .input('Direccion', direccion)
        .input('Telefono', telefono)
        .query(`
      INSERT INTO Cliente (Nombre, Apellido, Direccion, Telefono)
      VALUES (@Nombre, @Apellido, @Direccion, @Telefono);

      SELECT SCOPE_IDENTITY() AS id;
    `);

    return result.recordset[0];
};

module.exports = {
    obtenerClientes
};
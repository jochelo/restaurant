const db = require('../db');
const bq = require('../helpers/bcrypt');
const Usuario = {};

Usuario.get = async () => {
    return await db.query(`select * from usuarios`);
};

Usuario.find = async (id) => {
    return await db.query(`select * from usuarios where id=?`, [id]);
};

Usuario.findCuenta = async (cuenta) => {
    return await db.query(`select * from usuarios where cuenta=?`, [cuenta]);
};

Usuario.create = async (data) => {

    try {
        data.password = bq.encrypt(data.password);
        const insertar = await db.query(`insert into usuarios set ?`, [data]);
        if (insertar === 'error') {
            console.error('ERROR');
        } else {
            return insertar;
        }
    } catch (e) {
        console.error(e);
    }
};



module.exports = Usuario;
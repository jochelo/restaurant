const db = require('../db');
const Plato = {};

Plato.get = async () => {
    return await db.query(`select * from platos`);
};

Plato.find = async (id) => {
    return await db.query(`select * from platos where id=?`, [id]);
};

Plato.create = async (data) => {

    try {
        const insertar = await db.query(`insert into platos set ?`, [data]);
        if (insertar === 'error') {
            console.error('ERROR');
        } else {
            return insertar;
        }
    } catch (e) {
        console.error(e);
    }
};

Plato.update = async (id, data) => {
    try {
        const actualizar = await db.query(`update platos set ? where id=?`, [data, id]);
        if (actualizar === 'error') {
            console.error('ERROR');
        } else {
            return actualizar;
        }
    } catch (e) {
        console.error(e);
    }
};

Plato.delete = async (id) => {
    return await db.query(`delete from platos where id=?`, [id]);
};

module.exports = Plato;
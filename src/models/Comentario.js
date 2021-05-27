const db = require('../db');
const Comentario = {};

Comentario.get = async () => {
    return await db.query(`select * from comentarios`);
};

Comentario.create = async (data) => {

    try {
        const insertar = await db.query(`insert into comentarios set ?`, [data]);
        if (insertar === 'error') {
            console.error('ERROR');
        } else {
            return insertar;
        }
    } catch (e) {
        console.error(e);
    }
};



module.exports = Comentario;
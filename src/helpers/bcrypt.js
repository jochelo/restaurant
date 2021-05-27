const bcrypt = require('bcryptjs');

const bq = {};

bq.encrypt = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

bq.verifyPassword = (pass, passEncrypt) => {
    return bcrypt.compareSync(pass, passEncrypt);
}

module.exports = bq;
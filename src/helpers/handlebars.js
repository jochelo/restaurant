const moment = require('moment');

const helpers = {};

helpers.dateLit = (date) => {
    moment.locale('es');
    return moment(date).format('LLLL');
}

helpers.json = (obj) => {
    return JSON.stringify(obj);
}


module.exports = helpers;
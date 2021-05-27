const passport = require('passport');
const Usuario = require('../models/Usuario');
const LocalStrategy = require('passport-local').Strategy;
const bq = require('./bcrypt');

passport.use('auth', new LocalStrategy({
    usernameField: 'cuenta',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, cuenta, password, done) => {
    const registros = await Usuario.findCuenta(cuenta);
    // console.log(registros);

    if (registros.length > 0) {
        const usuario = registros[0];
        if (bq.verifyPassword(password, usuario.password)) {
            console.log('Credenciales correctas');
            done(null, usuario);
        } else {
            console.log('Contraseña incorrecta');
            done(null, false);
        }
    } else {
        console.log('La cuenta no existe');
        done(null, false);
    }
}));


passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuario.find(id);
    done(null, usuario[0]);
})
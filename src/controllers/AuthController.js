const passport = require('passport');
const AuthController = {};

AuthController.auth = (req, res, next) => {
    // el usuario existe??
    passport.authenticate('auth', {
        successRedirect: '/admin',
        failureRedirect: '/login'
    })(req, res, next);
}

AuthController.admin = (req, res) => {
    res.render('admin/dashboard');
}

AuthController.logout = (req, res) => {
    req.logOut();
    res.redirect('/');
}

module.exports = AuthController;
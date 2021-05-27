const express = require('express');
const ehbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const {urlencoded, json} = require('express');
const session = require('express-session');
const MySQLSession = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');

const app = express();
require('./helpers/passport');


app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(json());

app.use(session({
   secret: 'restaurat-session',
   resave: false,
   saveUninitialized: false,
   store: new MySQLSession(database)
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Motor de plantillas  HANDLEBARS
 * */
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', ehbs({
   defaultLayout: 'app',
   extname: '.hbs',
   helpers: require('./helpers/handlebars')
}));
app.set('view engine', '.hbs');

/**
 * VARIABLES GLOBALES
 * */
app.use((req, res, next) => {
   res.locals.usuario = req.user;
   next();
})

/**
 * RUTAS
 * */

app.use(require('./routes'));
app.use(require('./routes/comentario'));
app.use(require('./routes/usuario'));
app.use(require('./routes/auth'));
app.use(require('./routes/admin'));


/**
 * PUBLIC
 * */

app.use(express.static(path.join(__dirname, 'public')));

/**
 * EJECUTAR SERVIDOR
 * */
app.listen(3000, '192.168.1.12',() => {
   console.log('Servidor Ejecutandose');
});


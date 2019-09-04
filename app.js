// Llamado de paquetes instalados
const bodyParser = require('body-parser'),
    express = require('express'),
    flash = require('connect-flash'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session');
// Llamado de variables locales
const { config } = require('./src/config/config-app'),
    mainRoutes = require('./src/routes/routes-main'),
    profileRoutes = require('./src/routes/routes-profile');
// Configuración de la aplicación
const app = express();
// conexión a base de datos
require('./src/config/database');
// configuración de passport
// require('./src/config/passport');
// Configuración del puerto
app.set('port', process.env.PORT || 3000);
// Seteamos vistas
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'pug');
////////////////
// MIDDLEWARES//
////////////////
// Log de requests al servidor
app.use(logger('dev'));
// Sesión guardada
app.use(
    session({
        secret: config.secret,
        resave: true,
        saveUninitialized: true
    })
);
// Init Passport
// app.use(passport.initialize());
// Guardamos sesión
// app.use(passport.session());
// Envío de mensajes entre vistas
app.use(flash());
// Variables globales
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
// Seteo carpeta Public
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendors', express.static(path.join(__dirname, 'node_modules')));
// Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
////////////
// ROUTES //
////////////
app.use(mainRoutes);
app.use(profileRoutes);
app.get('*', (req, res) => {
    res.status(404).render('errors/404', { title: 'Error 404' });
});
//////////////////
// INIT SERVIDOR//
//////////////////
const server = app.listen(app.get('port'), function() {
    console.log(`Escuchando http://localhost:${server.address().port}`);
});

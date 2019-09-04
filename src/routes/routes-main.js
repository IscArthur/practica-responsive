const express = require('express'),
    router = express.Router();

const { config } = require('../config/config-app');
// Login route
router.get('/', (req, res) => {
    res.render('sections/login', {
        title: 'Iniciar Sesión'
    });
});
router.post('/login', (req, res) => {
    res.redirect('/inicio');
});
// Register route
router.get('/registro', (req, res) => {
    res.render('sections/register', {
        title: 'Registro'
    });
});
router.post('/registro', (req, res) => {
    res.redirect('/');
});
// Home when logged in
router.get('/inicio', (req, res) => {
    res.render('sections/home', {
        title: 'Inicio'
    });
});
router.get('/practica', (req, res) => {
    res.render('sections/practica-1', {
        title: 'Práctica 1'
    });
});

module.exports = router;

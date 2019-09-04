const express = require('express'),
    router = express.Router();

const { config } = require('../config/config-app');
// Profile route
router.get('/perfil', (req, res) => {
    res.render('sections/profile', {
        title: 'Perfil | Rodrigo García'
    });
});
// Account route
router.get('/perfil/cuenta', (req, res) => {
    res.render('sections/account', {
        title: 'Perfil | Rodrigo García'
    });
});
// Account purchase history
router.get('/perfil/historial', (req, res) => {
    res.render('sections/history', {
        title: 'Perfil | Rodrigo García'
    });
});

module.exports = router;

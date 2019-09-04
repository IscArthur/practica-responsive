const { config } = require('./config-app'),
    url = `mongodb://localhost/${config.dbName}`,
    mongoose = require('mongoose');

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(db => console.log(`Conectado a la BD ${config.dbName}`))
    .catch(err => console.log(err));

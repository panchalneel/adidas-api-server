let express = require('express');
let app = express();
global.ROOT_PATH = __dirname;
const config = require('./config/environments');
global.config = config;
const path = require('path');
const fs = require('fs');

global.wishList = {};
global.counter = 1;

//Configure application
require('./config/express')(app);

app.use(express.static('dist'));
let Module = require('./modules');
new Module(app);

// To Send 404 if any route not found
app.use(function (req, res) {
    console.log('Not found');
    let exception = new Exception('NotFound');
    res.status(exception.http_code);
    delete  exception.error_name;
    delete exception.http_code;
    return res.send({"error": [exception]});
});

process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log(err)
});

module.exports = app;
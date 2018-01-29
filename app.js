let express = require('express');
let app = express();
const config = require('./config/environments');
global.config = config;

global.wishList = {};
global.counter = 1;

//Configure application
require('./config/express')(app);

app.use(express.static('dist'));
let Module = require('./modules');
new Module(app);

// To Send 404 if any route not found
app.use(function (req, res) {
    logger.trace(new Date());
    logger.warn('Route not found');
    logger.error("Invalid request came on server");
    res.status(404);
    return res.send({
        "error": [{
            "code": "4005",
            "error_message": "You have entered incorrect url."
        }]
    });
});

process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log(err)
});

module.exports = app;
var app = require('./app');
var server = app.listen(config.server.port, () => {
    logger.info(`Server listening on ${server.address().address} @ ${server.address().port}`);
});app.js
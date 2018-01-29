var app = require('./app');

const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, () => {
    logger.info(`Server listening on ${server.address().address} @ ${server.address().port}`);
    //logger.trace(`Server listening on ${server.address().address} @ ${server.address().port}`);
});app.js
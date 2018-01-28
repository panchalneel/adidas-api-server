/*
 Endpoints which don't require authentication
 */
let byPassedEndpoints = [];
let fs = require('fs');
module.exports = class Modules {
    constructor(app) {
        // Configure local auth check
        app.use((req, res, next) => {
            next();
        })
        this.setupRoutes(app);
    }

    setupRoutes(app) {
        fs.readdirSync(__dirname + '/').filter(function (file) {
            var stats = fs.statSync(__dirname + '/' + file);
            return (file.indexOf('.') !== 0 && stats.isDirectory());
        }).forEach(function (file) {
            console.log(__dirname + '/' + file);
            let tmpRoute = require(__dirname + '/' + file);
            new tmpRoute(app);
        });
    }
};

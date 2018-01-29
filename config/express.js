'use strict';

module.exports = (app) => {
    let express = require('express');
    let morgan = require('morgan');
    let errorHandler = require('errorhandler');

    //Setup Logger
    let Logger = require('../libs/logger');
    global.logger = new Logger();

    //Setup Exception Class
    let exceptions = require('./exceptions.json');

    //Add morgan to console the request
    app.use(morgan('dev'));

    //Set cross origin options
    setupCORS(app);

    //Setup default app headers
    app.enable('trust proxy');
    app.disable('x-powered-by');

    //Configure application
    configureApp(app);

    // setup static assets rendering
    app.use(express.static(getAppPath(app)));

    // setup error handler
    app.use(errorHandler());
};

function setupCORS(app) {
    let cors = require('cors');
    let corsOptions = {
        origin: '*'
    };
    app.use(cors(corsOptions));
}

function getAppPath(app) {
    let path = require('path');
    let config = require('./environments');
    let env = app.get('env');
    //set app path to point to
    if ('production' === env || 'staging' === env || 'dev' === env) {
        return path.join(config.root, 'public');
    } else if ('development' === env || 'test' === env) {
        return path.join(config.root, '../build');
    }
}

function configureApp(app) {
    let bodyParser = require('body-parser');
    let methodOverride = require('method-override');
    let cookieParser = require('cookie-parser');
    let config = require('./environments');


    //setup bodyparser
    app.use(bodyParser.json({type: 'application/*+json', limit: '500mb'}));
    app.use(bodyParser.json({type: 'application/json', limit: '500mb'}));
    app.use(bodyParser.urlencoded({extended: false, limit: '500mb'}));

    //setup views
    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    //setup method override
    app.use(methodOverride());

    //let Response = require('../libs/response');
    //let response = new Response();
    //app.use(response.handler());

    app.use(cookieParser());
    app.set('appPath', getAppPath(app));
}
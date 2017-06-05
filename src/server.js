'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'mysite-rest-server'});

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const Promise = require('bluebird');

const healthCheckHandler = require('./handlers/healthCheckHandler');
const privateHandler = require('./handlers/privateHandler');
const errorHandler = require('./handlers/errorHandler');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = 'very secret';

// Setup middleware
app.use(cors());
app.use(router);
app.use(helmet());
app.use(bodyParser.json());

// Setup routes
app.use('/health-check', healthCheckHandler);
app.use('/api/v1/content/private', privateHandler);
app.use(errorHandler);

// Static material served by express
// TODO: application LB needs better url
const publicStaticImagesUrl = "/public/static/images";
const publicImagesDirectory = "public/images";
const configVersion = config.get("ConfigMetadata.description") + " version: " + config.get("ConfigMetadata.version");

logger.info("Running " + configVersion);
logger.info("Serving images folder '/%s' from url '%s'", publicImagesDirectory, publicStaticImagesUrl);
app.use(publicStaticImagesUrl, express.static(publicImagesDirectory));

// Server startup
MongoClient.connect(config.get("MongoDb.connectionUrl"), { promiseLibrary: Promise })
    .catch(err => logger.error(err, 'Error connecting to MongoDB!'))
    .then(db => {
        app.locals.db = db;
        app.listen(8090, () => logger.info('Server started at port 8090'));
    });


module.exports = app;
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const Promise = require('bluebird');
const rootHandler = require('./handlers/rootHandler');
const errorHandler = require('./handlers/errorHandler')
const MongoClient = require('mongodb').MongoClient;
const config = require('config');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/', rootHandler);
app.use(errorHandler);

MongoClient.connect(config.get("mongoDb.connectionUrl"), { promiseLibrary: Promise })
    .catch(err => console.log(err.stack))
    .then(db => {
        app.locals.db = db;
        app.listen(8090, () => console.log('Server started at port 8090'));
        });


module.exports = app;
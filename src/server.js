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

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/', rootHandler);
app.use(errorHandler);

MongoClient.connect("mongodb://:@ds049476.mlab.com:49476/mysite",{ promiseLibrary: Promise })
    .catch(err => console.log(err.stack))
    .then(db => {
        app.locals.db = db;
        app.listen(8090, () => console.log('Server started at port 8090'));
        });


module.exports = app;
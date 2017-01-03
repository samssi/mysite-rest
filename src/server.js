'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const Promise = require('bluebird');
const rootHandler = require('./handlers/rootHandler');
const errorHandler = require('./handlers/errorHandler');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secret = 'very secret';

app.use(cors());

function requireToken(req, res, next) {
    console.log('route protection!');
    const token = req.get('Authorization');
    console.log('Request headers: ' + token);

    if (token) {
        console.log('token found: ' + token);
        returnTokenOrFail(token, next, req, res);
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

function returnTokenOrFail(token, next, req, res) {
    jwt.verify(token, secret, function(err, decodedToken) {
        if(!err) {
            req.decodedToken = decodedToken;
            next();
        }
        else {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
    });
}

app.all("/contents/*", requireToken, function(req, res, next) {
    next();
});

app.use(router);

app.use(helmet());
app.use(bodyParser.json());
app.use('/images', express.static('images'));

app.use('/', rootHandler);
app.use(errorHandler);

MongoClient.connect(config.get("mongoDb.connectionUrl"), { promiseLibrary: Promise })
    .catch(err => console.log(err.stack))
    .then(db => {
        app.locals.db = db;
        app.listen(8090, () => console.log('Server started at port 8090'));
    });


module.exports = app;
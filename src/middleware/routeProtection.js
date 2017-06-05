'use strict';

const config = require('config');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'mysite-rest-routeProtection'});

const jwt = require('jsonwebtoken');
const secret = config.get("JWT.secret");

const requireToken = function (req, res, next) {
    const token = req.get("Authorization");

    if (token) {
        returnTokenOrFail(token, next, req, res);
    }
    else {
        logger.warn("Resource request without token provided!");
        return res.status(403).send({ message: 'No token provided.' });
    }
};

function returnTokenOrFail(token, next, req, res) {
    jwt.verify(token, secret, function(err, decodedToken) {
        if(!err) {
            res.locals.decodedToken = decodedToken;
            next();
        }
        else if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token expired.' });
        }
        else {
            logger.warn("Invalid token authorization attempt!");
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
    });
}

module.exports = { requireToken };
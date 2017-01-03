'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const secret = 'very secret';

const requireToken = function (req, res, next) {
    console.log('foo');
    const token = req.get('Authorization');

    if (token) {
        console.log('Verifying token: ' + token);
        returnTokenOrFail(token, next, req, res);
    }
    else {
        console.log('No token was provided!');
        return res.status(403).send({ message: 'No token provided.' });
    }
};

function returnTokenOrFail(token, next, req, res) {
    jwt.verify(token, secret, function(err, decodedToken) {
        if(!err) {
            console.log('Request made by: ' + decodedToken.sub);
            req.decodedToken = decodedToken;
            next();
        }
        else if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token expired.' });
        }
        else {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
    });
}

module.exports = { requireToken };
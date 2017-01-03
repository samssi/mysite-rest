'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'very secret';

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

module.exports = { requireToken }
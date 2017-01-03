'use strict';

const express = require('express');
const contentHandle = require('../handles/contentHandle');
const router = express.Router();
const app = express();

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

router.get('/contents/personals', contentHandle.personalInfosHandle);
router.get('/contents/experiences', contentHandle.experiencesHandle);

module.exports = router;
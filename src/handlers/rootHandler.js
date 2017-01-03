'use strict';

const express = require('express');
const contentHandle = require('../handles/contentHandle');
const router = express.Router();
const app = express();
const routeProtection = require('../middleware/routeProtection');

app.all("/contents/*", routeProtection.requireToken, function(req, res, next) {
    next();
});

router.get('/contents/personals', contentHandle.personalInfosHandle);
router.get('/contents/experiences', contentHandle.experiencesHandle);

module.exports = router;
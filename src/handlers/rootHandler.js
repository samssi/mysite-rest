'use strict';

const express = require('express');
const contentHandle = require('../handles/contentHandle');
const router = express.Router();
const routeProtection = require('../middleware/routeProtection');

router.all("/contents/*", routeProtection.requireToken);

router.get('/contents/personals', contentHandle.personalInfosHandle);
router.get('/contents/experiences', contentHandle.experiencesHandle);

module.exports = router;
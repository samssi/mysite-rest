'use strict';

const express = require('express');
const contentHandle = require('../handles/contentHandle');
const router = express.Router();
const routeProtection = require('../middleware/routeProtection');

router.all("/private/*", routeProtection.requireToken);

router.get('/private/contents/applications', contentHandle.applicationHandle);
router.get('/private/contents/personals', contentHandle.personalInfosHandle);
router.get('/private/contents/experiences', contentHandle.experiencesHandle);

module.exports = router;
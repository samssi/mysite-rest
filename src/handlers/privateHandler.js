'use strict';

const express = require('express');
const contentHandle = require('../handles/contentHandle');
const router = express.Router();
const routeProtection = require('../middleware/routeProtection');

router.all("/*", routeProtection.requireToken);

router.get('/contents/applications', contentHandle.applicationHandle);
router.get('/contents/personals', contentHandle.personalInfosHandle);
router.get('/contents/experiences', contentHandle.experiencesHandle);
router.get('/contents/portfolios', contentHandle.portfoliosHandle);

module.exports = router;
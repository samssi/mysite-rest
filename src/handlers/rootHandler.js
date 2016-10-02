'use strict';

const express = require('express');
const contentHandle = require('../handles/contentHandle');
const router = express.Router();

router.get('/contents/personals', contentHandle);

module.exports = router;
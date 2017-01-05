'use strict';

const express = require('express');
const contentHandle = require('../handles/contentHandle');
const router = express.Router();
const routeProtection = require('../middleware/routeProtection');

router.all("/*", routeProtection.requireToken);

router.get('/contents/applications', function(req,res) {contentHandle.singleDocumentHandle(req, res, "application")});
router.get('/contents/personals', function(req,res) {contentHandle.singleDocumentHandle(req, res, "personalInfo")});
router.get('/contents/experiences', function(req,res) {contentHandle.multiDocumentHandle(req, res, "experience")});
router.get('/contents/portfolios', function(req,res) {contentHandle.multiDocumentHandle(req, res, "portfolio")});

module.exports = router;
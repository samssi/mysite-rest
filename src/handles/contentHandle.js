'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'mysite-rest-contentHandle'});

const content = require('../service/contentService');

function personalInfosHandle(req, res) {
    logger.info("User '%s' requested for personalInformation", req.app.locals.decodedToken.sub);
    const db = req.app.locals.db;
    content.getFirst(db, "personalInfo", res);
}

function experiencesHandle(req, res) {
    logger.info("User '%s' requested for experienceInformation", req.app.locals.decodedToken.sub);
    const db = req.app.locals.db;
    content.getAll(db, "experience", res);
}

function applicationHandle(req, res) {
    logRequest(req, "application");
    const db = req.app.locals.db;
    content.getFirst(db, "application", res);
}

function portfoliosHandle(req, res) {
    logRequest(req, "portfolio");
    const db = req.app.locals.db;
    content.getAll(db, "portfolio", res);
}

function logRequest(req, handleDescription) {
    logger.info("User '%s' requested for %s", req.app.locals.decodedToken.sub, handleDescription);
}

module.exports = { personalInfosHandle, experiencesHandle, applicationHandle, portfoliosHandle };
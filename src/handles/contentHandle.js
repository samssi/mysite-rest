'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'mysite-contentHandle'});

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

module.exports = { personalInfosHandle, experiencesHandle };
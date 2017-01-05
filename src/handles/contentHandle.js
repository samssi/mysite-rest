'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'mysite-rest-contentHandle'});

const mongoDbService = require('../service/mongoDbService');

function singleDocumentHandle(req, res, document) {
    logRequest(req, document);
    const db = req.app.locals.db;
    mongoDbService.getFirst(db, document, res);
}

function multiDocumentHandle(req, res, document) {
    logRequest(req, document);
    const db = req.app.locals.db;
    mongoDbService.getAll(db, document, res);
}

function logRequest(req, document) {
    logger.info("User '%s' requested for %s", req.app.locals.decodedToken.sub, document);
}

module.exports = { singleDocumentHandle, multiDocumentHandle };
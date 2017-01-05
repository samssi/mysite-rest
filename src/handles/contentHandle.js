'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'mysite-rest-contentHandle'});

const mongoDbService = require('../service/mongoDbService');

function singleDocumentHandle(req, res, document) {
    executeRequest(req, res, document, mongoDbService.getFirst);
}

function multiDocumentHandle(req, res, document) {
    executeRequest(req, res, document, mongoDbService.getAll);
}

function executeRequest(req, res, document, func) {
    logger.info("User '%s' requested for %s", req.app.locals.decodedToken.sub, document);
    const db = req.app.locals.db;
    func(db, document, res);
}

module.exports = { singleDocumentHandle, multiDocumentHandle };
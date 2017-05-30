'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'mysite-rest-mongoDbService'});

function executeDbRequest(req, res, document, func) {
    logger.info("User '%s' requested for %s", req.app.locals.decodedToken.sub, document);
    const db = req.app.locals.db;
    func(db, document, res);
}


function getFirst(db, collection, res) {
    db.collection(collection).findOne(function(err, results) {returnResults(err, results, res)});
}

function getAll(db, collection, res) {
    db.collection(collection).find().sort({order: 1}).toArray(function(err, results) {returnResults(err, results, res)});
}

function returnResults(err, results, res) {
    if (err) {
        logger.error(err, "Error finding collection: " + collection);
        res.sendStatus(500);
    }
    res.status(200).send(results);
}

module.exports = {getAll, getFirst, executeDbRequest };
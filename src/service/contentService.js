'use strict';

const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: 'mysite-rest-contentService'});

function getFirst(db, collection, res) {
    db.collection(collection).findOne(function(err, results) {
        if (err) {
            logger.error(err, "Error finding collection: " + collection);
            res.sendStatus(500);
        }
        res.status(200).send(results);
    });
}
function getAll(db, collection, res) {
    db.collection(collection).find().toArray(function(err, results) {
        if (err) {
            logger.error(err, "Error finding collection: " + collection);
            res.sendStatus(500);
        }
        res.status(200).send(results);
    });
}

module.exports = {getAll, getFirst };
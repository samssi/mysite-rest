'use strict';

const MongoClient = require('mongodb').MongoClient;

function getFirst(collection, res) {
    MongoClient.connect("mongodb://bar:bar@ds049476.mlab.com:49476/mysite", function(err, db) {
        db.collection(collection).findOne(function(err, results) {
            if (err) {
                console.log("Error finding collection: " + collection);
                res.sendStatus(500);
            }
            res.status(200).send(results);
        });
    });
}
function getAll(collection, res) {
    MongoClient.connect("mongodb://foo:foo@ds049476.mlab.com:49476/mysite", function(err, db) {
        db.collection(collection).find().toArray(function(err, results) {
            if (err) {
                console.log("Error finding collection: " + collection);
                res.sendStatus(500);
            }
            res.status(200).send(results);
        });
    });
}

module.exports = {getAll, getFirst };
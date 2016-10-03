'use strict';

const readFileFromRelativePath = require('../util/relativeFs');
const MongoClient = require('mongodb').MongoClient;

const personalInfoJson = readFileFromRelativePath('./json/personal-information.json');

function getPersonalInformation(res) {
    // Bluebird here?
    MongoClient.connect("mongodb://bar:foo@ds049476.mlab.com:49476/mysite", function(err, db) {
        db.collection("personalInfo", function (err, collection) {
            const stream = collection.find().stream();
            stream.on('data', function(doc) {
                res.status(200).send(doc);
            });
            stream.on('error', function(err) {
                console.log(err);
            });
        });
    });
}

module.exports = getPersonalInformation;
'use strict';

function getFirst(db, collection, res) {
    db.collection(collection).findOne(function(err, results) {
        if (err) {
            console.log("Error finding collection: " + collection);
            res.sendStatus(500);
        }
        res.status(200).send(results);
    });
}
function getAll(db, collection, res) {
    db.collection(collection).find().toArray(function(err, results) {
        if (err) {
            console.log("Error finding collection: " + collection);
            res.sendStatus(500);
        }
        res.status(200).send(results);
    });
}

module.exports = {getAll, getFirst };
"use strict";

const bunyan = require("bunyan");
const logger = bunyan.createLogger({name: "mysite-rest-errorHandler"});


function errorHandler(err, req, res, next) {
    logger.error(err, "Internal server error");
    res.status(500).send("Internal server error");
}

module.exports = errorHandler;
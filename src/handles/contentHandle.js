'use strict';

const getPersonalInformation = require('../service/contentService');

function contentHandle(req, res) {
    res.status(200).send(getPersonalInformation());
}

module.exports = contentHandle;
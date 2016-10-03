'use strict';

const getPersonalInformation = require('../service/contentService');

function personalInfoHandle(req, res) {
    getPersonalInformation(res);
}

module.exports = { personalInfoHandle };
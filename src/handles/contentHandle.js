'use strict';

const content = require('../service/contentService');

function personalInfosHandle(req, res) {
    content.getFirst("personalInfo", res);
}

function experiencesHandle(req, res) {
    content.getAll("experience", res);
}

module.exports = { personalInfosHandle, experiencesHandle };
'use strict';

const content = require('../service/contentService');

function personalInfosHandle(req, res) {
    const db = req.app.locals.db;
    content.getFirst(db, "personalInfo", res);
}

function experiencesHandle(req, res) {
    const db = req.app.locals.db;
    content.getAll(db, "experience", res);
}

module.exports = { personalInfosHandle, experiencesHandle };
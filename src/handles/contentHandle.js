'use strict';

const content = require('../service/contentService');

function personalInfosHandle(req, res) {
    console.log('Personal information requested');
    const db = req.app.locals.db;
    content.getFirst(db, "personalInfo", res);
}

function experiencesHandle(req, res) {
    console.log('Experience information requested');
    const db = req.app.locals.db;
    content.getAll(db, "experience", res);
}

module.exports = { personalInfosHandle, experiencesHandle };
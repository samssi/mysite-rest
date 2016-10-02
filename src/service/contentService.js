'use strict';

const readFileFromRelativePath = require('../util/relativeFs');

const personalInfoJson = readFileFromRelativePath('./json/personal-information.json');

function getPersonalInformation() {
    const json = JSON.parse(personalInfoJson);
    console.log(json);
    return json;
}

module.exports = getPersonalInformation;
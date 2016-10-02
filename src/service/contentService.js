'use strict';

const readFileFromRelativePath = require('../util/relativeFs');

const personalInfoJson = readFileFromRelativePath('./json/personal-information.json');

function getPersonalInformation() {
    console.log("info: " + personalInfoJson);
    return personalInfoJson;
}

module.exports = getPersonalInformation;
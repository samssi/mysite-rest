'use strict';

const fs = require('fs');
const path = require('path');

function readFileFromRelativePath(file) {
    const relativePath = path.relative(process.cwd(), file);
    return fs.readFileSync(relativePath);
}

module.exports = readFileFromRelativePath;
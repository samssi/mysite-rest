'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const rootHandler = require('./handlers/rootHandler');
const errorHandler = require('./handlers/errorHandler')

app.use(helmet());
app.use(bodyParser.json());

app.use('/', rootHandler);
app.use(errorHandler);

app.listen(8090, () =>
    console.log('Server started at port 8090')
);

module.exports = app;
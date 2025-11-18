const app = require('./routes/index');
require('dotenv').config({ quiet: true });
const { express } = require('./utils/core/express');
const morgan = require('morgan');
const cors = require('cors');
const mongoDbInit = require('./connection/mongoConn');

app.use(cors());

app.use(morgan('dev'));


// mongoDbInit().then(() => console.log('Connected to MongoDB'));

module.exports = app;
require('dotenv').config();
const express = require('express');
const logger = require('heroku-logger');

const db = require('./config/database');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + "../public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./config/routes')(app, db);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    logger.info(`Example app listening on port ${PORT}!`);
});

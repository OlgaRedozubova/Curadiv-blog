require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('heroku-logger');

const Article = require('../models/article');
const db_model = require('../models/db_models');

const url_db = process.env.MONGODB_URI || "mongodb://localhost/curadiv";
logger.info(`url_db => ${url_db}`);


mongoose.connect(url_db, function (err) {
    try {
        if (err) throw err;

        logger.info(`Successfully connected ${url_db}`);


        Article.findOne({}).exec(function (err, obj) {
            if (err) {
                logger.error('ERROR => findOne => ', err.message, err.stack);
            }

            if (!obj) {
                logger.info('DB set init data ...  ');
                const initArticles = require('./db_initData');
                const db_Article = db_model(Article);

                initArticles.map(item => {
                    db_Article.create(item);
                });
                logger.info(`Successfully connected ${initArticles}`);
            }
        });
    } catch (e) {
        logger.error('ERROR => mongoose.connect', err.message, err.stack);
    }

});

module.exports = {
    mongoose,
}
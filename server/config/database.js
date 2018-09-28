require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('../models/article');
const db_model = require('../models/db_models');

const url_db = process.env.DATABASE_URL || "mongodb://localhost/curadiv";

mongoose.connect(url_db, function (err) {

    if (err) throw err;

    console.log('Successfully connected');


    Article.findOne({}).exec(function(err, obj) {
        if (err) console.log('Error');

        if (!obj){
            console.log('DB set init data ... ');
            const initArticles = require('./db_initData');
            const db_Article = db_model(Article);

            initArticles.map(item => {
                db_Article.create(item);
            });
            console.log(initArticles);
        }
    });

});

module.exports = {
    mongoose,
}
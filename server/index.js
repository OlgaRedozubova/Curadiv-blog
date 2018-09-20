require('dotenv').config();
const express = require('express');
const passport = require('passport');
const app = express();


// const mongoose = require('mongoose');
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const config = require('./config/database');

// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//     () => {console.log('Database is connected') },
//     err => { console.log('Can not connect to the database'+ err)}
// );
const url_db = "mongodb://localhost:27017/";
mongoClient.connect(url_db, function(err, client){
    const db = client.db("blog");
    const collection = db.collection("articles");
    let article = {title: "title1", subtitle: "subtitle", author: "ivan", body: "body"};
    collection.insertOne(article, function(err, result) {
        if(err) {
            return console.log(err);
        }
        console.log(result.ops);
        client.close();
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./config/routes')(app, passport);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

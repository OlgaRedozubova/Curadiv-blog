require('dotenv').config();
const express = require('express');
const passport = require('passport');
const app = express();


// const mongoose = require('mongoose');
const mongoClient = require("mongodb").MongoClient;
//const objectId = require("mongodb".ObjectID);
const bodyParser = require('body-parser');
const config = require('./config/database');

// mongoose.connect(config.DB, { useNewUrlParser: true }).then(
//     () => {console.log('Database is connected') },
//     err => { console.log('Can not connect to the database'+ err)}
// );
const url_db = "mongodb://localhost:27017/";

let articles = [
    {title: "title1", subtitle: "subtitle1", author: "ivan", body: "body1"},
    {title: "title2", subtitle: "subtitle2", author: "roman", body: "body2"},
    {title: "title3", subtitle: "subtitle3", author: "nik", body: "body3"},
    ];

mongoClient.connect(url_db, function(err, client){
    const db = client.db("blog");
    const collection = db.collection("articles");
    // let article = {title: "title1", subtitle: "subtitle", author: "ivan", body: "body"};
    // collection.insertOne(article, function(err, result) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log(result.ops);
    //     client.close();
    // });

    // collection.insertMany(articles, function(err, result) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log(result.ops);
    //     client.close();
    // });

    if (err) return console.log(err);

    collection.find().toArray(function(err, results){
        console.log(results);
        client.close();
    });
    const col = db.collection("articles");

    col.findOneAndUpdate(
        {title: "title1"},              // критерий выборки
        { $set: {title: "title_1"}},     // параметр обновления
        {                           // доп. опции обновления
            returnOriginal: false
        },
        function(err, result){

            console.log(result);
            client.close();
        }
    );
    // db.collection("articles").drop(function (err, result) {
    //     console.log(result);
    //     client.close();
    // })
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./config/routes')(app, passport);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
